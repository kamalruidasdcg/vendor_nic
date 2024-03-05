const path = require("path");
const { sdbgPayload, setActualSubmissionDate } = require("../../services/po.services");
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
    ACKNOWLEDGED,
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
        }
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
            payload.vendor_code = (tokenData.user_type === USER_TYPE_VENDOR) ? tokenData.vendor_code : null;
            payload.updated_by = (tokenData.user_type === USER_TYPE_VENDOR) ? "VENDOR" : "GRSE";
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


            const { q, val } = generateQuery(INSERT, ILMS, payload);
            console.log(q);

            if (payload.status === APPROVED || payload.status === ACCEPTED || payload.status === ACKNOWLEDGED) {
                const actual_subminission = await setActualSubmissionDate(payload, 4, tokenData, PENDING);
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

                return resSend(res, true, 200, "file uploaded!", fileData, null);
            } else {
                return resSend(res, false, 400, "No data inserted", response, null);
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
