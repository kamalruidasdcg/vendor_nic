const {
  RESERVATION_RKPF_TABLE,
  RESERVATION_RESB_TABLE,
  SERVICE_ENTRY_TABLE_SAP,
} = require("../../lib/tableName");
// const { connection, query } = require("../../config/dbConfig");
const { responseSend, resSend } = require("../../lib/resSend");
const {
  generateInsertUpdateQuery,
  generateQueryForMultipleData,
} = require("../../lib/utils");
const {
  reservationLineItemPayload,
  reservationHeaderPayload,
  serviceEntryPayload,
} = require("../../services/sap.user.services");
const { TRUE, FALSE } = require("../../lib/constant");
const { poolClient, poolQuery } = require("../../config/pgDbConfig");
const Message = require("../../utils/messages");

// PAYLOAD //

const reservation = async (req, res) => {
  let payload = {};

  try {
    const client = await poolClient();
    let transactionSuccessful = false;
    if (Array.isArray(req.body)) {
      payload = req.body.length > 0 ? req.body[0] : null;
    } else if (typeof req.body === "object" && req.body !== null) {
      payload = req.body;
    }
    const { TAB_RESB, ...obj } = payload;

    try {
      if (
        !obj ||
        typeof obj !== "object" ||
        !Object.keys(obj).length ||
        !obj.RSNUM
      ) {
        return responseSend(res, "F", 400, Message.INVALID_PAYLOAD, payload, null);
      }
      // await client.beginTransaction();

      await client.query("BEGIN");

      try {
        const rkpfPayload = await reservationHeaderPayload(obj);
        const rkpfTableInsert = await generateInsertUpdateQuery(
          rkpfPayload,
          RESERVATION_RKPF_TABLE,
          ["RSNUM"]
        );
        const results = await poolQuery({
          client,
          query: rkpfTableInsert.q,
          values: rkpfTableInsert.val,
        });
      } catch (error) {
        return responseSend(res, "F", 502, Message.DATA_INSERT_FAILED, error.message, null);
      }

      if (TAB_RESB?.length) {
        try {
          const resbPayload = await reservationLineItemPayload(TAB_RESB);

          const insert_resb_table = await generateQueryForMultipleData(
            resbPayload,
            RESERVATION_RESB_TABLE,
            ["RSNUM", "RSPOS", "RSART"]
          );
          const results = await poolQuery({
            client,
            query: insert_resb_table.q,
            values: insert_resb_table.val,
          });
        } catch (error) {
          console.error(error.message);
          return responseSend(
            res,
            "F",
            502,
            Message.DATA_INSERT_FAILED,
            error.message,
            null
          );
        }
      }

      await client.query("COMMIT");

      // const comm = await client.commit(); // Commit the transaction if everything was successful
      transactionSuccessful = true;
    } catch (error) {
      responseSend(res, "F", 502, Message.DATA_INSERT_FAILED, error.message, null);
    } finally {
      if (transactionSuccessful === FALSE) {
        await client.query("ROLLBACK");
      }
      client.release();
      if (transactionSuccessful === TRUE) {
        responseSend(res, "S", 200, Message.DATA_SEND_SUCCESSFULL, null, null);
      }
    }
  } catch (error) {
    console.error(error.message);
    responseSend(res, "F", 400, Message.DB_CONN_ERROR, error.message, null);
  }
};
const serviceEntry = async (req, res) => {
  let payload = [];

  try {
    // const promiseConnection = await connection();
    const client = await poolClient();
    // let transactionSuccessful = false;

    if (Array.isArray(req.body)) {
      payload = req.body;
    } else if (typeof req.body === "object" && req.body !== null) {
      payload.push(req.body);
    }

    try {
      // await client.beginTransaction();


      const essrPayload = await serviceEntryPayload(payload);

      const essrTableInsert = await generateQueryForMultipleData(essrPayload, SERVICE_ENTRY_TABLE_SAP, ["lblni"]);
      const response = await poolQuery({ client, query: essrTableInsert.q, values: essrTableInsert.val });
      responseSend(res, "S", 200, Message.DATA_SEND_SUCCESSFULL, response, null);
      // Commit the transaction if everything was successful
      // transactionSuccessful = true;
    } catch (error) {
      responseSend(res, "F", 502, Message.DATA_INSERT_FAILED, error.message, null);
    } finally {
      client.release();
    }
  } catch (error) {
    responseSend(res, "F", 400, Message.DB_CONN_ERROR, error.message, null);
  }
};

