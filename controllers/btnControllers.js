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
const { create_btn_no } = require("../services/po.services");
const { checkTypeArr } = require("../utils/smallFun");

const fetchAllBTNs = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return resSend(
      res,
      false,
      200,
      "PO number is missing, please refresh and retry!",
      null,
      null
    );
  }

  let btnQ = `SELECT * FROM btn WHERE po = ?`;

  let result = await query({
    query: btnQ,
    values: [id],
  });

  return resSend(res, true, 200, "ALL data from BTNs", result, null);
};

const fetchBTNByNum = async (req, res) => {
  const { id, btn_num } = req.query;
  console.log("hello", id, btn_num);
  if (!id || !btn_num) {
    return resSend(
      res,
      false,
      200,
      "PO number or BTN number is missing, please refresh and retry!",
      null,
      null
    );
  }

  let btnQ = `SELECT * FROM btn WHERE po = ? and btn_num = ?`;

  let result = await query({
    query: btnQ,
    values: [id, btn_num],
  });

  return resSend(res, true, 200, "ALL data from BTNs", result, null);
};

const getImpDates = async (req, res) => {
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

    resSend(
      res,
      true,
      200,
      "Succesfully fetched all important dates!",
      obj,
      null
    );
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

const submitBTN = async (req, res) => {
  console.log("helllo");
  let {
    po,
    invoice_no,
    invoice_value,
    e_invoice_no,
    debit_note,
    credit_note,
    gate_entry_no,
    gate_entry_date,
    grn_no_1,
    grn_no_2,
    grn_no_3,
    grn_no_4,
    icgrn_no_1,
    icgrn_no_2,
    icgrn_no_3,
    icgrn_no_4,
    hsn_gstn_icgrn,
    ld_gate_entry_date,
    ld_contractual_date,
  } = req.body;
  let payloadFiles = req.files;
  console.log("Invoice number", invoice_no);

  // Check required fields
  if (!po || !po.trim() === "" || !invoice_no || !invoice_no.trim() === "") {
    return resSend(res, false, 200, "Invoice Number is missing!", null, null);
  }

  // check invoice number is already present in DB
  let check_invoice_q = `SELECT count(invoice_no) as count FROM btn WHERE invoice_no = ?`;
  let check_invoice = await query({
    query: check_invoice_q,
    values: [invoice_no],
  });
  console.log(check_invoice);
  if (checkTypeArr(check_invoice) && check_invoice.count > 0) {
    return resSend(
      res,
      false,
      200,
      "You can't generate BTN with the same invoice number!",
      null,
      null
    );
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

  let c_sdbg_filename;
  payloadFiles["c_sdbg_filename"]
    ? (c_sdbg_filename = payloadFiles["c_sdbg_filename"][0]?.filename)
    : null;

  let get_entry_filename;
  payloadFiles["get_entry_filename"]
    ? (get_entry_filename = payloadFiles["get_entry_filename"][0]?.filename)
    : null;

  let demand_raise_filename;
  payloadFiles["demand_raise_filename"]
    ? (demand_raise_filename =
        payloadFiles["demand_raise_filename"][0]?.filename)
    : null;

  let pbg_filename;
  payloadFiles["pbg_filename"]
    ? (pbg_filename = payloadFiles["pbg_filename"][0]?.filename)
    : null;

  // generate btn num
  const btn_num = await create_btn_no("btn");
  const icgrn_total = icgrn_no_1 + icgrn_no_2 + icgrn_no_3 + icgrn_no_4;

  // MATH Calculation
  let net_claim_amount = invoice_value + debit_note - credit_note;

  // GET Contractual Dates from other Table
  let c_sdbg_date;
  let c_drawing_date;
  let c_qap_date;
  let c_ilms_date;
  let c_sdbg_date_q = `SELECT PLAN_DATE, MTEXT FROM zpo_milestone WHERE EBELN = ?`;
  let c_dates = await query({
    query: c_sdbg_date_q,
    values: [po],
  });
  console.log(c_dates);
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
    values: [po],
  });
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

  // INSERT Data into btn table
  let btnQ = `INSERT INTO btn SET 
    btn_num = '${btn_num}', 
    po = '${po}', 
    invoice_no = '${invoice_no ? invoice_no : null}', 
    invoice_value='${invoice_value ? invoice_value : null}',
    invoice_filename ='${invoice_filename ? invoice_filename : null}',
    e_invoice_no='${e_invoice_no ? e_invoice_no : null}',
    e_invoice_filename ='${e_invoice_filename ? e_invoice_filename : null}',
    debit_note='${debit_note ? debit_note : null}',
    credit_note='${credit_note ? credit_note : null}',
    debit_credit_filename='${
      debit_credit_filename ? debit_credit_filename : null
    }',
    net_claim_amount='${net_claim_amount ? net_claim_amount : null}',
    c_sdbg_date='${c_sdbg_date ? c_sdbg_date : null}',
    c_sdbg_filename='${c_sdbg_filename ? c_sdbg_filename : null}',
    a_sdbg_date='${a_sdbg_date ? a_sdbg_date : null}',
    demand_raise_filename='${
      demand_raise_filename ? demand_raise_filename : null
    }',
    gate_entry_no='${gate_entry_no ? gate_entry_no : null}',
    gate_entry_date='${gate_entry_date ? gate_entry_date : null}',
    get_entry_filename='${get_entry_filename ? get_entry_filename : null}',
    grn_no_1='${grn_no_1 ? grn_no_1 : null}',
    grn_no_2='${grn_no_2 ? grn_no_2 : null}',
    grn_no_3='${grn_no_3 ? grn_no_3 : null}',
    grn_no_4='${grn_no_4 ? grn_no_4 : null}',
    icgrn_no_1='${icgrn_no_1 ? icgrn_no_1 : null}',
    icgrn_no_2='${icgrn_no_2 ? icgrn_no_2 : null}',
    icgrn_no_3='${icgrn_no_3 ? icgrn_no_3 : null}',
    icgrn_no_4='${icgrn_no_4 ? icgrn_no_4 : null}',
    icgrn_total='${icgrn_total ? icgrn_total : null}',
    c_drawing_date='${c_drawing_date ? c_drawing_date : null}',
    a_drawing_date='${a_drawing_date ? a_drawing_date : null}',
    c_qap_date='${c_qap_date ? c_qap_date : null}',
    a_qap_date='${a_qap_date ? a_qap_date : null}',
    c_ilms_date='${c_ilms_date ? c_ilms_date : null}',
    a_ilms_date='${a_ilms_date ? a_ilms_date : null}',
    pbg_filename='${pbg_filename ? pbg_filename : null}',
    hsn_gstn_icgrn='${hsn_gstn_icgrn ? hsn_gstn_icgrn : null}',
    ld_gate_entry_date='${ld_gate_entry_date ? ld_gate_entry_date : null}',
    ld_contractual_date='${ld_contractual_date ? ld_contractual_date : null}'
  `;

  console.log(btnQ);

  let result = await query({
    query: btnQ,
    values: [],
  });

  if (result.affectedRows) {
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
};

module.exports = { fetchAllBTNs, getImpDates, submitBTN, fetchBTNByNum };
