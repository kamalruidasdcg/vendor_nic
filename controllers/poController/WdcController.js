const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT } = require("../../lib/constant");
const { WDC } = require("../../lib/tableName");
const { PENDING, REJECTED, ACKNOWLEDGED, APPROVED, RE_SUBMITTED, CREATED } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const path = require('path');
const { wdcPayload } = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { getFilteredData, updatTableData, insertTableData } = require("../genralControlles");


exports.wdc = async (req, res) => {

   // resSend(res, true, 200, "file upleeoaded!", req.body, null);
    try {

        const lastParam = req.path.split("/").pop();
        // Handle Image Upload
       // let fileData = {};
        // if (req.file) {
        //     fileData = {
        //         fileName: req.file.filename,
        //         filePath: req.file.path,
        //         fileType: req.file.mimetype,
        //         fileSize: req.file.size,
        //     };

        //     const payload = { ...req.body, ...fileData };

        const payload = { ...req.body };

            if(!payload.purchasing_doc_no || !payload.updated_by || !payload.action_by_name || !payload.action_by_id) {

                const directory = path.join(__dirname, '..', 'uploads', lastParam);
                const isDel = handleFileDeletion(directory, req.file.filename);
                return resSend(res, false, 400, "Please send valid payload", res, null);

            }

            const insertObj = wdcPayload(payload, PENDING);
            const { q, val } = generateQuery(INSERT, WDC, insertObj);
            const response = await query({ query: q, values: val });

            if (response.affectedRows) {
                resSend(res, true, 200, "WDC Updated!", 'fileData', null);
            } else {
                resSend(res, false, 400, "No data inserted", response, null);
            }


        // } else {
        //     resSend(res, false, 400, "Please upload a valid File", fileData, null);
        // }

    } catch (error) {
        console.log("po add api", error)

        return resSend(res, false, 500, "internal server error", [], null);
    }
}

exports.List = async (req, res) => {
    
      req.query.$tableName = `wdc`;
      req.query.$filter = `{ "purchasing_doc_no" :  ${req.query.poNo}}`;
      try {
        getFilteredData(req, res);
      } catch(err) {
        console.log("data not fetched", err);
      }
    // resSend(res, true, 200, "oded!", req.query.dd, null);
     
 }
