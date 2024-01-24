const path = require('path');
const { sdbgPayload } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT, UPDATE, USER_TYPE_VENDOR } = require("../../lib/constant");
const { EKKO, NEW_SDBG, SDBG_ENTRY, SDBG } = require("../../lib/tableName");
const { FINANCE } = require("../../lib/depertmentMaster");
const { PENDING, ACKNOWLEDGED, RE_SUBMITTED, FORWARD_TO_FINANCE } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const { getFilteredData } = require("../../controllers/genralControlles");
const SENDMAIL = require("../../lib/mailSend");
const { SDBG_SUBMIT_MAIL_TEMPLATE } = require("../../templates/mail-template");
const { mailInsert } = require('../../services/mai.services');
const { mailTrigger } = require('../sendMailController');
const { SDBG_SUBMIT_BY_VENDOR, SDBG_SUBMIT_BY_GRSE } = require('../../lib/event');


// add new post
const submitSDBG = async (req, res) => {

    try {


        // Handle Image Upload
        let fileData = {};
        if (req.file) {
            fileData = {
                fileName: req.file.filename,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
            };
            const tokenData = { ...req.tokenData };
            let payload = { ...req.body, ...fileData, created_at: getEpochTime() };
            payload.updated_by = (tokenData.user_type === USER_TYPE_VENDOR) ? "VENDOR" : "GRSE";
            payload.action_by_id = tokenData.vendor_code;

            const verifyStatus = [PENDING, RE_SUBMITTED, ACKNOWLEDGED]

            if (!payload.purchasing_doc_no || !payload.updated_by || !payload.action_by_name || !payload.action_by_id || !verifyStatus.includes(payload.status)) {

                // const directory = path.join(__dirname, '..', 'uploads', 'drawing');
                // const isDel = handleFileDeletion(directory, req.file.filename);
                return resSend(res, false, 400, "Please send valid payload", null, null);

            }

            const GET_LATEST_SDBG = `SELECT purchasing_doc_no, status, updated_by, created_by_id, created_by_name FROM ${NEW_SDBG} WHERE purchasing_doc_no = ? AND status = ? AND isLocked = 1`;
            const result2 = await getSDBGData(GET_LATEST_SDBG, payload.purchasing_doc_no, ACKNOWLEDGED);
            if (result2 && result2?.length) {
                const data = [{
                    purchasing_doc_no: result2[0]?.purchasing_doc_no,
                    status: result2[0]?.status,
                    acknowledgedByName: result2[0]?.created_by_name,
                    acknowledgedById: result2[0]?.created_by_id,
                    message: "The SDBG is already acknowledge. If you want to reopen, please contact with senior management."
                }];

                return resSend(res, true, 200, `This sdbg aleready ${ACKNOWLEDGED} [ PO - ${payload.purchasing_doc_no} ]`, data, null);
            }


            let insertObj;

            if (payload.status === PENDING) {
                payload = { ...payload, isLocked: 0 };
                insertObj = sdbgPayload(payload, PENDING);
            } else if (payload.status === RE_SUBMITTED) {

                // const GET_LATEST_SDBG = `SELECT bank_name, transaction_id, vendor_code FROM ${NEW_SDBG} WHERE purchasing_doc_no = ? AND status = ?`;


                // const result = await query({ query: GET_LATEST_SDBG, values: [payload.purchasing_doc_no, PENDING] });
                // console.log("iiii", result)

                // if (!result || !result.length) {
                //     return resSend(res, true, 200, "No SDBG found to resubmit", null, null);
                // }

                // payload = {
                //     ...payload,
                //     bank_name: result[0].bank_name,
                //     transaction_id: result[0].transaction_id,
                //     vendor_code: result[0].vendor_code,
                // }

                // insertObj = sdbgPayload(payload, RE_SUBMITTED);

            } else if (payload.status === ACKNOWLEDGED && payload.updated_by == "GRSE") {

                const GET_LATEST_SDBG = `SELECT bank_name, transaction_id, vendor_code FROM ${NEW_SDBG} WHERE purchasing_doc_no = ? AND status = ?`;

                const result = await query({ query: GET_LATEST_SDBG, values: [payload.purchasing_doc_no, PENDING] });

                if (!result || !result.length) {
                    return resSend(res, true, 200, "No SDBG found to acknowledge", null, null);
                }
                payload = { ...payload, isLocked: 1 };
                insertObj = sdbgPayload(payload, ACKNOWLEDGED);
            }

            const { q, val } = generateQuery(INSERT, NEW_SDBG, insertObj);
            const response = await query({ query: q, values: val });

            if (response.affectedRows) {
                // mail setup


                // if (payload.status === PENDING) {

                //     if (payload.updated_by == "VENDOR") {

                //         const result = await poContactDetails(payload.purchasing_doc_no);
                //         payload.delingOfficerName = result[0]?.dealingOfficerName;
                //         payload.mailSendTo = result[0]?.dealingOfficerMail;
                //         payload.vendor_name = result[0]?.vendor_name;
                //         payload.vendor_code = result[0]?.vendor_code;
                //         payload.sendAt = new Date(payload.created_at);
                //         mailTrigger({ ...payload }, SDBG_SUBMIT_BY_VENDOR);

                //     } else if (payload.updated_by == "GRSE") {

                //         const result = await poContactDetails(payload.purchasing_doc_no);
                //         payload.vendor_name = result[0]?.vendor_name;
                //         payload.vendor_code = result[0]?.vendor_code;
                //         payload.mailSendTo = result[0]?.vendor_mail_id;
                //         payload.delingOfficerName = result[0]?.dealingOfficerName;
                //         payload.sendAt = new Date(payload.created_at);

                //         mailTrigger({ ...payload }, SDBG_SUBMIT_BY_GRSE);

                //     }
                // }
                // if (payload.status === ACKNOWLEDGED && payload.updated_by == "GRSE") {

                //     const result = await poContactDetails(payload.purchasing_doc_no);
                //     payload.vendor_name = result[0]?.vendor_name;
                //     payload.vendor_code = result[0]?.vendor_code;
                //     payload.mailSendTo = result[0]?.vendor_mail_id;
                //     payload.delingOfficerName = result[0]?.dealingOfficerName;
                //     payload.sendAt = new Date(payload.created_at);
                //     mailTrigger({ ...payload }, SDBG_SUBMIT_BY_GRSE);

                // }

                await handelEmail(payload);


                resSend(res, true, 200, "file uploaded!", fileData, null);
            } else {
                resSend(res, false, 400, "No data inserted", response, null);
            }

        } else {
            resSend(res, false, 400, "Please upload a valid File", fileData, null);
        }

    } catch (error) {
        console.log("SDGB Submission api", error);

        return resSend(res, false, 500, "internal server error", [], null);
    }
}


