const express = require("express");
const { veifyAccessToken, authorizeRoute } = require("../services/jwt.services");
const router = express.Router();
const sdbgController = require("../controllers/poController/sdbgController");
const drawingController = require("../controllers/poController/drawingController");

const { uploadSDBGFile, dynamicallyUpload } = require("../lib/fileUpload");
const { unlockPrivilege } = require("../services/auth.services");


// PO DRAWING CONTROLLER

router.post("/submitDrawing", [veifyAccessToken, dynamicallyUpload.single("file")], drawingController.submitDrawing);
router.get("/drawingList", [veifyAccessToken], drawingController.list);
// 




module.exports = router;