const { poolQuery, getQuery } = require("../config/pgDbConfig");
const { HR_ACTION_TYPE_WAGR_COMPLIANCE, HR_ACTION_TYPE_BONUS_COMPLIANCE, HR_ACTION_TYPE_ESI_COMPLIANCE, HR_ACTION_TYPE_PF_COMPLIANCE, HR_ACTION_TYPE_LEAVE_SALARY_COMPLIANCE, INSERT, ACTION_SDBG, ACTION_PBG, MID_SDBG, USER_TYPE_VENDOR } = require("../lib/constant");
const { BTN_UPLOAD_CHECKLIST, BTN_REJECT, BTN_ASSIGN_TO_STAFF, BTN_FORWORD_FINANCE } = require("../lib/event");
const { APPROVED, REJECTED, STATUS_RECEIVED, BTN_STATUS_BANK, BTN_STATUS_HOLD_TEXT, BTN_STATUS_PROCESS, SUBMITTED_BY_CAUTHORITY, BTN_STATUS_DRETURN, SUBMITTED_BY_VENDOR, BTN_STATUS_NOT_SUBMITTED, ASSIGNED, SUBMITTED, FORWARD_TO_FINANCE } = require("../lib/status");
const { BTN_LIST } = require("../lib/tableName");
const { getEpochTime, generateQuery } = require("../lib/utils");
const { getUserDetailsQuery } = require("../utils/mailFunc");
const Message = require("../utils/messages");
const { sendMail } = require("./mail.services");


const payloadObj = (payload) => {

    const obj = {
        btn_num: payload.btn_num,
        purchasing_doc_no: payload.purchasing_doc_no,
        vendor_code: payload.vendor_code,
        invoice_no: payload.invoice_no,
        invoice_value: payload.invoice_value,
        yard: payload.yard,
        cgst: payload.cgst || "0",
        igst: payload.igst || "0",
        sgst: payload.sgst || "0",
        invoice_filename: payload.invoice_filename || "",
        invoice_type: payload.invoice_type,
        invoice_date: payload.invoice_date || null,
        suppoting_invoice_filename: payload.suppoting_invoice_filename || "",
        debit_note: payload.debit_note || "0",
        credit_note: payload.credit_note || "0",
        debit_credit_filename: payload.debit_credit_filename,
        bill_certifing_authority: payload.bill_certifing_authority,
        net_claim_amount: payload.net_claim_amount || "0",
        net_claim_amt_gst: payload.net_claim_amt_gst || "0",
        wdc_number: payload.wdc_number,
        hsn_gstn_icgrn: payload.hsn_gstn_icgrn || 0,
        created_by_id: payload.created_by_id,
        created_at: getEpochTime(),
        btn_type: "service-contract-bills",


        // hinderance_register_filename: payload.hinderance_register_filename || "", // AUTO FETCH
        // esi_compliance_filename: payload.esi_compliance_filename || "", // AUTO FETCH
        // pf_compliance_filename: payload.pf_compliance_filename || "", // AUTO FETCH
        // c_sdbg_date: payload.c_sdbg_date || "", // AUTO FETCH
        // a_sdbg_date: payload.a_sdbg_date || "", // AUTO FETCH
        // c_sdbg_filename: payload.c_sdbg_filename || "", // AUTO FETCH
        // leave_salary_bonus: payload.leave_salary_bonus || "0", // AUTO FETCH
        // wage_compliance_filename: payload.wage_compliance_filename || "",
        // wdc_details: payload.wdc_details || "",
        // vendor_name: payload.vendor_name, // AUTO FETCH
        // vendor_gst_no: payload.vendor_gst_no, // AUTO FETCH
    }

    return obj;
}


const forwordToFinacePaylaod = (payload) => {

    const obj = {
        btn_num: payload.btn_num,
        entry_number: payload.entry_number || null,
        entry_type: payload.entry_type || null,
        wdc_details: payload.wdc_details || null,
        other_deduction: payload.other_deduction,
        deduction_remarks: payload.deduction_remarks || "",
        total_deduction: payload.total_deduction || "0",
        net_payable_amount: payload.net_payable_amount || "0",
        estimated_ld: payload.estimated_ld || "0",
        retension_remarks: payload.retension_remarks || null,
        retension_amount: payload.retension_amount || "0",
        retension_rate: payload.retension_rate || "0",
        max_ld: payload.max_ld || "0",
        created_at: getEpochTime(),
        created_by_id: payload.created_by_id
    }
    return obj;
}

