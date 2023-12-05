
module.exports = {
    SDBG_VENDOR_MAIL_BODY: `
    Dear {{vendor_name}}, <br>
    Below are the details pertinent to submission of SDBG for the PO - {{purchasing_doc_no}}.
    <br>
    <br>
    By : {{delingOfficerName}} <br>
    Remarks: {{remarks}}<br>
    Date : {{sendAt}} <br>
    `,
    SDBG_GRSE_MAIL_BODY: `Dear {{delingOfficerName}}, <br>
    Below are the details pertinent to submission of SDGBG for the PO - {{purchasing_doc_no}}.
    <br>
    <br>
    Vendor : {{vendor_name}} {{vendor_code}} <br>
    Remarks: {{remarks}} <br>
    Date : {{sendAt}} <br>`,

}

