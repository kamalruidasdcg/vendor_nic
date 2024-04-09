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
} = require("../utils/btnUtils");
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

  let btnQ = `SELECT * FROM btn WHERE purchasing_doc_no = ? ORDER BY created_at DESC`;

  let result = await query({
    query: btnQ,
    values: [id],
  });

  return resSend(res, true, 200, "ALL data from BTNs", result, null);
};

const fetchBTNByNum = async (req, res) => {
  const { id, btn_num } = req.query;
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

  let btnQ = `SELECT * FROM btn WHERE purchasing_doc_no = ? and btn_num = ?`;

  let result = await query({
    query: btnQ,
    values: [id, btn_num],
  });

  return resSend(res, true, 200, "ALL data from BTNs", result, null);
};

const fetchBTNByNumForDO = async (req, res) => {
  const { btn_num } = req.query;
  if (!btn_num) {
    return resSend(
      res,
      false,
      200,
      "BTN number is missing, please refresh and retry!",
      null,
      null
    );
  }

  let btnDOQ = `SELECT * FROM btn_do WHERE btn_num = ?`;
  console.log("btn_num", btnDOQ, btn_num);

  let doRes = await query({
    query: btnDOQ,
    values: [btn_num],
  });

  console.log("doRes", doRes);

  return resSend(res, true, 200, "ALL data from BTNs", doRes, null);
};

