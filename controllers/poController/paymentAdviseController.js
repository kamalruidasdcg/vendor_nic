const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT } = require("../../lib/constant");
const { PAYMENTADVICE } = require("../../lib/tableName");
const { SUBMITTED, REJECTED, ACKNOWLEDGED, APPROVED, RE_SUBMITTED, CREATED } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const path = require('path');
const { wdcPayload } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { getFilteredData, updatTableData, insertTableData } = require("../genralControlles");



exports.List = async (req, res) => {
    
    req.query.$tableName = PAYMENTADVICE;
    req.query.$filter = `{ "purchasing_doc_no" :  ${req.query.poNo}}`;

    try {
      getFilteredData(req, res);
    } catch(err) {
      console.log("data not fetched", err);
    }
  // resSend(res, true, 200, "oded!", req.query.dd, null);
   
}