
const { NEW_SDBG, MAKT, MARA, MSEG, MKPF } = require('../../lib/tableName');
const { connection } = require("../../config/dbConfig");
const { responseSend, resSend } = require("../../lib/resSend");
const { generateQueryForMultipleData, generateInsertUpdateQuery } = require("../../lib/utils");
const { getFilteredData } = require('../genralControlles');
const { msegPayload, makfPayload } = require("../../services/sap.material.services")


const makt = async (req, res) => {
    let insertPayload = {};

    try {

        const promiseConnection = await connection();
        let transactionSuccessful = false;

        try {

            let payload;

            console.log("payload ---makt", req.body);

            if (req.body && Array.isArray(req.body)) {
                payload = req.body.length > 0 ? req.body[0] : null;
            } else if (req.body && typeof req.body === 'object') {
                payload = req.body;
            }


            if (!payload || typeof payload !== 'object' || !Object.keys(payload)?.length || !payload.MATNR) {
                return responseSend(res, "F", 400, "INVALID PAYLOAD", null, null);
            }

            await promiseConnection.beginTransaction();


            insertPayload = {
                MATNR: payload.MATNR,
                SPRAS: payload.SPRAS || null,
                MAKTX: payload.MAKTX || null,
                MAKTG: payload.MAKTG || null,
            };

            const ekkoTableInsert = await generateInsertUpdateQuery(insertPayload, MAKT, "MATNR");

            console.log(ekkoTableInsert, 'ekkoTableInsert');
            // const ekkoTableInsert = generateQuery(INSERT, MAKT, insertPayload);

            try {
                const [results] = await promiseConnection.execute(ekkoTableInsert);
                console.log("results", results);

            } catch (error) {
                return responseSend(res, "F", 502, "Data insert failed !!", error, null);
            }
            try {

                const maraTablePayload = {
                    MTART: payload.MTART,
                    MATNR: payload.MATNR
                };
                const maraTableInsert = await generateInsertUpdateQuery(maraTablePayload, MARA, "MATNR");

                const [results] = await promiseConnection.execute(maraTableInsert);
                console.log("results", results);

            } catch (error) {
                return responseSend(res, "F", 502, "Data insert failed !!", error, null);
            }

            await promiseConnection.commit(); // Commit the transaction if everything was successful
            transactionSuccessful = true;

            return responseSend(res, "1", 200, "data insert succeed.", [], null);

        } catch (error) {
            console.log("[[[1]]]]");
            responseSend(res, "F", 502, "Data insert failed !!", error, null);
        }
        finally {
            if (!transactionSuccessful) {

                console.log("[[[2]]]]");
                await promiseConnection.rollback();
            }
            const connEnd = await promiseConnection.end();
            console.log("Connection End" + "--->" + "connection release");
        }
    } catch (error) {

        console.log("[[[3]]]]");

        responseSend(res, "F", 400, "Error in database conn!!", error, null);
    }
};


const mseg = async (req, res) => {

    const promiseConnection = await connection();
    try {
        if (!req.body) {
            responseSend(res, "F", 400, "Please send a valid payload.", null, null);
        }
        const payload = req.body;
        console.log("payload mseg", payload);


        // insertPayload = await msegPayload (obj);
        // console.log(insertPayload, "jjjjjjjjjjjjj");


        const payloadObj = await msegPayload(payload);
        const ekkoTableInsert = await generateQueryForMultipleData(payloadObj, "mseg", "C_PKEY");
        // const { q, val } = await generateQueryArray(INSERT, MSEG, payloadObj);

        const [response] = await promiseConnection.query(ekkoTableInsert);
        console.log("response", response);

        if (response.affectedRows) {
            responseSend(res, "S", 200, "Data inserted successfully !!", response, null);
        } else {
            responseSend(res, "F", 400, "data insert filed !!", response, null);
        }

        // responseSend(res, "1", 200, "Data inserted successfully", response, null);
    } catch (err) {
        console.log("data not inserted", err);
        responseSend(res, "F", 500, "Internal server errorR", err, null);
    } finally {
        await promiseConnection.end();
    }


};
const mkpf = async (req, res) => {

    const promiseConnection = await connection();
    try {
        if (!req.body) {
            responseSend(res, "F", 400, "Please send a valid payload.", null, null);
        }
        // const payload = req.body;

        let payload = [];
        if (req.body && Array.isArray(req.body)) {
            payload = req.body;
        } else if (payload && typeof req.body === 'object') {
            payload.push(req.body);
        }

        console.log("mkpf", req.body);



        const payloadObj = await makfPayload(payload);
        console.log("payloadObj mkpf", payloadObj);

        const mkpfInsertQuery = await generateQueryForMultipleData(payloadObj, MKPF, "C_PKEY");

        const [response] = await promiseConnection.query(mkpfInsertQuery);
        console.log("response mkpf", response);
        if (response.affectedRows) {
            responseSend(res, "S", 200, "Data inserted successfully !!", response, null);
        } else {
            responseSend(res, "F", 400, "data insert filed !!", response, null);
        }
        // responseSend(res, "1", 200, "Data inserted successfully", response, null);
    } catch (err) {
        console.log("data not inserted", err);
        responseSend(res, "F", 500, "Internal server errorR", err, null);
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