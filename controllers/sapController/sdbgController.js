const path = require('path');
const { resSend } = require("../../lib/resSend");
const { zfi_bgm_1_Payload } = require("../../services/sap.services");
const { SDBG_PAYMENT_ADVICE } = require('../../lib/tableName');
const { generateQuery, generateQueryArray } = require('../../lib/utils');
const { connection } = require('../../config/dbConfig');
// const mysql = require("mysql2/promise");
require("dotenv").config();

const { INSERT } = require('../../lib/constant');

exports.sdbgPaymentAdvice = async (req, res) => {

    //    http://10.13.1.38:4001/api/v1/po/qap
    const promiseConnection = await connection();
    try {
        if (!req.body) {
            resSend(res, false, 400, "Please send a valid payload.", null, null);
        }
        const payload = { ...req.body };
        const payloadObj = await zfi_bgm_1_Payload(payload);
        const { q, val } = await generateQueryArray(INSERT, SDBG_PAYMENT_ADVICE, payloadObj);
        const response = await promiseConnection.query(q, [val]);
        resSend(res, true, 200, "Data inserted successfully", response, null);
    } catch (err) {
        console.log("data not fetched", err);
        resSend(res, false, 500, "Internal server error", null, null);
    } finally {
        await promiseConnection.end();
    }

}