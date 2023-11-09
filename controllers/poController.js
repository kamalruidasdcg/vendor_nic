const { resSend } = require("../lib/resSend");
const { query } = require("../config/dbConfig");
const { generateQuery, getEpochTime } = require("../lib/utils");
const { INSERT } = require("../lib/constant");
const { ADD_DRAWING, NEW_SDBG, SDBG_ACKNOWLEDGEMENT, EKBE, EKKO, EKPO, QAP_SUBMISSION } = require("../lib/tableName");
const { CREATED, ACKNOWLEDGE, RE_SUBMIT } = require("../lib/status");
const fileDetails = require("../lib/filePath");
const path = require('path');
const { sdbgPayload, drawingPayload, poModifyData, qapPayload } = require("../services/po.services");

/** APIS START ----->  */
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

        // let q = `SELECT t1.*,t2.*,t3.* FROM ekko AS t1 LEFT JOIN pa0001 AS t2 ON t1.ERNAM= t2.PERNR AND t2.SUBTY= '0030' LEFT JOIN pa0105 AS t3 ON t2.PERNR = t3.PERNR AND t2.SUBTY = t3.SUBTY WHERE t1.EBELN = '${queryParams.id}'`;
        let q = `SELECT t1.*,t2.*,t3.* FROM ekko AS t1 LEFT JOIN pa0001 AS t2 ON t1.ERNAM= t2.PERNR AND t2.SUBTY= '0030' LEFT JOIN pa0105 AS t3 ON t2.PERNR = t3.PERNR AND t2.SUBTY = t3.SUBTY WHERE t1.EBELN = ?`;


        const result = await query({ query: q, values: [queryParams.id] });

        if (!result?.length)
            return resSend(res, false, 404, "No PO number found !!", [], null);


        const materialDetailsQ = `SELECT * FROM ${EKPO} WHERE EBELN = ?`;

        const result2 = await query({ query: materialDetailsQ, values: [queryParams.id] });

        result[0]["MAT_DETAILS"] = result2 || [];

        resSend(res, true, 200, "data fetch scussfully.", result, null);


    } catch (error) {
        return resSend(res, false, 500, error.toString(), [], null);
    }
};

