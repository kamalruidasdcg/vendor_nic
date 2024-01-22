const path = require('path');
const { sdbgPayload } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT, UPDATE, USER_TYPE_VENDOR } = require("../../lib/constant");
const { NEW_SDBG } = require("../../lib/tableName");
const { PENDING, ACKNOWLEDGED, RE_SUBMITTED, SAVED } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const { getFilteredData } = require("../../controllers/genralControlles");
const SENDMAIL = require("../../lib/mailSend");
const { SDBG_SUBMIT_MAIL_TEMPLATE } = require("../../templates/mail-template");
const { mailInsert } = require('../../services/mai.services');
const { mailTrigger } = require('../sendMailController');
const { SDBG_SUBMIT_BY_VENDOR, SDBG_SUBMIT_BY_GRSE } = require('../../lib/event');


// add new post
const submitSDBG = async (req, res) => {

    try {


        // Handle Image Upload
        let fileData = {};
        if (req.file) {
            fileData = {
                fileName: req.file.filename,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
            };
            const tokenData = { ...req.tokenData };
            let payload = { ...req.body, ...fileData, created_at: getEpochTime() };
            payload.updated_by = (tokenData.user_type === USER_TYPE_VENDOR) ? "VENDOR" : "GRSE";
            payload.action_by_id = tokenData.vendor_code;

            const verifyStatus = [PENDING, RE_SUBMITTED, ACKNOWLEDGED]

            if (!payload.purchasing_doc_no || !payload.updated_by || !payload.action_by_name || !payload.action_by_id || !verifyStatus.includes(payload.status)) {

                // const directory = path.join(__dirname, '..', 'uploads', 'drawing');
                // const isDel = handleFileDeletion(directory, req.file.filename);
                return resSend(res, false, 400, "Please send valid payload", null, null);

            }

            const GET_LATEST_SDBG = `SELECT purchasing_doc_no, status, updated_by, created_by_id, created_by_name FROM ${NEW_SDBG} WHERE purchasing_doc_no = ? AND status = ? AND isLocked = 1`;
            const result2 = await getSDBGData(GET_LATEST_SDBG, payload.purchasing_doc_no, ACKNOWLEDGED);
            if (result2 && result2?.length) {
                const data = [{
                    purchasing_doc_no: result2[0]?.purchasing_doc_no,
                    status: result2[0]?.status,
                    acknowledgedByName: result2[0]?.created_by_name,
                    acknowledgedById: result2[0]?.created_by_id,
                    message: "The SDBG is already acknowledge. If you want to reopen, please contact with senior management."
                }];

                return resSend(res, true, 200, `This sdbg aleready ${ACKNOWLEDGED} [ PO - ${payload.purchasing_doc_no} ]`, data, null);
            }


            let insertObj;

            if (payload.status === PENDING) {
                payload = { ...payload, isLocked: 0 };
                insertObj = sdbgPayload(payload, PENDING);
            } else if (payload.status === RE_SUBMITTED) {

                // const GET_LATEST_SDBG = `SELECT bank_name, transaction_id, vendor_code FROM ${NEW_SDBG} WHERE purchasing_doc_no = ? AND status = ?`;


                // const result = await query({ query: GET_LATEST_SDBG, values: [payload.purchasing_doc_no, PENDING] });
                // console.log("iiii", result)

                // if (!result || !result.length) {
                //     return resSend(res, true, 200, "No SDBG found to resubmit", null, null);
                // }

                // payload = {
                //     ...payload,
                //     bank_name: result[0].bank_name,
                //     transaction_id: result[0].transaction_id,
                //     vendor_code: result[0].vendor_code,
                // }

                // insertObj = sdbgPayload(payload, RE_SUBMITTED);

            } else if (payload.status === ACKNOWLEDGED && payload.updated_by == "GRSE") {

                const GET_LATEST_SDBG = `SELECT bank_name, transaction_id, vendor_code FROM ${NEW_SDBG} WHERE purchasing_doc_no = ? AND status = ?`;

                const result = await query({ query: GET_LATEST_SDBG, values: [payload.purchasing_doc_no, PENDING] });

                if (!result || !result.length) {
                    return resSend(res, true, 200, "No SDBG found to acknowledge", null, null);
                }
                payload = { ...payload, isLocked: 1 };
                insertObj = sdbgPayload(payload, ACKNOWLEDGED);
            }

            const { q, val } = generateQuery(INSERT, NEW_SDBG, insertObj);
            const response = await query({ query: q, values: val });

            if (response.affectedRows) {
                // mail setup


                // if (payload.status === PENDING) {

                //     if (payload.updated_by == "VENDOR") {

                //         const result = await poContactDetails(payload.purchasing_doc_no);
                //         payload.delingOfficerName = result[0]?.dealingOfficerName;
                //         payload.mailSendTo = result[0]?.dealingOfficerMail;
                //         payload.vendor_name = result[0]?.vendor_name;
                //         payload.vendor_code = result[0]?.vendor_code;
                //         payload.sendAt = new Date(payload.created_at);
                //         mailTrigger({ ...payload }, SDBG_SUBMIT_BY_VENDOR);

                //     } else if (payload.updated_by == "GRSE") {

                //         const result = await poContactDetails(payload.purchasing_doc_no);
                //         payload.vendor_name = result[0]?.vendor_name;
                //         payload.vendor_code = result[0]?.vendor_code;
                //         payload.mailSendTo = result[0]?.vendor_mail_id;
                //         payload.delingOfficerName = result[0]?.dealingOfficerName;
                //         payload.sendAt = new Date(payload.created_at);

                //         mailTrigger({ ...payload }, SDBG_SUBMIT_BY_GRSE);

                //     }
                // }
                // if (payload.status === ACKNOWLEDGED && payload.updated_by == "GRSE") {

                //     const result = await poContactDetails(payload.purchasing_doc_no);
                //     payload.vendor_name = result[0]?.vendor_name;
                //     payload.vendor_code = result[0]?.vendor_code;
                //     payload.mailSendTo = result[0]?.vendor_mail_id;
                //     payload.delingOfficerName = result[0]?.dealingOfficerName;
                //     payload.sendAt = new Date(payload.created_at);
                //     mailTrigger({ ...payload }, SDBG_SUBMIT_BY_GRSE);

                // }

                await handelEmail(payload);


                resSend(res, true, 200, "file uploaded!", fileData, null);
            } else {
                resSend(res, false, 400, "No data inserted", response, null);
            }

        } else {
            resSend(res, false, 400, "Please upload a valid File", fileData, null);
        }

    } catch (error) {
        console.log("SDGB Submission api", error);

        return resSend(res, false, 500, "internal server error", [], null);
    }
}


