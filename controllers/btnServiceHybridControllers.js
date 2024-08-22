const { getEpochTime, getYyyyMmDd, generateQuery, generateInsertUpdateQuery } = require("../lib/utils");
const { EKPO, BTN_SERVICE_HYBRID, BTN_SERVICE_CERTIFY_AUTHORITY, BTN_ASSIGN } = require("../lib/tableName");
const { resSend } = require("../lib/resSend");
const { APPROVED, SUBMITTED_BY_VENDOR, SUBMITTED_BY_CAUTHORITY, SUBMITTED_BY_DO, STATUS_RECEIVED, FORWARDED_TO_FI_STAFF } = require("../lib/status");
const { create_btn_no } = require("../services/po.services");
const { poolClient, poolQuery, getQuery } = require("../config/pgDbConfig");
const Message = require("../utils/messages");
const { filesData, payloadObj, getHrDetails, getSDBGApprovedFiles, getPBGApprovedFiles, vendorDetails, getContractutalSubminissionDate, getActualSubminissionDate, checkHrCompliance, addToBTNList, getGrnIcgrnValue, getServiceEntryValue, forwordToFinacePaylaod, getServiceBTNDetails, getLatestBTN, btnAssignPayload } = require("../services/btnServiceHybrid.services");
const { INSERT, ACTION_SDBG, ACTION_PBG, MID_SDBG, UPDATE } = require("../lib/constant");
const { checkTypeArr } = require("../utils/smallFun");
const { timeInHHMMSS } = require("./btnControllers");
const { btnSubmitToSAPF01, btnSubmitToSAPF02 } = require("../services/sap.btn.services");

const getWdcInfoServiceHybrid = async (req, res) => {
  try {
    const client = await poolClient();
    try {

      const { purchasing_doc_no, reference_no, type } = req.query;
      if (type === "list") {
        const val = [];
        if (purchasing_doc_no) {
          val.push(purchasing_doc_no);
        }
        const wdcList = await poolQuery({ client, query: "SELECT DISTINCT(reference_no) FROM wdc", values: val });
        return resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, wdcList, null);
      }

      if (!reference_no) {
        return resSend(res, false, 400, Message.MANDATORY_PARAMETR_MISSING, "Reference_no missing", null);
      }

      const q = `
              SELECT wdc.*,
              	wdc.assigned_to AS certifying_by,
              	users.cname as certifying_by_name
              FROM
              	wdc AS wdc
              LEFT JOIN pa0002 AS users
              	ON(users.pernr :: character varying = wdc.assigned_to)
              WHERE (reference_no = $1 AND status = $2 AND action_type = $3) LIMIT 1`;

      let result = await poolQuery({ client, query: q, values: [reference_no, APPROVED, 'WDC'] });
      console.log("wdcList", result);

      if (!result.length) {
        return resSend(res, false, 200, "WDC not approved yet.", [], null);
      }
      let wdcLineItem = [];
      if (result[0]?.line_item_array) {
        try {
          wdcLineItem = JSON.parse(result[0]?.line_item_array);
        } catch (error) {
          wdcLineItem = [];
        }
      }

      const poNo = purchasing_doc_no || result[0]?.purchasing_doc_no;

      const line_item_ekpo_q = `SELECT EBELP AS line_item_no, MATNR AS service_code, TXZ01 AS description, NETPR AS po_rate, MEINS AS unit from ${EKPO} WHERE EBELN = $1`;
      let get_line_item_ekpo = await poolQuery({
        client,
        query: line_item_ekpo_q,
        values: [poNo],
      });

      console.log("get_line_item_ekpo", get_line_item_ekpo);
      console.log("wdcLineItem", wdcLineItem);

      const data = wdcLineItem.map((el2) => {
        const DOObj = get_line_item_ekpo.find(
          (elms) => elms.line_item_no == el2.line_item_no
        );
        console.log("DOObj", DOObj);

        return DOObj ? { ...DOObj, ...el2 } : el2;
      });

      let responseData = result[0];
      responseData.line_item_array = data;

      resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, responseData, null);
    } catch (error) {
      resSend(res, false, 500, Message.DATA_FETCH_ERROR, error.message, null);
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, false, 500, Message.DB_CONN_ERROR, error.message, null);
  }
};