const btnAssignPayload = (payload) => {

    return {
        btn_num: payload.btn_num,
        purchasing_doc_no: payload.purchasing_doc_no,
        assign_by: payload.assign_by,
        assign_to: payload.assign_to,
        last_assign: true,
        assign_by_fi: "",
        assign_to_fi: "",
        last_assign_fi: false,
    }
}





/**
 * FILES HANDLE TO PAYLOAD
 * @param {*} payloadFiles 
 * @returns 
 */

const filesData = (payloadFiles) => {
    // Handle uploaded files
    const fileObj = {};
    if (Object.keys(payloadFiles).length) {
        Object.keys(payloadFiles).forEach((fileName) => {
            fileObj[fileName] = payloadFiles[fileName][0]["filename"];
        });
    }
    return fileObj;
};


/**
 * INSERT DATA IN BTN LIST TABLE
 * @param {Object} client 
 * @param {Object} data 
 * @param {string} status 
 * @returns {Promise<Object>}
 * @throws {Error} If the query execution fails, an error is thrown
 */
const addToBTNList = async (client, data, status) => {
    console.log("data", data);
    try {
        let payload = {
            btn_num: data?.btn_num,
            purchasing_doc_no: data?.purchasing_doc_no,
            net_claim_amount: data?.net_claim_amount,
            net_payable_amount: data?.net_payable_amount,
            vendor_code: data?.vendor_code,
            created_at: getEpochTime(),
            btn_type: data?.btn_type,
            status: status,
            remarks: data.remarks || ""
        };
        console.log("payload", payload);

        let { q, val } = generateQuery(INSERT, BTN_LIST, payload);
        let res = await poolQuery({ client, query: q, values: val });
        if (res.length > 0) {
            return { status: true, data: res };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * GET HR UPLOADED DATA 
 * @param {Object} client 
 * @param {Object} data 
 * @returns {Promise<Object>}
 * @throws {Error} If the query execution fails, an error is thrown
 */
const getHrDetails = async (client, data) => {
    try {

        const actionTypeArr = [
            HR_ACTION_TYPE_BONUS_COMPLIANCE, HR_ACTION_TYPE_WAGR_COMPLIANCE, HR_ACTION_TYPE_ESI_COMPLIANCE,
            HR_ACTION_TYPE_PF_COMPLIANCE, HR_ACTION_TYPE_LEAVE_SALARY_COMPLIANCE
        ];
        const initalDataVal = data.length;
        const placeholder = actionTypeArr.map((_, index) => `$${index + initalDataVal + 1}`).join(",");
        const q = ` SELECT    hr.cname      AS hr_name,
                            created_by_id AS hr_id,
                            purchasing_doc_no,
                            created_by_id,
                            action_type,
                            file_name,
                            file_path
                  FROM      hr     AS hr_activity
                  left join pa0002 AS hr
                  ON       (
                                      hr_activity.created_by_id = hr.pernr :: CHARACTER varying )
                  WHERE     (
                                      hr_activity.purchasing_doc_no = $1
                            AND       hr_activity.action_type IN (${placeholder}))`;
        console.log("[...data, ...actionTypeArr]", q, placeholder, [...data, ...actionTypeArr]);

        const result = await poolQuery({ client, query: q, values: [...data, ...actionTypeArr] });

        return result;
    } catch (error) {
        throw error;
    }
}



const getHrDetailsDetails = async (client, data) => {
    try {

        const actionTypeArr = [
            HR_ACTION_TYPE_BONUS_COMPLIANCE, HR_ACTION_TYPE_WAGR_COMPLIANCE, HR_ACTION_TYPE_ESI_COMPLIANCE,
            HR_ACTION_TYPE_PF_COMPLIANCE, HR_ACTION_TYPE_LEAVE_SALARY_COMPLIANCE
        ];
        const initalDataVal = data.length;
        const placeholder = actionTypeArr.map((_, index) => `$${index + initalDataVal + 1}`).join(",");
        const q = ` SELECT    hr.cname      AS hr_name,
                            created_by_id AS hr_id,
                            purchasing_doc_no,
                            created_by_id,
                            action_type,
                            file_name,
                            file_path
                  FROM      hr     AS hr_activity
                  left join pa0002 AS hr
                  ON       (
                                      hr_activity.created_by_id = hr.pernr :: CHARACTER varying )
                  WHERE     (
                                      hr_activity.purchasing_doc_no = $1
                            AND       hr_activity.action_type IN (${placeholder}))`;
        console.log("[...data, ...actionTypeArr]", q, placeholder, [...data, ...actionTypeArr]);

        const result = await poolQuery({ client, query: q, values: [...data, ...actionTypeArr] });

        return result;
    } catch (error) {
        throw error;
    }
}



/**
 * SDBG APPROVE FILE DATA
 * @param {Object} client 
 * @param {Object} data 
 * @returns  Object || Error
 */
const getSDBGApprovedFiles = async (client, data) => {
    try {
        let q = `SELECT file_name as sdbg_filename FROM sdbg WHERE purchasing_doc_no = $1 and status = $2 and action_type = $3`;
        let result = await poolQuery({ client, query: q, values: data });
        return result;
    } catch (error) {
        throw error
    }
};

/**
 * 
 * @param {Object} client 
 * @param {Object} data 
 * @returns {Promise<Object>}
 * @throws {Error} If the query execution fails, an error is thrown.
 */
const getPBGApprovedFiles = async (client, data) => {
    try {
        let q = `SELECT file_name as pbg_filename FROM sdbg WHERE purchasing_doc_no = $1 and status = $2 and action_type = $3`;
        let result = await poolQuery({ client, query: q, values: data });
        console.log("resultresultresultresultresult", result, q, data);

        return result;
    } catch (error) {
        throw error;
    }
};

/**
 * GET VENDOR DETAILS
 * @param {Object} client 
 * @param {Object} data 
 * @returns {Promise<Object>}
 * @throws {Error} If the query execution fails, an error is thrown.
 */
const vendorDetails = async (client, data) => {
    try {
        let q = `
              SELECT po.lifnr       AS vendor_code,
                     vendor_t.name1 AS vendor_name,
                     vendor_t.email AS vendor_email,
                     vendor_t.stcd3 AS vendor_gstno
              FROM   ekko AS po
                     left join lfa1 AS vendor_t
                            ON ( po.lifnr = vendor_t.lifnr )
              WHERE  po.ebeln = $1`;
        let result = await poolQuery({
            client,
            query: q,
            values: data,
        });
        return result;
    } catch (error) {
        throw error;
    }

}
/**
 * ACTUAL SUBMISSION DATE
 * @param {Object} client 
 * @param {Object} data 
 * @returns {Promise<Object>}
 * @throws {Error} If the query execution fails, an error is thrown.
 */
const getActualSubminissionDate = async (client, data) => {
    try {

        let a_sdbg_date_q = `SELECT actualSubmissionDate AS "PLAN_DATE", milestoneText AS "MTEXT", milestoneid AS "MID" FROM actualsubmissiondate WHERE purchasing_doc_no = $1`;
        let a_dates = await poolQuery({
            client,
            query: a_sdbg_date_q,
            values: data,
        });
        return a_dates;
    } catch (error) {
        throw error;
    }
}

/**
 * CONTRACTUAL SUBMISSION DATE
 * @param {Object} client 
 * @param {Object} data 
 * @returns {Promise<Object>}
 * @throws {Error} If the query execution fails, an error is thrown.
 */
const getContractutalSubminissionDate = async (client, data) => {
    try {

        let c_sdbg_date_q = `SELECT PLAN_DATE as "PLAN_DATE", MTEXT as "MTEXT", MID AS "MID" FROM zpo_milestone WHERE EBELN = $1`;
        let c_dates = await poolQuery({
            client,
            query: c_sdbg_date_q,
            values: data,
        });
        return c_dates;
    } catch (error) {
        throw error;
    }
}

/**
 * CONTRACTUAL SUBMISSION DATE
 * @param {Object} client 
 * @param {Object} data 
 * @returns {Promise<Object>}
 * @throws {Error} If the query execution fails, an error is thrown.
 */
async function checkHrCompliance(client, data) {
    try {
        const hrUploadedData = await getHrDetails(client, [data.purchasing_doc_no]);
        const hrCompliancUpload = new Set([...hrUploadedData.map((el) => el.action_type)]);
        const hrCompliances = [
            HR_ACTION_TYPE_WAGR_COMPLIANCE,
            HR_ACTION_TYPE_ESI_COMPLIANCE,
            HR_ACTION_TYPE_PF_COMPLIANCE,
        ];
        const obj = {};
        for (const item of hrUploadedData) {

            if (item.action_type == HR_ACTION_TYPE_WAGR_COMPLIANCE) {
                obj.wage_compliance_filename = item.file_name;
                obj.wage_compliance_filepath = item.file_path;
                obj.wage_approved_by_name = item.hr_name;
                obj.wage_approved_by_id = item.hr_id;
            }
            if (item.action_type == HR_ACTION_TYPE_ESI_COMPLIANCE) {
                obj.esi_compliance_filename = item.file_name;
                obj.esi_compliance_filepath = item.file_path;
                obj.esi_approved_by_name = item.hr_name;
                obj.esi_approved_by_id = item.hr_id;
            }
            if (item.action_type == HR_ACTION_TYPE_PF_COMPLIANCE) {
                obj.pf_compliance_filename = item.file_name;
                obj.pf_compliance_filepath = item.file_path;
                obj.pf_approved_by_name = item.hr_name;
                obj.pf_approved_by_id = item.hr_id;
            }
        }

        for (const item of hrCompliances) {
            if (!hrCompliancUpload.has(item)) {
                return { success: false, msg: `Please submit ${item} to process BTN !`, data: obj };
            }
        }

        return { success: true, msg: "No milestone missing", data: obj };
    } catch (error) {
        return { success: false, msg: "An error occurred while checking HR compliance. Please try again later." + error.message, data: {} };
    }
}


const getGrnIcgrnValue = async (client, data) => {
    try {

        if (!data.grn || !data.po) {
            // return resSend(res, true, 200, "Please send icgrn no", Message.MANDATORY_INPUTS_REQUIRED, null);
            return { success: false, statusCode: 200, message: "Please send GRN and PO", data: Message.MANDATORY_INPUTS_REQUIRED };
        }
        const icgrn_q = `select  
        mseg.mblnr , mseg.ebeln , mseg.ebelp , mseg.bpmng , ekpo.netpr  
        from  mseg as mseg
        left join ekpo as ekpo
            on( ekpo.ebeln = mseg.ebeln and  ekpo.ebelp = mseg.ebelp)
        where mseg.mblnr  = $1 AND mseg.ebeln = $2 `; //   MBLNR (GRN No) PRUEFLOS (Lot Number)

        const grn_values = data.grn || "";
        console.log("icgrn_q", grn_values);
        let total_price = 0;
        let total_quantity = 0;
        let icgrn_no = await poolQuery({ client, query: icgrn_q, values: [grn_values, data.po] });
        if (!icgrn_no.length) {
            return { success: false, statusCode: 200, message: "Plese do GRN to process BTN", data: { total_price } };
        }


        if (icgrn_no.length) {
            const totals = calculateTotals(icgrn_no);
            total_price = totals.totalPrice || 0;
            total_quantity = totals.totalQuantity;
        }

        total_price = parseFloat(total_price.toFixed(2));
        return { success: true, statusCode: 200, message: "Value fetch success", data: { total_price } };

    } catch (error) {
        console.error("Error making the request:", error.message);
        throw error;
    }
};

function calculateTotals(data) {
    let totalQuantity = 0;
    let totalPrice = 0;

    data.forEach((item) => {
        if (item.bpmng && item.netpr) {
            totalQuantity += parseFloat(item.bpmng);
            totalPrice += parseFloat(item.netpr) * parseFloat(item.bpmng);
        }
    });

    return {
        totalQuantity,
        totalPrice,
    };
}


const getServiceEntryValue = async (client, data) => {
    try {

        if (!data.grn || !data.po) {
            return { success: false, statusCode: 200, message: "Please send service entry number & po", data: Message.MANDATORY_INPUTS_REQUIRED };
        }

        const service_entry_number = data.grn || "";
        const getValQuery = `
        SELECT     
            lblni as service_entry_number, 
            lwert as unit_price, 
            netwr as value_with_gst  
        FROM essr WHERE lblni = $1 AND ebeln = $2 LIMIT 1`;

        const result = await poolQuery({ client, query: getValQuery, values: [service_entry_number, data.po] });
        let total_price = 0;
        if (!result.length) {
            return { success: false, statusCode: 200, message: "Plese do SIR to process BTN", data: { total_price } };
        }
        total_price = result[0]?.value_with_gst || "0";
        return { success: true, statusCode: 200, message: "Value fetch success", data: { total_price, ...result[0] } };
    } catch (error) {
        console.error("Error making the request:", error.message);
        throw error;
    }
}


// async function btnCurrentDetailsCheck(client, data) {
//     try {
//         let btnstausCount = `SELECT btn_num, status  FROM btn_list WHERE 1 = 1`;
//         const valueArr = [];
//         let count = 0;
//         if (data.btn_num) {
//             btnstausCount += ` AND btn_num = $${++count}`;
//             valueArr.push(data.btn_num);
//         }
//         // if (data.status) {
//         //   btnstausCount += ` AND status = $${++count}`;
//         //   valueArr.push(data.status);
//         // }

//         const checkStatus = new Set([
//             STATUS_RECEIVED,
//             REJECTED,
//             BTN_STATUS_BANK,
//             BTN_STATUS_HOLD_TEXT,
//             BTN_STATUS_PROCESS,
//             SUBMIT_BY_DO
//         ]);

//         if (data.status === STATUS_RECEIVED) {
//             checkStatus.add(BTN_STATUS_DRETURN);
//             checkStatus.add(SUBMITTED_BY_VENDOR);
//             checkStatus.delete(STATUS_RECEIVED);
//         }

//         btnstausCount += " ORDER BY created_at DESC";
//         btnstausCount += " LIMIT 1";

//         const result = await poolQuery({
//             client,
//             query: btnstausCount,
//             values: valueArr,
//         });
//         let isInvalid = false;

//         // const result = [{ btn_num: 20240725999, date: 10, status: "BANK" },]
//         // const checkStatus = new Set(["RECEIVED", "REJECTED", "BANK", "HOLD", "UNHOLD", "PROCESS"]);

//         if (result.length) {
//             const currentStatus = result.at(-1);
//             if (checkStatus.has(currentStatus.status)) {
//                 isInvalid = true;
//             }
//             return {
//                 isInvalid,
//                 currentStatus: currentStatus.status,
//                 message: `already ${currentStatus.status}`,
//             };
//         }

//         return {
//             isInvalid: true,
//             currentStatus: BTN_STATUS_NOT_SUBMITTED,
//             message: `Current status ${BTN_STATUS_NOT_SUBMITTED}`,
//         };
//     } catch (error) {
//         throw error;
//     }
// }


async function getServiceBTNDetails(client, data) {
    try {

        if (!data.btn_num) {
            return { success: false, statusCode: 200, message: "Please send btn number", data: Message.MANDATORY_INPUTS_REQUIRED };
        }
        const val = [];
        val.push(data.btn_num);

        const getBtnQuery =
            `SELECT
                s_btn.*,
                btn_assign.assign_by,
                btn_assign.assign_to,
                users_btn_assign_to.cname AS assign_to_name,
                users_assign_to_fi.cname AS assign_by_fi_name,
                btn_assign.assign_by_fi,
                btn_assign.assign_to_fi,
                btn_assign.last_assign,
                btn_assign.last_assign_fi,
                btn_authority.entry_number,
                btn_authority.entry_type,
                btn_authority.other_deduction,
                btn_authority.deduction_remarks,
                btn_authority.total_deduction,
                btn_authority.net_payable_amount,
                btn_authority.wdc_details,
                btn_authority.estimated_ld,
                btn_authority.retension_remarks,
                btn_authority.retension_amount,
                btn_authority.retension_rate,
                btn_authority.max_ld,
                btn_authority.retension_remarks,
                users.cname AS bill_certifing_authority_name
            FROM 
              btn_service_hybrid AS s_btn 
            LEFT JOIN btn_assign AS btn_assign
                ON(s_btn.btn_num = btn_assign.btn_num)
            LEFT JOIN pa0002 as users 
                ON(users.pernr :: character varying = s_btn.bill_certifing_authority)
            LEFT JOIN pa0002 as users_btn_assign_to
                ON(users_btn_assign_to.pernr :: character varying = btn_assign.assign_to) 
            LEFT JOIN pa0002 as users_assign_to_fi
                ON(users_assign_to_fi.pernr :: character varying = btn_assign.assign_to_fi) 
            LEFT JOIN btn_service_certify_authority as btn_authority 
                ON(s_btn.btn_num = btn_authority.btn_num)
            WHERE s_btn.btn_num = $1`;
        // AND s_btn.bill_certifing_authority = '600700'
        // btn_assign.*,
        // LEFT JOIN btn_assign AS btn_assign
        // ON(s_btn.btn_num = btn_assign.btn_num)
        const result = await poolQuery({ client, query: getBtnQuery, values: val });
        let response = result[0] || {};
        const supDocs = await supportingDataForServiceBtn(client, response.purchasing_doc_no);
        response = { ...response, ...supDocs };

        return { success: true, statusCode: 200, message: "Value fetch success", data: response };
    } catch (error) {
        console.log("dddddd", error.message);

        throw error;
    }
}

async function getLatestBTN(client, data) {
    try {
        const getLatestDataQuery = `
        SELECT 
            btn_num, 
            purchasing_doc_no, 
            net_claim_amount, 
            net_payable_amount, 
            vendor_code, 
            status, 
            btn_type,
            created_at
        FROM btn_list where btn_num = $1 ORDER BY created_at DESC LIMIT 1`;
        const lasBtnDetails = await poolQuery({ client, query: getLatestDataQuery, values: [data.btn_num] });

        return lasBtnDetails[0] || {};

    } catch (error) {
        throw error
    }
}


async function supportingDataForServiceBtn(client, poNo) {
    try {

        console.log("poNo", poNo);


        const response = await Promise.all(
            [
                getHrDetails(client, [poNo]),
                getSDBGApprovedFiles(client, [poNo, APPROVED, ACTION_SDBG]),
                getPBGApprovedFiles(client, [poNo, APPROVED, ACTION_PBG]),
                vendorDetails(client, [poNo]),
                getContractutalSubminissionDate(client, [poNo]),
                getActualSubminissionDate(client, [poNo])
            ]);

        let result = {
            hrDetais: response[0], //  getHrDetails,
            // sdbgFileDetais: response[1], // getSDBGApprovedFiles,
            // pbgDetails: response[2], //getPBGApprovedFiles,
            // vendorDetails: response[3], //vendorDetails
            // contractutalSubminissionDate: response[4], // getContractutalSubminissionDate
            // actualSubminissionDate: response[5], // getActualSubminissionDate
        }
        if (response[1][0]) {
            result = { ...result, sdbgFiles: response[1] };
        } if (response[2][0]) {
            result = { ...result, pbgFiles: response[2] };
        }
        if (response[3][0]) {
            result = { ...result, ...response[3][0] };
        }

        if (response[4] && response[4][0]) {
            const con = response[4].find((el) => el.MID == MID_SDBG);
            result.c_sdbg_date = con?.PLAN_DATE;
        }
        if (response[5] && response[5][0]) {
            const act = response[5].find((el) => el.MID == parseInt(MID_SDBG));
            result.a_sdbg_date = act?.PLAN_DATE;
        }

        return result;
    } catch (error) {
        throw error;
    }
}




const updateServiceBtnListTable = async (client, data) => {
    try {
        const getLatestDataQuery = `
        SELECT 
            btn_num, 
            purchasing_doc_no, 
            net_claim_amount, 
            net_payable_amount, 
            vendor_code, 
            status, 
            btn_type,
            created_at
        FROM public.btn_list where btn_num = $1 ORDER BY created_at DESC LIMIT 1`;
        const lasBtnDetails = await poolQuery({
            client,
            query: getLatestDataQuery,
            values: [data.btn_num],
        });
        let btnListTablePaylod = { btn_num: data.btn_num };

        if (lasBtnDetails.length) {
            btnListTablePaylod = {
                ...lasBtnDetails[0],
                ...btnListTablePaylod,
                status: REJECTED,
                remarks: data.rejectedMessage || "BTN Rejected",
                created_at: getEpochTime(),
            };
            const { q, val } = generateQuery(INSERT, "btn_list", btnListTablePaylod);
            console.log("btnListTablePaylod", btnListTablePaylod);
            await poolQuery({ client, query: q, values: val });
        } else {
            console.log("NO BTN FOUND IN LIST TO BE UPDATED");
        }
    } catch (error) {
        throw error;
    }
};


async function btnCurrentDetailsCheck(client, data) {
    try {
        let btnstausCount = `SELECT btn_num, status  FROM btn_list WHERE 1 = 1`;
        const valueArr = [];
        let count = 0;
        if (data.btn_num) {
            btnstausCount += ` AND btn_num = $${++count}`;
            valueArr.push(data.btn_num);
        }
        // if (data.status) {
        //     btnstausCount += ` AND status = $${++count}`;
        //     valueArr.push(data.status);
        // }

        const checkStatus = new Set([
            STATUS_RECEIVED,
            REJECTED,
            BTN_STATUS_BANK,
            BTN_STATUS_HOLD_TEXT,
            BTN_STATUS_PROCESS,
            SUBMITTED_BY_CAUTHORITY
        ]);

        if (data.status === SUBMITTED_BY_CAUTHORITY) {
            checkStatus.add(BTN_STATUS_DRETURN);
            checkStatus.add(SUBMITTED_BY_VENDOR);
            checkStatus.delete(STATUS_RECEIVED);
            checkStatus.delete(SUBMITTED_BY_CAUTHORITY);
        }
        if (data.status === STATUS_RECEIVED) {
            checkStatus.add(BTN_STATUS_DRETURN);
            checkStatus.add(SUBMITTED_BY_VENDOR);
            checkStatus.delete(SUBMITTED_BY_CAUTHORITY);
        }

        btnstausCount += " ORDER BY created_at DESC";
        btnstausCount += " LIMIT 1";

        const result = await poolQuery({
            client,
            query: btnstausCount,
            values: valueArr,
        });
        let isInvalid = false;

        // const result = [{ btn_num: 20240725999, date: 10, status: "BANK" },]
        // const checkStatus = new Set(["RECEIVED", "REJECTED", "BANK", "HOLD", "UNHOLD", "PROCESS"]);

        if (result.length) {
            const currentStatus = result.at(-1);
            if (checkStatus.has(currentStatus.status)) {
                isInvalid = true;
            }
            return {
                isInvalid,
                currentStatus: currentStatus.status,
                message: `already ${currentStatus.status}`,
            };
        }

        return {
            isInvalid: true,
            currentStatus: BTN_STATUS_NOT_SUBMITTED,
            message: `Current status ${BTN_STATUS_NOT_SUBMITTED}`,
        };
    } catch (error) {
        throw error;
    }
}


async function serviceBtnMailSend(tokenData, payload, event) {
    try {
        let emailUserDetailsQuery;
        let emailUserDetails;
        let dataObj = payload;

        console.log("876567890987656789", tokenData, payload);
        // email done
        if (tokenData.user_type == USER_TYPE_VENDOR && payload.status == SUBMITTED) {
            emailUserDetailsQuery = getUserDetailsQuery("vendor_and_do", "$1");
            emailUserDetails = await getQuery({
                query: emailUserDetailsQuery,
                values: [payload.purchasing_doc_no],
            });
            await sendMail(BTN_UPLOAD_CHECKLIST, dataObj, { users: emailUserDetails }, BTN_UPLOAD_CHECKLIST);
        }

        if (tokenData.user_type != USER_TYPE_VENDOR && payload.status == FORWARD_TO_FINANCE) {
            emailUserDetailsQuery = getUserDetailsQuery("venode_by_po");
            emailUserDetails = await getQuery({
                query: emailUserDetailsQuery,
                values: [payload.purchasing_doc_no],
            });
            await sendMail(BTN_FORWORD_FINANCE, dataObj, { users: emailUserDetails }, BTN_FORWORD_FINANCE);
        }

        // email done
        if (tokenData.user_type != USER_TYPE_VENDOR && payload.status == STATUS_RECEIVED) {
            emailUserDetailsQuery = getUserDetailsQuery("finance_staff", "$1");
            emailUserDetails = await getQuery({
                query: emailUserDetailsQuery,
                values: [payload.assign_to_fi],
            });

            await sendMail(BTN_ASSIGN_TO_STAFF, dataObj, { users: emailUserDetails }, BTN_ASSIGN_TO_STAFF);
        }
        // email done
        if (tokenData.user_type != USER_TYPE_VENDOR && payload.status == REJECTED) {

            console.log(tokenData.user_type != USER_TYPE_VENDOR && payload.status == REJECTED, "00000000");

            // emailUserDetailsQuery = getUserDetailsQuery('vendor_by_po', '$1');
            emailUserDetailsQuery = getUserDetailsQuery("vendor_by_sbtn", "$1");

            emailUserDetails = await getQuery({
                query: emailUserDetailsQuery,
                values: [payload.btn_num],
            });
            console.log(emailUserDetails, "emailUserDetails");

            dataObj = { ...dataObj, vendor_name: emailUserDetails[0]?.u_name };
            await sendMail(BTN_REJECT, dataObj, { users: emailUserDetails }, BTN_REJECT);

        }
        
        // if (tokenData.user_type != USER_TYPE_VENDOR && payload.status == ASSIGNED) {
        //     // emailUserDetailsQuery = getUserDetailsQuery('vendor_by_po', '$1');
        //     emailUserDetailsQuery = "SELECT * FROM (";
        //     buildQuery += getUserDetailsQuery("vendor_by_po", "$1");
        //     buildQuery += "UNION";
        //     buildQuery += getUserDetailsQuery("assingee", "$2");
        //     buildQuery += ") AS mail_info";

        //     emailUserDetails = await getQuery({
        //         query: emailUserDetailsQuery,
        //         values: [payload.purchasing_doc_no],
        //     });
        //     dataObj = { ...dataObj, vendor_name: emailUserDetails[0]?.u_name };
        //     await sendMail(
        //         BTN_RETURN_DO,
        //         dataObj,
        //         { users: emailUserDetails },
        //         BTN_RETURN_DO
        //     );
        // }

        // WORKING -- ONLY SUBJECT ISSUE , SUBJECT MAY TO CHANGE
        if (tokenData.user_type != USER_TYPE_VENDOR && payload.status == SUBMITTED_BY_CAUTHORITY) {
            // emailUserDetailsQuery = getUserDetailsQuery('vendor_by_po', '$1');
            let buildQuery = "";
            emailUserDetailsQuery = "SELECT * FROM (";
            buildQuery += emailUserDetailsQuery;
            buildQuery += getUserDetailsQuery("vendor_by_po", "$1");
            buildQuery += "UNION";
            buildQuery += getUserDetailsQuery("finance_authority", "$2");
            buildQuery += ") AS mail_info";

            console.log(
                "payload.purchasing_doc_no, payload.assign_to",
                payload,
                payload.assign_to,
                buildQuery
            );
            console.log("emailUserDetailsQuery", emailUserDetailsQuery, payload.purchasing_doc_no, parseInt(payload.assign_to));

            emailUserDetails = await getQuery({
                query: buildQuery,
                values: [payload.purchasing_doc_no, parseInt(payload.assign_to)],
            });
            dataObj = { ...dataObj, vendor_name: emailUserDetails[0]?.u_name };
            await sendMail(BTN_FORWORD_FINANCE, dataObj, { users: emailUserDetails }, BTN_FORWORD_FINANCE);
        }
    } catch (error) {
        console.log("handelMail service btn", error.toString(), error.stack);
    }
}



module.exports = {
    payloadObj,
    filesData,
    checkHrCompliance,
    getSDBGApprovedFiles,
    getPBGApprovedFiles,
    getContractutalSubminissionDate,
    getActualSubminissionDate,
    vendorDetails,
    getHrDetails,
    addToBTNList,
    getGrnIcgrnValue,
    getServiceEntryValue,
    btnCurrentDetailsCheck,
    forwordToFinacePaylaod,
    getServiceBTNDetails,
    getLatestBTN,
    btnAssignPayload,
    supportingDataForServiceBtn,
    updateServiceBtnListTable,
    serviceBtnMailSend
}
