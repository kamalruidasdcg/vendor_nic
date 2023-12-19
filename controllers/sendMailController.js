const SENDMAIL = require("../lib/mailSend");
const mailBody = require("../lib/mailBody");
const { SDBG_SUBMIT_MAIL_TEMPLATE, DRAWING_SUBMIT_MAIL_TEMPLATE, QAP_SUBMIT_MAIL_TEMPLATE } = require("../templates/mail-template");
const { SDBG_SUBMIT_BY_VENDOR, SDBG_SUBMIT_BY_GRSE, SDBG_ACKNOWLEDGE_BY_GRSE, DRAWING_SUBMIT_BY_VENDOR, DRAWING_SUBMIT_BY_GRSE, DRAWING_APPROVED_BY_GRSE, QAP_SUBMIT_BY_VENDOR, QAP_SUBMIT_BY_GRSE, QAP_APPROVED_BY_GRSE, QAP_ASSIGN_BY_GRSE } = require("../lib/event");
const { mailInsert, updateMailStatus } = require("../services/mai.services");
const path = require('path');

function check() {
    throw new Error("Params required");
}



/**
 * mailTrigger function
 * @param {Object} payload
 * @param {String} eventName
 */
const mailTrigger = async (payload = check(), eventName = check()) => {

    let mailDetails = {}
    let mail_body = "";

    try {
        // VENDOR --mailTo--> GRSE
        // GRSE --mailTo--> VENDOR 
        switch (eventName) {
            case SDBG_SUBMIT_BY_VENDOR:
                /**
                 * REPLACE VARIABLES IN MAIL BODY ,  PAYLOAD OBJECT SHOULD ALL THOSE VALUES
                 * vendor_name purchasing_doc_no action_by_name action_by_id remarks created_at 
                 * && mailSendTo[MAIL SENDER MAIL ID]
                 */
                mail_body = mailBody["SDBG_GRSE_MAIL_BODY"].replace(/{{(.*?)}}/g, (match, p1) => payload[p1.trim()] || match);

                mailDetails = {
                    to: payload.mailSendTo,
                    subject: "Submission of SDBG",
                    html: SDBG_SUBMIT_MAIL_TEMPLATE(mail_body, "GRSR updated"),
                    // attachments: [{
                    //     filename: payload.fileName,
                    //     path: payload.filePath,
                    // }]
                };

                break;
            case SDBG_SUBMIT_BY_GRSE:

                mail_body = mailBody["SDBG_VENDOR_MAIL_BODY"].replace(/{{(.*?)}}/g, (match, p1) => payload[p1.trim()] || match);

                mailDetails = {
                    to: payload.mailSendTo,
                    subject: "Acknowledge of SDBG",
                    html: SDBG_SUBMIT_MAIL_TEMPLATE(mail_body, "Vendor update"),
                    // attachments: [{
                    //     filename: payload.fileName,
                    //     path: payload.filePath,
                    // }]
                };


                break;
            case SDBG_ACKNOWLEDGE_BY_GRSE:

                mail_body = mailBody["DRAWING_VENDOR_MAIL_BODY"].replace(/{{(.*?)}}/g, (match, p1) => payload[p1.trim()] || match);

                mailDetails = {
                    to: payload.mailSendTo,
                    subject: "Submission of SDBG",
                    html: SDBG_SUBMIT_MAIL_TEMPLATE(mail_body, "Vendor update"),
                    // attachments: [{
                    //     filename: payload.fileName,
                    //     path: payload.filePath,
                    // }]
                };

                break;
            case DRAWING_SUBMIT_BY_VENDOR:
                /**
                 * REPLACE VARIABLES IN MAIL BODY ,  PAYLOAD OBJECT SHOULD ALL THOSE VALUES
                 * vendor_name purchasing_doc_no action_by_name action_by_id remarks created_at 
                 * && mailSendTo[MAIL SENDER MAIL ID]
                 */
                mail_body = mailBody["DRAWING_GRSE_MAIL_BODY"].replace(/{{(.*?)}}/g, (match, p1) => payload[p1.trim()] || match);

                mailDetails = {
                    to: payload.mailSendTo,
                    subject: "Submission of Drawing",
                    html: DRAWING_SUBMIT_MAIL_TEMPLATE(mail_body, "GRSR updated"),
                    // attachments: [{
                    //     filename: payload.fileName,
                    //     path: payload.filePath,
                    // }]
                };

                break;
            case DRAWING_SUBMIT_BY_GRSE:

                mail_body = mailBody["DRAWING_GRSE_MAIL_BODY"].replace(/{{(.*?)}}/g, (match, p1) => payload[p1.trim()] || match);

                mailDetails = {
                    to: payload.mailSendTo,
                    subject: "Submission of Drawing",
                    html: DRAWING_SUBMIT_MAIL_TEMPLATE(mail_body, "Vendor update"),
                    // attachments: [{
                    //     filename: payload.fileName,
                    //     path: payload.filePath,
                    // }]
                };


                break;
            case DRAWING_APPROVED_BY_GRSE:

                mail_body = mailBody["DRAWING_VENDOR_MAIL_BODY"].replace(/{{(.*?)}}/g, (match, p1) => payload[p1.trim()] || match);

                mailDetails = {
                    to: payload.mailSendTo,
                    subject: "Submission of Drawing",
                    html: DRAWING_SUBMIT_MAIL_TEMPLATE(mail_body, "Vendor update"),
                    // attachments: [{
                    //     filename: payload.fileName,
                    //     path: payload.filePath,
                    // }]
                };

                break;
            case QAP_SUBMIT_BY_VENDOR:
                /**
                 * REPLACE VARIABLES IN MAIL BODY ,  PAYLOAD OBJECT SHOULD ALL THOSE VALUES
                 * vendor_name purchasing_doc_no action_by_name action_by_id remarks created_at 
                 * && mailSendTo[MAIL SENDER MAIL ID]
                 */
                mail_body = mailBody["QAP_GRSE_MAIL_BODY"].replace(/{{(.*?)}}/g, (match, p1) => payload[p1.trim()] || match);

                mailDetails = {
                    to: payload.mailSendTo,
                    subject: "Submission of QAP",
                    html: QAP_SUBMIT_MAIL_TEMPLATE(mail_body, "GRSR updated"),
                    // attachments: [{
                    //     filename: payload.fileName,
                    //     path: payload.filePath,
                    // }]
                };

                break;
            case QAP_SUBMIT_BY_GRSE:

                mail_body = mailBody["QAP_VENDOR_MAIL_BODY"].replace(/{{(.*?)}}/g, (match, p1) => payload[p1.trim()] || match);

                mailDetails = {
                    to: payload.mailSendTo,
                    subject: "Submission of QAP",
                    html: QAP_SUBMIT_MAIL_TEMPLATE(mail_body, "Vendor update"),
                    // attachments: [{
                    //     filename: payload.fileName,
                    //     path: payload.filePath,
                    // }]
                };


                break;
            case QAP_APPROVED_BY_GRSE:

                mail_body = mailBody["QAP_VENDOR_MAIL_BODY"].replace(/{{(.*?)}}/g, (match, p1) => payload[p1.trim()] || match);

                mailDetails = {
                    to: payload.mailSendTo,
                    subject: "Approval of QAP",
                    html: QAP_SUBMIT_MAIL_TEMPLATE(mail_body, "Vendor update"),
                    // attachments: [{
                    //     filename: payload.fileName,
                    //     path: payload.filePath,
                    // }]
                };

                break;
            case QAP_ASSIGN_BY_GRSE:

                mail_body = mailBody["QAP_ASSIGN_BY_GRSE"].replace(/{{(.*?)}}/g, (match, p1) => payload[p1.trim()] || match);

                mailDetails = {
                    to: payload.mailSendTo,
                    subject: "Approval of QAP",
                    html: QAP_SUBMIT_MAIL_TEMPLATE(mail_body, "Vendor update"),
                    // attachments: [{
                    //     filename: payload.fileName,
                    //     path: payload.filePath,
                    // }]
                };

                break;

            default:
                break;
        }



        await SENDMAIL(mailDetails, async function (err, data) {
            if (!err) {
                console.log("Error Occurs ('_') !", err);
                // await updateMailStatus({ id: mail_response.insertId, staus: "error", message: err });
                await mailInsert({ ...payload, status: "FAILED", ...mailDetails });
            } else {
                // await updateMailStatus({ id: mail_response.insertId, staus: "sent", message: data });
                await mailInsert({ ...payload, status: "SENT", ...mailDetails });
                console.log(`Email sent successfully ('_') !!${payload.mailSendTo}`);
            }
        });


    } catch (error) {
        console.log("mail trigger api error", error);
    }

}


module.exports = { mailTrigger }