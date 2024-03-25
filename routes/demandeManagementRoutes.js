
const express = require("express");
const router = express.Router();
const demandeManagementController = require("../controllers/poController/demandeManagementController");
const { veifyAccessToken, } = require("../services/jwt.services");

// insert, list, getActualQuantity

router.post("/insert", [veifyAccessToken], (req, res) => {
    demandeManagementController.insert(req, res);
});

router.get("/list", [veifyAccessToken], (req, res) => {
    demandeManagementController.list(req, res);
});

router.get("/getRestAmount", [veifyAccessToken], (req, res) => {
    demandeManagementController.getRestAmount(req, res);
});

module.exports = router;