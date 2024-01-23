const express = require("express");
const { veifyAccessToken, authorizeRoute } = require("../services/jwt.services");
const router = express.Router();
const dashboardController = require("../controllers/poController/dashboardController");
const { uploadSDBGFile } = require("../lib/fileUpload");

router.post("/", [veifyAccessToken], (req, res) => {
  dashboardController.dashboard(req, res);
});

router.get("/subdeptlist", [], (req, res) => {
  dashboardController.subDeptList(req, res);
});
router.post("/empList", [], (req, res) => {
  dashboardController.subDeptEmp(req, res);
});






module.exports = router;