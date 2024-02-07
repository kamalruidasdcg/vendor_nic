const express = require("express");
const router = express.Router();
const { upload, uploadTNCMinuts } = require("../lib/fileUpload");
const uploadController = require("../controllers/uploadController");
const { veifyAccessToken } = require("../services/jwt.services");

router.post("/", upload.single("file"), uploadController.uploadImage);

router.post("/tncminutes", [veifyAccessToken, uploadTNCMinuts.single("file")], (req, res, next) => {
    uploadController.uploadTNCMinuts(req, res);
});

module.exports = router;
