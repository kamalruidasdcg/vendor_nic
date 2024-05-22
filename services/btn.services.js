// const { query } = require("../config/dbConfig");
const { query } = require("../config/dbConfig");
const { ACTION_SDBG, ACTION_PBG, A_SDBG_DATE, A_DRAWING_DATE, A_QAP_DATE, A_ILMS_DATE, C_SDBG_DATE, C_DRAWING_DATE, C_QAP_DATE, C_ILMS_DATE } = require("../lib/constant");
const { APPROVED } = require("../lib/status");
const { checkTypeArr } = require("../utils/smallFun");

const advBillHybridbtnPayload = async (payload, btn_type) => {

    if (!payload || !Object.keys(payload).length) throw new Error("Invalid payload in advBillHybridbtnPayload");

    const pl = {
        btn_num: payload.btn_num,
        purchasing_doc_no: payload.purchasing_doc_no,
        invoice_no: payload.invoice_no || "",
        invoice_filename: payload.invoice_filename || "",
        invoice_value: payload.invoice_value || "",
        e_invoice_no: payload.e_invoice_no || "",
        e_invoice_filename: payload.e_invoice_filename || "",
        // debit_note: payload.debit_note || "",
        // credit_note: payload.credit_note || "",
        // debit_credit_filename: payload.debit_credit_filename || "",
        net_claim_amount: payload.net_claim_amount || "",
        cgst: payload.cgst || "",
        sgst: payload.sgst || "",
        igst: payload.igst || "",
        net_claim_amt_gst: payload.net_claim_amt_gst || "",
        c_sdbg_date: payload.c_sdbg_date || "",
        c_sdbg_filename: payload.c_sdbg_filename || "",
        a_sdbg_date: payload.a_sdbg_date || "",
        updated_by: payload.updated_by || "",
        created_at: payload.created_at || "",
        created_by_id: payload.created_by_id || "",
        vendor_code: payload.vendor_code || "",
        btn_type: btn_type || "",
        status: payload.status || "",
        c_level1_doc_sub_date: payload.c_level1_doc_sub_date || "",
        c_level2_doc_sub_date: payload.c_level2_doc_sub_date || "",
        c_level3_doc_sub_date: payload.c_level3_doc_sub_date || "",
        c_level1_doc_name: payload.c_level1_doc_name || "",
        c_level2_doc_name: payload.c_level2_doc_name || "",
        c_level3_doc_name: payload.c_level3_doc_name || "",

        a_level1_doc_sub_date: payload.a_level1_doc_sub_date || "",
        a_level2_doc_sub_date: payload.a_level2_doc_sub_date || "",
        a_level3_doc_sub_date: payload.a_level3_doc_sub_date || "",
        a_level1_doc_name: payload.a_level1_doc_name || "",
        a_level2_doc_name: payload.a_level2_doc_name || "",
        a_level3_doc_name: payload.a_level3_doc_name || "",
        is_hsn_code: payload.is_hsn_code || "Y",
        is_gstin: payload.is_gstin || "Y",
        is_tax_rate: payload.is_tax_rate || "Y"
    };



    // const pl = payload.map((obj) =>
    // ({
    //     btn_num: obj.btn_num,
    //     purchasing_doc_no: obj.purchasing_doc_no || "",
    //     vendor_code: obj.vendor_code || "",
    //     invoice_no: obj.invoice_no || "",
    //     invoice_value: obj.invoice_value || 0,
    //     cgst: obj.cgst || 0,
    //     igst: obj.igst || 0,
    //     sgst: obj.sgst || 0,
    //     invoice_filename: obj.invoice_filename || "",
    //     e_invoice_no: obj.e_invoice_no || "",
    //     e_invoice_filename: obj.e_invoice_filename || "",
    //     debit_note: obj.debit_note || 0,
    //     credit_note: obj.credit_note || 0,
    //     debit_credit_filename: obj.debit_credit_filename || "",
    //     net_claim_amount: obj.net_claim_amount || 0,
    //     c_sdbg_date: obj.c_sdbg_date || null,
    //     c_sdbg_filename: obj.c_sdbg_filename || "",
    //     a_sdbg_date: obj.a_sdbg_date || null,
    //     demand_raise_filename: obj.demand_raise_filename || "",
    //     gate_entry_no: obj.gate_entry_no || "",
    //     gate_entry_date: obj.gate_entry_date || null,
    //     get_entry_filename: obj.get_entry_filename || "",
    //     grn_nos: obj.grn_nos || "",
    //     icgrn_nos: obj.icgrn_nos || "",
    //     icgrn_total: obj.icgrn_total || 0,
    //     c_drawing_date: obj.c_drawing_date || null,
    //     a_drawing_date: obj.a_drawing_date || null,
    //     c_qap_date: obj.c_qap_date || null,
    //     a_qap_date: obj.a_qap_date || null,
    //     c_ilms_date: obj.c_ilms_date || null,
    //     a_ilms_date: obj.a_ilms_date || null,
    //     pbg_filename: obj.pbg_filename || "",
    //     hsn_gstn_icgrn: obj.hsn_gstn_icgrn || "",
    //     created_at: obj.created_at,
    //     btn_type
    // }))


    console.log("payload", pl);

    return pl;
}
const advBillHybridbtnDOPayload = async (payload) => {

    if (!payload || !Object.keys(payload).length) throw new Error("Invalid payload in advBillHybridbtnPayload");

    const pl = {
        btn_num: payload.btn_num,
        drg_penalty: payload.drg_penalty || "",
        qap_penalty: payload.qap_penalty || "",
        ilms_penalty: payload.ilms_penalty || "",
        estimate_penalty: payload.estimate_penalty || "",
        other_deduction: payload.other_deduction || "",
        total_deduction: payload.total_deduction || "",
        net_payable_amount: payload.net_payable_amount || "",
        created_at: payload.created_at || "",
        created_by: payload.created_by || "",
        assigned_to: payload.assigned_to || "",
        a_drawing_date: payload.a_drawing_date || null,
        a_qap_date:payload.a_qap_date || null,
        a_ilms_date:payload.a_ilms_date || null,

    };

    console.log("pl", pl);
    return pl;
}





