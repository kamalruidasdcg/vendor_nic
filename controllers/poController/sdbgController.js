const path = require('path');
const { sdbgPayload } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT } = require("../../lib/constant");
const { NEW_SDBG } = require("../../lib/tableName");
const { PENDING, ACKNOWLEDGED, RE_SUBMITTED } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const { getFilteredData } = require("../../controllers/genralControlles");
const SENDMAIL = require("../../lib/mailSend");
const { SDBG_SUBMIT_MAIL_TEMPLATE } = require("../../templates/mail-template");


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

            let payload = { ...req.body, ...fileData };

            const verifyStatus = [PENDING, RE_SUBMITTED, ACKNOWLEDGED]

            if (!payload.purchasing_doc_no || !payload.updated_by || !payload.action_by_name || !payload.action_by_id || !verifyStatus.includes(payload.status)) {

                // const directory = path.join(__dirname, '..', 'uploads', 'drawing');
                // const isDel = handleFileDeletion(directory, req.file.filename);
                return resSend(res, false, 400, "Please send valid payload", null, null);

            }

            const GET_LATEST_SDBG = `SELECT purchasing_doc_no FROM ${NEW_SDBG} WHERE purchasing_doc_no = ? AND status = ?`;
            const result2 = await getSDBGData(GET_LATEST_SDBG, payload.purchasing_doc_no, ACKNOWLEDGED);

            if (result2 && result2?.length) {
                return resSend(res, true, 200, `This sdbg aleready ${ACKNOWLEDGED} [ PO - ${payload.purchasing_doc_no} ]`, null, null);
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

                // payload = {
                //     ...payload,
                //     bank_name: result[0].bank_name,
                //     transaction_id: result[0].transaction_id,
                //     vendor_code: result[0].vendor_code,
                // }

                insertObj = sdbgPayload(payload, ACKNOWLEDGED);
            }

            const { q, val } = generateQuery(INSERT, NEW_SDBG, insertObj);
            const response = await query({ query: q, values: val });

            if (response.affectedRows) {

                // 

                // mail setup
                let mailDetails = {};

                if (payload.status === PENDING && payload.mailSendTo) {

                    console.log("PENDING", payload.mailSendTo);

                    if (payload.updated_by == "VENDOR") {
                        mailDetails = {
                            // from: "kamal.sspur@gmail.com",
                            to: payload.mailSendTo,
                            // to: "mainak.dutta16@gmail.com",
                            subject: "Vendor SDBG submited",
                            html: SDBG_SUBMIT_MAIL_TEMPLATE(`Vendor [ ${payload.vendor_code} ] submittes the SDBG`, "Vendor SDBG submitted"),
                        };
                    } else {
                        mailDetails = {
                            // from: "kamal.sspur@gmail.com",
                            to: payload.mailSendTo,
                            // to: "mainak.dutta16@gmail.com",
                            subject: "GRSE Team",
                            html: SDBG_SUBMIT_MAIL_TEMPLATE(`SDBG update, PO [ ${payload.purchasing_doc_no} ]`, "GRSR updated"),
                        };
                    }

                }
                if (payload.status === ACKNOWLEDGED && payload.mailSendTo) {
                    mailDetails = {
                        // from: "kamal.sspur@gmail.com",
                        to: payload.mailSendTo,
                        // to: "mainak.dutta16@gmail.com",
                        subject: "GRSE Team",
                        html: SDBG_SUBMIT_MAIL_TEMPLATE(`SDBG of [ ${payload.purchasing_doc_no} ] ACKNOWLEDGED`, "GRSR updated"),
                    };


                }

                console.log("mailDetails", mailDetails);

                SENDMAIL(mailDetails, function (err, data) {
                    if (!err) {
                        console.log("Error Occurs", err);
                    } else {
                        // console.log("Email sent successfully", data);
                        console.log("Email sent successfully");
                    }
                });


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

module.exports = { submitSDBG, list }