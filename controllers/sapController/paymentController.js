
const { resSend } = require("../../lib/resSend");
const { getFilteredData } = require("../../controllers/genralControlles");
const { PAYMENT_ADVICE2 } = require('../../lib/tableName');
const { paymentPayload } = require("../../services/sap.payment.services");
const { INSERT } = require("../../lib/constant");
const { getEpochTime, generateQuery } = require("../../lib/utils");
const { query } = require("../../config/dbConfig");



const addPaymentAdvice = async (req, res) => {

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

            const payload = { ...req.body, ...fileData, created_at: getEpochTime() };

            console.log("req body", req.body);
            console.log("req payload", payload);

            if (!payload.purchasing_doc_no || !payload.action_by_id || !payload.vendor_code) {

                // const directory = path.join(__dirname, '..', 'uploads', 'drawing');
                // const isDel = handleFileDeletion(directory, req.file.filename);
                return resSend(res, false, 400, "Please send valid payload", null, null);

            }


            let insertObj = paymentPayload(payload);

            const { q, val } = generateQuery(INSERT, PAYMENT_ADVICE2, insertObj);
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
        console.log("Drawing submission api", error);

        return resSend(res, false, 500, "internal server error", [], null);
    }
}


module.exports = { addPaymentAdvice }