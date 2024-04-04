const { query } = require("../config/dbConfig");
const { INSERT } = require("../lib/constant")
const { getEpochTime, generateQuery, generalErrorLog } = require("../lib/utils")


const failedDataSave = async (data, requestedIP, endpoint, error, created_by) => {
    try {
        const paylaod = {
            data,
            requested_ip: requestedIP,
            error_message: JSON.stringify(error),
            created_by,
            created_at: getEpochTime(),
            api_end_point: endpoint,
        }

        const { q, val } = generateQuery(INSERT, 'sap_api_log', paylaod);
        const response = await query({ query: q, values: val });

    } catch (error) {
        await generalErrorLog(error, 'failedDataSave function', error.stack)
    }

}


module.exports = { failedDataSave }