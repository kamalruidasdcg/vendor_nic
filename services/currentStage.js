const { getQuery, poolQuery } = require("../config/pgDbConfig");

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
  SERVICE_ENTRY_TABLE_SAP,
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

  return finalStage;
};



const currentStageHandleForAllActivity = async (client, ids) => {

  try {
    const placeholders = ids.map((_, i) => `$${i + 1}`).join(", ");
    let dbs = [
      SDBG,
      DRAWING,
      QAP_SUBMISSION,
      ILMS,
      INSPECTIONCALLLETTER,
      SHIPPINGDOCUMENTS,
      QALS, // grn
      MSEG, // icgrn
      SERVICE_ENTRY_TABLE_SAP,
      WDC,
      BTN_LIST,
    ];
    let finalStage = "Not Started";
    let stage = "Not Started";
    let obj = {};

    const currStageQuery = dbs.map((item, i) => {
      let q = "";
      if (item === QALS || item === MSEG || item == SERVICE_ENTRY_TABLE_SAP) {
        q = `(SELECT count(EBELN) as count, EBELN as purchasing_doc_no, '${item}' as flag FROM ${item} WHERE ebeln IN (${placeholders}) GROUP BY purchasing_doc_no)`;
      } else {
        q = `(SELECT count(purchasing_doc_no) as count, purchasing_doc_no, '${item}' as flag FROM ${item} WHERE purchasing_doc_no IN (${placeholders}) GROUP BY purchasing_doc_no)`;
      }
      return q
    }).join(" UNION ALL ");

    let response = await poolQuery({ client, query: currStageQuery, values: ids });

    ids.forEach((el) => { obj[el] = stage });

    for (const item of response) {
      const flag = item.flag;
      const count = parseInt(item.count);
      if (count > 0) {
        if (flag === SDBG) {
          finalStage = "SDBG";
        }
        if (flag === DRAWING) {
          finalStage = "DRAWING";
        }
        if (flag === QAP_SUBMISSION) {
          finalStage = "QAP";
        }
        if (flag === ILMS) {
          finalStage = "ILMS";
        }
        if (flag === INSPECTIONCALLLETTER) {
          finalStage = "INSPECTION";
        }
        if (flag === SHIPPINGDOCUMENTS) {
          finalStage = "SHIPPING";
        }
        if (flag === MSEG) {
          finalStage = "STORE-ICGRN";
        }
        if (flag === QALS) {
          finalStage = "STORE-GRN";
        }
        if (flag === SERVICE_ENTRY_TABLE_SAP) {
          finalStage = "SIR";
        }
        if (flag === WDC) {
          finalStage = "WDC";
        }
        if (flag === BTN_LIST) {
          finalStage = "PAYMENT";
        }
      }

      obj[item.purchasing_doc_no] = finalStage;
    }

    return obj;
  } catch (error) {
    throw error;
  }
};

module.exports = { currentStageHandler, currentStageHandleForAllActivity };
