const path = require('path');
const { qapPayload } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT, USER_TYPE_GRSE_QAP, QAP_ASSIGNER, QAP_STAFF, USER_TYPE_VENDOR } = require("../../lib/constant");
const { QAP_SUBMISSION } = require("../../lib/tableName");
const { PENDING, APPROVED, RE_SUBMITTED, ACCEPTED, REJECTED, SAVED, ASSIGNED, UPADATED } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const { getFilteredData } = require("../../controllers/genralControlles");
const { DRAWING_SUBMIT_MAIL_TEMPLATE, QAP_SUBMIT_MAIL_TEMPLATE } = require('../../templates/mail-template');
const SENDMAIL = require('../../lib/mailSend');
const { mailInsert } = require('../../services/mai.services');
const { QAP_SUBMIT_BY_VENDOR, QAP_SUBMIT_BY_GRSE } = require('../../lib/event');
const { mailTrigger } = require('../sendMailController');
const { Console } = require('console');



// add new post
const submitQAP = async (req, res) => {
    try {
        const tokenData = req.tokenData;
        //console.log(tokenData.vendor_code);
        //return;
        let fileData = {};
        if (req.file) {
            fileData = {
                fileName: req.file.filename,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
            };
        }

        let payload = { ...req.body, ...fileData, created_at: getEpochTime() };

        payload.updated_by = (tokenData.user_type === USER_TYPE_VENDOR) ? "VENDOR" : "GRSE";
        payload.action_by_id = tokenData.vendor_code;
        const activity_type = payload.status;
        const purchasing_doc_no = payload.purchasing_doc_no;

        // console.log(payload.updated_by);
        // return;
        const verifyStatusForStaff = [REJECTED, ACCEPTED, SAVED, APPROVED, UPADATED];

        if (!payload.purchasing_doc_no || !payload.remarks || !payload.status) {
            // const directory = path.join(__dirname, '..', 'uploads', 'drawing');
            // const isDel = handleFileDeletion(directory, req.file.filename);
            return resSend(res, false, 400, "Please send valid payload", null, null);
        }
        if ((tokenData.user_type === USER_TYPE_VENDOR && activity_type === RE_SUBMITTED) || tokenData.department_id === USER_TYPE_GRSE_QAP) {
            if (!payload.assigned_from || !payload.assigned_to) {
                return resSend(res, false, 400, `Please send assign from and assign to.`, null, null);
            }
        }

        let message = ``;

        console.log(tokenData);
        ///////// CHECK DEPERTMENT /////////////////
        if (tokenData.department_id && tokenData.department_id === USER_TYPE_GRSE_QAP) {


            ///////// CHECK ROLE IS ASSIGNER /////////////////
            if (activity_type === ASSIGNED) {
                console.log(ASSIGNED);
                if (tokenData.internal_role_id === QAP_ASSIGNER) {
                    console.log(true);
                    const checkAssigneQuery = `SELECT COUNT(status) AS countval FROM qap_submission WHERE purchasing_doc_no = ? AND status = ?`;
                    const resAssigneQry = await query({ query: checkAssigneQuery, values: [purchasing_doc_no, ASSIGNED] });
                    if (resAssigneQry[0].countval > 0) {
                        message = `This QAP has already ${ASSIGNED}`;
                        return resSend(res, true, 200, message, null, null);
                    }
                    
                } else {
                    message = `you dont have permission.`;
                    return resSend(res, true, 200, message, null, null);
                }
            }
            ///////// CHECK ROLE IS ASSIGNER /////////////////

            ///////// CHECK ROLE IS STAFF /////////////////
            if (verifyStatusForStaff.includes(activity_type)) {
                console.log(activity_type);
                if (tokenData.internal_role_id === QAP_STAFF) {
                    const checkAssigneStaffQuery = `SELECT COUNT(status) AS countval FROM qap_submission WHERE purchasing_doc_no = ? AND status = ?  AND assigned_to = ?`;
                    const resAssigneStaffQry = await query({ query: checkAssigneStaffQuery, values: [purchasing_doc_no, ASSIGNED, tokenData.vendor_code] });
                    console.log(`${resAssigneStaffQry[0].countval}`);
                    if (resAssigneStaffQry[0].countval === 0) {
                        message = `you dont have permission.`;
                        return resSend(res, true, 200, message, null, null);
                    }
                }
            }
            ///////// CHECK ROLE IS STAFF /////////////////


            ///////// CHECK IS ALLREADY APPROVED /////////////////
            const GET_LATEST_QAP = `SELECT purchasing_doc_no, status, updated_by, created_by_id, created_by_name FROM ${QAP_SUBMISSION} WHERE purchasing_doc_no = ? AND status = ?`;
            const result2 = await getQAPData(GET_LATEST_QAP, payload.purchasing_doc_no, APPROVED);

            if (result2 && result2?.length) {

                const data = [{
                    purchasing_doc_no: result2[0]?.purchasing_doc_no,
                    status: result2[0]?.status,
                    approvedByName: result2[0]?.created_by_name,
                    approvedById: result2[0]?.created_by_id,
                    message: "The QAP is already approved. If you want to reopen, please contact with senior management."
                }];

                return resSend(res, true, 200, `This QAP aleready ${APPROVED} [ PO - ${payload.purchasing_doc_no} ]`, data, null);
            }
            ///////// CHECK IS ALLREADY APPROVED /////////////////

        }
        //console.log(message);
        // if (message != "") {
        //     return resSend(res, true, 200, message, null, null);
        // }

        if (tokenData.user_type === USER_TYPE_VENDOR && activity_type === PENDING) {
            payload.assigned_from = null;
            payload.assigned_to = null;
        }
        //////// SET STATUS AND CREATE QAP PAYLOAD /////////
        let insertObj;
        // REJECTED, ACCEPTED, SAVED, APPROVED, UPADATED
        switch (activity_type) {
            case PENDING:
                insertObj = qapPayload(payload, PENDING);
                break;
            case ASSIGNED:
                insertObj = qapPayload(payload, ASSIGNED);
                break;
            case REJECTED:
                insertObj = qapPayload(payload, REJECTED);
                break;
            case RE_SUBMITTED:
                insertObj = qapPayload(payload, RE_SUBMITTED);
                break;
            case ACCEPTED:
                insertObj = qapPayload(payload, ACCEPTED);
                break;
            case SAVED:
                insertObj = qapPayload(payload, SAVED);
                break;
            case APPROVED:
                insertObj = qapPayload(payload, APPROVED);
                break;
            case UPADATED:
                insertObj = qapPayload(payload, UPADATED);
                break;
            default:
                console.log("other1");
                break;

        }
        //////// SET STATUS AND CREATE QAP PAYLOAD /////////

        if (tokenData.user_type === USER_TYPE_VENDOR && (activity_type != PENDING && activity_type != RE_SUBMITTED)) {
            resSend(res, true, 200, `vendor can only send status for ${PENDING} and ${RE_SUBMITTED}`, null, null);
        }
        console.log(payload.updated_by);
        //return;
        // console.log("@@@@@@@@@@@@@@@@@@@");
        // console.log(payload);
        // console.log("&&&&&&&&&&&&&&&&&&");
        // console.log(insertObj);
        //return;
        const { q, val } = generateQuery(INSERT, QAP_SUBMISSION, insertObj);
        // console.log("(((((((((((((((((((())))))))))))))))))))&");
        // console.log(val);
        const response = await query({ query: q, values: val });

        if (response.affectedRows) {
            resSend(res, true, 200, "file uploaded!", fileData, null);
        } else {
            resSend(res, false, 400, "No data inserted", response, null);
        }

        if (payload.status === PENDING) {

            if (payload.updated_by == "VENDOR") {

                const result = await poContactDetails(payload.purchasing_doc_no);
                payload.delingOfficerName = result[0]?.dealingOfficerName;
                payload.mailSendTo = result[0]?.dealingOfficerMail;
                payload.vendor_name = result[0]?.vendor_name;
                payload.vendor_code = result[0]?.vendor_code;
                payload.sendAt = new Date(payload.created_at);
                mailTrigger({ ...payload }, QAP_SUBMIT_BY_VENDOR);

                console.log("payload", payload);

            } else if (payload.updated_by == "GRSE") {

                const result = await poContactDetails(payload.purchasing_doc_no);
                payload.vendor_name = result[0]?.vendor_name;
                payload.vendor_code = result[0]?.vendor_code;
                payload.mailSendTo = result[0]?.vendor_mail_id;
                payload.delingOfficerName = result[0]?.dealingOfficerName;
                payload.sendAt = new Date(payload.created_at);

                mailTrigger({ ...payload }, QAP_SUBMIT_BY_GRSE);

            }
        }
        if (payload.status === APPROVED && payload.updated_by == "GRSE") {

            const result = await poContactDetails(payload.purchasing_doc_no);
            payload.vendor_name = result[0]?.vendor_name;
            payload.vendor_code = result[0]?.vendor_code;
            payload.mailSendTo = result[0]?.vendor_mail_id;
            payload.delingOfficerName = result[0]?.dealingOfficerName;
            payload.sendAt = new Date(payload.created_at);
            mailTrigger({ ...payload }, QAP_SUBMIT_BY_GRSE);

        }
    }
    catch (error) {
        console.log("QAP Submissio api", error);

        return resSend(res, false, 500, "internal server error", [], null);
    }
}

