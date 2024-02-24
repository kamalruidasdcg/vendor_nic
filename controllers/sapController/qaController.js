
const { NEW_SDBG, MAKT, SDBG_PAYMENT_ADVICE, MSEG, MKPF, QALS } = require('../../lib/tableName');
const { connection } = require("../../config/dbConfig");
const { INSERT } = require("../../lib/constant");
const { responseSend, resSend } = require("../../lib/resSend");
const { generateQueryArray } = require("../../lib/utils");
const { qalsPayload } = require('../../services/sap.qa.services');


const qals = async (req, res) => {


    console.log("qalssss");
  
    const promiseConnection = await connection();
    try {
        if (!req.body) {
            responseSend(res, "0", 400, "Please send a valid payload.", null, null);
        }
        const payload = req.body;
        
        const payloadObj = await qalsPayload(payload);
        const { q, val } = await generateQueryArray(INSERT, QALS, payloadObj);

        const response = await promiseConnection.query(q, [val]);
        responseSend(res, "1", 200, "Data inserted successfully", response, null);
    } catch (err) {
        console.log("data not inserted", err);
        responseSend(res, "0", 500, "Internal server errorR", err, null);
    } finally {
        await promiseConnection.end();
    }


};



module.exports = { qals }