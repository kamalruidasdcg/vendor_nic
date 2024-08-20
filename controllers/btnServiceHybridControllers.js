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
const { INSERT } = require("../lib/constant");

const getWdcInfoServiceHybrid = async (req, res) => {
  try {
    const client = await poolClient();
    try {
      const { purchasing_doc_no, reference_no } = req.query;

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



module.exports = {
  submitBtnServiceHybrid,
  getWdcInfoServiceHybrid,
};
