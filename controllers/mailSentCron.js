// const { query } = require("../config/dbConfig");
const { NEW, FAILED, SENT } = require("../lib/status");
// const mailBody = require("../lib/mailBody");
const SENDMAIL = require("../lib/mailSend");
const { EMAIL_TEMPLAE } = require("../templates/mail-template");
const { archiveEmails } = require("../services/mail.services");
const { ARCHIVE, UPDATE, MAIL_SEND_MAX_RETRY_COUNT } = require("../lib/constant");
const { getQuery, query } = require("../config/pgDbConfig");
const { EMAILS } = require("../lib/tableName");
const { generateQuery } = require("../lib/utils");


const mailSentCornJob = async () => {

    const getMailQuery = `SELECT * FROM ${EMAILS} ORDER BY created_on ASC LIMIT 10`;

    let emails = await getQuery({ query: getMailQuery, values: [] });

    // emails = []
    console.log("emails", emails);
    if (emails.length) {
        for (let i = 0; i < emails.length; i++) {
            const mailDetails = {
                to: emails[i]["email_to"],
                from: process.env.MAIL_SEND_MAIL_ID,
                // cc:  emails[i]["email_cc"],
                // bcc:  emails[i]["email_bcc"],
                subject: emails[i]["email_subject"],
                html: EMAIL_TEMPLAE(emails[i]["email_body"]),

            };
 
            try {
                const email_response = await SENDMAIL(mailDetails);
                await query({ query: `DELETE FROM ${EMAILS} WHERE id = $1`, values: [emails[i]["id"]] });
                await archiveEmails({ ...emails[i] });
                console.log(`Email sent successfully ('_') !!${emails[i]["email_to"]}`);
            } catch (error) {
                if (emails[i]["retry_count"] == MAIL_SEND_MAX_RETRY_COUNT) {
                    await archiveEmails({ ...emails[i] });
                    await query({ query: `DELETE FROM ${EMAILS}  WHERE retry_count = $1 `, values: [MAIL_SEND_MAX_RETRY_COUNT] });
                } else {
                    const { q, val } = generateQuery(UPDATE, EMAILS, { retry_count: ++emails[i]["retry_count"] }, { id: emails[i]["id"] });
                    await query({ query: q, values: val });
                    console.log("Error Occurs to mail send ('_') !", error.message);
                }
            }


            // await SENDMAIL(mailDetails, async function (err, data) {
            //     if (!err) {
            //         // await Promise.all([
            //         // ])

            //         if (emails[i]["retry_count"] == MAIL_SEND_MAX_RETRY_COUNT) {
            //             await archiveEmails({ ...emails[i] });
            //             await query({ query: `DELETE FROM ${EMAILS}  WHERE retry_count = $1 `, values: [MAIL_SEND_MAX_RETRY_COUNT] });
            //         } else {
            //             const { q, val } = generateQuery(UPDATE, ARCHIVE_EMAILS, { retry_count: ++emails[i]["retry_count"] }, { id: emails[i]["id"] });
            //             await query({ query: q, values: val }),
            //                 console.log("qqqqq", q, val);
            //             console.log("Error Occurs ('_') !");
            //         }
            //     } else {
            //         await query({ query: `DELETE FROM ${EMAILS} WHERE id = $1`, values: [emails[i]["id"]] }),
            //             await archiveEmails({ ...emails[i] })
            //         console.log(`Email sent successfully ('_') !!${emails[i]["email_to"]}`);
            //     }
            // });
        }
    }
}


module.exports = { mailSentCornJob }
