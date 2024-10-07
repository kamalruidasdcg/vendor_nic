// const { query, connection } = require("../../config/dbConfig");
const { poolQuery, poolClient } = require("../../config/pgDbConfig");
const { INSERT, UPDATE } = require("../../lib/constant");
const { resSend } = require("../../lib/resSend");
const { APPROVED, REJECTED, SUBMITTED_BY_DO, SUBMITTED_BY_VENDOR, STATUS_RECEIVED } = require("../../lib/status");
const { BTN_ADV_BILL_HYBRID, BTN_ADV_BILL_HYBRID_DO, BTN_ASSIGN } = require("../../lib/tableName");
const {
  getEpochTime,
  generateQuery,
  generateQueryForMultipleData,
  generateInsertUpdateQuery,
} = require("../../lib/utils");
const {
  filesData,
  advBillHybridbtnPayload,
  contractualSubmissionDate,
  actualSubmissionDate,
  advBillHybridbtnDOPayload,
  getAdvBillHybridBTNDetails,
  getGrnIcgrnByInvoice,
  getInitalData,
} = require("../../services/btn.services");
const { getGrnIcgrnValue, btnAssignPayload, getLatestBTN, addToBTNList } = require("../../services/btnServiceHybrid.services");
const { create_btn_no } = require("../../services/po.services");
const { abhBtnSubmitToSAPF01, abhBtnSubmitToSAPF02 } = require("../../services/sap.btn.services");
const { checkBTNRegistered, fetchBTNListByPOAndBTNNum } = require("../../utils/btnUtils");
const Message = require("../../utils/messages");
const { checkTypeArr } = require("../../utils/smallFun");
const { btnCurrentDetailsCheck, updateBtnListTable } = require("../btnControllers");

const submitAdvanceBillHybrid = async (req, res) => {
  try {
    const client = await poolClient();
    try {
      await client.query("BEGIN");
      let payload = req.body;
      const tokenData = req.tokenData;


      if (!payload) {
        return resSend(res, false, 400, Message.INVALID_PAYLOAD, Message.MANDATORY_INPUTS_REQUIRED, null);
      }
      if (!payload.invoice_value) {
        return resSend(res, false, 200, "Invoice Value is missing!", null, null);
      }
      if (!payload.purchasing_doc_no || !payload.invoice_no) {
        return resSend(res, false, 200, "Invoice Number is missing!", null, null);
      }

      let payloadFiles = req.files;
      const { associated_po } = payload;

      // BTN NUMBER GENERATE
      const btn_num = await create_btn_no();
      // UPLOAD FILES DATA HANDLES
      const uploadedFiles = filesData(payloadFiles);

      // let credit_note;
      // let debit_note;

      // if (!debit_note || debit_note === "") {
      //     debit_note = 0;
      // }
      // if (!credit_note || credit_note === "") {
      //     credit_note = 0;
      // }


      let net_claim_amount = parseFloat(payload.net_claim_amount).toFixed(2);

      // CONTRACTUAL SUBMISSION DATA
      const contDateSetup = await contractualSubmissionDate(payload.purchasing_doc_no, client);
      console.log("contDateSetup", contDateSetup);


      // ACTUAL SUMBISSION DATA
      const actualDateSetup = await actualSubmissionDate(payload.purchasing_doc_no, client);
      console.log("actualDateSetup", actualDateSetup);


      // ADDING EXTRA DATA IN PAYLOAD
      payload = {
        ...payload,
        ...uploadedFiles,
        btn_num,
        ...contDateSetup.data,
        ...actualDateSetup.data,
        vendor_code: tokenData.vendor_code,
        net_claim_amount,
        created_at: getEpochTime(),
      };

      console.log("payload", payload)

      // PAYLOAD DATA
      const btnPayload = advBillHybridbtnPayload(payload);
      // GENERATE QUERY, DATA AND SAVE
      const btnQuery = generateQuery(INSERT, BTN_ADV_BILL_HYBRID, btnPayload);

      const result1 = await poolQuery({ client, query: btnQuery.q, values: btnQuery.val });
      let associated_po_arr = [];
      if (associated_po && Array.isArray(associated_po)) {
        associated_po_arr = associated_po.map((ele) => ({
          ...btnPayload,
          purchasing_doc_no: ele,
        }));

        const multipledataInsert = await generateQueryForMultipleData(
          associated_po_arr,
          "btn_adv_bill_hybrid",
          ["purchasing_doc_no", "btn_num"]
        );
        const result2 = await poolQuery({
          client,
          query: multipledataInsert.q,
          values: multipledataInsert.val,
        });
      }


      const net_payable_amount = net_claim_amount;

      await addToBTNList(client, { ...payload, net_payable_amount, certifying_authority: payload.bill_certifing_authority }, SUBMITTED_BY_VENDOR);
      await client.query("COMMIT");
      // TO DO EMAIL
      // serviceBtnMailSend(tokenData, { ...payload, status: SUBMITTED });
      resSend(res, true, 201, Message.BTN_CREATED, "BTN Created. No. " + btn_num, null);

    } catch (error) {
      await client.query("ROLLBACK");
      resSend(res, false, 400, Message.SERVER_ERROR, error.message, null);
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, false, 500, Message.DB_CONN_ERROR, error.message, null);
  }
};