const submitBtnServiceHybrid = async (req, res) => {

  try {
    const client = await poolClient();
    try {
      const filesPaylaod = req.files;
      const tempPayload = req.body;
      const tokenData = req.tokenData;
      const net_payable_amount = tempPayload.net_payable_amount || "0";

      // Check required fields
      // if (!JSON.parse(tempPayload.hsn_gstn_icgrn)) {
      //   return resSend(res, false, 200, "Please check HSN code, GSTIN, Tax rate is as per PO!", null, null);
      // }

      // Check required fields
      if (!tempPayload.invoice_value) {
        return resSend(res, false, 200, Message.MANDATORY_PARAMETR_MISSING, "Invoice Value is missing!", null);
      }
      if (!tempPayload.purchasing_doc_no || !tempPayload.invoice_no) {
        return resSend(res, false, 200, Message.MANDATORY_PARAMETR_MISSING, "Invoice Number is missing!", null);
      }

      // check invoice number is already present in DB
      let check_invoice_q = `SELECT count(invoice_no) as count FROM ${BTN_SERVICE_HYBRID} WHERE invoice_no = $1 and vendor_code = $2`;
      let check_invoice = await poolQuery({ client, query: check_invoice_q, values: [tempPayload.invoice_no, tokenData.vendor_code] });


      if (check_invoice && check_invoice[0].count > 0) {
        return resSend(res, false, 200, "BTN is already created under the invoice number.", null, null);
      }
      // if (!tempPayload.c_sdbg_filename || !tempPayload.a_sdbg_date || !tempPayload.c_sdbg_date) {
      //   return resSend(res, false, 200, Message.MANDATORY_PARAMETR_MISSING, "Send SDBG details", null);
      // }

      /**
       * FILE PAYLOADS AND FILE VALIDATION
       */
      const uploadedFiles = filesData(filesPaylaod);
      console.log("uploadedFiles", uploadedFiles);

      // if (!uploadedFiles.pf_compliance_filename || !uploadedFiles.esi_compliance_filename) {
      //   return resSend(res, false, 200, Message.MANDATORY_INPUTS_REQUIRED, "Missing PF or ESI files", null);
      // }

      // checking no submitted hr compliance by vendor
      const checkMissingComplience = await checkHrCompliance(client, tempPayload);
      console.log("checkMissingComplience", checkMissingComplience);

      if (!checkMissingComplience.success) {
        return resSend(res, false, 200, checkMissingComplience.msg, "Missing data, Need to be upload by HR", null);
      }
      // tempPayload.esi_compliance_filename = checkMissingComplience.data?.esi_compliance_filename;
      // tempPayload.pf_compliance_filename = checkMissingComplience.data?.pf_compliance_filename;
      // tempPayload.wage_compliance_filename = checkMissingComplience.data?.wage_compliance_filename;

      // console.log("checkMissingComplience", checkMissingComplience);

      // console.log("tempPayload", tempPayload);

      let payload = payloadObj(tempPayload);
      // BTN NUMBER GENERATE
      const btn_num = await create_btn_no();

      // MATH Calculation
      const net_claim_amount = (
        parseFloat(payload.invoice_value)
        + parseFloat(payload.debit_note)
        - parseFloat(payload.credit_note));

      payload = {
        ...payload, btn_num,
        ...uploadedFiles,
        net_claim_amount,
        created_by_id: tokenData.vendor_code,
        vendor_code: tokenData.vendor_code,
      }

      const { q, val } = generateQuery(INSERT, BTN_SERVICE_HYBRID, payload);

      // console.log(payload, q, val);
      await poolQuery({ client, query: q, values: val });
      await addToBTNList(client, { ...payload, net_payable_amount, certifying_authority: payload.bill_certifing_authority }, SUBMITTED_BY_VENDOR);
      resSend(res, true, 201, Message.BTN_CREATED, "BTN Created. No. " + btn_num, null);
    } catch (error) {
      resSend(res, false, 500, Message.SERVER_ERROR, error.message, null);
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, false, 501, Message.DB_CONN_ERROR, error.message, null);
  }
};

