const { asyncPool, poolQuery, poolClient } = require("../../config/pgDbConfig");
const { UPDATE } = require("../../lib/constant");
const { responseSend } = require("../../lib/resSend");
const { generateInsertUpdateQuery, generateQueryForMultipleData, generateQuery } = require("../../lib/utils");
const { zbtsLineItemsPayload, zbtsHeaderPayload } = require("../../services/sap.payment.services");
const Message = require("../../utils/messages");

const zbts_st = async (req, res) => {

    try {

        const client = await poolClient();
        // let transactionSuccessful = false;

        try {
            if (!req.body || typeof req.body != 'object' || !Object.keys(req.body)?.length) {
                return responseSend(res, "F", 400, Message.INVALID_PAYLOAD, null, null);
            }

            const payload = req.body;
            // console.log('zbts st payload', payload);
            if (!payload) {
                return responseSend(res, "F", 400, "Invalid payload.", null, null);
            }

            const { ZBTSM, zbtsm, ...obj } = payload;
            let payloadObj = {};

            // console.log("payloadObj", obj, ZBTSM, zbtsm);

            try {
                payloadObj = await zbtsHeaderPayload(obj);
                const btnPaymentHeaderQuery = await generateInsertUpdateQuery(payloadObj, "zbts_st", ["zbtno"]);
                const results = await poolQuery({ client, query: btnPaymentHeaderQuery.q, values: btnPaymentHeaderQuery.val });
                console.log("results 1", results);
            } catch (error) {
                console.log("Data insert failed, zbts_st api");
                return responseSend(res, "F", 400, Message.DATA_INSERT_FAILED, error.message, null);
            }
            const zbtsmPayload = ZBTSM || zbtsm;
            // console.log("zbtsmPayload", zbtsmPayload);
            // const response1 = await query({ query: btnPaymentHeaderQuery, values: [] });
            if (zbtsmPayload) {

                // response2 = await query({ query: btnPaymentLineItemQuery, values: [] });

                try {
                    const lineItemPayloadObj = await zbtsLineItemsPayload(zbtsmPayload, obj);
                    const btnPaymentLineItemQuery = await generateQueryForMultipleData(lineItemPayloadObj, "zbtsm_st", ["zbtno", "srno"]);
                    const results = await poolQuery({ client, query: btnPaymentLineItemQuery.q, values: btnPaymentLineItemQuery.val });
                    console.log("results 2", results);
                } catch (error) {
                    // return responseSend(res, "F", 502, "Data insert failed !!", error, null);
                    console.log("Data insert failed, zbts_st api");
                    return responseSend(res, "F", 400, Message.DATA_INSERT_FAILED, error.toString(), null);

                }
            }

            await updateBtnListTable(client, payloadObj);

            // console.log("transactionSuccessful", transactionSuccessful);

            // const comm = await client.query('COMMIT'); // Commit the transaction if everything was successful
            // transactionSuccessful = true;

            // console.log("transactionSuccessful", transactionSuccessful);



            // console.log("response", response1, response1);

            responseSend(res, "S", 200, "Data inserted successfully", {}, null)

        } catch (error) {
            console.log("errorerrorerrorerror", error.message);
            responseSend(res, "F", 502, Message.SERVER_ERROR, error.toString(), null);
        }
        finally {
            client.release();
        }
    } catch (error) {
        responseSend(res, "F", 500, Message.DB_CONN_ERROR, error.message, null);
    }
}


const updateBtnListTable = async (client, data) => {
    try {
        // const btnListPayload = { btn_num: data.zbtno, status: data.dstatus };
        const statusObj = {
            "1": "RECEIVED",
            "2": "REJECTED",
            "3": "APPROVE",
            "4" :"BANK",
            "5": "D-RETURN"
        }
        const { q, val } = generateQuery(UPDATE, 'btn_list', { status: statusObj[data.fstatus] || "" }, { btn_num: data.zbtno })
        await poolQuery({ client, query: q, values: val });
    } catch (error) {
        throw error;
    }
}



module.exports = { zbts_st }