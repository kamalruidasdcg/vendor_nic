const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT, UPDATE, USER_TYPE_PPNC_DEPARTMENT } = require("../../lib/constant");
const { DEMAND_MANAGEMENT, EKPO, EKKO } = require("../../lib/tableName");
const { PENDING, REJECTED, ACKNOWLEDGED, APPROVED, RE_SUBMITTED, CREATED, SUBMITTED, STATUS_RECEIVED } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const path = require('path');
const { create_reference_no, get_latest_activity } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { getFilteredData, updatTableData, insertTableData } = require("../genralControlles");


const insert = async (req, res) => {

    // return resSend(res, true, 200, "inserted!", req.body, null);

    try {

 
        const tokenData = { ...req.tokenData };
        const obj = { ...req.body };

        if (!obj.purchasing_doc_no || !obj.status) {
        //     // const directory = path.join(__dirname, '..', 'uploads', lastParam);
        //     // const isDel = handleFileDeletion(directory, req.file.filename);
            return resSend(res, false, 200, "Please send valid payload", null, null);
        }

        if (tokenData.user_type == 1) {
            return resSend(res, false, 200, "Please login as GRSE users!", null, null);
        }

        const checkDo = await checkIsDealingOfficer(obj.purchasing_doc_no, tokenData.vendor_code);
        if(checkDo == 1) {
            return resSend(res, false, 200, "Do can not raise demand!", null, null);
        }
        

        if (obj.status != SUBMITTED && obj.status != STATUS_RECEIVED) {
            // console.log();
            return resSend(res, false, 200, "Please send a valid action type!", null, null);
        }

        let payload;

        if(obj.status == SUBMITTED) {
            
            if(!obj.action_type || obj.action_type == "") {
                return resSend(res, false, 200, "please send a valid action_type!", null, null);
            }
            // if(!obj.request_amount || obj.request_amount < 0) {
            //     return resSend(res, false, 200, "please send a valid request_amount!", null, null);
            // }
            let reference_no = await create_reference_no("DM", tokenData.vendor_code);

            obj.request_amount = 0;
            obj.recived_quantity = 0;

            payload = {...obj,reference_no:reference_no,demand:JSON.stringify(obj.demand), created_at:getEpochTime(),created_by_id : tokenData.vendor_code,remarks:obj.remarks};

        } else if(obj.status == STATUS_RECEIVED) {
            
            if(!obj.reference_no || obj.reference_no == "") {
                return resSend(res, false, 200, "please send reference_no!", null, null);
            }
            // if(!obj.recived_quantity || obj.recived_quantity < 0) {
            //     return resSend(res, false, 200, "please send a valid recived_quantity!", null, null);
            // }

            let last_data = await get_latest_activity(DEMAND_MANAGEMENT, obj.purchasing_doc_no, obj.reference_no);
            if (last_data) {
                delete last_data.id;
                last_data.request_amount = 0;
                last_data.recived_quantity = 0;
                last_data.demand = JSON.stringify(obj.demand);
                payload = {...last_data, status: obj.status, remarks:obj.remarks,created_at : getEpochTime(),created_by_id : tokenData.vendor_code};         

            } else {
                return resSend(res, false, 200, `No record found with this reference_no!`, null, null);
            }
        }

        console.log(payload);
      // return;
    //   let { q, val } =
    //   obj.status == STATUS_RECEIVED
    //         ? generateQuery(UPDATE, DEMAND_MANAGEMENT, payload, whereCondition)
    //         : generateQuery(INSERT, DEMAND_MANAGEMENT, payload);

    //         const response = await query({ query: q, values: val });
    //     // console.log("payload_00________________");
    //     // console.log(q);
    //     // return;

    let { q, val } = generateQuery(INSERT, DEMAND_MANAGEMENT, payload);
    const response = await query({ query: q, values: val });
        if (response.affectedRows) {

            // await handleEmail();

          return  resSend(res, true, 200, `DEMAND MANAGEMENT ${obj.status} successfully !`, response, null);
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

const checkIsDealingOfficer = async (purchasing_doc_no, vendor_code) => {
    console.log([purchasing_doc_no, vendor_code]);
    console.log("#$%^&*");
    const getQuery = `SELECT COUNT(EBELN) AS man_no FROM ${EKKO} WHERE EBELN = ? AND ERNAM = ?`;
    const result = await query({
      query: getQuery,
      values: [purchasing_doc_no, vendor_code],
    });
    return result[0].man_no;
  };


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
        const get_data_query = `SELECT TXZ01 AS description, MATNR AS matarial_code, MEINS AS unit, MENGE AS target_amount, NETPR AS po_rate from ${EKPO} WHERE EBELN = ? AND EBELP = ?`;
        let get_data_result = await query({ query: get_data_query, values: [req.query.po_no, req.query.line_item_no] });
        // console.log(get_data_result);
        // return;
        const total_amount_query = `SELECT SUM(MENGE) AS total_amount from mseg WHERE EBELN = ? AND EBELP = ?`;
        let total_amount_result = await query({ query: total_amount_query, values: [req.query.po_no, req.query.line_item_no] });
        total_amount_result = (total_amount_result[0].total_amount == null) ? 0 : total_amount_result[0].total_amount;
        console.log("total_amount_result :" + total_amount_result);

        // const target_amount_query = `SELECT KTMNG AS target_amount from ekpo WHERE EBELN = ? AND EBELP = ?`;
        // let target_amount_result = await query({ query: target_amount_query, values: [req.query.po_no, req.query.line_item_no] });
        // target_amount_result = (target_amount_result[0].target_amount == null) ? 0 : target_amount_result[0].target_amount;
        // console.log("target_amount :" + target_amount_result);

        let target_amount_result = (get_data_result[0].target_amount) ? get_data_result[0].target_amount : 0;

        // const total_requested_amount_query = `SELECT SUM(request_amount) AS total_requested_amount from demande_management WHERE purchasing_doc_no = '${req.query.po_no}' AND line_item_no = ${req.query.line_item_no} AND status = '${SUBMITTED}'`;
        // let total_requested_amount_result = await query({ query: total_requested_amount_query, values: [] });
        // total_requested_amount_result = (total_requested_amount_result[0].total_requested_amount == null) ? 0 : total_requested_amount_result[0].total_requested_amount;
        // console.log("total_requested_amount_result :" + total_requested_amount_result);
            
        // const total_recived_amount_from_dm_table_query = `SELECT SUM(recived_quantity) AS total_recived_amount_from_dm_table from demande_management WHERE purchasing_doc_no = ? AND line_item_no = ? AND status = ?  `;
        // let total_recived_amount_from_dm_table_result = await query({ query: total_recived_amount_from_dm_table_query, values: [req.query.po_no, req.query.line_item_no, STATUS_RECEIVED] });
        // total_recived_amount_from_dm_table_result = (total_recived_amount_from_dm_table_result[0].total_recived_amount_from_dm_table == null) ? 0 : total_recived_amount_from_dm_table_result[0].total_recived_amount_from_dm_table;
        // console.log("total_recived_amount_from_dm_table_result :" + total_recived_amount_from_dm_table_result);

        // const total_recived_amount_from_dm_table_query = `SELECT demand from demande_management WHERE purchasing_doc_no = ? AND status = ?  `;
        // let total_recived_amount_from_dm_table_result = await query({ query: total_recived_amount_from_dm_table_query, values: [req.query.po_no, STATUS_RECEIVED] });
        // console.log(total_recived_amount_from_dm_table_result);
        // let recived_amount_from_dm_table = 0;
        // total_recived_amount_from_dm_table_result.map( (item) => {
        //     let datas = JSON.parse(item.demand);
        //     const find_line_item_no = datas.find(({ line_item_no }) => line_item_no == req.query.line_item_no);
        //     if(find_line_item_no) {
        //         console.log(find_line_item_no.recived_quantity);
        //         recived_amount_from_dm_table += parseInt(find_line_item_no.recived_quantity);
        //     } 
        // });

        //const rest_amount = parseInt(target_amount_result) - (parseInt(total_amount_result) + parseInt(recived_amount_from_dm_table));
        const rest_amount = parseInt(target_amount_result) - parseInt(total_amount_result);
     
        if (rest_amount) {
            const resData = get_data_result[0];
            resData.rest_amount = (rest_amount < 0) ? 0 : rest_amount;
            return resSend(res, true, 200, "Rest Amount fetched succesfully!", resData, null);
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