const checkMissingActualSubmissionDate = async () => {

    let a_sdbg_date_q = `SELECT actualSubmissionDate AS PLAN_DATE, milestoneText AS MTEXT FROM actualsubmissiondate WHERE purchasing_doc_no = ?`;
    let a_dates = await query({
        query: a_sdbg_date_q,
        values: [purchasing_doc_no],
    });
    const a_dates_arr = [A_SDBG_DATE, A_DRAWING_DATE, A_QAP_DATE, A_ILMS_DATE];
    for (const item of a_dates_arr) {
        const i = a_dates.findIndex((el) => el.MTEXT == item);
        if (i < 0) {
            // return resSend(res, false, 200, `${item} is missing!`, null, null);
            return { success: false, message: item }
        }
    }

    return { success: true, message: "ALL DATE PRESENT" }
}


const getSDBGApprovedFiles = async (po, client) => {
    // GET Approved SDBG by PO Number
    let q = `SELECT file_name, file_path FROM sdbg WHERE purchasing_doc_no = ? and status = ? and action_type = ?`;
    let [results] = await client.execute(
        q,
        [po, APPROVED, ACTION_SDBG]
    );
    console.log("results000000000000000", results);
    return results;
};

const getPBGApprovedFiles = async (po) => {
    // GET Approved PBG by PO Number
    let q = `SELECT file_name FROM sdbg WHERE purchasing_doc_no = ? and status = ? and action_type = ?`;
    let result = await query({
        query: q,
        values: [po, APPROVED, ACTION_PBG],
    });
    return result;
};

const getGateEntry = async (po) => {
    let q = `SELECT acc_no, gate_date, file_name, file_path FROM store_gate WHERE purchasing_doc_no = ?`;
    let result = await query({
        query: q,
        values: [po],
    });
    return result;
};

const getGRNs = async (po) => {
    let q = `SELECT grn_no FROM store_grn WHERE purchasing_doc_no = ?`;
    let result = await query({
        query: q,
        values: [po],
    });
    return result;
};

