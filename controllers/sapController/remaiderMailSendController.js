const { getQuery } = require("../../config/pgDbConfig");
const { SEVEN_DAYS_PRIOR_CON_MILESTONE_DATE, BG_2MONTH_PRIOR } = require("../../lib/event");
const { sendMail } = require("../../services/mail.services");
const cron = require("node-cron");

const sendPOMilestoneEXPReminderMail = async () => {
    const timeLineData = await getTimeLineData();

    if (timeLineData && timeLineData.length) {
        for (const data of timeLineData) {
            const obj = { users: [{ u_email: data?.u_email, u_id: data?.u_id, u_type: data?.u_type }] }
            await sendMail(SEVEN_DAYS_PRIOR_CON_MILESTONE_DATE,
                data,
                obj,
                SEVEN_DAYS_PRIOR_CON_MILESTONE_DATE)
        }
    }

    // resSend(res, true, 200, "success", timeLineData, null);
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
                   'vendor' AS u_type,
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
                   'vendor' AS u_type
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




const sendBGReminderMail = async () => {
    const bgData = await getBGExpireData();

    const bgTimelineData = getMaxExpireDate(bgData);

    console.log("bgTimelineData", bgTimelineData);

    if (bgTimelineData && bgTimelineData.length) {
        for (const data of bgTimelineData) {
            console.log("data", data);
            const obj = { users: [{ u_email: data?.u_email, u_id: data?.u_id, u_type: data?.u_type }] }
            await sendMail(BG_2MONTH_PRIOR,
                data,
                obj,
                BG_2MONTH_PRIOR)
        }
    }

    // resSend(res, true, 200, "success", timeLineData, null);
};

async function getBGExpireData() {
    const REMINDE_BEFORE_DAYS = 60 * 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const sevenDaysBefore = new Date(currentDate.getTime() + REMINDE_BEFORE_DAYS);
    const dueDate = sevenDaysBefore.toISOString().split("T")[0];

    let q = `SELECT    file_no,
        ref_no,
        po_number AS purchasing_doc_no,
        validity_date,
        extention_date1,
        extention_date2,
        extention_date3,
        extention_date4,
        extention_date5,
        users.cname AS u_name,
        users.email AS u_email,
        po.ernam    AS u_id,
        'do'        AS u_type
FROM      zfi_bgm_1   AS sap_bg
LEFT JOIN ekko        AS po
ON       (
                  sap_bg.po_number = po.ebeln)
LEFT JOIN pa0002 AS users
ON       (
                  users.pernr:: character VARYING = po.ernam)
WHERE     (
                  validity_date = $1
        OR        extention_date1 = $1
        OR        extention_date2 = $1
        OR        extention_date3 = $1
        OR        extention_date4 = $1
        OR        extention_date5 = $1 )`;


    //   GROUP  BY t.ebeln,
    //   t.mid;
    // const q = `SELECT * FROM zpo_milestone WHERE PLAN_DATE BETWEEN '${dueDate} 00:00:00' AND '${dueDate} 23:59:59';`;
    const firstTime = `${dueDate} 00:00:00`;
    const lastTime = `${dueDate} 23:59:59`
    console.log(firstTime, lastTime);
    console.log("dueDate", dueDate);
    const result = await getQuery({ query: q, values: [dueDate] });
    return result;
}



function getMaxExpireDate(data) {
    data.forEach(item => {
        const dates = [
            item.validity_date,
            item.extention_date1,
            item.extention_date2,
            item.extention_date3,
            item.extention_date4,
            item.extention_date5
        ].filter(date => date !== null);

        const maxDate = new Date(Math.max(...dates.map(date => date.getTime())));

        item.expire_date = maxDate;
    });
    return data;
}




const vendorReminderMail = async () => {
    const task2 = cron.schedule(
        "10 22 * * *",
        () => {
            console.log("Run at night 10: 10 PM");
            sendBGReminderMail();
            sendPOMilestoneEXPReminderMail();
        },
        {
            scheduled: true,
        }
    );

}


// module.exports = { sendPOMilestoneEXPReminderMail, sendBGReminderMail };
module.exports = { vendorReminderMail };
