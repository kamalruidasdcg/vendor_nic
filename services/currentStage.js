const { query, getQuery } = require("../config/pgDbConfig");
const { USER_TYPE_SUPER_ADMIN } = require("../lib/constant");
const { resSend } = require("../lib/resSend");
const {
  SDBG,
  DRAWING,
  QAP_SUBMISSION,
  ILMS,
  INSPECTIONCALLLETTER,
  SHIPPINGDOCUMENTS,
  WDC,
  BTN_LIST,
  QALS,
  MSEG,
} = require("../lib/tableName");

const currentStageHandler = async (id) => {
  let dbs = [
    SDBG,
    DRAWING,
    QAP_SUBMISSION,
    ILMS,
    INSPECTIONCALLLETTER,
    SHIPPINGDOCUMENTS,
    QALS, // grn
    MSEG, // icgrn
    WDC,
    BTN_LIST,
  ];
  let finalStage = "Not Started";
  let stage = "Not Started";
  for (const item of dbs) {
    let q = "";
    if (item === QALS || item === MSEG) {
      q = `SELECT count(*) as count FROM ${item} WHERE EBELN = $1`;
    } else {
      q = `SELECT count(*) as count FROM ${item} WHERE purchasing_doc_no = $1`;
    }

    let res = await getQuery({
      query: q,
      values: [id],
    });
    console.log(res);
    if (res[0]?.count > 0) {
      let r = "";
      if (item === SDBG) {
        r = "SDBG";
      }
      if (item === DRAWING) {
        r = "DRAWING";
      }
      if (item === QAP_SUBMISSION) {
        r = "QAP";
      }
      if (item === ILMS) {
        r = "ILMS";
      }
      if (item === INSPECTIONCALLLETTER) {
        r = "INSPECTION";
      }
      if (item === SHIPPINGDOCUMENTS) {
        r = "SHIPPING";
      }
      if (item === QALS) {
        r = "STORE-GRN";
      }
      if (item === MSEG) {
        r = "STORE-ICGRN";
      }
      if (item === WDC) {
        r = "WDC";
        finalStage = r;
      }
      if (item === BTN_LIST) {
        r = "PAYMENT";
        finalStage = r;
      }
      stage = r;
    } else {
      finalStage = stage;
      break;
    }
  }

  // console.log("finalStage", finalStage);

  return finalStage;
};

module.exports = { currentStageHandler };
