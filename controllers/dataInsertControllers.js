// const { query,  } = require("../config/dbConfig");
// const { query, connection } = require("../config/dbConfig");
const { INSERT, TRUE } = require("../lib/constant");
const { responseSend } = require("../lib/resSend");
const { EKKO } = require("../lib/tableName");
const { generateQuery, formatDate, generateInsertUpdateQuery, generateQueryForMultipleData } = require("../lib/utils");
// const mysql = require("mysql2/promise");
const { mailTrigger } = require("./sendMailController");
const { PO_UPLOAD_IN_LAN_NIC } = require("../lib/event");
const { ekpoTablePayload, zpo_milestonePayload, archivePoHeaderPayload, archivePoLineItemsPayload } = require("../services/sap.po.services");
const { poolClient, getQuery } = require("../config/pgDbConfig");
const { query } = require("../config/dbConfig");

// require("dotenv").config();


const insertPOData = async (req, res) => {
    let insertPayload = {};
    let payload = {};

    try {
        const client = await poolClient();
        let transactionSuccessful = false;
        if (Array.isArray(req.body)) {
            payload = req.body.length > 0 ? req.body[0] : null;
        } else if (typeof req.body === 'object' && req.body !== null) {
            payload = req.body;
        }

        const { EKPO, ZPO_MILESTONE, ...obj } = payload;

        try {
            if (!obj || typeof obj !== 'object' || !Object.keys(obj).length || !obj.EBELN) {
                return responseSend(res, "F", 400, "INVALID PAYLOAD", null, null);
            }

            await client.query('BEGIN');

            insertPayload = {
                EBELN: obj.EBELN,
                BUKRS: obj.BUKRS ? obj.BUKRS : null,
                BSTYP: obj.BSTYP ? obj.BSTYP : null,
                BSART: obj.BSART ? obj.BSART : null,
                LOEKZ: obj.LOEKZ ? obj.LOEKZ : null,
                AEDAT: formatDate(obj.AEDAT),
                ERNAM: obj.ERNAM ? obj.ERNAM : null,
                LIFNR: obj.LIFNR ? obj.LIFNR : null,
                EKORG: obj.EKORG ? obj.EKORG : null,
                EKGRP: obj.EKGRP ? obj.EKGRP : null,
            };
            const ekkoTableInsert = await generateInsertUpdateQuery(insertPayload, EKKO, ["EBELN"]);
            try {
                await client.query(ekkoTableInsert.q, ekkoTableInsert.val);
            } catch (error) {
                return responseSend(res, "F", 502, "Data insert failed !!", error, null);
            }

            try {
                const delete_from_zpo_milestoen = `DELETE FROM zpo_milestone  WHERE  ebeln = $1`;
                const results = await client.query(delete_from_zpo_milestoen, [obj.EBELN]);
            } catch (error) {
                console.log("delete_from_zpo_milestoen", error);
            }

            const insertPromiseFn = [];

            if (ZPO_MILESTONE?.length) {

                try {

                    const zmilestonePayload = await zpo_milestonePayload(ZPO_MILESTONE);
                    const insert_zpo_milestone_table = await generateQueryForMultipleData(zmilestonePayload, "zpo_milestone", ["EBELN", "MID"]);
                    insertPromiseFn.push(client.query(insert_zpo_milestone_table.q, insert_zpo_milestone_table.val));
                } catch (error) {
                    console.log("error, zpo milestone", error);
                }
            }

            if (EKPO?.length) {

                try {
                    const ekpopayload = await ekpoTablePayload(EKPO, obj.EBELN);
                    const insert_ekpo_table = await generateQueryForMultipleData(ekpopayload, "ekpo", ["EBELN", "EBELP"]);
                    insertPromiseFn.push(client.query(insert_ekpo_table.q, insert_ekpo_table.val));
                } catch (error) {
                    console.log("error, ekpo", error);
                }

            }
            if (insertPromiseFn.length) {
                const insert = await Promise.all(insertPromiseFn);
            }

            await client.query('COMMIT');

            transactionSuccessful = true;

            if (insertPayload.LIFNR && transactionSuccessful === TRUE) {

                try {
                    // await sendMail(insertPayload);
                    responseSend(res, "S", 200, "data insert succeed with mail trigere", [], null);
                } catch (error) {
                    responseSend(res, "F", 201, "Data insert but mail not send !!", error, null);
                }
            } else {
                responseSend(res, "S", 200, "data insert succeed without mail.", [], null);
            }

        } catch (error) {
            responseSend(res, "F", 502, "Data insert failed !!", error, null);
        }
        finally {
            if (!transactionSuccessful) {
                await client.query('ROLLBACK')
            }
            const connEnd = client.release()
        }
    } catch (error) {
        responseSend(res, "F", 400, "Error in database conn!!", error, null);
    }
};