const getSDBGData = async (getQuery, purchasing_doc_no, drawingStatus) => {
    // const Q = `SELECT purchasing_doc_no FROM ${NEW_SDBG} WHERE purchasing_doc_no = ? AND status = ?`;
    const result = await query({ query: getQuery, values: [purchasing_doc_no, drawingStatus] });
    return result;
}

const list = async (req, res) => {

    req.query.$tableName = NEW_SDBG;

    req.query.$filter = `{ "purchasing_doc_no" :  ${req.query.poNo}}`;
    try {

        if (!req.query.poNo) {
            return resSend(res, false, 400, "Please send po number", null, null);
        }

        getFilteredData(req, res);
    } catch (err) {
        console.log("data not fetched", err);
        resSend(res, false, 500, "Internal server error", null, null);
    }

}

const sdbgSubmitByDealingOfficer = async (req, res) => {
    const tokenData = { ...req.tokenData };
    // console.log("tokenData7ujky6j");
    // console.log(tokenData);
    // return resSend(res, false, 400, "Please send po number", req.body, null);
    try {
        //const tokenData = { ...req.tokenData };

        const { ...obj } = req.body;
        if (!obj || typeof obj !== 'object' || !Object.keys(obj).length) {
            return responseSend(res, false, 400, "INVALID PAYLOAD", null, null);
        }
        if (!obj.purchasing_doc_no || obj.purchasing_doc_no == "") {
            return resSend(res, false, 200, "Please send PO number.", null, null);
        }

        const getQuery = `SELECT COUNT(EBELN) AS man_no FROM ${EKKO} WHERE EBELN = ? AND ERNAM = ?`;
        const result = await query({ query: getQuery, values: [obj.purchasing_doc_no, tokenData.vendor_code] });
        if (result[0].man_no === 0) {
            return resSend(res, false, 200, "Please Login as dealing officer.", null, null);
        }
        // console.log(result);
        const insertPayload = {
            purchasing_doc_no: obj.purchasing_doc_no,
            bank_name: obj.bank_name ? obj.bank_name : null,
            branch_name: obj.branch_name ? obj.branch_name : null,
            ifsc_code: obj.ifsc_code ? obj.ifsc_code : null,
            bank_addr1: obj.bank_addr1 ? obj.bank_addr1 : null,
            bank_addr2: obj.bank_addr2 ? obj.bank_addr2 : null,
            bank_addr3: obj.bank_addr3 ? obj.bank_addr3 : null,
            bank_city: obj.bank_city ? obj.bank_city : null,
            pincode: obj.pincode ? obj.pincode : null,
            bg_no: obj.bg_no ? obj.bg_no : null,
            bg_date: obj.bg_date ? obj.bg_date : null,
            bg_ammount: obj.bg_ammount ? obj.bg_ammount : null,
            department: obj.department ? obj.department : null,
            po_date: obj.po_date ? obj.po_date : null,
            yard_no: obj.yard_no ? obj.yard_no : null,
            vendor_pincode: obj.vendor_pincode ? obj.vendor_pincode : null,
            extension_date1: obj.extension_date1 ? obj.extension_date1 : null,
            extension_date2: obj.extension_date2 ? obj.extension_date2 : null,
            extension_date3: obj.extension_date3 ? obj.extension_date3 : null,
            extension_date4: obj.extension_date4 ? obj.extension_date4 : null,
            extension_date5: obj.extension_date5 ? obj.extension_date5 : null,
            extension_date6: obj.extension_date6 ? obj.extension_date6 : null,
            release_date: obj.release_date ? obj.release_date : null,
            demand_notice_date: obj.demand_notice_date ? obj.demand_notice_date : null,
            extension_date: obj.extension_date ? obj.extension_date : null,
            status: obj.status ? obj.status : null,
            created_at: getEpochTime(),
            created_by: tokenData.vendor_code,
        };
        //console.log(insertPayload);
        let { q, val } = generateQuery(INSERT, SDBG_ENTRY, insertPayload);

        let sdbgEntryQuery = await query({ query: q, values: val });

        if (sdbgEntryQuery.error) {
            console.log(sdbgEntryQuery.error);
            resSend(res, false, 201, "Data not 1insert!!", sdbgEntryQuery.error, null);
        }

        const Q = `SELECT file_name,file_path,vendor_code FROM ${SDBG} WHERE purchasing_doc_no = ?`;
        let sdbgResult = await query({ query: Q, values: [obj.purchasing_doc_no] });
        let sdbgDataResult = sdbgResult[0];
        // console.log("sdbgDataResult");
        // console.log(sdbgDataResult);
        const insertPayloadForSdbg = {
            purchasing_doc_no: obj.purchasing_doc_no,
            ...sdbgDataResult,
            remarks: obj.remarks,
            status: "FORWARD_TO_FINANCE",
            assigned_from: tokenData.vendor_code,
            assigned_to: "FINANCE",
            created_at: getEpochTime(),
            created_by_name: "Dealing officer",
            created_by_id: tokenData.vendor_code,
            updated_by: "GRSE"
        }
        // console.log("sdbg--");
        // console.log(insertPayloadForSdbg);

        let insertsdbg_q = generateQuery(INSERT, SDBG, insertPayloadForSdbg);
        let sdbgQuery = await query({ query: insertsdbg_q["q"], values: insertsdbg_q["val"] });
        // console.log("rt67898uygy");
        // console.log(sdbgQuery);
        return resSend(res, true, 200, "Forworded to finance successfully!", sdbgQuery, null);

    } catch (error) {
        console.log(error);
        return resSend(res, false, 201, "Data not insert!!", error, null);
    }




}

