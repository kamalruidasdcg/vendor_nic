const express = require("express");
const router = express.Router();
const { upload, uploadTNCMinuts } = require("../lib/fileUpload");
const uploadController = require("../controllers/uploadController");

router.post("/", upload.single("file"), uploadController.uploadImage);
router.post("/tncminutes", [uploadTNCMinuts.single("file")], (req, res) => {
    uploadController.uploadTNCMinuts(req, res);
});

module.exports = router;