async function sendMail(data) {
    const q =
        `SELECT v_add.smtp_addr AS vendor_email,
    v.name1         AS vendor_name
    FROM   adr6 AS v_add
    LEFT JOIN lfa1 AS v
    ON v.lifnr = v_add.persnumber
    WHERE  v_add.persnumber = ? ;`;
    const result = await query({ query: q, values: [data.LIFNR] });
    // const result = [
    //     {
    //       vendor_email: 'mainak.dutta@datacoresystems.co.in',
    //       vendor_name: 'PriceWaterhouseCoopers Pvt Ltd'
    //     }
    //   ];
    console.log(result);
    console.log(data);
    //console.log(res);
    if (result.length) {
        console.log(result.length);
        const payload = {
            purchasing_doc_no: data.EBELN,
            vendor_name: result[0].vendor_name,
            upload_date: data.AEDAT,
            vendor_email: result[0].vendor_email
        }
        console.log(payload);

        await mailTrigger(payload, PO_UPLOAD_IN_LAN_NIC);
    }

}


async function sendMail(data) {
    const getDetails = 
    
 }


async function getUserDetails(type, poNo, vendor_code, userid) {
    let getquery = "";

    switch (type) {
        case 'vendor':
            getquery =
                `SELECT po.lifnr       AS vendor_code,
                vendor_t.email AS vendor_email,
                po.ebeln       AS purchising_doc_no
          FROM      ekko           AS po

          LEFT JOIN lfa1 AS vendor_t
          ON        (po.lifnr = vendor_t.lifnr)
          WHERE     po.ebeln = $1`
            break;
        case 'do':
            break;
        case 'do_and_vendor':
            getquery =
                `SELECT    
                    po.ernam       AS d_officer_id,
                    user_t.cname   AS d_officer_name,
                    po.lifnr       AS vendor_code,
                    user_t.email   AS d_officer_email,
                    vendor_t.email AS vendor_email,
                    vendor_t.name1 AS vendor_name,
                    po.ebeln       AS purchising_doc_no
                FROM      ekko           AS po
                LEFT JOIN pa0002         AS user_t
                ON        (
                              po.ernam = user_t.pernr :: CHARACTER varying)
                LEFT JOIN lfa1 AS vendor_t
                ON        (
                              po.lifnr = vendor_t.lifnr)
                WHERE     po.ebeln = $1`
            break;

        default:
            break;
    }

    return getQuery()
}


// async function updateInfoSendTo(vendorNumber, poCreatorId) {


//     const poCreator_mail_Q = `SELECT USRID_LONG FROM pa0105 WHERE SUBTY = "0030" PERNR = ?;`;
//     const vendor_mail_Q = `SELECT SMTP_ADDR FROM PERSNUMBER WHERE SUBTY = "0030" PERNR = ?;`;

//     const Q = poCreator_mail_Q+vendor_mail_Q;
//     console.log("Q", Q);

//     const result = await query({ query: Q, values: [poCreatorId , vendorNumber] });

//     console.log("resul ->", result);

// }


