// const { query,  } = require("../config/dbConfig");
const { connection } = require("../../config/dbConfig");
const {  TRUE } = require("../../lib/constant");
const { responseSend } = require("../../lib/resSend");
const {  GATE_ENTRY_DATA, GATE_ENTRY_HEADER } = require("../../lib/tableName");
const { gateEntryHeaderPayload, gateEntryDataPayload } = require("../../services/sap.store.services");
const { generateInsertUpdateQuery, generateQueryForMultipleData } = require("../../lib/utils");


const insertGateEntryData = async (req, res) => {
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

        console.log("payload", req.body);

        const {GE_LINE_ITEMS, ...obj } = payload;

        console.log("GE_LINE_ITEMS", GE_LINE_ITEMS);
        console.log("obj", obj);

        try {

            if (!obj || typeof obj !== 'object' || !Object.keys(obj).length || !obj.ENTRY_NO || !obj.W_YEAR  ) {
                return responseSend(res, "F", 400, "INVALID PAYLOAD", null, null);
            }

            await promiseConnection.beginTransaction();

            insertPayload = await gateEntryHeaderPayload(obj);
            const gate_entry_h_Insert = await generateInsertUpdateQuery(insertPayload, GATE_ENTRY_HEADER, "C_PKEY");

            try {
                const [results] = await promiseConnection.execute(gate_entry_h_Insert);
                console.log("results", results);
            } catch (error) {
                return responseSend(res, "F", 502, "Data insert failed !!", error, null);
            }

            if (GE_LINE_ITEMS && GE_LINE_ITEMS?.length) {

                try {
                    const zmilestonePayload = await gateEntryDataPayload(GE_LINE_ITEMS);
                    console.log('ekpopayload', zmilestonePayload);
                    // const insert_ekpo_table = `INSERT INTO ekpo (EBELN, EBELP, LOEKZ, STATU, AEDAT, TXZ01, MATNR, BUKRS, WERKS, LGORT, MATKL, KTMNG, MENGE, MEINS, NETPR, NETWR, MWSKZ) VALUES ?`;
                    const insert_zpo_milestone_table = await generateQueryForMultipleData(zmilestonePayload, GATE_ENTRY_DATA, "C_PKEY");
                    const response = await promiseConnection.execute(insert_zpo_milestone_table)

                
                } catch (error) {
                    console.log("error, zpo milestone", error);
                }
            }

            const comm = await promiseConnection.commit(); // Commit the transaction if everything was successful
            transactionSuccessful = true;

            if (transactionSuccessful === TRUE) {
                responseSend(res, "S", 200, "data insert succeed with mail trigere", [], null)
            } else {
                responseSend(res, "F", 200, "data insert succeed without mail.", [], null);
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
            console.log("Connection End" + "--->" + "connection releasettttttttttt");
        }
    } catch (error) {
        responseSend(res, "F", 400, "Error in database conn!!", error, null);
    }
};

module.exports = { insertGateEntryData };
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