const {
  getQuery,
  query,
  poolClient,
  poolQuery,
} = require("../config/pgDbConfig");
const { makeHttpRequest } = require("../config/sapServerConfig");
const {
  C_SDBG_DATE,
  C_DRAWING_DATE,
  C_QAP_DATE,
  C_ILMS_DATE,
  A_SDBG_DATE,
  A_DRAWING_DATE,
  A_QAP_DATE,
  A_ILMS_DATE,
  INSERT,
  USER_TYPE_VENDOR,
  UPDATE,
  MID_SDBG,
  MID_ILMS,
  MID_QAP,
  MID_DRAWING,
  USER_TYPE_GRSE_FINANCE,
  ACTION_DD,
  ACTION_IB,
  ACTION_PBG,
} = require("../lib/constant");
const {
  BTN_RETURN_DO,
  BTN_FORWORD_FINANCE,
  BTN_UPLOAD_CHECKLIST,
  BTN_ASSIGN_TO_STAFF,
  BTN_REJECT,
} = require("../lib/event");
const { resSend } = require("../lib/resSend");
const {
  APPROVED,
  SUBMITTED,
  FORWARD_TO_FINANCE,
  REJECTED,
  ASSIGNED,
  STATUS_RECEIVED,
  SUBMIT_BY_DO,
  SUBMITTED_BY_DO,
  SUBMITTED_BY_VENDOR,
  D_STATUS_FORWARDED_TO_FINANCE,
  F_STATUS_FORWARDED_TO_FINANCE,
  RECEIVED,
  BTN_STATUS_BANK,
  BTN_STATUS_HOLD_TEXT,
  BTN_STATUS_UNHOLD_TEXT,
  BTN_STATUS_PROCESS,
  BTN_STATUS_NOT_SUBMITTED,
  BTN_STATUS_DRETURN,
} = require("../lib/status");
const {
  BTN_MATERIAL,
  BTN_LIST,
  BTN_MATERIAL_DO,
  BTN_ASSIGN,
} = require("../lib/tableName");
const { getEpochTime, getYyyyMmDd, generateQuery } = require("../lib/utils");
const { sendMail } = require("../services/mail.services");
const { create_btn_no } = require("../services/po.services");
const {
  getSDBGApprovedFiles,
  // getGRNs,
  getICGRNs,
  // getGateEntry,
  getPBGApprovedFiles,
  checkBTNRegistered,
  getBTNInfo,
  getBTNInfoDO,
  fetchBTNListByPOAndBTNNum,
  getSDFiles,
} = require("../utils/btnUtils");
const { convertToEpoch } = require("../utils/dateTime");
const { getUserDetailsQuery } = require("../utils/mailFunc");
const { checkTypeArr } = require("../utils/smallFun");
const Message = require("../utils/messages");
const {
  addToBTNList,
  btnCurrentDetailsCheck,

  insertUpdateToBTNList,
  timeInHHMMSS,
  updateBtnListTable,
} = require("./btnControllers");

