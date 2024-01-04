const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT } = require("../../lib/constant");
const { INSPECTIONCALLLETTER } = require("../../lib/tableName");
const { PENDING, REJECTED, ACKNOWLEDGED, APPROVED, RE_SUBMITTED, CREATED } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const path = require('path');
const { drawingPayload } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { getFilteredData, updatTableData, insertTableData } = require("../../controllers/genralControlles");


exports.inspectionCallLetter = async (req, res) => {

   // resSend(res, true, 200, "file upleeoaded!", req.body, null);
    try {

        const lastParam = req.path.split("/").pop();
        // Handle Image Upload
        let fileData = {};
        if (req.file) {
            fileData = {
                fileName: req.file.filename,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
            };

            const payload = { ...req.body, ...fileData };

            const verifyStatus = [PENDING, RE_SUBMITTED, APPROVED];

            if(!payload.purchasing_doc_no || !payload.updated_by || !payload.action_by_name || !payload.action_by_id) {

                // const directory = path.join(__dirname, '..', 'uploads', lastParam);
                // const isDel = handleFileDeletion(directory, req.file.filename);
                return resSend(res, false, 400, "Please send valid payload", null   , null);

            }

            const result2 = await getIclData(payload.purchasing_doc_no, APPROVED);

            if (result2 && result2?.length) {
                return resSend(res, true, 200, `This inspection call letter aleready ${APPROVED} [ PO - ${payload.purchasing_doc_no} ]`, null, null);
            }

             let insertObj;

            if (payload.status === PENDING) {
                insertObj = drawingPayload(payload, PENDING);
            } else if (payload.status === RE_SUBMITTED) {
                // insertObj = drawingPayload(payload, RE_SUBMITTED);
            } else if (payload.status === APPROVED) {
                insertObj = drawingPayload(payload, APPROVED);
            }
            // insertObj = drawingPayload(payload, PENDING);

            const { q, val } = generateQuery(INSERT, INSPECTIONCALLLETTER, insertObj);
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
        console.log("po add api", error)

        return resSend(res, false, 500, "internal server error", [], null);
    }
}

exports.List = async (req, res) => {
    
      req.query.$tableName = `inspection_call_letter`;
      req.query.$filter = `{ "purchasing_doc_no" :  ${req.query.poNo}}`;
      try {
        getFilteredData(req, res);
      } catch(err) {
        console.log("data not fetched", err);
      }
    // resSend(res, true, 200, "oded!", req.query.dd, null);
     
 }

 const getIclData = async (purchasing_doc_no, drawingStatus) => {
    const isIclcknowledge = `SELECT purchasing_doc_no FROM ${INSPECTIONCALLLETTER} WHERE purchasing_doc_no = ? AND status = ?`;
    const acknowledgeResult = await query({ query: isIclcknowledge, values: [purchasing_doc_no, drawingStatus] });
    return acknowledgeResult;
}
