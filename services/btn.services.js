// const { query } = require("../config/dbConfig");
const { query, getQuery, poolQuery } = require("../config/pgDbConfig");
const {
  ACTION_SDBG,
  ACTION_PBG,
  A_SDBG_DATE,
  A_DRAWING_DATE,
  A_QAP_DATE,
  A_ILMS_DATE,
  C_SDBG_DATE,
  C_DRAWING_DATE,
  C_QAP_DATE,
  C_ILMS_DATE,
  BTN_STATUS_PROCESS_ID,
  INSERT,
  MID_SDBG,
  MID_DRAWING,
  MID_QAP,
  ACTION_ADVANCE_BG_SUBMISSION,
  ACTION_IB,
} = require("../lib/constant");
const { APPROVED, BTN_STATUS_PROCESS } = require("../lib/status");
const { getEpochTime, generateQuery } = require("../lib/utils");
const { checkTypeArr } = require("../utils/smallFun");
const { getContractutalSubminissionDate, getActualSubminissionDate, vendorDetails, getSDBGApprovedFiles, getPBGApprovedFiles } = require("./btnServiceHybrid.services");
const Message = require("../utils/messages")

const advBillHybridbtnPayload = (payload) => {
  if (!payload || !Object.keys(payload).length)
    throw new Error("Invalid payload in advBillHybridbtnPayload");

  const pl = {
    btn_num: payload.btn_num,
    stage: payload.stage || "",
    yard: payload.yard || "",
    purchasing_doc_no: payload.purchasing_doc_no,
    invoice_no: payload.invoice_no || "",
    invoice_filename: payload.invoice_filename || "",
    invoice_value: payload.invoice_value || "",
    invoice_type: payload.invoice_type,
    // grn_nos: payload.grn_nos || "",
    // icgrn_nos: payload.icgrn_nos || "",
    // suppoting_invoice_filename: payload.suppoting_invoice_filename || "",
    invoice_supporting_filename: payload.invoice_supporting_filename || "",
    net_claim_amount: payload.net_claim_amount || "",
    cgst: payload.cgst || "0",
    sgst: payload.sgst || "0",
    igst: payload.igst || "0",
    net_with_gst: payload.net_with_gst || "",
    // c_sdbg_date: payload.c_sdbg_date || "",
    // a_sdbg_date: payload.a_sdbg_date || "",
    c_drawing_date: payload.c_drawing_date || "",
    a_drawing_date: payload.a_drawing_date || "",
    // c_qap_date: payload.c_qap_date || "",
    // a_qap_date: payload.a_qap_date || "",
    vendor_code: payload.vendor_code || "",
    btn_type: "advance-bill-hybrid",
    hsn_gstn_taxrate: payload.is_hsn_code || "Y",
    // updated_by: payload.updated_by || "",
    created_at: payload.created_at || "",
    created_by_id: payload.created_by_id || "",
  };


  return pl;
};
const advBillHybridbtnDOPayload = (payload) => {
  if (!payload || !Object.keys(payload).length)
    throw new Error("Invalid payload in advBillHybridbtnPayload");

  const pl = {
    btn_num: payload.btn_num,
    drg_penalty: payload.drg_penalty || "",
    net_payable_amount: payload.net_payable_amount,
    penalty_rate: payload.penalty_rate,
    penalty_ammount: payload.penalty_ammount,
    recomend_payment: payload.recomend_payment,
    // a_drawing_date: payload.a_drawing_date,
    created_at: payload.created_at || getEpochTime(),
    created_by: payload.created_by || "",
  };

  return pl;
};

const checkMissingActualSubmissionDate = async () => {
  let a_sdbg_date_q = `SELECT actualSubmissionDate AS PLAN_DATE, milestoneText AS MTEXT FROM actualsubmissiondate WHERE purchasing_doc_no = ?`;
  let a_dates = await query({
    query: a_sdbg_date_q,
    values: [purchasing_doc_no],
  });
  const a_dates_arr = [A_SDBG_DATE, A_DRAWING_DATE, A_QAP_DATE, A_ILMS_DATE];
  for (const item of a_dates_arr) {
    const i = a_dates.findIndex((el) => el.MTEXT == item);
    if (i < 0) {
      // return resSend(res, false, 200, `${item} is missing!`, null, null);
      return { success: false, message: item };
    }
  }

  return { success: true, message: "ALL DATE PRESENT" };
};

