const {
  getQuery,
  query,
  poolClient,
  poolQuery,
} = require("../config/pgDbConfig");
const { makeHttpRequest } = require("../config/sapServerConfig");
const {
  INSERT,
  USER_TYPE_VENDOR,
  UPDATE,
  BILL_INCORRECT_DEDUCTIONS,
  LD_PENALTY_REFUND,
} = require("../lib/constant");
const {
  BTN_RETURN_DO,
  BTN_FORWORD_FINANCE,
  BTN_UPLOAD_CHECKLIST,
  BTN_ASSIGN_TO_STAFF,
  BTN_REJECT,
} = require("../lib/event");
const { resSend } = require("../lib/resSend");
const {
  APPROVED,
  SUBMITTED,
  FORWARD_TO_FINANCE,
  REJECTED,
  ASSIGNED,
  STATUS_RECEIVED,
  SUBMIT_BY_DO,
  SUBMITTED_BY_DO,
  SUBMITTED_BY_VENDOR,
  D_STATUS_FORWARDED_TO_FINANCE,
  F_STATUS_FORWARDED_TO_FINANCE,
  RECEIVED,
  BTN_STATUS_BANK,
  BTN_STATUS_HOLD_TEXT,
  BTN_STATUS_UNHOLD_TEXT,
  BTN_STATUS_PROCESS,
  BTN_STATUS_NOT_SUBMITTED,
  BTN_STATUS_DRETURN,
} = require("../lib/status");
const {
  BTN_ANY_OTHER_CLAIM,
  BTN_LIST,
  BTN_ASSIGN,
  BTN_PBG,
  BTN_MATERIAL,
  BTN_SERVICE_HYBRID,
} = require("../lib/tableName");
const { getEpochTime, getYyyyMmDd, generateQuery } = require("../lib/utils");
const { sendMail } = require("../services/mail.services");
const { create_btn_no } = require("../services/po.services");
const {
  getSDBGApprovedFiles,
  // getGRNs,
  getICGRNs,
  // getGateEntry,
  getPBGApprovedFiles,
  checkBTNRegistered,
  getBTNInfo,
  getBTNInfoDO,
  fetchBTNListByPOAndBTNNum,
  getSDFiles,
} = require("../utils/btnUtils");
const { convertToEpoch } = require("../utils/dateTime");
const { getUserDetailsQuery } = require("../utils/mailFunc");
const { checkTypeArr } = require("../utils/smallFun");
const Message = require("../utils/messages");
const {
  addToBTNList,
  btnCurrentDetailsCheck,
  timeInHHMMSS,
  updateBtnListTable,
} = require("./btnControllers");

const submitIncorrectDuct = async (req, res) => {
  //return resSend(res, false, 200, "Basic Value is mandatory.", null, null);
  try {
    let {
      purchasing_doc_no,
      ref_invoice1_no,
      ref_invoice1_amount,
      ref_invoice1_remarks,
      ref_invoice2_no,
      ref_invoice2_amount,
      ref_invoice2_remarks,
      ref_invoice3_no,
      ref_invoice3_amount,
      ref_invoice3_remarks,
      ref_invoice4_no,
      ref_invoice4_amount,
      ref_invoice4_remarks,
      balance_claim_invoice,
      total_claim_amount,
      btn_type,
      letter_reference_no,
      letter_date,
    } = req.body;

    // let payloadFiles = req.files;
    const tokenData = { ...req.tokenData };
    console.log(tokenData);

    // Check required fields
    if (tokenData?.user_type != USER_TYPE_VENDOR) {
      return resSend(res, false, 200, "Vendor only can claim.", null, null);
    }

    // Check required fields
    if (!total_claim_amount || !total_claim_amount.trim() === "") {
      return resSend(res, false, 200, "Claim Value is mandatory.", null, null);
    }

    if (!purchasing_doc_no) {
      return resSend(
        res,
        false,
        200,
        "purchasing_doc_no is missing!",
        null,
        null
      );
    }

    // if (!btn_type && (btn_type != BILL_INCORRECT_DEDUCTIONS || btn_type != LD_PENALTY_REFUND)) {
    //   return resSend(res, false, 200, "btn_type is missing!", null, null);
    // }

    let payload = {
      ...req.body,
      vendor_code: tokenData?.vendor_code,
      created_by_id: tokenData?.vendor_code,
      //btn_type: "claim-against-pbg",
      updated_by: "VENDOR",
    };

    // Handle uploaded files
    let ref_invoice1_file =
      req.files.ref_invoice1_file && req.files.ref_invoice1_file[0].filename
        ? req.files.ref_invoice1_file[0].filename
        : "";
    payload = { ...payload, ref_invoice1_file };

    let ref_invoice2_file =
      req.files.ref_invoice2_file && req.files.ref_invoice2_file[0].filename
        ? req.files.ref_invoice2_file[0].filename
        : "";
    payload = { ...payload, ref_invoice2_file };

    let ref_invoice3_file =
      req.files.ref_invoice3_file && req.files.ref_invoice3_file[0].filename
        ? req.files.ref_invoice3_file[0].filename
        : "";
    payload = { ...payload, ref_invoice3_file };

    let ref_invoice4_file =
      req.files.ref_invoice4_file && req.files.ref_invoice4_file[0].filename
        ? req.files.ref_invoice4_file[0].filename
        : "";
    payload = { ...payload, ref_invoice4_file };

    // console.log(req.files);
    // return;

    // check invoice number is already present in DB
    // let check_invoice_q = `SELECT count(*) as count FROM ${BTN_ANY_OTHER_CLAIM} WHERE invoice_no = $1 and vendor_code = $2`;
    // let check_invoice = await getQuery({
    //   query: check_invoice_q,
    //   values: [invoice_no, tokenData.vendor_code],
    // });

    // if (checkTypeArr(check_invoice) && check_invoice[0].count > 0) {
    //   return resSend(
    //     res,
    //     false,
    //     200,
    //     "BTN is already created under the invoice number.",
    //     null,
    //     null
    //   );
    // }

    // generate btn num
    const btn_num = await create_btn_no();
    payload = { ...payload, btn_num };

    // created at
    let created_at = getEpochTime();
    payload = { ...payload, created_at };
    console.log(payload);
    payload.net_claim_amount = total_claim_amount;
    payload.net_payable_amount = total_claim_amount;
    // INSERT Data into btn table
    let resBtnList = await addToBTNList(payload, SUBMITTED_BY_VENDOR);
    if (!resBtnList?.status) {
      return resSend(
        res,
        false,
        200,
        `Something went wrong. Try again!`,
        null,
        null
      );
    }
    // return;
    delete payload.net_claim_amount;
    delete payload.net_payable_amount;
    let { q, val } = generateQuery(INSERT, BTN_ANY_OTHER_CLAIM, payload);
    const result = await getQuery({ query: q, values: val });
    console.log(result);
    if (result.length > 0) {
      //handelMail(tokenData, { ...payload, status: SUBMITTED });
      return resSend(
        res,
        true,
        200,
        "BTN number is generated and saved succesfully!",
        null,
        null
      );
    } else {
      return resSend(
        res,
        false,
        200,
        "Data not inserted! Try Again!",
        null,
        null
      );
    }
  } catch (error) {
    resSend(res, false, 500, "Internal server error", error.message, null);
  }
};

