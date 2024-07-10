const {
  query,
  getQuery,
  poolClient,
  poolQuery,
} = require("../config/pgDbConfig");
const { UPDATE, INSERT } = require("../lib/constant");
const {
  EKPO,
  SDBG_SAVE,
  SDBG,
  VENDOR_MASTER_LFA1,
  EKKO,
} = require("../lib/tableName");
const { getEpochTime, generateQuery } = require("../lib/utils");

/**
 * Modify SDBG Payload object to insert data
 * @param {Object} payload
 * @param {string} status
 * @returns Object
 */
const getLastAssignee = async (tableName, poNo, assign) => {
  let filterdata = `SELECT ${assign} FROM ${tableName} WHERE purchasing_doc_no = $1 AND last_assigned = $2`;
  console.log(filterdata);
  const result = await getQuery({
    query: filterdata,
    values: [poNo, 1],
  });

  return result;
};

const getAssigneeList = async (dept_id, internal_role_id) => {
  const drawingQuery = `SELECT t1.emp_id, t2.* FROM emp_department_list AS t1
        LEFT JOIN 
            pa0002 AS t2 
        ON 
            t1.emp_id= t2.pernr  :: character varying WHERE
         t1.dept_id = $1 AND t1.internal_role_id = $2`;

  const result = await getQuery({
    query: drawingQuery,
    values: [dept_id, internal_role_id],
  });

  return result;
};

const checkIsAssigned = async (tableName, poNo, userCode, assign) => {
  const check_assign_to_str = `SELECT COUNT(id) AS assign_count FROM ${tableName} WHERE purchasing_doc_no = $1 AND ${assign} = $2 AND last_assigned = $3`;

  const check_assign_to_query = await getQuery({
    query: check_assign_to_str,
    values: [poNo, userCode, 1],
  });
  let check_assign_to_result = check_assign_to_query[0].assign_count;

  // console.log(check_assign_to_result);
  return check_assign_to_result;
};

const checkIsApprovedRejected = async (
  tableName,
  poNo,
  reference_no,
  status1,
  status2
) => {
  try {
    const check = `SELECT COUNT(status) AS count_val FROM ${tableName} WHERE purchasing_doc_no = $1 AND reference_no = $2 AND (status = $3 OR status = $4)`;
    const resAssigneQry = await getQuery({
      query: check,
      values: [poNo, reference_no, status1, status2],
    });

    return resAssigneQry[0].count_val;
  } catch (error) {
    console.log(error);
  }
};

const getFristRow = async (table_name, star, purchasing_doc_no) => {
  try {
    const get_query = `SELECT ${star} FROM ${table_name} WHERE purchasing_doc_no = $1 ORDER BY created_at ASC LIMIT 1`;
    const result = await getQuery({
      query: get_query,
      values: [purchasing_doc_no],
    });

    return result[0];
  } catch (error) {
    console.log("error into getFristRow function :"`${error}`);
  }
};

const checkPoType = async (poNo) => {
  try {
    let materialQuery = `SELECT
      mat.EBELP AS material_item_number,
      mat.KTMNG AS material_quantity, 
      mat.MATNR AS material_code,
      mat.MEINS AS material_unit,

      mat.EINDT as contractual_delivery_date, 
      materialMaster.*, 
      mat_desc.MAKTX as mat_description
      FROM ${EKPO} AS  mat
          
          LEFT JOIN mara AS materialMaster 
              ON (materialMaster.MATNR = mat.MATNR)
          LEFT JOIN makt AS mat_desc
              ON mat_desc.MATNR = mat.MATNR
      WHERE mat.EBELN = $1`;

    let materialResult = await getQuery({
      query: materialQuery,
      values: [poNo],
    });

    const isMaterialTypePO = poTypeCheck(materialResult);

    const poType = isMaterialTypePO === true ? "SERVICE" : "MATERIAL";
    return poType;
  } catch (error) {
    console.log("error into checkPoType function :"`${error}`);
  }
};

function poTypeCheck(materialData) {
  const regex = /DIEN/; // USE FOR IDENTIFY SERVICE PO as discuss with Preetham
  // const regex = /ZDIN/;   // NOT USE FOR IDENTIFY SERVICE PO
  // regex.test(materialType);
  let isMatched = true;

  for (let i = 0; i < materialData.length; i++) {
    isMatched = regex.test(materialData[i]?.MTART);
    if (isMatched === false) break;
  }

  return isMatched;
}

