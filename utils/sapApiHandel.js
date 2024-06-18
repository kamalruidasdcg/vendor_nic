const { query } = require("../config/pgDbConfig");
const { INSERT } = require("../lib/constant")
const { generateQuery, generalErrorLog } = require("../lib/utils")


const failedDataSave = async (data, ip, endpoint, error, created_by) => {
    try {
        const paylaod = {
            paylaod: JSON.stringify(data),
            requested_ip: ip || "",
            error_message: error.message,
            created_by: created_by || null,
            api_end_point: endpoint  || "",
        }

        const { q, val } = generateQuery(INSERT, 'sap_api_log', paylaod);
        // const response = await query({ query: "SELECT * FROM ekko", values: [] });
        const response = await query({ query: q, values: val});
        console.log("response", response.rows);

    } catch (error) {
        console.log("err nnnn", error.message);
        generalErrorLog(error, 'failedDataSave function',)
    }

}


module.exports = { failedDataSave }