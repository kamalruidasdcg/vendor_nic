const express = require("express");
const { wdcmw } = require("../services/wdcmw");
const { veifyAccessToken, authorizeRoute } = require("../services/jwt.services");
const router = express.Router();
const sdbgController = require("../controllers/poController/sdbgController");
const WdcController = require("../controllers/poController/WdcController");

const { uploadSDBGFile, dynamicallyUpload } = require("../lib/fileUpload");
const { unlockPrivilege } = require("../services/auth.services");


// PO DRAWING CONTROLLER
const upload = wdcmw();

router.post("/submitWdc", [veifyAccessToken, upload], WdcController.wdc);
router.get("/wdcList", [veifyAccessToken], WdcController.list);
router.get("/grseEmpList", [veifyAccessToken], WdcController.grseEmpList);
// 




module.exports = router;