const sdbgUpdateByFinance = async (req, res) => {
    // payload
        // purchasing_doc_no, remarks, status, assigned_to, 
    const tokenData = { ...req.tokenData };
    const { ...obj } = req.body;
   // resSend(res, true, 200, "SDBG assign to staff successfully!", tokenData, null);
    try {
        if (tokenData.department_id != FINANCE) {
            resSend(res, true, 200, "please login as finance!", null, null);
        }
         const getQuery = `SELECT COUNT(purchasing_doc_no) AS po_count FROM ${SDBG} WHERE purchasing_doc_no = ? AND status = ?`;
        const result = await query({ query: getQuery, values: [obj.purchasing_doc_no, FORWARD_TO_FINANCE] });
        if (result[0].po_count === 0) {
            return resSend(res, true, 200, "This po is not forward to finance.Please contact with dealing officer.", null, null);
        }
        if((!obj.purchasing_doc_no || obj.purchasing_doc_no == "") || (!obj.remarks || obj.remarks == "") || (!obj.status || obj.status == "") || (!obj.assigned_to || obj.assigned_to == "")) {
           return resSend(res, true, 200, "please send a valid payload!", null, null);
        }

        const Q = `SELECT file_name,file_path,vendor_code FROM ${SDBG} WHERE purchasing_doc_no = ? LIMIT 1`;
        let sdbgResult = await query({ query: Q, values: [obj.purchasing_doc_no] });

        let sdbgDataResult = sdbgResult[0];
        // console.log("sdbgDataResult");
        // console.log(sdbgDataResult);
        const insertPayloadForSdbg = {
            purchasing_doc_no: obj.purchasing_doc_no,
            ...sdbgDataResult,
            remarks: obj.remarks,
            status: obj.status,
            assigned_from: tokenData.vendor_code,
            assigned_to: obj.assigned_to,
            created_at: getEpochTime(),
            created_by_name: "finance dept",
            created_by_id: tokenData.vendor_code,
            updated_by: "GRSE"
        }
        let insertsdbg_q = generateQuery(INSERT, SDBG, insertPayloadForSdbg);
        let sdbgQuery = await query({ query: insertsdbg_q["q"], values: insertsdbg_q["val"] });
        
        resSend(res, false, 200, "done!", sdbgQuery, null);

    } catch (error) {
        resSend(res, false, 400, "somthing went wrong!", error, null);
    }

}

