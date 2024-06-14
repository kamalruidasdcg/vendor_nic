const express = require("express");
const { veifyAccessToken, authorizeRoute } = require("../services/jwt.services");
const router = express.Router();
const drawingController = require("../controllers/poController/drawingController");

const { uploadSDBGFile, dynamicallyUpload } = require("../lib/fileUpload");
const { unlockPrivilege } = require("../services/auth.services");


// PO DRAWING CONTROLLER

router.post("/submitDrawing", [veifyAccessToken, dynamicallyUpload.single("file")], drawingController.submitDrawing);
router.get("/drawingList", [veifyAccessToken], drawingController.list);
// 

router.get("/assigneeList", [veifyAccessToken], (req, res) => {
    drawingController.assigneeList(req, res);
  });

  router.get("/getCurrentAssignee", [veifyAccessToken], (req, res) => {
    drawingController.getCurrentAssignee(req, res);
  });

module.exports = router;