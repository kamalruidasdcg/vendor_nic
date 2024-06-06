const express = require("express");
const {
  syncDownload,
  syncCompress,
  syncUnzip,
  syncDataUpload,
} = require("../controllers/syncControllers");
const router = express.Router();

// API TO DOWNLOAD ALL UNSYNCED DATA FROM SELECTED TABLES
router.post("/sync_download", syncDownload);

// API TO DOWNLOAD COMPRESS UNSYNCED DOWNLOADED DATA
router.post("/sync_zip", syncCompress);

// API TO Unzip the ZIP FILE
router.post("/sync_unzip", syncUnzip);

// API TO UPDATE SELECTED TABLES
router.post("/sync_upload", syncDataUpload);

module.exports = router;
