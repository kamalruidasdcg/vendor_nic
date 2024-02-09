
const { resSend } = require("../../lib/resSend");
const { getFilteredData } = require("../genralControlles");
const { INSERT } = require("../../lib/constant");
const { getEpochTime, generateQuery } = require("../../lib/utils");
const { query } = require("../../config/dbConfig");
const { wbsPayload } = require("../../services/sap.wbs.services");
const { WBS_ELEMENT } = require("../../lib/tableName");

const addWBSElement = async (req, res) => {

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


module.exports = { addWBSElement }