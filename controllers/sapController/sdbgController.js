
const { responseSend, resSend } = require("../../lib/resSend");
const { zfi_bgm_1_Payload, ztfi_bil_defacePayload, zfi_bgm_1_Payload_sap } = require("../../services/sap.services");
const { SDBG_PAYMENT_ADVICE, PAYMENTADVICE, PAYMENT_ADVICE2 } = require('../../lib/tableName');
const { generateQueryArray, generateInsertUpdateQuery, generateQueryForMultipleData } = require('../../lib/utils');
const { INSERT } = require('../../lib/constant');
const { query, getQuery } = require("../../config/pgDbConfig");
const Message = require('../../utils/messages');
const { update_in_all_obps_sdbgs_table } = require("../poController/sdbgController");

const sdbgPaymentAdvice = async (req, res) => {

    //    http://10.13.1.38:4001/api/v1/po/qap
    // const client = await poolClient();
    try {
        if (!req.body) {
            return responseSend(res, "F", 400, "Please send a valid payload.", null, null);
        }
        const payload = { ...req.body };
        await update_in_all_obps_sdbgs_table(payload);
        const payloadObj = await zfi_bgm_1_Payload_sap(payload);
        console.log("payloadObj", payloadObj);
        // const { q, val } = await generateQueryArray(INSERT, SDBG_PAYMENT_ADVICE, payloadObj);
        const queryText = await generateInsertUpdateQuery(payloadObj, SDBG_PAYMENT_ADVICE, ["FILE_NO", "REF_NO"])
        // console.log(q);
        const response = await query({ query: queryText.q, values: queryText.val });
        responseSend(res, "S", 200, Message.DATA_SEND_SUCCESSFULL, response, null);
    } catch (err) {
        console.log("data not fetched", err);
        responseSend(res, "F", 500, Message.DATA_INSERT_FAILED, null, null);
    } finally {
        // client.release();
    }

}



const ztfi_bil_deface = async (req, res) => {

    try {
        if (!req.body) {
            responseSend(res, "F", 400, "Please send a valid payload.", null, null);
        }
        const payload = { ...req.body };
        const payloadObj = await ztfi_bil_defacePayload(payload);
        const { q, val } = await generateQueryForMultipleData(payloadObj, SDBG_PAYMENT_ADVICE, ["id"]);
        const response = await query({ query: q, values: val });
        responseSend(res, "S", 200, "Data inserted successfully !!", response, null);
        // responseSend(res, "1", 200, "Data inserted successfully", response, null);
    } catch (err) {
        console.log("data not fetched", err);
        responseSend(res, "F", 500, Message.SERVER_ERROR, null, null);
    } finally {
        // client.release();
    }

}

const bgList = async (req, res) => {


    try {
        filterBy = req.body;

        let { startDate, endDate, page, limit } = filterBy;
        delete filterBy.startDate;
        delete filterBy.endDate;
        delete filterBy.page;
        delete filterBy.limit;
        delete filterBy.groupBy;
        let tableName = SDBG_PAYMENT_ADVICE;
        let baseQuery = `SELECT  * FROM ${tableName}`

        let condQuery = " ";
        let count = 0;
        let val = [];
        let filterQuery = "";
        if (Object.keys(filterBy).length > 0) {
            filterQuery += " WHERE ";
            const conditions = Object.keys(filterBy).map((key, index) => {
                val.push(filterBy[key]);

                if (index > 0) {
                    return `AND ${key} = $${++count}`;
                } else {
                    return `${key} = $${++count}`;
                }
            });
            condQuery += conditions.join(" ");
        }

        if (startDate && !endDate) {
            condQuery = condQuery.concat(` AND bg_date >= $${++count}`)
            val.push(startDate);
        }
        if (!startDate && endDate) {
            condQuery = condQuery.concat(` AND bg_date <= $${++count}`)
            val.push(endDate);
        }
        if (startDate && endDate) {
            condQuery = condQuery.concat(` AND ( bg_date BETWEEN $${++count} AND $${++count} )`)
            val.push(startDate, endDate);
        }

        filterQuery += condQuery;

        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 10;
        const offSet = (page - 1) * limit;

        const pageinatonQ = ` LIMIT ${limit} OFFSET ${offSet}`;
        const orderByQ = ` ORDER BY bg_date DESC`;

        filterQuery += orderByQ;
        filterQuery += pageinatonQ;
        baseQuery += filterQuery;

        const result = await getQuery({ query: baseQuery, values: val });

        resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, result, null);

    } catch (error) {
        resSend(res, false, 500, Message.SERVER_ERROR, error.message, null);
    }
}


module.exports = { sdbgPaymentAdvice, ztfi_bil_deface, bgList }
