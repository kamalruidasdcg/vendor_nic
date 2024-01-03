const { query } = require("../../config/dbConfig");
const { VENDOR_REMINDER_EMAIL } = require("../../lib/event");
const { resSend } = require("../../lib/resSend");
const { mailTrigger } = require("../sendMailController");

const sendReminderMail = async (req, res) => {
    const timeLineData = await getTimeLineData();

    if(timeLineData && timeLineData.length) {
        for (const data of timeLineData) {
            await mailTrigger(data, VENDOR_REMINDER_EMAIL);
        }
    }

    resSend(res, true, 200, "success", timeLineData, null);
};

async function getTimeLineData() {
    const REMINDE_BEFORE_DAYS = 7 * 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const sevenDaysBefore = new Date(currentDate.getTime() + REMINDE_BEFORE_DAYS);
    const dueDate = sevenDaysBefore.toISOString().split("T")[0];

    const q =
        `
            SELECT v.SMTP_ADDR  AS vendor_email,
                   v.PERSNUMBER AS vendor_code,
                   t.EBELN      AS purchasing_doc_no,
                   v_name.NAME1 AS vendor_name,
                   t.PLAN_DATE  AS plan_date,
                   t.MID        AS mile_stone_id,
                   p.table_name AS item
            FROM   zpo_milestone AS t
                   JOIN ((SELECT purchasing_doc_no,
                                 vendor_code,
                                 "2"       AS flag,
                                 "drawing" AS table_name
                        FROM   add_drawing)
                        UNION ALL
                        SELECT purchasing_doc_no,
                                vendor_code,
                                "1"    AS flag,
                                "sdbg" AS table_name
                        FROM   new_sdbg
                        UNION ALL
                        SELECT purchasing_doc_no,
                                vendor_code,
                                "3"   AS flag,
                                "qap" AS table_name
                        FROM   qap_submission) AS p
                     ON ( t.EBELN = p.purchasing_doc_no
                          AND t.MID = p.flag )
                   JOIN adr6 AS v
                     ON p.vendor_code = v.PERSNUMBER
                   JOIN lfa1 AS v_name
                     ON p.vendor_code = v_name.LIFNR
            WHERE t.PLAN_DATE BETWEEN ? AND ?
            GROUP  BY t.ebeln,
                      t.mid;`;

    // const q = `SELECT * FROM zpo_milestone WHERE PLAN_DATE BETWEEN '${dueDate} 00:00:00' AND '${dueDate} 23:59:59';`;
    const firstTime = `${dueDate} 00:00:00`;
    const lastTime = `${dueDate} 23:59:59`
    const result = await query({ query: q, values:[firstTime, lastTime] });
    return result;
}

module.exports = { sendReminderMail };
