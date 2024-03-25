const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT, UPDATE, USER_TYPE_PPNC_DEPARTMENT } = require("../../lib/constant");
const { DEMAND_MANAGEMENT } = require("../../lib/tableName");
const { PENDING, REJECTED, ACKNOWLEDGED, APPROVED, RE_SUBMITTED, CREATED, STATUS_REQUEST, STATUS_RECEIVED } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const path = require('path');
const { create_reference_no } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { getFilteredData, updatTableData, insertTableData } = require("../genralControlles");


const insert = async (req, res) => {

    // return resSend(res, true, 200, "inserted!", req.body, null);

    try {


        const tokenData = { ...req.tokenData };
        const obj = { ...req.body };

        if (!obj.purchasing_doc_no || !obj.line_item_no || !obj.status) {
            // const directory = path.join(__dirname, '..', 'uploads', lastParam);
            // const isDel = handleFileDeletion(directory, req.file.filename);
            return resSend(res, false, 200, "Please send valid payload", null, null);
        }

        if (tokenData.department_id != USER_TYPE_PPNC_DEPARTMENT) {
            return resSend(res, false, 200, "Please login as PPNC depertment!", null, null);
        }

        if (obj.status != STATUS_REQUEST && obj.status != STATUS_RECEIVED) {
            // console.log();
            return resSend(res, false, 200, "Please send a valid action type!", null, null);
        }


//         const payload = {
//             ...obj,
//             created_at: getEpochTime(),
//             updated_by : tokenData.vendor_code
//         };

//         console.log("payload..", payload);
// //return;
//         const { q, val } = generateQuery(INSERT, DEMAND_MANAGEMENT, payload);
//         const response = await query({ query: q, values: val });
let payload = {
   
    status : obj.status

};
let whereCondition;

        if(obj.status == STATUS_REQUEST) {
            
            if(!obj.action_type || obj.action_type == "") {
                return resSend(res, false, 200, "please send a valid request_amount!", null, null);
            }
            if(!obj.request_amount || obj.request_amount < 0) {
                return resSend(res, false, 200, "please send a valid request_amount!", null, null);
            }
            let reference_no = await create_reference_no("DM", tokenData.vendor_code);

            payload.action_type = obj.action_type,
            payload.purchasing_doc_no = obj.purchasing_doc_no,
            payload.line_item_no = obj.line_item_no,
            payload.reference_no = reference_no;
            payload.request_amount = obj.request_amount;
            payload.delivery_date = obj.delivery_date;
            payload.created_remarks = obj.created_remarks;

            payload.created_at = getEpochTime();
            payload.created_remarks = obj.created_remarks;
            payload.created_by = tokenData.vendor_code;

        } else if(obj.status == STATUS_RECEIVED) {
            
            if(!obj.reference_no || obj.reference_no == "") {
                return resSend(res, false, 200, "please send reference_no!", null, null);
            }
            if(!obj.recived_quantity || obj.recived_quantity < 0) {
                return resSend(res, false, 200, "please send a valid recived_quantity!", null, null);
            }
           // payload.reference_no = obj.reference_no;
            payload.recived_quantity = obj.recived_quantity;
            payload.updated_remarks = obj.updated_remarks;
            payload.updated_at = getEpochTime();
            payload.updated_by = tokenData.vendor_code;

            whereCondition = `reference_no='${obj.reference_no}'`;
        }
      let { q, val } =
      obj.status == STATUS_RECEIVED
            ? generateQuery(UPDATE, DEMAND_MANAGEMENT, payload, whereCondition)
            : generateQuery(INSERT, DEMAND_MANAGEMENT, payload);

            const response = await query({ query: q, values: val });
        // console.log("payload_00________________");
        // console.log(q);
        // return;

        if (response.affectedRows) {

            // await handleEmail();

          return  resSend(res, true, 200, `DEMAND MANAGEMENT ${obj.status} successfully !`, null, null);
        } else {
            return resSend(res, false, 400, "something went wrong!", response, null);
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
let total_amount_result = await query({ query: total_amount_query, values: [req.query.po_no, req.query.line_item_no] });
total_amount_result = (total_amount_result[0].total_amount == null) ? 0 : total_amount_result[0].total_amount;
console.log("total_amount_result :" + total_amount_result);

const target_amount_query = `SELECT KTMNG AS target_amount from ekpo WHERE EBELN = ? AND EBELP = ?`;
let target_amount_result = await query({ query: target_amount_query, values: [req.query.po_no, req.query.line_item_no] });
target_amount_result = (target_amount_result[0].target_amount == null) ? 0 : target_amount_result[0].target_amount;
console.log("target_amount :" + target_amount_result);

const total_requested_amount_query = `SELECT SUM(request_amount) AS total_requested_amount from demande_management WHERE purchasing_doc_no = '${req.query.po_no}' AND line_item_no = ${req.query.line_item_no} AND status != 'RECEIVED'`;
let total_requested_amount_result = await query({ query: total_requested_amount_query, values: [] });
total_requested_amount_result = (total_requested_amount_result[0].total_requested_amount == null) ? 0 : total_requested_amount_result[0].total_requested_amount;
console.log("total_requested_amount_result :" + total_requested_amount_result);
      
const total_recived_amount_from_dm_table_query = `SELECT SUM(recived_quantity) AS total_recived_amount_from_dm_table from demande_management WHERE recived_quantity != ? AND purchasing_doc_no = ? AND line_item_no = ?`;
let total_recived_amount_from_dm_table_result = await query({ query: total_recived_amount_from_dm_table_query, values: [0, req.query.po_no, req.query.line_item_no] });
total_recived_amount_from_dm_table_result = (total_recived_amount_from_dm_table_result[0].total_recived_amount_from_dm_table == null) ? 0 : total_recived_amount_from_dm_table_result[0].total_recived_amount_from_dm_table;
console.log("total_recived_amount_from_dm_table_result :" + total_recived_amount_from_dm_table_result);


//return;
        const rest_amount = parseInt(target_amount_result) - (parseInt(total_amount_result) + parseInt(total_requested_amount_result) + parseInt(total_recived_amount_from_dm_table_result));
        // console.log(rest_amount);
        //   return;
        if (rest_amount) {
            return resSend(res, true, 200, "Rest Amount fetched succesfully!", {rest_amount : rest_amount}, null);
        } else {
            return resSend(res, false, 200, "something went wrong!", null, null);
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
