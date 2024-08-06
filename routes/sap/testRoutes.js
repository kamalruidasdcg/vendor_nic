const router = require("express").Router();
const { generateInsertUpdateQuery } = require("../../lib/utils");

const { query, poolClient, poolQuery } = require("../../config/pgDbConfig");
const fs = require("fs");
const csv = require('csv-parser');
const path = require("path");
const { resSend } = require("../../lib/resSend");



////////////// STRAT TESTING APIS //////////////

// router.post("/", [], async (req, res) => {
//   let insertPayload = {};

//   try {
//     const promiseConnection = await connection();
//     let transactionSuccessful = false;

//     try {
//       const obj = req.body;

//       if (
//         !obj ||
//         typeof obj !== "object" ||
//         !Object.keys(obj).length ||
//         !obj?.EBELN
//       ) {
//         return responseSend(res, "0", 400, "INVALID PAYLOAD", null, null);
//       }
//       await promiseConnection.beginTransaction();

//       insertPayload = {
//         EBELN: obj.EBELN,
//         BUKRS: obj.BUKRS ? obj.BUKRS : null,
//         BSTYP: obj.BSTYP ? obj.BSTYP : null,
//         BSART: obj.BSART ? obj.BSART : null,
//         LOEKZ: obj.LOEKZ ? obj.LOEKZ : null,
//         AEDAT: obj.AEDAT ? obj.AEDAT : null,
//         ERNAM: obj.ERNAM ? obj.ERNAM : null,
//         LIFNR: obj.LIFNR ? obj.LIFNR : null,
//         EKORG: obj.EKORG ? obj.EKORG : null,
//         EKGRP: obj.EKGRP ? obj.EKGRP : null,
//       };
//       const ekkoTableInsert = generateQuery(INSERT, EKKO, insertPayload);
//       try {
//         const [results] = await promiseConnection.execute(
//           ekkoTableInsert["q"],
//           ekkoTableInsert["val"]
//         );
//       } catch (error) {
//         return responseSend(
//           res,
//           "0",
//           502,
//           "Data insert failed !!",
//           error,
//           null
//         );
//       }

//       const comm = await promiseConnection.commit(); // Commit the transaction if everything was successful
//       transactionSuccessful = true;

//       if (insertPayload.LIFNR && transactionSuccessful === TRUE) {
//         try {
//           responseSend(
//             res,
//             "1",
//             200,
//             "data insert succeed with mail trigere",
//             [],
//             null
//           );
//         } catch (error) {
//           responseSend(
//             res,
//             "1",
//             201,
//             "Data insert but mail not send !!",
//             error,
//             null
//           );
//         }
//       } else {
//         responseSend(
//           res,
//           "1",
//           200,
//           "data insert succeed without mail.",
//           [],
//           null
//         );
//       }
//     } catch (error) {
//       responseSend(res, "0", 502, "Data insert failed !!", error, null);
//     } finally {
//       if (!transactionSuccessful) {
//         await promiseConnection.rollback();
//       }
//       const connEnd = await promiseConnection.end();
//       console.log("Connection End" + "--->" + "connection release");
//     }
//   } catch (error) {
//     responseSend(res, "0", 400, "Error in database conn!!", error, null);
//   }
// });
// router.post("/table", [], async (req, res) => {
//   let insertPayload = {};

//   try {
//     const promiseConnection = await connection();
//     let transactionSuccessful = false;

//     try {
//       const obj = req.body;

//       if (!obj) {
//         return responseSend(res, "0", 400, "INVALID PAYLOAD", null, null);
//       }
//       await promiseConnection.beginTransaction();

