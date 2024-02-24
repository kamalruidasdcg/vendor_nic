const path = require('path');
const { qapPayload } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT, USER_TYPE_GRSE_QAP, QAP_STAFF, USER_TYPE_VENDOR, ASSIGNER } = require("../../lib/constant");
const { QAP_SUBMISSION } = require("../../lib/tableName");
const { PENDING, APPROVED, RE_SUBMITTED, ACCEPTED, REJECTED, SAVED, ASSIGNED, UPDATED } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const { getFilteredData } = require("../../controllers/genralControlles");
const { QAP_SUBMIT_BY_VENDOR, QAP_SUBMIT_BY_GRSE, QAP_ASSIGN_BY_GRSE, QAP_APPROVED_BY_GRSE } = require('../../lib/event');
const { mailTrigger } = require('../sendMailController');
const { deptLogEntry } = require('../../log/deptActivities');



// add new post
const submitQAP = async (req, res) => {
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
        }
        let payload = { ...req.body, ...fileData, created_at: getEpochTime() };

        payload.updated_by = (tokenData.user_type === USER_TYPE_VENDOR) ? "VENDOR" : "GRSE";
        payload.action_by_id = tokenData.vendor_code;
        const activity_type = payload.status;
        const purchasing_doc_no = payload.purchasing_doc_no;
        const verifyStatusForStaff = new Set([REJECTED, ACCEPTED, SAVED, APPROVED, UPDATED]);

        if (!payload.purchasing_doc_no || !payload.remarks || !payload.status) {
            // const directory = path.join(__dirname, '..', 'uploads', 'drawing');
            // const isDel = handleFileDeletion(directory, req.file.filename);
            return resSend(res, false, 200, "Remarks is mandotory!", null, null);
        }
        // if ((tokenData.user_type === USER_TYPE_VENDOR && activity_type === RE_SUBMITTED) || tokenData.department_id === USER_TYPE_GRSE_QAP) {
        //     if (!payload.assigned_from || !payload.assigned_to) {
        //         return resSend(res, false, 400, `Please send assign from and assign to.`, null, null);
        //     }
        // }

        let message = ``;

        ///////// CHECK DEPERTMENT /////////////////
        if (tokenData.department_id && tokenData.department_id === USER_TYPE_GRSE_QAP) {


            ///////// CHECK ROLE IS ASSIGNER /////////////////
            if (activity_type === ASSIGNED) {
                if (tokenData.internal_role_id === ASSIGNER) {
                    const checkAssigneQuery = `SELECT COUNT(status) AS countval FROM qap_submission WHERE purchasing_doc_no = ? AND status = ?`;
                    const resAssigneQry = await query({ query: checkAssigneQuery, values: [purchasing_doc_no, ASSIGNED] });
                    if (resAssigneQry[0].countval > 0) {
                        message = `This QAP has already ${ASSIGNED}`;
                        return resSend(res, true, 200, message, null, null);
                    }

                } else {
                    message = `You dont have permission.`;
                    return resSend(res, true, 200, message, null, null);
                }
            }
            ///////// CHECK ROLE IS ASSIGNER /////////////////

            ///////// CHECK ROLE IS STAFF /////////////////
            if (verifyStatusForStaff.has(activity_type)) {
                if (tokenData.internal_role_id === QAP_STAFF) {
                    const checkAssigneStaffQuery = `SELECT COUNT(status) AS countval FROM qap_submission WHERE purchasing_doc_no = ? AND status = ?  AND assigned_to = ?`;
                    const resAssigneStaffQry = await query({ query: checkAssigneStaffQuery, values: [purchasing_doc_no, ASSIGNED, tokenData.vendor_code] });
                    if (resAssigneStaffQry[0].countval === 0) {
                        message = `you dont have permission.`;
                        return resSend(res, true, 200, message, null, null);
                    }
                }
            }
            ///////// CHECK ROLE IS STAFF /////////////////


            ///////// CHECK IS ALLREADY APPROVED /////////////////
            const GET_LATEST_QAP = `SELECT purchasing_doc_no, status, updated_by, created_by_id, created_by_name FROM ${QAP_SUBMISSION} WHERE (purchasing_doc_no = ? AND status = ?) ;`;
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

        // if (tokenData.user_type === USER_TYPE_VENDOR && activity_type === PENDING) {
        //     payload.assigned_from = null;
        //     payload.assigned_to = null;
        // }
        if (activity_type !== PENDING) {

            const status = activity_type == ASSIGNED ? PENDING : ASSIGNED;
            const qapDetails = await getMailIds(payload.purchasing_doc_no, status);

            if (!qapDetails.success) return resSend(res, false, 400, "Please check payloaddd", null, null);
            if (activity_type == ASSIGNED) {
                payload.vendor_code = qapDetails.data.vendor_code;
                const details = await getNameAndEmail(qapDetails.data.vendor_code, payload.assigned_from, payload.assigned_to);
                if (details.success === true) {
                    payload = { ...payload, ...details.data };
                }
            } else {
                payload.vendor_code = qapDetails.data.vendor_code;
                payload.assigned_to = qapDetails.data.assigned_to;
                payload.assigned_from = qapDetails.data.assigned_from;
                payload.created_by_name = qapDetails.data.created_by_name;

                payload = { ...payload, ...qapDetails.data };

            }
        }



        //////// SET STATUS AND CREATE QAP PAYLOAD /////////
        let insertObj;
        // REJECTED, ACCEPTED, SAVED, APPROVED, UPDATED

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
            case UPDATED:
                insertObj = qapPayload(payload, UPDATED);
                break;
            default:
                console.log("other1");

        }
        //////// SET STATUS AND CREATE QAP PAYLOAD /////////

        if (tokenData.user_type === USER_TYPE_VENDOR && (activity_type != PENDING && activity_type != RE_SUBMITTED)) {
            return resSend(res, true, 200, `vendor can only send status for ${PENDING} and ${RE_SUBMITTED}`, null, null);
        }

        const { q, val } = generateQuery(INSERT, QAP_SUBMISSION, insertObj);
        const response = await query({ query: q, values: val });
        if (response.affectedRows) {
            payload.insertId = response.insertId;
            payload.sendAt = new Date(payload.created_at);
            handelMail(tokenData, payload);
            resSend(res, true, 200, "Inserted successfully", fileData, null);
        } else {
            resSend(res, false, 400, "No data inserted", response, null);
        }
    }
    catch (error) {
        console.log("QAP Submissio api", error);

        return resSend(res, false, 500, "internal server error", error, null);
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
        // const pre = `SELECT qap.* FROM ${QAP_SUBMISSION} AS qap WHERE `;
        const pre = `
                SELECT
                qap.*, 
                vendor.SMTP_ADDR AS vendor_email, 
                grse_officers_assignFrom.USRID_LONG AS assigned_from_email,
                grse_officers_assignTo.USRID_LONG AS assigned_to_email
                FROM qap_submission 
                    AS qap
                LEFT JOIN
                    adr6 AS vendor
                ON
                    vendor.PERSNUMBER = qap.vendor_code
                LEFT JOIN
                    pa0105
                    AS
                        grse_officers_assignFrom
                     ON
                         (grse_officers_assignFrom.PERNR = qap.assigned_from AND grse_officers_assignFrom.SUBTY = "0030")
                   LEFT JOIN
                    pa0105
                    AS
                        grse_officers_assignTo
                     ON
                         (grse_officers_assignTo.PERNR = qap.assigned_to AND grse_officers_assignTo.SUBTY = "0030")

                    WHERE qap.purchasing_doc_no = ?`;
        // let qry = ``;
        // let valArr = ``;
        // if (tokenData.user_type === USER_TYPE_VENDOR) {
        //     qry = `( qap.purchasing_doc_no = ? AND qap.vendor_code = ? )`;
        //     valArr = [req.query.poNo, tokenData.vendor_code];
        // }
        // if (tokenData.department_id === USER_TYPE_GRSE_QAP && tokenData.internal_role_id === QAP_ASSIGNER) {
        //     qry = `qap.purchasing_doc_no = ?`;
        //     valArr = [req.query.poNo];
        // }
        // if (tokenData.department_id === USER_TYPE_GRSE_QAP && tokenData.internal_role_id === QAP_STAFF) {
        //     qry = `( qap.purchasing_doc_no = ? AND qap.assigned_to = ? )`;
        //     valArr = [req.query.poNo, tokenData.vendor_code];
        // }
        // const finalQuery = pre + qry;
        // if (finalQuery == "") {
        //     resSend(res, true, 200, "no user type or deperment found.", fileData, null);
        // }
        const result = await query({ query: pre, values: [req.query.poNo] });
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
}

