const path = require('path');
const { resSend } = require("../../lib/resSend");
const { zfi_bgm_1_Payload } = require("../../services/sap.services");
const { SDBG_PAYMENT_ADVICE } = require('../../lib/tableName');
const { generateQuery, generateQueryArray } = require('../../lib/utils');
const { query } = require('../../config/dbConfig');
const mysql = require("mysql2/promise");
require("dotenv").config();

const { INSERT } = require('../../lib/constant');

exports.sdbgPaymentAdvice = async (req, res) => {

//    http://10.13.1.38:4001/api/v1/po/qap
    try {
        const connObj = {
            host: process.env.DB_HOST_ADDRESS,
            port: process.env.DB_CONN_PORT,
            user: process.env.DB_USER,
            password: "",
            database: process.env.DB_NAME,
        }

        const promiseConnection = await mysql.createConnection(connObj);

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
        let dd = `INSERT INTO zfi_bgm_1 (FILE_NO,BANKERS_NAME) VALUES ?`;

       // return;
       // const response = await query({ query: q, values: [val] });

       const response = await promiseConnection.query(dd, [val]);

        resSend(res, true, 200, "Data inserted successfully", response, null);
    } catch (err) {
        console.log("data not fetched", err);
        resSend(res, false, 500, "Internal server error", null, null);
    }

}