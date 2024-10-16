// const { query,  } = require("../config/dbConfig");
// const { query, connection } = require("../config/dbConfig");
const { INSERT, TRUE } = require("../lib/constant");
const { responseSend } = require("../lib/resSend");
const { EKKO } = require("../lib/tableName");
const {
  generateQuery,
  formatDate,
  generateInsertUpdateQuery,
  generateQueryForMultipleData,
} = require("../lib/utils");
// const mysql = require("mysql2/promise");
// const { mailTrigger } = require("./sendMailController");
const { PO_UPLOAD_IN_LAN_NIC, PO_UPLOAD_IN_LAN } = require("../lib/event");
const {
  ekpoTablePayload,
  zpo_milestonePayload,
  archivePoHeaderPayload,
  archivePoLineItemsPayload,
} = require("../services/sap.po.services");
const { poolClient, getQuery } = require("../config/pgDbConfig");
const { getUserDetailsQuery } = require("../utils/mailFunc");
// const { query } = require("../config/dbConfig");
const { sendMail } = require("../services/mail.services");

// require("dotenv").config();

const insertPOData = async (req, res) => {
  let insertPayload = {};
  let payload = {};

  try {
    const client = await poolClient();
    let transactionSuccessful = false;
    if (Array.isArray(req.body)) {
      payload = req.body.length > 0 ? req.body[0] : null;
    } else if (typeof req.body === "object" && req.body !== null) {
      payload = req.body;
    }

    const { EKPO, ZPO_MILESTONE, ...obj } = payload;

    try {
      if (
        !obj ||
        typeof obj !== "object" ||
        !Object.keys(obj).length ||
        !obj.EBELN
      ) {
        return responseSend(res, "F", 400, "INVALID PAYLOAD", null, null);
      }

      await client.query("BEGIN");

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
      const ekkoTableInsert = await generateInsertUpdateQuery(
        insertPayload,
        EKKO,
        ["EBELN"]
      );
      try {
        await client.query(ekkoTableInsert.q, ekkoTableInsert.val);
      } catch (error) {
        return responseSend(
          res,
          "F",
          502,
          "Data insert failed !!",
          error,
          null
        );
      }

      try {
        const delete_from_zpo_milestoen = `DELETE FROM zpo_milestone  WHERE  ebeln = $1`;
        const results = await client.query(delete_from_zpo_milestoen, [
          obj.EBELN,
        ]);
      } catch (error) {
        console.error(error.message);
      }

      const insertPromiseFn = [];

      if (ZPO_MILESTONE?.length) {
        try {
          const zmilestonePayload = await zpo_milestonePayload(ZPO_MILESTONE);
          const insert_zpo_milestone_table = await generateQueryForMultipleData(
            zmilestonePayload,
            "zpo_milestone",
            ["EBELN", "MID"]
          );
          insertPromiseFn.push(
            client.query(
              insert_zpo_milestone_table.q,
              insert_zpo_milestone_table.val
            )
          );
        } catch (error) {
          console.error(error.message);
        }
      }

      if (EKPO?.length) {
        try {
          const ekpopayload = await ekpoTablePayload(EKPO, obj.EBELN);
          const insert_ekpo_table = await generateQueryForMultipleData(
            ekpopayload,
            "ekpo",
            ["EBELN", "EBELP"]
          );
          insertPromiseFn.push(
            client.query(insert_ekpo_table.q, insert_ekpo_table.val)
          );
        } catch (error) {
          console.error(error.message);
        }
      }
      if (insertPromiseFn.length) {
        const insert = await Promise.all(insertPromiseFn);
      }

      await client.query("COMMIT");

      transactionSuccessful = true;

      if (insertPayload.LIFNR && transactionSuccessful === TRUE) {
        try {
          handelMail(insertPayload);
          responseSend(
            res,
            "S",
            200,
            "data insert succeed with mail trigere",
            [],
            null
          );
        } catch (error) {
          responseSend(
            res,
            "F",
            201,
            "Data insert but mail not send !!",
            error.toString(),
            null
          );
        }
      } else {
        responseSend(
          res,
          "S",
          200,
          "data insert succeed without mail.",
          [],
          null
        );
      }
    } catch (error) {
      responseSend(res, "F", 502, "Data insert failed !!", error, null);
    } finally {
      if (!transactionSuccessful) {
        await client.query("ROLLBACK");
      }
      const connEnd = client.release();
    }
  } catch (error) {
    responseSend(res, "F", 400, "Error in database conn!!", error, null);
  }
};

