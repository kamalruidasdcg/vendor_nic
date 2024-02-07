const { query } = require("../config/dbConfig");
const { insertTableData } = require("../controllers/genralControlles");
const { INSERT, ARCHIVE } = require("../lib/constant");
const { NEW } = require("../lib/status");
const { EMAILS, ARCHIVE_EMAILS } = require("../lib/tableName");
const { generateQuery, getEpochTime } = require("../lib/utils");
const mailBody = require("../lib/mailBody");
const { EMAIL_TEMPLAE } = require("../templates/mail-template");

/**
 * Insert mail in to db with new status
 * @param {Object} data 
 * @param {String} eventName
 */
const mailInsert = async (data, event, subject, heading = "") => {

    try {

        if (!data.mailSendTo || !event) {
            throw new Error("recipent and event required");
        }
        console.log(event)
        const mail_body = mailBody[event].replace(/{{(.*?)}}/g, (match, p1) => data[p1.trim()] || match);

        // mailDetails = {
        //     to: payload.vendor_email,
        //     subject: subject,
        //     html: EMAIL_TEMPLAE(mail_body, heading)
        // };

        const mailObj = {
            sender: data.mailSendTo,
            event: event,
            subject: subject,
            body: EMAIL_TEMPLAE(mail_body, heading),
            status: NEW,
            created_at: getEpochTime(),
            creatd_by_name: data.action_by_name ? data.action_by_name : "No Name",
            created_by_id: data.action_by_id ? data.action_by_id : "No Id",
            message: "new mail inserted"
        }

        const { q, val } = generateQuery(INSERT, EMAILS, mailObj)
        const res = await query({ query: q, values: val });
        return true;

    } catch (error) {
        console.log(error);
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