const getICGRNs = async (body) => {
    const { purchasing_doc_no, invoice_no } = body;
    console.log("bd", body)

    const gate_entry_q = `SELECT ENTRY_NO AS gate_entry_no,
    ZMBLNR AS grn_no, EBELP as po_lineitem,
    INV_DATE AS invoice_date FROM zmm_gate_entry_d WHERE EBELN = ? AND INVNO = ?`;

    let gate_entry_v = await query({
        query: gate_entry_q,
        values: [purchasing_doc_no, invoice_no],
    });


    gate_entry_v = gate_entry_v[0];

    console.log("gate_entry_v", gate_entry_v)

    const icgrn_q = `SELECT PRUEFLOS AS icgrn_nos, MATNR as mat_no, LMENGE01 as quantity 
  FROM qals WHERE MBLNR = ?`; //   MBLNR (GRN No) PRUEFLOS (Lot Number)
    let icgrn_no = await query({
        query: icgrn_q,
        values: [gate_entry_v?.grn_no],
    });

    let total_price = 0;
    let total_quantity = 0;

    console.log("icgrn_no", icgrn_no)
    if (checkTypeArr(icgrn_no)) {
        await Promise.all(
            await icgrn_no.map(async (item) => {
                const price_q = `SELECT NETPR AS price FROM ekpo WHERE MATNR = ? and EBELN = ? and EBELP = ?`;
                let unit_price = await query({
                    query: price_q,
                    values: [item?.mat_no, purchasing_doc_no, gate_entry_v.po_lineitem],
                });
                total_quantity += parseFloat(item?.quantity);
                await Promise.all(
                    await unit_price.map(async (it) => {
                        console.log("it_price", it.price, parseFloat(it?.price));
                        total_price += parseFloat(it?.price) * total_quantity;
                    })
                );
            })
        );
    }
    console.log("total_price", total_price)
    gate_entry_v.total_price = parseFloat(total_price.toFixed(2));;
    return {
        total_icgrn_value: parseFloat(total_price.toFixed(2)),
    };
};

const checkBTNRegistered = async (btn_num, btn_table_name, client) => {
    let q = `SELECT count("btn_num") as count FROM ${btn_table_name} WHERE btn_num = ?`;
    let [results] = await client.execute(q, [btn_num]);
    console.log(results);
    if (results.length) {
        return results[0].count > 0;
    }
    return false;
};
const getBTNInfo = async (btn_num, btn_table_name, client) => {
    let q = `SELECT * FROM ${btn_table_name} WHERE btn_num = ?`;

    q = 
        `SELECT 
            btn.*, 
            vendor.name1 as vendor_name 
        FROM 
            ${btn_table_name} as btn
        LEFT JOIN 
            lfa1 as vendor 
        ON(vendor.lifnr = btn.vendor_code)
            WHERE btn_num = ?`
    let [results] = await client.execute(q, [btn_num]);
    return results;
};
const getBTNInfoDO = async (btn_num) => {
    let q = `SELECT * FROM btn_do WHERE btn_num = ?`;
    let result = await query({
        query: q,
        values: [btn_num],
    });
    return result;
};

const getVendorCodeName = async (po_no) => {
    const vendor_q = `SELECT t1.lifnr AS vendor_code,t2.name1 AS vendor_name FROM ekko as t1
    LEFT JOIN lfa1 as t2 ON t1.lifnr = t2.lifnr WHERE t1.ebeln = ? LIMIT 1`;
    let result = await query({
        query: vendor_q,
        values: [po_no],
    });
    result = result[0];
    return result;
};


const filesData = (payloadFiles) => {
    // Handle uploaded files
    const fileObj = {};
    if (Object.keys(payloadFiles).length) {
        Object.keys(payloadFiles).forEach((fileName) => {
            fileObj[fileName] = payloadFiles[fileName][0]["filename"]
        });
    }
    return fileObj;
}


