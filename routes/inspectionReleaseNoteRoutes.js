
const express = require("express");
const router = express.Router();
const inspectionReleaseNoteController = require("../controllers/poController/inspectionReleaseNoteController");
const { dynamicallyUpload } = require("../lib/fileUpload");
const { veifyAccessToken, } = require("../services/jwt.services");


router.post("/submitIRN", [veifyAccessToken, dynamicallyUpload.single("file")], (req, res) => {
    inspectionReleaseNoteController.inspectionReleaseNote(req, res);
});

router.get("/list", [], (req, res) => {
    inspectionReleaseNoteController.list(req, res);
});



module.exports = router;