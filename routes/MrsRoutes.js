
const express = require("express");
const router = express.Router();
const MrsController = require("../controllers/poController/MrsController");
const { mrsUpload } = require("../lib/fileUpload");
const { veifyAccessToken, } = require("../services/jwt.services");

// 

router.post("/", [veifyAccessToken, mrsUpload.single("file")], (req, res) => {
    MrsController.Mrs(req, res);
});

router.get("/list", [veifyAccessToken], (req, res) => {
    MrsController.List(req, res);
});



module.exports = router;