const { resSend } = require("../../lib/resSend");
const { query, getQuery } = require("../../config/pgDbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT, USER_TYPE_GRSE_HR, USER_TYPE_VENDOR } = require("../../lib/constant");
const { HR } = require("../../lib/tableName");
const Message = require("../../utils/messages");



const hrComplianceUpload = async (req, res) => {

    try {
        // Handle Image Upload
        let fileData = {};
        if (req.file) {
            fileData = {
                file_name: req.file.filename,
                file_path: req.file.path,
                // fileType: req.file.mimetype,
                // fileSize: req.file.size,
            };

            const tokenData = { ...req.tokenData };

            const payload = {
                ...req.body,
                created_at: getEpochTime(),
                created_by_id: tokenData.vendor_code,
                updated_by: "GRSE HR",
                ...fileData,
            };

            const hrComplianceDate = payload.compliance_date;

            console.log("payload", payload);
            if (!payload.purchasing_doc_no || !payload.remarks || !payload.status) {

                // const directory = path.join(__dirname, '..', 'uploads', lastParam);
                // const isDel = handleFileDeletion(directory, req.file.filename);
                return resSend(res, false, 400, "Please send valid payload", Message.MANDATORY_INPUTS_REQUIRED, null);

            }

            const compliance_date = hrComplianceDate ? new Date(hrComplianceDate) : new Date();
            const year = compliance_date.getFullYear();
            const month = compliance_date.getMonth() + 1;

            if (tokenData.department_id != USER_TYPE_GRSE_HR) {
                return resSend(res, false, 200, "Only HR can upload!", Message.YOU_ARE_UN_AUTHORIZED, null);
            }

            let insertObj = { ...payload, compliance_date, year, month };
            console.log('insertObj', insertObj);
            

            const { q, val } = generateQuery(INSERT, HR, insertObj);
            const response = await query({ query: q, values: val });
            resSend(res, true, 200, "HR Compliance Uploaded successfully !", response, null);
        }
        else {
            resSend(res, false, 400, "Please upload a valid File", fileData, null);
        }

    } catch (error) {
        resSend(res, false, 500, "internal server error", error.message, null);
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
                     AND purchasing_doc_no = $1 ) ORDER BY created_at ASC`;
        const result = await getQuery({ query: get_query, values: [req.query.poNo] })

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
