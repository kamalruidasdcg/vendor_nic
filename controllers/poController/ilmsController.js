const path = require("path");
const { sdbgPayload } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const {
    INSERT,
    UPDATE,
    USER_TYPE_VENDOR,
    USER_TYPE_GRSE_QAP,
    ASSIGNER,
    STAFF,
    USER_TYPE_GRSE_FINANCE,
} = require("../../lib/constant");

const { EKKO, NEW_SDBG, SDBG_ENTRY, SDBG, ILMS } = require("../../lib/tableName");
const { FINANCE } = require("../../lib/depertmentMaster");
const {
    PENDING,
    ACCEPTED,
    ASSIGNED,
    RE_SUBMITTED,
    REJECTED,
    FORWARD_TO_FINANCE,
    RETURN_TO_DEALING_OFFICER,
} = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const { getFilteredData } = require("../genralControlles");
const SENDMAIL = require("../../lib/mailSend");
const { SDBG_SUBMIT_MAIL_TEMPLATE } = require("../../templates/mail-template");
const { mailInsert } = require("../../services/mai.services");
const { mailTrigger } = require("../sendMailController");
const {
    SDBG_SUBMIT_BY_VENDOR,
    SDBG_SUBMIT_BY_GRSE,
} = require("../../lib/event");
const { Console } = require("console");

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
            const tokenData = { ...req.tokenData };
            //console.log(tokenData);
            let payload = { ...req.body, ...fileData, created_at: getEpochTime() };
            // if (tokenData.user_type != USER_TYPE_VENDOR) {
            //     return resSend(
            //         res,
            //         false,
            //         200,
            //         "Please please login as vendor for ILMS subminission.",
            //         null,
            //         null
            //     );
            // }
            payload.vendor_code = tokenData.vendor_code;
            payload.updated_by = "VENDOR";

            payload.created_by_id = tokenData.vendor_code;
            // console.log("payload..");
            // console.log(payload);
            // return;
           // const verifyStatus = [PENDING, RE_SUBMITTED];

            if (!payload.purchasing_doc_no || !payload.type) {
                // const directory = path.join(__dirname, '..', 'uploads', 'drawing');
                // const isDel = handleFileDeletion(directory, req.file.filename);
                return resSend(
                    res,
                    false,
                    400,
                    "Please send valid payload",
                    null,
                    null
                );
            }

            // const GET_LATEST_SDBG = `SELECT COUNT(purchasing_doc_no) AS count_po FROM ${SDBG} WHERE purchasing_doc_no = ? AND status = ?`;
            // const result2 = await getSDBGData(
            //     GET_LATEST_SDBG,
            //     payload.purchasing_doc_no,
            //     ACCEPTED
            // );
            // console.log("result2..");
            // console.log(result2);
            // return;
            //if (result2[0].count_po > 0) {
                // const data = [{
                //     purchasing_doc_no: result2[0]?.purchasing_doc_no,
                //     status: result2[0]?.status,
                //     acknowledgedByName: result2[0]?.created_by_name,
                //     acknowledgedById: result2[0]?.created_by_id,
                //     message: "The SDBG is already acknowledge. If you want to reopen, please contact with senior management."
                // }];

            //     return resSend(
            //         res,
            //         true,
            //         200,
            //         `The SDBG is already acknowledge. If you want to reopen, please contact with dealing officer.`,
            //         null,
            //         null
            //     );
            // }

            // let insertObj;

            // if (payload.status === PENDING) {
            //     payload = { ...payload, isLocked: 0 };
            //     insertObj = sdbgPayload(payload, PENDING);
            // } else if (payload.status === RE_SUBMITTED) {

            //     // const GET_LATEST_SDBG = `SELECT bank_name, transaction_id, vendor_code FROM ${NEW_SDBG} WHERE purchasing_doc_no = ? AND status = ?`;

            //     // const result = await query({ query: GET_LATEST_SDBG, values: [payload.purchasing_doc_no, PENDING] });
            //     // console.log("iiii", result)

            //     // if (!result || !result.length) {
            //     //     return resSend(res, true, 200, "No SDBG found to resubmit", null, null);
            //     // }

            //     // payload = {
            //     //     ...payload,
            //     //     bank_name: result[0].bank_name,
            //     //     transaction_id: result[0].transaction_id,
            //     //     vendor_code: result[0].vendor_code,
            //     // }

            //     // insertObj = sdbgPayload(payload, RE_SUBMITTED);

            // } else if (payload.status === ACKNOWLEDGED && payload.updated_by == "GRSE") {

            //     const GET_LATEST_SDBG = `SELECT bank_name, transaction_id, vendor_code FROM ${NEW_SDBG} WHERE purchasing_doc_no = ? AND status = ?`;

            //     const result = await query({ query: GET_LATEST_SDBG, values: [payload.purchasing_doc_no, PENDING] });

            //     if (!result || !result.length) {
            //         return resSend(res, true, 200, "No SDBG found to acknowledge", null, null);
            //     }
            //     payload = { ...payload, isLocked: 1 };
            //     insertObj = sdbgPayload(payload, ACKNOWLEDGED);
            // }

            const { q, val } = generateQuery(INSERT, ILMS, payload);
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

                return resSend(res, true, 200, "file uploaded!", fileData, null);
            } else {
                return resSend(res, false, 400, "No data inserted", response, null);
            }
        } else {
            return resSend(
                res,
                false,
                400,
                "Please upload a valid File",
                fileData,
                null
            );
        }
    } catch (error) {
        console.log("SDGB Submission api", error);

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
