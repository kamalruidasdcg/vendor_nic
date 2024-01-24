const express = require("express");
const router = express.Router();
const downloadController = require("../controllers/poController/poDownloadController");
const { veifyAccessToken } = require("../services/jwt.services");

router.get("/", (req, res) => {
    downloadController.download(req, res);
});
router.get("/tnc", [veifyAccessToken], (req, res) => {
    downloadController.tncdownload(req, res);
});


module.exports = router;