async function handelMail(tokenData, payload) {

    if (tokenData.user_type === USER_TYPE_VENDOR) {

        if (payload.status === PENDING) {
            // await logEntry(payload, tokenData.vendor_code, payload.assigned_from, null);
            // await mailSendToAssignee(payload);
            // await logEntry(payload, tokenData.vendor_code, null, null);
            await Promise.all([mailSendToAssignee(payload), logEntry(payload, tokenData.vendor_code, null, null)])
        }
        if (payload.status === RE_SUBMITTED) {
            // await logEntry(payload, tokenData.vendor_code, payload.assigned_from, payload.assigned_to);
            // await mailSendToAssigneeAndStaff(payload);
            // await logEntry(payload, tokenData.vendor_code, null, null);
            await Promise.all([mailSendToAssigneeAndStaff(payload), logEntry(payload, tokenData.vendor_code, null, null)])
        }

    } else if (tokenData.user_type !== USER_TYPE_VENDOR) {

        if (payload.status === ACCEPTED) {
            // await logEntry(payload, tokenData.vendor_code, payload.vendor_code, null);
            // await logEntry(payload, tokenData.vendor_code, null, null);
            // await mailSendToStaffAndVendor(payload);
            await Promise.all([logEntry(payload, tokenData.vendor_code, null, null), mailSendToStaffAndVendor(payload)])
        }
        if (payload.status === REJECTED) {
            // await logEntry(payload, tokenData.vendor_code, payload.vendor_code, null);
            // await logEntry(payload, tokenData.vendor_code, null, null);
            // await mailSendToAssigneeAndVendor(payload);
            await Promise.all([logEntry(payload, tokenData.vendor_code, null, null), mailSendToAssigneeAndVendor(payload)])
        }
        if (payload.status === APPROVED) {
            // await logEntry(payload, tokenData.vendor_code, payload.vendor_code, payload.assigned_to);
            // await logEntry(payload, tokenData.vendor_code, null, null);
            // await mailSendToAssigneeAndVendor(payload);

            await Promise.all([logEntry(payload, tokenData.vendor_code, null, null), mailSendToAssigneeAndVendor(payload)])
        }
        if (payload.status === ASSIGNED) {
            // await logEntry(payload, tokenData.vendor_code, null, null);
            // await mailSendToStaffAndVendor(payload);

            await Promise.all([logEntry(payload, tokenData.vendor_code, null, null), mailSendToStaffAndVendor(payload)])

        }

    }

}