// const getSDBGApprovedFiles = async (po, client) => {
//   // GET Approved SDBG by PO Number
//   let q = `SELECT file_name, file_path FROM sdbg WHERE purchasing_doc_no = ? and status = ? and action_type = ?`;
//   let [results] = await client.execute(q, [po, APPROVED, ACTION_SDBG]);
//   return results;
// };

// const getPBGApprovedFiles = async (po, client) => {
//   // GET Approved PBG by PO Number
//   let q = `SELECT file_name FROM sdbg WHERE purchasing_doc_no = $1 and status = $2 and action_type = $3`;
//   let result = await poolQuery({client,
//     query: q,
//     values: [po, APPROVED, ACTION_PBG],
//   });
//   return result;
// };

// const getGateEntry = async (po) => {
//     let q = `SELECT acc_no, gate_date, file_name, file_path FROM store_gate WHERE purchasing_doc_no = ?`;
//     let result = await query({
//         query: q,
//         values: [po],
//     });
//     return result;
// };

// const getGRNs = async (po) => {
//   let q = `SELECT grn_no FROM store_grn WHERE purchasing_doc_no = ?`;
//   let result = await query({
//     query: q,
//     values: [po],
//   });
//   return result;
// };

const getICGRNs = async (body) => {
  const { purchasing_doc_no, invoice_no } = body;

  const gate_entry_q = `SELECT ENTRY_NO AS gate_entry_no,
    ZMBLNR AS grn_no, EBELP as po_lineitem,
    INV_DATE AS invoice_date FROM zmm_gate_entry_d WHERE EBELN = ? AND INVNO = ?`;

  let gate_entry_v = await query({
    query: gate_entry_q,
    values: [purchasing_doc_no, invoice_no],
  });

  gate_entry_v = gate_entry_v[0];

  const icgrn_q = `SELECT PRUEFLOS AS icgrn_nos, MATNR as mat_no, LMENGE01 as quantity 
  FROM qals WHERE MBLNR = ?`; //   MBLNR (GRN No) PRUEFLOS (Lot Number)
  let icgrn_no = await query({
    query: icgrn_q,
    values: [gate_entry_v?.grn_no],
  });

  let total_price = 0;
  let total_quantity = 0;

  if (checkTypeArr(icgrn_no)) {
    await Promise.all(
      await icgrn_no.map(async (item) => {
        const price_q = `SELECT NETPR AS price FROM ekpo WHERE MATNR = ? and EBELN = ? and EBELP = ?`;
        let unit_price = await query({
          query: price_q,
          values: [item?.mat_no, purchasing_doc_no, gate_entry_v.po_lineitem],
        });
        total_quantity += parseFloat(item?.quantity);
        await Promise.all(
          await unit_price.map(async (it) => {
            total_price += parseFloat(it?.price) * total_quantity;
          })
        );
      })
    );
  }
  gate_entry_v.total_price = parseFloat(total_price.toFixed(2));
  return {
    total_icgrn_value: parseFloat(total_price.toFixed(2)),
  };
};

// const checkBTNRegistered = async (btn_num, btn_table_name, client) => {
//   let q = `SELECT count("btn_num") as count FROM ${btn_table_name} WHERE btn_num = ?`;
//   let [results] = await client.execute(q, [btn_num]);
//   if (results.length) {
//     return results[0].count > 0;
//   }
//   return false;
// };


const filesData = (payloadFiles) => {
  // Handle uploaded files
  const fileObj = {};
  if (Object.keys(payloadFiles).length) {
    Object.keys(payloadFiles).forEach((fileName) => {
      fileObj[fileName] = payloadFiles[fileName][0]["filename"];
    });
  }
  return fileObj;
};