//       // insertPayload = {
//       //     EBELN: obj.EBELN,
//       //     BUKRS: obj.BUKRS ? obj.BUKRS : null,
//       //     BSTYP: obj.BSTYP ? obj.BSTYP : null,
//       //     BSART: obj.BSART ? obj.BSART : null,
//       //     LOEKZ: obj.LOEKZ ? obj.LOEKZ : null,
//       //     AEDAT: obj.AEDAT ? obj.AEDAT : null,
//       //     ERNAM: obj.ERNAM ? obj.ERNAM : null,
//       //     LIFNR: obj.LIFNR ? obj.LIFNR : null,
//       //     EKORG: obj.EKORG ? obj.EKORG : null,
//       //     EKGRP: obj.EKGRP ? obj.EKGRP : null,
//       // };

//       insertPayload = await msegPayload(obj);

//       const ekkoTableInsert = await generateQueryForMultipleData(
//         insertPayload,
//         "mseg",
//         "C_PKEY"
//       );
//       try {
//         // const [results] = await promiseConnection.execute(ekkoTableInsert["q"], ekkoTableInsert["val"]);
//         const [results] = await promiseConnection.query(ekkoTableInsert);
//       } catch (error) {
//         return responseSend(
//           res,
//           "0",
//           502,
//           "Data insert failed !!",
//           error,
//           null
//         );
//       }

//       const comm = await promiseConnection.commit(); // Commit the transaction if everything was successful
//       transactionSuccessful = true;

//       if (insertPayload.LIFNR && transactionSuccessful === TRUE) {
//         try {
//           responseSend(
//             res,
//             "1",
//             200,
//             "data insert succeed with mail trigere",
//             [],
//             null
//           );
//         } catch (error) {
//           responseSend(
//             res,
//             "1",
//             201,
//             "Data insert but mail not send !!",
//             error,
//             null
//           );
//         }
//       } else {
//         responseSend(
//           res,
//           "1",
//           200,
//           "data insert succeed without mail.",
//           [],
//           null
//         );
//       }
//     } catch (error) {
//       responseSend(res, "0", 502, "Data insert failed !!", error, null);
//     } finally {
//       if (!transactionSuccessful) {
//         await promiseConnection.rollback();
//       }
//       const connEnd = await promiseConnection.end();
//       console.log("Connection End" + "--->" + "connection release");
//     }
//   } catch (error) {
//     responseSend(res, "0", 400, "Error in database conn!!", error, null);
//   }
// });

// router.post("/po", [], async (req, res) => {
//   try {
//     const client = await poolClient();
//     try {
//       const obj = req.body;
//       const insertPayload = {
//         EBELN: obj.EBELN,
//         BUKRS: obj.BUKRS ?? "",
//         BSTYP: obj.BSTYP ?? "",
//         BSART: obj.BSART ?? "",
//         LOEKZ: obj.LOEKZ ?? "",
//         AEDAT: obj.AEDAT ?? null,
//         ERNAM: obj.ERNAM ?? "",
//         LIFNR: obj.LIFNR ?? "",
//         EKORG: obj.EKORG ?? "",
//         EKGRP: obj.EKGRP ?? "",
//       };

//       const cond = ` EBELN = '4000234571'`;
//       const { q, val } = {};

//       console.log("condcondcondcondcond", cond);

//       const qu = `INSERT INTO ekko 
//                                 (EBELN, BUKRS, BSTYP, BSART, LOEKZ, AEDAT, ERNAM, LIFNR, EKORG, EKGRP)
//                             VALUES 
//                                 ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10), 
//                                 ($11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
//                             ON CONFLICT (EBELN)
//                             DO UPDATE SET
//                                 BUKRS = EXCLUDED.BUKRS, 
//                                 BSTYP = EXCLUDED.BSTYP, 
//                                 LOEKZ = EXCLUDED.LOEKZ, 
//                                 AEDAT = EXCLUDED.AEDAT`;

//       const values = [
//         "4000234573",
//         "5788",
//         "S",
//         "ABCD",
//         "W",
//         "20241109",
//         "34567656787",
//         "50000437",
//         "1234",
//         "123",
//         "4000234574",
//         "5789",
//         "S",
//         "EFGH",
//         "X",
//         "20241101",
//         "34567656788",
//         "50000438",
//         "1235",
//         "124",
//       ];

