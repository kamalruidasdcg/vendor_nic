// const { query,  } = require("../config/dbConfig");
const { connection } = require("../../config/dbConfig");
const { TRUE } = require("../../lib/constant");
const { responseSend, resSend } = require("../../lib/resSend");
const { GATE_ENTRY_DATA, GATE_ENTRY_HEADER } = require("../../lib/tableName");
const { gateEntryHeaderPayload, gateEntryDataPayload } = require("../../services/sap.store.services");
const { generateInsertUpdateQuery, generateQueryForMultipleData } = require("../../lib/utils");
const Measage = require("../../utils/messages")


const insertGateEntryData = async (req, res) => {
    let insertPayload = {};
    let payload = {};

    try {

        const promiseConnection = await connection();
        let transactionSuccessful = false;
        // if (Array.isArray(req.body)) {
        //     payload = req.body.length > 0 ? req.body[0] : null;
        // } else if (typeof req.body === 'object' && req.body !== null) {
        //     payload = req.body;
        // }
        payload = req.body;

        console.log("payload", req.body);

        // const { ITEM_TAB, ...obj } = payload;

        // console.log("GE_LINE_ITEMS", ITEM_TAB);
        // console.log("obj", obj);
        await promiseConnection.beginTransaction();


        async function insertRecurcionFn(payload, index) {

            console.log("lllll", index, payload.length, payload);

            if (index == payload.length) return;

            const { ITEM_TAB, ...obj } = payload[index];

            console.log("GE_LINE_ITEMS", ITEM_TAB);
            console.log("obj", obj);

            if (!obj || typeof obj !== 'object' || !Object.keys(obj).length || !obj.ENTRY_NO || !obj.W_YEAR) {
                // return responseSend(res, "F", 400, "INVALID PAYLOAD", null, null);
                throw new Error(Measage.INVALID_PAYLOAD);
            }

            // await promiseConnection.beginTransaction();

            insertPayload = await gateEntryHeaderPayload(obj);
            const gate_entry_h_Insert = await generateInsertUpdateQuery(insertPayload, GATE_ENTRY_HEADER, "C_PKEY");

            try {
                const [results] = await promiseConnection.execute(gate_entry_h_Insert);
                console.log("results", results);
            } catch (error) {
                throw new Error(Measage.DATA_INSERT_FAILED + JSON.stringify(error));
                // return responseSend(res, "F", 502, "Data insert failed !!", error, null);
            }

            if (ITEM_TAB && ITEM_TAB?.length) {

                try {
                    const zmilestonePayload = await gateEntryDataPayload(ITEM_TAB);
                    console.log('ekpopayload', zmilestonePayload);
                    // const insert_ekpo_table = `INSERT INTO ekpo (EBELN, EBELP, LOEKZ, STATU, AEDAT, TXZ01, MATNR, BUKRS, WERKS, LGORT, MATKL, KTMNG, MENGE, MEINS, NETPR, NETWR, MWSKZ) VALUES ?`;
                    const insert_zpo_milestone_table = await generateQueryForMultipleData(zmilestonePayload, GATE_ENTRY_DATA, "C_PKEY");
                    const response = await promiseConnection.execute(insert_zpo_milestone_table)

                } catch (error) {
                    // console.log("error, zpo milestone", error);
                    throw new Error(Measage.DATA_INSERT_FAILED + JSON.stringify(error));
                }
            }


            await insertRecurcionFn(payload, index + 1)
        }



        try {

            await insertRecurcionFn(payload, 0)
            // if (!obj || typeof obj !== 'object' || !Object.keys(obj).length || !obj.ENTRY_NO || !obj.W_YEAR) {
            //     return responseSend(res, "F", 400, "INVALID PAYLOAD", null, null);
            // }

            // await promiseConnection.beginTransaction();

            // insertPayload = await gateEntryHeaderPayload(obj);
            // const gate_entry_h_Insert = await generateInsertUpdateQuery(insertPayload, GATE_ENTRY_HEADER, "C_PKEY");

            // try {
            //     const [results] = await promiseConnection.execute(gate_entry_h_Insert);
            //     console.log("results", results);
            // } catch (error) {
            //     return responseSend(res, "F", 502, "Data insert failed !!", error, null);
            // }

            // if (ITEM_TAB && ITEM_TAB?.length) {

            //     try {
            //         const zmilestonePayload = await gateEntryDataPayload(ITEM_TAB);
            //         console.log('ekpopayload', zmilestonePayload);
            //         // const insert_ekpo_table = `INSERT INTO ekpo (EBELN, EBELP, LOEKZ, STATU, AEDAT, TXZ01, MATNR, BUKRS, WERKS, LGORT, MATKL, KTMNG, MENGE, MEINS, NETPR, NETWR, MWSKZ) VALUES ?`;
            //         const insert_zpo_milestone_table = await generateQueryForMultipleData(zmilestonePayload, GATE_ENTRY_DATA, "C_PKEY");
            //         const response = await promiseConnection.execute(insert_zpo_milestone_table)


            //     } catch (error) {
            //         console.log("error, zpo milestone", error);
            //     }
            // }

            const comm = await promiseConnection.commit(); // Commit the transaction if everything was successful
            transactionSuccessful = true;

        } catch (error) {
            responseSend(res, "F", 502, "Data insert failed !!", error, null);
        }
        finally {
            if (!transactionSuccessful) {
                console.log("Connection End" + "--->" + "connection release");
                await promiseConnection.rollback();
            }
            if (transactionSuccessful === TRUE) {
                responseSend(res, "S", 200, "data insert succeed with", [], null)
            }
            const connEnd = await promiseConnection.end();
            console.log("Connection End" + "--->" + "connection releasettttttttttt");
        }
    } catch (error) {
        responseSend(res, "F", 400, "Error in database conn!!", error, null);
    }
};


