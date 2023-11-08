// const { query,  } = require("../config/dbConfig");
const { INSERT } = require("../lib/constant");
const { responseSend } = require("../lib/resSend");
const { EKKO, EKPO, ZPO_MILESTONE } = require("../lib/tableName");
const { generateQuery } = require("../lib/utils");
const mysql = require("mysql2/promise");
require("dotenv").config();


const insertPOData = async (req, res) => {

    try {
        const connObj = {
            host: process.env.DB_HOST_ADDRESS,
            port: process.env.DB_CONN_PORT,
            user: process.env.DB_USER,
            password: "",
            database: process.env.DB_NAME,
        }

        const promiseConnection = await mysql.createConnection(connObj);
        let transactionSuccessful = false;

        try {

            const { ekpo, zpo_milestone, ...obj } = req.body;

            if (!obj || typeof obj !== 'object' || !Object.keys(obj).length) {
                return responseSend(res, "0", 400, "INVALID PAYLOAD", null, null);
            }

            await promiseConnection.beginTransaction();

            const insertPayload = {
                EBELN: obj.EBELN,
                BUKRS: obj.BUKRS ? obj.BUKRS : null,
                BSTYP: obj.BSTYP ? obj.BSTYP : null,
                BSART: obj.BSART ? obj.BSART : null,
                LOEKZ: obj.LOEKZ ? obj.LOEKZ : null,
                AEDAT: obj.AEDAT ? obj.AEDAT : null,
                ERNAM: obj.ERNAM ? obj.ERNAM : null,
                LIFNR: obj.LIFNR ? obj.LIFNR : null,
                EKORG: obj.EKORG ? obj.EKORG : null,
                EKGRP: obj.EKGRP ? obj.EKGRP : null,
            };

            const ekkoTableInsert = generateQuery(INSERT, EKKO, insertPayload);

            // const [insertResult] = await promiseConnection.execute(ekkoTableInsert["q"], ekkoTableInsert["val"]);

            try {
                const [results] = await promiseConnection.execute(ekkoTableInsert["q"], ekkoTableInsert["val"]);
            } catch (error) {
                return responseSend(res, "0", 502, "Data insert failed !!", error, null);
            }


            const insertPromiseFn = [];

            if (zpo_milestone?.length) {
                const insert_zpo_milestone_table = `INSERT INTO zpo_milestone (EBELN, MID, MTEXT, PLAN_DATE, MO) VALUES ?`;
                const zpo_milestone_table_val = zpo_milestoneTableData(zpo_milestone)
                insertPromiseFn.push(promiseConnection.query(insert_zpo_milestone_table, [zpo_milestone_table_val]))

                //  const f = await promiseConnection.execute(insert_zpo_milestone_table, [zpo_milestone_table_val]);
                // const [results] = await promiseConnection.query(insert_zpo_milestone_table, [zpo_milestone_table_val]);
                // try {
                //     const [results] = await promiseConnection.query(insert_zpo_milestone_table, [zpo_milestone_table_val]);
                //     console.log("results", results);
                // } catch (error) {
                //     throw new Error('Failed to insert data into zpo_milestone table.');
                // }
            }

            if (ekpo?.length) {
                const insert_ekpo_table = `INSERT INTO ekpo (EBELN, EBELP, LOEKZ, STATU, AEDAT, TXZ01, MATNR, BUKRS, WERKS, LGORT, MATKL, KTMNG, MENGE, MEINS, NETPR, NETWR, MWSKZ) VALUES ?`;
                const ekpo_table_val = ekpoTableData(ekpo);
                insertPromiseFn.push(promiseConnection.query(insert_ekpo_table, [ekpo_table_val]))

                // const [results] = await promiseConnection.query(insert_ekpo_table, [ekpo_table_val]);
                //  const f = await promiseConnection.execute(insert_ekpo_table, [insert_ekpo_table]);
                // try {
                //     const [results] = await promiseConnection.query(insert_ekpo_table, [ekpo_table_val]);
                //     console.log("results", results);
                // } catch (error) {
                //     throw new Error('Failed to insert data into ekpo table.');
                // }
            }

            await Promise.all(insertPromiseFn);
            await promiseConnection.commit(); // Commit the transaction if everything was successful
            transactionSuccessful = true;

            responseSend(res, "1", 200, "data insert succeed", [], null);
        } catch (error) {
            responseSend(res, "0", 502, "Data insert failed !!", error, null);
        }
        finally {
            if (!transactionSuccessful) {
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
        obj.AEDAT ? obj.AEDAT : null,
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
        obj.PLAN_DATE ? obj.PLAN_DATE : null,
        obj.MO ? obj.MO : null
    ]);

}



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

