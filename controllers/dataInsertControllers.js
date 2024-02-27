// const { query,  } = require("../config/dbConfig");
const { query, connection } = require("../config/dbConfig");
const { INSERT, TRUE } = require("../lib/constant");
const { responseSend } = require("../lib/resSend");
const { EKKO } = require("../lib/tableName");
const { generateQuery, formatDate, generateInsertUpdateQuery, generateQueryForMultipleData } = require("../lib/utils");
// const mysql = require("mysql2/promise");
const { mailTrigger } = require("./sendMailController");
const { PO_UPLOAD_IN_LAN_NIC } = require("../lib/event");
const { ekpoTablePayload, zpo_milestonePayload } = require("../services/sap.po.services");

// require("dotenv").config();


const insertPOData = async (req, res) => {
    let insertPayload = {};
    let payload = {};

    try {

        const promiseConnection = await connection();
        let transactionSuccessful = false;
        if (Array.isArray(req.body)) {
            payload = req.body.length > 0 ? req.body[0] : null;
        } else if (typeof req.body === 'object' && req.body !== null) {
            payload = req.body;
        }

        const { EKPO, ZPO_MILESTONE, ...obj } = payload;

        try {



            if (!obj || typeof obj !== 'object' || !Object.keys(obj).length) {
                return responseSend(res, "0", 400, "INVALID PAYLOAD", null, null);
            }

            await promiseConnection.beginTransaction();

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

            // const ekkoTableInsert = generateQuery(INSERT, EKKO, insertPayload);
            const ekkoTableInsert = await generateInsertUpdateQuery(insertPayload, EKKO, "EBELN");

            try {
                const [results] = await promiseConnection.execute(ekkoTableInsert);
                console.log("results", results);
            } catch (error) {
                return responseSend(res, "0", 502, "Data insert failed !!", error, null);
            }


            const insertPromiseFn = [];
            console.log("ZPO_MILESTONE", ZPO_MILESTONE);
            if (ZPO_MILESTONE?.length) {

                try {


                    // const insert_zpo_milestone_table = `INSERT INTO zpo_milestone (EBELN, MID, MTEXT, PLAN_DATE, MO) VALUES ?`;
                    console.log("ZPO_MILESTONE", ZPO_MILESTONE);
                    const zmilestonePayload = await zpo_milestonePayload(ZPO_MILESTONE);
                    console.log('ekpopayload', zmilestonePayload);
                    // const insert_ekpo_table = `INSERT INTO ekpo (EBELN, EBELP, LOEKZ, STATU, AEDAT, TXZ01, MATNR, BUKRS, WERKS, LGORT, MATKL, KTMNG, MENGE, MEINS, NETPR, NETWR, MWSKZ) VALUES ?`;
                    const insert_zpo_milestone_table = await generateQueryForMultipleData(zmilestonePayload, "zpo_milestone", "C_PKEY");
                    console.log("insert_zpo_milestone_table", insert_zpo_milestone_table);
                    insertPromiseFn.push(promiseConnection.execute(insert_zpo_milestone_table));
                    // const zpo_milestone_table_val = zpo_milestoneTableData(ZPO_MILESTONE);
                    // const zpo_milestone_table_val = zpo_milestoneTableData(ZPO_MILESTONE);

                    insertPromiseFn.push(promiseConnection.execute(insert_zpo_milestone_table));
                } catch (error) {
                    console.log("error, zpo milestone", error);
                }
            }

        

            if (EKPO?.length) {

                try {
                    
               
                const ekpopayload = await ekpoTablePayload(EKPO);
                // const insert_ekpo_table = `INSERT INTO ekpo (EBELN, EBELP, LOEKZ, STATU, AEDAT, TXZ01, MATNR, BUKRS, WERKS, LGORT, MATKL, KTMNG, MENGE, MEINS, NETPR, NETWR, MWSKZ) VALUES ?`;
                const insert_ekpo_table = await generateQueryForMultipleData(ekpopayload, "ekpo", "C_PKEY");
                console.log("insert_ekpo_table", insert_ekpo_table);
                insertPromiseFn.push(promiseConnection.execute(insert_ekpo_table));
            } catch (error) {
                console.log("error, ekpo", error);
                    
            }

            }
            if (insertPromiseFn.length) {
                const insert = await Promise.all(insertPromiseFn);

                console.log("insert", insert);
            }
            const comm = await promiseConnection.commit(); // Commit the transaction if everything was successful
            transactionSuccessful = true;

            // const vendorNumber = insertPayload.LIFNR;
            // const poCreator = insertPayload.ERNAM;

            if (insertPayload.LIFNR && transactionSuccessful === TRUE) {
                //console.log("Connectio");

                try {
                    // await sendMail(insertPayload);
                    responseSend(res, "1", 200, "data insert succeed with mail trigere", [], null);
                } catch (error) {
                    responseSend(res, "1", 201, "Data insert but mail not send !!", error, null);
                }
            } else {
                responseSend(res, "1", 200, "data insert succeed without mail.", [], null);
            }

        } catch (error) {
            responseSend(res, "0", 502, "Data insert failed !!", error, null);
        }
        finally {
            if (!transactionSuccessful) {
                console.log("Connection End" + "--->" + "connection release");
                await promiseConnection.rollback();
            }
            const connEnd = await promiseConnection.end();
            console.log("Connection End" + "--->" + "connection release");
        }
    } catch (error) {
        responseSend(res, "0", 400, "Error in database conn!!", error, null);
    }
};


function ekpoTableData(data) {
    return data.map((obj) => [
        obj.EBELN,
        obj.EBELP ? obj.EBELP : null,
        obj.LOEKZ ? obj.LOEKZ : null,
        obj.STATU ? obj.STATU : null,
        formatDate(obj.AEDAT),
        obj.TXZ01 ? obj.TXZ01 : null,
        obj.MATNR ? obj.MATNR : null,
        obj.BUKRS ? obj.BUKRS : null,
        obj.WERKS ? obj.WERKS : null,
        obj.LGORT ? obj.LGORT : null,
        obj.MATKL ? obj.MATKL : null,
        obj.KTMNG ? obj.KTMNG : null,
        obj.MENGE ? obj.MENGE : null,
        obj.MEINS ? obj.MEINS : null,
        obj.NETPR ? obj.NETPR : null,
        obj.NETWR ? obj.NETWR : null,
        obj.MWSKZ ? obj.MWSKZ : null,
    ]);

}
function zpo_milestoneTableData(data) {
    return data.map((obj) => [
        obj.EBELN,
        obj.MID ? obj.MID : null,
        obj.MTEXT ? obj.MTEXT : null,
        formatDate(obj.PLAN_DATE),
        obj.MO ? obj.MO : null
    ]);

}


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


// async function updateInfoSendTo(vendorNumber, poCreatorId) {


//     const poCreator_mail_Q = `SELECT USRID_LONG FROM pa0105 WHERE SUBTY = "0030" PERNR = ?;`;
//     const vendor_mail_Q = `SELECT SMTP_ADDR FROM PERSNUMBER WHERE SUBTY = "0030" PERNR = ?;`;

//     const Q = poCreator_mail_Q+vendor_mail_Q;
//     console.log("Q", Q);

//     const result = await query({ query: Q, values: [poCreatorId , vendorNumber] });

//     console.log("resul ->", result);

// }



module.exports = { insertPOData };














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
