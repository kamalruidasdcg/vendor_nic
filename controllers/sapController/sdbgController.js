
const { responseSend } = require("../../lib/resSend");
const { zfi_bgm_1_Payload } = require("../../services/sap.services");
const { SDBG_PAYMENT_ADVICE } = require('../../lib/tableName');
const { generateQueryArray } = require('../../lib/utils');
const { connection } = require('../../config/dbConfig');
// const mysql = require("mysql2/promise");

const { INSERT } = require('../../lib/constant');

const sdbgPaymentAdvice = async (req, res) => {

    //    http://10.13.1.38:4001/api/v1/po/qap
    const promiseConnection = await connection();
    try {
        if (!req.body) {
            responseSend(res, "0", 400, "Please send a valid payload.", null, null);
        }
        const payload = { ...req.body };
        const payloadObj = await zfi_bgm_1_Payload(payload);
        const { q, val } = await generateQueryArray(INSERT, SDBG_PAYMENT_ADVICE, payloadObj);
        const response = await promiseConnection.query(q, [val]);
        responseSend(res, "1", 200, "Data inserted successfully", response, null);
    } catch (err) {
        console.log("data not fetched", err);
        responseSend(res, "0", 500, "Internal server error", null, null);
    } finally {
        await promiseConnection.end();
    }

}



const ztfi_bil_deface = async (req, res) => {

    const promiseConnection = await connection();
    try {
        if (!req.body) {
            responseSend(res, "0", 400, "Please send a valid payload.", null, null);
        }
        const payload = { ...req.body };
        const payloadObj = await ztfi_bil_defacePayload(payload);
        const { q, val } = await generateQueryArray(INSERT, SDBG_PAYMENT_ADVICE, payloadObj);
        const response = await promiseConnection.query(q, [val]);
        if (response.affectedRows) {
            responseSend(res, "S", 200, "Data inserted successfully !!", response, null);
        } else {
            responseSend(res, "F", 400, "data insert filed !!", response, null);
        }
        // responseSend(res, "1", 200, "Data inserted successfully", response, null);
    } catch (err) {
        console.log("data not fetched", err);
        responseSend(res, "0", 500, "Internal server error", null, null);
    } finally {
        await promiseConnection.end();
    }

}

module.exports = { sdbgPaymentAdvice, ztfi_bil_deface }
