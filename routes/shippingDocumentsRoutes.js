
const express = require("express");
const router = express.Router();
const controllers = require("../controllers/poController/shippingDocumentsController");
const { shippingDocuemntsUpload } = require("../lib/fileUpload");
const { veifyAccessToken, } = require("../services/jwt.services");


router.post("/", [veifyAccessToken, shippingDocuemntsUpload.single("file")], (req, res) => {
    controllers.shippingDocuments(req, res);
});

router.get("/list", [], (req, res) => {
    controllers.List(req, res);
});



module.exports = router;