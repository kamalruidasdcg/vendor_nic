const { query } = require("../config/dbConfig");
const { NEW, FAILED, SENT } = require("../lib/status");
const mailBody = require("../lib/mailBody");
const SENDMAIL = require("../lib/mailSend");
const { EMAIL_TEMPLAE } = require("../templates/mail-template");
const { updateMailStatus, mailInsert, archiveEmails } = require("../services/mai.services");
const { ARCHIVE } = require("../lib/constant");


const mailSentCornJob = async () => {

    const getMailQuery = `SELECT * FROM emails WHERE status = ?`;

    const emails = await query({ query: getMailQuery, values: [NEW] });
    if (emails.length) {
        for (let i = 0; i < emails.length; i++) {
            const mailDetails = {
                to: emails[i]["sender"],
                subject: emails[i]["subject"],
                html: emails[i]["body"]
            };

            await SENDMAIL(mailDetails, async function (err, data) {
                if (!err) {
                    await Promise.all([
                        query({ query: `DELETE FROM emails WHERE id = ?`, values: [emails[i]["id"]] }),
                        archiveEmails({ ...emails[i], status: FAILED, message: err })
                    ])
                    console.log("Error Occurs ('_') !", err);
                } else {
                    await Promise.all([
                        query({ query: `DELETE FROM emails WHERE id = ?`, values: [emails[i]["id"]] }),
                        archiveEmails({ ...emails[i], status: SENT, message: data })
                    ])
                    console.log(`Email sent successfully ('_') !!${emails[i]["sender"]}`);
                }
            });
        }
    }
}


module.exports = { mailSentCornJob }
