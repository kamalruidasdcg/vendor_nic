const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { SDBG, DRAWING, QAP_SUBMISSION } = require("../../lib/tableName");
const { QAP_ASSIGNER } = require("../../lib/constant");

const dashboard = async (req, res) => {
  try {
    const filterBy = { ...req.body };

    console.log("filterBy", filterBy);

    if (!filterBy.depertment) {
      return resSend(
        res,
        false,
        400,
        "Please send -> depertment to get result",
        null,
        null
      );
    }

    const tables = {
      1: SDBG,
      2: DRAWING,
      3: QAP_SUBMISSION,
    };

    if (!tables[filterBy.depertment]) {
      return resSend(
        res,
        false,
        400,
        "Please check -> depertment or Invalid department",
        null,
        null
      );
    }

    const values = [];
    let filterQuery = `SELECT log.user_id             AS id,
                grse_user_details.cname AS grse_user_name,
                vendor_details.name1    AS vendor_name,
                log.id                  AS log_id,
                log.action              AS status,
                log.remarks             AS remarks,
                log.created_at          AS datetime,
                log.purchasing_doc_no   AS purchasing_doc_no,
                log.depertment          AS depertment,
                dept.NAME               AS departmentName,
                content.file_name       AS file_name,
                content.file_path       AS file_path
            FROM   department_wise_log AS log
            LEFT JOIN depertment_master AS dept
                   ON dept.id = log.depertment
            LEFT JOIN pa0002 AS grse_user_details
                   ON grse_user_details.pernr = log.user_id
            LEFT JOIN lfa1 AS vendor_details
                   ON vendor_details.lifnr = log.user_id
            LEFT JOIN ${tables[filterBy.depertment]} AS content
                    ON log.dept_table_id  = content.id`;

    // USE FOR OTHER THAN DATE QUERIES

    const getGrseUserEmpNameQ = `
                LEFT JOIN 
                    pa0002 
                AS 
                    p1
                ON
                    p1.PERNR = log.user_id`;

    // USE FOR DATE QUERIES
    let { startDate, endDate, page, limit, groupBy } = filterBy;
    delete filterBy.startDate;
    delete filterBy.endDate;
    delete filterBy.page;
    delete filterBy.limit;
    delete filterBy.groupBy;

    let condQuery = " WHERE 1 = 1 ";

    if (Object.keys(filterBy).length > 0) {
      const conditions = Object.keys(filterBy).map((key, index) => {
        if (filterBy[key]) {
          values.push(filterBy[key]);
          return ` AND log.${key} = ?`;
        }
      });

      condQuery += conditions.join(" ");
    }
    if (startDate && !endDate) {
      condQuery = condQuery.concat(` AND log.created_at >= ?`);
      values.push(parseInt(startDate));
    }
    if (!startDate && endDate) {
      condQuery = condQuery.concat(` AND log.created_at <= ?`);
      values.push(parseInt(endDate));
    }
    if (startDate && endDate) {
      condQuery = condQuery.concat(` AND ( log.created_at BETWEEN ? AND ? )`);
      values.push(parseInt(startDate), parseInt(endDate));
    }

    filterQuery = filterQuery.concat(condQuery);

    // filterQuery = filterQuery.concat(` ORDER BY log.id DESC`);
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 10;
    const offSet = (page - 1) * limit;

    const pageinatonQ = ` LIMIT ${offSet}, ${limit}`;
    const orderByQ = ` ORDER BY log.created_at DESC`;

    filterQuery = filterQuery.concat(orderByQ);
    filterQuery = filterQuery.concat(pageinatonQ);

    console.log("filterQuery", filterQuery);
    console.log("values", values);

    const result = await query({ query: filterQuery, values: values });

    const logCount = await poReportCount(req, res, condQuery, values);

    const modfResult = result.map((el) => {
      el["name"] = el.grse_user_name
        ? el.grse_user_name
        : el.vendor_name
        ? el.vendor_name
        : null;
      delete el["grse_user_name"];
      delete el["vendor_name"];
      return el;
    });

    resSend(
      res,
      true,
      200,
      "data fetch scussfully.",
      { result: modfResult, logCount },
      null
    );
  } catch (error) {
    return resSend(res, false, 500, error, [], null);
  }
};

async function poReportCount(req, res, condQuery, values) {
  try {
    let filterQuery = `
            SELECT
                COUNT(*) AS log_count
            FROM
                department_wise_log
            AS 
                log`;

    filterQuery = filterQuery.concat(condQuery);
    const result = await query({ query: filterQuery, values: values });
    if (result?.length) {
      return result[0]["log_count"];
    }

    return 0;
  } catch (error) {
    console.log("po report count error", error);
  }
}

