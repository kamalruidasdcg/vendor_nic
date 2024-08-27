//const {query} = require("../config/dbConfig");
// const connection = require("../config/dbConfig");
const { query, getQuery } = require("../config/pgDbConfig");
const { UPDATE, INSERT } = require("../lib/constant");
const { resSend } = require("../lib/resSend");
const { generateQuery } = require("../lib/utils");
const { validatePayload } = require("./validatePayload");
const Message = require("../utils/messages");

const getFilteredData = async (req, res) => {
  try {
    const { $tableName } = req.query;

    if (!$tableName) {
      throw new Error("please send table name.");
    }

    let select = "*";

    // IF USER SEND SHOW SELECTED ITEMS
    if (req.query.$select) {
      select = req.query.$select;
    }
    // EXAMPLE --- >
    // localhost:4001/api/v1/getFilteredData?$tableName=qap_submission&$filter={"purchasing_doc_no":7800000040,  "id": 4}&$search={"vendor_code": "50007545", "status": "PENDING"}
    // START QUERIES
    let q = `SELECT ${select} FROM ${$tableName} WHERE 1 = 1 `;

    // IF USER SEND SHOW FILTERED ITEMS
    if (req.query.$filter) {
      const flt = JSON.parse(req.query.$filter);
      Object.keys(flt).forEach((key) => {
        q = q.concat(` AND ${key} = '${flt[key]}'`);
      });
    }

    // IF USER SEND SHOW FILTERED ITEMS
    if (req.query.$search) {
      const search = JSON.parse(req.query.$search);

      Object.keys(search).forEach((key) => {
        q = q.concat(` AND ${key} LIKE '%${search[key]}%'`);
      });
    }
    const result = await getQuery({
      query: q,
      values: [],
    });
    if (result.length > 0) {
      resSend(res, true, 200, "Data fetched successfully", result, null);
    } else {
      resSend(res, true, 200, "No Record Found", result, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

const updatTableData = async (req, res) => {
  try {
    const { tableName, condition, data } = req.body;

    if (!tableName || !condition) {
      throw new Error("Please send table name and condition.");
    }
    if (!data || !Object.keys(data).length) {
      throw new Error("Please send data.");
    }
    const updateObject = data;
    const { q, val } = generateQuery(UPDATE, tableName, updateObject, condition);
    const result = await query({ query: q, values: val });
    resSend(res, true, 200, `Value updated in ${tableName}`, result, null);
  } catch (error) {
    resSend(res, false, 500, "Error update record", error.message, null);
  }
};

const insertTableData = async (req, res) => {
  
  try {
    const { tableName, condition, data } = req.body;
    if (!tableName) {
      throw new Error("Please send table name and condition.");
    }
    if (!data || !Object.keys(data).length) {
      throw new Error("Please send data.");
    }

    const insertObj = data;
    const { q, val } = generateQuery(INSERT, tableName, insertObj);
    const result = await query({ query: q, values: val });
    resSend(res, true, 200, `Insert data in ${tableName}`, result, null);
  } catch (error) {
    resSend(res, false, 500, "insertTableData api error", error.message, null);
  }
};


module.exports = { getFilteredData, updatTableData, insertTableData };