const getBTNData = async (req, res) => {
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

const submitBTN = async (req, res) => {
  let {
    purchasing_doc_no,
    invoice_no,
    invoice_value,
    e_invoice_no,
    debit_note,
    credit_note,
    gate_entry_no,
    gate_entry_date,
    hsn_gstn_icgrn,
    ld_gate_entry_date,
    ld_contractual_date,
  } = req.body;
  let payloadFiles = req.files;
  const tokenData = { ...req.tokenData };

  // Check required fields
  if (!JSON.parse(hsn_gstn_icgrn)) {
    return resSend(
      res,
      false,
      200,
      "Please check HSN code, GSTIN, Tax rate is as per PO!",
      null,
      null
    );
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
  let check_invoice = await query({
    query: check_invoice_q,
    values: [invoice_no, tokenData.vendor_code],
  });
  if (checkTypeArr(check_invoice) && check_invoice[0].count > 0) {
    return resSend(
      res,
      false,
      200,
      "The invoice number is already in use!",
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

  // GET Approved SDBG by PO Number
  let sdbg_filename_result = await getSDBGApprovedFiles(purchasing_doc_no);

  // GET GRN Number by PO Number
  let grn_nos = await getGRNs(purchasing_doc_no);

  // GET ICGRN Value by PO Number
  let icgrn_total = await getICGRNs(purchasing_doc_no).total_icgrn_value;

  // GET GRN Number by PO Number
  let icgrn_nos = await getICGRNs(purchasing_doc_no);

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
  const btn_num = await create_btn_no("BTN");

  // MATH Calculation
  if (!debit_note || debit_note === "") {
    debit_note = 0;
  }
  if (!credit_note || credit_note === "") {
    credit_note = 0;
  }
  let net_claim_amount =
    parseInt(invoice_value) + parseInt(debit_note) - parseInt(credit_note);

  // GET Contractual Dates from other Table
  let c_sdbg_date;
  let c_drawing_date;
  let c_qap_date;
  let c_ilms_date;
  let c_sdbg_date_q = `SELECT PLAN_DATE, MTEXT FROM zpo_milestone WHERE EBELN = ?`;
  let c_dates = await query({
    query: c_sdbg_date_q,
    values: [purchasing_doc_no],
  });
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
    values: [purchasing_doc_no],
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

  // created at
  let created_at = new Date().toLocaleDateString();

  // INSERT Data into btn table
  let btnQ = `INSERT INTO btn SET 
    btn_num = '${btn_num}', 
    purchasing_doc_no = '${purchasing_doc_no}', 
    vendor_code = '${tokenData.vendor_code}', 
    invoice_no = '${invoice_no ? invoice_no : ""}', 
    invoice_value='${invoice_value ? invoice_value : ""}',
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
    grn_nos='${grn_nos ? JSON.stringify(grn_nos) : ""}',
    icgrn_nos='${icgrn_nos ? JSON.stringify(icgrn_nos) : ""}',
    icgrn_total='${icgrn_total ? icgrn_total : ""}',
    c_drawing_date='${c_drawing_date ? c_drawing_date : ""}',
    a_drawing_date='${a_drawing_date ? a_drawing_date : ""}',
    c_qap_date='${c_qap_date ? c_qap_date : ""}',
    a_qap_date='${a_qap_date ? a_qap_date : ""}',
    c_ilms_date='${c_ilms_date ? c_ilms_date : ""}',
    a_ilms_date='${a_ilms_date ? a_ilms_date : ""}',
    pbg_filename='${pbg_filename ? pbg_filename : ""}',
    hsn_gstn_icgrn='${hsn_gstn_icgrn ? hsn_gstn_icgrn : ""}',
    ld_gate_entry_date='${ld_gate_entry_date ? ld_gate_entry_date : ""}',
    ld_contractual_date='${ld_contractual_date ? ld_contractual_date : ""}',
    created_at='${created_at ? created_at : ""}'
  `;
  console.log("btnQ", btnQ);

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

const submitBTNByDO = async (req, res) => {
  let {
    btn_num,
    ld_ge_date,
    ld_c_date,
    ld_amount,
    p_sdbg_amount,
    p_drg_amount,
    p_qap_amount,
    p_ilms_amount,
    o_deduction,
    total_deduction,
    net_payable_amount,
  } = req.body;
  const tokenData = { ...req.tokenData };

  console.log("tokenData", tokenData);

  // Check required fields
  if (!net_payable_amount) {
    return resSend(res, false, 200, "Net payable is missing!", null, null);
  }

  if (!btn_num) {
    return resSend(res, false, 200, "BTN number is missing!", null, null);
  }

  // Check BTN by BTN Number
  let checkBTNR = await checkBTNRegistered(btn_num);
  if (checkBTNR) {
    return resSend(res, false, 200, "BTN is already submitted!", null, null);
  }
  // created at
  let created_at = new Date().toLocaleDateString();
  console.log(created_at);

  // INSERT Data into btn table
  let btnQ = `INSERT INTO btn_do SET 
    btn_num = '${btn_num}', 
    contractual_ld = '${ld_c_date}', 
    ld_amount = '${ld_amount ? ld_amount : ""}', 
    drg_penalty = '${p_drg_amount ? p_drg_amount : ""}', 
    qap_penalty = '${p_qap_amount ? p_qap_amount : ""}', 
    ilms_penalty='${p_ilms_amount ? p_ilms_amount : ""}',
    other_deduction ='${o_deduction ? o_deduction : ""}',
    total_deduction='${total_deduction ? total_deduction : ""}',
    net_payable_amout ='${net_payable_amount ? net_payable_amount : ""}',
    created_at='${created_at ? created_at : ""}',
    created_by=''
  `;

  let result = await query({
    query: btnQ,
    values: [],
  });

  // GET BTN Info by BTN Number
  // let btnInfo = await getBTNInfo(btn_num);
  // let btnDOInfo = await getBTNInfoDO(btn_num);
  // console.log("result: " + JSON.stringify(btnInfo));
  // console.log("btnDOInfo: " + JSON.stringify(btnDOInfo));

  const btn_payload = {
    ZBTNO: btnInfo[0]?.btn_num, // BTN Number
    ERDAT: new Date.toLocaleDateString(), // BTN Create Date
    ERZET: new Date().toLocaleTimeString(), // BTN Create Time
    ERNAM: "", // Created Person Name
    LAEDA: "", // Not Needed
    AENAM: "NAME", // Vendor Name
    LIFNR: "50000437", // Vendor Code
    ZVBNO: btnInfo?.invoice_no, // Invoice Number
    EBELN: btnInfo?.purchasing_doc_no, // PO Number
    DPERNR1: "", // Not Required
    ZRMK1: "Forwared To Finance", // REMARKS
  };
  console.log("result", result);
  if (result.affectedRows) {
    btnSaveToSap(btn_payload);
    return resSend(res, true, 200, "BTN has been updated!", null, null);
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



async function btnSaveToSap(btnPayload) {
  try {
    const sapBaseUrl = process.env.SAP_HOST_URL || "http://10.181.1.31:8010";
    const postUrl = `${sapBaseUrl}/sap/bc/zobps_out_api`;
    console.log("postUrl", postUrl, btnPayload);
    const postResponse = await makeHttpRequest(postUrl, "POST", btnPayload);
    console.log("POST Response from the server:", postResponse);
  } catch (error) {
    console.error("Error making the request:", error.message);
  }
}

module.exports = {
  fetchAllBTNs,
  getBTNData,
  submitBTN,
  submitBTNByDO,
  fetchBTNByNum,
  fetchBTNByNumForDO,
};
