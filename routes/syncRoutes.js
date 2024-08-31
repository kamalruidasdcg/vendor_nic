const express = require("express");
const { uploadUnsyncedData } = require("../lib/fileUpload");
const {
  syncDownload,
  syncCompress,
  syncUnzip,
  syncDataUpload,
  unsyncFileCompressed,
  uploadRecentFilesController,
  syncDownloadTEST,
} = require("../controllers/syncControllers");
const router = express.Router();

// API TO DOWNLOAD ALL UNSYNCED DATA FROM SELECTED TABLES
router.post("/sync_download", syncDownload);
router.post("/sync_download_test", syncDownloadTEST);

// API TO DOWNLOAD COMPRESS UNSYNCED DOWNLOADED DATA
router.post("/sync_zip", syncCompress);

// API TO Unzip the ZIP FILE FOR DATA
router.post("/sync_unzip", [uploadUnsyncedData.single("file")], syncUnzip);

// API TO UPDATE SELECTED TABLES
router.post("/sync_upload", syncDataUpload);

// API TO COMPRESS ZIP FILE FOR FILES THAT ARE UPLOADED IN LAST 24 MINUTES
router.post("/sync_file_zip", unsyncFileCompressed);

// API TO UPDATE FILES THAT ARE UPLOADED IN LAST 24 MINUTES
router.post("/sync_file_upload", uploadRecentFilesController);

module.exports = router;
