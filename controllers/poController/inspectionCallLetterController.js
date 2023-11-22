const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT } = require("../../lib/constant");
const { INSPECTIONCALLLETTER } = require("../../lib/tableName");
const { SUBMITTED, REJECTED, ACKNOWLEDGED, APPROVED, RE_SUBMITTED, CREATED } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const path = require('path');
const { drawingPayload } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");


exports.inspectionCallLetter = async (req, res) => {

   // resSend(res, true, 200, "file upleeoaded!", req.body, null);
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

            const payload = { ...req.body, ...fileData };


            if(!payload.purchasing_doc_no || !payload.updated_by || !payload.action_by_name || !payload.action_by_id) {
                const lastParam = req.path.split("/").pop();

                const directory = path.join(__dirname, '..', 'uploads', lastParam);
                const isDel = handleFileDeletion(directory, req.file.filename);
                return resSend(res, false, 400, "Please send valid payload", res, null);

            }

            const insertObj = drawingPayload(payload, SUBMITTED);
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

//module.exports = { inspectionCallLetter };