const contractualSubmissionDate = async (purchasing_doc_no, client) => {
    let c_sdbg_date_q = `SELECT PLAN_DATE, MTEXT FROM zpo_milestone WHERE EBELN = ?`;
    console.log('c_sdbg_date_q', c_sdbg_date_q);
    const [results] = await client.execute(c_sdbg_date_q, [purchasing_doc_no]);
    console.log("results", results);
    // let c_dates = await client.execxute(c_sdbg_date_q, [purchasing_doc_no]);
    let c_dates = results;
    const dates_arr = [C_SDBG_DATE, C_DRAWING_DATE, C_QAP_DATE, C_ILMS_DATE];
    // for (const item of dates_arr) {
    //     const i = c_dates.findIndex((el) => el.MTEXT == item);
    //     if (i < 0) {
    //         // return resSend(res, false, 200, `${item} is missing!`, null, null);
    //         return { status: false, data: {}, msg: `${item} is missing!` }
    //     }
    // }

    const contractualDateObj = {}


    c_dates.forEach((item) => {
        if (item.PLAN_DATE && item.MTEXT === C_SDBG_DATE) {
            contractualDateObj.c_sdbg_date = new Date(item.PLAN_DATE).getTime();
        } else if (item.PLAN_DATE && item.MTEXT === C_DRAWING_DATE) {
            contractualDateObj.c_drawing_date = new Date(item.PLAN_DATE).getTime();
        } else if (item.PLAN_DATE && item.MTEXT === C_QAP_DATE) {
            contractualDateObj.c_qap_date = new Date(item.PLAN_DATE).getTime();
        } else if (item.PLAN_DATE && item.MTEXT === C_ILMS_DATE) {
            contractualDateObj.c_ilms_date = new Date(item.PLAN_DATE).getTime();
        }
    });


    return { status: true, data: contractualDateObj, msg: "success" }


}
const actualSubmissionDate = async (purchasing_doc_no, client) => {
    // GET Actual Dates from other Table
    // let a_sdbg_date;
    // let a_drawing_date;
    // let a_qap_date;
    // let a_ilms_date;

    const actualSubmissionObj = {};
    let response = {}

    let a_sdbg_date_q = `SELECT actualSubmissionDate AS PLAN_DATE, milestoneText AS MTEXT FROM actualsubmissiondate WHERE purchasing_doc_no = ?`;
    // let a_dates = await query({
    //     query: a_sdbg_date_q,
    //     values: [purchasing_doc_no],
    // });

    const [results] = await client.execute(a_sdbg_date_q, [purchasing_doc_no]);
    let a_dates = results;

    console.log(a_dates, "ooooooooooooooooo")

    // if(!a_dates.length) throw new Error(`All milestone is missing!`)
    if (!a_dates.length) return { status: false, data: {}, msg: `All milestone is missing!` };
    const a_dates_arr = [A_SDBG_DATE, A_DRAWING_DATE, A_QAP_DATE, A_ILMS_DATE];
    console.log(a_dates_arr, "a_dates_arra_dates_arra_dates_arr")
    // for (const item of a_dates_arr) {
    //     const i = a_dates.findIndex((el) => el.MTEXT == item);
    //     if (i < 0) {
    //         return { status: false, data: {}, msg: `${item} is missing!` };

    //         // throw new Error(`${item} is missing!`)
    //     }
    // }

    for (const item of a_dates) {
        if (item.MTEXT === A_SDBG_DATE) {
            if (!item.PLAN_DATE) {

                // throw new Error(`${A_SDBG_DATE} is missing!`)

                return { status: false, data: {}, msg: `${A_SDBG_DATE} is missing!` }
                // return resSend(
                //     res,
                //     false,
                //     200,
                //     `${A_SDBG_DATE} is missing!`,
                //     null,
                //     null
                // );
            }
            actualSubmissionObj.a_sdbg_date = item.PLAN_DATE;
            // a_sdbg_date = item.PLAN_DATE;
        } else if (item.MTEXT === A_DRAWING_DATE) {
            if (!item.PLAN_DATE) {

                // throw new Error(`${A_DRAWING_DATE} is missing!`)
                return { status: false, data: {}, msg: `${A_DRAWING_DATE} is missing!` };

                // return resSend(
                //     res,
                //     false,
                //     200,
                //     `${A_SDBG_DATE} is missing!`,
                //     null,
                //     null
                // );
            }
            actualSubmissionObj.a_drawing_date = item.PLAN_DATE;
        } else if (item.MTEXT === A_QAP_DATE) {
            if (!item.PLAN_DATE) {
                // throw new Error(`${A_QAP_DATE} is missing!`)
                return { status: false, data: {}, msg: `${A_QAP_DATE} is missing!` };

                // return resSend(
                //     res,
                //     false,
                //     200,
                //     `${A_QAP_DATE} is missing!`,
                //     null,
                //     null
                // );
            }
            actualSubmissionObj.a_qap_date = item.PLAN_DATE;
        } else if (item.MTEXT === A_ILMS_DATE) {
            if (!item.PLAN_DATE) {
                // throw new Error(`${A_ILMS_DATE} is missing!`);
                return { status: false, data: {}, msg: `${A_ILMS_DATE} is missing!` };


                // return resSend(
                //     res,
                //     false,
                //     200,
                //     `${A_ILMS_DATE} is missing!`,
                //     null,
                //     null
                // );
            }
            actualSubmissionObj.a_ilms_date = item.PLAN_DATE;
        }
    }

    return { status: true, data: actualSubmissionObj, msg: "All milestone passed.." };
}


const dateToEpochTime = (date) => {
    return date ? new Date(date).getTime() : null;
}

module.exports = {
    advBillHybridbtnPayload,
    getSDBGApprovedFiles,
    getVendorCodeName,
    getBTNInfoDO,
    getBTNInfo,
    checkBTNRegistered,
    getICGRNs,
    getGRNs,
    getGateEntry,
    getPBGApprovedFiles,
    checkMissingActualSubmissionDate,
    filesData,
    contractualSubmissionDate,
    actualSubmissionDate,
    dateToEpochTime,
    advBillHybridbtnDOPayload
}