const mailSendToAssignee = async (payload) => {

    // const result = await getMailIds(payload.insertId);
    // const assignee_from_Details = await getAssigneeMailId();
    // const result = await Promise.all([getMailIds(payload.insertId), getAssigneeMailId()]);
    const result = await getAssigneeMailId();

    payload.delingOfficerName = payload.assigned_from_name;
    payload.mailSendTo = payload.assigned_from_email;

    await mailTrigger({ ...payload }, QAP_SUBMIT_BY_VENDOR);
}

const mailSendToAssigneeAndStaff = async (payload) => {
    // PO CREATOR IS DEFAULT ASSIGNEE && MAIL IS DEFAULT ASSIGNEE EMAIL
    payload.delingOfficerName = payload.assigned_from_name;
    payload.mailSendTo = payload.assigned_from_email;
    const pl_1 = { ...payload };
    payload.delingOfficerName = payload.assigned_to_name;
    payload.mailSendTo = payload.assigned_to_email;


    const pl_2 = { ...payload }

    // await mailTrigger(pl_2, QAP_SUBMIT_BY_VENDOR);
    await Promise.all([mailTrigger(pl_1, QAP_SUBMIT_BY_VENDOR), mailTrigger(pl_2, QAP_SUBMIT_BY_VENDOR)])
}

const mailSendToStaffAndVendor = async (payload) => {

    // MAIL SEND TO ASSIGEE , A NEW QAP IS INSERTED IN DB
    // const result = await getMailIds(payload.insertId);
    // mail to vendor
    payload.delingOfficerName = payload.assigned_from_name;
    payload.mailSendTo = payload.vendor_email;


    const pl_1 = { ...payload }
    // await mailTrigger({ ...payload }, QAP_SUBMIT_BY_GRSE);

    // mail send to grse staff

    payload.delingOfficerName = payload.assigned_to_name;
    payload.mailSendTo = payload.assigned_to_email;
    payload.grseOfficer = payload.assigned_from_name;
    payload.grseOfficerId = payload.assigned_from;


    const pl_2 = { ...payload }

    // await mailTrigger({ ...payload }, QAP_ASSIGN_BY_GRSE);

    await Promise.all([mailTrigger({ ...payload }, QAP_SUBMIT_BY_GRSE), mailTrigger({ ...payload }, QAP_ASSIGN_BY_GRSE)])

}

