const { resSend } = require("../../lib/resSend");
const { query, connection } = require("../../config/dbConfig");
const { generateQuery, getEpochTime, queryArrayTOString } = require("../../lib/utils");
const { INSERT, USER_TYPE_VENDOR, USER_TYPE_GRSE_QAP, ASSIGNER, STAFF, USER_TYPE_GRSE_FINANCE, USER_TYPE_GRSE_PURCHASE } = require("../../lib/constant");
const { PF, NEW_PAYMENTS } = require("../../lib/tableName");
const { PENDING, ASSIGNED, ACCEPTED, RE_SUBMITTED, REJECTED, FORWARD_TO_FINANCE, RETURN_TO_DEALING_OFFICER } = require("../../lib/status");
const { Payload, mrsPayload } = require("../../services/material.servces");
const { pfPayload } = require("../../services/dept.services");
const xlsx = require("xlsx");

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


const updoadExcelFileController = async (req, res) => {


    try {
        const promiseConnection = await connection();
        try {
            let fileData = {};
            const { created_by_name, created_by_id } = req.body;

            if (req.file) {
                fileData = {
                    fileName: req.file.filename,
                    filePath: req.file.path,
                    fileType: req.file.mimetype,
                    fileSize: req.file.size,
                };

                if (!req.file) {
                    return resSend(res, false, 400, "Please upload an excel file!", fileData, null);
                }

                const workbook = xlsx.readFile(req.file.path);

                
                const data = [];
                const sheets = workbook.SheetNames;
                console.log("sheets", sheets);

                for (let i = 0; i < sheets.length; i++) {
                    const temp = xlsx.utils.sheet_to_json(
                        workbook.Sheets[workbook.SheetNames[i]]
                    );
                    temp.forEach((res) => {
                        data.push({ ...res, created_by_name, created_by_id });
                    });
                }

                console.log("data", data);
                const query = `INSERT INTO ${NEW_PAYMENTS} ( venor_code, contactors_name, po_no, MAIN, FOJ, RBD, COL_61P, TU, TTC, G_HOUSE, BELUR, NSSY, IHQ_DELHI,  WAGES_PAID_UPTO,  PF_DEPOSIT_UPTO, ESI_DEPISIT_UPTO, REMARKS, created_by_name, created_by_id, status) VALUES ?`;


                const values = data.map((obj) => [
                    obj.venor_code,
                    obj.contactors_name,
                    obj.po_no,
                    obj.MAIN,
                    obj.FOJ,
                    obj.RBD,
                    obj.COL_61P,
                    obj.TU,
                    obj.TTC,
                    obj.G_HOUSE,
                    obj.BELUR,
                    obj.NSSY,
                    obj.IHQ_DELHI,
                    obj.WAGES_PAID_UPTO,
                    obj.PF_DEPOSIT_UPTO,
                    obj.ESI_DEPISIT_UPTO,
                    obj.REMARKS,
                    obj.created_by_name,
                    obj.created_by_id,
                    obj.status,
                ]);


                // const value = [ [1, "name"], [2, "name2"]]

                promiseConnection.query (query, [values], (err, results) => {
                    if (err) {
                        console.error('Error inserting data: ' + err);
                        resSend(res, false, 500, "'Failed to insert data'", data, null);

                        
                    } else {
                        resSend(res, true, 200, "Data insert succussfully", data, null);

                    }
                });

            } else {
                resSend(res, false, 400, "Please upload a valid Excel File", fileData, null);
            }

        } catch (error) {
            console.error('Error inserting data: ' + error);
            resSend(res, false, 500, "Failed to insert data", [], null);
        } finally {
            promiseConnection.end();
        }
    } catch (error) {
        console.log("err", error);
        resSend(res, false, 500, "Failed to db connection", [], null);
    }

};





module.exports = { pfInsert, pfList, updoadExcelFileController };