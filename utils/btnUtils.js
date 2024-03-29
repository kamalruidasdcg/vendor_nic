const { query } = require("../config/dbConfig");
const { APPROVED } = require("../lib/status");
const { checkTypeArr } = require("./smallFun");

exports.getSDBGApprovedFiles = async (po) => {
  // GET Approved SDBG by PO Number
  let q = `SELECT file_name FROM sdbg WHERE purchasing_doc_no = ? and status = ?`;
  let result = await query({
    query: q,
    values: [po, APPROVED],
  });
  return result;
};

exports.getGRNs = async (po) => {
  let q = `SELECT grn_no FROM store_grn WHERE purchasing_doc_no = ?`;
  let result = await query({
    query: q,
    values: [po],
  });
  return result;
};

exports.getICGRNs = async (po) => {
  let q = `SELECT icgrn_no, icgrn_value FROM store_icgrn WHERE purchasing_doc_no = ?`;
  let result = await query({
    query: q,
    values: [po],
  });
  let total_icgrn_value;
  if (checkTypeArr(result)) {
    total_icgrn_value = result.reduce(
      (acc, cur) => acc + parseInt(cur.icgrn_value),
      0
    );
  }
  let res = {
    total_icgrn_value,
    icgrn: result,
  };
  return res;
};
