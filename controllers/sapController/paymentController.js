
const { resSend, responseSend } = require("../../lib/resSend");
const { getFilteredData } = require("../../controllers/genralControlles");
const { PAYMENT_ADVICE2, PAYMENT_VOUCHER } = require('../../lib/tableName');
const { paymentPayload, ztfi_bil_defacePayload, paymentAviceHeaderPayload, paymentAviceLineItemsPayload, zbtsHeaderPayload, zbtsLineItemsPayload } = require("../../services/sap.payment.services");
const { INSERT } = require("../../lib/constant");
const { getEpochTime, generateQuery, generateInsertUpdateQuery, generateQueryForMultipleData } = require("../../lib/utils");
const { query } = require("../../config/dbConfig");

const path = require('path');
const fs = require('fs');


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
        responseSend(res, "F", 500, "Internal server errorR", err, null);
    }
}
const newPaymentAdvice = async (req, res) => {

    try {
        if (!req.body || typeof req.body != 'object' || !Object.keys(req.body)?.length) {
            return responseSend(res, "F", 400, "Please send a valid payload.", null, null);
        }

        const payload = req.body;
        console.log('payload payment advice', payload);
        if (!payload) {
            return responseSend(res, "F", 400, "Invalid payload.", null, null);
        }

        const { ZFI_PYMT_ADVCE_FINAL, ...obj } = payload;

        const payloadObj = await paymentAviceHeaderPayload(obj);
        const paymentAviceHeaderQuery = await generateInsertUpdateQuery(payloadObj, "zfi_pymt_advce_data_final", "id");

        const response1 = await query({ query: paymentAviceHeaderQuery, values: [] });

        const lineItemPayloadObj = await paymentAviceLineItemsPayload(ZFI_PYMT_ADVCE_FINAL);
        const paymentAviceLineItemsQuery = await generateQueryForMultipleData(lineItemPayloadObj, "zfi_pymt_advce_final", "id");
        const response2 = await query({ query: paymentAviceLineItemsQuery, values: [] });

        console.log("response", response1, response1);
        if (response1.affectedRows && response2.affectedRows) {
            responseSend(res, "S", 200, "Data inserted successfully", { response1, response2 }, null);

        } else {
            // resSend(res, false, 400, "No data inserted", response, null);
            responseSend(res, "F", 400, "Data inserted failed", { response1, response2 }, null);

        }
        // responseSend(res, "S", 200, "Data inserted successfully", response, null);
    } catch (err) {
        console.log("data not inserted", err);
        responseSend(res, "F", 500, "Internal server errorR", err, null);
    }
}
// const zbts_st = async (req, res) => {

//     try {
//         if (!req.body || typeof req.body != 'object' || !Object.keys(req.body)?.length) {
//             return responseSend(res, "F", 400, "Please send a valid payload.", null, null);
//         }

//         const payload = req.body;
//         // console.log('zbts st payload', payload);
//         if (!payload) {
//             return responseSend(res, "F", 400, "Invalid payload.", null, null);
//         }

//         const { ZBTSM, ...obj } = payload;

//         console.log("payloadObj", obj);

//         const payloadObj = await zbtsHeaderPayload(obj);
//         const btnPaymentHeaderQuery = await generateInsertUpdateQuery(payloadObj, "zbts_st", "id");
//         const response1 = await query({ query: btnPaymentHeaderQuery, values: [] });
//         let response2;
//         if (ZBTSM) {

//             const lineItemPayloadObj = await zbtsLineItemsPayload(ZBTSM);
//             const btnPaymentLineItemQuery = await generateInsertUpdateQuery(lineItemPayloadObj, "zbtsm_st", "id");
//             response2 = await query({ query: btnPaymentLineItemQuery, values: [] });
//         }

//         console.log("response", response1, response1);
//         if (response1.affectedRows && response2.affectedRows) {
//             responseSend(res, "S", 200, "Data inserted successfully", { response1, response2 }, null);

//         } else {
//             // resSend(res, false, 400, "No data inserted", response, null);
//             responseSend(res, "F", 400, "Data inserted failed", { response1, response2 }, null);

