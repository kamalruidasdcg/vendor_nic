const path = require("path");
const { sdbgPayload, sdbgPayloadVendor } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const {
    INSERT,
    UPDATE,
    USER_TYPE_VENDOR,
    USER_TYPE_GRSE_QAP,
    ASSIGNER,
    STAFF,
    USER_TYPE_GRSE_FINANCE,
} = require("../../lib/constant");

const { EKKO, NEW_SDBG, SDBG_ENTRY, SDBG } = require("../../lib/tableName");
const { FINANCE } = require("../../lib/depertmentMaster");
const {
    PENDING,
    ACCEPTED,
    ASSIGNED,
    RE_SUBMITTED,
    REJECTED,
    FORWARD_TO_FINANCE,
    RETURN_TO_DEALING_OFFICER,
} = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const { getFilteredData } = require("../../controllers/genralControlles");
const SENDMAIL = require("../../lib/mailSend");
const { SDBG_SUBMIT_MAIL_TEMPLATE } = require("../../templates/mail-template");
const { mailInsert } = require("../../services/mai.services");
const { mailTrigger } = require("../sendMailController");
const {
    SDBG_SUBMIT_BY_VENDOR,
    SDBG_SUBMIT_BY_GRSE,
} = require("../../lib/event");
const { Console } = require("console");

