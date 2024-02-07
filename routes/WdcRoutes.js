const express = require("express");
const { veifyAccessToken, authorizeRoute } = require("../services/jwt.services");
const router = express.Router();
const sdbgController = require("../controllers/poController/sdbgController");
const WdcController = require("../controllers/poController/WdcController");

const { uploadSDBGFile, dynamicallyUpload } = require("../lib/fileUpload");
const { unlockPrivilege } = require("../services/auth.services");


// PO DRAWING CONTROLLER

router.post("/submitWdc", [veifyAccessToken, dynamicallyUpload.single("file")], WdcController.wdc);
router.get("/wdcList", [veifyAccessToken], WdcController.list);
// 




module.exports = router;