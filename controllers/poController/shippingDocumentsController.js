// const { resSend } = require("../../lib/resSend");
// const { query } = require("../../config/dbConfig");
// const { generateQuery, getEpochTime } = require("../../lib/utils");
// const { INSERT } = require("../../lib/constant");
// const { SHIPPINGDOCUMENTS } = require("../../lib/tableName");
// const { PENDING, REJECTED, ACKNOWLEDGED, APPROVED, RE_SUBMITTED, CREATED } = require("../../lib/status");
// const fileDetails = require("../../lib/filePath");
// const path = require('path');
// const { shippingDocumentsPayload } = require("../../services/po.services");
// const { handleFileDeletion } = require("../../lib/deleteFile");
// const { getFilteredData, updatTableData, insertTableData } = require("../genralControlles");


const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT } = require("../../lib/constant");
const { INSPECTIONCALLLETTER, SHIPPINGDOCUMENTS } = require("../../lib/tableName");
const { PENDING, REJECTED, ACKNOWLEDGED, APPROVED, RE_SUBMITTED, CREATED } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const path = require('path');
const { inspectionCallLetterPayload, shippingDocumentsPayload } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { getFilteredData, updatTableData, insertTableData } = require("../../controllers/genralControlles");


const shippingDocuments = async (req, res) => {

    // resSend(res, true, 200, "file upleeoaded!", req.body, null);
    try {

        // const lastParam = req.path.split("/").pop();
        // Handle Image Upload
        let fileData = {};
        if (req.file) {
            fileData = {
                fileName: req.file.filename,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
            };
        }
            const tokenData = { ...req.tokenData };

            const by = tokenData.user_type === 1 ? "VENDOR" : "GRSE";

            const payload = {
                ...req.body,
                vendor_code: tokenData.vendor_code,
                created_at: getEpochTime(),
                created_by_id: tokenData.vendor_code,
                updated_by: by,
                ...fileData,
            };
            console.log("payload", payload);
            if (!payload.purchasing_doc_no) {

                // const directory = path.join(__dirname, '..', 'uploads', lastParam);
                // const isDel = handleFileDeletion(directory, req.file.filename);
                return resSend(res, false, 400, "Please send valid payload", null, null);

            }


            // if (payload.status === PENDING) {
            //     insertObj = inspectionCallLetterPayload(payload, PENDING);
            // } else if (payload.status === RE_SUBMITTED) {
            //     // insertObj = inspectionCallLetterPayload(payload, RE_SUBMITTED);
            // } else if (payload.status === APPROVED) {
            //     insertObj = inspectionCallLetterPayload(payload, APPROVED);
            // }
            // insertObj = inspectionCallLetterPayload(payload, PENDING);


            let insertObj = shippingDocumentsPayload(payload);

            console.log("insertObj", insertObj);
            const { q, val } = generateQuery(INSERT, SHIPPINGDOCUMENTS, insertObj);
            const response = await query({ query: q, values: val });

            if (response.affectedRows) {

                // await handleEmail();
                resSend(res, true, 200, "Shipping documents inserted successfully !", null, null);
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

const List = async (req, res) => {


    try {


        if (!req.query.poNo) {
            return resSend(res, false, 400, "Please send poNo", null, "");
        }

        const insp_call_query =
            `SELECT shipping_documents.*
                FROM   shipping_documents AS shipping_documents
            WHERE  ( 1 = 1
                     AND purchasing_doc_no = ? );`;
        const result = await query({ query: insp_call_query, values: [req.query.poNo] })

        resSend(res, true, 200, "Inspection call letter fetched", result, "");

    } catch (err) {
        console.log("data not fetched", err);
        resSend(res, false, 500, "Internal server error", null, "");
    }
    // resSend(res, true, 200, "oded!", req.query.dd, null);

}

async function handleEmail() {
    // Email alert to dealing officer, RIC & CDO about the uploading of shipping documents
}

module.exports = { shippingDocuments, List }



// exports.shippingDocuments = async (req, res) => {

//    // resSend(res, true, 200, "file upleeoaded!", req.body, null);
//     try {

//         const lastParam = req.path.split("/").pop();
//         // Handle Image Upload
//        let fileData = {};
//         if (req.file) {
//             fileData = {
//                 fileName: req.file.filename,
//                 filePath: req.file.path,
//                 fileType: req.file.mimetype,
//                 fileSize: req.file.size,
//             };

//             const payload = { ...req.body, ...fileData };


//             if(!payload.purchasing_doc_no || !payload.updated_by || !payload.action_by_name || !payload.action_by_id) {

//                 // const directory = path.join(__dirname, '..', 'uploads', lastParam);
//                 // const isDel = handleFileDeletion(directory, req.file.filename);
//                 return resSend(res, false, 400, "Please send valid payload", null, null);

//             }

//             const insertObj = shippingDocumentsPayload(payload, PENDING);
//             const { q, val } = generateQuery(INSERT, SHIPPINGDOCUMENTS, insertObj);
//             const response = await query({ query: q, values: val });
//             if (response.affectedRows) {
//                 resSend(res, true, 200, "SHIPPING DOCUMENTS Updated!", null, null);
//             } else {
//                 resSend(res, false, 400, "No data inserted", response, null);
//             }


//         } else {
//             resSend(res, false, 400, "Please upload a valid File", fileData, null);
//         }

//     } catch (error) {
//         console.log("po add api", error)

//         return resSend(res, false, 500, "internal server error", [], null);
//     }
// }

// exports.List = async (req, res) => {
    
//       req.query.$tableName = `shipping_documents`;
//       req.query.$filter = `{ "purchasing_doc_no" :  ${req.query.poNo}}`;
//       try {
//         getFilteredData(req, res);
//       } catch(err) {
//         console.log("data not fetched", err);
//       }
//     // resSend(res, true, 200, "oded!", req.query.dd, null);
     
//  }
