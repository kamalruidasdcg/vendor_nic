const {
  getQuery,
  query,
  poolClient,
  poolQuery,
} = require("../config/pgDbConfig");
const { makeHttpRequest } = require("../config/sapServerConfig");
const {
  C_SDBG_DATE,
  C_DRAWING_DATE,
  C_QAP_DATE,
  C_ILMS_DATE,
  A_SDBG_DATE,
  A_DRAWING_DATE,
  A_QAP_DATE,
  A_ILMS_DATE,
  INSERT,
  USER_TYPE_VENDOR,
  UPDATE,
  MID_SDBG,
  MID_ILMS,
  MID_QAP,
  MID_DRAWING,
  USER_TYPE_GRSE_FINANCE,
  ACTION_DD,
  ACTION_IB,
  ACTION_PBG,
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
  BTN_MATERIAL,
  BTN_LIST,
  BTN_MATERIAL_DO,
  BTN_ASSIGN,
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
const { addToBTNList } = require("./btnControllers");

const submitPbg = async (req, res) => {
  //return resSend(res, false, 200, "Basic Value is mandatory.", null, null);
  try {
    let {
      purchasing_doc_no,
      invoice_no,
      balance_claim_invoice,
      claim_amount,
      percentage_of_claim,
    } = req.body;
    let payloadFiles = req.files;
    const tokenData = { ...req.tokenData };
    let payload = {
      ...req.body,
      vendor_code: tokenData?.vendor_code,
      created_by_id: tokenData?.vendor_code,
      btn_type: "btn-pbg",
      updated_by: "VENDOR",
    };

    // Check required fields
    if (!claim_amount || !claim_amount.trim() === "") {
      return resSend(res, false, 200, "Claim Value is mandatory.", null, null);
    }

    if (!purchasing_doc_no || !invoice_no) {
      return resSend(
        res,
        false,
        200,
        "purchasing_doc_no/Invoice Number is missing!",
        null,
        null
      );
    }

    // check invoice number is already present in DB
    let check_invoice_q = `SELECT count(*) as count FROM btn_pbg WHERE invoice_no = $1 and vendor_code = $2`;
    let check_invoice = await getQuery({
      query: check_invoice_q,
      values: [invoice_no, tokenData.vendor_code],
    });

    if (checkTypeArr(check_invoice) && check_invoice[0].count > 0) {
      return resSend(
        res,
        false,
        200,
        "BTN is already created under the invoice number.",
        null,
        null
      );
    }

    // Handle uploaded files
    let invoice_filename;
    if (payloadFiles["invoice_filename"]) {
      invoice_filename = payloadFiles["invoice_filename"][0]?.filename;
      payload = { ...payload, invoice_filename };
    }
    let balance_claim_invoice_filename;
    if (payloadFiles["balance_claim_invoice_filename"]) {
      balance_claim_invoice_filename =
        payloadFiles["balance_claim_invoice_filename"][0]?.filename;
      payload = { ...payload, balance_claim_invoice_filename };
    }

    // GET ICGRN Value by PO Number
    let resICGRN = await getICGRNs({ purchasing_doc_no, invoice_no });
    if (!resICGRN) {
      return resSend(
        res,
        false,
        200,
        `Invoice number is not valid!`,
        null,
        null
      );
    }

    payload = {
      ...payload,
      icgrn_total: resICGRN.total_icgrn_value,
      icgrn_nos: JSON.stringify(resICGRN.icgrn_nos),
    };

    // generate btn num
    const btn_num = await create_btn_no("BTN");
    payload = { ...payload, btn_num };

    // created at
    let created_at = getEpochTime();
    payload = { ...payload, created_at };
    console.log(payload);
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
    //return;
    let { q, val } = generateQuery(INSERT, "btn_pbg", payload);
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

module.exports = { submitPbg };