const contractualSubmissionDate = async (purchasing_doc_no, client) => {
  try {

    let c_sdbg_date_q = `SELECT PLAN_DATE as "PLAN_DATE", MTEXT as "MTEXT", MID as "MID"  FROM zpo_milestone WHERE EBELN = $1`;
    const results = await poolQuery({ client, query: c_sdbg_date_q, values: [purchasing_doc_no] });
    // let c_dates = await client.execxute(c_sdbg_date_q, [purchasing_doc_no]);
    let c_dates = results;
    const dates_arr = [C_SDBG_DATE, C_DRAWING_DATE, C_QAP_DATE, C_ILMS_DATE];

    const contractualDateObj = {};

    c_dates.forEach((item) => {
      if (item.PLAN_DATE && item.MID === MID_SDBG) {
        contractualDateObj.c_sdbg_date = new Date(item.PLAN_DATE).getTime();
      } else if (item.PLAN_DATE && item.MID === MID_DRAWING) {
        contractualDateObj.c_drawing_date = new Date(item.PLAN_DATE).getTime();
      } else if (item.PLAN_DATE && item.MID === MID_QAP) {
        contractualDateObj.c_qap_date = new Date(item.PLAN_DATE).getTime();
      }
    });

    return { status: true, data: contractualDateObj, msg: "success" };
  } catch (error) {
    throw error;
  }
};
const actualSubmissionDate = async (purchasing_doc_no, client) => {
  try {
    const actualSubmissionObj = {};
    let a_sdbg_date_q = `SELECT actualSubmissionDate AS "PLAN_DATE", milestoneText AS "MTEXT" FROM actualsubmissiondate WHERE purchasing_doc_no = $1`;

    const results = await poolQuery({ client, query: a_sdbg_date_q, values: [purchasing_doc_no] });
    let a_dates = results;
    if (!a_dates.length)
      return { status: false, data: {}, msg: `All milestone is missing!` };
    for (const item of a_dates) {
      if (item.MID === parseInt(MID_SDBG)) {
        if (!item.PLAN_DATE) {
          return { status: false, data: {}, msg: `${A_SDBG_DATE} is missing!` };
        }
        actualSubmissionObj.a_sdbg_date = item.PLAN_DATE;
      } else if (item.MID === parseInt(MID_DRAWING)) {
        if (!item.PLAN_DATE) {
          return {
            status: false,
            data: {},
            msg: `${A_DRAWING_DATE} is missing!`,
          };
        }
        actualSubmissionObj.a_drawing_date = item.PLAN_DATE;
      } else if (item.MID === parseInt(MID_QAP)) {
        if (!item.PLAN_DATE) {
          return { status: false, data: {}, msg: `${A_QAP_DATE} is missing!` };

        }
        actualSubmissionObj.a_qap_date = item.PLAN_DATE;
      }
    }

    return {
      status: true,
      data: actualSubmissionObj,
      msg: "All milestone passed..",
    };

  } catch (error) {
    throw error;
  }
};

const dateToEpochTime = (date) => {
  return date ? new Date(date).getTime() : null;
};