const getQAPData = async (getQuery, purchasing_doc_no, drawingStatus) => {
    // const Q = `SELECT purchasing_doc_no FROM ${QAP_SUBMISSION} WHERE purchasing_doc_no = ? AND status = ?`;
    const result = await query({ query: getQuery, values: [purchasing_doc_no, drawingStatus] });
    return result;
}


const list = async (req, res) => {
    try {
        const tokenData = req.tokenData;
        const pre = `SELECT * FROM ${QAP_SUBMISSION} WHERE `;
        let qry = ``;
        let valArr = ``;
        if (tokenData.user_type === USER_TYPE_VENDOR) {
            qry = `purchasing_doc_no = ? AND vendor_code = ?`;
            valArr = [req.query.poNo, tokenData.vendor_code];
        }
        if (tokenData.department_id === USER_TYPE_GRSE_QAP && tokenData.internal_role_id === QAP_ASSIGNER) {
            qry = `purchasing_doc_no = ?`;
            valArr = [req.query.poNo];
        }
        if (tokenData.department_id === USER_TYPE_GRSE_QAP && tokenData.internal_role_id === QAP_STAFF) {
            qry = `purchasing_doc_no = ? AND assigned_to = ?`;
            valArr = [req.query.poNo, tokenData.vendor_code];
        }
        const finalQuery = pre + qry;
        if (finalQuery == "") {
            resSend(res, true, 200, "no user type or deperment found.", fileData, null);
        }
        
        const result = await query({ query: finalQuery, values: valArr });
        if (!result.length) {
            return resSend(res, true, 200, "No QAP found.", null, null);
        }
        return resSend(res, true, 200, "data fetched successfully.", result, null);
    } catch (err) {
        console.log("data not fetched", err);
        resSend(res, false, 500, "Internal server error", null, null);
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

    const internalDepartmentList = async (req, res) => {

        req.query.$tableName = `sub_dept`;
        req.query.$select = "id,name";
        try {
            getFilteredData(req, res);
        } catch (err) {
            console.log("data not fetched", err);
        }
        // resSend(res, true, 200, "oded!", req.query, null);

    }

    const internalDepartmentEmpList = async (req, res) => {

        const sub_dept_id = req.query.sub_dept_id;
        try {
            const q = `SELECT t1.emp_id, t1. sub_dept_name, t1.dept_name, t2.CNAME as empName, t3.USRID_LONG as empEmail
	FROM emp_department_list 
    	AS t1 
      LEFT JOIN 
      	pa0002 
       AS t2 
       ON 
       	t1.emp_id = t2.PERNR 
       LEFT JOIN pa0105 
       	AS t3 
       ON 
       (t3.PERNR = t2.PERNR AND t3.SUBTY = '0030')
        WHERE 
        t1.sub_dept_id = ?`;

            const response = await query({ query: q, values: [sub_dept_id] });
            resSend(res, true, 200, "oded!", response, null);
        } catch (err) {
            console.log("data not fetched", err);
        }

        // req.query.$tableName = `sub_dept`;
        // req.query.$select = "id,name";
        // try {
        //   getFilteredData(req, res);
        // } catch(err) {
        //   console.log("data not fetched", err);
        // }
        // resSend(res, true, 200, "oded!", req.query, null);

    }

    module.exports = { submitQAP, list, internalDepartmentList, internalDepartmentEmpList }