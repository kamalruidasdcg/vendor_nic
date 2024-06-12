const { query, getQuery } = require("../../config/pgDbConfig");
const { VENDOR_REMINDER_EMAIL, SEVEN_DAYS_PRIOR_CON_MILESTONE_DATE } = require("../../lib/event");
const { resSend } = require("../../lib/resSend");
const { sendMail } = require("../../services/mail.services");
const { mailTrigger } = require("../sendMailController");

const sendReminderMail = async (req, res) => {
    const timeLineData = await getTimeLineData();
    // console.log("timeLineData", timeLineData);

    if (timeLineData && timeLineData.length) {
        for (const data of timeLineData) {
            console.log("data", data);
            const obj = { users:[{ u_email: data.u_email, u_id: data.u_id, user_type: data.user_type }] }
            await sendMail(SEVEN_DAYS_PRIOR_CON_MILESTONE_DATE,
                data,
                obj,
                SEVEN_DAYS_PRIOR_CON_MILESTONE_DATE)
        }
    }

    resSend(res, true, 200, "success", timeLineData, null);
};

async function getTimeLineData() {
    const REMINDE_BEFORE_DAYS = 7 * 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const sevenDaysBefore = new Date(currentDate.getTime() + REMINDE_BEFORE_DAYS);
    const dueDate = sevenDaysBefore.toISOString().split("T")[0];

    let q =
        `
            SELECT v_name.email  AS u_email,
                   v_name.lifnr AS vendor_code,
                   t.EBELN      AS purchasing_doc_no,
                   v_name.NAME1 AS vendor_name,
                   t.PLAN_DATE  AS plan_date,
                   t.MID        AS mile_stone_id,
                   p.table_name AS item,
                   v_name.lifnr AS  u_id
                   'vendor' AS user_type,
            FROM   zpo_milestone AS t
                   JOIN ((SELECT purchasing_doc_no,
                                 vendor_code,
                                 '02'      AS flag,
                                 'drawing' AS table_name
                        FROM   drawing)
                        UNION ALL
                        SELECT purchasing_doc_no,
                                vendor_code,
                                '01'    AS flag,
                                'sdbg' AS table_name
                        FROM   sdbg
                        UNION ALL
                        SELECT purchasing_doc_no,
                                vendor_code,
                                '03'   AS flag,
                                'qap' AS table_name
                        FROM   qap_submission) AS p
                     ON ( t.EBELN = p.purchasing_doc_no AND t.MID = p.flag )
                   JOIN lfa1 AS v_name
                     ON p.vendor_code = v_name.LIFNR
            WHERE t.PLAN_DATE BETWEEN $1 AND $2`;
    q =
        `
        SELECT v_name.email  AS u_email,
                   v_name.lifnr AS vendor_code,
                   t.EBELN      AS purchasing_doc_no,
                   v_name.NAME1 AS vendor_name,
                   t.PLAN_DATE  AS plan_date,
                   t.MID        AS mile_stone_id,
                   p.table_name AS item,
                   v_name.lifnr AS  u_id,
                   'vendor' AS user_type
            FROM   zpo_milestone AS t
                   JOIN ((SELECT purchasing_doc_no,
                                 vendor_code,
                                 '02'      AS flag,
                                 'drawing' AS table_name
                        FROM   drawing)
                        UNION ALL
                        (SELECT purchasing_doc_no,
                                vendor_code,
                                '01'    AS flag,
                                'sdbg' AS table_name
                        FROM   sdbg)
                        UNION ALL
                        (SELECT purchasing_doc_no,
                                vendor_code,
                                '03'   AS flag,
                                'qap' AS table_name
                        FROM   qap_submission)
						UNION ALL 
						 
						 (SELECT purchasing_doc_no,
                                vendor_code,
                                '04'    AS flag,
                                'ilms' AS table_name
                        FROM   sdbg)
						) AS p
                     ON ( t.EBELN = p.purchasing_doc_no AND t.MID = p.flag )
                   JOIN lfa1 AS v_name
                     ON p.vendor_code = v_name.LIFNR
            WHERE (t.PLAN_DATE BETWEEN $1 AND $2)
			 GROUP  BY t.ebeln, t.mid, v_name.email,  v_name.lifnr, p.table_name`;




    //   GROUP  BY t.ebeln,
    //   t.mid;
    // const q = `SELECT * FROM zpo_milestone WHERE PLAN_DATE BETWEEN '${dueDate} 00:00:00' AND '${dueDate} 23:59:59';`;
    const firstTime = `${dueDate} 00:00:00`;
    const lastTime = `${dueDate} 23:59:59`
    console.log(firstTime, lastTime);
    const result = await getQuery({ query: q, values: [firstTime, lastTime] });
    return result;
}

module.exports = { sendReminderMail };
