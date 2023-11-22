
const path = require('path');
const { sdbgPayload, drawingPayload, poModifyData, qapPayload } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT } = require("../../lib/constant");
const { ADD_DRAWING } = require("../../lib/tableName");
const { SUBMITTED, ACKNOWLEDGED, RE_SUBMITTED, APPROVED } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");



// add new post
const submitDrawing = async (req, res) => {

    try {


        // Handle Image Upload
        let fileData = {};
        // if (req.file) {
        //     fileData = {
        //         fileName: req.file.filename,
        //         filePath: req.file.path,
        //         fileType: req.file.mimetype,
        //         fileSize: req.file.size,
        //     };
        fileData = {
            fileName: "abccc",
            filePath: "ddidid",
            fileType: "jpeg",
            fileSize: 1313,
        };

        const payload = { ...req.body, ...fileData };

        const verifyStatus = [SUBMITTED, RE_SUBMITTED, ACKNOWLEDGED, APPROVED]

        console.log("payloadpayloadpayload", payload)

        if (!payload.purchasing_doc_no || !payload.updated_by || !payload.action_by_name || !payload.action_by_id || !verifyStatus.includes(payload.status)) {

            // const directory = path.join(__dirname, '..', 'uploads', 'drawing');
            // const isDel = handleFileDeletion(directory, req.file.filename);
            return resSend(res, false, 400, "Please send valid payload", null, null);

        }


        const result2 = await getDrawingData(payload.purchasing_doc_no, ACKNOWLEDGED);

        if (result2 && result2?.length) {
            return resSend(res, true, 200, `This drawing aleready acknowledge [ PO - ${payload.purchasing_doc_no} ]`, null, null);
        }

        let insertObj;

        if (payload.status === SUBMITTED) {
            insertObj = drawingPayload(payload, SUBMITTED);
        } else if (payload.status === RE_SUBMITTED) {
            insertObj = drawingPayload(payload, RE_SUBMITTED);
        } else if (payload.status === ACKNOWLEDGED) {
            insertObj = drawingPayload(payload, ACKNOWLEDGED);
        }

        console.log("insertObj", insertObj)

        const { q, val } = generateQuery(INSERT, ADD_DRAWING, insertObj);
        const response = await query({ query: q, values: val });

        if (response.affectedRows) {
            resSend(res, true, 200, "file uploaded!", fileData, null);
        } else {
            resSend(res, false, 400, "No data inserted", response, null);
        }


        // } else {
        //     resSend(res, false, 400, "Please upload a valid File", fileData, null);
        // }

    } catch (error) {
        console.log("po add api", error)

        return resSend(res, false, 500, "internal server error", [], null);
    }
}


const getDrawingData = async (purchasing_doc_no, drawingStatus) => {
    const isSDBGAcknowledge = `SELECT purchasing_doc_no FROM ${ADD_DRAWING} WHERE purchasing_doc_no = ? AND status = ?`;
    const acknowledgeResult = await query({ query: isSDBGAcknowledge, values: [purchasing_doc_no, drawingStatus] });
    return acknowledgeResult;
}


module.exports = { submitDrawing }