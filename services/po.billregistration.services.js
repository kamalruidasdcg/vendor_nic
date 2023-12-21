const { getEpochTime } = require("../lib/utils")


const addBillPayload = (payload) => {

    return {

        zbtno: payload.zbtn_number,
        created_by_id: payload.action_by_id ? payload.action_by_id : null,
        created_by_name: payload.action_by_name ? payload.action_by_name : null,
        bill_submit_date: payload.bill_submit_date ? payload.bill_submit_date : null,
        bill_submit_to_email: payload.bill_submit_to_email ? payload.bill_submit_to_email : null,
        bill_submit_to_name: payload.bill_submit_to_name ? payload.bill_submit_to_name : null,
        bill_submit_time: payload.bill_submit_time ? payload.bill_submit_time : payload.bill_submit_time,
        created_at: getEpochTime(),
        file_name: payload.fileName ? payload.fileName : null,
        file_path: payload.filePath ? payload.filePath : null,
        invoice_no: payload.invoice_no ? payload.invoice_no : null,
        purchasing_doc_no: payload.purchasing_doc_no ? payload.purchasing_doc_no : null,
        remarks: payload.remarks ? payload.remarks : null,
        vendor_code: payload.vendor_code ? payload.vendor_code : null,
        vendor_email: payload.vendor_email ? payload.vendor_email : null,
        vendor_name: payload.vendor_name ? payload.vendor_name : null
    }
}


const addToZBTSPayload = (payload) => {
    return {
        ZBTNO: payload.zbtn_number,
        EBELN: payload.purchasing_doc_no ? payload.purchasing_doc_no: null,
        LIFNR: payload.vendor_code ? payload.vendor_code : null,
        ZVBNO: payload.invoice_no ? payload.invoice_no : null,
        VEN_BILL_DATE: payload.bill_submit_date ? payload.bill_submit_date: null,
        DPERNR1: payload.vendor_name ? payload.vendor_name: null,
        ZRMK1: payload.remarks ? payload.remarks : null,
        RERNAM: payload.vendor_name ? payload.vendor_name : null
    }
}

module.exports = { addBillPayload , addToZBTSPayload}