const archivePo = async (req, res) => {
    let insertPayload = {};
    let payload = {};

    try {
        // const promiseConnection = await connection();
        const client = await poolClient();
        let transactionSuccessful = false;
        if (Array.isArray(req.body)) {
            payload = req.body.length > 0 ? req.body[0] : null;
        } else if (typeof req.body === 'object' && req.body !== null) {
            payload = req.body;
        }

        const cdhdr_table_data = payload.CDHDR_HEADER || payload.cdhdr_header;
        const cdpos_table_data = payload.CDPOS_LINE_ITEM || payload.cdpos_line_item;
        console.log("cdhdr_table_data", cdhdr_table_data);
        console.log("CDPOS", cdpos_table_data);



        try {

            // await promiseConnection.beginTransaction();
            await client.query('BEGIN');

            if (cdhdr_table_data?.length) {
                try {
                    insertPayload = await archivePoHeaderPayload(cdhdr_table_data)
                    console.log('insertPayload', insertPayload);
                    const cdhdrTableInsert = await generateQueryForMultipleData(insertPayload, 'cdhdr', ["OBJECTCLAS"]);
                    console.log("cdhdrTableInsert", cdhdrTableInsert);
                    // const [results] = await promiseConnection.execute(cdhdrTableInsert);
                    const [results] = await client.query(cdhdrTableInsert.q, cdhdrTableInsert.val);
                    console.log("results 1", results);
                } catch (error) {
                    return responseSend(res, "F", 502, "Data insert failed !!", error, null);
                }
            }

            if (cdpos_table_data?.length) {

                try {
                    const cdposTablePayload = await archivePoLineItemsPayload(cdpos_table_data);
                    console.log('cdposTablePayload', cdposTablePayload);
                    const insert_cdpos_table = await generateQueryForMultipleData(cdposTablePayload, "cdpos", ["OBJECTCLAS", "OBJECTID", "CHANGENR", "TABNAME", "TABKEY"]);
                    console.log(insert_cdpos_table, "insert_cdpos_table");
                    // const [results] = await promiseConnection.execute(insert_cdpos_table);
                    const [results] = await client.query(insert_cdpos_table.q, insert_cdpos_table.val);
                    console.log("results 2", results);

                } catch (error) {
                    console.log("error, zpo milestone", error);
                }
            }

            // const comm = await client.commit(); // Commit the transaction if everything was successful
            await client.query('COMMIT');
            transactionSuccessful = true;
            if (transactionSuccessful === TRUE) {
                responseSend(res, "S", 200, "data insert succeed with mail trigere", [], null);
            }

        } catch (error) {
            responseSend(res, "F", 502, "Data insert failed !!", error, null);
        }
        finally {
            if (!transactionSuccessful) {
                console.log("Connection End" + "--->" + "connection release");
                // await promiseConnection.rollback();
                await client.query('ROLLBACK')
            }
            // const connEnd = await promiseConnection.end();
            const connEnd = client.release()
            console.log("Connection End" + "--->" + "connection release archive po");
        }
    } catch (error) {
        responseSend(res, "F", 400, "Error in database conn!!", error, null);
    }
};

module.exports = { insertPOData, archivePo };














// let payload = {
//     EBELN: "7777777777",
//     BUKRS: "5788",
//     BSTYP: "S",
//     BSART: "ABCD",
//     LOEKZ: "W",
//     AEDAT: "2023-11-07",
//     ERNAM: "34567656787",
//     LIFNR: "1234567890",
//     EKORG: "1234",
//     EKGRP: "123",
//     ekpo: [
//       {
//         EBELN: "7777777777",
//         EBELP: 10023,
//         LOEKZ: "W",
//         STATU: "1",
//         AEDAT: "07.03.2014",
//         TXZ01: "IncomeTax Rectification in SAP Payroll",
//         MATNR: "",
//         BUKRS: "GRSE",
//         WERKS: "100",
//         LGORT: "",
//         MATKL: "SE57",
//         KTMNG: 1244,
//         MENGE: 232131,
//         MEINS: "AU",
//         NETPR: "0",
//         NETWR: "0",
//         MWSKZ: "TV",
//       },
//       {
//         EBELN: "7777777777",
//         EBELP: 88,
//         LOEKZ: "W",
//         STATU: "1",
//         AEDAT: "20.06.2019",
//         TXZ01: "6. Warranty Support",
//         MATNR: "",
//         BUKRS: "GRSE",
//         WERKS: "100",
//         LGORT: "",
//         MATKL: "SE74",
//         KTMNG: "0",
//         MENGE: "1",
//         MEINS: "AU",
//         NETPR: "9000,3222",
//         NETWR: "124,456,900",
//         MWSKZ: "SG",
//       },
//     ],
//     zpo_milestone: [
//       { EBELN: "7777777777", MID: "M-1", MTEXT: "IM IN - 1", PLAN_DATE: "2023-11-02", MO: "M" },
//       { EBELN: "7777777777", MID: "M-2", MTEXT: "IM IN - 2", PLAN_DATE: "2023-11-03", MO: "O" },
//     ],
//   };