const mailSendToAssigneeAndVendor = async (payload) => {

    // MAIL SEND TO ASSIGEE , A NEW QAP IS INSERTED IN DB
    // const result = await getMailIds(payload.insertId);
    // APPROVE ACCEPTED REJECTED STATUS
    // mail to vendor
    payload.delingOfficerName = payload.assigned_from_name;
    payload.mailSendTo = payload.vendor_email;

    const pl_1 = { ...payload }
    // await mailTrigger({ ...payload }, QAP_APPROVED_BY_GRSE);

    // mail send to grse staff

    payload.delingOfficerName = payload.assigned_from_name;
    payload.mailSendTo = payload.assigned_from_email;
    payload.grseOfficer = payload.assigned_to_name;
    payload.grseOfficerId = payload.assigned_to;

    const pl_2 = { ...payload }
    // await mailTrigger({ ...payload }, QAP_ASSIGN_BY_GRSE);

    await Promise.all([mailTrigger({ ...payload }, QAP_APPROVED_BY_GRSE), mailTrigger({ ...payload }, QAP_ASSIGN_BY_GRSE)])

}

const mailSendToVendor = async (payload) => {




    const result = await poContactDetails(payload.purchasing_doc_no);

    payload.mailSendTo = payload.vendor_mail_id;
    payload.delingOfficerName = payload.dealingOfficerName;
    payload.sendAt = new Date(payload.created_at);


    const logPayload = [
        {
            user_id: 600230,
            depertment: 3,
            action: payload.status,
            item_info_id: payload.insertId,
            remarks: payload.remarks,
            purchasing_doc_no: payload.purchasing_doc_no,
            created_at: payload.created_at,
            created_by_id: payload.created_by_id,
        }]
    const log = await deptLogEntry(logPayload)

    mailTrigger({ ...payload }, QAP_SUBMIT_BY_VENDOR);
}


async function getMailIds(purchasing_doc_no, status) {
    try {
        const mailFetchQuery = `
        SELECT 
        vendor.SMTP_ADDR AS vendor_email, 
        grse_officers_assignFrom.USRID_LONG AS assigned_from_email,
        grse_officers_assignTo.USRID_LONG AS assigned_to_email,
        vendor_master.NAME1 as vendor_name,
        qap.created_by_name as created_by_name,
        qap.vendor_code AS vendor_code,
        qap.assigned_from AS assigned_from,
        qap.assigned_to AS assigned_to,
        assignFrom_detail.CNAME AS assigned_from_name,
        assignTo_detail.CNAME AS assigned_to_name
        FROM qap_submission
            AS qap
        LEFT JOIN
            adr6 
        AS 
        	vendor
        ON
            vendor.PERSNUMBER = qap.vendor_code
          LEFT JOIN 
            lfa1
        AS
            vendor_master
        ON
            vendor_master.LIFNR = qap.vendor_code
        LEFT JOIN
            pa0105
        AS
            grse_officers_assignFrom
        ON
            (grse_officers_assignFrom.PERNR = qap.assigned_from AND grse_officers_assignFrom.SUBTY = "0030")
        LEFT JOIN
            pa0002
        AS 
            assignFrom_detail
        ON
            assignFrom_detail.PERNR = qap.assigned_from

        LEFT JOIN
            pa0105
        AS
            grse_officers_assignTo
        ON
            (grse_officers_assignTo.PERNR = qap.assigned_to AND grse_officers_assignTo.SUBTY = "0030")

            LEFT JOIN
            pa0002
        AS 
            assignTo_detail
        ON
            assignTo_detail.PERNR = qap.assigned_to
        
        WHERE 
            qap.purchasing_doc_no = ? AND status = ? LIMIT 1;`;

        const result = await query({ query: mailFetchQuery, values: [purchasing_doc_no, status] })
        if (result && result.length) {
            return { success: true, data: result[0] };
        } else {
            return { success: false, data: {} }
        }

    } catch (error) {

        console.log("get details error", error);

    }
}

