const express = require("express");
const { uploadUnsyncedData } = require("../lib/fileUpload");
const {
  syncDownload,
  syncCompress,
  syncUnzip,
  unsyncFileCompressed,
  uploadRecentFilesController,
  syncDownloadTEST,
  uploadRecentFilesControllerByDate,
  syncUnzipNowAPI,
} = require("../controllers/syncControllers");
const router = express.Router();

// API TO DOWNLOAD ALL UNSYNCED DATA FROM SELECTED TABLES
router.post("/sync_download", syncDownload);
router.post("/sync_download_test", syncDownloadTEST);

// API TO DOWNLOAD COMPRESS UNSYNCED DOWNLOADED DATA
router.post("/sync_zip", [uploadUnsyncedData.single("file")], syncCompress);

// API TO Unzip the ZIP FILE FOR DATA
router.post("/sync_unzip", syncUnzip);

// API TO UPDATE SELECTED TABLES NOW API
router.post("/sync_upload", syncUnzipNowAPI);

// API TO COMPRESS ZIP FILE FOR FILES THAT ARE UPLOADED IN LAST 24 MINUTES
router.post("/sync_file_zip", unsyncFileCompressed);

// API TO UPDATE FILES THAT ARE UPLOADED IN LAST 24 MINUTES
router.post("/sync_file_upload", uploadRecentFilesControllerByDate);

module.exports = router;
