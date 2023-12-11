const path = require('path');
const { qapPayload } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT } = require("../../lib/constant");
const { QAP_SUBMISSION } = require("../../lib/tableName");
const { PENDING, APPROVED, RE_SUBMITTED, ACCEPTED, REJECTED, SAVED } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const { getFilteredData } = require("../../controllers/genralControlles");
const { DRAWING_SUBMIT_MAIL_TEMPLATE, QAP_SUBMIT_MAIL_TEMPLATE } = require('../../templates/mail-template');
const SENDMAIL = require('../../lib/mailSend');
const { mailInsert } = require('../../services/mai.services');
const { QAP_SUBMIT_BY_VENDOR, QAP_SUBMIT_BY_GRSE } = require('../../lib/event');
const { mailTrigger } = require('../sendMailController');



// add new post
const submitQAP = async (req, res) => {

    try {


const user_id = req.tokenData.vendor_code;
const screen_name = 'qap';
const activity_type = req.body.status;

const CHECK_AUTH = `SELECT activity_status FROM permission where user_id = ? and screen_name = ? and activity_type = ?`;
const resAuthQry = await query({ query: CHECK_AUTH, values: [user_id, screen_name, activity_type] });
if(!resAuthQry.length || resAuthQry[0].activity_status == 0) {
    return resSend(res, false, 400, "You dont have permission for this activity.", null, null);
} 
// Handle Image Upload
        let fileData = {};
        if (req.file) {
            fileData = {
                fileName: req.file.filename,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
            };

            let payload = { ...req.body, ...fileData, created_at: getEpochTime() };

            const verifyStatus = [PENDING, RE_SUBMITTED, APPROVED, ACCEPTED, REJECTED, SAVED]

            if (!payload.purchasing_doc_no || !payload.updated_by || !payload.action_by_name || !payload.action_by_id || !verifyStatus.includes(payload.status)) {

                // const directory = path.join(__dirname, '..', 'uploads', 'drawing');
                // const isDel = handleFileDeletion(directory, req.file.filename);
                return resSend(res, false, 400, "Please send valid payload", null, null);

            }

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

            let insertObj;

            if (payload.status === PENDING) {
                insertObj = qapPayload(payload, PENDING);
            } else if (payload.status === RE_SUBMITTED) {

                // const GET_LATEST_SDBG = `SELECT purchasing_doc_no FROM ${QAP_SUBMISSION} WHERE purchasing_doc_no = ? AND status = ?`;


                // const result = await query({ query: GET_LATEST_SDBG, values: [payload.purchasing_doc_no, PENDING] });
                // console.log("iiii", result)

                // if (!result || !result.length) {
                //     return resSend(res, true, 200, "No SDBG found to resubmit", null, null);
                // }

                // insertObj = qapPayload(payload, RE_SUBMITTED);

            } else if (payload.status === APPROVED) {

                insertObj = qapPayload(payload, APPROVED);
            } else if (payload.status === ACCEPTED) {
                insertObj = qapPayload(payload, ACCEPTED);
            } else if (payload.status === REJECTED) {
                insertObj = qapPayload(payload, REJECTED);
            } else if (payload.status === SAVED) {
                insertObj = qapPayload(payload, SAVED);
            }

            const { q, val } = generateQuery(INSERT, QAP_SUBMISSION, insertObj);
            const response = await query({ query: q, values: val });

            if (response.affectedRows) {


                // let mailDetails = {};
                // if (payload.status === PENDING && payload.mailSendTo) {


                //     if (payload.updated_by == "VENDOR") {
                //         mailDetails = {
                //             // from: "kamal.sspur@gmail.com",
                //             to: payload.mailSendTo,
                //             // to: "mainak.dutta16@gmail.com",
                //             subject: "Submission of QAP",
                //             html: QAP_SUBMIT_MAIL_TEMPLATE(mailBodyForGRSE, "Vendor QAP submitted"),
                //         };
                //     } else {
                //         mailDetails = {
                //             // from: "kamal.sspur@gmail.com",
                //             to: payload.mailSendTo,
                //             // to: "mainak.dutta16@gmail.com",
                //             subject: "Submission of QAP",
                //             html: QAP_SUBMIT_MAIL_TEMPLATE(mailBodyForVendor, "GRSR updated"),
                //         };
                //     }
                //     const mailIns = await mailInsert({ ...mailDetails, action_by_id: payload.action_by_id, action_by_name: payload.action_by_name });

                //     SENDMAIL(mailDetails, function (err, data) {
                //         if (!err) {
                //             console.log("Error Occurs", err);
                //         } else {
                //             // console.log("Email sent successfully", data);
                //             console.log("Email sent successfully");
                //         }
                //     });

                // }
                // if (payload.status === APPROVED && payload.mailSendTo) {

                //     const mailBodyForVendor = `
                //     Dear XXXXXXXX (Vendor code/ Vendor name), <br>
                //     Below are the details pertinent to approved of QAP for the PO - ${payload.purchasing_doc_no}.
                //     <br>
                //     <br>
                //     Vendor : ${payload.vendor_name ? payload.vendor_name : "" } [${payload.vendor_code}]<br>
                //     Remarks: ${payload.remarks}<br>
                //     Date : ${new Date(payload.created_at)} <br>
                //     `;
                //     mailDetails = {
                //         // from: "kamal.sspur@gmail.com",
                //         to: payload.mailSendTo,
                //         // to: "mainak.dutta16@gmail.com",
                //         subject: "QAP Approved",
                //         html: QAP_SUBMIT_MAIL_TEMPLATE(mailBodyForVendor, "GRSR updated"),
                //     };

                //     const mailIns = await mailInsert({ ...mailDetails, action_by_id: payload.action_by_id, action_by_name: payload.action_by_name });

                //     SENDMAIL(mailDetails, function (err, data) {
                //         if (!err) {
                //             console.log("Error Occurs", err);
                //         } else {
                //             // console.log("Email sent successfully", data);
                //             console.log("Email sent successfully");
                //         }
                //     });

                // }


                if (payload.status === PENDING) {

                    if (payload.updated_by == "VENDOR") {

                        const result = await poContactDetails(payload.purchasing_doc_no);
                        payload.delingOfficerName = result[0]?.dealingOfficerName;
                        payload.mailSendTo = result[0]?.dealingOfficerMail;
                        payload.vendor_name = result[0]?.vendor_name;
                        payload.vendor_code = result[0]?.vendor_code;
                        payload.sendAt = new Date(payload.created_at);
                        mailTrigger({ ...payload }, QAP_SUBMIT_BY_VENDOR);

                        console.log("payload",payload);

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

                resSend(res, true, 200, "file uploaded!", fileData, null);
            } else {
                resSend(res, false, 400, "No data inserted", response, null);
            }


        } else {
            resSend(res, false, 400, "Please upload a valid File", fileData, null);
        }

    } catch (error) {
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

    req.query.$tableName = QAP_SUBMISSION;

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
    } catch(err) {
      console.log("data not fetched", err);
    }
  // resSend(res, true, 200, "oded!", req.query, null);
   
}

const internalDepartmentEmpList = async (req, res) => {
    
const sub_dept_id = req.query.sub_dept_id;
try{
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
}  catch(err) {
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