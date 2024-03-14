
const express = require("express");
const router = express.Router();
const hrController = require("../controllers/poController/hrController");
const { dynamicallyUpload } = require("../lib/fileUpload");
const { veifyAccessToken, } = require("../services/jwt.services");


router.post("/hrComplianceUpload", [veifyAccessToken, dynamicallyUpload.single("file")], (req, res) => {
    hrController.hrComplianceUpload(req, res);
});

router.get("/complianceUploadedList", [veifyAccessToken], (req, res) => {
    hrController.complianceUploadedList(req, res);
});



module.exports = router;