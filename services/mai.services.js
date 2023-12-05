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
const mailInsert = async (data) => {

    try {

        const mailObj = {
            sender: data.to,
            subject: data.subject,
            body: data.html,
            status: data.status,
            created_at: getEpochTime(),
            creatd_by_name: data.action_by_name ? data.action_by_name : "No Name",
            created_by_id: data.action_by_id ? data.action_by_id : "No Id",
            message: "New mail inserted"
        }

        const { q, val } = generateQuery(INSERT, EMAILS, mailObj)
        const res = await query({ query: q, values: val });
        return res;

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

module.exports = { mailInsert, updateMailStatus };