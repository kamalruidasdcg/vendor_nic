
const { NEW_SDBG, MAKT, MARA, MSEG, MKPF } = require('../../lib/tableName');
const { connection } = require("../../config/dbConfig");
const { INSERT } = require("../../lib/constant");
const { responseSend, resSend } = require("../../lib/resSend");
const { generateQuery, generateQueryArray } = require("../../lib/utils");
const { getFilteredData } = require('../genralControlles');
const { msegPayload, makfPayload } = require("../../services/sap.material.services")


const makt = async (req, res) => {
    let insertPayload = {};

    try {

        const promiseConnection = await connection();
        let transactionSuccessful = false;

        try {

            let payload = req.body;

            console.log("payload ---makt", payload);

            if (Array.isArray(req.body)) {
                payload = req.body.length > 0 ? req.body[0] : null;
            } else if (typeof req.body === 'object' && req.body !== null) {
                payload = req.body;
            }


            if (!payload || typeof payload !== 'object' || !Object.keys(payload).length) {
                return responseSend(res, "0", 400, "INVALID PAYLOAD", null, null);
            }

            await promiseConnection.beginTransaction();

            insertPayload = {
                MATNR: payload.MATNR || null,
                SPRAS: payload.SPRAS || null,
                MAKTX: payload.MAKTX || null,
                MAKTG: payload.MAKTG || null,
            };

            const ekkoTableInsert = generateQuery(INSERT, MAKT, insertPayload);

            try {
                const [results] = await promiseConnection.execute(ekkoTableInsert["q"], ekkoTableInsert["val"]);
            console.log("results", results);
            
            } catch (error) {
                return responseSend(res, "0", 502, "Data insert failed !!", error, null);
            }
            try {

                const maraTablePayload = {
                    MTART: payload.MTART,
                    MATNR: payload.MATNR
                }
                const maraTableInsert = generateQuery(INSERT, MARA, maraTablePayload);

                const [results] = await promiseConnection.execute(maraTableInsert["q"], maraTableInsert["val"]);
                console.log("results", results);
            
            } catch (error) {
                return responseSend(res, "0", 502, "Data insert failed !!", error, null);
            }

            await promiseConnection.commit(); // Commit the transaction if everything was successful
            transactionSuccessful = true;

            return responseSend(res, "1", 200, "data insert succeed.", [], null);

        } catch (error) {
            responseSend(res, "0", 502, "Data insert failed !!", error, null);
        }
        finally {
            if (!transactionSuccessful) {
                await promiseConnection.rollback();
            }
            const connEnd = await promiseConnection.end();
            console.log("Connection End" + "--->" + "connection release");
        }
    } catch (error) {
        responseSend(res, "0", 400, "Error in database conn!!", error, null);
    }
};
const mseg = async (req, res) => {

    const promiseConnection = await connection();
    try {
        if (!req.body) {
            responseSend(res, "0", 400, "Please send a valid payload.", null, null);
        }
        const payload = req.body;

        const payloadObj = await msegPayload(payload);
        const { q, val } = await generateQueryArray(INSERT, MSEG, payloadObj);

        const response = await promiseConnection.query(q, [val]);
        console.log("response", response);
        responseSend(res, "1", 200, "Data inserted successfully", response, null);
    } catch (err) {
        console.log("data not inserted", err);
        responseSend(res, "0", 500, "Internal server errorR", err, null);
    } finally {
        await promiseConnection.end();
    }


};
const mkpf = async (req, res) => {

    const promiseConnection = await connection();
    try {
        if (!req.body) {
            responseSend(res, "0", 400, "Please send a valid payload.", null, null);
        }
        const payload = req.body;

        const payloadObj = await makfPayload(payload);
        const { q, val } = await generateQueryArray(INSERT, MKPF, payloadObj);

        const response = await promiseConnection.query(q, [val]);
        responseSend(res, "1", 200, "Data inserted successfully", response, null);
    } catch (err) {
        console.log("data not inserted", err);
        responseSend(res, "0", 500, "Internal server errorR", err, null);
    } finally {
        await promiseConnection.end();
    }


};




const list = async (req, res) => {

    req.query.$tableName = NEW_SDBG;

    try {

        getFilteredData(req, res);
    } catch (err) {
        console.log("data not fetched", err);
        resSend(res, false, 500, "Internal server error", null, null);
    }

}


module.exports = { list, makt, mseg, mkpf }