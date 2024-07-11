const router = require("express").Router();
const { dynamicallyUpload } = require("../../lib/fileUpload");
const { connection } = require("../../config/dbConfig");
const { INSERT, TRUE, UPDATE } = require("../../lib/constant");
const { responseSend, resSend } = require("../../lib/resSend");
const { EKKO, EKPO, ZPO_MILESTONE } = require("../../lib/tableName");
const {
  generateQuery,
  generateQueryForMultipleData,
} = require("../../lib/utils");
const { msegPayload } = require("../../services/sap.material.services");
const Message = require("../../utils/messages");
const { poolClient, query } = require("../../config/pgDbConfig");
const { UPDATED } = require("../../lib/status");

////////////// STRAT TESTING APIS //////////////

router.post("/", [], async (req, res) => {
  let insertPayload = {};

  try {
    const promiseConnection = await connection();
    let transactionSuccessful = false;

    try {
      const obj = req.body;

      if (
        !obj ||
        typeof obj !== "object" ||
        !Object.keys(obj).length ||
        !obj?.EBELN
      ) {
        return responseSend(res, "0", 400, "INVALID PAYLOAD", null, null);
      }
      await promiseConnection.beginTransaction();

      insertPayload = {
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
      try {
        const [results] = await promiseConnection.execute(
          ekkoTableInsert["q"],
          ekkoTableInsert["val"]
        );
      } catch (error) {
        return responseSend(
          res,
          "0",
          502,
          "Data insert failed !!",
          error,
          null
        );
      }

      const comm = await promiseConnection.commit(); // Commit the transaction if everything was successful
      transactionSuccessful = true;

      if (insertPayload.LIFNR && transactionSuccessful === TRUE) {
        try {
          responseSend(
            res,
            "1",
            200,
            "data insert succeed with mail trigere",
            [],
            null
          );
        } catch (error) {
          responseSend(
            res,
            "1",
            201,
            "Data insert but mail not send !!",
            error,
            null
          );
        }
      } else {
        responseSend(
          res,
          "1",
          200,
          "data insert succeed without mail.",
          [],
          null
        );
      }
    } catch (error) {
      responseSend(res, "0", 502, "Data insert failed !!", error, null);
    } finally {
      if (!transactionSuccessful) {
        await promiseConnection.rollback();
      }
      const connEnd = await promiseConnection.end();
      console.log("Connection End" + "--->" + "connection release");
    }
  } catch (error) {
    responseSend(res, "0", 400, "Error in database conn!!", error, null);
  }
});
router.post("/table", [], async (req, res) => {
  let insertPayload = {};

  try {
    const promiseConnection = await connection();
    let transactionSuccessful = false;

    try {
      const obj = req.body;

      if (!obj) {
        return responseSend(res, "0", 400, "INVALID PAYLOAD", null, null);
      }
      await promiseConnection.beginTransaction();

      // insertPayload = {
      //     EBELN: obj.EBELN,
      //     BUKRS: obj.BUKRS ? obj.BUKRS : null,
      //     BSTYP: obj.BSTYP ? obj.BSTYP : null,
      //     BSART: obj.BSART ? obj.BSART : null,
      //     LOEKZ: obj.LOEKZ ? obj.LOEKZ : null,
      //     AEDAT: obj.AEDAT ? obj.AEDAT : null,
      //     ERNAM: obj.ERNAM ? obj.ERNAM : null,
      //     LIFNR: obj.LIFNR ? obj.LIFNR : null,
      //     EKORG: obj.EKORG ? obj.EKORG : null,
      //     EKGRP: obj.EKGRP ? obj.EKGRP : null,
      // };

      insertPayload = await msegPayload(obj);

      const ekkoTableInsert = await generateQueryForMultipleData(
        insertPayload,
        "mseg",
        "C_PKEY"
      );
      try {
        // const [results] = await promiseConnection.execute(ekkoTableInsert["q"], ekkoTableInsert["val"]);
        const [results] = await promiseConnection.query(ekkoTableInsert);
      } catch (error) {
        return responseSend(
          res,
          "0",
          502,
          "Data insert failed !!",
          error,
          null
        );
      }

      const comm = await promiseConnection.commit(); // Commit the transaction if everything was successful
      transactionSuccessful = true;

      if (insertPayload.LIFNR && transactionSuccessful === TRUE) {
        try {
          responseSend(
            res,
            "1",
            200,
            "data insert succeed with mail trigere",
            [],
            null
          );
        } catch (error) {
          responseSend(
            res,
            "1",
            201,
            "Data insert but mail not send !!",
            error,
            null
          );
        }
      } else {
        responseSend(
          res,
          "1",
          200,
          "data insert succeed without mail.",
          [],
          null
        );
      }
    } catch (error) {
      responseSend(res, "0", 502, "Data insert failed !!", error, null);
    } finally {
      if (!transactionSuccessful) {
        await promiseConnection.rollback();
      }
      const connEnd = await promiseConnection.end();
      console.log("Connection End" + "--->" + "connection release");
    }
  } catch (error) {
    responseSend(res, "0", 400, "Error in database conn!!", error, null);
  }
});

router.post("/po", [], async (req, res) => {
  try {
    const client = await poolClient();
    try {
      const obj = req.body;
      const insertPayload = {
        EBELN: obj.EBELN,
        BUKRS: obj.BUKRS ?? "",
        BSTYP: obj.BSTYP ?? "",
        BSART: obj.BSART ?? "",
        LOEKZ: obj.LOEKZ ?? "",
        AEDAT: obj.AEDAT ?? null,
        ERNAM: obj.ERNAM ?? "",
        LIFNR: obj.LIFNR ?? "",
        EKORG: obj.EKORG ?? "",
        EKGRP: obj.EKGRP ?? "",
      };

      const cond = ` EBELN = '4000234571'`;
      const { q, val } = {};

      console.log("condcondcondcondcond", cond);

      const qu = `INSERT INTO ekko 
                                (EBELN, BUKRS, BSTYP, BSART, LOEKZ, AEDAT, ERNAM, LIFNR, EKORG, EKGRP)
                            VALUES 
                                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10), 
                                ($11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
                            ON CONFLICT (EBELN)
                            DO UPDATE SET
                                BUKRS = EXCLUDED.BUKRS, 
                                BSTYP = EXCLUDED.BSTYP, 
                                LOEKZ = EXCLUDED.LOEKZ, 
                                AEDAT = EXCLUDED.AEDAT`;

      const values = [
        "4000234573",
        "5788",
        "S",
        "ABCD",
        "W",
        "20241109",
        "34567656787",
        "50000437",
        "1234",
        "123",
        "4000234574",
        "5789",
        "S",
        "EFGH",
        "X",
        "20241101",
        "34567656788",
        "50000438",
        "1235",
        "124",
      ];

      // const d = generateQuery(INSERT, 'ekko', insertPayload, cond);
      // console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU", d);

      // const response = await client.query(d.q, d.val);
      // const response = await query({ query: d.q, values: d.val });
      try {
        await query({ query: qu, values: values });
      } catch (error) {
        console.log(error);
      }
      console.log("response", "response");

      resSend(res, true, 200, Message.USER_AUTHENTICATION_SUCCESS, "response");
    } catch (error) {
      resSend(res, false, 500, Message.SERVER_ERROR, error);
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, false, 500, Message.DB_CONN_ERROR, JSON.stringify(error));
  }
});

////////////// END OF TEST API //////////////
module.exports = router;
