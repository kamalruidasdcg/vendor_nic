const { query } = require("../config/dbConfig");
const { INSERT } = require("../lib/constant");
const { PENDING } = require("../lib/status");
const {
  ACTUAL_SUBMISSION_DATE,
  ILMS,
  QAP_SUBMISSION,
  DRAWING,
  SDBG,
} = require("../lib/tableName");
const { getEpochTime, generateQuery } = require("../lib/utils");

/**
 * Modify SDBG Payload object to insert data
 * @param {Object} payload
 * @param {string} status
 * @returns Object
 */

const sdbgPayloadVendor = (obj, status) => {
  const payloadObj = {
    purchasing_doc_no: obj.purchasing_doc_no ? obj.purchasing_doc_no : null,
    bank_name: obj.bank_name ? obj.bank_name : null,
    branch_name: obj.branch_name ? obj.branch_name : null,
    ifsc_code: obj.ifsc_code ? obj.ifsc_code : null,
    bank_addr1: obj.bank_addr1 ? obj.bank_addr1 : null,
    bank_addr2: obj.bank_addr2 ? obj.bank_addr2 : null,
    bank_addr3: obj.bank_addr3 ? obj.bank_addr3 : null,
    bank_city: obj.bank_city ? obj.bank_city : null,
    pincode: obj.pincode ? obj.pincode : null,
    bg_no: obj.user_type ? obj.user_type : null,
    bg_date: obj.bg_date ? obj.bg_date : null,
    bg_ammount: obj.bg_ammount ? obj.bg_ammount : null,
    department: obj.department ? obj.department : null,
    vendor_pincode: obj.vendor_pincode ? obj.vendor_pincode : null,
    yard_no: obj.yard_no ? obj.yard_no : null,
    extension_date1: obj.extension_date1 ? obj.extension_date1 : null,
    release_date: obj.release_date ? obj.release_date : null,
    demand_notice_date: obj.demand_notice_date ? obj.demand_notice_date : null,
    extension_date: obj.extension_date ? obj.extension_date : null,
    status: obj.status ? obj.status : null,
    created_at: obj.created_at ? obj.created_at : null,
    remarks: obj.remarks ? obj.remarks : null,
    file_name: obj.file_name ? obj.file_name : null,
    vendor_code: obj.vendor_code ? obj.vendor_code : null,
    file_path: obj.file_path ? obj.file_path : null,
    updated_by: obj.updated_by ? obj.updated_by : null,
    created_by_id: obj.created_by_id ? obj.created_by_id : null,
  };

  return payloadObj;
};
/**
 * Modify SDBG Payload object to insert data
 * @param {Object} payload
 * @param {string} status
 * @returns Object
 */

const sdbgPayload = (payload, status) => {
  const payloadObj = {
    // "id": 1, // auto incremant id
    reference_no: payload.reference_no,
    purchasing_doc_no: payload.purchasing_doc_no,
    file_name: payload.fileName || null,
    file_path: payload.filePath || null,
    remarks: payload.remarks || null,
    status: payload.status || null,
    actionTypeId: payload.actionTypeId || null,
    actionType: payload.actionType || null,
    updated_by: payload.updated_by,
    vendor_code: payload.vendor_code || null,
    assigned_from: payload.assigned_from || null,
    assigned_to: payload.assigned_to || null,
    created_at: payload.created_at || getEpochTime(),
    created_by_name: payload.action_by_name || null,
    created_by_id: payload.created_by_id,
  };

  return payloadObj;
};

/**
 * Modify drawing payload object to insert data
 * @param {Object} payload
 * @param {string} status
 * @returns Object
 */
const drawingPayload = (payload, status) => {
  const payloadObj = {
    // "id": 1, // auto incremant id
    purchasing_doc_no: payload.purchasing_doc_no,
    file_name: payload.fileName || null,
    file_path: payload.filePath || null,
    remarks: payload.remarks || null,
    status: status,
    actionType: payload.actionType || null,
    actionTypeId: payload.actionTypeId || null,
    updated_by: payload.updated_by,
    vendor_code: payload.vendor_code || null,
    created_at: payload.created_at || getEpochTime(),
    created_by_id: payload.created_by_id,
  };

  return payloadObj;
};
/**
 * Modify qap payload object to insert data
 * @param {Object} payload
 * @param {string} status
 * @returns Object
 */
