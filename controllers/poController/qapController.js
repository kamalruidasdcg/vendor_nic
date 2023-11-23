const path = require('path');
const { qapPayload } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery } = require("../../lib/utils");
const { INSERT } = require("../../lib/constant");
const { QAP_SUBMISSION } = require("../../lib/tableName");
const { SUBMITTED, APPROVED, RE_SUBMITTED } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");



// add new post
const submitQAP = async (req, res) => {

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

            const verifyStatus = [SUBMITTED, RE_SUBMITTED, APPROVED]

            if (!payload.purchasing_doc_no || !payload.updated_by || !payload.action_by_name || !payload.action_by_id || !verifyStatus.includes(payload.status)) {

                // const directory = path.join(__dirname, '..', 'uploads', 'drawing');
                // const isDel = handleFileDeletion(directory, req.file.filename);
                return resSend(res, false, 400, "Please send valid payload", null, null);

            }

            const GET_LATEST_QAP = `SELECT purchasing_doc_no FROM ${QAP_SUBMISSION} WHERE purchasing_doc_no = ? AND status = ?`;
            const result2 = await getQAPData(GET_LATEST_QAP, payload.purchasing_doc_no, APPROVED);

            if (result2 && result2?.length) {
                return resSend(res, true, 200, `This sdbg aleready ${APPROVED} [ PO - ${payload.purchasing_doc_no} ]`, null, null);
            }

            let insertObj;

            if (payload.status === SUBMITTED) {
                insertObj = qapPayload(payload, SUBMITTED);
            } else if (payload.status === RE_SUBMITTED) {

                const GET_LATEST_SDBG = `SELECT purchasing_doc_no FROM ${QAP_SUBMISSION} WHERE purchasing_doc_no = ? AND status = ?`;

                
                const result = await query({ query: GET_LATEST_SDBG, values: [payload.purchasing_doc_no, SUBMITTED] });
                console.log("iiii", result)

                if (!result || !result.length) {
                    return resSend(res, true, 200, "No SDBG found to resubmit", null, null);
                }

                insertObj = qapPayload(payload, RE_SUBMITTED);

            } else if (payload.status === APPROVED) {

                insertObj = qapPayload(payload, APPROVED);
            }

            const { q, val } = generateQuery(INSERT, QAP_SUBMISSION, insertObj);
            const response = await query({ query: q, values: val });

            if (response.affectedRows) {
                resSend(res, true, 200, "file uploaded!", fileData, null);
            } else {
                resSend(res, false, 400, "No data inserted", response, null);
            }


        } else {
            resSend(res, false, 400, "Please upload a valid File", fileData, null);
        }

    } catch (error) {
        console.log("QAP Submissio api", error);

        return resSend(res, false, 500, "internal server error", [], null);
    }
}


const getQAPData = async (getQuery, purchasing_doc_no, drawingStatus) => {
    // const Q = `SELECT purchasing_doc_no FROM ${QAP_SUBMISSION} WHERE purchasing_doc_no = ? AND status = ?`;
    const result = await query({ query: getQuery, values: [purchasing_doc_no, drawingStatus] });
    return result;
}



module.exports = { submitQAP }