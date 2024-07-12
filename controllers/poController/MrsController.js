const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT } = require("../../lib/constant");
const { MRS } = require("../../lib/tableName");
const { mrsPayload } = require("../../services/material.servces");

const {
  PENDING,
  REJECTED,
  ACKNOWLEDGED,
  APPROVED,
  RE_SUBMITTED,
  CREATED,
} = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const path = require("path");
const { inspectionCallLetterPayload } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const {
  getFilteredData,
  updatTableData,
  insertTableData,
} = require("../genralControlles");
const { Console } = require("console");

const Mrs = async (req, res) => {
  //return resSend(res, true, 200, "file mmupleeoaded!", req.body, null);
  const tokenData = { ...req.tokenData };

  let fileData = {};
  if (req.file) {
    fileData = {
      fileName: req.file.filename,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
    };
  }
  let payload = { ...req.body, ...fileData, created_at: getEpochTime() };

  if (!payload.purchasing_doc_no) {
    // const directory = path.join(__dirname, '..', 'uploads', 'drawing');
    // const isDel = handleFileDeletion(directory, req.file.filename);
    return resSend(res, false, 400, "1Please send valid payload", null, null);
  }

  payload = {
    ...payload,
    updated_by: tokenData.user_type == 1 ? "VENDOR" : "GRSE",
    created_by_id: tokenData.vendor_code,
  };

  let insertObj = mrsPayload(payload);

  const { q, val } = generateQuery(INSERT, MRS, insertObj);
  const response = await query({ query: q, values: val });

  if (response.affectedRows) {
    resSend(res, true, 200, "MRS uploaded!", fileData, null);
  } else {
    resSend(res, false, 400, "No data inserted", response, null);
  }
};

const List = async (req, res) => {
  // return resSend(res, false, 400, "Please send Mrs", null, "");

  try {
    if (!req.query.poNo) {
      return resSend(res, false, 400, "Please send poNo", null, "");
    }

    const wmcListQuery = `SELECT * FROM ${MRS} WHERE purchasing_doc_no = ?`;

    const result = await query({
      query: wmcListQuery,
      values: [req.query.poNo],
    });

    console.log(result);
    if (result.length > 0) {
      resSend(res, true, 200, "Data fetched successfully", result, null);
    } else {
      resSend(res, false, 200, "No Record Found", result, null);
    }
  } catch (error) {
    return resSend(res, false, 500, "internal server error", error, null);
  }
};

module.exports = { Mrs, List };