const getSDBGData = async (getQuery, purchasing_doc_no, drawingStatus) => {
    // const Q = `SELECT purchasing_doc_no FROM ${NEW_SDBG} WHERE purchasing_doc_no = ? AND status = ?`;
    const result = await query({ query: getQuery, values: [purchasing_doc_no, drawingStatus] });
    return result;
}

const list = async (req, res) => {

    req.query.$tableName = NEW_SDBG;

    req.query.$filter = `{ "purchasing_doc_no" :  ${req.query.poNo}}`;
    try {

        if (!req.query.poNo) {
            return resSend(res, false, 400, "Please send po number", null, null);
        }

        getFilteredData(req, res);
    } catch (err) {
        console.log("data not fetched", err);
        resSend(res, false, 500, "Internal server error", null, null);
    }

}
const assigneeList = async (req, res) => {

    req.query.$tableName = NEW_SDBG;

    req.query.$filter = `{ "purchasing_doc_no" :  ${req.query.poNo}}`;
    try {

        if (!req.query.poNo) {
            return resSend(res, false, 400, "Please send po number", null, null);
        }

        getFilteredData(req, res);
    } catch (err) {
        console.log("data not fetched", err);
        resSend(res, false, 500, "Internal server error", null, null);
    }

}


const unlock = async (req, res) => {

    try {

        let payload = { ...req.body };

        if (!payload.purchasing_doc_no || !payload.action_by_name || !payload.action_by_id) {
            return resSend(res, false, 400, "Please send valid payload", null, null);
        }


        const isLocked_check_q = `SELECT * FROM ${NEW_SDBG} WHERE  (purchasing_doc_no = "${payload.purchasing_doc_no}" AND status = "${ACKNOWLEDGED}") ORDER BY id DESC LIMIT 1`;
        const lockeCheck = await query({ query: isLocked_check_q, values: [] });


        if (lockeCheck && lockeCheck?.length && lockeCheck[0]["isLocked"] === 0) {
            return resSend(res, true, 200, "Already unlocked or not Acknowledge yet", null, null);
        }



        const q = `UPDATE ${NEW_SDBG} SET 
                updated_by_name = "${payload.action_by_name}",
                updated_by_id = "${payload.action_by_id}",
                updated_at = ${getEpochTime()},
                isLocked =  0 WHERE  (purchasing_doc_no = "${payload.purchasing_doc_no}" AND status = "${ACKNOWLEDGED}" AND isLocked = 1)`;
        const response = await query({ query: q, values: [] });

        if (response.affectedRows) {
            resSend(res, true, 200, "Ulocked successfully", null, null);
        } else {
            resSend(res, false, 400, "No data inserted", response, null);
        }

    } catch (error) {
        console.log("sdbg unlock api");
    }
}


