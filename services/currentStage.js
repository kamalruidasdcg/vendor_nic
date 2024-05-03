const { query } = require("../config/dbConfig");
const { USER_TYPE_SUPER_ADMIN } = require("../lib/constant");
const { resSend } = require("../lib/resSend");

const currentStageHandler = async (id) => {
  let dbs = [
    "sdbg",
    "drawing",
    "qap_submission",
    "ilms",
    "inspection_call_letter",
    "shipping_documents",
    "store_icgrn",
    "store_grn",
    "store_gate",
    "wdc",
    "btn",
  ];
  let finalStage = "Not Started";
  let stage = "Not Started";
  for (const item of dbs) {
    let q = `SELECT count(*) as count FROM ${item} WHERE purchasing_doc_no = ? AND updated_by = "VENDOR"`;
    let res = await query({
      query: q,
      values: [id],
    });
    console.log(res);
    if (res[0]?.count > 0) {
      let r = "";
      if (item === "sdbg") {
        r = "SDBG";
      } else if (item === "drawing") {
        r = "DRAWING";
      } else if (item === "qap_submission") {
        r = "QAP";
      } else if (item === "ilms") {
        r = "ILMS";
      } else if (item === "inspection_call_letter") {
        r = "INSPECTION";
      } else if (item === "shipping_documents") {
        r = "SHIPPING";
      } else if (
        item === "store_icgrn" ||
        item === "store_grn" ||
        item === "store_gate"
      ) {
        r = "STORE";
      } else if (item === "wdc") {
        r = "WDC";
        finalStage = r;
      } else if (item === "btn") {
        r = "PAYMENT";
        finalStage = r;
      } else {
        r = item;
      }
      stage = r;
    } else {
      finalStage = stage;
      break;
    }
  }

  return finalStage;
};

module.exports = { currentStageHandler };
