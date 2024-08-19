// const { query } = require("../config/dbConfig");
const { getEpochTime, getYyyyMmDd, generateQuery } = require("../lib/utils");
const { EKPO, BTN_SERVICE_HYBRID } = require("../lib/tableName");

const { resSend } = require("../lib/resSend");
const { APPROVED } = require("../lib/status");
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
        return resSend(res, false, 400, Message.MANDATORY_PARAMETR, "Reference_no missing", null);
      }

      const q = `SELECT line_item_array FROM wdc WHERE reference_no = $1 LIMIT 1`;
      let result = await poolQuery({ client, query: q, values: [reference_no] });
      if (result[0]?.line_item_array) {
        result = JSON.parse(result[0]?.line_item_array);
      }
      const line_item_ekpo_q = `SELECT EBELP AS line_item_no, MATNR AS matarial_code, TXZ01 AS description, NETPR AS po_rate, MEINS AS unit from ${EKPO} WHERE EBELN = $1`;
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
    const client = poolClient();
    try {
      // let {
      //   purchasing_doc_no,
      //   invoice_no,
      //   invoice_value,
      //   debit_note,
      //   credit_note,
      //   hsn_gstn_icgrn,
      //   wdc_number,
      //   assigned_to,
      // } = req.body;

      const filesPaylaod = req.files;
      const tempPayload = req.body;
      const tokenData = req.tokenData;

      // Check required fields
      if (!JSON.parse(tempPayload.hsn_gstn_icgrn)) {
        return resSend(res, false, 200, "Please check HSN code, GSTIN, Tax rate is as per PO!", null, null);
      }

      // Check required fields
      if (!tempPayload.invoice_value) {
        return resSend(res, false, 200, Message.MANDATORY_PARAMETR, "Invoice Value is missing!", null);
      }
      if (!tempPayload.purchasing_doc_no || !tempPayload.invoice_no) {
        return resSend(res, false, 200, Message.MANDATORY_PARAMETR, "Invoice Number is missing!", null);
      }

      // check invoice number is already present in DB

      let check_invoice_q = `SELECT count(invoice_no) as count FROM ${BTN_SERVICE_HYBRID} WHERE invoice_no = $1 and vendor_code = $1`;
      let check_invoice = await poolQuery({
        client,
        query: check_invoice_q,
        values: [tempPayload.invoice_no, tokenData.vendor_code],
      });

      if (check_invoice && check_invoice[0].count > 0) {
        return resSend(res, false, 200, "BTN is already created under the invoice number.", null, null);
      }

      let payload = payloadObj(tempPayload)
      // BTN NUMBER GENERATE
      const btn_num = await create_btn_no();
      // UPLOAD FILES DATA
      const uploadedFiles = filesData(filesPaylaod);

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

      // INSERT Data into btn table
      // let btnQ = `INSERT INTO ${BTN_SERVICE_HYBRID} SET
      //   btn_num = '${btn_num}',
      //   purchasing_doc_no = '${purchasing_doc_no}',
      //   vendor_name = '${tokenData.iss}',
      //   vendor_code = '${tokenData.vendor_code}',
      //   invoice_no = '${invoice_no ? invoice_no : ""}',
      //   invoice_value='${invoice_value ? invoice_value : ""}',
      //   cgst='${cgst ? cgst : ""}',
      //   igst='${igst ? igst : ""}',
      //   sgst='${sgst ? sgst : ""}',
      //   invoice_filename ='${invoice_filename ? invoice_filename : ""}',
      //   e_invoice_no='${e_invoice_no ? e_invoice_no : ""}',
      //   e_invoice_filename ='${e_invoice_filename ? e_invoice_filename : ""}',
      //   debit_note='${debit_note ? debit_note : ""}',
      //   credit_note='${credit_note ? credit_note : ""}',
      //   debit_credit_filename='${debit_credit_filename ? debit_credit_filename : ""
      //       }',
      //   net_claim_amount='${net_claim_amount ? net_claim_amount : ""}',
      //   net_claim_amt_gst='${net_claim_amt_gst ? net_claim_amt_gst : ""}',
      //   wdc_number='${wdc_number ? wdc_number : ""}',
      //   hsn_gstn_icgrn='${hsn_gstn_icgrn ? (hsn_gstn_icgrn === true ? 1 : 0) : 0}',
      //   created_at= ${getEpochTime()},
      //   created_by_id = '${tokenData.vendor_code}',
      //   assigned_to='${assigned_to ? assigned_to : ""}',
      //   btn_type='hybrid-bill-material'
      // `;
      const { q, val } = generateQuery(INSERT, BTN_SERVICE_HYBRID, payload);

      console.log(payload, q, val);
      let result = await poolQuery({ client, query: q, values: val });

      resSend(res, true, 201, Message.BTN_CREATED, "BTN Created. No. "+ btn_num, null);
    } catch (error) {
      resSend(res, false, 500, Message.DATA_FETCH_ERROR, error.message, null);
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, false, 500, Message.DB_CONN_ERROR, error.message, null);
  }
};

module.exports = {
  submitBtnServiceHybrid,
  getWdcInfoServiceHybrid,
};
