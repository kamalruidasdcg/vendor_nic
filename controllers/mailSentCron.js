// const { query } = require("../config/dbConfig");
const { NEW, FAILED, SENT } = require("../lib/status");
// const mailBody = require("../lib/mailBody");
const SENDMAIL = require("../lib/mailSend");
const { EMAIL_TEMPLAE } = require("../templates/mail-template");
const { updateMailStatus, mailInsert, archiveEmails } = require("../services/mail.services");
const { ARCHIVE } = require("../lib/constant");
const { getQuery, query } = require("../config/pgDbConfig");


const mailSentCornJob = async () => {

    const getMailQuery = `SELECT * FROM t_email_to_send ORDER BY created_on ASC LIMIT 10`;

    const emails = await getQuery({ query: getMailQuery, values: [] });
    console.log("emails", emails);
    if (emails.length) {
        for (let i = 0; i < emails.length; i++) {
            const mailDetails = {
                to: emails[i]["email_to"],
                subject: emails[i]["email_subject"],
                html: EMAIL_TEMPLAE(emails[i]["email_body"]),
                
            };

            // console.log("mailDetails", mailDetails);

            await SENDMAIL(mailDetails, async function (err, data) {
                if (!err) {
                    await Promise.all([
                        // query({ query: `DELETE FROM t_email_to_send WHERE id = ?`, values: [emails[i]["id"]] }),
                        // archiveEmails({ ...emails[i], status: FAILED, message: err })
                    ])
                    console.log("Error Occurs ('_') !", err);
                } else {
                    await Promise.all([
                        // query({ query: `DELETE FROM emails WHERE id = ?`, values: [emails[i]["id"]] }),
                        // archiveEmails({ ...emails[i], status: SENT, message: data })
                    ])
                    console.log(`Email sent successfully ('_') !!${emails[i]["sender"]}`);
                }
            });
        }
    }
}


module.exports = { mailSentCornJob }
