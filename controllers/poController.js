const { resSend } = require("../lib/resSend");
const { query } = require("../config/dbConfig");
const { generateQuery, getEpochTime } = require("../lib/utils");
const { INSERT } = require("../lib/constant");
const { ADD_DRAWING, NEW_SDBG, SDBG_ACKNOWLEDGEMENT, EKBE, EKKO, EKPO } = require("../lib/tableName");
const { CREATED, ACKNOWLEDGE, RE_SUBMIT } = require("../lib/status");
const path = require('path');
const details = async (req, res) => {
    try {

        const queryParams = req.query;

        if (!queryParams.id || queryParams.id === '0') {
            return resSend(res, false, 400, "Please provided PO NO.", [], null);
        }
        // let qry = `SELECT t1.*,t2.*,t3.* FROM ekko as t1
        //                 LEFT JOIN ekbe  as t2 ON t1.EBELN = t2.EBELN
        //                 LEFT JOIN essr  as t3 ON t1.EBELN = t3.EBELN 
        //             WHERE t1.EBELN = '${poNo}'`;

        // let q = `SELECT t1.*,t2.* FROM ekko as t1 LEFT JOIN ekbe as t2 ON t1.EBELN = t2.EBELN WHERE t1.EBELN = '${poNo}'`;

        let q = `SELECT t1.*,t2.*,t3.* FROM ekko AS t1 LEFT JOIN pa0001 AS t2 ON t1.ERNAM= t2.PERNR AND t2.SUBTY= '0030' LEFT JOIN pa0105 AS t3 ON t2.PERNR = t3.PERNR AND t2.SUBTY = t3.SUBTY WHERE t1.EBELN = '${queryParams.id}';`


        const result = await query({ query: q, values: [] });

        if(!result?.length) 
            return resSend(res, true, 200, "No PO number found !!", [], null);
        
        
        const materialDetailsQ = `SELECT * FROM ${EKPO} WHERE  EBELN = '${queryParams.id}'`;
        
        const result2 = await query({ query: materialDetailsQ, values: [] });


        if (result?.length && result2?.length) {
            result[0]["MAT_DETAILS"] = result2;
            resSend(res, true, 200, "data fetch scussfully.", result, null);
        } else {
            result[0]["MAT_DETAILS"] = [];
            resSend(res, true, 200, "data fetch scussfully.", result, null);
        }

    } catch (error) {
        return resSend(res, false, 500, error.toString(), [], null);
    }
};

// add new post
const add = async (req, res) => {

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

            const payload = req.body;

            const insertObj = {
                // "drawing_id": "12124", // auto incremant id
                "purchasing_doc_no": payload.purchasing_doc_no,
                "file_name": req.file.filename,
                "file_path": req.file.path,
                "material_no": payload.material_no,
                "status": CREATED,
                "status_updated_at": getEpochTime(),
                "status_updated_by_name": payload.action_by_name,
                "status_updated_by_id": payload.action_by_id,
                "remarks": payload.remarks,
                "created_at": getEpochTime(),
                "created_by_name": payload.action_by_name,
                "created_by_id": payload.action_by_id,
                // "create_at_datetime": "",  // DATA BASE DEFAULT DATTE TIME
                // "updated_at_datetime": "" // DATA BASE DEFAULT DATE TIME
            }

            const { q, val } = generateQuery(INSERT, ADD_DRAWING, insertObj);
            const response = await query({ query: q, values: val });

            if (res) {
                console.log("response", response);
            }


            resSend(res, true, 200, "file uploaded!", fileData, null);
        } else {
            resSend(res, false, 400, "Please upload a valid File", fileData, null);
        }

    } catch (error) {
        console.log("po add api", error)

        return resSend(res, false, 500, "internal server error", [], null);
    }
}


// DOWNLOAD DRAWING WITH DRAWING ID

const download = async (req, res) => {

    const queryParams = req.query;

    const q = `SELECT * FROM ${ADD_DRAWING} WHERE drawing_id = ${queryParams.id}`

    const response = await query({ query: q, values: [] });

    const filepath = `/uploads/drawings/${response[0].file_name}`;


    res.download(path.join(__dirname, "..", filepath), (err) => {
        if (err)
            resSend(res, false, 404, "file not foound", err, null)

    });
}


const addSDBG = async (req, res) => {

    console.log("po addSDBG apis")

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

            const payload = req.body;

            const insertObj = {
                // "id": 1, // auto incremant id
                "purchasing_doc_no": payload.purchasing_doc_no,
                "file_name": req.file.filename,
                "file_path": req.file.path,
                "remarks": payload.remarks ? payload.remarks : null,
                "status": CREATED,
                "updated_by": payload.updated_by,
                "bank_name": payload.bank_name ? payload.bank_name : null,
                "transaction_id": payload.transaction_id ? payload.transaction_id : null,
                "vendor_code": payload.vendor_code ? payload.vendor_code : null,
                "created_at": getEpochTime(),
                "created_by_name": payload.action_by_name,
                "created_by_id": payload.action_by_id,
            }

            const { q, val } = generateQuery(INSERT, NEW_SDBG, insertObj);
            const response = await query({ query: q, values: val });

            if (response.affectedRows) {

                resSend(res, true, 200, "file uploaded!", fileData, null);
            } else {
                resSend(res, true, 204, "No Record Found", response, null);
            }

        } else {
            resSend(res, false, 400, "Please upload a valid File", fileData, null);
        }

    } catch (error) {
        console.log("po add api", error)
        return resSend(res, false, 500, "internal server error", [], null);
    }
}

