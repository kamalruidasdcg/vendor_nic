const { resSend } = require("../lib/resSend");
const { query } = require("../config/dbConfig");
const { generateQuery, getEpochTime } = require("../lib/utils");
const { INSERT } = require("../lib/constant");
const { ADD_DRAWING, NEW_SDBG, SDBG_ACKNOWLEDGEMENT, EKBE, EKKO, EKPO } = require("../lib/tableName");
const { CREATED, ACKNOWLEDGE, RE_SUBMIT } = require("../lib/status");
const fileDetails = require("../lib/filePath");
const path = require('path');
const { sdbgPayload, drawingPayload, poModifyData } = require("../services/po.services");

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

        if(!result?.length) 
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

            const payload = {...req.body, ...fileData };


            const insertObj = drawingPayload(payload, CREATED)
            console.log("insertObj", insertObj);

            const { q, val } = generateQuery(INSERT, ADD_DRAWING, insertObj);
            const response = await query({ query: q, values: val });

            if (res) {
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

// DOWNLOAD DRAWING WITH DRAWING ID

const download = async (req, res) => {

    console.log("filePath", fileDetails);

    // const queryParams = req.query;

    const typeArr = [ "drawing", "sdbg", "qap"]

    const { id, type } = req.query;

    if(!typeArr.includes(type)) {
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

    if( !response?.length || !response[0]?.file_name) {
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

    if (!req.file)
      return resSend( res, false, 400, "Please upload a valid File", fileData, null);

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

        let q = `SELECT * FROM ekko`;

        let fetchQuery = `SELECT
        ekko.EBELN AS "ekko_EBELN",
        ekko.BUKRS AS "ekko_BUKRS",
        ekko.BSTYP AS "ekko_BSTYP",
        ekko.BSART AS "ekko_BSART",
        ekko.LOEKZ AS "ekko_LOEKZ",
        ekko.AEDAT AS "ekko_AEDAT",
        ekko.ERNAM AS "ekko_ERNAM",
        ekko.LIFNR AS "ekko_LIFNR",
        ekko.EKORG AS "ekko_EKORG",
        ekko.EKGRP AS "ekko_EKGRP",

        new_sdbg.purchasing_doc_no AS "new_sdbg_purchasing_doc_no",
        new_sdbg.created_at AS "new_sdbg_created_at",
        new_sdbg.status AS "new_sdbg_status",
        new_sdbg.created_by_name AS "new_sdbg_created_by_name",
        new_sdbg.created_by_id AS "new_sdbg_created_by_id",

        add_drawing.purchasing_doc_no AS "add_drawing_purchasing_doc_no",
        add_drawing.created_by_name AS "add_drawing_created_by_name",
        add_drawing.status AS "add_drawing_status",
        add_drawing.created_by_id AS "add_drawing_created_by_id",
        add_drawing.created_at AS "add_drawing_created_at"

        FROM ekko
        LEFT JOIN new_sdbg 
        ON (ekko.EBELN = new_sdbg.purchasing_doc_no)
        LEFT JOIN add_drawing 
        ON (ekko.EBELN = add_drawing.purchasing_doc_no)
        WHERE (add_drawing.status = "1" OR add_drawing.status = "3")
        AND (new_sdbg.status = "1" OR new_sdbg.status = "3")`;


        const result1 = await query({ query: fetchQuery, values: [] });
        console.log("result", result1);
        // return;
        const data = result1;
        
        const resultArr= [];

        let checkElementArr = [];

        await Promise.all(
            result1.map( (item) => {

                const poArr = data.filter(d => d.ekko_EBELN === item.ekko_EBELN);
                if(checkElementArr.includes(item.ekko_EBELN)===false) {
                  
                   let new_sdbg = [];
                   let add_drawing = [];
                   poArr.map(  (item) => {
                        let sdbgObj = {
                                        purchasing_doc_no:item.new_sdbg_purchasing_doc_no,
                                        created_at:item.new_sdbg_created_at,
                                        status:item.new_sdbg_status,
                                        created_by_name:item.new_sdbg_created_by_name,
                                        created_by_id:item.new_sdbg_created_by_id
                                    
                                    };

                        let drawingObj = {
                                        created_by_name:item.add_drawing_created_by_name,
                                        status:item.add_drawing_status,
                                        created_by_id:item.add_drawing_created_by_id,
                                        created_at:item.add_drawing_created_at
                                    
                                    };            


                       new_sdbg.push(sdbgObj);
                       add_drawing.push(drawingObj);
                   });
      
                   let poInfo = {
                            ekko_EBELN : item.ekko_EBELN,
                            ekko_BUKRS : item.ekko_BUKRS,
                            ekko_BSTYP : item.ekko_BSTYP,
                            ekko_BSART : item.ekko_BSART,
                            ekko_LOEKZ : item.ekko_LOEKZ,
                            ekko_AEDAT : item.ekko_AEDAT,
                            ekko_ERNAM : item.ekko_ERNAM,
                            ekko_LIFNR : item.ekko_LIFNR,
                            ekko_EKORG : item.ekko_EKORG,
                            ekko_EKGRP : item.ekko_EKGRP
                   }
                   //console.log(g);
                   let mainObj = {poInfo, sdbg: new_sdbg, drawing:add_drawing};
                   resultArr.push(mainObj);
                }
                
                checkElementArr.push(item.ekko_EBELN);


            })
        );

         
     console.log(resultArr);

        resSend(res, true, 200, "data fetch scussfully.", resultArr, null);


    } catch (error) {
        return resSend(res, false, 500, error.toString(), [], null);
    }
}



module.exports = { addDrawing, details, download, addSDBG, downloadSDBG, getAllSDBG,  sdbgResubmission, poList}
