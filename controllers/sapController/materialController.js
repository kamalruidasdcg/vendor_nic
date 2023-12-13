const path = require('path');
const { resSend } = require("../../lib/resSend");
const { getFilteredData } = require("../../controllers/genralControlles");
const { NEW_SDBG } = require('../../lib/tableName');



const list = async (req, res) => {

    req.query.$tableName = NEW_SDBG;

    try {

        getFilteredData(req, res);
    } catch (err) {
        console.log("data not fetched", err);
        resSend(res, false, 500, "Internal server error", null, null);
    }

}


module.exports = { list }