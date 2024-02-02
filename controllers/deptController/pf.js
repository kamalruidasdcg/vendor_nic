const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime, queryArrayTOString } = require("../../lib/utils");
const { INSERT, USER_TYPE_VENDOR, USER_TYPE_GRSE_QAP, ASSIGNER, STAFF, USER_TYPE_GRSE_FINANCE, USER_TYPE_GRSE_PURCHASE } = require("../../lib/constant");
const { PF } = require("../../lib/tableName");
const { PENDING, ASSIGNED, ACCEPTED, RE_SUBMITTED, REJECTED, FORWARD_TO_FINANCE, RETURN_TO_DEALING_OFFICER } = require("../../lib/status");
const { Payload, mrsPayload } = require("../../services/material.servces");
const { pfPayload } = require("../../services/dept.services");


/** APIS START ----->  */
const pfInsert = async (req, res) => {

    try {

        const tokenData = { ...req.tokenData };

        let fileData = {};
        if (req.file) {
            fileData = {
                fileName: req.file.filename,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
            };

            let payload = { ...req.body, ...fileData, created_at: getEpochTime() };
            if (!payload.vendor_code) {
                // const directory = path.join(__dirname, '..', 'uploads', 'drawing');
                // const isDel = handleFileDeletion(directory, req.file.filename);
                return resSend(res, false, 400, "Please send valid payload (vendor_code)", null, null);
            }

            payload = {
                ...payload,
                updated_by: tokenData.user_type == 1 ? "VENDOR" : "GRSE",
                created_by_id: tokenData.vendor_code
            }

            let insertObj = pfPayload(payload);

            const { q, val } = generateQuery(INSERT, PF, insertObj);
            const response = await query({ query: q, values: val });

            console.log("response", response);

            if (response.affectedRows) {
                resSend(res, true, 200, " uploaded!", fileData, null);
            } else {
                resSend(res, false, 400, "No data inserted", response, null);
            }


        } else {
            resSend(res, false, 400, "Please upload a valid File", fileData, null);
        }

    } catch (error) {
        console.log("  submission api", error);

        return resSend(res, false, 500, "internal server error", [], null);
    }

}
const pfList = async (req, res) => {

    try {

        // if (!req.query.poNo) {
        //     return resSend(res, false, 400, "Please send poNo", null, "");
        // }

        const pfListQuery = `SELECT * FROM ${PF}`

        const result = await query({ query: pfListQuery, values: [] });
        if (result.length > 0) {
            resSend(res, true, 200, "Data fetched successfully", result, null);
        } else {
            resSend(res, false, 200, "No Record Found", result, null);
        }


    } catch (error) {
        resSend(res, false, 500, "Internal server error", error, null);
    }


}





module.exports = { pfInsert, pfList };