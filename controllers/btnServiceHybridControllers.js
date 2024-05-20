const { query } = require("../config/dbConfig");
const { getEpochTime, getYyyyMmDd } = require("../lib/utils");
const {EKPO, BTN_SERVICE_HYBRID } = require("../lib/tableName");

const { resSend } = require("../lib/resSend");
const { APPROVED } = require("../lib/status");
const { create_btn_no } = require("../services/po.services");

const { checkTypeArr } = require("../utils/smallFun");


const getWdcInfoServiceHybrid = async (req, res) => {
  try {
      const { purchasing_doc_no, reference_no } = req.query;

      const q = `SELECT line_item_array FROM wdc WHERE reference_no = ? LIMIT 1`;
      let result = await query({
          query: q,
          values: [reference_no],
        });
        console.log(reference_no);
        result = JSON.parse(result[0].line_item_array);

      const line_item_ekpo_q = `SELECT EBELP AS line_item_no, MATNR AS matarial_code, TXZ01 AS description, NETPR AS po_rate, MEINS AS unit from ${EKPO} WHERE EBELN = ?`;
      let get_line_item_ekpo = await query({ query: line_item_ekpo_q, values: [purchasing_doc_no] });
      console.log(get_line_item_ekpo);
      //
              const data = result.map((el2) => {
                const DOObj =   get_line_item_ekpo.find((elms) => elms.line_item_no == el2.line_item_no);
                
                return DOObj ? {...DOObj, ...el2} : el2;
              });
                console.log(data);
// 
//return;
        if( result.length) {
          resSend(res, true, 200, "Succesfully fetched all data!", JSON.parse(result[0].line_item_array), null);
        } else {
          resSend(res, false, 200, "No record found from the WDC no!", null, null);
        }
     
  } catch (error) {
    console.error(error);
    resSend(res, false, 200, "Something went wrong when fetching the WDC dates!", null, null);
  }


};

const submitBtnServiceHybrid = async (req, res) => {
  //resSend(res,false,200,"dd!",req.body,null);
  let {
    purchasing_doc_no,
    invoice_no,
    invoice_value,
    e_invoice_no,
    debit_note,
    credit_note,
    net_claim_amount,
    cgst,
    igst,
    sgst,
    net_claim_amt_gst,
    hsn_gstn_icgrn,
    wdc_number,
    assigned_to
  } = req.body;
  let payloadFiles = req.files;
  const tokenData = { ...req.tokenData };

  // Check required fields
  if (!JSON.parse(hsn_gstn_icgrn)) {
    return resSend(res, false, 200, "Please check HSN code, GSTIN, Tax rate is as per PO!", null, null);
  }

  // Check required fields
  if (!invoice_value || !invoice_value.trim() === "") {
    return resSend(res, false, 200, "Invoice Value is missing!", null, null);
  }
  if (
    !purchasing_doc_no ||
    !purchasing_doc_no.trim() === "" ||
    !invoice_no ||
    !invoice_no.trim() === ""
  ) {
    return resSend(res, false, 200, "Invoice Number is missing!", null, null);
  }

  // check invoice number is already present in DB
  let check_invoice_q = `SELECT count(invoice_no) as count FROM ${BTN_SERVICE_HYBRID} WHERE invoice_no = ? and vendor_code = ?`;
  let check_invoice = await query({query: check_invoice_q, values: [invoice_no, tokenData.vendor_code],});

  if (checkTypeArr(check_invoice) && check_invoice[0].count > 0) {
    return resSend(res, false, 200, "BTN is already created under the invoice number.", null, null);
  }

  // Handle uploaded files
  let invoice_filename;
  payloadFiles["invoice_filename"]
    ? (invoice_filename = payloadFiles["invoice_filename"][0]?.filename)
    : null;

  let e_invoice_filename;
  payloadFiles["e_invoice_filename"]
    ? (e_invoice_filename = payloadFiles["e_invoice_filename"][0]?.filename)
    : null;

  let debit_credit_filename;
  payloadFiles["debit_credit_filename"]
    ? (debit_credit_filename =
        payloadFiles["debit_credit_filename"][0]?.filename)
    : null;

  const btn_num = await create_btn_no("");

  net_claim_amount = parseFloat(invoice_value) + parseFloat(debit_note) - parseFloat(credit_note);

  // MATH Calculation
  if (!debit_note || debit_note === "") {
    debit_note = 0;
  }
  if (!credit_note || credit_note === "") {
    credit_note = 0;
  }

  // INSERT Data into btn table
  let btnQ = `INSERT INTO ${BTN_SERVICE_HYBRID} SET
    btn_num = '${btn_num}',
    purchasing_doc_no = '${purchasing_doc_no}',
    vendor_name = '${tokenData.iss}',
    vendor_code = '${tokenData.vendor_code}',
    invoice_no = '${invoice_no ? invoice_no : ""}',
    invoice_value='${invoice_value ? invoice_value : ""}',
    cgst='${cgst ? cgst : ""}',
    igst='${igst ? igst : ""}',
    sgst='${sgst ? sgst : ""}',
    invoice_filename ='${invoice_filename ? invoice_filename : ""}',
    e_invoice_no='${e_invoice_no ? e_invoice_no : ""}',
    e_invoice_filename ='${e_invoice_filename ? e_invoice_filename : ""}',
    debit_note='${debit_note ? debit_note : ""}',
    credit_note='${credit_note ? credit_note : ""}',
    debit_credit_filename='${debit_credit_filename ? debit_credit_filename : ""}',
    net_claim_amount='${net_claim_amount ? net_claim_amount : ""}',
    net_claim_amt_gst='${net_claim_amt_gst ? net_claim_amt_gst : ""}',
    wdc_number='${wdc_number ? wdc_number : ""}',
    hsn_gstn_icgrn='${hsn_gstn_icgrn ? (hsn_gstn_icgrn === true ? 1 : 0) : 0}',
    created_at= ${getEpochTime()},
    created_by_id = '${tokenData.vendor_code}',
    assigned_to='${assigned_to ? assigned_to : ""}',
    btn_type='hybrid-bill-material'
  `;
  let result = await query({query: btnQ, values: [],});
console.log(result);

};



module.exports = {
  submitBtnServiceHybrid,
  getWdcInfoServiceHybrid
};
