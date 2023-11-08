// const { query,  } = require("../config/dbConfig");
const { INSERT } = require("../lib/constant");
const { responseSend } = require("../lib/resSend");
const { EKKO, EKPO, ZPO_MILESTONE } = require("../lib/tableName");
const { generateQuery } = require("../lib/utils");
const mysql = require("mysql2/promise");
require("dotenv").config();


const insertPOData = async (req, res) => {


    const connObj = {
        host: process.env.DB_HOST_ADDRESS,
        port: process.env.DB_CONN_PORT,
        user: process.env.DB_USER,
        password: "",
        database: process.env.DB_NAME,
    }

    console.log("connObj", connObj);
    
    
    let transactionSuccessful = false;
    try {
        const promiseConnection = await mysql.createConnection(connObj);
        const { ekpo, zpo_milestone, ...obj } = req.body;

        console.log(ekpo, zpo_milestone,)

        if (!obj || typeof obj !== 'object' || !Object.keys(obj).length) {
            return responseSend(res, "0", 400, "INVALID PAYLOAD", null, null);
        }

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

      

        const conn = await promiseConnection.beginTransaction();

        console.log("conn", conn);


        const ekkoTableInsert = generateQuery(INSERT, EKKO, insertPayload);

        console.log("ekkoTableInsert", ekkoTableInsert);

        const result = await promiseConnection.execute(ekkoTableInsert["q"], ekkoTableInsert["val"]);
        console.log("result", result);

        if (insertResult.affectedRows !== 1) {
            throw new Error('Failed to insert data into ekko_table');
        }

        // if (ekpo?.length) {
        //     console.log("r1---------->");
        //     const r1 =  await insertDataEKPO(promiseConnection, ekpo);
        //     console.log("r1", r1);
        // }
        // if (zpo_milestone?.length) {
        //     console.log("r2-------->");
        //     const r2 =  await insertDataZPO_MILESTONE(promiseConnection, zpo_milestone);
        //     console.log("r2", r2);
        // }

        await promiseConnection.commit(); // Commit the transaction if everything was successful
        transactionSuccessful = true;

        return responseSend(res, "1", 200, "data insert succed", [], null);
        
    } 
    // catch( error) {
    //     responseSend(res, "0", 400, "Data insert failed !!", [], null);
    // } 
    finally {
        if (!transactionSuccessful) {
          // Roll back the transaction if not successful
          await promiseConnection.rollback();
          responseSend(res, "0", 400, "Data insert failed !!", [], null);
        }
        // promiseConnection.end(); // Close the database connection in the 'finally' block
      }
};



async function insertDataEKPO(connection, ekpoData) {

    for (const data of ekpoData) {

        const ekpoTableInsert = generateQuery(INSERT, EKPO, data);
        await connection.execute(ekpoTableInsert["q"], ekpoTableInsert["val"]);
    }
}
async function insertDataZPO_MILESTONE(connection, zpo_milestoneData) {

    for (const data of zpo_milestoneData) {
        const ekpoTableInsert = generateQuery(INSERT, ZPO_MILESTONE, data);
        await connection.execute(ekpoTableInsert["q"], ekpoTableInsert["val"]);

    }
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
  
  