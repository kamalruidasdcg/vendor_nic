// const { query } = require("../config/dbConfig");
const { getQuery, query, poolClient } = require("../config/pgDbConfig");
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
} = require("../lib/constant");
const {
  BTN_RETURN_DO,
  BTN_FORWORD_FINANCE,
  BTN_UPLOAD_CHECKLIST,
} = require("../lib/event");
const { resSend } = require("../lib/resSend");
const {
  APPROVED,
  SUBMITTED,
  FORWARD_TO_FINANCE,
  REJECTED,
  ASSIGNED,
  FORWARDED_TO_FI_STAFF,
  SUBMIT_BY_DO,
  SUBMITTED_BY_DO,
  SUBMITTED_BY_VENDOR,
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
  getGRNs,
  getICGRNs,
  getGateEntry,
  getPBGApprovedFiles,
  checkBTNRegistered,
  getBTNInfo,
  getBTNInfoDO,
  fetchBTNListByPOAndBTNNum,
} = require("../utils/btnUtils");
const { convertToEpoch } = require("../utils/dateTime");
const { getUserDetailsQuery } = require("../utils/mailFunc");
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

  let btnQ = `SELECT * FROM btn WHERE purchasing_doc_no = $1 ORDER BY created_at DESC`;

  let result = await getQuery({
    query: btnQ,
    values: [id],
  });

  // let btnQ2 = `SELECT * FROM btn_service_hybrid WHERE purchasing_doc_no = ? ORDER BY created_at DESC`;
  let btnQ2 = `SELECT * FROM btn_service_hybrid WHERE purchasing_doc_no = $1 ORDER BY created_at DESC`;

  let result2 = await getQuery({
    query: btnQ2,
    values: [id],
  });
  // let btnQ3 = `SELECT * FROM btn_advance_bill_hybrid WHERE purchasing_doc_no = $1 ORDER BY created_at DESC`;

  // let result3 = await getQuery({
  //   query: btnQ3,
  //   values: [id],
  // });

  let data = result.concat(result2);
  // data = data.concat(result3);

  return resSend(res, true, 200, "ALL data from BTNs", data, null);
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

  // let btnQ = `SELECT * FROM btn WHERE purchasing_doc_no = ? and btn_num = ?`;
  let btnQ = `SELECT * FROM btn WHERE purchasing_doc_no = $1 and btn_num = $2`;

  let result = await getQuery({
    query: btnQ,
    values: [id, btn_num],
  });
  // const gate_entry_q = `SELECT ENTRY_NO AS gate_entry_no,
  // ZMBLNR AS grn_no,
  // INV_DATE AS invoice_date FROM zmm_gate_entry_d WHERE EBELN = ? AND INVNO = ?`;

  // let gate_entry_v = await query({
  //   query: gate_entry_q,
  //   values: [result[0].purchasing_doc_no, result[0].invoice_no],
  // });

  // console.log(gate_entry_v);

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

  let btnDOQ = `SELECT * FROM btn_do WHERE btn_num = $1`;
  console.log("btn_num", btnDOQ, btn_num);

  let doRes = await getQuery({
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
    let c_sdbg_date_q = `SELECT plan_date as "PLAN_DATE", mtext as "MTEXT" FROM zpo_milestone WHERE ebeln = $1`;
    let c_dates = await getQuery({
      query: c_sdbg_date_q,
      values: [id],
    });
    console.log("c_dates", c_dates);
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
    let a_sdbg_date_q = `SELECT actualsubmissiondate AS "PLAN_DATE", milestonetext AS "MTEXT" FROM actualsubmissiondate WHERE purchasing_doc_no = $1`;
    let a_dates = await getQuery({
      query: a_sdbg_date_q,
      values: [id],
    });
    console.log("a_dates", a_dates);
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
    // let icgrn_nos = await getICGRNs(id);
    // if (icgrn_nos) {
    //   obj = { ...obj, icgrn_nos };
    // }

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

const addToBTNList = async (data, status) => {
  console.log("data", data);
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
  let { q, val } = generateQuery(INSERT, BTN_LIST, payload);
  let res = await getQuery({ query: q, values: val });
  if (res.length > 0) {
    return { status: true, data: res };
  }
  return { status: false, data: null };
};

const fetchBTNList = async (req, res) => {
  try {
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
    let btn_list_q = `SELECT * FROM btn_list WHERE purchasing_doc_no = $1`;
    let btn_list = await getQuery({
      query: btn_list_q,
      values: [id],
    });
    if (btn_list.length > 0) {
      return resSend(
        res,
        true,
        200,
        "BTN list has been fetched succesfully!",
        btn_list,
        null
      );
    } else {
      return resSend(res, true, 200, "No btn found", btn_list, null);
    }
  } catch (error) {
    resSend(res, false, 500, "Internal server error", error.message, null);
  }
};

const submitBTN = async (req, res) => {
  let {
    purchasing_doc_no,
    invoice_no,
    invoice_value,
    cgst,
    igst,
    sgst,
    e_invoice_no,
    debit_note,
    credit_note,
    hsn_gstn_icgrn,
    associated_po,
  } = req.body;
  let payloadFiles = req.files;
  const tokenData = { ...req.tokenData };
  let payload = {
    ...req.body,
    vendor_code: tokenData?.vendor_code,
    created_by_id: tokenData?.vendor_code,
    btn_type: "hybrid-bill-material",
    updated_by: "VENDOR",
  };
  delete payload.associated_po;

  // Check required fields
  if (!hsn_gstn_icgrn) {
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
    return resSend(res, false, 200, "Basic Value is mandatory.", null, null);
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
  let check_invoice_q = `SELECT count(invoice_no) as count FROM btn WHERE invoice_no = $1 and vendor_code = $2`;
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

  payloadFiles["e_invoice_filename"]
    ? (payload = {
        ...payload,
        e_invoice_filename: payloadFiles["e_invoice_filename"][0]?.filename,
      })
    : null;

  payloadFiles["debit_credit_filename"]
    ? (payload = {
        ...payload,
        debit_credit_filename:
          payloadFiles["debit_credit_filename"][0]?.filename,
      })
    : null;

  // GET Approved SDBG by PO Number
  let sdbg_filename_result = await getSDBGApprovedFiles(purchasing_doc_no);
  let pbg_filename_result = await getPBGApprovedFiles(purchasing_doc_no);
  console.log("sdbg_filename_result", sdbg_filename_result);
  console.log("pbg_filename_result", pbg_filename_result);

  // // GET GRN Number by PO Number
  let grn_nos = await getGRNs(purchasing_doc_no);

  // GET ICGRN Value by PO Number
  let resICGRN = await getICGRNs({ purchasing_doc_no, invoice_no });
  if (!resICGRN) {
    return resSend(res, false, 200, `Invoice number is not valid!`, null, null);
  }

  payload = {
    ...payload,
    icgrn_total: resICGRN.total_icgrn_value,
    icgrn_nos: resICGRN.icgrn_nos,
    grn_nos,
  };

  // // GET GRN Number by PO Number
  // let icgrn_nos = await getICGRNs(purchasing_doc_no);

  payloadFiles["get_entry_filename"]
    ? (payload = {
        ...payload,
        get_entry_filename: payloadFiles["get_entry_filename"][0]?.filename,
      })
    : null;

  payloadFiles["demand_raise_filename"]
    ? (payload = {
        ...payload,
        demand_raise_filename:
          payloadFiles["demand_raise_filename"][0]?.filename,
      })
    : null;

  // generate btn num
  const btn_num = await create_btn_no("BTN");
  payload = { ...payload, btn_num };

  // MATH Calculation
  if (!debit_note || debit_note === "") {
    debit_note = 0;
  }
  if (!credit_note || credit_note === "") {
    credit_note = 0;
  }
  if (!cgst || cgst === "") {
    cgst = 0;
  }
  if (!sgst || sgst === "") {
    sgst = 0;
  }
  if (!igst || igst === "") {
    igst = 0;
  }

  let net_claim_amount =
    parseFloat(invoice_value) +
    parseFloat(debit_note) -
    parseFloat(credit_note);

  let totalGST = parseFloat(cgst) + parseFloat(sgst) + parseFloat(igst);
  let net_with_gst = net_claim_amount;
  if (totalGST > 0) {
    net_with_gst = net_claim_amount * (1 + totalGST / 100);
    net_with_gst = parseFloat(net_with_gst.toFixed(2));
  }

  payload = { ...payload, net_claim_amount, net_with_gst };

  // GET Contractual Dates from other Table
  let c_sdbg_date_q = `SELECT PLAN_DATE as "PLAN_DATE", MTEXT as "MTEXT" FROM zpo_milestone WHERE EBELN = $1`;
  let c_dates = await getQuery({
    query: c_sdbg_date_q,
    values: [purchasing_doc_no],
  });

  c_dates.forEach((item) => {
    if (item.PLAN_DATE && item.MTEXT === C_SDBG_DATE) {
      payload = { ...payload, c_sdbg_date: new Date(item.PLAN_DATE).getTime() };
    } else if (item.PLAN_DATE && item.MTEXT === C_DRAWING_DATE) {
      payload = {
        ...payload,
        c_drawing_date: new Date(item.PLAN_DATE).getTime(),
      };
    } else if (item.PLAN_DATE && item.MTEXT === C_QAP_DATE) {
      payload = { ...payload, c_qap_date: new Date(item.PLAN_DATE).getTime() };
    } else if (item.PLAN_DATE && item.MTEXT === C_ILMS_DATE) {
      payload = { ...payload, c_ilms_date: new Date(item.PLAN_DATE).getTime() };
    }
  });

  // GET Actual Dates from other Table
  let a_sdbg_date_q = `SELECT actualSubmissionDate AS PLAN_DATE, milestoneText AS MTEXT FROM actualsubmissiondate WHERE purchasing_doc_no = $1`;
  let a_dates = await getQuery({
    query: a_sdbg_date_q,
    values: [purchasing_doc_no],
  });

  a_dates.forEach((item) => {
    if (item.MTEXT === A_SDBG_DATE) {
      if (!item.PLAN_DATE) {
        return resSend(
          res,
          false,
          200,
          `${A_SDBG_DATE} is missing!`,
          null,
          null
        );
      }
      payload = { ...payload, a_sdbg_date: item.PLAN_DATE };
    } else if (item.MTEXT === A_DRAWING_DATE) {
      if (!item.PLAN_DATE) {
        return resSend(
          res,
          false,
          200,
          `${A_SDBG_DATE} is missing!`,
          null,
          null
        );
      }
      payload = { ...payload, a_drawing_date: item.PLAN_DATE };
    } else if (item.MTEXT === A_QAP_DATE) {
      if (!item.PLAN_DATE) {
        return resSend(
          res,
          false,
          200,
          `${A_QAP_DATE} is missing!`,
          null,
          null
        );
      }
      payload = { ...payload, a_qap_date: item.PLAN_DATE };
    } else if (item.MTEXT === A_ILMS_DATE) {
      if (!item.PLAN_DATE) {
        return resSend(
          res,
          false,
          200,
          `${A_ILMS_DATE} is missing!`,
          null,
          null
        );
      }
      payload = { ...payload, a_ilms_date: item.PLAN_DATE };
    }
  });

  // created at
  let created_at = getEpochTime();
  payload = { ...payload, created_at };

  console.log("payload", payload);

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
  let { q, val } = generateQuery(INSERT, BTN_MATERIAL, payload);
  const result = await getQuery({ query: q, values: val });

  associated_po = JSON.parse(associated_po);
  if (associated_po && associated_po !== "" && Array.isArray(associated_po)) {
    await Promise.all(
      associated_po.map(async (item) => {
        if (item && item?.a_po !== "") {
          payload.purchasing_doc_no = item.a_po;
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
          let { q, val } = generateQuery(INSERT, BTN_MATERIAL, payload);
          let res = await getQuery({ query: q, values: val });
          if (res.length <= 0) {
            return resSend(
              res,
              false,
              200,
              "Something went wrong for Associated PO!",
              null,
              null
            );
          }
        }
      })
    );
  }

  // console.log("result", result);

  if (result.length > 0) {
    handelMail(tokenData, { ...payload, status: SUBMITTED });
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
  let { btn_num, purchasing_doc_no, net_payable_amount, assign_to } = req.body;
  const tokenData = { ...req.tokenData };

  console.log("tokenData", tokenData);
  let payload = { ...req.body, created_by: tokenData?.vendor_code };

  console.log(payload);

  // Check required fields
  if (!net_payable_amount) {
    return resSend(res, false, 200, "Net payable is missing!", null, null);
  }

  if (!btn_num) {
    return resSend(res, false, 200, "BTN number is missing!", null, null);
  }

  // Check BTN by BTN Number
  let checkBTNR = await checkBTNRegistered(btn_num, purchasing_doc_no);
  if (checkBTNR) {
    return resSend(res, false, 200, "BTN is already submitted!", null, null);
  }
  // created at
  let created_at = getEpochTime(); //new Date().toLocaleDateString();
  payload = { ...payload, created_at };

  // INSERT data into BTN List Table
  let d = await fetchBTNListByPOAndBTNNum(btn_num, purchasing_doc_no);
  if (d.status) {
    let btn_list_payload = d.data;
    console.log("btn_list_payload: ", btn_list_payload);
    let list_q = generateQuery(INSERT, BTN_LIST, btn_list_payload);
    const res_list = await getQuery({
      query: list_q.q,
      values: list_q.val,
    });
    console.log("res_list", res_list);
  } else {
    return resSend(res, false, 200, d?.message, null, null);
  }

  // INSERT data into BTN ASSIGN Table
  let assign_payload = {
    btn_num,
    purchasing_doc_no,
    assign_by: payload.created_by,
    assign_to,
    last_assign: true,
    assign_by_fi: "",
    assign_to_fi: "",
    last_assign_fi: false,
  };
  let assign_q = generateQuery(INSERT, BTN_ASSIGN, assign_payload);
  const res_assign = await getQuery({
    query: assign_q.q,
    values: assign_q.val,
  });

  if (res_assign <= 0) {
    return resSend(
      res,
      false,
      200,
      "Something went wrong. Please restart and try again!",
      null,
      null
    );
  }

  let resBtnList = await addToBTNList(payload, SUBMITTED_BY_DO);
  // INSERT Data into btn_do table
  // console.log("payload", payload);
  delete payload.assign_to;
  delete payload.p_sdbg_amount;
  delete payload.p_estimate_amount;
  delete payload.created_by;
  payload.created_at = convertToEpoch(new Date());
  payload.ld_ge_date = convertToEpoch(new Date(payload.ld_ge_date));
  let { q, val } = generateQuery(INSERT, BTN_MATERIAL_DO, payload);
  const result = await getQuery({ query: q, values: val });
  handelMail(tokenData, { ...payload, assign_to, status: SUBMIT_BY_DO });
  console.log(result);

  if (result.length > 0) {
    return resSend(res, true, 200, "BTN has been updated!", null, null);
  } else {
    return resSend(res, false, 200, JSON.stringify(result), null, null);
  }

  //return;
  // GET BTN Info by BTN Number
  // let btnInfo = await getBTNInfo(btn_num);
  // let btnDOInfo = await getBTNInfoDO(btn_num);
  // console.log("result: " + JSON.stringify(btnInfo));
  // console.log("btnDOInfo: " + JSON.stringify(btnDOInfo));

  // const qq = `select t1.LIFNR as vendor_code,t2.NAME1 as vendor_name from ekko as t1 LEFT JOIN
  // lfa1 as t2 ON t1.LIFNR = t2.LIFNR where t1.EBELN = $1`;
  // let result_qq = await getQuery({
  //   query: qq,
  //   values: [btnInfo[0].purchasing_doc_no],
  // });

  // const btn_payload = {
  //   ZBTNO: btnInfo[0]?.btn_num, // BTN Number
  //   ERDAT: getYyyyMmDd(getEpochTime()), // BTN Create Date
  //   ERZET: timeInHHMMSS(), // 134562,  // BTN Create Time
  //   ERNAM: tokenData.vendor_code, // Created Person Name
  //   LAEDA: "", // Not Needed
  //   AENAM: result_qq[0].vendor_name, // Vendor Name
  //   LIFNR: result_qq[0].vendor_code, // Vendor Codebtn_v2
  //   ZVBNO: btnInfo[0]?.invoice_no, // Invoice Number
  //   EBELN: btnInfo[0]?.purchasing_doc_no, // PO Number
  //   DPERNR1: assigned_to, // assigned_to
  //   DSTATUS: "4", // sap deparment forword status
  //   ZRMK1: "Forwared To Finance", // REMARKS
  // };
  // console.log("result", result);
  // if (result.length > 0) {
  //   // btnSaveToSap(btn_payload);
  //   return resSend(res, true, 200, "BTN has been updated!", null, null);
  // } else {
  //   return resSend(res, false, 200, JSON.stringify(result), null, null);
  // }
};

async function btnSaveToSap(btnPayload, tokenData) {
  try {
    const qq = `select t1.LIFNR as vendor_code,t2.NAME1 as vendor_name from ekko as t1 LEFT JOIN
    lfa1 as t2 ON t1.LIFNR = t2.LIFNR where t1.EBELN = $1`;
    const vendorQuery = `
              SELECT 
	                          btn.btn_num, 
	                          btn.purchasing_doc_no, 
	                          btn.invoice_no, btn.cgst, 
	                          btn.sgst, 
	                          btn.igst, 
	                          vendor.lifnr as vendor_code,
	                          vendor.name1 as vendor_name
              FROM  btn as btn
              	left join lfa1 as vendor
              		ON(vendor.lifnr = btn.vendor_code)
              		where btn.btn_num = $1`;

    let result_qq = await getQuery({
      query: vendorQuery,
      values: [btnPayload.btn_num],
    });

    const btn_payload = {
      ZBTNO: btnPayload.btn_num, // BTN Number
      ERDAT: getYyyyMmDd(getEpochTime()), // BTN Create Date
      ERZET: timeInHHMMSS(), // 134562,  // BTN Create Time
      ERNAM: tokenData.vendor_code, // Created Person Name
      LAEDA: "", // Not Needed
      AENAM: result_qq[0].vendor_name, // Vendor Name
      LIFNR: result_qq[0].vendor_code, // Vendor Codebtn_v2
      ZVBNO: result_qq[0]?.invoice_no, // Invoice Number
      EBELN: result_qq[0]?.purchasing_doc_no, // PO Number
      DPERNR1: btnPayload.assign_to_fi, // assigned_to
      DSTATUS: "4", // sap deparment forword status
      ZRMK1: "Forwared To Finance", // REMARKS
    };

    const sapBaseUrl = process.env.SAP_HOST_URL || "http://10.181.1.31:8010";
    const postUrl = `${sapBaseUrl}/sap/bc/zobps_out_api`;
    console.log("btnPayload", postUrl, btn_payload);
    const postResponse = await makeHttpRequest(postUrl, "POST", btn_payload);
    console.log("POST Response from the server:", postResponse);
  } catch (error) {
    console.error("Error making the request:", error.message);
  }
}

const getGrnIcgrnByInvoice = async (req, res) => {
  try {
    const { purchasing_doc_no, invoice_no } = req.body;

    if (!purchasing_doc_no || !invoice_no) {
      return resSend(
        res,
        true,
        200,
        "Please send a valid payload!",
        null,
        null
      );
    }
    const gate_entry_q = `SELECT ENTRY_NO AS gate_entry_no,
    ZMBLNR AS grn_no, EBELP as po_lineitem,
    INV_DATE AS invoice_date FROM zmm_gate_entry_d WHERE EBELN = $1 AND INVNO = $2`;

    let gate_entry_v = await getQuery({
      query: gate_entry_q,
      values: [purchasing_doc_no, invoice_no],
    });
    console.log("gate_e", gate_entry_v);
    if (gate_entry_v.error) {
      return resSend(
        res,
        true,
        200,
        "Something went wrong!",
        gate_entry_v.error,
        null
      );
    }
    if (gate_entry_v.length == 0) {
      return resSend(
        res,
        false,
        200,
        "No record found under the invoice number!",
        null,
        null
      );
    }
    gate_entry_v = gate_entry_v[0];
    // const icgrn_q = `SELECT PRUEFLOS AS icgrn_nos, MATNR as mat_no, LMENGE01 as quantity
    // FROM qals WHERE MBLNR = ?`; //
    const icgrn_q = `SELECT PRUEFLOS AS icgrn_nos, MATNR as mat_no, LMENGE01 as quantity
    FROM qals WHERE MBLNR = $1`; //   MBLNR (GRN No) PRUEFLOS (Lot Number)
    let icgrn_no = await getQuery({
      query: icgrn_q,
      values: [gate_entry_v?.grn_no],
    });
    if (icgrn_no.length == 0) {
      return resSend(
        res,
        false,
        200,
        "Plese do ICGRN to Process BTN",
        null,
        null
      );
    }
    console.log("icgrn_no", icgrn_no);

    let total_price = 0;
    let total_quantity = 0;

    await Promise.all(
      await icgrn_no.map(async (item) => {
        const price_q = `SELECT NETPR AS price FROM ekpo WHERE MATNR = $1 and EBELN = $2 and EBELP = $3`;
        let unit_price = await getQuery({
          query: price_q,
          values: [item?.mat_no, purchasing_doc_no, gate_entry_v.po_lineitem],
        });
        total_quantity += parseFloat(item?.quantity);
        console.log("unit_price", unit_price, parseFloat(icgrn_no));
        await Promise.all(
          await unit_price.map(async (it) => {
            console.log("it_price", it.price, parseFloat(it?.price));
            total_price += parseFloat(it?.price) * total_quantity;
          })
        );
      })
    );
    gate_entry_v.total_price = parseFloat(total_price.toFixed(2));
    gate_entry_v.icgrn_nos = gate_entry_v.grn_no;
    gate_entry_v.grn_nos = gate_entry_v.grn_no;

    console.log;
    return resSend(res, true, 200, "Data gate!", gate_entry_v, null);
  } catch (error) {
    console.error("Error making the request:", error.message);
    return resSend(res, true, 400, "error!", error.message, null);
  }
};

const timeInHHMMSS = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return hours + minutes + seconds;
};

async function handelMail(tokenData, payload, event) {
  try {
    let emailUserDetailsQuery;
    let emailUserDetails;
    let dataObj = payload;

    console.log("876567890987656789", tokenData, payload);

    if (
      tokenData.user_type == USER_TYPE_VENDOR &&
      payload.status == SUBMITTED
    ) {
      emailUserDetailsQuery = getUserDetailsQuery("vendor_and_do", "$1");

      console.log("emailUserDetails", emailUserDetails);
      emailUserDetails = await getQuery({
        query: emailUserDetailsQuery,
        values: [payload.purchasing_doc_no],
      });
      console.log(
        "emailUserDetailsQuery",
        emailUserDetailsQuery,
        emailUserDetails
      );
      await sendMail(
        BTN_UPLOAD_CHECKLIST,
        dataObj,
        { users: emailUserDetails },
        BTN_UPLOAD_CHECKLIST
      );
    }

    if (
      tokenData.user_type != USER_TYPE_VENDOR &&
      payload.status == FORWARD_TO_FINANCE
    ) {
      emailUserDetailsQuery = getUserDetailsQuery("venode_by_po");
      emailUserDetails = await getQuery({
        query: emailUserDetailsQuery,
        values: [payload.purchasing_doc_no],
      });
      await sendMail(
        BTN_FORWORD_FINANCE,
        dataObj,
        { users: emailUserDetails },
        BTN_FORWORD_FINANCE
      );
    }
    if (
      tokenData.user_type != USER_TYPE_VENDOR &&
      payload.status == FORWARDED_TO_FI_STAFF
    ) {
      emailUserDetailsQuery = getUserDetailsQuery("vendor_by_po", "$1");
      emailUserDetails = await getQuery({
        query: emailUserDetailsQuery,
        values: [payload.purchasing_doc_no],
      });
      await sendMail(
        BTN_FORWORD_FINANCE,
        dataObj,
        { users: emailUserDetails },
        BTN_FORWORD_FINANCE
      );
    }

    if (tokenData.user_type != USER_TYPE_VENDOR && payload.status == REJECTED) {
      // emailUserDetailsQuery = getUserDetailsQuery('vendor_by_po', '$1');
      emailUserDetailsQuery = getUserDetailsQuery("vendor_by_po", "$1");

      emailUserDetails = await getQuery({
        query: emailUserDetailsQuery,
        values: [payload.purchasing_doc_no],
      });
      dataObj = { ...dataObj, vendor_name: emailUserDetails[0].u_name };
      await sendMail(
        BTN_RETURN_DO,
        dataObj,
        { users: emailUserDetails },
        BTN_RETURN_DO
      );
    }
    if (tokenData.user_type != USER_TYPE_VENDOR && payload.status == ASSIGNED) {
      // emailUserDetailsQuery = getUserDetailsQuery('vendor_by_po', '$1');
      emailUserDetailsQuery = "SELECT * FROM (";
      buildQuery += getUserDetailsQuery("vendor_by_po", "$1");
      buildQuery += "UNION";
      buildQuery += getUserDetailsQuery("assingee", "$2");
      buildQuery += ") AS mail_info";

      emailUserDetails = await getQuery({
        query: emailUserDetailsQuery,
        values: [payload.purchasing_doc_no],
      });
      dataObj = { ...dataObj, vendor_name: emailUserDetails[0].u_name };
      await sendMail(
        BTN_RETURN_DO,
        dataObj,
        { users: emailUserDetails },
        BTN_RETURN_DO
      );
    }
    if (
      tokenData.user_type != USER_TYPE_VENDOR &&
      payload.status == SUBMIT_BY_DO
    ) {
      // emailUserDetailsQuery = getUserDetailsQuery('vendor_by_po', '$1');
      let buildQuery = "";
      emailUserDetailsQuery = "SELECT * FROM (";
      buildQuery += emailUserDetailsQuery;
      buildQuery += getUserDetailsQuery("vendor_by_po", "$1");
      buildQuery += "UNION";
      buildQuery += getUserDetailsQuery("finance_authority", "$2");
      buildQuery += ") AS mail_info";

      console.log(
        "payload.purchasing_doc_no, payload.assign_to",
        payload,
        payload.assign_to,
        buildQuery
      );
      console.log("emailUserDetailsQuery", emailUserDetailsQuery);

      emailUserDetails = await getQuery({
        query: buildQuery,
        values: [payload.purchasing_doc_no, parseInt(payload.assign_to)],
      });
      dataObj = { ...dataObj, vendor_name: emailUserDetails[0].u_name };
      await sendMail(
        BTN_FORWORD_FINANCE,
        dataObj,
        { users: emailUserDetails },
        BTN_FORWORD_FINANCE
      );
    }
  } catch (error) {
    console.log("handelMail btn", error.toString(), error.stack);
  }
}

const assignToFiStaffHandler = async (req, res) => {
  const { btn_num, purchasing_doc_no, assign_to_fi } = req.body;
  const tokenData = { ...req.tokenData };

  console.log("req.body", req.body);

  if (
    !btn_num ||
    btn_num === "" ||
    !purchasing_doc_no ||
    purchasing_doc_no === "" ||
    !assign_to_fi ||
    assign_to_fi === ""
  ) {
    return resSend(res, false, 200, "Assign To is the mandatory!", null, null);
  }

  const assign_q = `SELECT * FROM ${BTN_ASSIGN} WHERE btn_num = $1 and last_assign = $2`;
  let assign_fi_staff_v = await getQuery({
    query: assign_q,
    values: [btn_num, true],
  });
  if (!checkTypeArr(assign_fi_staff_v)) {
    return resSend(
      res,
      false,
      200,
      "You're not authorized to perform the action!",
      null,
      null
    );
  }

  const whereCon = {
    btn_num: btn_num,
  };
  const payload = {
    assign_by_fi: tokenData?.vendor_code,
    assign_to_fi: assign_to_fi,
    last_assign_fi: true,
  };

  try {
    let { q, val } = generateQuery(UPDATE, BTN_ASSIGN, payload, whereCon);
    let resp = await getQuery({ query: q, values: val });
    console.log("resp", resp);

    let btn_list_q = `SELECT * FROM btn_list WHERE purchasing_doc_no = $1`;
    let btn_list = await getQuery({
      query: btn_list_q,
      values: [purchasing_doc_no],
    });
    if (btn_list.length < 0) {
      return resSend(
        res,
        false,
        200,
        "Vendor have to submit BTN first.",
        btn_list,
        null
      );
    }

    let data = {
      btn_num,
      purchasing_doc_no,
      net_claim_amount: btn_list?.net_claim_amount,
      net_payable_amount: btn_list?.net_payable_amount,
      vendor_code: btn_list?.vendor_code,
      created_at: convertToEpoch(new Date()),
      btn_type: btn_list?.btn_type,
    };

    let result = await addToBTNList(data, FORWARDED_TO_FI_STAFF);

    if (result?.status) {
      handelMail(tokenData, {
        ...req.body,
        assign_to_fi,
        status: FORWARDED_TO_FI_STAFF,
      });
      try {
        btnSaveToSap({ ...req.body, ...payload }, tokenData);
      } catch (error) {
        console.log("btnSaveToSap", error.message);
      }
      resSend(res, true, 200, "Finance Staff has been assigned!", null, null);
    } else {
      resSend(res, false, 200, "Something went wrong in BTN List", null, null);
    }
  } catch (err) {
    console.log("ERROR", err.message);
  }
};

module.exports = {
  // fetchAllBTNs,
  fetchBTNList,
  getBTNData,
  submitBTN,
  submitBTNByDO,
  fetchBTNByNum,
  fetchBTNByNumForDO,
  getGrnIcgrnByInvoice,
  btnSaveToSap,
  timeInHHMMSS,
  assignToFiStaffHandler,
};