// add new post
const addDrawing = async (req, res) => {

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


            const insertObj = drawingPayload(payload, CREATED)
            console.log("insertObj", insertObj);

            const { q, val } = generateQuery(INSERT, ADD_DRAWING, insertObj);
            const response = await query({ query: q, values: val });

            if (response) {
                // console.log("response", response);
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

const drawingResubmission = async (req, res) => {
    try {
        // Handle Image Upload

        if (!req.file)
            return resSend(res, false, 400, "Please upload a valid File", fileData, null);

        const fileData = {
            fileName: req.file.filename,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: req.file.size,
        };

        const { purchasing_doc_no, ...payload } = req.body;

        if (!purchasing_doc_no)
            return resSend(res, false, 400, "Please send po number", null, null);

        const isSDBGAcknowledge = `SELECT purchasing_doc_no FROM ${ADD_DRAWING} WHERE purchasing_doc_no = ? AND status = ?`;
        const acknowledgeResult = await query({ query: isSDBGAcknowledge, values: [purchasing_doc_no, ACKNOWLEDGE] });

        if (acknowledgeResult && acknowledgeResult?.length)
            return resSend(res, true, 200, `Aleready acknowledge this po -> ${purchasing_doc_no}`, null, null);



        //   const GET_LATEST_SDBG = `SELECT bank_name, transaction_id, vendor_code FROM ${NEW_SDBG} WHERE purchasing_doc_no = ${purchasing_doc_no} AND status = ${CREATED} ORDER BY id DESC LIMIT 1`;

        //   const result = await query({ query: GET_LATEST_SDBG, values: [] });

        //   if (!result || !result.length)
        //     return resSend(res, true, 200, "No SDBG found to resubmit", null, null);

        const payloadObj = {
            purchasing_doc_no,
            ...payload,
            ...fileData,
        };

        const insertObj = drawingPayload(payloadObj, RE_SUBMIT);

        const { q, val } = generateQuery(INSERT, ADD_DRAWING, insertObj);
        const response = await query({ query: q, values: val });

        if (response.affectedRows) {
            resSend(res, true, 200, "file uploaded!", fileData, null);
        } else {
            resSend(res, false, 400, "No data inserted", response, null);
        }
    } catch (error) {
        console.log("drawing resubmission api error", error);
        resSend(res, false, 500, "internal server error", [], null);
    }
};

// DOWNLOAD DRAWING WITH DRAWING ID

const download = async (req, res) => {

    console.log("filePath", fileDetails);

    // const queryParams = req.query;

    const typeArr = ["drawing", "sdbg", "qap"]

    const { id, type } = req.query;

    if (!typeArr.includes(type)) {
        return resSend(res, false, 400, "Please send valid type ! i.e. drawing, sdbg", null, null)
    }
    let fileFoundQuery = "";

    const tableName = fileDetails[type]["tableName"];
    const downaoadPath = fileDetails[type]["filePath"];

    switch (type) {
        case "drawing":
            fileFoundQuery = `SELECT * FROM ${tableName} WHERE drawing_id = ?`
            break;
        case "sdbg":
            fileFoundQuery = `SELECT * FROM ${tableName} WHERE id = ?`
            break;
        case "qap":

            break;

        default:
            break;
    }

    const response = await query({ query: fileFoundQuery, values: [id] });

    console.log("response", response);
    console.log("fileFoundQuery", fileFoundQuery);

    if (!response?.length || !response[0]?.file_name) {
        return resSend(res, true, 200, `file not uploaded with this id ${id}`, null, null)
    }

    const selectedPath = `${downaoadPath}${response[0].file_name}`;
    console.log("selectedPath", selectedPath);
    res.download(path.join(__dirname, "..", selectedPath), (err) => {
        if (err)
            resSend(res, false, 404, "file not found", err, null)

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

            const payload = { ...req.body, ...fileData };

            const insertObj = sdbgPayload(payload, CREATED)

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
const addQAP = async (req, res) => {

    console.log("po ADD QAP apis")

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

            const insertObj = qapPayload(payload, CREATED);

            const { q, val } = generateQuery(INSERT, QAP_SUBMISSION, insertObj);
            console.log(q, val);
            const response = await query({ query: q, values: val });
            console.log("res", response);

            if (response.affectedRows) {

                resSend(res, true, 200, "file uploaded!", fileData, null);
            } else {
                resSend(res, false, 400, "Data insert failed", response, null);
            }

        } else {
            resSend(res, false, 400, "Please upload a valid File", fileData, null);
        }

    } catch (error) {
        console.log("po add api", error)
        return resSend(res, false, 500, "internal server error", [], null);
    }
}



const qapResubmission = async (req, res) => {
    try {
        // Handle Image Upload

        if (!req.file)
            return resSend(res, false, 400, "Please upload a valid File", fileData, null);

        const fileData = {
            fileName: req.file.filename,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: req.file.size,
        };

        const { purchasing_doc_no, ...payload } = req.body;

        if (!purchasing_doc_no)
            return resSend(res, false, 400, "Please send po number", null, null);

        const isSDBGAcknowledge = `SELECT purchasing_doc_no FROM ${QAP_SUBMISSION} WHERE purchasing_doc_no = ? AND status = ?`;
        const acknowledgeResult = await query({ query: isSDBGAcknowledge, values: [purchasing_doc_no, ACKNOWLEDGE] });

        if (acknowledgeResult && acknowledgeResult?.length)
            return resSend(res, true, 200, `Aleready acknowledge this po -> ${purchasing_doc_no}`, null, null);



        //   const GET_LATEST_SDBG = `SELECT bank_name, transaction_id, vendor_code FROM ${NEW_SDBG} WHERE purchasing_doc_no = ${purchasing_doc_no} AND status = ${CREATED} ORDER BY id DESC LIMIT 1`;

        //   const result = await query({ query: GET_LATEST_SDBG, values: [] });

        //   if (!result || !result.length)
        //     return resSend(res, true, 200, "No SDBG found to resubmit", null, null);

        const payloadObj = {
            purchasing_doc_no,
            ...payload,
            ...fileData,
        };

        const insertObj = qapPayload(payloadObj, RE_SUBMIT);

        const { q, val } = generateQuery(INSERT, QAP_SUBMISSION, insertObj);
        const response = await query({ query: q, values: val });

        if (response.affectedRows) {
            resSend(res, true, 200, "file uploaded!", fileData, null);
        } else {
            resSend(res, false, 400, "No data inserted", response, null);
        }
    } catch (error) {
        console.log("drawing resubmission api error", error);
        resSend(res, false, 500, "internal server error", [], null);
    }
};

const downloadSDBG = async (req, res) => {

    const queryParams = req.query;


    if (!queryParams || !queryParams.id) {

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

        if (!queryParams || !queryParams.po) {
            return resSend(res, false, 400, "Please send po number", null, null);
        }

        const q = `SELECT * FROM ${NEW_SDBG} WHERE purchasing_doc_no = ${queryParams.po}`

        const result = await query({ query: q, values: [] });

        if (result?.length) {
            resSend(res, true, 200, "DATA FETCH SUCCESSFULLY", result, null);
        } else {
            resSend(res, true, 200, "NO DATA FOUND", result, null);
        }


    } catch (error) {

        resSend(res, false, 500, "INTERNAL SERVER ERROR", error, null);

    }
}



const sdbgResubmission = async (req, res) => {
    try {
        // Handle Image Upload

        if (!req.file)
            return resSend(res, false, 400, "Please upload a valid File", fileData, null);

        const fileData = {
            fileName: req.file.filename,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: req.file.size,
        };

        const { purchasing_doc_no, ...payload } = req.body;

        if (!purchasing_doc_no)
            return resSend(res, false, 400, "Please send po number", null, null);

        const isSDBGAcknowledge = `SELECT purchasing_doc_no FROM ${NEW_SDBG} WHERE purchasing_doc_no = ? AND status = ?`;
        const acknowledgeResult = await query({ query: isSDBGAcknowledge, values: [purchasing_doc_no, ACKNOWLEDGE] });

        if (acknowledgeResult && acknowledgeResult?.length)
            return resSend(res, true, 200, `Aleready acknowledge this po -> ${purchasing_doc_no}`, null, null);



        const GET_LATEST_SDBG = `SELECT bank_name, transaction_id, vendor_code FROM ${NEW_SDBG} WHERE purchasing_doc_no = ${purchasing_doc_no} AND status = ${CREATED} ORDER BY id DESC LIMIT 1`;

        const result = await query({ query: GET_LATEST_SDBG, values: [] });

        if (!result || !result.length)
            return resSend(res, true, 200, "No SDBG found to resubmit", null, null);

        const payloadObj = {
            purchasing_doc_no,
            ...payload,
            ...fileData,
            bank_name: result[0]?.bank_name ? result[0].bank_name : null,
            transaction_id: result[0]?.transaction_id ? result[0].transaction_id : null,
            vendor_code: result[0]?.vendor_code ? result[0].vendor_code : null,
        };

        const insertObj = sdbgPayload(payloadObj, RE_SUBMIT);

        const { q, val } = generateQuery(INSERT, NEW_SDBG, insertObj);
        const response = await query({ query: q, values: val });

        if (response.affectedRows) {
            resSend(res, true, 200, "file uploaded!", fileData, null);
        } else {
            resSend(res, true, 200, "No Record Found", response, null);
        }
    } catch (error) {
        console.log("sdbgResubmission api error", error);
        resSend(res, false, 500, "internal server error", [], null);
    }
};

const poList = async (req, res) => {
    try {
        const resultArr = [];

        let q = `SELECT EBELN AS poNb,BSART AS poType FROM ekko`;
        const poArr = await query({ query: q, values: [] });
        //console.log(poArr);
        let str ="";
        await Promise.all(
            poArr.map(async (item) => {
                str += "'" + item.poNb + "',";
            })
        );
        str = str.slice(0, -1);
        let SDVGQuery = `select purchasing_doc_no,created_by_name,remarks,max(created_at) AS created_at from new_sdbg WHERE purchasing_doc_no IN(${str}) group by purchasing_doc_no,created_by_name,remarks`;
        let SDVGArr = await query({ query: SDVGQuery, values: [] });
        //console.log(SDVGArr);

        let drawingQuery = `select purchasing_doc_no,created_by_name,remarks,max(created_at) AS created_at from add_drawing WHERE purchasing_doc_no IN(${str}) group by purchasing_doc_no,created_by_name,remarks`;
        let drawingArr = await query({ query: drawingQuery, values: [] });
        //console.log(drawingArr);

        let qapQuery = `select purchasing_doc_no,created_by_name,remarks,max(created_at) AS created_at from qap_submission WHERE purchasing_doc_no IN(${str}) group by purchasing_doc_no,created_by_name,remarks`;
        let qapArr = await query({ query: qapQuery, values: [] });
        //console.log(qapArr);

        await Promise.all(
            poArr.map(async (item) => {
                
                let obj = {};
                obj.poNumber = item.poNb;
                obj.poType = (item.poType == 'ZDM')?'material':(item.poType == 'ZGSR')?'service': 'hybrid';

                const SDVGObj = await SDVGArr.find(({ purchasing_doc_no }) => purchasing_doc_no == item.poNb);
  
                obj.SDVG = (SDVGObj === undefined) ? 'N/A' : SDVGObj ;

                const drawingObj = await drawingArr.find(({ purchasing_doc_no }) => purchasing_doc_no == item.poNb);
  
                obj.Drawing = (drawingObj === undefined) ? 'N/A' : drawingObj;

                const qapObj = await qapArr.find(({ purchasing_doc_no }) => purchasing_doc_no == item.poNb);
  
                obj.qapSubmission = (qapObj === undefined) ? 'N/A' : qapObj;
               
                resultArr.push(obj);
            })
        );

        resSend(res, true, 200, "data fetch scussfully.", resultArr, null);

    } catch (error) {
        return resSend(res, false, 500, error.toString(), [], null);
    }
}



module.exports = { 
    addDrawing, 
    details, 
    download, 
    addSDBG, 
    downloadSDBG, 
    getAllSDBG, 
    sdbgResubmission, 
    poList, 
    drawingResubmission, 
    addQAP,
    qapResubmission
}
