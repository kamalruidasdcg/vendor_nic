const { getEpochTime, getYyyyMmDd, generateQuery } = require("../lib/utils");
const { EKPO, BTN_SERVICE_HYBRID, BTN_SERVICE_CERTIFY_AUTHORITY } = require("../lib/tableName");
const { resSend } = require("../lib/resSend");
const { APPROVED, SUBMITTED_BY_VENDOR } = require("../lib/status");
const { create_btn_no } = require("../services/po.services");
const { poolClient, poolQuery } = require("../config/pgDbConfig");
const Message = require("../utils/messages");
const { filesData, payloadObj, getHrDetails, getSDBGApprovedFiles, getPBGApprovedFiles, vendorDetails, getContractutalSubminissionDate, getActualSubminissionDate, checkHrCompliance, addToBTNList, getGrnIcgrnValue, getServiceEntryValue, forwordToFinacePaylaod } = require("../services/btnServiceHybrid.services");
const { INSERT, ACTION_SDBG, ACTION_PBG, MID_SDBG } = require("../lib/constant");

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
              WHERE (reference_no = $1 AND status = $2) LIMIT 1`;

      let result = await poolQuery({ client, query: q, values: [reference_no, APPROVED] });
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
      if (!tempPayload.c_sdbg_filename || !tempPayload.a_sdbg_date || !tempPayload.c_sdbg_date) {
        return resSend(res, false, 200, Message.MANDATORY_PARAMETR_MISSING, "Send SDBG details", null);
      }



      /**
       * FILE PAYLOADS AND FILE VALIDATION
       */
      const uploadedFiles = filesData(filesPaylaod);
      console.log("uploadedFiles", uploadedFiles);

      if (!uploadedFiles.pf_compliance_filename || !uploadedFiles.esi_compliance_filename) {
        return resSend(res, false, 200, Message.MANDATORY_INPUTS_REQUIRED, "Missing PF or ESI files", null);
      }

      // checking no submitted hr compliance by vendor
      const checkMissingComplience = await checkHrCompliance(client, tempPayload);
      console.log("checkMissingComplience", checkMissingComplience);

      if (!checkMissingComplience.success) {
        return resSend(res, false, 200, checkMissingComplience.msg, "Missing data, Need to be upload by HR", null);
      }



      let payload = payloadObj(tempPayload)
      // BTN NUMBER GENERATE
      const btn_num = await create_btn_no();
      // UPLOAD FILES DATA



      // MATH Calculation
      net_claim_amount = (
        parseFloat(payload.invoice_value)
        + parseFloat(payload.debit_note)
        - parseFloat(payload.credit_note));

      payload = {
        ...payload, btn_num,
        ...uploadedFiles,
        net_claim_amount,
        created_by_id: tokenData.vendor_code
      }

      const { q, val } = generateQuery(INSERT, BTN_SERVICE_HYBRID, payload);

      // console.log(payload, q, val);
      await poolQuery({ client, query: q, values: val });
      await addToBTNList(client, { ...payload, net_payable_amount }, SUBMITTED_BY_VENDOR);
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



const getData = async (req, res) => {
  try {
    const client = await poolClient();
    try {
      const { id, type } = req.query;
      if (!type) {
        return resSend(res, true, 200, Message.MANDATORY_INPUTS_REQUIRED, "Please send a valid type!", null)
      }
      let data;
      let message;
      let success = false;
      let statusCode;
      switch (type) {
        case 'icgrn': {
          // if (!id) {
          //   return resSend(res, true, 200, "Please send icgrn no", Message.MANDATORY_INPUTS_REQUIRED, null)
          // }
          const result = await getGrnIcgrnValue(client, req.query);
          ({ data, message, success, statusCode } = result);
        }
          break;
        case 'service-entry': {
          // if (!id) {
          //   return resSend(res, false, 200, "Please send a valid payload!", Message.MANDATORY_INPUTS_REQUIRED, null)
          // }
          const result = await getServiceEntryValue(client, req.query);
          console.log("result", result);
          ({ data, message, success, statusCode } = result);
          // data = result.data;
          // message = result.message;
          // statusCode = result.statusCode;
          // success = result.success;
        }

          break;
        case 'btn-certify-authrity': {
          const result = await getServiceEntryValue(client, req.query);
          console.log("result", result);
          ({ data, message, success, statusCode } = result);
          // data = result.data;
          // message = result.message;
          // statusCode = result.statusCode;
          // success = result.success;
        }
          break;

        default:
          console.log("swithch default");
          message = "Please send a valid type!"
          return resSend(res, success, 200, "Please send a valid type!", Message.MANDATORY_INPUTS_REQUIRED, null);
      }
      console.log("swithch no");

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
      if (!payload.btn_num || !payload.entry_number || !payload.net_payable_amount || !payload.assign_to_fi) {
        return resSend(res, false, 400, Message.MANDATORY_PARAMETR_MISSING, "btn num or entry_no or net_payable_amount assign_to_fi missing", null);
      }
      const btnChkQuery = `SELECT COUNT(*) from btn_service_hybrid WHERE btn_num = $1 AND bill_certifing_authority = $2`;
      const validAuthrityCheck = await poolQuery({ client, query: btnChkQuery, values: [payload.btn_num, tokenData.vendor_code] });
      if (!parseInt(validAuthrityCheck[0]?.count)) {
        return resSend(res, false, 401, Message.YOU_ARE_UN_AUTHORIZED, "You are not authorize!!", null);
      }
      payload.created_by_id = tokenData.vendor_code;
      const financePaylad = forwordToFinacePaylaod(payload);
      const { q, val } = generateQuery(INSERT, BTN_SERVICE_CERTIFY_AUTHORITY, financePaylad);
      const response = await poolQuery({ client, query: q, values: val });
      const sendSap = true; //await btnSubmitByDo({ btn_num, purchasing_doc_no, assign_to }, tokenData);

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
          btn.btn_num, 
        	btn.purchasing_doc_no,
        	btn.cgst, 
        	btn.sgst, 
        	btn.igst, 
        	btn.net_claim_amount, 
        	btn.invoice_no,
        	btn.vendor_code,
        	ged.invno, 
        	ged.inv_date as invoice_date,
        	vendor.stcd3,
        	users.pernr as finance_auth_id,
        	users.cname as finance_auth_name,
        	vendor.name1 as vendor_name,
        	assign_users.cname as assign_name,
        	ranked_assignments.assign_by as assign_id

        FROM 
            public.btn AS btn
        LEFT JOIN 
            ranked_assignments
            ON (btn.btn_num = ranked_assignments.btn_num
            AND ranked_assignments.rn = 1)
        LEFT JOIN zmm_gate_entry_d as ged
        		ON( btn.purchasing_doc_no = ged.ebeln AND btn.invoice_no = ged.invno)
        LEFT JOIN lfa1 as vendor
        		ON(btn.vendor_code = vendor.lifnr)
        LEFT JOIN pa0002 as users
        		ON(users.pernr::character varying = $1)
        LEFT JOIN pa0002 as assign_users
        		ON(assign_users.pernr::character varying = ranked_assignments.assign_by)
        WHERE 
            btn.btn_num = $2`;

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


module.exports = {
  submitBtnServiceHybrid,
  getWdcInfoServiceHybrid,
  initServiceHybrid,
  getData,
  forwordToFinace
};