const qapPayload = (payload, status) => {
  const payloadObj = {
    // "id": 1, // auto incremant id
    purchasing_doc_no: payload.purchasing_doc_no,
    file_name: payload.fileName ? payload.fileName : null,
    file_path: payload.filePath ? payload.filePath : null,
    remarks: payload.remarks ? payload.remarks : null,
    action_type: payload.action_type ? payload.action_type : null,
    assigned_to: payload.assigned_to ? payload.assigned_to : null,
    assigned_from: payload.assigned_from ? payload.assigned_from : null,
    status: status,
    updated_by: payload.updated_by,
    vendor_code: payload.vendor_code ? payload.vendor_code : null,
    created_at: payload.created_at ? payload.created_at : getEpochTime(),
    created_by_name: payload.action_by_name ? payload.action_by_name : null,
    created_by_id: payload.action_by_id,
  };

  return payloadObj;
};

const wdcPayload = (payload) => {
  const payloadObj = {
    purchasing_doc_no: payload.purchasing_doc_no,
    vendor_code: payload.vendor_code,
    file_name: payload.fileName ? payload.fileName : null,
    file_path: payload.filePath ? payload.filePath : null,
    remarks: payload.remarks,
    status: payload.status,
    updated_by: payload.updated_by,
    created_at: payload.created_at ? payload.created_at : getEpochTime(),
    created_by_id: payload.created_by_id,
    wdc_ref_no: payload.wdc_ref_no ? payload.wdc_ref_no : null,
    wdc_date: payload.wdc_date ? payload.wdc_date : null,
    po_line_iten_no: payload.po_line_iten_no ? payload.po_line_iten_no : null,
    job_location: payload.job_location ? payload.job_location : null,
    yard_no: payload.yard_no ? payload.yard_no : null,
    actual_start_date: payload.actual_start_date
      ? payload.actual_start_date
      : null,
    actual_completion_date: payload.actual_completion_date
      ? payload.actual_completion_date
      : null,
    unit: payload.unit ? payload.unit : null,
    messurment: payload.messurment ? payload.messurment : null,
    quantity: payload.quantity ? payload.quantity : null,
    entry_by_production: payload.entry_by_production
      ? payload.entry_by_production
      : null,
    stage_datiels: payload.stage_datiels ? payload.stage_datiels : null,
    actual_payable_amount: payload.actual_payable_amount
      ? payload.actual_payable_amount
      : null,
  };

  return payloadObj;
};

const shippingDocumentsPayload = (payload, status) => {
  const payloadObj = {
    purchasing_doc_no: payload.purchasing_doc_no,
    file_name: payload.fileName ? payload.fileName : null,
    file_path: payload.filePath ? payload.filePath : null,
    file_type_id: payload.file_type_id,
    file_type_name: payload.file_type_name,
    remarks: payload.remarks ? payload.remarks : null,
    updated_by: payload.updated_by,
    vendor_code: payload.vendor_code ? payload.vendor_code : null,
    created_at: payload.created_at,
    created_by_id: payload.created_by_id,
  };

  return payloadObj;
};
const inspectionCallLetterPayload = (payload) => {
  const payloadObj = {
    purchasing_doc_no: payload.purchasing_doc_no,
    file_name: payload.fileName ? payload.fileName : null,
    file_path: payload.filePath ? payload.filePath : null,
    file_type_id: payload.file_type_id,
    file_type_name: payload.file_type_name,
    remarks: payload.remarks ? payload.remarks : null,
    updated_by: payload.updated_by,
    vendor_code: payload.vendor_code ? payload.vendor_code : null,
    created_at: payload.created_at,
    created_by_id: payload.created_by_id,
  };

  return payloadObj;
};

