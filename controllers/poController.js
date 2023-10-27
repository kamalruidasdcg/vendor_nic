const { resSend } = require("../lib/resSend");
const { query } = require("../db/dbConfig");
const { generateQuery, getEpochTime } = require("../lib/utils");
const { INSERT } = require("../lib/constant");
const { ADD_DRAWING } = require("../lib/tableName");
const { CREATED } = require("../lib/status");
const path = require('path');
const details = async (req, res) => {
    try {

        const { poNo } = req.params;

        if (!poNo || poNo == 0) {
            return resSend(res, false, 400, "Please provided PO NO.", [], null);
        }

        let qry = `SELECT *  FROM ekko WHERE EBELN = '${poNo}'`;

        // let qry = `SELECT t1.*,t2.*,t3.* FROM ekko as t1
        //                 LEFT JOIN ekbe  as t2 ON t1.EBELN = t2.EBELN
        //                 LEFT JOIN essr  as t3 ON t1.EBELN = t3.EBELN 
        //             WHERE t1.EBELN = '${poNo}'`;

        const result = await query({ query: qry, values: [] });


        const materialDetailsQ = `SELECT * FROM ekbe WHERE  EBELN = '${poNo}'`;

        const result2 = await query({ query: materialDetailsQ, values: [] });

        console.log("result", result);
        console.log("result2", result2);

        if (result?.length && result2?.length) {

            result.forEach((el, i) => {
                const data = result2.filter((d) => d.EBELN == el.EBELN);

                if (data.length) {
                    el["MAN_DETAILS"] = data
                } else {
                    el["MAN_DETAILS"] = [];
                }

            })
        }

        console.log("result", result);


        return resSend(res, true, 200, "data fetch scussfully.", result, null);
    } catch (error) {
        console.log("", error.toString());
        return resSend(res, false, 500, error.toString(), [], null);
    }
};

// add new post
const add = async (req, res) => {

    console.log("po addd apis")

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
            console.log("payload", payload);

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

    const queryParama = req.query;

    const q = `SELECT * FROM ${ADD_DRAWING} WHERE drawing_id = ${queryParama.id}`

    const response = await query({ query: q, values: [] });

    const filepath = `/uploads/drawings/${response[0].file_name}`;


    res.download(path.join(__dirname, "..", filepath), (err) => {
        if (err)
            resSend(res, false, 404, "file not foound", err, null)

    });
}

module.exports = { add, details, download }