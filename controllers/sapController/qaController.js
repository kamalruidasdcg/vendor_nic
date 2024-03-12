
const { NEW_SDBG, MAKT, SDBG_PAYMENT_ADVICE, MSEG, MKPF, QALS, QAVE } = require('../../lib/tableName');
const { connection } = require("../../config/dbConfig");
const { INSERT } = require("../../lib/constant");
const { responseSend, resSend } = require("../../lib/resSend");
const { generateQueryArray, generateQuery, generateInsertUpdateQuery, generateQueryForMultipleData } = require("../../lib/utils");
const { qalsPayload, qavePayloadFn } = require('../../services/sap.qa.services');


const qals = async (req, res) => {
    console.log("qalssss");
    try {
        const promiseConnection = await connection();
        let tempPayload;
        if (req.body && Array.isArray(req.body)) {
            tempPayload = req.body.length > 0 ? req.body[0] : null;
        } else if (typeof req.body === 'object' && req.body) {
            tempPayload = req.body;
        }
        try {

            console.log("req.body", req.body);
            const { QAVE_LINE_ITEMS, ...payload } = tempPayload;

            if (!payload || !payload.PRUEFLOS) {
                return responseSend(res, "F", 400, "Please send a valid payload.", null, null);
            }

            const payloadObj = await qalsPayload(payload);
            const qalsInsertQuery = await generateInsertUpdateQuery(payloadObj, QALS, "PRUEFLOS");
            const response = await promiseConnection.execute(qalsInsertQuery);

            if (QAVE_LINE_ITEMS && Array.isArray(QAVE_LINE_ITEMS) && QAVE_LINE_ITEMS?.length) {
                const qavePayload = await qavePayloadFn(QAVE_LINE_ITEMS);
                const qaveInsertQuery = await generateQueryForMultipleData(qavePayload, QAVE, "c_pkey");
                const resp = await promiseConnection.execute(qaveInsertQuery);
            }

            // .execute(ekkoTableInsert["q"], ekkoTableInsert["val"])
            responseSend(res, "S", 200, "Data inserted successfully", response, null);
        } catch (err) {
            console.log("data not inserted", err);
            responseSend(res, "F", 500, "Internal server errorR", err, null);
        } finally {
            await promiseConnection.end();
        }
    } catch (error) {
        responseSend(res, "F", 500, "DB CONN ERROR", error, null);
    }

};

const qalsList = async (req, res) => {
    console.log("qalssss");
    try {
        const promiseConnection = await connection();
        // let payload;
        // if (req.body && Array.isArray(req.body)) {
        //     payload = req.body.length > 0 ? req.body[0] : null;
        // } else if (typeof req.body === 'object' && req.body) {
        //     payload = req.body;
        // }
        try {

            console.log("req.body", req.body);

            // if (!payload || !payload.PRUEFLOS) {
            //     responseSend(res, "0", 400, "Please send a valid payload.", null, null);
            // }

            // const payloadObj = await qalsPayload(payload);
            // const { q, val } = generateQuery(INSERT, QALS, payloadObj);
            // const qalsInsertQuery = await generateInsertUpdateQuery(payloadObj, QALS, "PRUEFLOS");

            // const response = await promiseConnection.query(q, [val]);

            let icgrnGetQuery =
                ` SELECT * 
                FROM qals WHERE 1 = 1`;
            if (req.body.PRUEFLOS) {
                icgrnGetQuery = icgrnGetQuery.concat(` AND PRUEFLOS = ${req.body.PRUEFLOS}`)
            }
            const response = await promiseConnection.execute(icgrnGetQuery);

            // .execute(ekkoTableInsert["q"], ekkoTableInsert["val"])
            responseSend(res, "S", 200, "Data fetch successfully", response, null);
        } catch (err) {
            console.log("data not inserted", err);
            responseSend(res, "F", 500, "Internal server errorR", err, null);
        } finally {
            await promiseConnection.end();
        }
    } catch (error) {
        responseSend(res, "0", 500, "DB CONN ERROR", error, null);
    }

};



module.exports = { qals, qalsList }