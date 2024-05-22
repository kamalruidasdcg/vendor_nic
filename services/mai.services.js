const { query } = require("../config/dbConfig");
const { insertTableData } = require("../controllers/genralControlles");
const { INSERT, ARCHIVE } = require("../lib/constant");
const { NEW } = require("../lib/status");
const { EMAILS, ARCHIVE_EMAILS } = require("../lib/tableName");
const { generateQuery, getEpochTime, getDateTime } = require("../lib/utils");
const mailBody = require("../lib/mailBody");
const { EMAIL_TEMPLAE } = require("../templates/mail-template");

/**
 * Insert mail in to db with new status
 * @param {Object} data 
 * @param {String} eventName
 */
const mailInsert = async (data, event, activity_name, heading = "") => {

    try {

        if (!data.mailSendTo || !event || !data.email_subject) {
            throw new Error("recipent, email_subject and event required");
        }
        console.log("event name", event);
        const mail_body = mailBody[event].replace(/{{(.*?)}}/g, (match, p1) => data[p1.trim()] || match);

        console.log("mail_body", mail_body);

        if (!mailBody) {
            throw new Error("PLEASE ADD EVENT IN MAIL BODY FILE");
        }

        const dd = data.created_at ? new Date(data.created_at) : new Date();
        const now = getDateTime(dd);

        const mailPayload = {
            "event_name": event,
            "email_to": data.mailSendTo,
            "email_subject": data.email_subject,
            "email_cc": data.email_cc ? data.email_cc : null,
            "email_bcc": data.email_bcc ? data.email_bcc : null,
            "email_body": EMAIL_TEMPLAE(mail_body, heading),
            "email_send_on": now.dateTime,
            "created_on": now.date,
            "created_by": data.created_by_id,
            "modified_by": data.modified_by || null,
            "modified_on": data.modified_on || null,
            "attachemnt_path": data.attachemnt_path ? data.attachemnt_path : null,
            "activity_name": activity_name | null
        }
        const { q, val } = generateQuery(INSERT, EMAILS, mailPayload)
        const d = await query({ query: q, values: val });
        console.log("d", d, q, val);
        return true;

    } catch (error) {
        console.log("mailInsert function", error);
        return false;
    }
}
const archiveEmails = async (data) => {

    try {
        const mailObj = {
            id: data.id,
            event: data.event,
            sender: data.sender,
            subject: data.subject,
            body: data.body,
            status: data.status,
            message: JSON.stringify(data.message),
            created_at: getEpochTime(),
            creatd_by_name: data.creatd_by_name,
            created_by_id: data.created_by_id,
        }
        const { q, val } = generateQuery(INSERT, ARCHIVE_EMAILS, mailObj)
        const response = await query({ query: q, values: val });
        return response;

    } catch (error) {
        console.log(error);
    }
}

const updateMailStatus = async (data) => {
    try {

        const updatedQuery = `UPDATE emails SET status = ? , message = ? WHERE id = ?`
        await query({ query: updatedQuery, values: [data.status, data.message, data.id] });
    } catch (error) {
        console.log("updateMailStatus", error);
    }
}

module.exports = { mailInsert, updateMailStatus, archiveEmails };