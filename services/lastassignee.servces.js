const { query, getQuery, poolClient, poolQuery } = require("../config/pgDbConfig");


/**
 * Modify SDBG Payload object to insert data
 * @param {Object} payload 
 * @param {string} status 
 * @returns Object
 */
const getLastAssignee = async(tableName, poNo, assign) => {

    let filterdata = `SELECT ${assign} FROM ${tableName} WHERE purchasing_doc_no = $1 AND last_assigned = $2`;
    console.log(filterdata);
    const result =  await getQuery({
      query: filterdata,
      values: [poNo, 1],
    });

    return result;
}

const getAssigneeList = async(dept_id, internal_role_id) => {
    const drawingQuery = `SELECT t1.emp_id, t2.* FROM emp_department_list AS t1
        LEFT JOIN 
            pa0002 AS t2 
        ON 
            t1.emp_id= t2.pernr  :: character varying WHERE
         t1.dept_id = $1 AND t1.internal_role_id = $2`;

  const result = await getQuery({ query: drawingQuery, values: [dept_id, internal_role_id] });

  return result;

}

const checkIsAssigned = async(tableName, poNo, userCode, assign) => {
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


module.exports = { getLastAssignee, getAssigneeList, checkIsAssigned }