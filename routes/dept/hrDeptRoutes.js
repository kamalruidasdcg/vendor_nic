
const express = require("express");
const router = express.Router();
const controller = require("../../controllers/deptController/pf");
const { dynamicallyUpload } = require("../../lib/fileUpload");
const { veifyAccessToken } = require("../../services/jwt.services");

///

router.get("/pf/list", (req, res) => {
    controller.pfList(req, res);
})

router.post("/pf", [veifyAccessToken, dynamicallyUpload.single("file")], (req, res) => {
    controller.pfInsert(req, res);
});



module.exports = router;