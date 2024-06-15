const { query, getQuery, poolClient, poolQuery } = require("../config/pgDbConfig");
const { EKPO } = require("../lib/tableName");


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
}

const getAssigneeList = async (dept_id, internal_role_id) => {
  const drawingQuery = `SELECT t1.emp_id, t2.* FROM emp_department_list AS t1
        LEFT JOIN 
            pa0002 AS t2 
        ON 
            t1.emp_id= t2.pernr  :: character varying WHERE
         t1.dept_id = $1 AND t1.internal_role_id = $2`;

  const result = await getQuery({ query: drawingQuery, values: [dept_id, internal_role_id] });

  return result;

}

const checkIsAssigned = async (tableName, poNo, userCode, assign) => {
  const check_assign_to_str = `SELECT COUNT(id) AS assign_count FROM ${tableName} WHERE purchasing_doc_no = $1 AND ${assign} = $2 AND last_assigned = $3`;

  const check_assign_to_query = await getQuery({
    query: check_assign_to_str,
    values: [
      poNo,
      userCode,
      1,
    ],
  });
  let check_assign_to_result = check_assign_to_query[0].assign_count;

  // console.log(check_assign_to_result);
  return check_assign_to_result;
}

const checkIsApprovedRejected = async (tableName, poNo, reference_no, status1, status2) => {
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
}

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
}

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

module.exports = { getLastAssignee, getAssigneeList, checkIsAssigned, checkIsApprovedRejected, getFristRow, checkPoType }