const getAdvBillHybridData = async (req, res) => {

  try {
    const client = await poolClient();
    try {
      const { type } = req.query;
      if (!type) {
        return resSend(res, true, 200, Message.MANDATORY_INPUTS_REQUIRED, "Please send a valid type!", null)
      }
      let data;
      let message;
      let success = false;
      let statusCode;
      switch (type) {
        case 'icgrn': {
          const result = await getGrnIcgrnByInvoice(client, req.query);
          ({ data, message, success, statusCode } = result);
        }
          break;

        case 'details': {
          const result = await getAdvBillHybridBTNDetails(client, req.query);
          console.log("result", result);
          ({ data, message, success, statusCode } = result);
        }
          break;
        case 'init': {
        
          const result = await getInitalData(client, req.query);
          console.log("result", result);
          ({ data, message, success, statusCode } = result);
        }
          break;

        default:
          message = "Please send a valid type!"
          return resSend(res, success, 200, "Please send a valid type!", Message.MANDATORY_INPUTS_REQUIRED, null);
      }
      resSend(res, success, statusCode, message, data);

    } catch (error) {
      resSend(res, false, 500, Message.SERVER_ERROR, error.message, null);
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, false, 501, Message.DB_CONN_ERROR, error.message, null);
  }

};


const sbhSubmitBTNByDO = async (req, res) => {

  try {
    const client = await poolClient();
    try {
      await client.query("BEGIN");
      let payload = req.body;
      const tokenData = req.tokenData;

      console.log("payload", payload);


      // BTN VALIDATION
      if (!payload.btn_num) {
        return resSend(res, false, 400, Message.MANDATORY_PARAMETR_MISSING, "btn num  missing", null);
      }
      const btnCurrnetStatus = await btnCurrentDetailsCheck(client, { btn_num: payload.btn_num });
      if (btnCurrnetStatus.isInvalid) {
        return resSend(res, false, 200, `BTN ${payload.btn_num} ${btnCurrnetStatus.message}`, payload.btn_num, null
        );
      }

      if (payload.status === REJECTED) {
        const response1 = await btnReject(payload, tokenData, client);
        await client.query("COMMIT");
        return resSend(res, true, 200, "Rejected successfully !!", response1, null);
      }

      console.log(!payload.recomend_payment , !payload.net_payable_amount , !payload.assign_to , !payload.purchasing_doc_no);
      

      if (!payload.recomend_payment || !payload.net_payable_amount || !payload.assign_to || !payload.purchasing_doc_no) {
        return resSend(res, false, 400, Message.MANDATORY_PARAMETR_MISSING, "PO No OR net_payable_amount OR assign_to OR recomend_payment missing", null);
      }

      // TO DO DEALING OFFICER CHECK 

      const btnChkQuery = `SELECT COUNT(*) from ekko WHERE  ebeln = $1 AND ernam = $2`;
      const validAuthrityCheck = await poolQuery({ client, query: btnChkQuery, values: [payload.purchasing_doc_no, tokenData.vendor_code] });
      if (!parseInt(validAuthrityCheck[0]?.count)) {
        return resSend(res, false, 200, "You are not authorised!", Message.YOU_ARE_UN_AUTHORIZED, null);
      }





      //  BTN FINANCE AUTHORITY DATA INSERT
      payload.created_by_id = tokenData.vendor_code;
      const financePaylad = advBillHybridbtnDOPayload(payload);
      const { q, val } = generateQuery(INSERT, BTN_ADV_BILL_HYBRID_DO, financePaylad);
      const response = await poolQuery({ client, query: q, values: val });

      // BTN ASSIGN BY FINANCE AUTHORITY  
      const btnAssignPaylaod = btnAssignPayload({ ...payload, assign_by: tokenData.vendor_code });
      const assingPayload = await generateInsertUpdateQuery(btnAssignPaylaod, BTN_ASSIGN, ['btn_num', 'purchasing_doc_no']);
      await poolQuery({ client, query: assingPayload.q, values: assingPayload.val });

      // ADDING TO BTN LIST WITH CURRENT STATUS
      const latesBtnData = await getLatestBTN(client, payload);
      // await addToBTNList(client, { ...latesBtnData, ...payload, }, STATUS_RECEIVED);
      await addToBTNList(client, { ...latesBtnData, ...payload, }, SUBMITTED_BY_DO);
      const sendSap = true; //await btnSubmitByDo({ btn_num, purchasing_doc_no, assign_to }, tokenData);
      // const sendSap = await abhBtnSubmitToSAPF01 (payload, tokenData);

      if (sendSap == false) {
        console.log(sendSap);
        await client.query("ROLLBACK");
        return resSend(res, false, 200, `SAP not connected.`, null, null);
      } else if (sendSap == true) {
        await client.query("COMMIT");
        resSend(res, true, 200, Message.DATA_SEND_SUCCESSFULL, response, "")

        // TO DO 
        // EMAIL IMPMENENTAIOTN

        // serviceBtnMailSend(tokenData, { ...payload, status: SUBMITTED_BY_DO });

      }

    } catch (error) {
      console.log("error", error.message);
      await client.query("ROLLBACK");
      resSend(res, false, 500, Message.SOMTHING_WENT_WRONG, error.message, null);
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, false, 500, Message.DB_CONN_ERROR, error.message, null);
  }

}

