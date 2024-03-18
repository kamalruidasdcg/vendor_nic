
const express = require("express");
const router = express.Router();
const MirController = require("../controllers/poController/MirController");
const { mirUpload } = require("../lib/fileUpload");
const { veifyAccessToken, } = require("../services/jwt.services");

// 

router.post("/", [veifyAccessToken, mirUpload.single("file")], (req, res) => {
    MirController.Mir(req, res);
});

router.get("/list", [veifyAccessToken], (req, res) => {
    MirController.list(req, res);
});



module.exports = router;