const { query } = require("../config/dbConfig");
const { INSERT } = require("../lib/constant");
const { resSend } = require("../lib/resSend");
const { TNC_MINUTES } = require("../lib/tableName");
const { getEpochTime, generateQuery } = require("../lib/utils");

const uploadImage = (req, res) => {
  // Handle Image Upload
  let fileData = {};
  if (req.file) {
    fileData = {
      fileName: req.file.filename,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
    };
    resSend(res, true, 200, "file uploaded!", fileData, null);
  } else {
    resSend(res, false, 200, "Please upload a valid image", fileData, null);
  }
};

const updoadExcelFileController = (req, res) => {
  // Handle Image Upload
  let fileData = {};
  if (req.file) {
    fileData = {
      fileName: req.file.filename,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
    };
    resSend(res, true, 200, "file uploaded!", fileData, null);
  } else {
    resSend(
      res,
      false,
      200,
      "Please upload a valid Excel File",
      fileData,
      null
    );
  }
};

const uploadTNCMinuts = async (req, res) => {
  // Handle Image Upload
  let fileData = {};
  const tokenData = { ...req.tokenData };

  if (!req.body.purchasing_doc_no) {
    return resSend(res, true, 200, "Please send purchasing_doc_no !!.", null, null);
  }
  // const check = await isDealingOfficers(req.body.purchasing_doc_no, tokenData.vendor_code);
  // console.log("check", check)
  // if (!check) {
  //   return resSend(res, false, 401, "You dont have access!!.", null, null);
  // }

  if (req.file) {
    fileData = {
      fileName: req.file.filename,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
    };

    const payload = {
      file_name: req.file.filename,
      file_path: req.file.path,
      file_type: req.file.mimetype,
      created_by_id: tokenData.vendor_code,
      created_at: getEpochTime(),
      purchasing_doc_no: req.body.purchasing_doc_no,
    };

    const checkQuery = `SELECT COUNT(purchasing_doc_no) AS count FROM tnc_minutes WHERE purchasing_doc_no = ?`;

    const isExist = await query({
      query: checkQuery,
      values: [req.body.purchasing_doc_no],
    });

    if (isExist && isExist[0].count > 0) {
      return resSend(res, true, 200, "Already upload a file !!.", null, null);
    }

    const { q, val } = generateQuery(INSERT, TNC_MINUTES, payload);
    const result = await query({ query: q, values: val });

    if (result.affectedRows > 0)
      return resSend(res, true, 200, "file uploaded!", fileData, null);

    resSend(res, false, 400, "Please upload a valid input", fileData, null);
  } else {
    resSend(res, false, 400, "Please upload a valid image", fileData, null);
  }
};


async function isDealingOfficers(purchasing_doc_no, loginId) {
  const q = `SELECT COUNT(ERNAM) AS count FROM ekko WHERE EBELN = ?  AND ERNAM = ?;`
  const result = await query({ query: q, values: [purchasing_doc_no, loginId] });

  if (result && result.length) {
    return result[0]["count"] > 0;
  }
  return false;
}

module.exports = { uploadImage, updoadExcelFileController, uploadTNCMinuts };
