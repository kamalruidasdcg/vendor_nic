const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT, USER_TYPE_VENDOR, USER_TYPE_PPNC_DEPARTMENT } = require("../../lib/constant");
const { WDC } = require("../../lib/tableName");
const { SUBMITTED, APPROVED, REJECTED, } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const path = require('path');

const { wdcPayload, create_reference_no, get_latest_activity } = require("../../services/po.services");

const { handleFileDeletion } = require("../../lib/deleteFile");
const { getFilteredData, updatTableData, insertTableData } = require("../genralControlles");
const { Verify } = require("crypto");
const { VENDOR } = require("../../lib/depertmentMaster");
const { makeHttpRequest } = require("../../config/sapServerConfig");
require("dotenv").config();


exports.wdc = async (req, res) => {

    // return resSend(res, true, 200, "file wupleeoaded!", 'req.body', null);
    try {

        const tokenData = { ...req.tokenData };
        const { ...obj } = req.body;

        if (!obj.purchasing_doc_no || !obj.status) {
            // const directory = path.join(__dirname, '..', 'uploads', lastParam);
            // const isDel = handleFileDeletion(directory, req.file.filename);
            return resSend(res, false, 200, "Please send valid payload", null, null);
        }

        //  deper
        if (tokenData.user_type != USER_TYPE_VENDOR && tokenData.department_id != USER_TYPE_PPNC_DEPARTMENT) {
            return resSend(res, false, 200, "You are not authorised!", null, null);
        }
        //console.log(obj);
        if (tokenData.user_type == USER_TYPE_VENDOR) {
           
            if (!obj.action_type || obj.action_type == "") {
                return resSend(res, false, 200, "action_type required!", null, null);
            }

            if (!obj.status || obj.status !== SUBMITTED) {
                return resSend(res, false, 200, "VENDOR ONLY CAN SUBMIT!", null, null);
            }
        }


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
            if (!obj || obj.reference_no == '') {
                return resSend(res, false, 200, "please send reference_no!", null, null);
            }
            let last_data = await get_latest_activity(WDC, obj.purchasing_doc_no, obj.reference_no);
            if (last_data) {

                delete last_data.id;
                // console.log(last_data);
                // return;
                if (last_data.status == APPROVED || last_data.status == REJECTED) {
                    return resSend(res, false, 200, `this file is already ${last_data.status}!`, null, null);
                }
                if(obj.status == APPROVED) {
                    if (!obj.entry_by_production || obj.entry_by_production == '' || !obj.stage_datiels || obj.stage_datiels == '' || !obj.actual_payable_amount || obj.actual_payable_amount == '') {
                        return resSend(res, false, 200, "please send required fields to APPROVED this WDC!", null, null);
                    }
                }
                payload = { ...last_data, ...fileData, ...obj, updated_by: "GRSE", created_by_id: tokenData.vendor_code, created_at: getEpochTime() };

            } else {
                return resSend(res, false, 200, `No record found with this reference_no!`, fileData, null);
            }

        } else {
            console.log(payload);

            let reference_no = await create_reference_no(obj.action_type, tokenData.vendor_code);
            // console.log(payload);
            // return;
            obj.entry_by_production = "";
            obj.stage_datiels = "";
            obj.actual_payable_amount = 0;
            payload = { ...fileData, ...obj, reference_no: reference_no, vendor_code: tokenData.vendor_code, updated_by: "VENDOR", created_by_id: tokenData.vendor_code, created_at: getEpochTime(), };

        }

        const insertObj = wdcPayload(payload);

        const { q, val } = generateQuery(INSERT, WDC, insertObj);
        const response = await query({ query: q, values: val });

        if (response.affectedRows) {
            if (payload.status === APPROVED) {
                await submitToSapServer(payload);
            }
            return resSend(res, true, 200, `Thie file is ${payload.status}!`, fileData, null);
        } else {
            return resSend(res, false, 400, "No data inserted", response, null);
        }

    } catch (error) {
        console.log("WDC api", error)

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
 
        const postResponse = await makeHttpRequest (postUrl, 'POST', wdc_payload);
        console.log('POST Response from the server:', postResponse);
    } catch (error) {
        console.error('Error making the request:', error.message);
    }
}