const insertSdbgEntrySave = async (tableName, obj, tokenData) => {
  try {
    const client = await poolClient();
    try {
      const star = `vendor_code`;
      // GET Vendor Info
      let vendor_code = await getFristRow(SDBG, star, obj.purchasing_doc_no);

      vendor_code = vendor_code.vendor_code;

      let v_query = `SELECT * FROM ${VENDOR_MASTER_LFA1} WHERE LIFNR = $1`;
      const dbResult = await poolQuery({
        client,
        query: v_query,
        values: [vendor_code],
      });

      let other_details = {};
      if (dbResult && dbResult.length > 0) {
        let obj = dbResult[0];

        other_details.vendor_name = obj.name1 ? obj.name1 : null;
        other_details.vendor_city = obj.ort01 ? obj.ort01 : null;
        other_details.vendor_pin_code = obj.pstlz ? obj.pstlz : "";
        other_details.vendor_address1 = obj.stras ? obj.stras : "";
      }

      // GET PO Date
      let po_date_query = `SELECT aedat FROM ${EKKO} WHERE ebeln = $1`;
      const poDateRes = await poolQuery({
        client,
        query: po_date_query,
        values: [obj?.purchasing_doc_no],
      });

      if (poDateRes && poDateRes.length > 0) {
        let obj = poDateRes[0];
        other_details.po_date = obj.aedat
          ? new Date(obj.aedat).getTime()
          : null;
      }

      const insertPayload = {
        ...other_details,
        reference_no: obj.reference_no,
        purchasing_doc_no: obj.purchasing_doc_no,
        department: obj.department ? obj.department : null,
        bank_name: obj.bank_name ? obj.bank_name : null,
        branch_name: obj.branch_name ? obj.branch_name : null,
        bank_addr1: obj.bank_addr1 ? obj.bank_addr1 : null,
        bank_addr2: obj.bank_addr2 ? obj.bank_addr2 : null,
        bank_addr3: obj.bank_addr3 ? obj.bank_addr3 : null,
        bank_city: obj.bank_city ? obj.bank_city : null,
        bank_pin_code: obj.bank_pin_code ? obj.bank_pin_code : null,

        bg_no: obj.bg_no ? obj.bg_no : null,
        bg_date: obj.bg_date ? obj.bg_date : null,
        bg_ammount: obj.bg_ammount ? obj.bg_ammount : null,
        yard_no: obj.yard_no ? obj.yard_no : null,

        validity_date: obj.validity_date ? obj.validity_date : null,
        claim_priod: obj.claim_priod ? obj.claim_priod : null,
        check_list_reference: obj.reference_no ? obj.reference_no : null,
        check_list_date: getEpochTime(),
        bg_type: obj.bg_type ? obj.bg_type : null,
        bg_file_no: obj.bg_file_no ? obj.bg_file_no : null,
        bg_recived_date: obj.bg_recived_date ? obj.bg_recived_date : null,
        // man_no: tokenData.vendor_code,
        status: obj.status,
        created_at: getEpochTime(),
        created_by: tokenData.vendor_code,

        extension_date1: obj.extension_date1 ? obj.extension_date1 : 0,
        extension_date2: obj.extension_date2 ? obj.extension_date2 : 0,
        extension_date3: obj.extension_date3 ? obj.extension_date3 : 0,
        extension_date4: obj.extension_date4 ? obj.extension_date4 : 0,
        release_date: obj.release_date ? obj.release_date : 0,
        demand_notice_date: obj.demand_notice_date ? obj.demand_notice_date : 0,
        extension_letter_date: obj.extension_letter_date
          ? obj.extension_letter_date
          : 0,
      };
      if (tableName == SDBG_SAVE) {
        insertPayload.man_no = tokenData.vendor_code;
      }

      // SDBG_ENTRY

      let dbQuery = `SELECT COUNT(*) AS count FROM ${tableName} WHERE purchasing_doc_no = $1 AND reference_no = $2`;
      const dbResult2 = await poolQuery({
        client,
        query: dbQuery,
        values: [obj.purchasing_doc_no, obj.reference_no],
      });

      const whereCondition = {
        purchasing_doc_no: obj.purchasing_doc_no,
        reference_no: obj.reference_no,
      };

      let q, val;

      if (dbResult2[0].count > 0) {
        ({ q, val } = generateQuery(
          UPDATE,
          tableName,
          insertPayload,
          whereCondition
        ));
      } else {
        ({ q, val } = generateQuery(INSERT, tableName, insertPayload));
      }

      let sdbgEntryQuery = await poolQuery({
        client,
        query: q,
        values: val,
      });
      return sdbgEntryQuery;
    } catch (error) {
      console.log(error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getLastAssignee,
  getAssigneeList,
  checkIsAssigned,
  checkIsApprovedRejected,
  getFristRow,
  checkPoType,
  insertSdbgEntrySave,
};
