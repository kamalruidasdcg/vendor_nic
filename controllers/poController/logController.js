const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");

const getLogList = async (req, res) => {

    try {
        const filterBy = { ...req.body };

        console.log("filterBy", filterBy);

        if (filterBy.purchasing_doc_no || filterBy.user_id || filterBy.depertment || filterBy.action || filterBy.vendor_code) {


            const values = [];
            let filterQuery =
                `SELECT
                    log.user_id AS id,
                    grse_user_details.CNAME AS grse_user_name,
                    vendor_details.NAME1 AS vendor_name,
                    log.id AS log_id,
                    log.action AS status,
                    log.remarks AS remarks,
                    log.created_at AS datetime,
                    log.purchasing_doc_no AS purchasing_doc_no,
                    log.depertment AS depertment,
                    dept.name AS departmentName
                FROM
                    department_wise_log
                AS
                    log

                LEFT JOIN
                    depertment_master
                AS
                    dept
                ON
                    dept.id = log.depertment
                LEFT JOIN 
                    pa0002 
                AS 
                       grse_user_details
                ON
                    grse_user_details.PERNR = log.user_id
                LEFT JOIN
                    lfa1 
                 AS
                     vendor_details
                 ON 
                    vendor_details.LIFNR = log.user_id`;

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


            let condQuery = " "

            if (Object.keys(filterBy).length > 0) {
                filterQuery += " WHERE ";
                const conditions = Object.keys(filterBy).map((key, index) => {
                    values.push(filterBy[key]);

                    if (index > 0) {
                        return `AND log.${key} = ?`;
                    } else {
                        return `log.${key} = ?`;
                    }
                });

                condQuery += conditions.join(" ");
            }
            if (startDate && !endDate) {
                condQuery = condQuery.concat(` AND log.created_at >= ?`)
                values.push(parseInt(startDate));
            }
            if (!startDate && endDate) {
                condQuery = condQuery.concat(` AND log.created_at <= ?`)
                values.push(parseInt(endDate));
            }
            if (startDate && endDate) {
                condQuery = condQuery.concat(` AND ( log.created_at BETWEEN ? AND ? )`)
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

            const result = await query({ query: filterQuery, values: values });
            // const result = await log(req, res, filterQuery, values);
            const logCount = await poReportCount(req, res, condQuery, values);
            const report = await poReport(req, res, condQuery, values, groupBy);
            // const response = await Promise.all(
            //     log(req, res, filterQuery, values),
            //     poReportCount(req, res, condQuery, values),
            //     poReport(req, res, condQuery, values)
            // )
            console.log(filterQuery)

            const modfResult = result.map((el) => {
                el["name"] = el.grse_user_name ? el.grse_user_name : el.vendor_name ? el.vendor_name : null;
                delete el["grse_user_name"];
                delete el["vendor_name"];
                return el;
            })

            resSend(res, true, 200, "data fetch scussfully.", { result: modfResult, logCount, report }, null);
        } else {
            return resSend(res, false, 400, "Please send -> purchasing_doc_no | user_id | depertment | action for get result", null, null);
        }

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
                log
            WHERE`;

        filterQuery = filterQuery.concat(condQuery);
        const result = await query({ query: filterQuery, values: values });
        if (result?.length) {
            return result[0]["log_count"]
        }

        return 0;

    } catch (error) {
        console.log("po report count error", error)
    }

}
async function poReport(req, res, condQuery, values, groupBy) {
    try {

        let reportQuery = `
        SELECT
        log.user_id AS id,
        log.purchasing_doc_no AS purchasing_doc_no,
        action AS status,
        COUNT(*) AS status_count,
        log.depertment AS depertment,
        dept.name AS department_name
            FROM
                department_wise_log
            AS 
                log
            LEFT JOIN
                depertment_master
            AS 
                dept
            ON 
                dept.id = log.depertment
            WHERE`;

        reportQuery = reportQuery.concat(condQuery);
        let by = "log.user_id"; 
        if(groupBy == "PO") {
            by = "log.purchasing_doc_no" 
        } else if(groupBy == "VENDOR") {
            by = "log.vendor_code" 
        }

        reportQuery = reportQuery.concat(
            ` 
            GROUP BY
                ${by}, log.action;`);

        console.log("reportQuery", reportQuery);
        const result = await query({ query: reportQuery, values });
        return result;

    } catch (error) {
        console.log("po report error", error)

    }

}


module.exports = { getLogList }