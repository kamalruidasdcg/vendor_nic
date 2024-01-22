const express = require("express");
const { veifyAccessToken, authorizeRoute } = require("../services/jwt.services");
const router = express.Router();
const sdbgController = require("../controllers/poController/sdbgController");
const { uploadSDBGFile } = require("../lib/fileUpload");
const { unlockPrivilege } = require("../services/auth.services");

router.post("/", [veifyAccessToken, uploadSDBGFile.single("file")], (req, res) => {
  sdbgController.submitSDBG(req, res);
});

router.post("/unlock", [veifyAccessToken, unlockPrivilege], (req, res) => {
  sdbgController.unlock(req, res);
});

router.get("/list", [], (req, res) => {
  sdbgController.list(req, res);
});
router.get("/assigneeList", [], (req, res) => {
  sdbgController.assigneeList(req, res);
});
router.post("/dashboard", [], (req, res) => {
  sdbgController.dashboard(req, res);
});





module.exports = router;