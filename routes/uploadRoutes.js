const express = require("express");
const router = express.Router();
const { upload } = require("../lib/fileUpload");
const { uploadImage } = require("../controllers/uploadController");

router.post("/", upload.single("file"), uploadImage);

module.exports = router;
