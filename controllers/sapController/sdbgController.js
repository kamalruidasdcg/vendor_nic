const path = require('path');
const { resSend } = require("../../lib/resSend");
const { zfi_bgm_1_Payload } = require("../../services/sap.services");
const { SDBG_PAYMENT_ADVICE } = require('../../lib/tableName');
const { generateQuery } = require('../../lib/utils');
const { query } = require('../../config/dbConfig');
const { INSERT } = require('../../lib/constant');

exports.sdbgPaymentAdvice = async (req, res) => {

    http://10.13.1.38:4001/api/v1/po/qap
    try {
        if(!req.body) {
            resSend(res, false, 400, "Please send a valid payload.", null, null);
        }
        const payload = { ...req.body};
    
        const insertObj = await zfi_bgm_1_Payload(payload);
        
        const { q, val } = generateQuery(INSERT, SDBG_PAYMENT_ADVICE, insertObj);;
        const response = await query({ query: q, values: val });

        resSend(res, true, 200, "Data fetched successfully", response, null);
    } catch (err) {
        console.log("data not fetched", err);
        resSend(res, false, 500, "Internal server error", null, null);
    }

}