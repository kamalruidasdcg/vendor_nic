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
router.get("/latestDocFile", [], (req, res) => {
    downloadController.downloadLatest(req, res);
});

router.get("/getPoFileList", [], (req, res) => {
    downloadController.getPoFileList(req, res);
});
router.post("/paymentAdvice", [], (req, res) => {
    downloadController.getPaymentAdvliceList(req, res);
});

module.exports = router;