const updateBtnListTable = async (data) => {
  try {
    // const btnListPayload = { btn_num: data.zbtno, status: data.dstatus };
    // const statusObj = {
    //     "1": "RECEIVED",
    //     "2": "REJECTED",
    //     "3": "APPROVE",
    //     "4": "BANK",
    //     "5": "D-RETURN"
    // }

    if (parseInt(data.CODE) === parseInt(BTN_STATUS_PROCESS_ID)) {

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
      const lasBtnDetails = await getQuery({ query: getLatestDataQuery, values: [data.ZREGNUM] });
      let btnListTablePaylod = { btn_num: data.ZREGNUM };

      if (lasBtnDetails.length) {
        btnListTablePaylod = { ...lasBtnDetails[0], ...btnListTablePaylod, created_at: getEpochTime() };

        /**
         * status save in obps server
         * if status  BTN_STATUS_HOLD_CODE then obps list show BTN_STATUS_HOLD_TEXT
         * if un hold this, then status show default fstatus
         */
        let currentStatus = BTN_STATUS_PROCESS;
        // if (data.hold && data.hold === BTN_STATUS_HOLD_CODE) {
        //   currentStatus = BTN_STATUS_HOLD_TEXT;
        // }
        // if (btnListTablePaylod.status === BTN_STATUS_HOLD_CODE && !data.hold) {
        //   currentStatus = BTN_STATUS_UNHOLD_TEXT;
        // }
        btnListTablePaylod.status = currentStatus;

        const { q, val } = generateQuery(INSERT, 'btn_list', btnListTablePaylod);
        await query({ query: q, values: val });

      } else {
        // console.log("NO BTN FOUND IN LIST TO BE UPDATED btn.service");
      }
    } else {
      // console.log("----------NO ACTION REQUIRED");
    }

  } catch (error) {
    throw error;
  }
}



async function getAdvBillHybridBTNDetails(client, data) {
  try {

    if (!data.btn_num) {
      return { success: false, statusCode: 200, message: "Please send btn number", data: Message.MANDATORY_INPUTS_REQUIRED };
    }
    const val = [];
    val.push(data.btn_num);

    const getBtnQuery =
      `SELECT
              btn.*,
              btn_assign.assign_by,
              btn_assign.assign_to,
              users_btn_assign_to.cname AS assign_to_name,
              users_assign_to_fi.cname AS assign_by_fi_name,
              btn_assign.assign_by_fi,
              btn_assign.assign_to_fi,
              btn_adv_do.*
       
          FROM 
            btn_adv_bill_hybrid as btn 
          LEFT JOIN btn_assign AS btn_assign
              ON(btn.btn_num = btn_assign.btn_num)
        
          LEFT JOIN pa0002 as users_btn_assign_to
              ON(users_btn_assign_to.pernr :: character varying = btn_assign.assign_to) 
          LEFT JOIN pa0002 as users_assign_to_fi
              ON(users_assign_to_fi.pernr :: character varying = btn_assign.assign_to_fi) 
          LEFT JOIN btn_adv_bill_hybrid_do as btn_adv_do
              ON(btn.btn_num = btn_adv_do.btn_num)
          WHERE btn.btn_num = $1`;
    // AND s_btn.bill_certifing_authority = '600700'
    // btn_assign.*,
    // LEFT JOIN btn_assign AS btn_assign
    // ON(s_btn.btn_num = btn_assign.btn_num)
    const result = await poolQuery({ client, query: getBtnQuery, values: val });
    let response = result[0] || {};
    // const supDocs = await supportingDataForServiceBtn(client, response.purchasing_doc_no);
    response = { ...response };

    return { success: true, statusCode: 200, message: "Value fetch success", data: response };
  } catch (error) {
    console.log("dddddd", error.message);

    throw error;
  }
}


