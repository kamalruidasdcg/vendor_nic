
const { resSend, responseSend } = require("../../lib/resSend");
const { getFilteredData } = require("../genralControlles");
const { INSERT } = require("../../lib/constant");
const { getEpochTime, generateQuery, generateQueryArray } = require("../../lib/utils");
const { connection } = require("../../config/dbConfig");
const { wbsPayload } = require("../../services/sap.wbs.services");
const { WBS_ELEMENT } = require("../../lib/tableName");

const addWBSElementb = async (req, res) => {

    try {
        let payload;
        if (Array.isArray(req.body)) {
            payload = req.body.length > 0 ? req.body[0] : null;
        } else if (typeof req.body === 'object' && req.body !== null) {
            payload = req.body;
        }

        if (!payload || !payload.EBELN || !payload.WBS_ELEMENT) {
            return resSend(res, false, 400, "Please send valid payload", null, null);
        }

        let insertObj = wbsPayload(payload);

        const { q, val } = generateQuery(INSERT, WBS_ELEMENT, insertObj);
        const response = await query({ query: q, values: val });

        if (response.affectedRows) {
            resSend(res, true, 200, "Data inserted in wbs element...", null, null);
        } else {
            resSend(res, false, 400, "No data inserted", response, null);
        }

    } catch (error) {
        console.log("wbs submission api", error);

        return resSend(res, false, 500, "internal server error", [], null);
    }
}



const addWBSElement = async (req, res) => {

    //    http://10.13.1.38:4001/api/v1/po/qap
    console.log("req.body)", req.body);
    const promiseConnection = await connection();
    console.log("req.body)", req.body);
    try {
        if (!req.body) {
            responseSend(res, "0", 400, "Please send a valid payload.gg", null, null);
        }
        const payload = [...req.body];
        const payloadObj = await  wbsPayload(payload);
        console.log("payloadObj", payloadObj);
        const { q, val } = await generateQueryArray(INSERT, WBS_ELEMENT, payloadObj);
        const response = await promiseConnection.query(q, [val]);
        console.log("response", response);
        responseSend(res, "1", 200, "Data inserted successfully", response, null);
    } catch (err) {
        console.log("data not fetched", err);
        responseSend(res, "0", 500, "Internal server error", null, null);
    } finally {
        await promiseConnection.end();
    }

}


module.exports = { addWBSElement }