const getAdvBillHybridBTN = async (req, res) => {
  const client = await poolClient();
  try {
    const payload = req.body;

    if (!payload.btn_num) {
      return resSend(res, false, 400, Message.MANDATORY_PARAMETR, null, null);
    }

    let baseQuery = `SELECT * FROM btn_advance_bill_hybrid`;

    let conditionQuery = " WHERE 1 = 1 ";
    const valueArr = [];

    if (payload.btn_num) {
      conditionQuery += " AND btn_num  = ?";
      valueArr.push(payload.btn_num);
    }

    const advBillReqDataQuery = baseQuery + conditionQuery;
    // let results = await query({ query: advBillReqDataQuery, values: valueArr });
    let [results] = await client.query(advBillReqDataQuery, valueArr);

    console.log("results", results);

    resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, results, null);
  } catch (error) {
    resSend(
      res,
      false,
      500,
      Message.DB_CONN_ERROR,
      JSON.stringify(error),
      null
    );
  } finally {
    client.release();
  }
};


async function btnReject(data, tokenData, client) {
  try {
    const obj = {
      btn_num: data.btn_num,
      remarks: data.remarks,
    };

    // const { q, val } = generateQuery(UPDATE, BTN_MATERIAL, { status: REJECTED }, obj);
    // const result = await query({ query: q, values: val });

    await updateBtnListTable(client, obj);

    // await btnSubmitByDo({ ...data, assign_to: null }, tokenData);

    return { btn_num: data.btn_num };
  } catch (error) {
    throw error;
  }
}


