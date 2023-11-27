
const path = require('path');
const { sdbgPayload, drawingPayload, poModifyData, qapPayload } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT } = require("../../lib/constant");
const { ADD_DRAWING } = require("../../lib/tableName");
const { PENDING, ACKNOWLEDGED, RE_SUBMITTED, APPROVED } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const { getFilteredData } = require("../../controllers/genralControlles");
const { DRAWING_SUBMIT_MAIL_TEMPLATE } = require('../../templates/mail-template');
const SENDMAIL = require('../../lib/mailSend');


// add new post
const submitDrawing = async (req, res) => {

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
            // fileData = {
            //     fileName: "abccc",
            //     filePath: "ddidid",
            //     fileType: "jpeg",
            //     fileSize: 1313,
            // };

            const payload = { ...req.body, ...fileData };

            const verifyStatus = [PENDING, RE_SUBMITTED, APPROVED]

            if (!payload.purchasing_doc_no || !payload.updated_by || !payload.action_by_name || !payload.action_by_id || !verifyStatus.includes(payload.status)) {

                // const directory = path.join(__dirname, '..', 'uploads', 'drawing');
                // const isDel = handleFileDeletion(directory, req.file.filename);
                return resSend(res, false, 400, "Please send valid payload", null, null);

            }


            const result2 = await getDrawingData(payload.purchasing_doc_no, APPROVED);

            if (result2 && result2?.length) {
                return resSend(res, true, 200, `This drawing aleready ${APPROVED} [ PO - ${payload.purchasing_doc_no} ]`, null, null);
            }

            let insertObj;

            if (payload.status === PENDING) {
                insertObj = drawingPayload(payload, PENDING);
            } else if (payload.status === RE_SUBMITTED) {
                // insertObj = drawingPayload(payload, RE_SUBMITTED);
            } else if (payload.status === APPROVED) {
                insertObj = drawingPayload(payload, APPROVED);
            }

            const { q, val } = generateQuery(INSERT, ADD_DRAWING, insertObj);
            const response = await query({ query: q, values: val });

            if (response.affectedRows) {


                let mailDetails = {};
                if (payload.status === PENDING && payload.mailSendTo) {


                    if (payload.updated_by == "VENDOR") {
                        mailDetails = {
                            // from: "kamal.sspur@gmail.com",
                            to: payload.mailSendTo,
                            // to: "mainak.dutta16@gmail.com",
                            subject: "Vendor drawing submited",
                            html: DRAWING_SUBMIT_MAIL_TEMPLATE(`Vendor [ ${payload.vendor_code} ] submittes the drawing`, "Vendor drawing submitted"),
                        };
                    } else {
                        mailDetails = {
                            // from: "kamal.sspur@gmail.com",
                            to: payload.mailSendTo,
                            // to: "mainak.dutta16@gmail.com",
                            subject: "GRSE Team",
                            html: DRAWING_SUBMIT_MAIL_TEMPLATE(`Drawing status update, PO [ ${payload.purchasing_doc_no} ]`, "GRSR updated"),
                        };
                    }
                    SENDMAIL(mailDetails, function (err, data) {
                        if (!err) {
                            console.log("Error Occurs", err);
                        } else {
                            // console.log("Email sent successfully", data);
                            console.log("Email sent successfully");
                        }
                    });

                }
                if (payload.status === APPROVED && payload.mailSendTo) {
                    mailDetails = {
                        // from: "kamal.sspur@gmail.com",
                        to: payload.mailSendTo,
                        // to: "mainak.dutta16@gmail.com",
                        subject: "GRSE Team",
                        html: DRAWING_SUBMIT_MAIL_TEMPLATE(`Drawing of [ ${payload.purchasing_doc_no} ] APPROVED`, "GRSR updated"),
                    };
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
        console.log("Drawing submission api", error);

        return resSend(res, false, 500, "internal server error", [], null);
    }
}


const getDrawingData = async (purchasing_doc_no, drawingStatus) => {
    const isSDBGAcknowledge = `SELECT purchasing_doc_no FROM ${ADD_DRAWING} WHERE purchasing_doc_no = ? AND status = ?`;
    const acknowledgeResult = await query({ query: isSDBGAcknowledge, values: [purchasing_doc_no, drawingStatus] });
    return acknowledgeResult;
}



const list = async (req, res) => {
    
    req.query.$tableName = ADD_DRAWING;

    req.query.$filter = `{ "purchasing_doc_no" :  ${req.query.poNo}}`;
    try {

        if(!req.query.poNo) {
            return resSend(res, false, 400, "Please send po number", null, null);
        }

        getFilteredData(req, res);
    } catch(err) {
      console.log("data not fetched", err);
      resSend(res, false, 500, "Internal server error", null, null);
    }
   
}



module.exports = { submitDrawing, list }