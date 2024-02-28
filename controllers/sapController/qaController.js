
const { NEW_SDBG, MAKT, SDBG_PAYMENT_ADVICE, MSEG, MKPF, QALS } = require('../../lib/tableName');
const { connection } = require("../../config/dbConfig");
const { INSERT } = require("../../lib/constant");
const { responseSend, resSend } = require("../../lib/resSend");
const { generateQueryArray, generateQuery, generateInsertUpdateQuery } = require("../../lib/utils");
const { qalsPayload } = require('../../services/sap.qa.services');


const qals = async (req, res) => {
    console.log("qalssss");
    try {
        const promiseConnection = await connection();
        let payload;
        if (req.body && Array.isArray(req.body)) {
            payload = req.body.length > 0 ? req.body[0] : null;
        } else if (typeof req.body === 'object' && req.body) {
            payload = req.body;
        }
        try {

            console.log("req.body", req.body);

            if (!payload || !payload.PRUEFLOS) {
                responseSend(res, "0", 400, "Please send a valid payload.", null, null);
            }

            const payloadObj = await qalsPayload(payload);
            // const { q, val } = generateQuery(INSERT, QALS, payloadObj);
            const qalsInsertQuery = await generateInsertUpdateQuery(payloadObj, QALS, "PRUEFLOS");

            // const response = await promiseConnection.query(q, [val]);
            const response = await promiseConnection.execute(qalsInsertQuery);

            // .execute(ekkoTableInsert["q"], ekkoTableInsert["val"])
            responseSend(res, "1", 200, "Data inserted successfully", response, null);
        } catch (err) {
            console.log("data not inserted", err);
            responseSend(res, "0", 500, "Internal server errorR", err, null);
        } finally {
            await promiseConnection.end();
        }
    } catch (error) {
        responseSend(res, "0", 500, "DB CONN ERROR", error, null);
    }

};



module.exports = { qals }