
const express = require("express");
const router = express.Router();
const MirController = require("../controllers/poController/MirController");
const { mrsUpload } = require("../lib/fileUpload");
const { veifyAccessToken, } = require("../services/jwt.services");

// 

router.post("/", [veifyAccessToken, mrsUpload.single("file")], (req, res) => {
    MirController.Mir(req, res);
});

router.get("/list", [veifyAccessToken], (req, res) => {
    MirController.list(req, res);
});



module.exports = router;