const sbhAssignToFiStaff = async (req, res) => {
  try {
    const client = await poolClient();
    await client.query("BEGIN");
    try {
      const { btn_num, purchasing_doc_no, assign_to_fi, activity } = req.body;
      const tokenData = req.tokenData;

      if (!btn_num || !purchasing_doc_no || !assign_to_fi) {
        return resSend(res, false, 200, "Assign To is the mandatory!", Message.MANDATORY_PARAMETR_MISSING, null);
      }

      const btnCurrnetStatus = await btnCurrentDetailsCheck(client, {
        btn_num,
        status: STATUS_RECEIVED,
      });
      if (btnCurrnetStatus.isInvalid) {
        return resSend(res, false, 200, `BTN ${btn_num} ${btnCurrnetStatus.message}`, btn_num, null
        );
      }

      const assign_q = `SELECT * FROM ${BTN_ASSIGN} WHERE btn_num = $1 and last_assign = $2`;
      let assign_fi_staff_v = await poolQuery({ client, query: assign_q, values: [btn_num, true] });
      if (!checkTypeArr(assign_fi_staff_v)) {
        return resSend(res, false, 200, "You're not authorized to perform the action!", null, null);
      }

      const whereCon = { btn_num: btn_num };
      const payload = {
        assign_by_fi: tokenData?.vendor_code,
        assign_to_fi: assign_to_fi,
        last_assign_fi: true,
        activity
      };

      let { q, val } = generateQuery(UPDATE, BTN_ASSIGN, payload, whereCon);
      let resp = await poolQuery({ client, query: q, values: val });
      console.log("resp", resp);

      let btn_list_q = ` SELECT * FROM btn_list WHERE btn_num = $1 
	                      AND purchasing_doc_no = $2
	                      AND status = $3
                        ORDER BY created_at DESC`;
      let btn_list = await poolQuery({ client, query: btn_list_q, values: [btn_num, purchasing_doc_no, SUBMITTED_BY_VENDOR] });

      console.log("btn_list", btn_list);

      if (!btn_list.length) {
        return resSend(res, false, 200, "Vendor have to submit BTN first.", btn_list, null);
      }

      let data = {
        btn_num,
        purchasing_doc_no,
        net_claim_amount: btn_list[0]?.net_claim_amount,
        net_payable_amount: btn_list[0]?.net_payable_amount,
        vendor_code: tokenData.vendor_code,
        created_at: getEpochTime(),
        btn_type: btn_list[0]?.btn_type,
      };

      let result = await addToBTNList(client, data, STATUS_RECEIVED);

      const sendSap = true;
      // const sendSap = await abhBtnSubmitToSAPF02({ ...req.body, ...payload }, tokenData);
      if (sendSap == false) {
        await client.query("ROLLBACK");
        return resSend(res, false, 200, `SAP not connected.`, { btn_num }, null);
      } else if (sendSap == true) {
        await client.query("COMMIT");
        // TO DO EMAIL
        // serviceBtnMailSend(tokenData, { ...req.body, ...payload, status: STATUS_RECEIVED });
        resSend(res, true, 200, "Finance Staff has been assigned!", null, null);
      }

    } catch (error) {
      console.log("data not inserted", error.message);
      resSend(res, false, 500, Message.SERVER_ERROR, error.message, null);
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, true, 500, Message.DB_CONN_ERROR, error.message, null);
  }
};





module.exports = {
  submitAdvanceBillHybrid,
  getAdvBillHybridData,
  getAdvBillHybridBTN,
  sbhSubmitBTNByDO,
  sbhAssignToFiStaff
};
