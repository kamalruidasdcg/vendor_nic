const { NEW_SDBG, MAKT, MARA, MSEG, MKPF } = require("../../lib/tableName");
// const { connection } = require("../../config/dbConfig");
const { responseSend, resSend } = require("../../lib/resSend");
const {
  generateQueryForMultipleData,
  generateInsertUpdateQuery,
} = require("../../lib/utils");
const { getFilteredData } = require("../genralControlles");
const {
  msegPayload,
  makfPayload,
} = require("../../services/sap.material.services");
const { poolQuery, poolClient, getQuery } = require("../../config/pgDbConfig");
const Message = require("../../utils/messages");
const { getUserDetailsQuery } = require("../../utils/mailFunc");
const { sendMail } = require("../../services/mail.services");
const { GRN_DOC_GENERATE_LAN } = require("../../lib/event");
const { isPresentInObps } = require("../../services/sap.services");

const makt = async (req, res) => {
  try {
    let insertPayload = {};
    const client = await poolClient();
    let transactionSuccessful = false;
    try {
      let payload;
      if (req.body && Array.isArray(req.body)) {
        payload = req.body.length > 0 ? req.body[0] : null;
      } else if (req.body && typeof req.body === "object") {
        payload = req.body;
      }

      if (
        !payload ||
        typeof payload !== "object" ||
        !Object.keys(payload)?.length ||
        !payload.MATNR
      ) {
        return responseSend(res, "F", 400, Message.INVALID_PAYLOAD, null, null);
      }

      // await client.beginTransaction();
      await client.query("BEGIN");

      insertPayload = {
        MATNR: payload.MATNR,
        SPRAS: payload.SPRAS || null,
        MAKTX: payload.MAKTX || null,
        MAKTG: payload.MAKTG || null,
      };

      const ekkoTableInsert = await generateInsertUpdateQuery(
        insertPayload,
        MAKT,
        ["MATNR"]
      );

      try {
        const results = await poolQuery({
          client,
          query: ekkoTableInsert.q,
          values: ekkoTableInsert.val,
        });
      } catch (error) {
        return responseSend(
          res,
          "F",
          502,
          Message.DATA_INSERT_FAILED,
          error.toString(),
          null
        );
      }
      try {
        const maraTablePayload = {
          MTART: payload.MTART,
          MATNR: payload.MATNR,
        };
        const maraTableInsert = await generateInsertUpdateQuery(
          maraTablePayload,
          MARA,
          ["MATNR"]
        );

        const results = await poolQuery({
          client,
          query: maraTableInsert.q,
          values: maraTableInsert.val,
        });
      } catch (error) {
        return responseSend(
          res,
          "F",
          400,
          Message.DATA_INSERT_FAILED,
          error,
          null
        );
      }

      // await client.commit(); // Commit the transaction if everything was successful

      await client.query("COMMIT");

      transactionSuccessful = true;

      responseSend(res, "S", 200, Message.DATA_SEND_SUCCESSFULL, [], null);
    } catch (error) {
      responseSend(res, "F", 502, Message.DATA_INSERT_FAILED, error, null);
    } finally {
      if (!transactionSuccessful) {
        await client.query("ROLLBACK");
      }
      client.release();
    }
  } catch (error) {
    responseSend(res, "F", 500, Message.DB_CONN_ERROR, error, null);
  }
};

const mseg = async (req, res) => {
  try {
    const client = await poolClient();
    try {
      if (!req.body) {
        responseSend(res, "F", 400, Message.INVALID_PAYLOAD, req.body, null);
      }
      const payload = req.body;
      const payloadObj = await msegPayload(payload);

      // CHECKING THE PO/DATA IS NOT PART OF OBPS PROJECT
      // const isPresent = await isPresentInObps(client, `ebeln = '${payloadObj[0]?.EBELN}'`).count();
      // if (!isPresent) {
      //   return responseSend(res, "S", 200, Message.NON_OBPS_DATA, 'NON OBPS PO/data.', null);
      // }

      const ekkoTableInsert = await generateQueryForMultipleData(
        payloadObj,
        "mseg",
        ["MBLNR", "MJAHR", "ZEILE"]
      );
      const response = await poolQuery({
        client,
        query: ekkoTableInsert.q,
        values: ekkoTableInsert.val,
      });
      responseSend(
        res,
        "S",
        200,
        "Data inserted successfully !!",
        response,
        null
      );
      handelMail(payloadObj[0]);
    } catch (err) {
      responseSend(
        res,
        "F",
        400,
        Message.DATA_INSERT_FAILED,
        err.toString(),
        null
      );
    } finally {
      client.release();
    }
  } catch (error) {
    responseSend(res, "F", 500, Message.DB_CONN_ERROR, error.toString(), null);
  }
};

async function handelMail(data) {
  try {
    let vendorAndDoDetails = getUserDetailsQuery("vendor", "$1");
    const mail_details = await getQuery({
      query: vendorAndDoDetails,
      values: [data.LIFNR],
    });
    console.log("mail_details", mail_details);
    const dataObj = { ...data, vendor_name: mail_details[0]?.u_name };

    console.log("dataObj", dataObj, mail_details);
    await sendMail(
      GRN_DOC_GENERATE_LAN,
      dataObj,
      { users: mail_details },
      GRN_DOC_GENERATE_LAN
    );
  } catch (error) {
    console.log("handelMail", error.toString(), error.stack);
  }
}

const mkpf = async (req, res) => {
  try {
    const client = await poolClient();
    try {
      if (!req.body) {
        responseSend(res, "F", 400, Message.INVALID_PAYLOAD, null, null);
      }
      // const payload = req.body;

      let payload = [];
      if (req.body && Array.isArray(req.body)) {
        payload = req.body;
      } else if (payload && typeof req.body === "object") {
        payload.push(req.body);
      }
      const payloadObj = await makfPayload(payload);
      console.log("payloadObj mkpf", payloadObj);

       // CHECKING THE PO/DATA IS NOT PART OF OBPS PROJECT
      //  const isPresent = await isPresentInObps(client, `mblnr = '${payloadObj.MKPF}'`, MKPF).count();
      //  if (!isPresent) {
      //    return responseSend(res, "S", 200, Message.NON_OBPS_DATA, 'NON OBPS PO/data.', null);
      //  }

      const mkpfInsertQuery = await generateQueryForMultipleData(
        payloadObj,
        MKPF,
        ["MBLNR", "MJAHR"]
      );

      const response = await poolQuery({
        client,
        query: mkpfInsertQuery.q,
        values: mkpfInsertQuery.val,
      });
      responseSend(
        res,
        "S",
        200,
        Message.DATA_SEND_SUCCESSFULL,
        response,
        null
      );
    } catch (error) {
      responseSend(res, "F", 502, Message.SERVER_ERROR, error.toString(), null);
    } finally {
      client.release();
    }
  } catch (error) {
    responseSend(res, "F", 500, Message.DB_CONN_ERROR, error.toString(), null);
  }
};

const list = async (req, res) => {
  req.query.$tableName = NEW_SDBG;

  try {
    getFilteredData(req, res);
  } catch (err) {
    console.log("data not fetched", err);
    resSend(res, false, 500, "Internal server error", null, null);
  }
};

module.exports = { list, makt, mseg, mkpf };
