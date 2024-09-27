const {
  asyncPool,
  poolQuery,
  poolClient,
  getQuery,
} = require("../../config/pgDbConfig");
const { UPDATE, INSERT, BTN_STATUS_HOLD_CODE } = require("../../lib/constant");
const { BTN_RETURN_DO } = require("../../lib/event");
const { responseSend } = require("../../lib/resSend");
const {
  BTN_STATUS_HOLD_TEXT,
  BTN_STATUS_UNHOLD_TEXT,
} = require("../../lib/status");
const { BTN_LIST } = require("../../lib/tableName");
const {
  generateInsertUpdateQuery,
  generateQueryForMultipleData,
  generateQuery,
  getEpochTime,
} = require("../../lib/utils");
const { sendMail } = require("../../services/mail.services");
const {
  zbtsLineItemsPayload,
  zbtsHeaderPayload,
} = require("../../services/sap.payment.services");
const { isPresentInObps } = require("../../services/sap.services");
const { getUserDetailsQuery } = require("../../utils/mailFunc");
const Message = require("../../utils/messages");

const zbts_st = async (req, res) => {
  try {
    const client = await poolClient();
    // let transactionSuccessful = false;

    try {
      if (
        !req.body ||
        typeof req.body != "object" ||
        !Object.keys(req.body)?.length
      ) {
        return responseSend(res, "F", 400, Message.INVALID_PAYLOAD, null, null);
      }

      const payload = req.body;
      if (!payload) {
        return responseSend(res, "F", 400, "Invalid payload.", null, null);
      }

      /**
       * IF THE BTN IS NOT PART OF OBPS
       * NOT INSERT IN OBPS DB
       * IGNORE THIS BTN WHICH IS SEND FROM SAP
       */
      // const q = `SELECT count(*) as btn_count from btn_list where btn_num = $1`;
      // const btn_num = payload.zbtno || payload.ZBTNO;
      // const btnCount = await poolQuery({ client, query: q, values: [btn_num] });
      
      // CHECKING THE PO/DATA IS NOT PART OF OBPS PROJECT
      const btn_num = payload.zbtno || payload.ZBTNO;
      const isPresent = await isPresentInObps(client, `btn_num = '${btn_num}'`, BTN_LIST).count();
      if (!isPresent) {
        return responseSend(res, "S", 200, Message.NON_OBPS_DATA, `THE BTN NO: ${btn_num} NOT IN OBPS SERVER`, null);
      }
      // END //

      const { ZBTSM, zbtsm, ...obj } = payload;
      let payloadObj = {};

      // console.log("payloadObj", obj, ZBTSM, zbtsm);

      try {
        payloadObj = await zbtsHeaderPayload(obj);
        const btnPaymentHeaderQuery = await generateInsertUpdateQuery(
          payloadObj,
          "zbts_st",
          ["zbtno"]
        );
        const results = await poolQuery({
          client,
          query: btnPaymentHeaderQuery.q,
          values: btnPaymentHeaderQuery.val,
        });
      } catch (error) {
        console.log("Data insert failed, zbts_st api");
        return responseSend(
          res,
          "F",
          400,
          Message.DATA_INSERT_FAILED,
          error.message,
          null
        );
      }
      const zbtsmPayload = ZBTSM || zbtsm;
      // console.log("zbtsmPayload", zbtsmPayload);
      // const response1 = await query({ query: btnPaymentHeaderQuery, values: [] });
      if (zbtsmPayload) {
        // response2 = await query({ query: btnPaymentLineItemQuery, values: [] });

        try {
          const lineItemPayloadObj = await zbtsLineItemsPayload(
            zbtsmPayload,
            obj
          );
          const btnPaymentLineItemQuery = await generateQueryForMultipleData(
            lineItemPayloadObj,
            "zbtsm_st",
            ["zbtno", "srno"]
          );
          const results = await poolQuery({
            client,
            query: btnPaymentLineItemQuery.q,
            values: btnPaymentLineItemQuery.val,
          });
        } catch (error) {
          // return responseSend(res, "F", 502, "Data insert failed !!", error, null);
          console.log("Data insert failed, zbts_st api");
          return responseSend(
            res,
            "F",
            400,
            Message.DATA_INSERT_FAILED,
            error.toString(),
            null
          );
        }
      }

      // UPDATE BTN LIST TABLE WHERE ANY ACTION TAKEN FROM SAP
      await updateBtnListTable(client, payloadObj);

      responseSend(res, "S", 200, "Data inserted successfully", {}, null);
    } catch (error) {
      responseSend(res, "F", 502, Message.SERVER_ERROR, error.toString(), null);
    } finally {
      client.release();
    }
  } catch (error) {
    responseSend(res, "F", 500, Message.DB_CONN_ERROR, error.message, null);
  }
};

const updateBtnListTable = async (client, data) => {
  try {
    // const btnListPayload = { btn_num: data.zbtno, status: data.dstatus };
    const statusObj = {
      1: "RECEIVED",
      2: "REJECTED",
      3: "APPROVE",
      4: "BANK",
      5: "D-RETURN",
    };
    const getLatestDataQuery = `
        SELECT 
            btn_num, 
            purchasing_doc_no, 
            net_claim_amount, 
            net_payable_amount, 
            vendor_code, 
            status, 
            btn_type,
            created_at
        FROM public.btn_list where btn_num = $1 ORDER BY created_at DESC LIMIT 1`;
    const lasBtnDetails = await poolQuery({
      client,
      query: getLatestDataQuery,
      values: [data.zbtno],
    });
    let btnListTablePaylod = { btn_num: data.zbtno };

    if (lasBtnDetails.length) {
      btnListTablePaylod = {
        ...lasBtnDetails[0],
        ...btnListTablePaylod,
        created_at: getEpochTime(),
      };

      /**
       * status save in obps server
       * if status  BTN_STATUS_HOLD_CODE then obps list show BTN_STATUS_HOLD_TEXT
       * if un hold this, then status show default fstatus
       */
      let currentStatus = statusObj[data.fstatus] || "";
      if (data.hold && data.hold === BTN_STATUS_HOLD_CODE) {
        currentStatus = BTN_STATUS_HOLD_TEXT;
      }
      if (btnListTablePaylod.status === BTN_STATUS_HOLD_TEXT && !data.hold) {
        currentStatus = BTN_STATUS_UNHOLD_TEXT;
      }
      btnListTablePaylod.status = currentStatus;

      const { q, val } = generateQuery(INSERT, "btn_list", btnListTablePaylod);
      await poolQuery({ client, query: q, values: val });
      if (data.fstatus == "5" || data.fstatus == 5) {
        await handelMail(btnListTablePaylod, client);
      }
    } else {
      // console.log("NO BTN FOUND IN LIST TO BE UPDATED btn controller");
    }
  } catch (error) {
    throw error;
  }
};

async function handelMail(payload, client) {
  try {
    let emailUserDetailsQuery;
    let emailUserDetails;
    let dataObj = payload;

    emailUserDetailsQuery = getUserDetailsQuery("vendor_and_do", "$1");
    emailUserDetails = await poolQuery({
      client,
      query: emailUserDetailsQuery,
      values: [payload.purchasing_doc_no],
    });
    dataObj = { ...dataObj, vendor_name: emailUserDetails[0]?.u_name };
    await sendMail(
      BTN_RETURN_DO,
      dataObj,
      { users: emailUserDetails },
      BTN_RETURN_DO
    );
  } catch (error) {
    console.log("handelMail btn ctrl sap", error.toString(), error.stack);
  }
}

module.exports = { zbts_st };