const subDeptEmp = async (req, res) => {
  const filterBy = { ...req.body };

  if (
    !filterBy.department_id &&
    filterBy.department_id == 3 &&
    filterBy.sub_dept_id
  ) {
    return resSend(
      res,
      false,
      400,
      "send valid department_id && sub dept id",
      null,
      null
    );
  }

  const tokenData = { ...req.tokenData };
  let subDeptListQuery = "";
  if (filterBy.department_id == 3) {
    subDeptListQuery = `SELECT sub_dept.name                 AS sub_dept_name,
                        sub_dept.id                   AS sub_dept_id,
                        emp_department_list.dept_name AS dept_name,
                        emp_department_list.dept_id   AS dept_id,
                        emp_department_list.emp_id    AS emp_id,
                        emp_name.cname                AS emp_name
                 FROM   sub_dept AS sub_dept
                        LEFT JOIN emp_department_list AS emp_department_list
                               ON (sub_dept.id = emp_department_list.sub_dept_id)
                        LEFT JOIN pa0002 AS emp_name
                               ON emp_name.pernr = emp_department_list.emp_id
                        LEFT JOIN auth AS auth
                               ON ( auth.internal_role_id = 2
                                    AND auth.department_id = emp_department_list.dept_id
                                    AND auth.vendor_code = emp_department_list.emp_id )
                 WHERE  ( sub_dept.id = ?
                          AND emp_department_list.dept_id = ? );`;
  } else {
    subDeptListQuery = `SELECT sub_dept.name                 AS sub_dept_name,
                        sub_dept.id                   AS sub_dept_id,
                        emp_department_list.dept_name AS dept_name,
                        emp_department_list.dept_id   AS dept_id,
                        emp_department_list.emp_id    AS emp_id,
                        emp_name.cname                AS emp_name
                 FROM   sub_dept AS sub_dept
                        LEFT JOIN emp_department_list AS emp_department_list
                               ON (sub_dept.id = emp_department_list.sub_dept_id)
                        LEFT JOIN pa0002 AS emp_name
                               ON emp_name.pernr = emp_department_list.emp_id
                        LEFT JOIN auth AS auth
                               ON ( auth.internal_role_id = 2
                                    AND auth.department_id = emp_department_list.dept_id
                                    AND auth.vendor_code = emp_department_list.emp_id )
                 WHERE  ( sub_dept.id = ?
                          AND emp_department_list.dept_id = ? );`;
  }

  const result = await query({
    query: subDeptListQuery,
    values: [filterBy.sub_dept_id, filterBy.department_id],
  });

  resSend(res, true, 200, "subdept emp list", result, null);
};

const subDeptList = async (req, res) => {
  const q = `SELECT * FROM sub_dept`;
  const result = await query({ query: q, values: [] });
  resSend(res, true, 200, "subdeptList", result, null);
};

// const dashboard = async (req, res) => {

//     try {
//         const filterBy = { ...req.body };
//         const tokenData = { ...req.tokenData };

//         if (!filterBy.depertment) {
//             return resSend(res, false, 400, "Please send -> depertment to get result", null, null);
//         }

//         console.log("tokenData", tokenData);

//         const values = [];
//         let filterQuery =
//             `SELECT created_at,
//                 purchasing_doc_no,
//                 status,
//                 file_name,
//                 file_path,
//                 created_by_id,
//                 created_by_name
//             FROM   sdbg AS sdbg `;

//         // USE FOR DATE QUERIES
//         let { startDate, endDate, page, limit, empId } = filterBy;

//         // deleting from filter object
//         delete filterBy.startDate;
//         delete filterBy.endDate;
//         delete filterBy.page;
//         delete filterBy.limit;
//         delete filterBy.empId;

//         let condQuery = " WHERE 1 = 1"

//         if (Object.keys(filterBy).length > 0) {
//             const conditions = Object.keys(filterBy).map((key, index) => {
//                 if (filterBy[key]) {
//                     values.push(filterBy[key]);
//                     return ` AND sdbg.${key} = ?`;
//                 }
//             });

//             condQuery += conditions.join(" ");
//         }

//         if (startDate && !endDate) {
//             condQuery = condQuery.concat(` AND sdbg.created_at >= ?`)
//             values.push(parseInt(startDate));
//         }
//         if (!startDate && endDate) {
//             condQuery = condQuery.concat(` AND sdbg.created_at <= ?`)
//             values.push(parseInt(endDate));
//         }
//         if (startDate && endDate) {
//             condQuery = condQuery.concat(` AND ( sdbg.created_at BETWEEN ? AND ? )`)
//             values.push(parseInt(startDate), parseInt(endDate));
//         }
//         if (empId) {
//             condQuery = condQuery.concat(`AND ( sdbg.created_at = ? )`)
//             values.push(empId, empId);
//         }

//         filterQuery = filterQuery.concat(condQuery);

//         // filterQuery = filterQuery.concat(` ORDER BY log.id DESC`);
//         page = page ? parseInt(page) : 1;
//         limit = limit ? parseInt(limit) : 10;
//         const offSet = (page - 1) * limit;

//         const pageinatonQ = ` LIMIT ${offSet}, ${limit}`;
//         const orderByQ = ` ORDER BY sdbg.created_at DESC`;

//         filterQuery = filterQuery.concat(orderByQ);
//         filterQuery = filterQuery.concat(pageinatonQ);

//         console.log("filterQuery", filterQuery);
//         console.log("values", values);

//         const result = await query({ query: filterQuery, values: values });
//         // const result = await log(req, res, filterQuery, values);
//         const logCount = await sdbgCount(req, res, condQuery, values);
//         // const report = await poReport(req, res, condQuery, values, groupBy);
//         // const response = await Promise.all(
//         //     log(req, res, filterQuery, values),
//         //     poReportCount(req, res, condQuery, values),
//         //     poReport(req, res, condQuery, values)
//         // )

//         resSend(res, true, 200, "data fetch scussfully.", {result, count: logCount}, null);

//     } catch (error) {
//         return resSend(res, false, 500, error, [], null);
//     }
// }

// async function sdbgCount(req, res, condQuery, values) {
//     try {
//         let filterQuery =
//             `SELECT
//             COUNT(*) AS count
//         FROM sdbg AS sdbg`;

//         filterQuery = filterQuery.concat(condQuery);
//         const result = await query({ query: filterQuery, values: values });
//         if (result?.length) {
//             return result[0]["count"]
//         }

//         return 0;

//     } catch (error) {
//         console.log("po report count error", error)
//     }

// }

module.exports = { dashboard, subDeptEmp, subDeptList };