const storeActionList = async (req, res) => {
    try {
        const promiseConnection = await connection();
        let transactionSuccessful = false;
        try {

            const query =
                `(SELECT docno,
                NULL           AS btn,
                NULL           AS issueNo,
                NULL           AS issueYear,
                NULL           AS reservationNumber,
                NULL           AS reservationDate,
                updatedBy,
                dateTime,
                'icgrn_report' AS documentType
         FROM   (SELECT DISTINCT mblnr      AS docNo,
                                 ersteldat  AS dateTime,
                                 USER.cname AS updatedBy
                 FROM   qals AS q
                        LEFT JOIN pa0002 AS USER
                               ON ( q.aenderer = USER.pernr )) AS qals)
        UNION ALL
        (SELECT NULL              AS docNo,
                btn,
                NULL              AS issueNo,
                NULL              AS issueYear,
                NULL              AS reservationNumber,
                NULL              AS reservationDate,
                updatedBy,
                dateTime,
                'ztfi_bil_deface' AS documentType
         FROM   (SELECT DISTINCT zregnum    AS btn,
                                 zcreatedon AS dateTime,
                                 USER.cname AS updatedBy
                 FROM   ztfi_bil_deface AS zb
                        LEFT JOIN pa0002 AS USER
                               ON ( zb.zcreatedby = USER.pernr )) AS ztfi_bil_deface)
        UNION ALL
        (SELECT NULL               AS docNo,
                NULL               AS btn,
                issueno,
                issueyear,
                NULL               AS reservationNumber,
                NULL               AS reservationDate,
                updatedBy,
                dateTime,
                'goods_issue_slip' AS documentType
         FROM   (SELECT mblnr      AS issueNo,
                        mjahr      AS issueYear,
                        USER.cname AS updatedBy,
                        budat_mkpf AS dateTime
                 FROM   mseg AS ms
                        LEFT JOIN pa0002 AS USER
                               ON ( ms.usnam_mkpf = USER.pernr )
                 GROUP  BY ms.mblnr,
                           ms.mjahr) AS mseg)
        UNION ALL
        SELECT NULL                 AS docNo,
               NULL                 AS btn,
               NULL                 AS issueNo,
               NULL                 AS issueYear,
               reservationnumber,
               reservationdate,
               updatedBy,
               dateTime,
               'reservation_report' AS documentType
        FROM   (SELECT rsnum      AS reservationNumber,
                       rsdat      AS reservationDate,
                       rsdat      AS dateTime,
                       USER.cname AS updatedBy
                FROM   rkpf AS rk
                       LEFT JOIN pa0002 AS USER
                              ON ( rk.usnam = USER.pernr )
                GROUP  BY rk.rsnum,
                          rk.rsdat) AS rkpf; 

            `
            const [results] = await promiseConnection.execute(query);

            console.log(query, results);

            transactionSuccessful = true;

            if (transactionSuccessful === TRUE && results) {
                resSend(res, true, 200, "data fetch success", results, null)
            } else {
                responseSend(res, false, 200, "no data found", [], null);
            }

        } catch (error) {
            responseSend(res, "0", 502, "data fetch failed !!", error, null);
        }
        finally {
            const connEnd = await promiseConnection.end();
            console.log("Connection End" + "--->" + "connection release");
        }
    } catch (error) {
        responseSend(res, "F", 400, "Error in database conn!!", error, null);
    }
};
const gateEntryReport = async (req, res) => {
    try {
        const promiseConnection = await connection();
        let transactionSuccessful = false;
        try {

            const query = `
            SELECT * FROM zmm_gate_entry_h AS ge_header 
            LEFT JOIN zmm_gate_entry_d as ge_line_items
            ON( ge_header.ENTRY_NO = ge_line_items.ENTRY_NO) WHERE 1 = 1`;


            const [results] = await promiseConnection.execute(query);

            console.log(query, results);

            transactionSuccessful = true;

            if (transactionSuccessful === TRUE && results) {
                resSend(res, true, 200, "data fetch success", results, null)
            } else {
                responseSend(res, false, 200, "no data found", [], null);
            }

        } catch (error) {
            responseSend(res, "0", 502, "data fetch failed !!", error, null);
        }
        finally {
            const connEnd = await promiseConnection.end();
            console.log("Connection End" + "--->" + "connection release");
        }
    } catch (error) {
        responseSend(res, "F", 400, "Error in database conn!!", error, null);
    }
};




module.exports = { insertGateEntryData, storeActionList, gateEntryReport };
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