const submitPbg = async (req, res) => {
  //return resSend(res, false, 200, "Basic Value is mandatory.", null, null);
  try {
    let {
      purchasing_doc_no,
      invoice_no,
      balance_claim_invoice,
      claim_amount,
      percentage_of_claim,
    } = req.body;
    let payloadFiles = req.files;
    const tokenData = { ...req.tokenData };
    let payload = {
      ...req.body,
      vendor_code: tokenData?.vendor_code,
      created_by_id: tokenData?.vendor_code,
      btn_type: "claim-against-pbg",
      updated_by: "VENDOR",
    };

    // Check required fields
    if (!claim_amount || !claim_amount.trim() === "") {
      return resSend(res, false, 200, "Claim Value is mandatory.", null, null);
    }

    // Check required fields
    if (!invoice_value || !invoice_value.trim() === "") {
      return resSend(res, false, 200, "Basic Value is mandatory.", null, null);
    }

    if (!purchasing_doc_no || !invoice_no) {
      return resSend(res, false, 200, "Invoice Number is missing!", null, null);
    }

    // check invoice number is already present in DB
    let check_invoice_q = `SELECT count(*) as count FROM btn_pbg WHERE invoice_no = $1 and vendor_code = $2`;
    let check_invoice = await getQuery({
      query: check_invoice_q,
      values: [invoice_no, tokenData.vendor_code],
    });

    if (checkTypeArr(check_invoice) && check_invoice[0].count > 0) {
      return resSend(
        res,
        false,
        200,
        "BTN is already created under the invoice number.",
        null,
        null
      );
    }

    // Handle uploaded files
    let invoice_filename;
    if (payloadFiles["invoice_filename"]) {
      invoice_filename = payloadFiles["invoice_filename"][0]?.filename;
      payload = { ...payload, invoice_filename };
    }
    let balance_claim_invoice_filename;
    if (payloadFiles["balance_claim_invoice_filename"]) {
      balance_claim_invoice_filename =
        payloadFiles["balance_claim_invoice_filename"][0]?.filename;
      payload = { ...payload, balance_claim_invoice_filename };
    }

    // GET ICGRN Value by PO Number
    let resICGRN = await getICGRNs({ purchasing_doc_no, invoice_no });
    if (!resICGRN) {
      return resSend(
        res,
        false,
        200,
        `Invoice number is not valid!`,
        null,
        null
      );
    }

    payload = {
      ...payload,
      icgrn_total: resICGRN.total_icgrn_value,
      icgrn_nos: JSON.stringify(resICGRN.icgrn_nos),
    };

    // generate btn num
    const btn_num = await create_btn_no("BTN");
    payload = { ...payload, btn_num };

    // created at
    let created_at = getEpochTime();
    payload = { ...payload, created_at };
    console.log(payload);
    // INSERT Data into btn table
    let resBtnList = await addToBTNList(payload, SUBMITTED_BY_VENDOR);
    if (!resBtnList?.status) {
      return resSend(
        res,
        false,
        200,
        `Something went wrong. Try again!`,
        null,
        null
      );
    }
    //return;
    let { q, val } = generateQuery(INSERT, "btn_pbg", payload);
    const result = await getQuery({ query: q, values: val });
    console.log(result);
    if (result.length > 0) {
      //handelMail(tokenData, { ...payload, status: SUBMITTED });
      return resSend(
        res,
        true,
        200,
        "BTN number is generated and saved succesfully!",
        null,
        null
      );
    } else {
      return resSend(
        res,
        false,
        200,
        "Data not inserted! Try Again!",
        null,
        null
      );
    }
  } catch (error) {
    resSend(res, false, 500, "Internal server error", error.message, null);
  }
};

