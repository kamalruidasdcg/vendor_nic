const path = require('path');
const { resSend } = require("../../lib/resSend");
const { zfi_bgm_1_Payload } = require("../../services/sap.services");
const { SDBG_PAYMENT_ADVICE } = require('../../lib/tableName');
const { generateQuery, generateQueryArray } = require('../../lib/utils');
const { query } = require('../../config/dbConfig');
const { INSERT } = require('../../lib/constant');

exports.sdbgPaymentAdvice = async (req, res) => {

//    http://10.13.1.38:4001/api/v1/po/qap
    try {
        if(!req.body) {
            resSend(res, false, 400, "Please send a valid payload.", null, null);
        }
        const payload = req.body;
    
        const arrayOfObject = await zfi_bgm_1_Payload(payload);
       const { q, val } = await generateQueryArray(INSERT, SDBG_PAYMENT_ADVICE, arrayOfObject);
       console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQ");
        console.log(q);
        console.log("uukufj");
        console.log(val);

       // return;
        const response = await query({ query: q, values: [val] });

        resSend(res, true, 200, "Data inserted successfully", response, null);
    } catch (err) {
        console.log("data not fetched", err);
        resSend(res, false, 500, "Internal server error", null, null);
    }

}