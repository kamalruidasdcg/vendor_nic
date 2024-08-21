const { poolQuery } = require("../config/pgDbConfig");
const { HR_ACTION_TYPE_WAGR_COMPLIANCE, HR_ACTION_TYPE_BONUS_COMPLIANCE, HR_ACTION_TYPE_ESI_COMPLIANCE, HR_ACTION_TYPE_PF_COMPLIANCE, HR_ACTION_TYPE_LEAVE_SALARY_COMPLIANCE, INSERT } = require("../lib/constant");
const { BTN_LIST } = require("../lib/tableName");
const { getEpochTime } = require("../lib/utils");
const Message = require("../utils/messages");

const payloadObj = (payload) => {

    const obj = {
        btn_num: payload.btn_num,
        purchasing_doc_no: payload.purchasing_doc_no,
        vendor_name: payload.vendor_name,
        vendor_code: payload.vendor_code,
        vendor_gst_no: payload.vendor_gst_no,
        invoice_no: payload.invoice_no,
        invoice_value: payload.invoice_value,
        cgst: payload.cgst || "0",
        igst: payload.igst || "0",
        sgst: payload.sgst || "0",
        invoice_filename: payload.invoice_filename || "",
        invoice_type: payload.invoice_type,
        debit_note: payload.debit_note || "0",
        credit_note: payload.credit_note || "0",
        debit_credit_filename: payload.debit_credit_filename,
        hinderance_register_filename: payload.hinderance_register_filename || "",
        esi_compliance_filename: payload.esi_compliance_filename || "",
        pf_compliance_filename: payload.pf_compliance__filename || "",
        demand_raise_filename: payload.demand_raise_filename || "",
        net_claim_amount: payload.net_claim_amount || "0",
        net_claim_amt_gst: payload.net_claim_amt_gst || "0",
        wdc_number: payload.wdc_number,
        hsn_gstn_icgrn: payload.hsn_gstn_icgrn || 0,
        created_at: getEpochTime(),
        created_by_id: payload.created_by_id,
        btn_type: "service-contract-bills",
        c_sdbg_date: payload.c_sdbg_date || "",
        a_sdbg_date: payload.a_sdbg_date || "",
        c_sdbg_filename: payload.c_sdbg_filename || "",
        leave_salary_bonus: payload.leave_salary_bonus || "0",
        wage_compliance_certyfied_by: payload.wage_compliance_certyfied_by || "",
        wdc_details: payload.wdc_details || "",
        bill_certifing_authority: ""
    }

    return obj;
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
            created_at: data?.created_at,
            btn_type: data?.btn_type,
            status: status,
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

        for (const item of hrCompliances) {
            if (!hrCompliancUpload.has(item)) {
                return { success: false, msg: `Please submit ${item} to process BTN !` };
            }
        }

        return { success: true, msg: "No milestone missing" };
    } catch (error) {
        return { success: false, msg: "An error occurred while checking HR compliance. Please try again later." + error.message };
    }
}


const getGrnIcgrnValue = async (client, data) => {
    try {
        const icgrn_q = `SELECT 
                                qals.PRUEFLOS AS icgrn_nos, 
                                qals.MATNR as mat_no,
                                qals.MBLNR as grn_no,
                                qals.LMENGE01 as quantity,
                                qals.ebeln as purchasing_doc_no,
                                qals.ebelp as po_lineitem,
                                ekpo.NETPR as price
                            FROM qals as qals
                              left join ekpo as ekpo
                                ON (ekpo.ebeln = qals.ebeln AND ekpo.ebelp = qals.ebelp AND ekpo.matnr = qals.matnr)
                            WHERE qals.MBLNR = $1 `; //   MBLNR (GRN No) PRUEFLOS (Lot Number)

        const grn_values = data.icgrnNo;
        console.log("icgrn_q", grn_values);

        let icgrn_no = await poolQuery({ client, query: icgrn_q, values: [grn_values] });
        if (icgrn_no.length == 0) {
            return { success: false, message: "Plese do ICGRN to Process BTN", data: { total_price } };
        }

        let total_price = 0;
        let total_quantity = 0;

        if (icgrn_no.length) {
            const totals = calculateTotals(icgrn_no);
            total_price = totals.totalPrice || 0;
            total_quantity = totals.totalQuantity;
        }

        total_price = parseFloat(total_price.toFixed(2));
        return { success: true, message: "Value fetch success", data: { total_price } };

    } catch (error) {
        console.error("Error making the request:", error.message);
        throw error;
    }
};

function calculateTotals(data) {
    let totalQuantity = 0;
    let totalPrice = 0;

    data.forEach((item) => {
        totalQuantity += parseFloat(item.quantity);
        totalPrice += parseFloat(item.price) * parseFloat(item.quantity);
    });

    return {
        totalQuantity,
        totalPrice,
    };
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
    getGrnIcgrnValue
}