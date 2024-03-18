const express = require("express");
const { veifyAccessToken, authorizeRoute } = require("../services/jwt.services");
const router = express.Router();
const controller = require("../controllers/poController/materialController");
const { dynamicallyUpload } = require("../lib/fileUpload");


router.post("/wmc", [veifyAccessToken], [dynamicallyUpload.single("file")], (req, res) => {
  controller.wmcInsert(req, res);
});

router.get("/wmc/list", [], [veifyAccessToken], (req, res) => {
  controller.wmcList(req, res);
});
router.post("/mrs", [veifyAccessToken], [dynamicallyUpload.single("file")], (req, res) => {
  controller.mrsInsert(req, res);
});

router.get("/mrs/list", [], [veifyAccessToken], (req, res) => {
  controller.mrsList(req, res);
});
router.post("/issue/list", [], (req, res) => {
  controller.materialIssue(req, res);
});


module.exports = router;