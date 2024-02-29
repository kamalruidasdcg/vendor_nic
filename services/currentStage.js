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
    "icgrn",
    "wdc",
  ];
  let finalStage = "Not Started";
  let stage = "Not Started";
  for (const item of dbs) {
    let q = `SELECT count(*) as count FROM ${item} WHERE purchasing_doc_no = ? AND updated_by = "VENDOR"`;
    let res = await query({
      query: q,
      values: [id],
    });
    if (res[0].count > 0) {
      let r = "";
      if (item === "sdbg") {
        r = "SDBG has been submitted";
      } else if (item === "drawing") {
        r = "Drawing has been submitted";
      } else if (item === "qap_submission") {
        r = "QAP has been submitted";
      } else if (item === "ilms") {
        r = "ILMS has been submitted";
      } else if (item === "inspection_call_letter") {
        r = "Inspection call letter has been submitted";
      } else if (item === "shipping_documents") {
        r = "Shipping documents has been submitted";
      } else if (item === "icgrn") {
        r = "ICGRN has been submitted";
      } else if (item === "wdc") {
        r = "WDC has been submitted";
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
