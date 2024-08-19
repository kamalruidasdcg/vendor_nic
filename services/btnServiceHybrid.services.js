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
        invoice_filename: payload.invoice_filename,
        invoice_type: payload.invoice_type,
        debit_note: payload.debit_note || "0",
        credit_note: payload.credit_note ||"0",
        debit_credit_filename: payload.debit_credit_filename,
        net_claim_amount: payload.net_claim_amount,
        net_claim_amt_gst: payload.net_claim_amt_gst,
        wdc_number: payload.wdc_number,
        hsn_gstn_icgrn: payload.hsn_gstn_icgrn,
        created_at: getEpochTime(),
        created_by_id: payload.created_by_id,
        btn_type: 'service-contract-bills'
    }

    return obj;
}


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


module.exports = { payloadObj, filesData }