//       // const d = generateQuery(INSERT, 'ekko', insertPayload, cond);
//       // console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU", d);

//       // const response = await client.query(d.q, d.val);
//       // const response = await query({ query: d.q, values: d.val });
//       try {
//         await query({ query: qu, values: values });
//       } catch (error) {
//         console.log(error);
//       }
//       console.log("response", "response");

//       resSend(res, true, 200, Message.USER_AUTHENTICATION_SUCCESS, "response");
//     } catch (error) {
//       resSend(res, false, 500, Message.SERVER_ERROR, error);
//     } finally {
//       client.release();
//     }
//   } catch (error) {
//     resSend(res, false, 500, Message.DB_CONN_ERROR, JSON.stringify(error));
//   }
// });



router.post("/datainsert", async (req, res) => {

  // const q = `INSERT INTO pa0002 (PERNR, CNAME, EMAIL, PHONE, PERSG) VALUES ( $1, $2, $3, $4, $5 ) ON CONFLICT ( PERNR ) DO UPDATE SET  CNAME = EXCLUDED.CNAME, EMAIL = EXCLUDED.EMAIL, PHONE = EXCLUDED.PHONE, PERSG = EXCLUDED.PERSG`;
  // const val = ['6300', 'SHAYAMA PADA GHOSH', '', '', 'ZS']
  const paylaod = req.body;
  let result = [];
  // try {
  //   // await query({ query: q, values: val });
  //   // await insertData([], 'pa0002', ["PERNR"]);
  //   result = await insertData([], paylaod.tableName, paylaod.pk);
  //   return resSend(res, true, 200, "success", result, "")
  // } catch (error) {
  //   return resSend(res, false, 500, "success", error.message, "")
  // }



  const dataBuffer = [];
  const batchSize = 1000;// Adjust batch size as needed
  // paylaod = req.body;
  // let result = [];
  const { fileName } = paylaod;
  const filePath = path.join(__dirname, "..", "..", "uploads", "xls", fileName)
  console.log("filePath", filePath);

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', async (row) => {
      dataBuffer.push(row);
      if (dataBuffer.length >= batchSize) {
        // try {
        //   const res1 = await insertData(dataBuffer, paylaod.tableName, paylaod.pk);
        //   result = [...result, ...res1];

        // } catch (error) {
        //   console.log();
        // }
      }
    }).on('end', async () => {
      if (dataBuffer.length > 0) {
        const res2 = await insertData(dataBuffer, paylaod.tableName, paylaod.pk);
        result = [...result, ...res2];
      }
      // res.status(200).send({ status: true, data: result, message: "Data inserted successfull" });
      resSend(res, true, 201, "Data inserted successfull", result);
    }).on('error', (error) => {
      console.error('Error reading CSV file', error.message);
      resSend(res, false, 400, error.message, error.message);
      // res.status(400).send({ status: false, data: result, message: error });
    });

})



async function insertData(data, tableName, pk) {
  // console.log("dataBuffer", JSON.stringify(data));
  try {
    const client = await poolClient();
    const failedData = [];
    try {
      let insertQuery = {};

      for (let row of data) {
        try {
          insertQuery = await generateInsertUpdateQuery(row, tableName, pk);
          console.log("insertQuery", insertQuery);
          await poolQuery({ client, query: insertQuery.q, values: insertQuery.val });
          // await query({ query: insertQuery.q, values: insertQuery.val })
          console.log("success");
        } catch (error) {
          failedData.push({ ...row, error: error.message })
        }
      }
    } catch (err) {

      console.log("errerrerrerrerrerrerr", err.message);
      throw err;
    } finally {
      client.release();

      console.log("failedData", JSON.stringify(failedData));
      return failedData;
    }

  } catch (error) {
    console.log("error.mess", error.message);
    throw error;
  }
}


////////////// END OF TEST API //////////////
module.exports = router;
