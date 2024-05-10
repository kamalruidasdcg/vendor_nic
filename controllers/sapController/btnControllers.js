// const { query,  } = require("../config/dbConfig");
const { connection } = require("../../config/dbConfig");
const { responseSend } = require("../../lib/resSend");
const { generateInsertUpdateQuery, generateQueryForMultipleData } = require("../../lib/utils");
const { zbtsLineItemsPayload, zbtsHeaderPayload } = require("../../services/sap.payment.services");


const zbts_st = async (req, res) => {

    try {

        const promiseConnection = await connection();
        let transactionSuccessful = false;

        try {
            if (!req.body || typeof req.body != 'object' || !Object.keys(req.body)?.length) {
                return responseSend(res, "F", 400, "Please send a valid payload.", null, null);
            }

            const payload = req.body;
            // console.log('zbts st payload', payload);
            if (!payload) {
                return responseSend(res, "F", 400, "Invalid payload.", null, null);
            }

            const { ZBTSM, zbtsm, ...obj } = payload;

            console.log("payloadObj", obj, ZBTSM, zbtsm);

            try {
                const payloadObj = await zbtsHeaderPayload(obj);
                const btnPaymentHeaderQuery = await generateInsertUpdateQuery(payloadObj, "zbts_st", "zbtno");
                const [results] = await promiseConnection.execute(btnPaymentHeaderQuery);
                console.log("results 1", results);
            } catch (error) {
                return responseSend(res, "F", 502, "Data insert failed !!", error, null);
            }
            const zbtsmPayload = ZBTSM || zbtsm;
            console.log("zbtsmPayload", zbtsmPayload);
            // const response1 = await query({ query: btnPaymentHeaderQuery, values: [] });
            if (zbtsmPayload) {

                // response2 = await query({ query: btnPaymentLineItemQuery, values: [] });

                try {
                    const lineItemPayloadObj = await zbtsLineItemsPayload(zbtsmPayload, obj);
                    const btnPaymentLineItemQuery = await generateQueryForMultipleData(lineItemPayloadObj, "zbtsm_st", "zbtno");
                    const [results] = await promiseConnection.execute(btnPaymentLineItemQuery);
                    console.log("results 2", results);
                } catch (error) {
                    return responseSend(res, "F", 502, "Data insert failed !!", error, null);
                }
            }

            console.log("transactionSuccessful", transactionSuccessful);
            
            const comm = await promiseConnection.commit(); // Commit the transaction if everything was successful
            transactionSuccessful = true;
            
            console.log("transactionSuccessful", transactionSuccessful);



            // console.log("response", response1, response1);

            // responseSend(res, "S", 200, "Data inserted successfully", response, null)

        } catch (error) {
            console.log("errorerrorerrorerror", error);
            responseSend(res, "F", 502, "Data insert failed !!", error, null);
        }
        finally {
            if (!transactionSuccessful) {
                console.log("Connection End", transactionSuccessful);
                await promiseConnection.rollback();
            }

            const connEnd = await promiseConnection.end();
            if (transactionSuccessful) {
                responseSend(res, "S", 200, "Data inserted successfully", null, null)
            }

            console.log("Connection End" + "--->" + "conn release", connEnd);
        }
    } catch (error) {
        responseSend(res, "F", 500, "Error in database conn!!", error, null);
    }
}



module.exports = { zbts_st }