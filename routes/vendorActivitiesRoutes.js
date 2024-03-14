
const express = require("express");
const router = express.Router();
const vendorActivitiesController = require("../controllers/poController/vendorActivitiesController");
const { dynamicallyUpload } = require("../lib/fileUpload");
const { veifyAccessToken, } = require("../services/jwt.services");


router.post("/vendorActivities", [veifyAccessToken, dynamicallyUpload.single("file")], (req, res) => {
    vendorActivitiesController.vendorActivities(req, res);
});

router.get("/list", [veifyAccessToken], (req, res) => {
    vendorActivitiesController.list(req, res);
});



module.exports = router;