/**
 * BTN CREATE INITIAL DATA SEND
 * @param {Object} req 
 * @param {Object} res 
 */
const initServiceHybrid = async (req, res) => {

  try {
    const client = await poolClient();
    try {
      const { poNo } = req.query;

      // const data1 = await getHrDetails(client, [poNo]);
      // const data2 = await getSDBGApprovedFiles(client, [poNo, APPROVED, ACTION_SDBG]);
      // const data3 = await getPBGApprovedFiles(client, [poNo, APPROVED, ACTION_PBG]);
      // const data4 = await vendorDetails(client, [poNo]);

      const response = await Promise.all(
        [
          getHrDetails(client, [poNo]),
          getSDBGApprovedFiles(client, [poNo, APPROVED, ACTION_SDBG]),
          getPBGApprovedFiles(client, [poNo, APPROVED, ACTION_PBG]),
          vendorDetails(client, [poNo]),
          getContractutalSubminissionDate(client, [poNo]),
          getActualSubminissionDate(client, [poNo])
        ]);

      let result = {
        hrDetais: response[0], //  getHrDetails,
        // sdbgFileDetais: response[1], // getSDBGApprovedFiles,
        // pbgDetails: response[2], //getPBGApprovedFiles,
        // vendorDetails: response[3], //vendorDetails
        // contractutalSubminissionDate: response[4], // getContractutalSubminissionDate
        // actualSubminissionDate: response[5], // getActualSubminissionDate
      }

      if (response[3][0]) {
        result = { ...result, ...response[3][0] };
      } if (response[1][0]) {
        result = { ...result, ...response[1][0] };
      } if (response[2][0]) {
        result = { ...result, ...response[2][0] };
      }

      if (response[4] && response[4][0]) {
        const con = response[4].find((el) => el.MID == MID_SDBG);
        result.c_sdbg_date = con?.PLAN_DATE;
      }
      if (response[5] && response[5][0]) {
        const act = response[5].find((el) => el.MID == parseInt(MID_SDBG));
        result.a_sdbg_date = act?.PLAN_DATE;
      }

      resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, result, "")

    } catch (error) {
      resSend(res, false, 500, Message.DATA_FETCH_ERROR, error.message, null);
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, false, 500, Message.DB_CONN_ERROR, error.message, null);
  }
}



const getBtnData = async (req, res) => {
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
          const result = await getGrnIcgrnValue(client, req.query);
          ({ data, message, success, statusCode } = result);
        }
          break;
        case 'service-entry': {
          const result = await getServiceEntryValue(client, req.query);
          console.log("result", result);
          ({ data, message, success, statusCode } = result);
        }
          break;
        case 'sbtn-details': {
          const result = await getServiceBTNDetails(client, req.query);
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

}


