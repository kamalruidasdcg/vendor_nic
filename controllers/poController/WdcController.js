const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT, USER_TYPE_VENDOR, USER_TYPE_PPNC_DEPARTMENT } = require("../../lib/constant");
const { WDC } = require("../../lib/tableName");
const { SUBMITTED, APPROVED, REJECTED, ACCEPTED, } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const path = require('path');

const { wdcPayload, create_reference_no, get_latest_activity } = require("../../services/po.services");

const { handleFileDeletion } = require("../../lib/deleteFile");
const { getFilteredData, updatTableData, insertTableData } = require("../genralControlles");
const { Verify } = require("crypto");
const { VENDOR } = require("../../lib/depertmentMaster");
const { makeHttpRequest } = require("../../config/sapServerConfig");


exports.wdc = async (req, res) => {

    // return resSend(res, true, 200, "file wupleeoaded!", 'req.body', null);
    try {

        const tokenData = { ...req.tokenData };
        const { ...obj } = req.body;

        if (!obj.purchasing_doc_no || !obj.status || !obj.remarks) {
            // const directory = path.join(__dirname, '..', 'uploads', lastParam);
            // const isDel = handleFileDeletion(directory, req.file.filename);
            return resSend(res, false, 400, "Please send valid payload", res, null);
        }

        //  deper
        if (tokenData.user_type != USER_TYPE_VENDOR && tokenData.department_id != USER_TYPE_PPNC_DEPARTMENT) {
            return resSend(res, true, 200, "you are not authorised!", res, null);
        }
        //console.log(obj);

        let fileData = {};
        if (req.file) {
            fileData = {
                fileName: req.file.filename,
                filePath: req.file.path,
            };
        }
        //console.log(fileData);
        let payload = { created_by_id: tokenData.vendor_code };

        if (tokenData.department_id == USER_TYPE_PPNC_DEPARTMENT) {
            if (!obj.reference_no || obj.reference_no == '') {
                return resSend(res, true, 200, "please send reference_no!", res, null);
            }
            let last_data = await get_latest_activity(WDC, obj.purchasing_doc_no, obj.reference_no);
            delete last_data.id;
            // console.log(last_data);
            // return;
            if (last_data.status == APPROVED || last_data.status == REJECTED) {
                return resSend(res, false, 200, `this WDC already ${last_data.status}!`, null, null);
            }
            payload = { ...last_data, ...fileData, ...obj, updated_by: "GRSE", created_by_id: tokenData.vendor_code, created_at: getEpochTime() };
        } else {
            console.log(payload);

            let reference_no = await create_reference_no("WDC", tokenData.vendor_code);
            // console.log(payload);
            // return;
            payload = { ...fileData, ...obj, reference_no: reference_no, vendor_code: tokenData.vendor_code, updated_by: "VENDOR", created_by_id: tokenData.vendor_code, created_at: getEpochTime(), };

        }

        const insertObj = wdcPayload(payload);

        const { q, val } = generateQuery(INSERT, WDC, insertObj);
        const response = await query({ query: q, values: val });

        if (response.affectedRows) {

            if(payload.status === APPROVED ) {
                await submitToSapServer(payload);
            }

            return resSend(res, true, 200, `WDC ${payload.status}!`, fileData, null);
        } else {
            return resSend(res, false, 400, "No data inserted", response, null);
        }

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



async function submitToSapServer(data) {
    try {
        const sapBaseUrl = process.env.SAP_HOST_URL || "http://10.181.1.31:8010";
        const postUrl = `${sapBaseUrl}/sap/bc/zoBPS_WDC`;
        console.log("postUrl", postUrl);
        console.log("wdc_payload -->",);
        let payload = { ...data };
        const wdc_payload =
        {
            "ebeln": payload.purchasing_doc_no,
            "ebelp": payload.po_line_iten_no,
            "wdc": payload.reference_no,
        }

        const postResponse = await makeHttpRequest(postUrl, 'POST', wdc_payload);
        console.log('POST Response from the server:', postResponse);
    } catch (error) {
        console.error('Error making the request:', error.message);
    }
}