const getGrnIcgrnByInvoice = async (client, data) => {
  try {
    const { purchasing_doc_no, invoice_no } = data;

    if (!purchasing_doc_no || !invoice_no) {
      return { success: false, statusCode: 200, message: "purchasing_doc_no || invoice_no missing", data: {} };
    }
    const gate_entry_q = `SELECT ENTRY_NO AS gate_entry_no,
    ZMBLNR AS grn_no, EBELP as po_lineitem,
    INV_DATE AS invoice_date FROM zmm_gate_entry_d WHERE EBELN = $1 AND INVNO = $2`;

    let gate_entry_v = await getQuery({
      query: gate_entry_q,
      values: [purchasing_doc_no, invoice_no],
    });

    if (gate_entry_v.length == 0) {
      return { success: false, statusCode: 200, message: "No record found under the invoice number", data: {} };

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

      return { success: false, statusCode: 200, message: "Plese do ICGRN to Process BTN", data: response };

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

    return { success: true, statusCode: 200, message: "purchasing_doc_no || invoice_no missing", data: gate_entry_v };

  } catch (error) {
    throw error;
  }
};

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

async function getInitalData(client, data) {
  try {

    if (!data.poNo) {
      return { success: false, statusCode: 200, message: "Please send btn number", data: Message.MANDATORY_INPUTS_REQUIRED };
    }
    const val = [];
    val.push(data.poNo);
    const response = await supportingDataForAdvancBtn(client, data.poNo);

    console.log("response", response);
    

    return { success: true, statusCode: 200, message: "Value fetch success", data: response };
  } catch (error) {
    console.log("dddddd", error.message, error.stack);

    throw error;
  }
}


/**
 * 
 * @param {Object} client 
 * @param {Object} data 
 * @returns {Promise<Object>}
 * @throws {Error} If the query execution fails, an error is thrown.
 */
const getBgApprovedFiles = async (client, data) => {
  try {
      let q = `SELECT action_type, file_name, file_path  FROM sdbg WHERE purchasing_doc_no = $1 and status = $2 and (action_type = $3 or action_type = $4)`;
      let result = await poolQuery({ client, query: q, values: data });
      console.log("resultresultresultresultresult", result, q, data);


    const obj = {
      ibFileName : null,
      ibFilePath: null,
      abgFileName: null,
      abgFilePath: null,
    }
    if(result.length) {
      obj.ibFileName = result.find((el) => el.action_type === ACTION_IB)?.file_name;
      obj.ibFilePath = result.find((el) => el.action_type === ACTION_IB)?.file_path;
      obj.abgFileName = result.find((el) => el.action_type === ACTION_ADVANCE_BG_SUBMISSION)?.file_name;
      obj.abgFilePath = result.find((el) => el.action_type === ACTION_ADVANCE_BG_SUBMISSION)?.file_path;
    }

      return obj;
  } catch (error) {
      throw error;
  }
};

async function supportingDataForAdvancBtn(client, poNo) {
  try {

    console.log("dddddddddddddddd", poNo);


    const response = await Promise.all(
      [
        getSDBGApprovedFiles(client, [poNo, APPROVED, ACTION_SDBG]), // 0
        getBgApprovedFiles(client, [poNo, APPROVED, ACTION_ADVANCE_BG_SUBMISSION, ACTION_IB]), // 1
        vendorDetails(client, [poNo]), // 2
        getContractutalSubminissionDate (client, [poNo]), // 3
        getActualSubminissionDate(client, [poNo]) // 4
      ]);

    let result = {}

    console.log("0",response[0][0]);
    console.log("1",response[1]);
    console.log("2",response[2][0]);
    console.log("3",response[3][0]);
    console.log("4",response[4][0]);
    
    if (response[0][0]) {
      result = { ...result, sdbgFiles: response[0] };
    } 
    if (response[1]) {
      result = { ...result, ...response[1] };
    } if (response[2][0]) {
      result = { ...result, ...response[2][0] };
    }
  
    if (response[3] && response[3][0]) {
      // const con = response[3].find((el) => el.MID == MID_SDBG);
      result.contractualDates = response[3];
    }
    if (response[4] && response[4][0]) {
      // const act = response[4].find((el) => el.MID == parseInt(MID_DRAWING));
      result.actualDates = response[4];
    }

    return result;
  } catch (error) {
    console.log("ddddddddddddddddd", error.message, error.stack);

    throw error;
  }
}



module.exports = {
  advBillHybridbtnPayload,
  // getSDBGApprovedFiles,
  getGrnIcgrnByInvoice,
  // checkBTNRegistered,
  getICGRNs,

  // getPBGApprovedFiles,
  checkMissingActualSubmissionDate,
  filesData,
  contractualSubmissionDate,
  actualSubmissionDate,
  dateToEpochTime,
  advBillHybridbtnDOPayload,
  updateBtnListTable,
  getAdvBillHybridBTNDetails,
  getInitalData
};
