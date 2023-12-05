const path = require('path');
const { sdbgPayload } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT, UPDATE } = require("../../lib/constant");
const { NEW_SDBG } = require("../../lib/tableName");
const { PENDING, ACKNOWLEDGED, RE_SUBMITTED } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const { getFilteredData } = require("../../controllers/genralControlles");
const SENDMAIL = require("../../lib/mailSend");
const { SDBG_SUBMIT_MAIL_TEMPLATE } = require("../../templates/mail-template");
const { mailInsert } = require('../../services/mai.services');


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

            let payload = { ...req.body, ...fileData, created_at: getEpochTime() };

            const verifyStatus = [PENDING, RE_SUBMITTED, ACKNOWLEDGED]

            if (!payload.purchasing_doc_no || !payload.updated_by || !payload.action_by_name || !payload.action_by_id || !verifyStatus.includes(payload.status)) {

                // const directory = path.join(__dirname, '..', 'uploads', 'drawing');
                // const isDel = handleFileDeletion(directory, req.file.filename);
                return resSend(res, false, 400, "Please send valid payload", null, null);

            }

            const GET_LATEST_SDBG = `SELECT purchasing_doc_no, status, updated_by, created_by_id, created_by_name FROM ${NEW_SDBG} WHERE purchasing_doc_no = ? AND status = ?`;
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

                insertObj = sdbgPayload(payload, ACKNOWLEDGED);
            }

            const { q, val } = generateQuery(INSERT, NEW_SDBG, insertObj);
            const response = await query({ query: q, values: val });

            if (response.affectedRows) {
                // mail setup
                let mailDetails = {};

                if (payload.status === PENDING && payload.mailSendTo) {

                    const mailBodyForGRSE = `
                    Dear XXXXXX (GRSE User name/Employee ID), <br>
                    Below are the details pertinent to submission of SDGBG for the PO - ${payload.purchasing_doc_no}.
                    <br>
                    <br>
                    Vendor : ${payload.vendor_name ? payload.vendor_name : ""} [${payload.vendor_code}]<br>
                    Remarks: ${payload.remarks}<br>
                    Date : ${new Date(payload.created_at)} <br>
                    `;

                    const mailBodyForVendor = `
                    Dear XXXXXXXX (Vendor code/ Vendor name), <br>
                    Below are the details pertinent to submission of SDGBG for the PO - ${payload.purchasing_doc_no}.
                    <br>
                    <br>
                    Vendor : ${payload.vendor_name ? payload.vendor_name : ""} [${payload.vendor_code}]<br>
                    Remarks: ${payload.remarks}<br>
                    Date : ${new Date(payload.created_at)} <br>
                    `;


                    console.log("mailBodyGRSE", mailBodyForGRSE);

                    if (payload.updated_by == "VENDOR") {
                        mailDetails = {
                            // from: "kamal.sspur@gmail.com",
                            to: payload.mailSendTo,
                            // to: "mainak.dutta16@gmail.com",
                            subject: "Submission of SDBG",
                            html: SDBG_SUBMIT_MAIL_TEMPLATE(mailBodyForGRSE, "Vendor SDBG submitted"),
                        };
                    } else {
                        mailDetails = {
                            // from: "kamal.sspur@gmail.com",
                            to: payload.mailSendTo,
                            // to: "mainak.dutta16@gmail.com",
                            subject: "Submission of SDBG",
                            html: SDBG_SUBMIT_MAIL_TEMPLATE(mailBodyForVendor, "GRSR updated"),
                        };
                    }

                    const mailIns = await mailInsert({ ...mailDetails, action_by_id: payload.action_by_id, action_by_name: payload.action_by_name });

                    SENDMAIL(mailDetails, function (err, data) {
                        if (!err) {
                            console.log("Error Occurs", err);
                        } else {
                            // console.log("Email sent successfully", data);
                            console.log("Email sent successfully");
                        }
                    });

                }
                if (payload.status === ACKNOWLEDGED && payload.mailSendTo) {

                    const mailBodyForVendor = `
                    Dear XXXXXXXX (Vendor code/ Vendor name), <br>
                    Below are the details pertinent to acknowledge of SDGBG for the PO - ${payload.purchasing_doc_no}.
                    <br>
                    <br>
                    Vendor : ${payload.vendor_name} [ ${payload.vendor_code} ]<br>
                    Remarks: ${payload.remarks}<br>
                    Date : ${new Date(payload.created_at)} <br>
                    `;

                    mailDetails = {
                        // from: "kamal.sspur@gmail.com",
                        to: payload.mailSendTo,
                        // to: "mainak.dutta16@gmail.com",
                        subject: "SDBG ACKNOWLEDGED",
                        html: SDBG_SUBMIT_MAIL_TEMPLATE(mailBodyForVendor, "GRSR Acknowledge"),
                    };
                    const mailIns = await mailInsert({ ...mailDetails, action_by_id: payload.action_by_id, action_by_name: payload.action_by_name });
                    SENDMAIL(mailDetails, function (err, data) {
                        if (!err) {
                            console.log("Error Occurs", err);
                        } else {
                            // console.log("Email sent successfully", data);
                            console.log("Email sent successfully");
                        }
                    });

                }


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


const unlock = async (req, res) => {

    try {

        let payload = { ...req.body };
        console.log("TYUIoiuytyuiuytyuiuyuiuyuiuyuy")

        if (!payload.purchasing_doc_no || !payload.action_by_name || !payload.action_by_id) {

            // const directory = path.join(__dirname, '..', 'uploads', 'drawing');
            // const isDel = handleFileDeletion(directory, req.file.filename);
            return resSend(res, false, 400, "Please send valid payload", null, null);

        }


        const insertObj = {
            purchasing_doc_no: payload.purchasing_doc_no,
            action_by_name: payload.action_by_name,
            action_by_id: payload.action_by_id,
            updated_at: getEpochTime(),
            isLocked: "NO"
        }

        const q = `UPDATE ${NEW_SDBG} SET isLocked = "NO", 
                updated_by_name = "${payload.action_by_name}",
                updated_by_id = "${payload.action_by_id}",
                updated_at = ${getEpochTime()},
                isLocked =  "Y" WHERE  (purchasing_doc_no = "${payload.purchasing_doc_no}" AND status = "${ACKNOWLEDGED}")`;

        console.log("qqqq" + q);
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



module.exports = { submitSDBG, list, unlock }