const poModifyData = (queryResult) => {
  const resArr = [];
  if (!Array.isArray(queryResult) && !queryResult.result) return [];
  const result = queryResult.map((row) => {
    let po = {};
    let sdbg = {};
    let drawing = {};

    for (const key in row) {
      const [table, column] = key.split(".");

      switch (table) {
        case "ekko":
          po[column] = row[key];
          break;
        case "new_sdbg":
          sdbg[column] = row[key];
          break;
        case "add_drawing":
          drawing[column] = row[key];
          break;
      }

      resArr.push({ po, sdbg, drawing });
      // po = sdbg = drawing = {};
    }

    return { po, sdbg, drawing };
  });

  return result;
};

async function poDataModify(data) {
  if (!data || !Array.isArray(data) || !data.length) return [];
  let obj = {};
  data.forEach((element) => {
    let key = element.poNb;

    if (key in obj) {
      let val = obj[key];
      let newVal = {
        poType: element.poType,
        m_number: element.m_number,
        MTART: element.MTART,
        vendor_code: element.vendor_code,
        vendor_name: element.vendor_name,
        wbs_id: element.wbs_id,
        project_code: element.project_code,
      };

      obj[key] = [...val, newVal];
    } else {
      obj[key] = [
        {
          poType: element.poType,
          m_number: element.m_number,
          MTART: element.MTART,
          vendor_code: element.vendor_code,
          vendor_name: element.vendor_name,
          wbs_id: element.wbs_id,
          project_code: element.project_code,
        },
      ];
    }
  });

  return obj;
}

/**
 * insertActualSubmission funton
 * @param {Object} data
 */
const insertActualSubmission = async (data) => {
  try {
    let payload = { ...data };
    const { q, val } = generateQuery(INSERT, ACTUAL_SUBMISSION_DATE, payload);
    const result = await query({ query: q, values: val });
  } catch (error) {
    console.log("insertActualSubmission function errrrrr");
  }
};

async function setActualSubmissionDate(payload, mid, tokenData, status) {
  const getTableName = (mid) => {
    switch (mid) {
      case 1:
        return SDBG;
      case 2:
        return DRAWING;
      case 3:
        return QAP_SUBMISSION;
      case 4:
        return ILMS;
      default:
        return null;
    }
  };

  const tableName = getTableName(mid);
  if (!tableName || !mid) return false;

  const st = status || PENDING;

  const getlatestData = `SELECT created_at FROM ${tableName} WHERE (purchasing_doc_no = ? AND vendor_code = ? AND status = ? ) ORDER BY id DESC LIMIT 1`;
  const result = await query({
    query: getlatestData,
    values: [payload.purchasing_doc_no, payload.vendor_code, st],
  });
  console.log(payload.purchasing_doc_no, payload.vendor_code, st);
  console.log(getlatestData);
  console.log(result, "result");
  const mtext = {
    1: "ACTUAL SDBG SUBMISSION DATE",
    2: "ACTUAL DRAWING SUBMISSION DATE",
    3: "ACTUAL QAP SUBMISSION DATE",
    4: "ACTUAL ILMS SUBMISSION DATE",
  };

  if (result && result.length) {
    const payloadObj = {
      purchasing_doc_no: payload.purchasing_doc_no,
      milestoneId: mid,
      milestoneText: mtext[mid],
      actualSubmissionDate: result[0].created_at,
      created_at: payload.created_at,
      created_by_id: tokenData.vendor_code,
    };
    console.log("payload");
    const { q, val } = generateQuery(
      INSERT,
      ACTUAL_SUBMISSION_DATE,
      payloadObj
    );
    const response = await query({ query: q, values: val });

    return true;
  }
  return false;
}

module.exports = {
  sdbgPayload,
  sdbgPayloadVendor,
  drawingPayload,
  qapPayload,
  poModifyData,
  wdcPayload,
  shippingDocumentsPayload,
  poDataModify,
  inspectionCallLetterPayload,
  insertActualSubmission,
  setActualSubmissionDate,
};