const btnPbgSubmitByDO = async (req, res) => {
  try {
    const client = await poolClient();
    await client.query("BEGIN");
    try {
      let {
        btn_num,
        purchasing_doc_no,
        net_payable_amount,
        assign_to,
        status,
      } = req.body;
      const tokenData = { ...req.tokenData };

      if (!btn_num) {
        return resSend(
          res,
          false,
          200,
          "BTN number is missing!",
          "No BTN number",
          null
        );
      }

      // BTN VALIDATION

      const btnCurrnetStatus = await btnCurrentDetailsCheck(client, {
        btn_num,
      });
      if (btnCurrnetStatus.isInvalid) {
        return resSend(
          res,
          false,
          200,
          `BTN ${btn_num} ${btnCurrnetStatus.message}`,
          btn_num,
          null
        );
      }
      // const btnRejectCheck = await btnDetailsCheck(client, {
      //   btn_num,
      //   status: REJECTED,
      // });

      // if (parseInt(btnRejectCheck.count)) {
      //   return resSend(
      //     res,
      //     false,
      //     200,
      //     `BTN ${btn_num} already rejected`,
      //     btn_num,
      //     null
      //   );
      // }

      if (status === REJECTED) {
        if (!req.body.remarks) {
          return resSend(
            res,
            false,
            200,
            `please send remarks when ${REJECTED} !!`,
            null,
            null
          );
        }
        console.log("Fghjkjb", req.body);
        const response1 = await btnReject(req.body, tokenData, client);
        if (response1 == false) {
          console.log(response1);
          // await client.query("COMMIT");
          await client.query("ROLLBACK");
          return resSend(res, false, 200, `SAP not connected.`, null, null);
        } else if (response1 == true) {
          await client.query("COMMIT");
        }
        return resSend(res, true, 200, "Rejected successfully !!", null, null);
      }

      console.log("tokenData", tokenData);
      let payload = { ...req.body, created_by: tokenData?.vendor_code };

      console.log(payload);

      // Check required fields
      if (!net_payable_amount) {
        return resSend(res, false, 200, "Net payable is missing!", null, null);
      }

      // Check BTN by BTN Number
      let checkBTNR = await checkBTNRegistered(btn_num, purchasing_doc_no);
      let isInserted = false;
      let whereCondition;
      if (checkBTNR) {
        //return resSend(res, false, 200, "BTN is already submitted!", null, null);
        isInserted = true;
      }

      // created at
      let created_at = getEpochTime(); //new Date().toLocaleDateString();
      payload = { ...payload, created_at };

      // INSERT data into BTN List Table
      let d = await fetchBTNListByPOAndBTNNum(btn_num, purchasing_doc_no);
      if (d?.status) {
        let btn_list_payload = d?.data;
        console.log("btn_list_payload: ", btn_list_payload);
        btn_list_payload.net_payable_amount = net_payable_amount;
        payload = {
          ...payload,
          net_claim_amount: btn_list_payload?.net_claim_amount,
          btn_type: btn_list_payload?.btn_type,
        };
        // let list_q = generateQuery(INSERT, BTN_LIST, btn_list_payload);
        // console.log("list_q", list_q);
        // const res_list = await getQuery({
        //   query: list_q.q,
        //   values: list_q.val,
        // });
        // console.log("res_list", res_list);
      } else {
        return resSend(res, false, 200, d?.message, null, null);
      }

      // INSERT data into BTN ASSIGN Table
      let assign_payload = {
        btn_num,
        purchasing_doc_no,
        assign_by: payload.created_by,
        assign_to: payload.assigned_to,
        last_assign: true,
        assign_by_fi: "",
        assign_to_fi: "",
        last_assign_fi: false,
      };

      console.log("assign_payload", assign_payload);
      let assign_q;
      if (isInserted == true) {
        // update
        whereCondition = {
          btn_num: assign_payload.btn_num,
          purchasing_doc_no: assign_payload.purchasing_doc_no,
        };
        assign_q = generateQuery(
          UPDATE,
          BTN_ASSIGN,
          assign_payload,
          whereCondition
        );
      } else {
        //insert
        assign_q = generateQuery(INSERT, BTN_ASSIGN, assign_payload);
      }

      // let assign_q = generateQuery(INSERT, BTN_ASSIGN, assign_payload);
      const res_assign = await poolQuery({
        client,
        query: assign_q.q,
        values: assign_q.val,
      });

      console.log("res_assign", res_assign);

      // if (res_assign <= 0) {
      //   return resSend(
      //     res,
      //     false,
      //     200,
      //     "Something went wrong. Please restart and try again!",
      //     null,
      //     null
      //   );
      // }
      // return false;
      console.log("BTN LIST PAYLOAD", payload);
      payload.vendor_code = tokenData?.vendor_code;
      let resBtnList = await insertUpdateToBTNList(
        payload,
        SUBMITTED_BY_DO,
        isInserted
      );
      console.log("BTN LIST RESPONSE", resBtnList);
      if (!resBtnList?.status) {
        return resSend(
          res,
          false,
          200,
          `Something went wrong in BTN List!`,
          null,
          null
        );
      }
      // return false;
      // INSERT Data into btn_do BTN_MATERIAL_DO table
      // console.log("payload", payload);
      delete payload.assign_to;
      delete payload.p_sdbg_amount;
      delete payload.p_estimate_amount;
      delete payload.created_by;
      delete payload.net_claim_amount;
      delete payload.btn_type;
      delete payload.vendor_code;
      payload.created_at = convertToEpoch(new Date());
      payload.ld_ge_date = convertToEpoch(new Date(payload.ld_ge_date));

      // let btn_do_q;
      // if (isInserted == true) {
      //   // update
      //   whereCondition = {
      //     btn_num: payload.btn_num,
      //     purchasing_doc_no: payload.purchasing_doc_no,
      //   };
      //   btn_do_q = await generateQuery(
      //     UPDATE,
      //     BTN_MATERIAL_DO,
      //     payload,
      //     whereCondition
      //   );
      //   console.log("update1..");
      // } else {
      //   //insert
      //   btn_do_q = await generateQuery(INSERT, BTN_MATERIAL_DO, payload);
      //   console.log("insert1..");
      // }
      // //let { q, val } = generateQuery(INSERT, BTN_MATERIAL_DO, payload);
      // const result = await poolQuery({
      //   client,
      //   query: btn_do_q.q,
      //   values: btn_do_q.val,
      // });
      assign_to = assign_payload.assign_to;
      try {
        const sendSap = await btnSubmitByDo(
          { btn_num, purchasing_doc_no, assign_to },
          tokenData
        );

        if (sendSap == false) {
          console.log(sendSap);
          // await client.query("COMMIT");
          await client.query("ROLLBACK");
          return resSend(res, false, 200, `SAP not connected.`, null, null);
        } else if (sendSap == true) {
          await client.query("COMMIT");
          handelMail(tokenData, {
            ...payload,
            assign_to,
            status: SUBMIT_BY_DO,
          });
        }
      } catch (error) {
        console.log("error", error.message);
      }
      console.log("insert1..");
      console.log(result);

      if (!result.error) {
        return resSend(res, true, 200, "BTN has been updated!", null, null);
      } else {
        // return resSend(res, false, 200, JSON.stringify(result), null, null);
      }
    } catch (error) {
      resSend(res, false, 500, Message.SERVER_ERROR, error.message, null);
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, true, 500, Message.DB_CONN_ERROR, error.message, null);
  }
};

