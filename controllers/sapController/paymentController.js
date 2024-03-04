
const { resSend, responseSend } = require("../../lib/resSend");
const { getFilteredData } = require("../../controllers/genralControlles");
const { PAYMENT_ADVICE2, PAYMENT_VOUCHER } = require('../../lib/tableName');
const { paymentPayload, ztfi_bil_defacePayload } = require("../../services/sap.payment.services");
const { INSERT } = require("../../lib/constant");
const { getEpochTime, generateQuery, generateInsertUpdateQuery } = require("../../lib/utils");
const { query } = require("../../config/dbConfig");



const addPaymentVoucher = async (req, res) => {

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
            if (!payload.purchasing_doc_no || !payload.action_by_id || !payload.vendor_code) {

                // const directory = path.join(__dirname, '..', 'uploads', 'drawing');
                // const isDel = handleFileDeletion(directory, req.file.filename);
                return resSend(res, false, 400, "Please send valid payload", null, null);

            }


            let insertObj = paymentPayload(payload);

            const { q, val } = generateQuery(INSERT, PAYMENT_VOUCHER, insertObj);
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
    // payment payload

    // "purchasing_doc_no": "4700013229",
    // "file": "sample.pdf",
    // "vendor_code": "50000437",
    // "action_by_name": "S Roy",
    // "action_by_id": "600224",

}
const addPaymentAdvise = async (req, res) => {

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
    // payment payload

    // "purchasing_doc_no": "4700013229",
    // "file": "sample.pdf",
    // "vendor_code": "50000437",
    // "action_by_name": "S Roy",
    // "action_by_id": "600224",

}

const ztfi_bil_deface = async (req, res) => {

    try {
        if (!req.body || typeof req.body != 'object' || !Object.keys(req.body)?.length) {
            return responseSend(res, "F", 400, "Please send a valid payload.", null, null);
        }

        const payload = req.body;
        console.log('payload zdeface', payload);
        if (!payload || !payload.ZREGNUM || !payload.SEQNO || !payload.ZBILLPER) {

            return responseSend(res, "F", 400, "Invalid payload.", null, null);
        }

        const payloadObj = await ztfi_bil_defacePayload(payload);
        const zdefaceInsertQuery = await generateInsertUpdateQuery(payloadObj, "ztfi_bil_deface", "C_PKEY");
        // console.log(", ztfi_bil_deface", zdefaceInsertQuery);
        const response = await query({ query: zdefaceInsertQuery, values: [] });
        console.log("response", response);
        if (response.affectedRows) {
            responseSend(res, "S", 200, "Data inserted successfully", response, null);

        } else {
            // resSend(res, false, 400, "No data inserted", response, null);
            responseSend(res, "F", 400, "Data inserted failed", response, null);

        }
        // responseSend(res, "S", 200, "Data inserted successfully", response, null);
    } catch (err) {
        console.log("data not inserted", err);
        responseSend(res, "0", 500, "Internal server errorR", err, null);
    }
}
module.exports = { addPaymentVoucher, addPaymentAdvise, ztfi_bil_deface }