const reservationList = async (req, res) => {
  try {
    let q = `SELECT 
        rkpf.RSNUM as reservationNumber,
		rkpf.RSDAT as reservationDate,
        rkpf.USNAM as userName,
        rkpf.BWART as moventType,
        rkpf.WEMPF as goodsRecipient,
        rkpf.KOSTL as costCenter,
        rkpf.EBELN as purchasing_doc_no,
        rkpf.EBELP as itemNumber,
        rkpf.UMWRK as receivingPlant,
        rkpf.UMLGO as receivingLocation,
        rkpf.PS_PSP_PNR as wbs,
        rkpf.WBS_DESC as wbsDescription,
        resb.RSPOS as reservationItemNumber,
        resb.RSART as recordType,
        resb.BDART as requirmentType,
        resb.RSSTA as reservationStatus,
        resb.KZEAR as reservationFinalIssue,
        resb.MATNR as materialNubmer,
        makt.MAKTX as materialDescription,
        resb.WERKS as plant,
        resb.LGORT as storageLocation,
        resb.CHARG as batchNumber,
        resb.BDMNG as requirementQty,
        resb.MEINS as unit,
        resb.BWART as itemMomentType,
        resb.ERFMG AS quantityDropdown,
        resb.XWAOK as moment,
        resb.XLOEK as itemDeleted,
        resb.PSPEL as wbsElement,
        resb.BDTER AS itemReservationDate,
        resb.ENMNG as quantWithdrawal
	FROM rkpf as rkpf 
	LEFT JOIN resb AS resb
    	ON(rkpf.RSNUM = resb.RSNUM)
    LEFT JOIN makt as makt
        ON(makt.MATNR = resb.MATNR)
    WHERE 1 = 1 `;

    let val = [];

    // if (req.body.RSNUM) {
    //     q = q.concat(" AND rkpf.RSNUM = ?");
    //     val.push(req.body.RSNUM);
    // }

    if (!req.body.reservationNumber) {
      return resSend(res, false, 200, "plese send reservationNumber", [], null);
    }

    if (req.body.reservationNumber) {
      q = q.concat(" AND rkpf.RSNUM = ?");
      val.push(req.body.reservationNumber);
    }
    if (req.body.reservationDate) {
      q = q.concat(" AND rkpf.RSDAT = ?");
      val.push(req.body.reservationDate);
    }

    const result = await query({ query: q, values: val });

    let response = {
      reservationNumber: null,
      reservationDate: null,
      userName: null,
      moventType: null,
      goodsRecipient: null,
      costCenter: null,
      purchising_doc_no: null,
      itemNumber: null,
      receivingPlant: null,
      receivingLocation: null,
      wbs: null,
      lineItem: result,
    };

    if (result.length > 0) {
      (response.reservationNumber = result[0].reservationNumber),
        (response.reservationDate = result[0].reservationDate),
        (response.userName = result[0].userName),
        (response.moventType = result[0].moventType),
        (response.goodsRecipient = result[0].goodsRecipient),
        (response.costCenter = result[0].costCenter),
        (response.purchising_doc_no = result[0].purchising_doc_no),
        (response.itemNumber = result[0].itemNumber),
        (response.receivingPlant = result[0].receivingPlant),
        (response.receivingLocation = result[0].receivingLocation),
        (response.wbs = result[0].wbs),
        resSend(res, true, 200, "Data fetched successfully", response, null);
    } else {
      resSend(res, false, 200, "No Record Found", response, null);
    }
  } catch (error) {
    return resSend(res, false, 500, "internal server error", error, null);
  }
};

module.exports = { reservation, reservationList, serviceEntry };