async function btnSubmitByDo(btnPayload, tokenData) {
  let status = false;
  console.log("send to sap payload -- >", btnPayload);
  try {
    const vendorQuery = `WITH ranked_assignments AS (
            SELECT
                btn_assign.*,
                ROW_NUMBER() OVER (PARTITION BY btn_assign.btn_num ORDER BY btn_assign.ctid DESC) AS rn
            FROM
                btn_assign
        )
        SELECT 
          btn_pbg.*,
        	ged.invno, 
        	ged.inv_date as invoice_date,
        	vendor.stcd3,
        	users.pernr as finance_auth_id,
        	users.cname as finance_auth_name,
        	vendor.name1 as vendor_name,
        	assign_users.cname as assign_name,
        	ranked_assignments.assign_by as assign_id

        FROM 
            btn_pbg
        LEFT JOIN 
            ranked_assignments
            ON (btn_pbg.btn_num = ranked_assignments.btn_num
            AND ranked_assignments.rn = 1)
        LEFT JOIN zmm_gate_entry_d as ged
        		ON( btn_pbg.purchasing_doc_no = ged.ebeln AND btn_pbg.invoice_no = ged.invno)
        LEFT JOIN lfa1 as vendor
        		ON(btn_pbg.vendor_code = vendor.lifnr)
        LEFT JOIN pa0002 as users
        		ON(users.pernr::character varying = $1)
        LEFT JOIN pa0002 as assign_users
        		ON(assign_users.pernr::character varying = ranked_assignments.assign_by)
        WHERE 
            btn_pbg.btn_num = $2`;

    let btnDetails = await getQuery({
      query: vendorQuery,
      values: [btnPayload.assign_to, btnPayload.btn_num],
    });

    let btn_payload = {
      EBELN: btnPayload.purchasing_doc_no || btnDetails[0]?.purchasing_doc_no, // PO NUMBER
      LIFNR: btnDetails[0]?.vendor_code, // VENDOR CODE
      RERNAM: btnDetails[0]?.vendor_name, // REG CREATOR NAME --> VENDOR NUMBER
      STCD3: btnDetails[0]?.stcd3, // VENDOR GSTIN NUMBER
      ZVBNO: btnDetails[0]?.invno, // GATE ENTRY INVOCE NUMBER
      VEN_BILL_DATE: getYyyyMmDd(
        new Date(btnDetails[0]?.invoice_date).getTime()
      ), // GATE ENTRY INVOICE DATE
      PERNR: tokenData.vendor_code, // DO ID
      ZBTNO: btnPayload.btn_num, //  BTN NUMBER
      ERDAT: getYyyyMmDd(getEpochTime()), // VENDOR BILL SUBMIT DATE
      ERZET: timeInHHMMSS(), // VENDOR BILL SUBMIT TIME
      RERDAT: getYyyyMmDd(getEpochTime()), //REGISTRATION NUMBER --- VENDOR BILL SUBMIT DATE
      RERZET: timeInHHMMSS(), //REGISTRATION NUMBER --- VENDOR BILL SUBMIT TIME
      DPERNR1: tokenData.vendor_code, // DO NUMBER
      DRERDAT1: getYyyyMmDd(getEpochTime()), // DEPARTMETN RECECE DATE --> WHEN SUBMIT DO
      DRERZET1: timeInHHMMSS(), // DEPARTMETN RECECE TIME --> WHEN SUBMIT DO
      DRERNAM1: tokenData.name, // DEPARTMETN RECECE DO ID --> WHEN SUBMIT DO
      DAERDAT: getYyyyMmDd(getEpochTime()), // DEPARTMENT APPROVAL DATE --> DO SUBMISSION DATE
      DAERZET: timeInHHMMSS(), // DEPARTMENT APPROVAL DATE --> DO SUBMISSION TIME
      DAERNAM: tokenData.name, // DEPARTMENT APPROVAL NAME --> DO NAME

      // DEERDAT: "", // REJECTION DATE
      // DEERZET: timeInHHMMSS(), // REJECTION TIME
      // DEERNAM: "", // DO ( WHO REJECTED)
      // ZRMK2: "", // "REJECTION REASON REMARKS / DO SUBMIT REMARKS"

      DFERDAT: getYyyyMmDd(getEpochTime()), // DO SUBMIT DATE
      DEFRZET: timeInHHMMSS(), // DO SUBMIT TIEM
      DEFRNAM: tokenData.name || "", // DO SUBMIT NAME ( DO NAME)
      DSTATUS: "4", // "4"
      DPERNR: tokenData.vendor_code, //  (DO)

      FPRNR1: btnPayload.assign_to || "", // FINACE AUTHIRITY ID ( )
      FPRNAM1: btnDetails[0]?.assign_name || "", // FINANCE
      FSTATUS: "", // BLANK STATUS
    };

    /**
     * IF BTN REJECTED BY DO
     */
    if (btnPayload.status === REJECTED) {
      btn_payload = {
        ...btn_payload,
        DEERDAT: getYyyyMmDd(getEpochTime()), // REJECTION DATE
        DEERZET: timeInHHMMSS(), // REJECTION TIME
        DEERNAM: tokenData.name, // DO ( WHO REJECTED)
        ZRMK2: btnPayload.rejectedMessage || "Rejeced by DO", // "REJECTION REASON REMARKS / DO SUBMIT REMARKS"
        DSTATUS: "2", // rejected status
      };
    }

    const sapBaseUrl = process.env.SAP_HOST_URL || "http://10.181.1.31:8010";
    const postUrl = `${sapBaseUrl}/sap/bc/zobps_do_out`;
    console.log("btnPayload--", postUrl, btn_payload);
    const postResponse = await makeHttpRequest(postUrl, "POST", btn_payload);
    if (
      postResponse.statusCode &&
      postResponse.statusCode >= 200 &&
      postResponse.statusCode <= 226
    ) {
      status = true;
    }
    console.log("POST Response from the server:", postResponse);
  } catch (error) {
    console.error("Error making the request:", error.message);
  } finally {
    return status;
  }
}

async function btnReject(data, tokenData, client) {
  try {
    const obj = {
      btn_num: data.btn_num,
      remarks: data.remarks,
    };

    // const { q, val } = generateQuery(UPDATE, BTN_MATERIAL, { status: REJECTED }, obj);
    // const result = await query({ query: q, values: val });

    await updateBtnListTable(client, obj);

    const status = await btnSubmitByDo({ ...data, assign_to: null }, tokenData);

    return status; //{ btn_num: data.btn_num };
  } catch (error) {
    throw error;
  }
}

module.exports = { submitPbg, btnPbgSubmitByDO };