// async function sendMail(data) {
//     const q =
//         `SELECT v_add.smtp_addr AS vendor_email,
//     v.name1         AS vendor_name
//     FROM   adr6 AS v_add
//     LEFT JOIN lfa1 AS v
//     ON v.lifnr = v_add.persnumber
//     WHERE  v_add.persnumber = ? ;`;
//     const result = await query({ query: q, values: [data.LIFNR] });
//     // const result = [
//     //     {
//     //       vendor_email: 'mainak.dutta@datacoresystems.co.in',
//     //       vendor_name: 'PriceWaterhouseCoopers Pvt Ltd'
//     //     }
//     //   ];
//     console.log(result);
//     console.log(data);
//     //console.log(res);
//     if (result.length) {
//         console.log(result.length);
//         const payload = {
//             purchasing_doc_no: data.EBELN,
//             vendor_name: result[0].vendor_name,
//             upload_date: data.AEDAT,
//             vendor_email: result[0].vendor_email
//         }
//         console.log(payload);

//         await mailTrigger(payload, PO_UPLOAD_IN_LAN_NIC);
//     }

// }

async function handelMail(data) {
  try {
    let vendorAndDoDetails = getUserDetailsQuery("vendor_and_do", "$1");
    const mail_details = await getQuery({
      query: vendorAndDoDetails,
      values: [data.EBELN],
    });
    const dataObj = {
      ...data,
      purchasing_doc_no: data.EBELN,
      vendor_name: mail_details[0]?.u_name,
      do_name: mail_details[1]?.u_name,
      upload_date: new Date().toDateString(),
    };
    await sendMail(
      PO_UPLOAD_IN_LAN,
      dataObj,
      { users: mail_details },
      PO_UPLOAD_IN_LAN
    );
  } catch (error) {
    console.error(error.message);
  }
}

const archivePo = async (req, res) => {
  let insertPayload = {};
  let payload = {};

  try {
    // const promiseConnection = await connection();
    const client = await poolClient();
    let transactionSuccessful = false;
    if (Array.isArray(req.body)) {
      payload = req.body.length > 0 ? req.body[0] : null;
    } else if (typeof req.body === "object" && req.body !== null) {
      payload = req.body;
    }

    const cdhdr_table_data = payload.CDHDR_HEADER || payload.cdhdr_header;
    const cdpos_table_data = payload.CDPOS_LINE_ITEM || payload.cdpos_line_item;

    try {
      // await promiseConnection.beginTransaction();
      await client.query("BEGIN");

      if (cdhdr_table_data?.length) {
        try {
          insertPayload = await archivePoHeaderPayload(cdhdr_table_data);
          const cdhdrTableInsert = await generateQueryForMultipleData(
            insertPayload,
            "cdhdr",
            ["OBJECTCLAS"]
          );
          // const [results] = await promiseConnection.execute(cdhdrTableInsert);
          const [results] = await client.query(
            cdhdrTableInsert.q,
            cdhdrTableInsert.val
          );
        } catch (error) {
          console.error(error.message);
          return responseSend(
            res,
            false,
            502,
            "Data insert failed !!",
            error,
            null
          );
        }
      }

      if (cdpos_table_data?.length) {
        try {
          const cdposTablePayload = await archivePoLineItemsPayload(
            cdpos_table_data
          );
          const insert_cdpos_table = await generateQueryForMultipleData(
            cdposTablePayload,
            "cdpos",
            ["OBJECTCLAS", "OBJECTID", "CHANGENR", "TABNAME", "TABKEY"]
          );
          // const [results] = await promiseConnection.execute(insert_cdpos_table);
          const [results] = await client.query(
            insert_cdpos_table.q,
            insert_cdpos_table.val
          );
        } catch (error) {
          console.error(error.message);
        }
      }

      // const comm = await client.commit(); // Commit the transaction if everything was successful
      await client.query("COMMIT");
      transactionSuccessful = true;
      if (transactionSuccessful === TRUE) {
        responseSend(
          res,
          "S",
          200,
          "data insert succeed with mail trigere",
          [],
          null
        );
      }
    } catch (error) {
      responseSend(res, "F", 502, "Data insert failed !!", error, null);
    } finally {
      if (!transactionSuccessful) {
        // await promiseConnection.rollback();
        await client.query("ROLLBACK");
      }
      // const connEnd = await promiseConnection.end();
      const connEnd = client.release();
    }
  } catch (error) {
    responseSend(res, "F", 400, "Error in database conn!!", error, null);
  }
};

module.exports = { insertPOData, archivePo };
