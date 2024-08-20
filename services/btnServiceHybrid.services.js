const { poolQuery } = require("../config/pgDbConfig");
const { A_SDBG_DATE, A_DRAWING_DATE, A_QAP_DATE, A_ILMS_DATE, C_SDBG_DATE } = require("../lib/constant");
const { getEpochTime } = require("../lib/utils")


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


const contractualSubmissionDate = async (purchasing_doc_no, client) => {
    let c_sdbg_date_q = `SELECT PLAN_DATE as "PLAN_DATE" , MTEXT as "MTEXT" FROM zpo_milestone WHERE EBELN = $1`;
    const results = await poolQuery({ client, query: c_sdbg_date_q, values: [purchasing_doc_no] });
    // let c_dates = await client.execxute(c_sdbg_date_q, [purchasing_doc_no]);
    let c_dates = results;
    const contractualDateObj = {};
    c_dates.forEach((item) => {
        if (item.PLAN_DATE && item.MTEXT === C_SDBG_DATE) {
            contractualDateObj.c_sdbg_date = new Date(item.PLAN_DATE).getTime();
        }
    });

    return { status: true, data: contractualDateObj, msg: "success" };
};
const actualSubmissionDate = async (purchasing_doc_no, client) => {


    const actualSubmissionObj = {};
    let response = {};

    let a_sdbg_date_q = `SELECT actualSubmissionDate AS PLAN_DATE, milestoneText AS MTEXT FROM actualsubmissiondate WHERE purchasing_doc_no = ?`;


    const results = await poolQuery({ client, query: a_sdbg_date_q, values: [purchasing_doc_no] });
    let a_dates = results;

    // if(!a_dates.length) throw new Error(`All milestone is missing!`)
    if (!a_dates.length)
        return { status: false, data: {}, msg: `All milestone is missing!` };
    const a_dates_arr = [A_SDBG_DATE];


    for (const item of a_dates) {
        if (item.MTEXT === A_SDBG_DATE) {
            if (!item.PLAN_DATE) {
                return { status: false, data: {}, msg: `${A_SDBG_DATE} is missing!` };
            }
            actualSubmissionObj.a_sdbg_date = item.PLAN_DATE;
            // a_sdbg_date = item.PLAN_DATE;
        } else if (item.MTEXT === A_DRAWING_DATE) {
            if (!item.PLAN_DATE) {
                // throw new Error(`${A_DRAWING_DATE} is missing!`)
                return {
                    status: false,
                    data: {},
                    msg: `${A_DRAWING_DATE} is missing!`,
                };
            }
            actualSubmissionObj.a_drawing_date = item.PLAN_DATE;
        } else if (item.MTEXT === A_QAP_DATE) {
            if (!item.PLAN_DATE) {
                // throw new Error(`${A_QAP_DATE} is missing!`)
                return { status: false, data: {}, msg: `${A_QAP_DATE} is missing!` };
            }
            actualSubmissionObj.a_qap_date = item.PLAN_DATE;
        } else if (item.MTEXT === A_ILMS_DATE) {
            if (!item.PLAN_DATE) {
                // throw new Error(`${A_ILMS_DATE} is missing!`);
                return { status: false, data: {}, msg: `${A_ILMS_DATE} is missing!` };
            }
            actualSubmissionObj.a_ilms_date = item.PLAN_DATE;
        }
    }

    return {
        status: true,
        data: actualSubmissionObj,
        msg: "All milestone passed..",
    };
};



module.exports = { payloadObj, filesData }