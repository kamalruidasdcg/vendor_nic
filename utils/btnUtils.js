const { query } = require("../config/dbConfig");
const { ACTION_SDBG, ACTION_PBG } = require("../lib/constant");
const { APPROVED } = require("../lib/status");
const { checkTypeArr } = require("./smallFun");

exports.getSDBGApprovedFiles = async (po) => {
  // GET Approved SDBG by PO Number
  let q = `SELECT file_name FROM sdbg WHERE purchasing_doc_no = ? and status = ? and action_type = ?`;
  let result = await query({
    query: q,
    values: [po, APPROVED, ACTION_SDBG],
  });
  return result;
};

exports.getPBGApprovedFiles = async (po) => {
  // GET Approved PBG by PO Number
  let q = `SELECT file_name FROM sdbg WHERE purchasing_doc_no = ? and status = ? and action_type = ?`;
  let result = await query({
    query: q,
    values: [po, APPROVED, ACTION_PBG],
  });
  return result;
};

exports.getGateEntry = async (po) => {
  let q = `SELECT acc_no, gate_date, file_name, file_path FROM store_gate WHERE purchasing_doc_no = ?`;
  let result = await query({
    query: q,
    values: [po],
  });
  return result;
};
// ZMLNR
// EBELN

exports.getGRNs = async (po) => {
  let q = `SELECT grn_no FROM store_grn WHERE purchasing_doc_no = ?`;
  let result = await query({
    query: q,
    values: [po],
  });
  return result;
};

exports.getICGRNs = async (body) => {
  const { purchasing_doc_no, invoice_no } = body;
  console.log("bd", body)

    const gate_entry_q = `SELECT ENTRY_NO AS gate_entry_no,
    ZMBLNR AS grn_no, EBELP as po_lineitem,
    INV_DATE AS invoice_date FROM zmm_gate_entry_d WHERE EBELN = ? AND INVNO = ?`;

    let gate_entry_v = await query({
      query: gate_entry_q,
      values: [purchasing_doc_no, invoice_no],
    });
    

    gate_entry_v = gate_entry_v[0];

    console.log("gate_entry_v", gate_entry_v)

  const icgrn_q = `SELECT PRUEFLOS AS icgrn_nos, MATNR as mat_no, LMENGE01 as quantity 
  FROM qals WHERE MBLNR = ?`; //   MBLNR (GRN No) PRUEFLOS (Lot Number)
    let icgrn_no = await query({
      query: icgrn_q,
      values: [gate_entry_v?.grn_no],
    });
 
    let total_price = 0;
    let total_quantity = 0;

    console.log("icgrn_no", icgrn_no)
    if(checkTypeArr(icgrn_no)){
      await Promise.all(
        await icgrn_no.map(async (item) => {
          const price_q = `SELECT NETPR AS price FROM ekpo WHERE MATNR = ? and EBELN = ? and EBELP = ?`;
          let unit_price = await query({
            query: price_q,
            values: [item?.mat_no, purchasing_doc_no, gate_entry_v.po_lineitem],
          });
          total_quantity += parseFloat(item?.quantity);
          await Promise.all(
            await unit_price.map(async (it) => {
              console.log("it_price", it.price, parseFloat(it?.price));
              total_price += parseFloat(it?.price) * total_quantity;
            })
          );
        })
      );
    }
    console.log("total_price", total_price)
    gate_entry_v.total_price = parseFloat(total_price.toFixed(2));;
    return {
        total_icgrn_value: parseFloat(total_price.toFixed(2)),
      };
  // let q = `SELECT icgrn_no, icgrn_value FROM store_icgrn WHERE purchasing_doc_no = ?`;
  // let result = await query({
  //   query: q,
  //   values: [po],
  // });
  // let total_icgrn_value;
  // if (checkTypeArr(result)) {
  //   total_icgrn_value = result.reduce(
  //     (acc, cur) => acc + parseInt(cur.icgrn_value),
  //     0
  //   );
  // }
  // let res = {
  //   total_icgrn_value,
  //   icgrn: result,
  // };
  // return res;
};

exports.checkBTNRegistered = async (btn_num) => {
  let q = `SELECT count("btn_num") as count FROM btn_do WHERE btn_num = ?`;
  let result = await query({
    query: q,
    values: [btn_num],
  });
  console.log(result);
  if (result.count > 0) {
    return true;
  }
  return false;
};
exports.getBTNInfo = async (btn_num) => {
  let q = `SELECT * FROM btn WHERE btn_num = ?`;
  let result = await query({
    query: q,
    values: [btn_num],
  });
  return result;
};
exports.getBTNInfoDO = async (btn_num) => {
  let q = `SELECT * FROM btn_do WHERE btn_num = ?`;
  let result = await query({
    query: q,
    values: [btn_num],
  });
  return result;
};

exports.getVendorCodeName = async (po_no) => {
  const vendor_q = `SELECT t1.lifnr AS vendor_code,t2.name1 AS vendor_name FROM ekko as t1
    LEFT JOIN lfa1 as t2 ON t1.lifnr = t2.lifnr WHERE t1.ebeln = ? LIMIT 1`;
  let result = await query({
      query: vendor_q,
      values: [po_no],
    });
  result = result[0];
  return result;
};

// exports.getWdcInfo = async (po_no) => {
//   const vendor_q = `SELECT actual_start_date,actual_completion_date FROM wdc WHERE reference_no = ? LIMIT 1`;
//   let result = await query({
//       query: vendor_q,
//       values: [po_no],
//     });
//   result = result[0];
//   return result;
// };
