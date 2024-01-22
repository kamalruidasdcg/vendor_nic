const express = require("express");
const { veifyAccessToken, authorizeRoute } = require("../services/jwt.services");
const router = express.Router();
const dashboardController = require("../controllers/poController/dashboardController");
const { uploadSDBGFile } = require("../lib/fileUpload");

router.post("/", [veifyAccessToken], (req, res) => {
  dashboardController.dashboard(req, res);
});

router.get("/subdeptList", [veifyAccessToken], (req, res) => {
  dashboardController.list(req, res);
});
router.get("/empList", [veifyAccessToken], (req, res) => {
  dashboardController.assigneeList(req, res);
});






module.exports = router;