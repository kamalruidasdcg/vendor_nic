
const { responseSend } = require("../../lib/resSend");
const { zfi_bgm_1_Payload, ztfi_bil_defacePayload, zfi_bgm_1_Payload_sap } = require("../../services/sap.services");
const { SDBG_PAYMENT_ADVICE } = require('../../lib/tableName');
const { generateQueryArray, generateInsertUpdateQuery, generateQueryForMultipleData } = require('../../lib/utils');
const { INSERT } = require('../../lib/constant');
const { query } = require("../../config/pgDbConfig");
const Message = require('../../utils/messages');

const sdbgPaymentAdvice = async (req, res) => {

    //    http://10.13.1.38:4001/api/v1/po/qap
    // const client = await poolClient();
    try {
        if (!req.body) {
            return responseSend(res, "F", 400, "Please send a valid payload.", null, null);
        }
        const payload = { ...req.body };
        const payloadObj = await zfi_bgm_1_Payload_sap(payload);
        console.log("payloadObj", payloadObj);
        // const { q, val } = await generateQueryArray(INSERT, SDBG_PAYMENT_ADVICE, payloadObj);
        const queryText = await generateInsertUpdateQuery(payloadObj, SDBG_PAYMENT_ADVICE, ["FILE_NO", "REF_NO"])
        console.log(q);
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

module.exports = { sdbgPaymentAdvice, ztfi_bil_deface }
