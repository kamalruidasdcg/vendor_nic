const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT, USER_TYPE_VENDOR } = require("../../lib/constant");
const { WDC } = require("../../lib/tableName");
const { PENDING, REJECTED, ACKNOWLEDGED, APPROVED, RE_SUBMITTED, CREATED } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const path = require('path');
const { wdcPayload } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { getFilteredData, updatTableData, insertTableData } = require("../genralControlles");
const { Verify } = require("crypto");
const { VENDOR } = require("../../lib/depertmentMaster");
const { makeHttpRequest } = require("../../config/sapServerConfig");
require('dotenv')


exports.wdc = async (req, res) => {

    // return resSend(res, true, 200, "file wupleeoaded!", 'req.body', null);
    try {

        const lastParam = req.path.split("/").pop();
        const tokenData = { ...req.tokenData };
        const { ...obj } = req.body;



        if (!obj.purchasing_doc_no || !obj.status) {

            // const directory = path.join(__dirname, '..', 'uploads', lastParam);
            // const isDel = handleFileDeletion(directory, req.file.filename);
            return resSend(res, false, 400, "Please send valid payload", res, null);

        }
        let fileData = {};
        if (req.file) {
            fileData = {
                fileName: req.file.filename,
                filePath: req.file.path,
                // fileType: req.file.mimetype,
                // fileSize: req.file.size,
            };
        }
        console.log(fileData);
        const payload = { ...req.body, ...fileData, created_at: getEpochTime() };

        payload.vendor_code = (tokenData.user_type === USER_TYPE_VENDOR) ? tokenData.vendor_code : null;
        payload.updated_by = (tokenData.user_type === USER_TYPE_VENDOR) ? "VENDOR" : "GRSE";

        payload.created_by_id = tokenData.vendor_code;
        console.log(payload);

        const wmcListQuery = `SELECT vendor_code FROM ${WDC} WHERE purchasing_doc_no = ?`;

        const result = await query({ query: wmcListQuery, values: [req.body.purchasing_doc_no] });

        if (result.length > 0) {
            if (result[0].vendor_code != null) {
                payload.vendor_code = result[0].vendor_code;
            }
        }

        const insertObj = wdcPayload(payload);
        console.log(insertObj);



        //return;
        const { q, val } = generateQuery(INSERT, WDC, insertObj);
        const response = await query({ query: q, values: val });

        if (response.affectedRows) {


            if (insertObj.status === APPROVED) {
                const postUrl = `${process.env.SAP_URL}:${process.env.SAP_PORT}/sap/bc/zoBPS_WDC`
                const wdcSapPayload =
                {
                    "ebeln": insertObj.purchasing_doc_no,
                    "ebelp": 10,
                    "slno": "1",
                    "wdc": "d/wdc"
                }

                // await makeHttpRequest(postUrl, "POST", wdcSapPayload);

            }




            resSend(res, true, 200, "WDC Updated!", fileData, null);
        } else {
            resSend(res, false, 400, "No data inserted", response, null);
        }


        // } else {
        //     resSend(res, false, 400, "Please upload a valid File", fileData, null);
        // }

    } catch (error) {
        console.log("po add api", error)

        return resSend(res, false, 500, "internal server error", [], null);
    }
}

exports.list = async (req, res) => {

    req.query.$tableName = `wdc`;
    req.query.$filter = `{ "purchasing_doc_no" :  ${req.query.poNo}}`;
    try {
        getFilteredData(req, res);
    } catch (err) {
        console.log("data not fetched", err);
    }
    // resSend(res, true, 200, "oded!", req.query.dd, null);

}