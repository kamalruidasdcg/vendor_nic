
const { resSend, responseSend } = require("../../lib/resSend");
const { getFilteredData } = require("../genralControlles");
const { INSERT } = require("../../lib/constant");
const { getEpochTime, generateQuery, generateQueryArray, generateQueryForMultipleData } = require("../../lib/utils");
// const { query } = require("../../config/dbConfig");
const { wbsPayload } = require("../../services/sap.wbs.services");
const { WBS_ELEMENT } = require("../../lib/tableName");
const { query } = require("../../config/pgDbConfig");
const Message = require("../../utils/messages");

// const addWBSElementb = async (req, res) => {

//     try {
//         let payload;
//         if (Array.isArray(req.body)) {
//             payload = req.body.length > 0 ? req.body[0] : null;
//         } else if (typeof req.body === 'object' && req.body !== null) {
//             payload = req.body;
//         }

//         if (!payload || !payload.EBELN || !payload.WBS_ELEMENT) {
//             return resSend(res, false, 400, "Please send valid payload", null, null);
//         }

//         let insertObj = wbsPayload(payload);

//         const { q, val } = generateQuery(INSERT, WBS_ELEMENT, insertObj);
//         const response = await query({ query: q, values: val });

//         if (response.rowCount) {
//             resSend(res, true, 200, "Data inserted in wbs element...", null, null);
//         } else {
//             resSend(res, false, 400, "No data inserted", response, null);
//         }

//     } catch (error) {
//         console.log("wbs submission api", error);

//         return resSend(res, false, 500, "internal server error", [], null);
//     }
// }



const addWBSElement = async (req, res) => {

    //    http://10.13.1.38:4001/api/v1/po/qap
    
    try {
        if (!req.body) {
            responseSend(res, "F", 400, Message.INVALID_PAYLOAD, "", null);
        }
        const payload = [...req.body];
        const payloadObj = await wbsPayload(payload);
        const wbsInsertQuery = await generateQueryForMultipleData(payloadObj, WBS_ELEMENT, ["EBELN", "EBELP"]);
        const response = await query({ query: wbsInsertQuery.q, values: wbsInsertQuery.val });
        responseSend(res, "S", 200, Message.DATA_SEND_SUCCESSFULL, response, null);
    } catch (error) {
        console.log("data not fetched", error);
        responseSend(res, "F", 500, Message.SERVER_ERROR, error.message, null);
    }

}


module.exports = { addWBSElement }