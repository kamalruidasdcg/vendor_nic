const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT, USER_TYPE_GRSE_HR } = require("../../lib/constant");
const { HR } = require("../../lib/tableName");
const { SUBMITTED } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const path = require('path');
const { inspectionCallLetterPayload } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { getFilteredData, updatTableData, insertTableData } = require("../genralControlles");



const hrComplianceUpload = async (req, res) => {

  // return  resSend(res, true, 200, "file hrupleeoaded!", `req`, null);
    try {

        // const lastParam = req.path.split("/").pop();
        // Handle Image Upload
        let fileData = {};
        if (req.file) {
            fileData = {
                file_name: req.file.filename,
                file_path: req.file.path,
                // fileType: req.file.mimetype,
                // fileSize: req.file.size,
            };
        }
        const tokenData = { ...req.tokenData };

        const by = tokenData.user_type === 1 ? "VENDOR" : "GRSE";

        const payload = {
            ...req.body,
            created_at: getEpochTime(),
            created_by_id: tokenData.vendor_code,
            updated_by: "GRSE HR",
            ...fileData,
        };
        console.log("payload", payload);
        if (!payload.purchasing_doc_no || !payload.remarks || !payload.status) {

            // const directory = path.join(__dirname, '..', 'uploads', lastParam);
            // const isDel = handleFileDeletion(directory, req.file.filename);
            return resSend(res, false, 400, "Please send valid payload", null, null);

        }

        if(tokenData.department_id != USER_TYPE_GRSE_HR) {
            return resSend(res, false, 200, "Only HR can upload!", null, null);
        }

        let insertObj = payload; //inspectionCallLetterPayload(payload);

        //console.log("insertObj", insertObj);
        const { q, val } = generateQuery(INSERT, HR, insertObj);
        const response = await query({ query: q, values: val });

        if (response.affectedRows) {

            // await handleEmail();

            resSend(res, true, 200, "HR Compliance Uploaded successfully !", null, null);
        } else {
            resSend(res, false, 400, "No data inserted", response, null);
        }


        // }
        // else {
        //     resSend(res, false, 400, "Please upload a valid File", fileData, null);
        // }

    } catch (error) {
        console.log("po add api", error)

        return resSend(res, false, 500, "internal server error", [], null);
    }
}

const complianceUploadedList = async (req, res) => {

    try {


        if (!req.query.poNo) {
            return resSend(res, false, 400, "Please send poNo", null, "");
        }

        const get_query =
            `SELECT *
            FROM   ${HR} 
            WHERE  ( 1 = 1
                     AND purchasing_doc_no = ? ) ORDER BY created_at ASC`;
        const result = await query({ query: get_query, values: [req.query.poNo] })

        resSend(res, true, 200, "HR Compliance Uploaded List fetched", result, "");

    } catch (err) {
        console.log("data not fetched", err);
        resSend(res, false, 500, "Internal server error", null, "");
    }
   // return resSend(res, true, 200, "oded!", `req.hrquery.dd`, null);

}

const getIclData = async (purchasing_doc_no, drawingStatus) => {
    const isIclcknowledge = `SELECT purchasing_doc_no FROM ${INSPECTIONCALLLETTER} WHERE purchasing_doc_no = ? AND status = ?`;
    const acknowledgeResult = await query({ query: isIclcknowledge, values: [purchasing_doc_no, drawingStatus] });
    return acknowledgeResult;
}


async function handleEmail() {
    // Maill trigger to QA, user dept and dealing officer upon uploading of each inspection call letters.
}

module.exports = { hrComplianceUpload, complianceUploadedList }