async function poContactDetails(purchasing_doc_no) {
    const po_contact_details_query = `SELECT 
        t1.EBELN, 
        t1.ERNAM AS dealingOfficerId, 
        t1.LIFNR AS vendor_code, 
        t2.CNAME AS dealingOfficerName, 
        t3.USRID_LONG AS dealingOfficerMail, 
        t4.NAME1 as vendor_name, 
        t4.ORT01 as vendor_address, 
        t5.SMTP_ADDR as vendor_mail_id
    FROM 
        ekko AS t1 
    LEFT JOIN 
        pa0002 AS t2 
    ON 
        t1.ERNAM= t2.PERNR 
    LEFT JOIN 
        pa0105 AS t3 
    ON 
        (t2.PERNR = t3.PERNR AND t3.SUBTY = '0030') 
    LEFT JOIN 
        lfa1 AS t4 
    ON 
        t1.LIFNR = t4.LIFNR 
    LEFT JOIN 
        adr6 AS t5
       ON
      t1.LIFNR = t5.PERSNUMBER
    WHERE 
        t1.EBELN = ?`;

    const result = await query({ query: po_contact_details_query, values: [purchasing_doc_no] });

    return result;
}



async function handelEmail(payload) {
    if (payload.status === PENDING) {
        const result = await poContactDetails(payload.purchasing_doc_no);
        payload.delingOfficerName = result[0]?.dealingOfficerName;
        payload.mailSendTo = result[0]?.dealingOfficerMail;
        payload.vendor_name = result[0]?.vendor_name;
        payload.vendor_code = result[0]?.vendor_code;
        payload.sendAt = new Date(payload.created_at);
        await mailInsert(payload, SDBG_SUBMIT_BY_VENDOR, "New SDBG submitted");
    }
}

const dashboard = async (req, res) => {

    try {
        const filterBy = { ...req.body };

        const values = [];
        let filterQuery =
            `SELECT created_at,
                purchasing_doc_no,
                status,
                file_name,
                file_path,
                created_by_id,
                created_by_name
            FROM   sdbg AS sdbg `;

        // USE FOR OTHER THAN DATE QUERIES

        const getGrseUserEmpNameQ = `
                LEFT JOIN 
                    pa0002 
                AS 
                    p1
                ON
                    p1.PERNR = log.user_id`;



        // USE FOR DATE QUERIES
        let { startDate, endDate, page, limit } = filterBy;

        if (filterBy.status == "ALL") {
            delete filterBy.status;
        }

        // deleting from filter object
        delete filterBy.startDate;
        delete filterBy.endDate;
        delete filterBy.page;
        delete filterBy.limit;

        let condQuery = " WHERE 1 = 1"

        if (Object.keys(filterBy).length > 0) {
            const conditions = Object.keys(filterBy).map((key, index) => {
                if (filterBy[key]) {
                    values.push(filterBy[key]);
                    return ` AND sdbg.${key} = ?`;
                }
            });

            condQuery += conditions.join(" ");
        }


        if (startDate && !endDate) {
            condQuery = condQuery.concat(` AND sdbg.created_at >= ?`)
            values.push(parseInt(startDate));
        }
        if (!startDate && endDate) {
            condQuery = condQuery.concat(` AND sdbg.created_at <= ?`)
            values.push(parseInt(endDate));
        }
        if (startDate && endDate) {
            condQuery = condQuery.concat(` AND ( sdbg.created_at BETWEEN ? AND ? )`)
            values.push(parseInt(startDate), parseInt(endDate));
        }

        filterQuery = filterQuery.concat(condQuery);

        // filterQuery = filterQuery.concat(` ORDER BY log.id DESC`);
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 10;
        const offSet = (page - 1) * limit;

        const pageinatonQ = ` LIMIT ${offSet}, ${limit}`;
        const orderByQ = ` ORDER BY sdbg.created_at DESC`;

        filterQuery = filterQuery.concat(orderByQ);
        filterQuery = filterQuery.concat(pageinatonQ);

        console.log("filterQuery", filterQuery);
        console.log("values", values);

        const result = await query({ query: filterQuery, values: values });
        // const result = await log(req, res, filterQuery, values);
        const logCount = await sdbgCount(req, res, condQuery, values);
        // const report = await poReport(req, res, condQuery, values, groupBy);
        // const response = await Promise.all(
        //     log(req, res, filterQuery, values),
        //     poReportCount(req, res, condQuery, values),
        //     poReport(req, res, condQuery, values)
        // )
        



        resSend(res, true, 200, "data fetch scussfully.", {result, count: logCount}, null);


    } catch (error) {
        return resSend(res, false, 500, error, [], null);
    }
}

async function sdbgCount(req, res, condQuery, values) {
    try {
        let filterQuery = 
        `SELECT
            COUNT(*) AS count
        FROM sdbg AS sdbg`;

        filterQuery = filterQuery.concat(condQuery);
        const result = await query({ query: filterQuery, values: values });
        if (result?.length) {
            return result[0]["count"]
        }

        return 0;

    } catch (error) {
        console.log("po report count error", error)
    }

}




module.exports = { submitSDBG, list, unlock, assigneeList, dashboard }