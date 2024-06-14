// const { query } = require("../config/dbConfig");
const { insertTableData } = require("../controllers/genralControlles");
const { INSERT, ARCHIVE, MAIL_SEND_DEFAULT_RETRY_COUNT } = require("../lib/constant");
const { NEW } = require("../lib/status");
const { EMAILS, ARCHIVE_EMAILS } = require("../lib/tableName");
const { generateQuery, getEpochTime, getDateTime, generateQueryForMultipleData } = require("../lib/utils");
const mailBody = require("../lib/mailBody");
const { EMAIL_TEMPLAE } = require("../templates/mail-template");
const { query, getQuery } = require("../config/pgDbConfig");
const mailjson = require("../lib/mailConfig.json");
/**
 * Insert mail in to db with new status
 * @param {Object} data 
 * @param {String} eventName
 */
// const mailInsert = async (data, event, activity_name, heading = "") => {

//     try {

//         if (!data.mailSendTo || !event || !data.email_subject) {
//             throw new Error("recipent, email_subject and event required");
//         }
//         console.log("event name", event);
//         const mail_body = mailBody[event].replace(/{{(.*?)}}/g, (match, p1) => data[p1.trim()] || match);

//         console.log("mail_body", mail_body);

//         if (!mailBody) {
//             throw new Error("PLEASE ADD EVENT IN MAIL BODY FILE");
//         }

//         const dd = data.created_at ? new Date(data.created_at) : new Date();
//         const now = getDateTime(dd);

//         const mailPayload = {
//             "event_name": event,
//             "email_to": data.mailSendTo,
//             "email_subject": data.email_subject,
//             "email_cc": data.email_cc ? data.email_cc : null,
//             "email_bcc": data.email_bcc ? data.email_bcc : null,
//             "email_body": EMAIL_TEMPLAE(mail_body, heading),
//             "email_send_on": now.dateTime,
//             "created_on": now.date,
//             "created_by": data.created_by_id,
//             "modified_by": data.modified_by || null,
//             "modified_on": data.modified_on || null,
//             "attachemnt_path": data.attachemnt_path ? data.attachemnt_path : null,
//             "activity_name": activity_name | null
//         }
//         const { q, val } = generateQuery(INSERT, EMAILS, mailPayload)
//         const d = await query({ query: q, values: val });
//         console.log("d", d, q, val);
//         return true;

//     } catch (error) {
//         console.log("mailInsert function", error);
//         return false;
//     }
// }

const sendMail = async (eventName, data, userInfo, activity_name) => {
    try {
        if (!data || !eventName) {
            throw new Error("recipent, email_subject and event required");
        }

        const email_info = await getEmailInfo(eventName);
        const mailjsonConfig = mailjson[eventName];
        mailjsonConfig.data = data;
        const m_user = userInfo.users || [];
        console.log("userInfo.users", userInfo.users);
        mailjsonConfig.users = replaceUserValues(email_info, m_user);
        // const m_cc_user = userInfo.cc_users || [];
        // mailjsonConfig.cc_users = replaceUserValues([...mailjsonConfig.cc_users, ...m_cc_user] || [], mailjsonConfig.cc_users);
        // const m_bcc_user = userInfo.bcc_users || [];
        // mailjsonConfig.bcc_users = replaceUserValues([...mailjsonConfig.bcc_users, ...m_bcc_user] || [], mailjsonConfig.bcc_users);
        console.log("mailjsonConfig", mailjsonConfig);

        if (!mailjsonConfig.users.length) return;

        await mailInsert(mailjsonConfig, eventName, eventName, activity_name)

    } catch (error) {
        console.log("sendMail", error.toString(), error.stack);
        throw error;
    }
}


