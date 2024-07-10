const express = require("express");
const {
  veifyAccessToken,
  authorizeRoute,
} = require("../services/jwt.services");
const router = express.Router();
const sdbgController = require("../controllers/poController/sdbgController");
const { uploadSDBGFile, dynamicallyUpload } = require("../lib/fileUpload");
// const { unlockPrivilege } = require("../services/auth.services");

router.post(
  "/submitSDBG",
  [veifyAccessToken, dynamicallyUpload.single("file")],
  (req, res) => {
    sdbgController.submitSDBG(req, res);
  }
);

router.post("/sdbgSubmitByDealingOfficer", [veifyAccessToken], (req, res) => {
  sdbgController.sdbgSubmitByDealingOfficer(req, res);
});

router.post("/sdbgUpdateByFinance", [veifyAccessToken], (req, res) => {
  sdbgController.sdbgUpdateByFinance(req, res);
});

// router.post("/unlock", [veifyAccessToken, unlockPrivilege], (req, res) => {
//   sdbgController.unlock(req, res);
// });

router.get("/getSdbgEntry/", [veifyAccessToken], (req, res) => {
  sdbgController.getSdbgEntry(req, res);
});
router.get("/getSDBGData", [veifyAccessToken], (req, res) => {
  sdbgController.getSDBGData(req, res);
});
router.get("/assigneeList", [veifyAccessToken], (req, res) => {
  sdbgController.assigneeList(req, res);
});

router.post("/bger", [veifyAccessToken], (req, res) => {
  sdbgController.BGextensionRelease(req, res);
});

router.post("/recommendationBger", [veifyAccessToken], (req, res) => {
  sdbgController.recommendationBGextensionRelease(req, res);
});

router.get("/getBGForFinance", [veifyAccessToken], (req, res) => {
  sdbgController.getBGForFinance(req, res);
});

router.post("/updatebger", [veifyAccessToken], (req, res) => {
  sdbgController.UpdateBGextensionRelease(req, res);
});
router.post("/getspecificbg", [veifyAccessToken], (req, res) => {
  sdbgController.GetspecificBG(req, res);
});

router.get("/getCurrentAssignee", [veifyAccessToken], (req, res) => {
  sdbgController.getCurrentAssignee(req, res);
});

router.post("/insertSdbgSave", [veifyAccessToken], (req, res) => {
  sdbgController.insertSdbgSave(req, res);
});

router.get("/getSdbgSave", [veifyAccessToken], (req, res) => {
  sdbgController.getSdbgSave(req, res);
});

router.get("/getingFileNo", [veifyAccessToken], (req, res) => {
  sdbgController.getingFileNo(req, res);
});
module.exports = router;