const getBtnFile = async (req, res) => {
  try {
    const client = await poolClient();
    await client.query("BEGIN");
    try {
      const btn_num = req.query.btn_num;
      const tokenData = { ...req.tokenData };

      if (!btn_num) {
        return resSend(
          res,
          false,
          200,
          "BTN number is missing!",
          "No BTN number",
          null
        );
      }

      const check_btn_q = `SELECT btn_type FROM ${BTN_LIST} WHERE btn_num = $1`;
      const check_btn_in_list_table = await poolQuery({
        client,
        query: check_btn_q,
        values: [btn_num],
      });
      console.log(check_btn_in_list_table.length);
      if (!check_btn_in_list_table.length) {
        return resSend(
          res,
          false,
          200,
          Message.NO_DATA_FOUND,
          "No record found by this BTN number.",
          null
        );
      }
      const table_type = check_btn_in_list_table[0].btn_type;
      console.log(table_type);
      let table;
      switch (table_type) {
        case "claim-against-pbg":
          {
            table = BTN_PBG;
          }
          break;
        case "hybrid-bill-material":
          {
            table = BTN_MATERIAL;
          }
          break;
        case "service-contract-bills":
          {
            table = BTN_SERVICE_HYBRID;
          }
          break;
        default:
          return resSend(res, false, 200, "Invalid BTN type!", null, null);
      }

      const get_btn_file_q = `SELECT invoice_filename FROM ${table} WHERE btn_num = $1 AND btn_type = $2`;
      console.log(get_btn_file_q);
      const get_btn_file = await poolQuery({
        client,
        query: get_btn_file_q,
        values: [btn_num, check_btn_in_list_table[0].btn_type],
      });
      console.log(get_btn_file);
      return resSend(
        res,
        true,
        200,
        Message.DATA_FETCH_SUCCESSFULL,
        get_btn_file,
        null
      );
    } catch (error) {
      return resSend(
        res,
        false,
        500,
        Message.SERVER_ERROR,
        error.message,
        null
      );
    } finally {
      client.release();
    }
  } catch (error) {
    return resSend(res, true, 500, Message.DB_CONN_ERROR, error.message, null);
  }
};

const getGstnByPo = async (req, res) => {
  try {
    const client = await poolClient();
    await client.query("BEGIN");
    try {
      const poNo = req.query.poNo;
      const tokenData = { ...req.tokenData };

      if (!poNo) {
        return resSend(
          res,
          false,
          200,
          "poNo number is missing!",
          "No poNo",
          null
        );
      }

      const qry = `SELECT t2.lifnr,t2.name1,t2.stcd3 FROM ekko as t1
                        LEFT JOIN lfa1  as t2 ON t1.lifnr = t2.lifnr
                    WHERE t1.ebeln = $1`;

      const get_gstn = await poolQuery({
        client,
        query: qry,
        values: [poNo],
      });
      console.log(get_gstn);
      return resSend(
        res,
        true,
        200,
        Message.DATA_FETCH_SUCCESSFULL,
        get_gstn,
        null
      );
    } catch (error) {
      return resSend(
        res,
        false,
        500,
        Message.SERVER_ERROR,
        error.message,
        null
      );
    } finally {
      client.release();
    }
  } catch (error) {
    return resSend(res, true, 500, Message.DB_CONN_ERROR, error.message, null);
  }
};

module.exports = { submitIncorrectDuct, getBtnFile, getGstnByPo };