const assigneeList = async (req, res) => {

    req.query.$tableName = NEW_SDBG;

    req.query.$filter = `{ "purchasing_doc_no" :  ${req.query.poNo}}`;
    try {

        if (!req.query.poNo) {
            return resSend(res, false, 400, "Please send po number", null, null);
        }

        getFilteredData(req, res);
    } catch (err) {
        console.log("data not fetched", err);
        resSend(res, false, 500, "Internal server error", null, null);
    }

}


const unlock = async (req, res) => {

    try {

        let payload = { ...req.body };

        if (!payload.purchasing_doc_no || !payload.action_by_name || !payload.action_by_id) {
            return resSend(res, false, 400, "Please send valid payload", null, null);
        }


        const isLocked_check_q = `SELECT * FROM ${NEW_SDBG} WHERE  (purchasing_doc_no = "${payload.purchasing_doc_no}" AND status = "${ACKNOWLEDGED}") ORDER BY id DESC LIMIT 1`;
        const lockeCheck = await query({ query: isLocked_check_q, values: [] });


        if (lockeCheck && lockeCheck?.length && lockeCheck[0]["isLocked"] === 0) {
            return resSend(res, true, 200, "Already unlocked or not Acknowledge yet", null, null);
        }



        const q = `UPDATE ${NEW_SDBG} SET 
                updated_by_name = "${payload.action_by_name}",
                updated_by_id = "${payload.action_by_id}",
                updated_at = ${getEpochTime()},
                isLocked =  0 WHERE  (purchasing_doc_no = "${payload.purchasing_doc_no}" AND status = "${ACKNOWLEDGED}" AND isLocked = 1)`;
        const response = await query({ query: q, values: [] });

        if (response.affectedRows) {
            resSend(res, true, 200, "Ulocked successfully", null, null);
        } else {
            resSend(res, false, 400, "No data inserted", response, null);
        }

    } catch (error) {
        console.log("sdbg unlock api");
    }
}


async function poContactDetails(purchasing_doc_no) {
    const po_contact_details_query = `SELECT 
        t1.EBELN, 
        t1.ERNAM AS dealingOfficerId, 
        t1.LIFNR AS vendor_code, 
        t2.CNAME AS dealingOfficerName, 
        t3.USRID_LONG AS dealingOfficerMail, 
        t4.NAME1 as vendor_name, 
        t4.ORT01 as vendor_address, 
        t5.SMTP_ADDR as vendor_mail_id
    FROM 
        ekko AS t1 
    LEFT JOIN 
        pa0002 AS t2 
    ON 
        t1.ERNAM= t2.PERNR 
    LEFT JOIN 
        pa0105 AS t3 
    ON 
        (t2.PERNR = t3.PERNR AND t3.SUBTY = '0030') 
    LEFT JOIN 
        lfa1 AS t4 
    ON 
        t1.LIFNR = t4.LIFNR 
    LEFT JOIN 
        adr6 AS t5
       ON
      t1.LIFNR = t5.PERSNUMBER
    WHERE 
        t1.EBELN = ?`;

    const result = await query({ query: po_contact_details_query, values: [purchasing_doc_no] });

    return result;
}



async function handelEmail(payload) {
    if (payload.status === PENDING) {
        const result = await poContactDetails(payload.purchasing_doc_no);
        payload.delingOfficerName = result[0]?.dealingOfficerName;
        payload.mailSendTo = result[0]?.dealingOfficerMail;
        payload.vendor_name = result[0]?.vendor_name;
        payload.vendor_code = result[0]?.vendor_code;
        payload.sendAt = new Date(payload.created_at);
        await mailInsert(payload, SDBG_SUBMIT_BY_VENDOR, "New SDBG submitted");
    }
}



module.exports = { submitSDBG, list, unlock, assigneeList, sdbgSubmitByDealingOfficer, sdbgUpdateByFinance }