// add new post
const submitSDBG = async (req, res) => {
    // return resSend(res, false, 200, "No data inserted", req.body, null);
    try {
        // Handle Image Upload
        let fileData = {};
        console.log(req.file);
        if (req.file) {
            fileData = {
                fileName: req.file.filename,
                filePath: req.file.path,
                // fileType: req.file.mimetype,
                //fileSize: req.file.size,
            };
            
            const tokenData = { ...req.tokenData };
           console.log(tokenData);

            let payload = { ...req.body, ...fileData, created_at: getEpochTime() };

            payload = sdbgPayload(payload);
            
            if (tokenData.user_type != USER_TYPE_VENDOR) {
                return resSend( res, false, 200, "Please please login as vendor for SDBG subminission.", null, null);
            }

            payload.vendor_code = tokenData.vendor_code;
            payload.updated_by = "VENDOR";
            payload.created_by_id = tokenData.vendor_code;
            const verifyStatus = [PENDING, RE_SUBMITTED];

            if (
                (!payload.purchasing_doc_no) &&
                verifyStatus.includes(payload.status)
            ) {
                // const directory = path.join(__dirname, '..', 'uploads', 'drawing');
                // const isDel = handleFileDeletion(directory, req.file.filename);
                return resSend( res, false, 400, "Please send valid payload", null, null);
            }

            const GET_LATEST_SDBG = `SELECT COUNT(purchasing_doc_no) AS count_po FROM ${SDBG} WHERE purchasing_doc_no = ? AND status = ?`;
    
            const result2 = await query({ query: GET_LATEST_SDBG, values: [payload.purchasing_doc_no, ACCEPTED] });

            if (result2[0].count_po > 0) {
                // const data = [{
                //     purchasing_doc_no: result2[0]?.purchasing_doc_no,
                //     status: result2[0]?.status,
                //     acknowledgedByName: result2[0]?.created_by_name,
                //     acknowledgedById: result2[0]?.created_by_id,
                //     message: "The SDBG is already acknowledge. If you want to reopen, please contact with senior management."
                // }];

                return resSend(res, true, 200, `The SDBG is already acknowledge. If you want to reopen, please contact with dealing officer.`, null, null);
            }
            // console.log(payload);
            // return;

            const { q, val } = generateQuery(INSERT, SDBG, payload);
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

                // await handelEmail(payload);

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
};

const getSDBGData = async (req, res) => {
    try {
        const tokenData = { ...req.tokenData };

        if (!req.query.poNo) {
            return resSend(res, true, 200, "Please send PO Number.", null, null);
        }

        const Q = `SELECT * FROM ${SDBG} WHERE purchasing_doc_no = ?`;
        const result = await query({
            query: Q,
            values: [req.query.poNo],
        });

        return resSend(res, true, 200, "data fetch successfully.", result, null);
    } catch (error) {
        return resSend(res, false, 400, "Data not fetch!!", error, null);
    }
};

const getSdbgEntry = async (req, res) => {
    try {
        const tokenData = { ...req.tokenData };

        if (!req.query.poNo) {
            return resSend(res, true, 200, "Please send PO Number.", null, null);
        }
        const { poNo } = req.query;
        let Query = `SELECT t1.* FROM sdbg_entry AS t1
                            LEFT JOIN 
                                    sdbg AS t2 
                                ON 
                            t2.purchasing_doc_no= t1.purchasing_doc_no 
                        WHERE t1.purchasing_doc_no = '${poNo}'`;

        const dealingOfficer = await checkIsDealingOfficer(
            poNo,
            tokenData.vendor_code
        );

        let sufix;
        if (
            tokenData.department_id === USER_TYPE_GRSE_FINANCE &&
            tokenData.internal_role_id === ASSIGNER
        ) {
            sufix = ` AND t2.status = '${FORWARD_TO_FINANCE}'`;
            Query = Query + sufix;
        } else if (
            tokenData.department_id === USER_TYPE_GRSE_FINANCE &&
            tokenData.internal_role_id === STAFF
        ) {
            sufix = ` AND t2.assigned_to = '${tokenData.vendor_code}'`;
            Query = Query + sufix;
        } else if (dealingOfficer === 1) {
            Query = Query;
        } else {
            return resSend(res, false, 200, "You are not authorized.", null, null);
        }
        const result = await query({ query: Query, values: [] });

        return resSend(
            res,
            true,
            200,
            "data fetch successfully.",
            result[0],
            null
        );
    } catch (error) {
        return resSend(res, false, 400, "Data not insert!!", error, null);
    }
};
const checkIsDealingOfficer = async (purchasing_doc_no, vendor_code) => {
    console.log([purchasing_doc_no, vendor_code]);
    console.log("#$%^&*");
    const getQuery = `SELECT COUNT(EBELN) AS man_no FROM ${EKKO} WHERE EBELN = ? AND ERNAM = ?`;
    const result = await query({
        query: getQuery,
        values: [purchasing_doc_no, vendor_code],
    });
    return result[0].man_no;
};

const sdbgSubmitByDealingOfficer = async (req, res) => {
    try {
        const tokenData = { ...req.tokenData };

        const { ...obj } = req.body;
        console.log(obj.purchasing_doc_no);
        if (
            !obj ||
            typeof obj !== "object" ||
            !Object.keys(obj).length ||
            !obj.purchasing_doc_no ||
            obj.purchasing_doc_no == ""
        ) {
            return resSend(res, false, 400, "INVALID PAYLOAD", null, null);
        }
        const dealingOfficer = await checkIsDealingOfficer(
            obj.purchasing_doc_no,
            tokenData.vendor_code
        );

        if (dealingOfficer === 0) {
            return resSend(
                res,
                false,
                200,
                "Please Login as dealing officer.",
                null,
                null
            );
        }

        const insertPayload = {
            purchasing_doc_no: obj.purchasing_doc_no,
            bank_name: obj.bank_name ? obj.bank_name : null,
            branch_name: obj.branch_name ? obj.branch_name : null,
            bank_addr1: obj.bank_addr1 ? obj.bank_addr1 : null,
            bank_addr2: obj.bank_addr2 ? obj.bank_addr2 : null,
            bank_addr3: obj.bank_addr3 ? obj.bank_addr3 : null,
            bank_city: obj.bank_city ? obj.bank_city : null,

            bank_pin_code: obj.bank_pin_code ? obj.bank_pin_code : null,

            bg_no: obj.bg_no ? obj.bg_no : null,
            bg_date: obj.bg_date ? obj.bg_date : null,
            bg_ammount: obj.bg_ammount ? obj.bg_ammount : null,
            department: obj.department ? obj.department : null,
            po_date: obj.po_date ? obj.po_date : null,
            yard_no: obj.yard_no ? obj.yard_no : null,

            validity_date: obj.validity_date ? obj.validity_date : null,
            claim_priod: obj.claim_priod ? obj.claim_priod : null,
            check_list_reference: obj.check_list_reference
                ? obj.check_list_reference
                : null,
            check_list_date: obj.check_list_date ? obj.check_list_date : null,
            bg_type: obj.bg_type ? obj.bg_type : null,
            vendor_name: obj.vendor_name ? obj.vendor_name : null,
            vendor_address1: obj.vendor_address1 ? obj.vendor_address1 : null,
            vendor_address2: obj.vendor_address2 ? obj.vendor_address2 : null,
            vendor_address3: obj.vendor_address3 ? obj.vendor_address3 : null,
            vendor_city: obj.vendor_city ? obj.vendor_city : null,

            vendor_pin_code: obj.vendor_pin_code ? obj.vendor_pin_code : null,
            extension_date1: obj.extension_date1 ? obj.extension_date1 : null,
            extension_date2: obj.extension_date2 ? obj.extension_date2 : null,
            extension_date3: obj.extension_date3 ? obj.extension_date3 : null,
            extension_date4: obj.extension_date4 ? obj.extension_date4 : null,
            extension_date5: obj.extension_date5 ? obj.extension_date5 : null,
            extension_date6: obj.extension_date6 ? obj.extension_date6 : null,
            release_date: obj.release_date ? obj.release_date : null,
            demand_notice_date: obj.demand_notice_date
                ? obj.demand_notice_date
                : null,

            entension_letter_date: obj.entension_letter_date
                ? obj.entension_letter_date
                : null,

            status: "FORWARD_TO_FINANCE",
            created_at: getEpochTime(),
            created_by: tokenData.vendor_code,
        };
        //console.log(insertPayload);
        let dbQuery = `SELECT COUNT(purchasing_doc_no) AS po_count FROM ${SDBG_ENTRY} WHERE purchasing_doc_no = ?`;
        const dbResult = await query({
            query: dbQuery,
            values: [obj.purchasing_doc_no],
        });

        // console.log("@#$%^&*(*&^");
        // console.log(dbResult[0].po_count);

        const whereCondition = `purchasing_doc_no = "${obj.purchasing_doc_no}"`;

        let { q, val } =
            dbResult[0].po_count > 0
                ? generateQuery(UPDATE, SDBG_ENTRY, insertPayload, whereCondition)
                : generateQuery(INSERT, SDBG_ENTRY, insertPayload);

        let sdbgEntryQuery = await query({ query: q, values: val });

        if (sdbgEntryQuery.error) {
            console.log(sdbgEntryQuery.error);
            return resSend(
                res,
                false,
                201,
                "Data not 1insert!!",
                sdbgEntryQuery.error,
                null
            );
        }

        const Q = `SELECT file_name,file_path,vendor_code FROM ${SDBG} WHERE purchasing_doc_no = ?`;
        let sdbgResult = await query({ query: Q, values: [obj.purchasing_doc_no] });
        let sdbgDataResult = sdbgResult[0];
        // console.log("sdbgDataResult");
        // console.log(sdbgDataResult);
        const insertPayloadForSdbg = {
            purchasing_doc_no: obj.purchasing_doc_no,
            ...sdbgDataResult,
            remarks: "SDBG entry forwarded to Finance.",
            status: "FORWARD_TO_FINANCE",
            assigned_from: tokenData.vendor_code,
            assigned_to: obj.assigned_to || null,
            created_at: getEpochTime(),
            created_by_name: "Dealing officer",
            created_by_id: tokenData.vendor_code,
            updated_by: "GRSE",
        };
        console.log("sdbg--");
        console.log(insertPayloadForSdbg);
        let insertsdbg_q = generateQuery(INSERT, SDBG, insertPayloadForSdbg);
        // console.log(insertsdbg_q);
        // return;
        let sdbgQuery = await query({
            query: insertsdbg_q["q"],
            values: insertsdbg_q["val"],
        });

        console.log("rt67898uygy");
        console.log(sdbgQuery);
        return resSend(
            res,
            true,
            200,
            "Forworded to finance successfully!",
            sdbgQuery,
            null
        );
    } catch (error) {
        console.log(error);
        return resSend(res, false, 201, "Data not insert!!", error, null);
    }
};

const sdbgUpdateByFinance = async (req, res) => {
    // payload
    // purchasing_doc_no, remarks, status, assigned_to,
    const tokenData = { ...req.tokenData };
    const { ...obj } = req.body;
    // resSend(res, true, 200, "SDBG assign to staff successfully!", tokenData, null);
    try {
        if (tokenData.department_id != FINANCE) {
            return resSend(res, true, 200, "please login as finance!", null, null);
        }
        const getQuery = `SELECT COUNT(purchasing_doc_no) AS po_count FROM ${SDBG} WHERE purchasing_doc_no = ? AND status = ?`;
        const result = await query({
            query: getQuery,
            values: [obj.purchasing_doc_no, FORWARD_TO_FINANCE],
        });
        if (result[0].po_count === 0) {
            return resSend(
                res,
                true,
                200,
                "This po is not forward to finance.Please contact with dealing officer.",
                null,
                null
            );
        }
        if (
            !obj.purchasing_doc_no ||
            obj.purchasing_doc_no == "" ||
            !obj.remarks ||
            obj.remarks == "" ||
            !obj.status ||
            obj.status == ""
        ) {
            return resSend(
                res,
                true,
                200,
                "please send a valid p4ayload!",
                null,
                null
            );
        }
        // if (
        //     tokenData.internal_role_id == ASSIGNER &&
        //     obj.status == ACCEPTED &&
        //     (!obj.assigned_to || obj.assigned_to)
        // ) {
        //     return resSend(res, true, 200, "please send a assigned_to!", null, null);
        // }

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
            assigned_from:
                tokenData.internal_role_id == ASSIGNER ? tokenData.vendor_code : null,
            assigned_to: tokenData.internal_role_id == ASSIGNER ? obj.assigned_to : null,
            created_at: getEpochTime(),
            created_by_name: "finance dept",
            created_by_id: tokenData.vendor_code,
            updated_by: "GRSE",
        };
        let insertsdbg_q = generateQuery(INSERT, SDBG, insertPayloadForSdbg);
        let sdbgQuery = await query({
            query: insertsdbg_q["q"],
            values: insertsdbg_q["val"],
        });

        resSend(res, true, 200, "Assigned!", sdbgQuery, null);
    } catch (error) {
        resSend(res, false, 400, "somthing went wrong!", error, null);
    }
};

const assigneeList = async (req, res) => {
    console.log(req.tokenData);
    const tokenData = { ...req.tokenData };

    if (tokenData.department_id != FINANCE || tokenData.internal_role_id != ASSIGNER) {
        return resSend(
            res,
            true,
            200,
            "Please Login as Finance Assigner.",
            null,
            null
        );
    }

    const sdbgQuery = `SELECT t1.*, t2.CNAME, t3.USRID_LONG FROM emp_department_list AS t1
        LEFT JOIN 
            pa0002 AS t2 
        ON 
            t1.emp_id= t2.PERNR 
        LEFT JOIN 
            pa0105 AS t3 
        ON 
            (t2.PERNR = t3.PERNR AND t3.SUBTY = '0030') WHERE t1.dept_id = ? AND t1.internal_role_id = ?`;

    const result = await query({ query: sdbgQuery, values: [FINANCE, 2] });

    return resSend(
        res,
        true,
        200,
        "SDBG assigneeList fetch successfully!",
        result,
        null
    );
    // req.query.$tableName = NEW_SDBG;

    // req.query.$filter = `{ "purchasing_doc_no" :  ${req.query.poNo}}`;
    // try {

    //     if (!req.query.poNo) {
    //         return resSend(res, false, 400, "Please send po number", null, null);
    //     }

    //     getFilteredData(req, res);
    // } catch (err) {
    //     console.log("data not fetched", err);
    //     resSend(res, false, 500, "Internal server error", null, null);
    // }
};

const unlock = async (req, res) => {
    try {
        let payload = { ...req.body };

        if (
            !payload.purchasing_doc_no ||
            !payload.action_by_name ||
            !payload.action_by_id
        ) {
            return resSend(res, false, 400, "Please send valid payload", null, null);
        }

        const isLocked_check_q = `SELECT * FROM ${NEW_SDBG} WHERE  (purchasing_doc_no = "${payload.purchasing_doc_no}" AND status = "${ACKNOWLEDGED}") ORDER BY id DESC LIMIT 1`;
        const lockeCheck = await query({ query: isLocked_check_q, values: [] });

        if (lockeCheck && lockeCheck?.length && lockeCheck[0]["isLocked"] === 0) {
            return resSend(
                res,
                true,
                200,
                "Already unlocked or not Acknowledge yet",
                null,
                null
            );
        }

        const q = `UPDATE ${NEW_SDBG} SET 
                updated_by_name = "${payload.action_by_name}",
                updated_by_id = "${payload.action_by_id}",
                updated_at = ${getEpochTime()},
                isLocked =  0 WHERE  (purchasing_doc_no = "${payload.purchasing_doc_no
            }" AND status = "${ACKNOWLEDGED}" AND isLocked = 1)`;
        const response = await query({ query: q, values: [] });

        if (response.affectedRows) {
            resSend(res, true, 200, "Ulocked successfully", null, null);
        } else {
            resSend(res, false, 400, "No data inserted", response, null);
        }
    } catch (error) {
        console.log("sdbg unlock api");
    }
};

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

    const result = await query({
        query: po_contact_details_query,
        values: [purchasing_doc_no],
    });

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

module.exports = {
    submitSDBG,
    getSdbgEntry,
    unlock,
    assigneeList,
    sdbgSubmitByDealingOfficer,
    sdbgUpdateByFinance,
    checkIsDealingOfficer,
    getSDBGData,
};
