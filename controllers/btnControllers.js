// const { query } = require("../config/dbConfig");
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

  result = result.map((el) => {
    if (el.icgrn_nos) {
      try {
        el.icgrn_nos = JSON.parse(el.icgrn_nos);
      } catch (error) {
        el.icgrn_nos = el.icgrn_nos;
      }
    }
    return el;
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

  let btnDOQ = `SELECT * FROM ${BTN_MATERIAL_DO} WHERE btn_num = $1`;
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
    let ib_filename = await getSDFiles(id, ACTION_IB);
    let dd_filename = await getSDFiles(id, ACTION_DD);

    obj = {
      ...obj,
      ib_filename,
      dd_filename,
    };

    // GET gate by PO Number
    // let gate_entry = await getGateEntry(id);
    // if (gate_entry) {
    //   obj = { ...obj, gate_entry };
    // }
    // console.log("gate_entry", gate_entry);

    // GET GRN Number by PO Number
    // let grn_nos = await getGRNs(id);
    // if (checkTypeArr(grn_nos)) {
    //   obj = { ...obj, grn_nos };
    // }

    // GET GRN Number by PO Number
    // let icgrn_nos = await getICGRNs(id);
    // if (icgrn_nos) {
    //   obj = { ...obj, icgrn_nos };
    // }

    // GET Approved SDBG by PO Number
    let pbg_filename_result = await getPBGApprovedFiles(id);
    console.log("pbg_filename_result", pbg_filename_result);

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

const insertUpdateToBTNList = async (data, status, isInserted) => {
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

  // if (isInserted == true) {
  //   // update
  //   whereCondition = {
  //     btn_num: payload.btn_num,
  //     purchasing_doc_no: payload.purchasing_doc_no,
  //   };
  //   assign_q = await generateQuery(UPDATE, BTN_LIST, payload, whereCondition);
  //   console.log("update..");
  // } else {
  //   //insert
  // }
  let assign_q = await generateQuery(INSERT, BTN_LIST, payload);
  console.log("insert..");

  let res = await getQuery({ query: assign_q.q, values: assign_q.val });

  if (!res.error) {
    return { status: true, data: res };
  } else {
    return { status: false, data: null };
  }
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
    // let btn_list_q = `SELECT * FROM btn_list WHERE purchasing_doc_no = $1`;
    let btn_list_q = `SELECT list.*, service.bill_certifing_authority FROM btn_list as list
    LEFT JOIN btn_service_hybrid as service ON list.btn_num = service.btn_num
    WHERE list.purchasing_doc_no = $1`;
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
    invoice_type,
    invoice_value,
    cgst,
    igst,
    sgst,
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

  if (!purchasing_doc_no || !invoice_no) {
    return resSend(res, false, 200, "Invoice Number is missing!", null, null);
  }

  // check invoice number is already present in DB
  let check_invoice_q = `SELECT count(*) as count FROM btn WHERE invoice_no = $1 and vendor_code = $2`;
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
  let suppoting_invoice_filename;
  if (payloadFiles["invoice_supporting_doc"]) {
    suppoting_invoice_filename =
      payloadFiles["invoice_supporting_doc"][0]?.filename;
    payload = { ...payload, suppoting_invoice_filename };
  }
  // payloadFiles["e_invoice_filename"]
  //   ? (payload = {
  //       ...payload,
  //       e_invoice_filename: payloadFiles["e_invoice_filename"][0]?.filename,
  //     })
  //   : null;

  payloadFiles["debit_credit_filename"]
    ? (payload = {
      ...payload,
      debit_credit_filename:
        payloadFiles["debit_credit_filename"][0]?.filename,
    })
    : null;

  // GET SD by PO Number
  // let sdbg_filename_result = await getSDBGApprovedFiles(purchasing_doc_no);
  // let pbg_filename_result = await getPBGApprovedFiles(purchasing_doc_no);

  // // GET GRN Number by PO Number
  // let grn_nos = await getGRNs(purchasing_doc_no);

  // GET ICGRN Value by PO Number
  let resICGRN = await getICGRNs({ purchasing_doc_no, invoice_no });
  if (!resICGRN) {
    return resSend(res, false, 200, `Invoice number is not valid!`, null, null);
  }

  payload = {
    ...payload,
    invoice_type,
    icgrn_total: resICGRN.total_icgrn_value,
    icgrn_nos: JSON.stringify(resICGRN.icgrn_nos),
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
  let c_sdbg_date_q = `SELECT PLAN_DATE as "PLAN_DATE", MTEXT as "MTEXT", MID AS "MID" FROM zpo_milestone WHERE EBELN = $1`;
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
  let a_sdbg_date_q = `SELECT actualSubmissionDate AS "PLAN_DATE", milestoneText AS "MTEXT", milestoneid AS "MID" FROM actualsubmissiondate WHERE purchasing_doc_no = $1`;
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

  // checking no submitted milestones by vendor
  const checkMissingMilestone = checkActualDates(c_dates, a_dates);
  if (!checkMissingMilestone.success) {
    return resSend(res, false, 200, checkMissingMilestone.msg, null, null);
  }

  // created at
  let created_at = getEpochTime();
  payload = { ...payload, created_at };

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
        const response1 = await btnReject(req.body, tokenData, client);
        handelMail(tokenData, { btn_num, status: REJECTED }, BTN_REJECT);
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
        assign_to,
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

      let btn_do_q;
      if (isInserted == true) {
        // update
        whereCondition = {
          btn_num: payload.btn_num,
          purchasing_doc_no: payload.purchasing_doc_no,
        };
        btn_do_q = await generateQuery(
          UPDATE,
          BTN_MATERIAL_DO,
          payload,
          whereCondition
        );
        console.log("update1..");
      } else {
        //insert
        btn_do_q = await generateQuery(INSERT, BTN_MATERIAL_DO, payload);
        console.log("insert1..");
      }
      //let { q, val } = generateQuery(INSERT, BTN_MATERIAL_DO, payload);
      const result = await poolQuery({
        client,
        query: btn_do_q.q,
        values: btn_do_q.val,
      });

      try {
        const sendSap = await btnSubmitByDo(
          { btn_num, purchasing_doc_no, assign_to },
          tokenData
        );

        if (sendSap == false) {
          console.log(sendSap);
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

/**
 * BTN DATA SEND TO SAP SERVER WHEN BTN SUBMIT BY FINNANCE AUTHRITY
 * @param {Object} btnPayload
 * @param {Object} tokenData
 */

async function btnSaveToSap(btnPayload, tokenData) {
  let status = false;
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
        btn.yard, 
        btn.net_claim_amount, 
        btn.net_with_gst, 
        btn.invoice_no,
        btn.vendor_code, 
        ged.invno, 
        ged.inv_date as invoice_date,
        vendor.stcd3,
        users.pernr as finance_auth_id,
        users.cname as finance_auth_name,
        vendor.name1 as vendor_name,
        assign_users.cname as assign_name,
        ranked_assignments.assign_to as assign_to

      FROM 
          public.btn AS btn
      LEFT JOIN 
          ranked_assignments
          ON (btn.btn_num = ranked_assignments.btn_num
          AND ranked_assignments.rn = 1)
      LEFT JOIN  zmm_gate_entry_d as ged
          ON( btn.purchasing_doc_no = ged.ebeln AND btn.invoice_no = ged.invno)
      LEFT JOIN  lfa1 as vendor
          ON(btn.vendor_code = vendor.lifnr)
      LEFT JOIN  pa0002 as users
          ON(users.pernr::character varying = $1)
      LEFT JOIN  pa0002 as assign_users
          ON(assign_users.pernr::character varying = ranked_assignments.assign_to)
      WHERE 
          btn.btn_num = $2`;

    let btnDetails = await getQuery({
      query: vendorQuery,
      values: [btnPayload.assign_to_fi, btnPayload.btn_num],
    });

    // CALCULATION
    let basic_ammount = parseFloat(btnDetails[0]?.net_claim_amount) || 0;
    const cgst = parseFloat(btnDetails[0]?.cgst) || 0;
    const igst = parseFloat(btnDetails[0]?.igst) || 0;
    const sgst = parseFloat(btnDetails[0]?.sgst) || 0;

    let cgst_ammount = "0";
    let igst_ammount = "0";
    let sgst_ammount = "0";

    if (cgst && basic_ammount) {
      cgst_ammount = parseFloat(basic_ammount * (cgst / 100)).toFixed(3);
    }
    if (igst && basic_ammount) {
      igst_ammount = parseFloat(basic_ammount * (igst / 100)).toFixed(3);
    }
    if (sgst && basic_ammount) {
      sgst_ammount = parseFloat(basic_ammount * (sgst / 100)).toFixed(3);
    }

    const btn_payload = {
      ZBTNO: btnPayload?.btn_num || "", // BTN Number
      // ERDAT: getYyyyMmDd(getEpochTime()), // BTN Create Date
      // ERZET: timeInHHMMSS(), // 134562,  // BTN Create Time
      // ERNAM: tokenData?.vendor_code || "", // Created Person Name
      // LAEDA: "", // Not Needed
      STCD3: btnDetails[0]?.stcd3 || "",
      AENAM: btnDetails[0]?.vendor_name || "", // Vendor Name
      LIFNR: btnDetails[0]?.vendor_code || "", // Vendor Codebtn_v2
      ZVBNO: btnDetails[0]?.invoice_no || "", // Invoice Number
      EBELN: btnDetails[0]?.purchasing_doc_no || "", // PO Number
      ACC: btnDetails[0]?.yard || "", // yard number
      FSTATUS: F_STATUS_FORWARDED_TO_FINANCE, // sap deparment forword status
      ZRMK1: "Forwared To Finance", // REMARKS
      CGST: cgst_ammount,
      IGST: igst_ammount,
      SGST: sgst_ammount,
      BASICAMT: basic_ammount?.toFixed(3),
      TOT_AMT: btnDetails[0]?.net_with_gst || "0",
      ACTIVITY: btnPayload.activity || "", // activity
      FRERDAT: getYyyyMmDd(getEpochTime()),
      FRERZET: timeInHHMMSS(),
      FRERNAM: btnDetails[0]?.assign_to || "", // SET BY DO FINACE AUTHIRITY  PERSON (DO SUBMIT)
      FPERNR1: btnPayload?.assign_to_fi || "", // assigned_to
      FPERNAM: btnDetails[0]?.finance_auth_name || "", // ASSINGEE NAME
    };

    const sapBaseUrl = process.env.SAP_HOST_URL || "http://10.181.1.31:8010";
    const postUrl = `${sapBaseUrl}/sap/bc/zobps_out_api`;
    console.log("btnPayload", postUrl, btn_payload);
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
    const grn_values = gate_entry_v.map((el) => el.grn_no);
    const placeholder = grn_values.map((_, index) => `$${index + 1}`).join(",");

    gate_entry_v = gate_entry_v[0];

    // const icgrn_q = `SELECT PRUEFLOS AS icgrn_nos, MATNR as mat_no, LMENGE01 as quantity
    // FROM qals WHERE MBLNR = ?`; //
    const icgrn_q = `SELECT 
    qals.PRUEFLOS AS icgrn_nos, 
    qals.MATNR as mat_no,
    qals.MBLNR as grn_no,
    qals.LMENGE01 as quantity,
    qals.ebeln as purchasing_doc_no,
    qals.ebelp as po_lineitem,
    ekpo.NETPR as price
    FROM qals as qals
      left join ekpo as ekpo
        ON (ekpo.ebeln = qals.ebeln AND ekpo.ebelp = qals.ebelp AND ekpo.matnr = qals.matnr)
    WHERE MBLNR IN (${placeholder})`; //   MBLNR (GRN No) PRUEFLOS (Lot Number)

    console.log("icgrn_q", grn_values, placeholder, icgrn_q);

    let icgrn_no = await getQuery({
      query: icgrn_q,
      values: grn_values,
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
    console.log("icgrn_no", icgrn_q, icgrn_no);

    let total_price = 0;
    let total_quantity = 0;

    if (icgrn_no.length) {
      const totals = calculateTotals(icgrn_no);
      total_price = totals.totalPrice || 0;
      total_quantity = totals.totalQuantity;
    }

    // await Promise.all(
    //   await icgrn_no.map(async (item) => {
    //     const price_q = `SELECT NETPR AS price FROM ekpo WHERE MATNR = $1 and EBELN = $2 and EBELP = $3`;
    //     let unit_price = await getQuery({
    //       query: price_q,
    //       values: [item?.mat_no, purchasing_doc_no, gate_entry_v.po_lineitem],
    //     });
    //     total_quantity += parseFloat(item?.quantity);
    //     console.log("unit_price", unit_price, parseFloat(icgrn_no));
    //     await Promise.all(
    //       await unit_price.map(async (it) => {
    //         console.log("it_price", it.price, parseFloat(it?.price));
    //         total_price += parseFloat(it?.price) * total_quantity;
    //       })
    //     );
    //   })
    // );
    gate_entry_v.total_price = parseFloat(total_price.toFixed(2));
    gate_entry_v.icgrn_nos = icgrn_no;
    gate_entry_v.grn_nos = icgrn_no;

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
      payload.status == STATUS_RECEIVED
    ) {
      emailUserDetailsQuery = getUserDetailsQuery("finance_staff", "$1");
      emailUserDetails = await getQuery({
        query: emailUserDetailsQuery,
        values: [payload.assign_to_fi],
      });
      await sendMail(
        BTN_ASSIGN_TO_STAFF,
        dataObj,
        { users: emailUserDetails },
        BTN_ASSIGN_TO_STAFF
      );
    }

    if (tokenData.user_type != USER_TYPE_VENDOR && payload.status == REJECTED) {
      // emailUserDetailsQuery = getUserDetailsQuery('vendor_by_po', '$1');
      emailUserDetailsQuery = getUserDetailsQuery("vendor_by_btn", "$1");

      emailUserDetails = await getQuery({
        query: emailUserDetailsQuery,
        values: [payload.btn_num],
      });
      dataObj = { ...dataObj, vendor_name: emailUserDetails[0]?.u_name };
      await sendMail(
        BTN_REJECT,
        dataObj,
        { users: emailUserDetails },
        BTN_REJECT
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
      dataObj = { ...dataObj, vendor_name: emailUserDetails[0]?.u_name };
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
      dataObj = { ...dataObj, vendor_name: emailUserDetails[0]?.u_name };
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
  try {
    const client = await poolClient();
    await client.query("BEGIN");
    try {
      const { btn_num, purchasing_doc_no, assign_to_fi } = req.body;
      const tokenData = { ...req.tokenData };
      console.log(11);
      const btnCurrnetStatus = await btnCurrentDetailsCheck(client, {
        btn_num,
        status: STATUS_RECEIVED,
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

      if (
        !btn_num ||
        btn_num === "" ||
        !purchasing_doc_no ||
        purchasing_doc_no === "" ||
        !assign_to_fi ||
        assign_to_fi === ""
      ) {
        return resSend(
          res,
          false,
          200,
          "Assign To is the mandatory!",
          null,
          null
        );
      }

      const assign_q = `SELECT * FROM ${BTN_ASSIGN} WHERE btn_num = $1 and last_assign = $2`;
      let assign_fi_staff_v = await poolQuery({
        client,
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

      let { q, val } = generateQuery(UPDATE, BTN_ASSIGN, payload, whereCon);
      let resp = await poolQuery({ client, query: q, values: val });
      console.log("resp", resp);

      let btn_list_q = ` SELECT * FROM btn_list WHERE btn_num = $1 
	                      AND purchasing_doc_no = $2
	                      AND status = $3
                        ORDER BY created_at DESC`;
      let btn_list = await poolQuery({
        client,
        query: btn_list_q,
        values: [btn_num, purchasing_doc_no, SUBMITTED_BY_DO],
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
        net_claim_amount: btn_list[0]?.net_claim_amount,
        net_payable_amount: btn_list[0]?.net_payable_amount,
        vendor_code: tokenData.vendor_code,
        created_at: getEpochTime(),
        btn_type: btn_list[0]?.btn_type,
      };

      let result = await addToBTNList(data, STATUS_RECEIVED);

      if (result?.status) {
        handelMail(tokenData, {
          ...req.body,
          assign_to_fi,
          status: STATUS_RECEIVED,
        });
        try {
          const sendSap = btnSaveToSap({ ...req.body, ...payload }, tokenData);
          if (sendSap == false) {
            await client.query("ROLLBACK");

            return resSend(res, false, 200, `SAP not connected.`, null, null);
          } else if (sendSap == true) {
            await client.query("COMMIT");
          }
        } catch (error) {
          console.log("btnSaveToSap", error.message);
        }
        resSend(res, true, 200, "Finance Staff has been assigned!", null, null);
      } else {
        resSend(
          res,
          false,
          200,
          "Something went wrong in BTN List",
          null,
          null
        );
      }
    } catch (error) {
      console.log("data not inserted", error);
      resSend(res, false, 500, Message.SERVER_ERROR, error.message, null);
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, true, 500, Message.DB_CONN_ERROR, error.message, null);
  }
};

/**
 * CHECK IF CONTRACTUAL SUBMISSION HAD
 * BUT ACTUCAL SUBMISSION DATE MISSING OR NOT SUBMIT
 * @param c_dates Array
 * @param a_dates Array
 * @returns Object
 */

function checkActualDates(c_dates, a_dates) {
  console.log("lllllllllllllll", c_dates, a_dates);

  // const arr = new Set([parseInt(MID_SDBG), parseInt(MID_DRAWING), parseInt(MID_QAP), parseInt(MID_ILMS)]);
  const arr = new Set([
    parseInt(MID_DRAWING),
    parseInt(MID_QAP),
    parseInt(MID_ILMS),
  ]);
  const c_dates_filter = c_dates.filter((el) => arr.has(parseInt(el.MID)));
  const a_dates_filter = a_dates.filter((el) => arr.has(parseInt(el.MID)));
  const mtextObj = {
    [MID_SDBG]: "SDBG",
    [MID_DRAWING]: "Drawing",
    [MID_QAP]: "QAP",
    [MID_ILMS]: "ILMS",
  };
  for (const item of c_dates_filter) {
    const i = a_dates_filter.findIndex(
      (el) => parseInt(el.MID) == parseInt(item.MID)
    );
    if (i < 0) {
      return {
        success: false,
        msg: `Please submit ${mtextObj[item.MID]} to process BTN !`,
      };
    }
  }

  return { success: true, msg: "No milestone missing" };
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

    await btnSubmitByDo({ ...data, assign_to: null }, tokenData);

    return { btn_num: data.btn_num };
  } catch (error) {
    throw error;
  }
}

const updateBtnListTable = async (client, data) => {
  try {
    // const btnListPayload = { btn_num: data.zbtno, status: data.dstatus };
    // const statusObj = {
    //   "1": "RECEIVED",
    //   "2": "REJECTED",
    //   "3": "APPROVE",
    //   "4": "BANK",
    //   "5": "D-RETURN"
    // }
    const getLatestDataQuery = `
      SELECT 
          btn_num, 
          purchasing_doc_no, 
          net_claim_amount, 
          net_payable_amount, 
          vendor_code, 
          status, 
          btn_type,
          created_at
      FROM public.btn_list where btn_num = $1 ORDER BY created_at DESC LIMIT 1`;
    const lasBtnDetails = await poolQuery({
      client,
      query: getLatestDataQuery,
      values: [data.btn_num],
    });
    let btnListTablePaylod = { btn_num: data.btn_num };

    if (lasBtnDetails.length) {
      btnListTablePaylod = {
        ...lasBtnDetails[0],
        ...btnListTablePaylod,
        status: REJECTED,
        created_at: getEpochTime(),
      };
      if (data.remarks) {
        btnListTablePaylod.remarks = data.remarks;
      }
      console.log("%%%%%%%%%%%%%%%%%%%");
      const { q, val } = generateQuery(INSERT, "btn_list", btnListTablePaylod);
      const aa = await poolQuery({ client, query: q, values: val });
      console.log(aa);
      console.log("UPDATED btn list");
      // if (data.fstatus == "5" || data.fstatus == 5) {
      //     await handelMail(btnListTablePaylod, client);
      // }
    } else {
      console.log("NO BTN FOUND IN LIST TO BE UPDATED");
    }
  } catch (error) {
    throw error;
  }
};

// async function btnDetailsCheck(client, data) {
//   try {
//     let btnstausCount = `SELECT count(btn_num) as count  FROM btn_list WHERE 1 = 1`;
//     const valueArr = [];
//     let count = 0;
//     if (data.btn_num) {
//       btnstausCount += ` AND btn_num = $${++count}`;
//       valueArr.push(data.btn_num);
//     }
//     if (data.status) {
//       btnstausCount += ` AND status = $${++count}`;
//       valueArr.push(data.status);
//     }

//     const result = await poolQuery({
//       client,
//       query: btnstausCount,
//       values: valueArr,
//     });

//     return result.length ? result[0] : {};
//   } catch (error) {
//     throw error;
//   }
// }
async function btnCurrentDetailsCheck(client, data) {
  try {
    let btnstausCount = `SELECT btn_num, status  FROM btn_list WHERE 1 = 1`;
    const valueArr = [];
    let count = 0;
    if (data.btn_num) {
      btnstausCount += ` AND btn_num = $${++count}`;
      valueArr.push(data.btn_num);
    }
    // if (data.status) {
    //   btnstausCount += ` AND status = $${++count}`;
    //   valueArr.push(data.status);
    // }

    const checkStatus = new Set([
      STATUS_RECEIVED,
      REJECTED,
      BTN_STATUS_BANK,
      BTN_STATUS_HOLD_TEXT,
      BTN_STATUS_PROCESS,
      SUBMIT_BY_DO,
    ]);

    if (data.status === STATUS_RECEIVED) {
      checkStatus.add(BTN_STATUS_DRETURN);
      checkStatus.add(SUBMITTED_BY_VENDOR);
      checkStatus.delete(STATUS_RECEIVED);
      checkStatus.delete(SUBMIT_BY_DO);
    }

    btnstausCount += " ORDER BY created_at DESC";
    btnstausCount += " LIMIT 1";

    const result = await poolQuery({
      client,
      query: btnstausCount,
      values: valueArr,
    });
    let isInvalid = false;

    // const result = [{ btn_num: 20240725999, date: 10, status: "BANK" },]
    // const checkStatus = new Set(["RECEIVED", "REJECTED", "BANK", "HOLD", "UNHOLD", "PROCESS"]);

    if (result.length) {
      const currentStatus = result.at(-1);
      if (checkStatus.has(currentStatus.status)) {
        isInvalid = true;
      }
      return {
        isInvalid,
        currentStatus: currentStatus.status,
        message: `already ${currentStatus.status}`,
      };
    }

    return {
      isInvalid: true,
      currentStatus: BTN_STATUS_NOT_SUBMITTED,
      message: `Current status ${BTN_STATUS_NOT_SUBMITTED}`,
    };
  } catch (error) {
    throw error;
  }
}

function calculateTotals(data) {
  let totalQuantity = 0;
  let totalPrice = 0;

  data.forEach((item) => {
    totalQuantity += parseFloat(item.quantity);
    totalPrice += parseFloat(item.price) * parseFloat(item.quantity);
  });

  return {
    totalQuantity,
    totalPrice,
  };
}

const getFinanceEmpList = async (req, res) => {
  try {
    let q = `SELECT t1.pernr as userCode, t1.cname as empName, t3.name as role 
	FROM pa0002 
    	AS t1 
      LEFT JOIN 
      	auth 
       AS t2 
       ON 
       	t2.vendor_code = t1.PERNR :: character varying

	LEFT JOIN 
      	internal_role_master 
       AS t3 
       ON 
       	t3.id = t2.internal_role_id
	
        WHERE 
        t2.department_id = $1`;
    if (req.query.$select) {
      let select = req.query.$select;
      q = q.concat(` AND t2.internal_role_id = ${select}`);
    }

    const response = await getQuery({
      query: q,
      values: [USER_TYPE_GRSE_FINANCE],
    });
    resSend(res, true, 200, "data fetched!", response, null);
  } catch (err) {
    console.log("data not fetched", err);
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
  getFinanceEmpList,
  addToBTNList,
  btnCurrentDetailsCheck,
  btnReject,
  insertUpdateToBTNList,
  updateBtnListTable,
};
