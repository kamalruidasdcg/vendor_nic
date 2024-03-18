const { query } = require("../config/dbConfig");
const { resSend } = require("../lib/resSend");
const { create_btn_no } = require("../services/po.services");

const fetchAllBTNs = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return resSend(
      res,
      false,
      200,
      "PO number is missing, please refresh and retry!",
      null,
      null
    );
  }

  let btnQ = `SELECT * FROM btn WHERE po = ?`;

  let result = await query({
    query: btnQ,
    values: [id],
  });

  return resSend(res, true, 200, "ALL data from BTNs", result, null);
};

const submitBTN = async (req, res) => {
  let {
    po,
    invoice_no,
    invoice_value,
    e_invoice_no,
    debit_note,
    net_claim_amount,
  } = req.body;
  let payloadFiles = req.files;
  console.log(req.body, payloadFiles);
  const btn_num = await create_btn_no("btn");
  console.log(btn_num);

  let btnQ = `INSERT INTO btn SET 
    btn_num = '${btn_num}', 
    po = '${po}', 
    invoice_no = '${invoice_no}', 
    invoice_value='${invoice_value}',
    e_invoice_no='${e_invoice_no}',
    debit_note='${debit_note}',
    net_claim_amount='${net_claim_amount}'
  `;

  let result = await query({
    query: btnQ,
    values: [],
  });
  console.log(result);

  if (result.affectedRows) {
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
};

module.exports = { fetchAllBTNs, submitBTN };
