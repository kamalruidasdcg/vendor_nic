const { query } = require("../config/dbConfig");
const {
  C_SDBG_DATE,
  C_DRAWING_DATE,
  C_QAP_DATE,
  C_ILMS_DATE,
  A_SDBG_DATE,
  A_DRAWING_DATE,
  A_QAP_DATE,
  A_ILMS_DATE,
} = require("../lib/constant");
const { resSend } = require("../lib/resSend");
const { APPROVED } = require("../lib/status");
const { create_btn_no } = require("../services/po.services");
const {
  getSDBGApprovedFiles,
  getGRNs,
  getICGRNs,
  getGateEntry,
  getPBGApprovedFiles,
  checkBTNRegistered,
  getBTNInfo,
  getBTNInfoDO,
  getVendorCodeName,
} = require("../utils/btnUtils");

const { checkTypeArr } = require("../utils/smallFun");

const getBTNDataServiceHybrid = async (req, res) => {
  try {
    const { id } = req.query;
    // GET Contractual Dates from other Table
    let c_sdbg_date;
    let c_drawing_date;
    let c_qap_date;
    let c_ilms_date;
    let c_sdbg_date_q = `SELECT PLAN_DATE, MTEXT FROM zpo_milestone WHERE EBELN = ?`;
    let c_dates = await query({
      query: c_sdbg_date_q,
      values: [id],
    });
    checkTypeArr(c_dates) &&
      c_dates.forEach((item) => {
        if (item.MTEXT === C_SDBG_DATE) {
          c_sdbg_date = item.PLAN_DATE;
        } else if (item.MTEXT === C_DRAWING_DATE) {
          c_drawing_date = item.PLAN_DATE;
        } else if (item.MTEXT === C_QAP_DATE) {
          c_qap_date = item.PLAN_DATE;
        } else if (item.MTEXT === C_ILMS_DATE) {
          c_ilms_date = item.PLAN_DATE;
        }
      });

    // GET Actual Dates from other Table
    let a_sdbg_date;
    let a_drawing_date;
    let a_qap_date;
    let a_ilms_date;
    let a_sdbg_date_q = `SELECT actualSubmissionDate AS PLAN_DATE, milestoneText AS MTEXT FROM actualsubmissiondate WHERE purchasing_doc_no = ?`;
    let a_dates = await query({
      query: a_sdbg_date_q,
      values: [id],
    });
    checkTypeArr(a_dates) &&
      a_dates.forEach((item) => {
        if (item.MTEXT === A_SDBG_DATE) {
          a_sdbg_date = item.PLAN_DATE;
        } else if (item.MTEXT === A_DRAWING_DATE) {
          a_drawing_date = item.PLAN_DATE;
        } else if (item.MTEXT === A_QAP_DATE) {
          a_qap_date = item.PLAN_DATE;
        } else if (item.MTEXT === A_ILMS_DATE) {
          a_ilms_date = item.PLAN_DATE;
        }
      });

    let obj = {
      c_sdbg_date,
      c_drawing_date,
      c_qap_date,
      c_ilms_date,
      a_sdbg_date,
      a_drawing_date,
      a_qap_date,
      a_ilms_date,
    };

    // GET Approved SDBG by PO Number
    let sdbg_filename_result = await getSDBGApprovedFiles(id);

    if (checkTypeArr(sdbg_filename_result)) {
      obj = { ...obj, sdbg_filename: sdbg_filename_result };
    }

    // GET gate by PO Number
    let gate_entry = await getGateEntry(id);
    if (gate_entry) {
      obj = { ...obj, gate_entry };
    }
    console.log("gate_entry", gate_entry);

    // GET GRN Number by PO Number
    let grn_nos = await getGRNs(id);
    if (checkTypeArr(grn_nos)) {
      obj = { ...obj, grn_nos };
    }

    // GET GRN Number by PO Number
    let icgrn_nos = await getICGRNs(id);
    if (icgrn_nos) {
      obj = { ...obj, icgrn_nos };
    }

    // GET Approved SDBG by PO Number
    let pbg_filename_result = await getPBGApprovedFiles(id);
    console.log(pbg_filename_result);

    if (checkTypeArr(pbg_filename_result)) {
      obj = { ...obj, pbg_filename: pbg_filename_result };
    }
    
  // get vendor Info
  obj = { ...obj, vendor : await getVendorCodeName(id)};

    // get WDC Info
  //  obj = { ...obj, vendor : await getWdcInfo(id)};

    resSend(res, true, 200, "Succesfully fetched all data!", obj, null);
  } catch (error) {
    console.error(error);
    resSend(
      res,
      false,
      200,
      "Something went wrong when fetching the dates!",
      null,
      null
    );
  }
};
//
const getWdcInfoServiceHybrid = async (req, res) => {
  try {
      const { reference_no } = req.query;

      const q = `SELECT file_name,file_path,actual_start_date,actual_completion_date FROM wdc WHERE reference_no = ? LIMIT 1`;
      let result = await query({
          query: q,
          values: [reference_no],
        });
        if( result.length) {
          resSend(res, true, 200, "Succesfully fetched all data!", result[0], null);
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
    btn_typ
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
  let check_invoice_q = `SELECT count(invoice_no) as count FROM btn WHERE invoice_no = ? and vendor_code = ?`;
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

  const btn_num = await create_btn_no("BTN");

  net_claim_amount = parseFloat(invoice_value) + parseFloat(debit_note) - parseFloat(credit_note);

  // MATH Calculation
  if (!debit_note || debit_note === "") {
    debit_note = 0;
  }
  if (!credit_note || credit_note === "") {
    credit_note = 0;
  }

  // INSERT Data into btn table
  let btnQ = `INSERT INTO btn SET
    btn_num = '${btn_num}',
    purchasing_doc_no = '${purchasing_doc_no}',
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
    debit_credit_filename='${
      debit_credit_filename ? debit_credit_filename : ""
    }',
    net_claim_amount='${net_claim_amount ? net_claim_amount : ""}',
    c_sdbg_date='${c_sdbg_date ? c_sdbg_date : ""}',
    c_sdbg_filename='${
      sdbg_filename_result ? JSON.stringify(sdbg_filename_result) : ""
    }',
    a_sdbg_date='${a_sdbg_date ? a_sdbg_date : ""}',
    demand_raise_filename='${
      demand_raise_filename ? demand_raise_filename : ""
    }',
    gate_entry_no='${gate_entry_no ? gate_entry_no : ""}',
    gate_entry_date='${gate_entry_date ? gate_entry_date : ""}',
    get_entry_filename='${get_entry_filename ? get_entry_filename : ""}',
    grn_nos='${grn_nos ? grn_nos : ""}',
    icgrn_nos='${icgrn_nos ? icgrn_nos : ""}',
    icgrn_total='${icgrn_total ? icgrn_total : ""}',
    c_drawing_date='${c_drawing_date ? c_drawing_date : ""}',
    a_drawing_date='${a_drawing_date ? a_drawing_date : ""}',
    c_qap_date='${c_qap_date ? c_qap_date : ""}',
    a_qap_date='${a_qap_date ? a_qap_date : ""}',
    c_ilms_date='${c_ilms_date ? c_ilms_date : ""}',
    a_ilms_date='${a_ilms_date ? a_ilms_date : ""}',
    pbg_filename='${pbg_filename ? pbg_filename : ""}',
    hsn_gstn_icgrn='${hsn_gstn_icgrn ? (hsn_gstn_icgrn === true ? 1 : 0) : 0}',
    created_at='${created_at ? created_at : ""}',
    btn_type='hybrid-bill-material'
  `;
  let result = await query({query: btnQ, values: [],});


};



module.exports = {
  submitBtnServiceHybrid,
  getBTNDataServiceHybrid,
  getWdcInfoServiceHybrid
};
