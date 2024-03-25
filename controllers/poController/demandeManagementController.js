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
        const obj = { ...req.body };

        if (!obj.purchasing_doc_no || !obj.line_item_no || !obj.action_type) {
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
            updated_by : tokenData.vendor_code
        };

        console.log("payload..", payload);
//return;
        const { q, val } = generateQuery(INSERT, DEMAND_MANAGEMENT, payload);
        const response = await query({ query: q, values: val });

        if (response.affectedRows) {

            // await handleEmail();

            resSend(res, true, 200, "DEMAND MANAGEMENT inserted successfully !", null, null);
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
        // const insp_call_query =`WITH available_amount AS (
        //     SELECT EBELN, EBELP, SUM(MENGE) AS total_amount
        //     FROM mseg
        //     GROUP BY EBELP
        // ),
        // request_amount AS (
        //     SELECT purchasing_doc_no, line_item_no, SUM(request_amount) AS total_request_amount
        //     FROM demande_management
        //     GROUP BY line_item_no
        // )
        // SELECT ua.purchasing_doc_no, ua.line_item_no, aa.total_amount, ua.total_request_amount,tq.KTMNG AS total_target_amount
        // FROM available_amount AS aa
        // LEFT JOIN ekpo AS tq ON (aa.EBELN = tq.EBELN and aa.EBELP = tq.EBELP)
        // JOIN request_amount AS ua ON (aa.EBELN = ua.purchasing_doc_no and aa.EBELP = ua.line_item_no) WHERE aa.EBELN = ?
        // GROUP BY aa.EBELP;`;

        const demande_query = `SELECT * FROM demande_management WHERE purchasing_doc_no = ?`;
        const result = await query({ query: demande_query, values: [req.query.poNo] })

        if (result) {
            return resSend(res, true, 200, "Demande Management Data fetched succesfully!", result, null);
        } else {
            return resSend(res, false, 200, "Data not fetched!", null, null);
        }

    } catch (err) {
        console.log("data not fetched", err);
        return resSend(res, false, 500, "Internal server error", null, "");
    }
    //  return resSend(res, true, 200, "oded!", `list`, null);

}

const getRestAmount = async (req, res) => {
    try {
        // const demande_query = `SELECT  SUM(a1.MENGE) AS total_amount,SUM(a2.request_amount) AS total_requested_amount,a3.KTMNG AS target_amount
        // FROM ekpo AS a3
        // LEFT JOIN demande_management AS a2 ON (a3.EBELN = a2.purchasing_doc_no AND a3.EBELP = a2.line_item_no)
        // LEFT JOIN mseg a1 ON (a1.EBELN = a3.EBELN AND a1.EBELP = a3.EBELP)
        // WHERE aa.EBELN = ? AND  aa.EBELP = ?`;

        // const demande_query = `SELECT  SUM(ab.MENGE) AS total_amount,aa.KTMNG AS target_amount,SUM(ac.request_amount) AS total_requested_amount
        // FROM ekpo AS aa
        // JOIN demande_management AS ac ON (aa.EBELN = ac.purchasing_doc_no AND aa.EBELP = ac.line_item_no)
        // JOIN mseg AS ab ON (aa.EBELN = ab.EBELN AND aa.EBELP = ab.EBELP)
        // WHERE aa.EBELN = ? AND  aa.EBELP = ?`;


const total_amount_query = `SELECT SUM(MENGE) AS total_amount from mseg WHERE EBELN = ? AND EBELP = ?`;
const total_amount_result = await query({ query: total_amount_query, values: [req.query.po_no, req.query.line_item_no] });
console.log("total_amount_result :" + total_amount_result[0].total_amount);
const target_amount_query = `SELECT KTMNG AS target_amount from ekpo WHERE EBELN = ? AND EBELP = ?`;
const target_amount_result = await query({ query: target_amount_query, values: [req.query.po_no, req.query.line_item_no] });
console.log("target_amount :" + target_amount_result[0].target_amount);
const total_requested_amount_query = `SELECT SUM(request_amount) AS total_requested_amount from demande_management WHERE purchasing_doc_no = ? AND line_item_no = ?`;
const total_requested_amount_result = await query({ query: total_requested_amount_query, values: [req.query.po_no, req.query.line_item_no] });
console.log("total_requested_amount_result :" + total_requested_amount_result[0].total_requested_amount);
      


        const rest_amount = parseInt(target_amount_result[0].target_amount) - (parseInt(total_amount_result[0].total_amount) + parseInt(total_requested_amount_result[0].total_requested_amount));
        // console.log(rest_amount);
        //   return;
        if (rest_amount) {
            return resSend(res, true, 200, "Rest Amount fetched succesfully!", {rest_amount : rest_amount}, null);
        } else {
            return resSend(res, false, 200, "Data not fetched!", null, null);
        }
    } catch (err) {
        console.log("data not fetched", err);
        return resSend(res, false, 500, "Internal server error", null, "");
    }

}


async function handleEmail() {
    // Maill trigger to QA, user dept and dealing officer upon uploading of each inspection call letters.
}

module.exports = { insert, list, getRestAmount }
