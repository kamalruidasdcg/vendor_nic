const path = require("path");
const { sdbgPayload, setActualSubmissionDate, create_reference_no, get_latest_activity } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const {INSERT,USER_TYPE_VENDOR,} = require("../../lib/constant");

const { EKKO, NEW_SDBG, SDBG_ENTRY, SDBG, ILMS, DRAWING } = require("../../lib/tableName");
const {SUBMITTED,ACCEPTED,APPROVED,REJECTED,ACKNOWLEDGED,} = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const { getFilteredData } = require("../genralControlles");
const SENDMAIL = require("../../lib/mailSend");
const { SDBG_SUBMIT_MAIL_TEMPLATE } = require("../../templates/mail-template");
const { mailInsert } = require("../../services/mai.services");
const { mailTrigger } = require("../sendMailController");


// add new post
const submitILMS = async (req, res) => {
    // return resSend(res, false, 200, "No data 22inserted", req.body, null);
    try {
        // Handle Image Upload
        let fileData = {};
        if (req.file) {
            fileData = {
                file_name: req.file.filename,
                file_path: req.file.path,
                // fileType: req.file.mimetype,
                //fileSize: req.file.size,
            };
        }
        const tokenData = { ...req.tokenData };

        let payload = { ...req.body, ...fileData, created_at: getEpochTime() };

        if (!payload.purchasing_doc_no || !payload.type) {
            return resSend(res, false, 200, "Please send valid payload", null, null);
        }

        // 2 for drawind depertment//
        if (tokenData.department_id == 2) {
            if (!payload.reference_no || payload.reference_no == "") {
                return resSend(res, false, 200, "Please send valid reference_no", null, null);
            }

            const GET_LATEST_ILMS = await get_latest_activity(ILMS, payload.purchasing_doc_no, payload.reference_no);

            if (GET_LATEST_ILMS.status === APPROVED || GET_LATEST_ILMS.status === ACCEPTED || GET_LATEST_ILMS.status === ACKNOWLEDGED) {
                return resSend(res, false, 200, `this ILMS already ${GET_LATEST_ILMS.status}`, null, null);
            }
// console.log(GET_LATEST_ILMS);
// return;
            payload.file_name = GET_LATEST_ILMS.file_name;
            payload.file_path = GET_LATEST_ILMS.file_path;
            payload.vendor_code = GET_LATEST_ILMS.vendor_code;
        }



        if (tokenData.user_type == USER_TYPE_VENDOR) {
            payload.reference_no = await create_reference_no("ILMS", tokenData.vendor_code);
        }

        // if (tokenData.user_type != USER_TYPE_VENDOR) {
        //     return resSend(res,false,200,"Please please login as vendor for ILMS subminission.",null,null);
        // }
        payload.vendor_code = (tokenData.user_type === USER_TYPE_VENDOR) ? tokenData.vendor_code : payload.vendor_code;
        payload.updated_by = (tokenData.user_type === USER_TYPE_VENDOR) ? "VENDOR" : "GRSE";
        payload.created_by_id = tokenData.vendor_code;
        // console.log("payload..");
        // console.log(payload);
        // return;
        // const verifyStatus = [PENDING, RE_SUBMITTED];




        const { q, val } = generateQuery(INSERT, ILMS, payload);
        console.log(q);

        if (payload.status === APPROVED || payload.status === ACCEPTED || payload.status === ACKNOWLEDGED) {
            const actual_subminission = await setActualSubmissionDate(payload, "04", tokenData, SUBMITTED);
            console.log("actual_subminission", actual_subminission);
        }
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

            // await handelEmail(payload);

            return resSend(res, true, 200, `ILMS ${payload.status}!`, fileData, null);
        } else {
            return resSend(res, false, 200, "No data inserted", response, null);
        }
    } catch (error) {
        console.log("ILMS Submission api", error);

        return resSend(res, false, 500, "internal server error", [], null);
    }
};

const list = async (req, res) => {
    try {
        const tokenData = { ...req.tokenData };

        if (!req.query.poNo) {
            return resSend(res, true, 200, "Please send PO Number.", null, null);
        }

        const Q = `SELECT * FROM ${ILMS} WHERE purchasing_doc_no = ?`;
        const result = await query({
            query: Q,
            values: [req.query.poNo],
        });

        return resSend(res, true, 200, "data fetch successfully.", result, null);
    } catch (error) {
        return resSend(res, false, 400, "Data not fetch!!", error, null);
    }
};


module.exports = {
    submitILMS,
    list
};
