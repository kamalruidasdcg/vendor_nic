const express = require("express");
const { veifyAccessToken, authorizeRoute } = require("../services/jwt.services");
const router = express.Router();
const sdbgController = require("../controllers/poController/sdbgController");
const { uploadSDBGFile, dynamicallyUpload } = require("../lib/fileUpload");
const { unlockPrivilege } = require("../services/auth.services");

router.post("/submitSDBG", [veifyAccessToken, dynamicallyUpload.single("file")], (req, res) => {
  sdbgController.submitSDBG(req, res);
});

router.post("/sdbgSubmitByDealingOfficer", [veifyAccessToken], (req, res) => {
  sdbgController.sdbgSubmitByDealingOfficer(req, res);
});


router.post("/sdbgUpdateByFinance", [veifyAccessToken], (req, res) => {
  sdbgController.sdbgUpdateByFinance(req, res);
});

router.post("/unlock", [veifyAccessToken, unlockPrivilege], (req, res) => {
  sdbgController.unlock(req, res);
});

router.get("/getSdbgEntry/", [veifyAccessToken], (req, res) => {
  sdbgController.getSdbgEntry(req, res);
});
router.get("/getSDBGData", [veifyAccessToken], (req, res) => {
  sdbgController.getSDBGData(req, res);
});
router.get("/assigneeList", [veifyAccessToken], (req, res) => {
  sdbgController.assigneeList(req, res);
});
// 




module.exports = router;