const downloadSDBG = async (req, res) => {
    
    const queryParams = req.query;


    if(!queryParams || !queryParams.id) {

        return resSend(res, false, 400, "Please send po number", null, null);
    }
    
    const q = `SELECT * FROM ${NEW_SDBG} WHERE id = ${queryParams.id}`
    
    const response = await query({ query: q, values: [] });
    
    const filepath = `/uploads/sdbg/${response[0].file_name}`;

    res.download(path.join(__dirname, "..", filepath), (err) => {
        if (err)
        resSend(res, false, 404, "file not foound", err, null)
    
});
}

const getAllSDBG = async (req, res) => {
    
    try {

        const queryParams = req.query;

        if(!queryParams || !queryParams.po) {
            return resSend(res, false, 400, "Please send po number", null, null);
        }

        const q = `SELECT * FROM ${NEW_SDBG} WHERE purchasing_doc_no = ${queryParams.po}`
        
        const result = await query({ query: q, values: [] });

        if(result?.length) {
            resSend(res, true, 200, "DATA FETCH SUCCESSFULLY", result, null);
        } else {
            resSend(res, true, 200, "NO DATA FOUND", result, null);
        }
        
        
    } catch (error) {

        resSend(res, false, 500, "INTERNAL SERVER ERROR", error , null);
        
    }
}



const sdbgResubmission = async (req, res) => {

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

            const payload = req.body;
            const {purchasing_doc_no} = payload;


        if(!payload || !purchasing_doc_no)
            return resSend(res, false, 400, "Please send po number", null, null);




            const GET_LATEST_SDBG = `SELECT bank_name, transaction_id, vendor_code FROM ${NEW_SDBG} WHERE purchasing_doc_no = ${purchasing_doc_no} AND status = ${CREATED} ORDER BY id DESC`;
        
            const result = await query({ query: GET_LATEST_SDBG, values: [] });

            if(!result || !result.length) 
                return resSend(res, true, 200, "No SDBG found to resubmit", null, null);
            
            const insertObj = {
                // "id": 1, // auto incremant id
                "purchasing_doc_no": purchasing_doc_no,
                "file_name": req?.file?.filename ? req?.file?.filename : null,
                "file_path": req?.file?.path ? req?.file?.path : null,
                "remarks": payload.remarks ? payload.remarks : null,
                "status": RE_SUBMIT,
                "updated_by": payload.updated_by,
                "bank_name": result[0].bank_name ? result[0].bank_name : null,
                "transaction_id": result[0].transaction_id ? result[0].transaction_id : null,
                "vendor_code": result[0].vendor_code ? result[0].vendor_code : null,
                "created_at": getEpochTime(),
                "created_by_name": payload.action_by_name,
                "created_by_id": payload.action_by_id,
            }


            const { q, val } = generateQuery(INSERT, NEW_SDBG, insertObj);
            const response = await query({ query: q, values: val });

            if (response.affectedRows) {
                resSend(res, true, 200, "file uploaded!", fileData, null);
            } else {
                resSend(res, true, 204, "No Record Found", response, null);
            }

        } else {
            resSend(res, false, 400, "Please upload a valid File", fileData, null);
        }

    } catch (error) {
        console.log("sdbgResubmission api error", error)

        resSend(res, false, 500, "internal server error", [], null);
    }
}


module.exports = { add, details, download, addSDBG, downloadSDBG, getAllSDBG,  sdbgResubmission}






// const sdbgAcknowledgement = async (req, res) => {
    
    //     console.log("po addSDBG apis")
    
    //     try {
        
        
        //         // Handle Image Upload
//         let fileData = {};
//         if (req.file) {
//             fileData = {
//                 fileName: req.file.filename,
//                 filePath: req.file.path,
//                 fileType: req.file.mimetype,
//                 fileSize: req.file.size,
//             };

//             const payload = req.body;

//             const insertObj = {
//                 // "id": 1, // auto incremant id
//                 "purchasing_doc_no": payload.purchasing_doc_no,
//                 "file_name": req.file.filename,
//                 "file_path": req.file.path,
//                 "status": ACKNOWLEDGE,
//                 "status_updated_at": getEpochTime(),
//                 "status_updated_by_name": payload.action_by_name,
//                 "status_updated_by_id": payload.action_by_id,
//                 "remarks": payload.remarks ? payload.remarks : null,
//                 "created_at": getEpochTime(),
//                 "created_by_name": payload.action_by_name,
//                 "created_by_id": payload.action_by_id,
//                 // "create_at_datetime": "",  // DATA BASE DEFAULT DATE TIME
//                 // "updated_at_datetime": "" // DATA BASE DEFAULT DATE TIME
//             }


//             const { q, val } = generateQuery(INSERT, SDBG_ACKNOWLEDGEMENT, insertObj);
//             const response = await query({ query: q, values: val });

//             if (response.affectedRows) {

    //                 resSend(res, true, 200, "file uploaded!", fileData, null);
//             } else {
//                 resSend(res, true, 204, "No Record Found", response, null);
//             }

//         } else {
//             resSend(res, false, 400, "Please upload a valid File", fileData, null);
//         }

//     } catch (error) {
//         console.log("po add api", error)

//         return resSend(res, false, 500, "internal server error", [], null);
//     }
// }