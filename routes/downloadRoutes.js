const express = require("express");
const router = express.Router();
const { upload, uploadTNCMinuts } = require("../lib/fileUpload");
const downloadController = require("../controllers/poController/poDownloadController");

router.get("/", (req, res) => {
    downloadController.download(req, res);
});
router.get("/tnc", (req, res) => {
    downloadController.tncdownload(req, res);
});


module.exports = router;
