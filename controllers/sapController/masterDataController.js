
const { VENDOR_MASTER_LFA1 } = require('../../lib/tableName');
const { connection } = require("../../config/dbConfig");
const { INSERT } = require("../../lib/constant");
const { responseSend } = require("../../lib/resSend");
const { generateQueryArray } = require("../../lib/utils");
const { lfa1Payload } = require('../../services/sap.masterData.services');


const lfa1 = async (req, res) => {
    try {
        const promiseConnection = await connection();
        try {
            if (!req.body || !Array.isArray(req.body)) {
                return responseSend(res, "0", 400, "Please send a valid payload.", null, null);
            }
            const payload = req.body;
            const payloadObj = await lfa1Payload(payload);
            const { q, val } =  await generateQueryArray(INSERT, VENDOR_MASTER_LFA1, payloadObj);
            const response = await promiseConnection.query(q, [val]);
            responseSend(res, "1", 200, "Data inserted successfully", response, null);
        } catch (err) {
            console.log("data not inserted", err);
            responseSend(res, "0", 500, "Internal server errorR", err, null);
        } finally {
            await promiseConnection.end();
        }
    } catch (error) {
        responseSend(res, "0", 500, "DB conn errror", error, null);
    }

};


// const lifnrx = async (req, res) => {

//     const promiseConnection = await connection();
//     try {
//         if (!req.body) {
//             responseSend(res, "0", 400, "Please send a valid payload.", null, null);
//         }
//         const payload = req.body;

//         const payloadObj = await msegPayload(payload);
//         const { q, val } = await generateQueryArray(INSERT, MSEG, payloadObj);

//         const response = await promiseConnection.query(q, [val]);
//         responseSend(res, "1", 200, "Data inserted successfully", response, null);
//     } catch (err) {
//         console.log("data not inserted", err);
//         responseSend(res, "0", 500, "Internal server errorR", err, null);
//     } finally {
//         await promiseConnection.end();
//     }


// };



module.exports = { lfa1 }