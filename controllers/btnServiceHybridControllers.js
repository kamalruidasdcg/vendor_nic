// const { query } = require("../config/dbConfig");
const { getEpochTime, getYyyyMmDd, generateQuery } = require("../lib/utils");
const { EKPO, BTN_SERVICE_HYBRID, BTN_LIST } = require("../lib/tableName");

const { resSend } = require("../lib/resSend");
const { APPROVED, SUBMITTED_BY_VENDOR } = require("../lib/status");
const { create_btn_no } = require("../services/po.services");

const { checkTypeArr } = require("../utils/smallFun");
const { getQuery, query, poolClient, poolQuery } = require("../config/pgDbConfig");
const Message = require("../utils/messages");
const { filesData, payloadObj } = require("../services/btnServiceHybrid.services");
const { INSERT, ACTION_SDBG, ACTION_PBG, MID_SDBG, HR_ACTION_TYPE_WAGR_COMPLIANCE, HR_ACTION_TYPE_BONUS_COMPLIANCE, HR_ACTION_TYPE_ESI_COMPLIANCE, HR_ACTION_TYPE_PF_COMPLIANCE, HR_ACTION_TYPE_LEAVE_SALARY_COMPLIANCE } = require("../lib/constant");

const getWdcInfoServiceHybrid = async (req, res) => {
  try {
    const client = await poolClient();
    try {

      const { purchasing_doc_no, reference_no, type } = req.query;
      if (type === "list") {
        const wdcList = await poolQuery({ client, query: "SELECT reference_no FROM wdc", values: [] });
        return resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, wdcList, null);
      }

      if (!reference_no) {
        return resSend(res, false, 400, Message.MANDATORY_PARAMETR_MISSING, "Reference_no missing", null);
      }

      const q = `SELECT line_item_array FROM wdc WHERE reference_no = $1 LIMIT 1`;
      let result = await poolQuery({ client, query: q, values: [reference_no] });
      if (result[0]?.line_item_array) {
        result = JSON.parse(result[0]?.line_item_array);
      }
      const line_item_ekpo_q = `SELECT EBELP AS line_item_no, MATNR AS service_code, TXZ01 AS description, NETPR AS po_rate, MEINS AS unit from ${EKPO} WHERE EBELN = $1`;
      let get_line_item_ekpo = await poolQuery({
        client,
        query: line_item_ekpo_q,
        values: [purchasing_doc_no],
      });
      const data = result.map((el2) => {
        const DOObj = get_line_item_ekpo.find(
          (elms) => elms.line_item_no == el2.line_item_no
        );
        return DOObj ? { ...DOObj, ...el2 } : el2;
      });
      resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, data, null);
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
 * INSERT DATA IN BTN LIST TABLE
 * @param {Object} client 
 * @param {Object} data 
 * @param {string} status 
 * @returns { status: boolean data: Object } || Error
 */
const addToBTNList = async (client, data, status) => {
  console.log("data", data);
  try {
    let payload = {
      btn_num: data?.btn_num,
      purchasing_doc_no: data?.purchasing_doc_no,
      net_claim_amount: data?.net_claim_amount,
      net_payable_amount: data?.net_payable_amount,
      vendor_code: data?.vendor_code,
      created_at: data?.created_at,
      btn_type: data?.btn_type,
      status: status,
    };
    console.log("payload", payload);

    let { q, val } = generateQuery(INSERT, BTN_LIST, payload);
    let res = await poolQuery({ client, query: q, values: val });
    if (res.length > 0) {
      return { status: true, data: res };
    }
  } catch (error) {
    throw error;
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
/**
 * GET HR UPLOADED DATA 
 * @param {Object} client 
 * @param {Object} data 
 * @returns Object || Error
 */
const getHrDetails = async (client, data) => {
  try {

    const actionTypeArr = [
      HR_ACTION_TYPE_BONUS_COMPLIANCE, HR_ACTION_TYPE_WAGR_COMPLIANCE, HR_ACTION_TYPE_ESI_COMPLIANCE,
      HR_ACTION_TYPE_PF_COMPLIANCE, HR_ACTION_TYPE_LEAVE_SALARY_COMPLIANCE
    ];
    const initalDataVal = data.length;
    const placeholder = actionTypeArr.map((_, index) => `$${index + initalDataVal + 1}`).join(",");
    const q = ` SELECT    hr.cname      AS hr_name,
                          created_by_id AS hr_id,
                          purchasing_doc_no,
                          created_by_id,
                          action_type,
                          file_name,
                          file_path
                FROM      hr     AS hr_activity
                left join pa0002 AS hr
                ON       (
                                    hr_activity.created_by_id = hr.pernr :: CHARACTER varying )
                WHERE     (
                                    hr_activity.purchasing_doc_no = $1
                          AND       hr_activity.action_type IN (${placeholder}))`;
    console.log("[...data, ...actionTypeArr]", q, placeholder, [...data, ...actionTypeArr]);

    const result = await poolQuery({ client, query: q, values: [...data, ...actionTypeArr] });

    return result;
  } catch (error) {
    throw error;
  }
}
/**
 * SDBG APPROVE FILE DATA
 * @param {Object} client 
 * @param {Object} data 
 * @returns  Object || Error
 */
const getSDBGApprovedFiles = async (client, data) => {
  try {
    let q = `SELECT file_name as sdbg_filename FROM sdbg WHERE purchasing_doc_no = $1 and status = $2 and action_type = $3`;
    let result = await poolQuery({ client, query: q, values: data });
    return result;
  } catch (error) {
    throw error
  }
};

/**
 * 
 * @param {Object} client 
 * @param {Object} data 
 * @returns {Promise<Object>}
 * @throws {Error} If the query execution fails, an error is thrown.
 */
const getPBGApprovedFiles = async (client, data) => {
  try {
    let q = `SELECT file_name as pbg_filename FROM sdbg WHERE purchasing_doc_no = $1 and status = $2 and action_type = $3`;
    let result = await poolQuery({ client, query: q, values: data });
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * GET VENDOR DETAILS
 * @param {Object} client 
 * @param {Object} data 
 * @returns {Promise<Object>}
 * @throws {Error} If the query execution fails, an error is thrown.
 */
const vendorDetails = async (client, data) => {
  try {
    let q = `
            SELECT po.lifnr       AS vendor_code,
                   vendor_t.name1 AS vendor_name,
                   vendor_t.email AS vendor_email,
                   vendor_t.stcd3 AS vendor_gstno
            FROM   ekko AS po
                   left join lfa1 AS vendor_t
                          ON ( po.lifnr = vendor_t.lifnr )
            WHERE  po.ebeln = $1`;
    let result = await poolQuery({
      client,
      query: q,
      values: data,
    });
    return result;
  } catch (error) {
    throw error;
  }

}
/**
 * ACTUAL SUBMISSION DATE
 * @param {Object} client 
 * @param {Object} data 
 * @returns {Promise<Object>}
 * @throws {Error} If the query execution fails, an error is thrown.
 */
const getActualSubminissionDate = async (client, data) => {
  try {

    let a_sdbg_date_q = `SELECT actualSubmissionDate AS "PLAN_DATE", milestoneText AS "MTEXT", milestoneid AS "MID" FROM actualsubmissiondate WHERE purchasing_doc_no = $1`;
    let a_dates = await poolQuery({
      client,
      query: a_sdbg_date_q,
      values: data,
    });
    return a_dates;
  } catch (error) {
    throw error;
  }
}

/**
 * CONTRACTUAL SUBMISSION DATE
 * @param {Object} client 
 * @param {Object} data 
 * @returns {Promise<Object>}
 * @throws {Error} If the query execution fails, an error is thrown.
 */
const getContractutalSubminissionDate = async (client, data) => {
  try {

    let c_sdbg_date_q = `SELECT PLAN_DATE as "PLAN_DATE", MTEXT as "MTEXT", MID AS "MID" FROM zpo_milestone WHERE EBELN = $1`;
    let c_dates = await poolQuery({
      client,
      query: c_sdbg_date_q,
      values: data,
    });
    return c_dates;
  } catch (error) {
    throw error;
  }
}

/**
 * CONTRACTUAL SUBMISSION DATE
 * @param {Object} client 
 * @param {Object} data 
 * @returns {Promise<Object>}
 * @throws {Error} If the query execution fails, an error is thrown.
 */
async function checkHrCompliance(client, data) {
  try {
    const hrUploadedData = await getHrDetails(client, [data.purchasing_doc_no]);
    const hrCompliancUpload = new Set([...hrUploadedData.map((el) => el.action_type)]);
    const hrCompliances = [
      HR_ACTION_TYPE_WAGR_COMPLIANCE,
      HR_ACTION_TYPE_ESI_COMPLIANCE,
      HR_ACTION_TYPE_PF_COMPLIANCE,
    ];

    for (const item of hrCompliances) {
      if (!hrCompliancUpload.has(item)) {
        return { success: false, msg: `Please submit ${item} to process BTN !` };
      }
    }

    return { success: true, msg: "No milestone missing" };
  } catch (error) {
    return { success: false, msg: "An error occurred while checking HR compliance. Please try again later."+error.message };
  }
}


module.exports = {
  submitBtnServiceHybrid,
  getWdcInfoServiceHybrid,
  initServiceHybrid
};
