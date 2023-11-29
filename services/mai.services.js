const { query } = require("../config/dbConfig");
const { insertTableData } = require("../controllers/genralControlles");
const { INSERT } = require("../lib/constant");
const { NEW } = require("../lib/status");
const { EMAILS } = require("../lib/tableName");
const { generateQuery, getEpochTime } = require("../lib/utils");

/**
 * Insert mail in to db with new status
 * @param {Object} data 
 * @param {String} eventName
 */
const mailInsert = async (data, eventName = "mailSend") => {

    try {

        const mailObj = {
            sender: data.to,
            subject: data.subject,
            body: data.html,
            status: NEW,
            created_at: getEpochTime(),
            creatd_by_name: data.action_by_name ? data.action_by_name : "No Name",
            created_by_id: data.action_by_id ? data.action_by_id : "No Id",
        }

        const { q, val } = generateQuery(INSERT, EMAILS, mailObj)
        await query({ query: q, values: val });


    } catch (error) {
        console.log(error);
    }
}

module.exports = { mailInsert };