//         }
//         // responseSend(res, "S", 200, "Data inserted successfully", response, null);
//     } catch (err) {
//         console.log("data not inserted", err);
//         responseSend(res, "0", 500, "Internal server errorR", err, null);
//     }
// }
const ztfi_bil_deface_report = async (req, res) => {

    try {

        const payload = req.body;
        console.log('payload zdeface', payload);

        if (!req.body.btn) {
            return resSend(res, false, 200, "plese send btn", [], null);
        }

        let zdefaceInsertQuery =
            `SELECT 
            deface.zregnum         AS btn,
            deface.zregdate                AS btnDate,
            deface.zpono                   AS purchesing_doc_no,
            deface.zvendor                 AS vendor_code,
            deface.zbscval_m_s             AS matValue,
            deface.zntsupp_s               AS nogrsrValue,
            deface.znetvalue_s             AS netValue,
            deface.zcst_vat_txt            AS taxesAndDutiesText,
            deface.zcst_vat_s              AS taxesAndDutiesValue,
            deface.ztotalb_s               AS totalValWithTaxDutiesValue,
            deface.zadd_othrchrg_txt       AS anyOtherPaybleText,
            deface.zadd_othrchrg_s         AS anyOtherPaybleValue,
            deface.ztotala_s               AS grossValue,
            deface.ZADD_OTHRCHRG_1_S      AS adjustmentOfAdvance,
            deface.zles_retntn_txt         AS pbgText,
            deface.zles_retntn_s           AS pbgValue,
            deface.zles_sd_txt             AS sdText,
            deface.zles_sd_s               AS sdValue,
            deface.zles_othr_txt           AS otherText,
            deface.zles_othr_s             AS otherValue,
            deface.zles_gross_ret          AS totalRetentions,
            deface.zles_inctax_txt         AS incomeTaxTDSText,
            deface.zles_inctax_s           AS incomeTaxTDSValue,
            deface.zles_wrkcontax_txt      AS gstTdsText,
            deface.zles_wrkcontax_s        AS gstTdsValue,
            deface.zles_cstofcon_paint_txt AS costOfConPaintText,
            deface.zles_cstofcon_paint_s   AS costOfConPaintValue,
            deface.zles_ld_txt             AS ldText,
            deface.zles_ld_s               AS ldValue,
            deface.zles_penalty_txt        AS penaltyText,
            deface.zles_penalty_s          AS penaltyValue,
            deface.zles_intsd_txt          AS interestChargeText,
            deface.zles_intsd_s            AS interestChargeValue,
            deface.zles_othrded_txt        AS otherDeductionText,
            deface.zles_othrded_s          AS otherDeductionValue,
            deface.zles_gross_ded          AS totalDeduction,
            deface.znet_pymnt1_s           AS netPayment
        FROM   
            ztfi_bil_deface AS deface 
        WHERE  1 = 1`;

        const val = [];



        if (payload.btn) {
            zdefaceInsertQuery = zdefaceInsertQuery.concat(" AND deface.ZREGNUM = ?");
            val.push(payload.btn)
        }

        const response = await query({ query: zdefaceInsertQuery, values: val });
        console.log("response", response);
        if (response) {
            responseSend(res, "S", 200, "Data inserted successfully", response, null);

        }
        // responseSend(res, "S", 200, "Data inserted successfully", response, null);
    } catch (err) {
        console.log("Error", err);
        responseSend(res, "F", 500, "Internal server errorR", err, null);
    }
}

const adviceDownload = async (req, res) => {
    try {

        // if (!req.query.poNo) {
        //     return resSend(res, false, 400, "Please send PO number", null, null);
        // }
        let file = {}
        try {

            file = await POfileFilter(req.query.poNo);

            if (file.success && file?.data?.length) {
                const fileName = file.data;
                console.log(fileName)
                const directoryPath = path.join(__dirname, '..', '..', 'sapuploads', 'paymentadvice');
                // const file_path = path.join('sapuploads', 'paymentadvice', `${fileName}`)
                const response = [{ full_file_path: directoryPath, file_name: fileName }];

                // res.download(directoryPath, (err) => {
                //     if (err)     
                //     return resSend(res, false, 404, "file not found", err, null)
                // });

                if (!fileName) {
                    return resSend(res, false, 404, "file not found", err, null)
                }
                resSend(res, true, 200, "File fetched successfully", response, null);
            } else {
                resSend(res, true, 200, file.msg, file.data, null);
            }
        } catch (error) {
            return resSend(res, false, 500, "GET FILE ERROR", error, null);
        }

    } catch (error) {
        console.log("download po api error", error);
        return resSend(res, false, 500, "INTERNL SERVER ERROR", {}, null);
    }
}


const POfileFilter = async (id) => {
    try {

        const directoryPath = path.join(__dirname, '..', '..', 'sapuploads', 'paymentadvice');
        const files = await fs.promises.readdir(directoryPath); // Use promise-based readdir for async handling
        return { success: true, msg: "file fetched", data: files }; // Return the array of most recent files

    } catch (err) {
        return { success: false, msg: err.message, data: null }; // Return an empty array on error
    }
};


module.exports = { addPaymentVoucher, addPaymentAdvise, ztfi_bil_deface, ztfi_bil_deface_report, newPaymentAdvice, adviceDownload }