async function getNameAndEmail(vendor_code, assigned_from, assigned_to) {
    try {
        const mailFetchQuery =
            `
                (SELECT v_add.SMTP_ADDR AS email, v.NAME1 AS name, 'vendor_email' as flag
                FROM 
                    adr6
                 AS
                 	v_add
                 LEFT JOIN
                 	lfa1
                 AS 
                 	v
                 ON
                 	v.LIFNR = v_add.PERSNUMBER
                 WHERE v_add.PERSNUMBER = ?)
                UNION
                (SELECT officers.USRID_LONG AS email, grse_off.CNAME AS name,'assigned_from_email' as flag
                	FROM pa0105
                 AS 
                 	officers
                 LEFT JOIN
                 	pa0002
                AS
                 	grse_off
                 ON
                 	grse_off.PERNR =  officers.PERNR
                 WHERE 
                 	officers.PERNR = ?)
                UNION
                (SELECT officers2.USRID_LONG AS email, grse_off2.CNAME AS name,'assigned_to_email' as flag
                 FROM 
                 	pa0105
                 AS 
                 	officers2

                LEFT JOIN
                 	pa0002
                AS
                 	grse_off2
                 ON
                 	grse_off2.PERNR =  officers2.PERNR
                 WHERE 
                 	officers2.PERNR = ?);`;

        const result = await query({ query: mailFetchQuery, values: [vendor_code, assigned_from, assigned_to] })
        if (result && result.length) {
            const obj = {
                vendor_name: result[0].name,
                vendor_email: result[0].email,
                assigned_from_name: result[1].name,
                assigned_from_email: result[1].email,
                assigned_to_name: result[2].name,
                assigned_to_email: result[2].email
            }
            return { success: true, data: obj };
        } else {
            return { success: false, data: {} }
        }

    } catch (error) {

        console.log("get details error", error);

    }
}


async function logEntry(payload, vendor_code, assigned_from, assigner_person_id) {
    try {

        const data = [];
        if (assigned_from) {
            data.push(assigned_from)
        } if (assigner_person_id) {
            data.push(assigner_person_id)
        }
        if (vendor_code) {
            data.push(vendor_code)
        }

        const logPayload = []
        for (let i = 0; i < data.length; i++) {
            logPayload.push({
                user_id: data[i],
                vendor_code: payload.vendor_code,
                depertment: 3,
                action: payload.status,
                item_info_id: payload.insertId,
                remarks: payload.remarks,
                purchasing_doc_no: payload.purchasing_doc_no,
                created_at: payload.created_at,
                created_by_id: payload.action_by_id
            })
        }
        const log = await deptLogEntry(logPayload)
    } catch (error) {

        console.log("log entry api", error);

    }
}

async function getAssigneeMailId() {
    try {
        const mailIdQuery = `
        SELECT 
        assignee.USRID_LONG as assigned_from_email,
        assignFrom_detail.CNAME AS assigned_from_name
        FROM 
            depertment_master 
        AS
            dept_master 
        LEFT JOIN
            auth
        AS
            auth
        ON
            (auth.department_id = dept_master.id AND auth.internal_role_id = ?)
        LEFT JOIN
            pa0105
        AS
            assignee
        ON
            (assignee.PERNR = auth.vendor_code AND assignee.SUBTY = ? )
        LEFT JOIN
            pa0002
        AS
            assignFrom_detail
        ON
            assignFrom_detail.PERNR = auth.vendor_code
        WHERE
            dept_master.id = ? ;`;

        const result = await query({ query: mailIdQuery, values: [1, "0030", 3] });
        return result;
    } catch (error) {

    }
}

module.exports = { submitQAP, list, internalDepartmentList, internalDepartmentEmpList }
//     const response = await query({ query: q, values: [sub_dept_id] });
//     resSend(res, true, 200, "oded!", response, null);
// } catch (err) {
//     console.log("data not fetched", err);
// }

// req.query.$tableName = `sub_dept`;
// req.query.$select = "id,name";
// try {
//   getFilteredData(req, res);
// } catch(err) {
//   console.log("data not fetched", err);
// }
// resSend(res, true, 200, "oded!", req.query, null);

// }

// module.exports = { submitQAP, list, internalDepartmentList, internalDepartmentEmpList }
