
const express = require("express");
const router = express.Router();
const inspCallLetterController = require("../controllers/poController/inspectionCallLetterController");
const {  dynamicallyUpload } = require("../lib/fileUpload");
const { veifyAccessToken,  } = require("../services/jwt.services");


router.post("/", [veifyAccessToken, dynamicallyUpload.single("file")], (req, res) => {
    inspCallLetterController.inspectionCallLetter (req, res);
});

router.get("/list", [], (req, res) => {
    inspCallLetterController.List (req, res);
});



module.exports = router;