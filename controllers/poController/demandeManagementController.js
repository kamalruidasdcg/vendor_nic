const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT, USER_TYPE_PPNC_DEPARTMENT } = require("../../lib/constant");
const { DEMAND_MANAGEMENT } = require("../../lib/tableName");
const { PENDING, REJECTED, ACKNOWLEDGED, APPROVED, RE_SUBMITTED, CREATED } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const path = require('path');
const { inspectionReleaseNotePayload } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { getFilteredData, updatTableData, insertTableData } = require("../genralControlles");


const insert = async (req, res) => {

   // return resSend(res, true, 200, "inserted!", req.body, null);

    try {

  
        const tokenData = { ...req.tokenData };
        const obj = { ...req.body};

        if (!obj.purchasing_doc_no || !obj.line_item_no || !obj.request_amount) {

            // const directory = path.join(__dirname, '..', 'uploads', lastParam);
            // const isDel = handleFileDeletion(directory, req.file.filename);
            return resSend(res, false, 400, "Please send valid payload", null, null);

        }

        if (tokenData.department_id != USER_TYPE_PPNC_DEPARTMENT) {
            return resSend(res, false, 400, "Please login as PPNC depertment!", null, null);
        }

        const payload = {
            ...obj,
            created_at: getEpochTime(),
        };

        console.log("payload", payload);
        

//return;
        // if (payload.status === PENDING) {
        //     insertObj = inspectionCallLetterPayload(payload, PENDING);
        // } else if (payload.status === RE_SUBMITTED) {
        //     // insertObj = inspectionCallLetterPayload(payload, RE_SUBMITTED);
        // } else if (payload.status === APPROVED) {
        //     insertObj = inspectionCallLetterPayload(payload, APPROVED);
        // }
        // insertObj = inspectionCallLetterPayload(payload, PENDING);


        let insertObj = inspectionReleaseNotePayload(payload);

        console.log("insertObj", insertObj);
        const { q, val } = generateQuery(INSERT, DEMAND_MANAGEMENT, payload);
        const response = await query({ query: q, values: val });

        if (response.affectedRows) {

            // await handleEmail();

            resSend(res, false, 200, "DEMAND MANAGEMENT inserted successfully !", null, null);
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

const list = async (req, res) => {

    try {


        if (!req.query.poNo) {
            return resSend(res, false, 400, "Please send poNo", null, "");
        }
//req.query.poNo
        const insp_call_query =`WITH available_amount AS (
            SELECT EBELN, EBELP, SUM(MENGE) AS total_amount
            FROM mseg
            GROUP BY EBELP
        ),
        request_amount AS (
            SELECT purchasing_doc_no, line_item_no, SUM(request_amount) AS total_request_amount
            FROM demande_management
            GROUP BY line_item_no
        )
        SELECT ua.purchasing_doc_no, ua.line_item_no, aa.total_amount, ua.total_request_amount,tq.KTMNG AS total_target_amount
        FROM available_amount AS aa
        LEFT JOIN ekpo AS tq ON (aa.EBELN = tq.EBELN and aa.EBELP = tq.EBELP)
        JOIN request_amount AS ua ON (aa.EBELN = ua.purchasing_doc_no and aa.EBELP = ua.line_item_no) WHERE aa.EBELN = ?
        GROUP BY aa.EBELP;`;

        const result = await query({ query: insp_call_query, values: [req.query.poNo] })

        resSend(res, true, 200, "Demande Management Data fetched", result, "");

    } catch (err) {
        console.log("data not fetched", err);
        resSend(res, false, 500, "Internal server error", null, "");
    }
  //  return resSend(res, true, 200, "oded!", `list`, null);

}

const getActualQuantity= async (req, res) => {
    return resSend(res, true, 200, "getActualQuantity!", `list`, null);
}


async function handleEmail() {
    // Maill trigger to QA, user dept and dealing officer upon uploading of each inspection call letters.
}

module.exports = { insert, list, getActualQuantity }