const forwordToFinace = async (req, res) => {

  try {
    const client = await poolClient();
    try {
      await client.query("BEGIN");
      let payload = req.body;
      const tokenData = req.tokenData;
      if (!payload.btn_num || !payload.entry_number || !payload.net_payable_amount || !payload.assign_to || !payload.purchasing_doc_no) {
        return resSend(res, false, 400, Message.MANDATORY_PARAMETR_MISSING, "btn num or entry_no or net_payable_amount assign_to_fi missing", null);
      }
      const btnChkQuery = `SELECT COUNT(*) from btn_service_hybrid WHERE btn_num = $1 AND bill_certifing_authority = $2`;
      const validAuthrityCheck = await poolQuery({ client, query: btnChkQuery, values: [payload.btn_num, tokenData.vendor_code] });
      if (!parseInt(validAuthrityCheck[0]?.count)) {
        return resSend(res, false, 401, Message.YOU_ARE_UN_AUTHORIZED, "You are not authorize!!", null);
      }
      //  BTN FINANCE AUTHORITY DATA INSERT
      payload.created_by_id = tokenData.vendor_code;
      const financePaylad = forwordToFinacePaylaod(payload);
      const { q, val } = generateQuery(INSERT, BTN_SERVICE_CERTIFY_AUTHORITY, financePaylad);
      const response = await poolQuery({ client, query: q, values: val });

      // BTN ASSIGN BY FINANCE AUTHORITY  
      const btnAssignPaylaod = btnAssignPayload({ ...payload, assign_by: tokenData.vendor_code });
      const assingPayload = await generateInsertUpdateQuery(btnAssignPaylaod, BTN_ASSIGN, ['btn_num', 'purchasing_doc_no']);
      await poolQuery({ client, query: assingPayload.q, values: assingPayload.val });

      // ADDING TO BTN LIST WITH CURRENT STATUS
      const latesBtnData = await getLatestBTN(client, payload);
      await addToBTNList(client, { ...payload, ...latesBtnData }, SUBMITTED_BY_CAUTHORITY);
      const sendSap = true; //await btnSubmitByDo({ btn_num, purchasing_doc_no, assign_to }, tokenData);
      // const sendSap = await btnSubmitToSAPF01(payload, tokenData);

      if (sendSap == false) {
        console.log(sendSap);
        await client.query("ROLLBACK");
        return resSend(res, false, 200, `SAP not connected.`, null, null);
      } else if (sendSap == true) {
        await client.query("COMMIT");
        resSend(res, true, 200, Message.DATA_SEND_SUCCESSFULL, response, "")
        // handelMail(tokenData, { ...payload, assign_to, status: SUBMIT_BY_DO });
      }

    } catch (error) {
      console.log("error", error.message);
      await client.query("ROLLBACK");
      resSend(res, false, 500, Message.SERVER_ERROR, error.message, null);
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, false, 500, Message.DB_CONN_ERROR, error.message, null);
  }

}
/**
 * BTN DATA SEND TO SAP SERVER WHEN BTN SUBMIT BY FINNANCE STAFF
 * @param {Object} btnPayload
 * @param {Object} tokenData
 */

const serviceBtnAssignToFiStaff = async (req, res) => {
  try {
    const client = await poolClient();
    await client.query("BEGIN");
    try {
      const { btn_num, purchasing_doc_no, assign_to_fi } = req.body;
      const tokenData = { ...req.tokenData };

      if (!btn_num || !purchasing_doc_no || !assign_to_fi) {
        return resSend(res, false, 200, "Assign To is the mandatory!", Message.MANDATORY_PARAMETR_MISSING, null);
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
      };

      let { q, val } = generateQuery(UPDATE, BTN_ASSIGN, payload, whereCon);
      let resp = await poolQuery({ client, query: q, values: val });
      console.log("resp", resp);

      let btn_list_q = ` SELECT * FROM btn_list WHERE btn_num = $1 
	                      AND purchasing_doc_no = $2
	                      AND status = $3
                        ORDER BY created_at DESC`;
      let btn_list = await poolQuery({ client, query: btn_list_q, values: [btn_num, purchasing_doc_no, SUBMITTED_BY_CAUTHORITY] });

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

      let result = await addToBTNList(client, data, FORWARDED_TO_FI_STAFF);

      // const sendSap = true; //btnSaveToSap({ ...req.body, ...payload }, tokenData);
      const sendSap = await btnSubmitToSAPF02({ ...req.body, ...payload }, tokenData);
      if (sendSap == false) {
        await client.query("ROLLBACK");
        return resSend(res, false, 200, `SAP not connected.`, null, null);
      } else if (sendSap == true) {
        await client.query("COMMIT");
        // TO DO EMAIL

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
  submitBtnServiceHybrid,
  getWdcInfoServiceHybrid,
  initServiceHybrid,
  getBtnData,
  forwordToFinace,
  serviceBtnAssignToFiStaff
};