const getEmailInfo = async (event_name) => {
    const q =
        `SELECT e_info.event_name,
                e_info.u_id,
                e_info.u_name,
                e_info.u_type,
                e_info.u_email,
                e_body.email_body
         FROM   email_send_info AS e_info
                LEFT JOIN email_body AS e_body
                       ON( e_body.email_body_name = e_info.email_body_name )
         WHERE  e_info.event_name = $1`;
    return await getQuery({ query: q, values: [event_name] })
}
function replaceUserValues(email_info, m_user) {
    let result = [];
    m_user.forEach(darr => {
        const matchingData = email_info.find(user => user.u_type === darr.u_type);
        if (matchingData) {
            result.push({ ...matchingData, u_id: darr.u_id, u_name: darr.u_name, u_email: darr.u_email })
        }
    });
    const u_typeArr = new Set([...result.map((inf) => inf.u_type)]);
    const restOfUsers = email_info.filter((info) => !u_typeArr.has(info.u_type));
    result = result.concat(restOfUsers)
    return result;
}

// function replaceUserValues(users, data_arr) {
//     users.forEach(user => {
//         const matchingData = data_arr.find(data => data.u_type === user.u_type);
//         if (matchingData) {
//             user.u_id = matchingData.u_id;
//             user.u_name = matchingData.u_name;
//             user.u_email = matchingData.u_email;
//         }
//     });

//     return users; // Return the updated users array
// }



// function replaceUserValues(dataArray, usersArray) {
//     const dataMap = new Map(dataArray.map(user => [user.user_type, user]));
//     return usersArray.map(user => {
//         const matchingData = dataMap.get(user.user_type);
//         if (matchingData) {
//             return {
//                 ...user,
//                 u_id: matchingData.u_id,
//                 u_email: matchingData.u_email
//             };
//         }
//         return user;
//     });
// }

const mailInsert = async (data, event, activity_name, heading = "") => {

    try {

        const dd = data.created_at ? new Date(data.created_at) : new Date();
        const now = getDateTime(dd);

        const mailPayload = {
            "event_name": event,
            "email_to": "",
            "email_subject": data.email_subject || "",
            "email_cc": "",
            "email_bcc": "",
            "email_body": "",
            "email_send_on": now.dateTime,
            "created_on": now.date,
            "created_by": data.created_by_id || data.created_by || "",
            "modified_by": data.modified_by || "",
            "modified_on": data.modified_on || null,
            "attachment_path": data.attachment_path || "",
            "activity_name": activity_name || "",
            "retry_count": MAIL_SEND_DEFAULT_RETRY_COUNT
        }

        const mailArr = data.users.map((el) => ({
            ...mailPayload,
            email_to: el.u_email,
            email_cc: el.cc_users ? data.cc_users.map((mail) => mail.u_email).join(",") : "",
            email_bcc: el.bcc_users ? data.bcc_users.map((mail) => mail.u_email).join(",") : "",
            email_body: el.email_body.replace(/{{(.*?)}}/g, (match, p1) => data.data[p1.trim()] || match) || "Mail from GRSE"
        }));

        console.log("mailArr", mailArr);

        const { q, val } = await generateQueryForMultipleData(mailArr, EMAILS, ['id']);
        await query({ query: q, values: val });

    } catch (error) {
        console.log("mailInsert function", error.toString());
        throw error;
    }
}




const archiveEmails = async (data) => {

    try {
        const archiveEmailPayload = { ...data };
        delete archiveEmailPayload.email_send_on;
        delete archiveEmailPayload.sync_id;
        delete archiveEmailPayload.sync;
        delete archiveEmailPayload.sync_updated_at;
        const { q, val } = generateQuery(INSERT, ARCHIVE_EMAILS, archiveEmailPayload)
        const response = await query({ query: q, values: val });
        return response;
    } catch (error) {
        throw error;
    }
}



// const updateMailStatus = async (data) => {
//     try {

//         const updatedQuery = `UPDATE emails SET status = ? , message = ? WHERE id = ?`
//         await query({ query: updatedQuery, values: [data.status, data.message, data.id] });
//     } catch (error) {
//         console.log("updateMailStatus", error);
//     }
// }

module.exports = { mailInsert, archiveEmails, sendMail };