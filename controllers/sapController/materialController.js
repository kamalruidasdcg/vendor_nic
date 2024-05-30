
const { NEW_SDBG, MAKT, MARA, MSEG, MKPF } = require('../../lib/tableName');
const { connection } = require("../../config/dbConfig");
const { responseSend, resSend } = require("../../lib/resSend");
const { generateQueryForMultipleData, generateInsertUpdateQuery } = require("../../lib/utils");
const { getFilteredData } = require('../genralControlles');
const { msegPayload, makfPayload } = require("../../services/sap.material.services");
const { poolQuery, poolClient } = require('../../config/pgDbConfig');
const Message = require('../../utils/messages');


const makt = async (req, res) => {

    try {

        let insertPayload = {};
        const client = await poolClient();
        let transactionSuccessful = false;
        try {

            let payload;
            if (req.body && Array.isArray(req.body)) {
                payload = req.body.length > 0 ? req.body[0] : null;
            } else if (req.body && typeof req.body === 'object') {
                payload = req.body;
            }


            if (!payload || typeof payload !== 'object' || !Object.keys(payload)?.length || !payload.MATNR) {
                return responseSend(res, "F", 400, Message.INVALID_PAYLOAD, null, null);
            }

            // await client.beginTransaction();
            await client.query('BEGIN');


            insertPayload = {
                MATNR: payload.MATNR,
                SPRAS: payload.SPRAS || null,
                MAKTX: payload.MAKTX || null,
                MAKTG: payload.MAKTG || null,
            };

            const ekkoTableInsert = await generateInsertUpdateQuery(insertPayload, MAKT, ["MATNR"]);

            try {
                const results = await poolQuery({ client, query: ekkoTableInsert.q, values: ekkoTableInsert.val });
                console.log("results", results);

            } catch (error) {
                return responseSend(res, "F", 502, Message.DATA_INSERT_FAILED, error.toString(), null);
            }
            try {

                const maraTablePayload = {
                    MTART: payload.MTART,
                    MATNR: payload.MATNR
                };
                const maraTableInsert = await generateInsertUpdateQuery(maraTablePayload, MARA, ["MATNR"]);

                const results = await poolQuery({ client, query: maraTableInsert.q, values: maraTableInsert.val });

            } catch (error) {
                return responseSend(res, "F", 400, Message.DATA_INSERT_FAILED, error, null);
            }

            // await client.commit(); // Commit the transaction if everything was successful

            await client.query('COMMIT');

            transactionSuccessful = true;

            responseSend(res, "S", 200, Message.DATA_SEND_SUCCESSFULL, [], null);

        } catch (error) {
            responseSend(res, "F", 502, Message.DATA_INSERT_FAILED, error, null);
        }
        finally {
            if (!transactionSuccessful) {
                await client.query('ROLLBACK')
            }
            client.release();
        }
    } catch (error) {
        responseSend(res, "F", 500, Message.DB_CONN_ERROR, error, null);
    }
};


const mseg = async (req, res) => {

    try {
        const client = await poolClient();
        try {
            if (!req.body) {
                responseSend(res, "F", 400, Message.INVALID_PAYLOAD, null, null);
            }
            const payload = req.body;
            const payloadObj = await msegPayload(payload);
            const ekkoTableInsert = await generateQueryForMultipleData(payloadObj, "mseg", ["MBLNR", "MJAHR", "ZEILE"]);
            const response = await poolQuery({ client, query: ekkoTableInsert.q, values: ekkoTableInsert.val });
            responseSend(res, "S", 200, "Data inserted successfully !!", response, null);
        } catch (err) {
            responseSend(res, "F", 400, Message.DATA_INSERT_FAILED, err, null);
        } finally {
            client.release();
        }
    } catch (error) {
        responseSend(res, "F", 500, Message.DB_CONN_ERROR, error, null)
    }


};
const mkpf = async (req, res) => {

    try {
        const client = await poolClient();
        try {
            if (!req.body) {
                responseSend(res, "F", 400, Message.INVALID_PAYLOAD, null, null);
            }
            // const payload = req.body;

            let payload = [];
            if (req.body && Array.isArray(req.body)) {
                payload = req.body;
            } else if (payload && typeof req.body === 'object') {
                payload.push(req.body);
            }
            const payloadObj = await makfPayload(payload);
            console.log("payloadObj mkpf", payloadObj);

            const mkpfInsertQuery = await generateQueryForMultipleData(payloadObj, MKPF, ["MBLNR", "MJAHR"]);

            const response = await poolQuery({ client, query: mkpfInsertQuery.q, values: mkpfInsertQuery.val });
            responseSend(res, "S", 200, Message.DATA_SEND_SUCCESSFULL, response, null);
        } catch (err) {
            responseSend(res, "F", 502, Message.SERVER_ERROR, err, null);
        } finally {
            client.release();
        }

    } catch (error) {
        responseSend(res, "F", 500, Message.DB_CONN_ERROR, error, null)
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