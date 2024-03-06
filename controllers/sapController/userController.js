
const { RESERVATION_RKPF_TABLE, RESERVATION_RESB_TABLE } = require('../../lib/tableName');
const { connection } = require("../../config/dbConfig");
const { responseSend } = require("../../lib/resSend");
const { generateInsertUpdateQuery, generateQueryForMultipleData } = require("../../lib/utils");
const { reservationLineItemPayload, reservationHeaderPayload } = require('../../services/sap.user.services');
const { TRUE, FALSE } = require('../../lib/constant');

// PAYLOAD //

const reservation = async (req, res) => {
    let payload = {};

    try {
        const promiseConnection = await connection();
        let transactionSuccessful = false;
        if (Array.isArray(req.body)) {
            payload = req.body.length > 0 ? req.body[0] : null;
        } else if (typeof req.body === 'object' && req.body !== null) {
            payload = req.body;
        }
        const { RESB, ...obj } = payload;

        console.log("RESB", RESB);
        console.log("obj", obj);

        try {

            if (!obj || typeof obj !== 'object' || !Object.keys(obj).length || !obj.RSNUM) {
                return responseSend(res, "F", 400, "INVALID PAYLOAD", null, null);
            }
            await promiseConnection.beginTransaction();

            try {
                const rkpfPayload = await reservationHeaderPayload(obj);
                const rkpfTableInsert = await generateInsertUpdateQuery(rkpfPayload, RESERVATION_RKPF_TABLE, "RSNUM");
                console.log("rkpfTableInsert", rkpfTableInsert);
                const [results] = await promiseConnection.execute(rkpfTableInsert);
                console.log("results", results);
            } catch (error) {
                return responseSend(res, "F", 502, "Data insert failed !!", error, null);
            }

            if (RESB?.length) {
                try {
                    const resbPayload = await reservationLineItemPayload(RESB);
                    console.log('ekpopayload', resbPayload);
                    const insert_resb_table = await generateQueryForMultipleData(resbPayload, RESERVATION_RESB_TABLE, "C_PKEY");
                    const [results] = await promiseConnection.execute(insert_resb_table);
                    console.log("results", results);

                } catch (error) {
                    console.log("error, resb milestone", error);
                }
            }

            const comm = await promiseConnection.commit(); // Commit the transaction if everything was successful
            transactionSuccessful = true;

        } catch (error) {
            responseSend(res, "F", 502, "Data insert failed !!", error, null);
        }
        finally {
            if (transactionSuccessful === FALSE) {
                console.log("transactionSuccessful End" + "--->", transactionSuccessful);
                await promiseConnection.rollback();
            }
            const connEnd = await promiseConnection.end();

            if (transactionSuccessful === TRUE) {
                responseSend(res, "S", 200, "data insert succeed", null, null);
            }

            console.log("Connection End" + "--->" + "connection relaease reservation");
        }
    } catch (error) {
        responseSend(res, "0", 400, "Error in database conn!!", error, null);
    }
};

module.exports = { reservation }