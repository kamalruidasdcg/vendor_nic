
module.exports = {
    SDBG_VENDOR_MAIL_BODY:
        `Dear {{vendor_name}}, <br>
        Below are the details pertinent to submission of SDBG for the PO - {{purchasing_doc_no}}.
        <br>
        <br>
        By : {{delingOfficerName}} <br>
        Remarks: {{remarks}}<br>
        Date : {{sendAt}} <br>
        `,
    SDBG_SUBMIT_BY_VENDOR:
        `Dear {{vendor_name}}, <br>
        Below are the details pertinent to submission of SDBG for the PO - {{purchasing_doc_no}}.
        <br>
        <br>
        By : {{delingOfficerName}} <br>
        Remarks: {{remarks}}<br>
        Date : {{sendAt}} <br>
        `,

    SDBG_GRSE_MAIL_BODY:
        `Dear {{delingOfficerName}}, <br>
        Below are the details pertinent to submission of SDGBG for the PO - {{purchasing_doc_no}}.
        <br>
        <br>
        Vendor : {{vendor_name}} {{vendor_code}} <br>
        Remarks: {{remarks}} <br>
        Date : {{sendAt}} <br>`,

    DRAWING_VENDOR_MAIL_BODY:
        `Dear {{vendor_name}}, <br>
        Below are the details pertinent to submission of Drawing for the PO - {{purchasing_doc_no}}.
        <br>
        <br>
        By : {{delingOfficerName}} <br>
        Remarks: {{remarks}}<br>
        Date : {{sendAt}} <br>
        `,

    DRAWING_GRSE_MAIL_BODY:
        `Dear {{delingOfficerName}}, <br>
        Below are the details pertinent to submission of Drawing for the PO - {{purchasing_doc_no}}.
        <br>
        <br>
        Vendor : {{vendor_name}} {{vendor_code}} <br>
        Remarks: {{remarks}} <br>
        Date : {{sendAt}} <br>`,
    QAP_VENDOR_MAIL_BODY:
        `Dear {{vendor_name}}, <br>
        Below are the details pertinent to submission of QAP for the PO - {{purchasing_doc_no}}.
        <br>
        <br>
        By : {{delingOfficerName}} <br>
        Remarks: {{remarks}}<br>
        Date : {{sendAt}} <br>
        `,

    QAP_GRSE_MAIL_BODY:
        `Dear {{delingOfficerName}}, <br>
        Below are the details pertinent to submission of QAP for the PO - {{purchasing_doc_no}}.
        <br>
        <br>
        Vendor : {{vendor_name}} {{vendor_code}} <br>
        Remarks: {{remarks}} <br>
        Date : {{sendAt}} <br>`,
    QAP_ASSIGN_BY_GRSE:
        `Dear {{delingOfficerName}}, <br>
        Below are the details pertinent to submission of QAP for the PO - {{purchasing_doc_no}}.
        <br>
        <br>
        Vendor : {{grseOfficer}} {{grseOfficerId}} <br>
        Remarks: {{remarks}} <br>
        Date : {{sendAt}} <br>`,
    VENDOR_REMINDER_EMAIL:
        `Dear {{vendor_name}}, <br>
         The submisson date of {{item}}  of this PO - {{purchasing_doc_no}}
        <br>
        on {{plan_date}}
        <br>`,
    VENDOR_PO_UPLOAD_IN_LAN_NIC: `Dear {{vendor_name}}, <br>
        The PO - {{purchasing_doc_no}} upload on LAN and NIC server.
       <br>
       on {{upload_date}}
       <br>`
}
