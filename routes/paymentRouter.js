const express = require("express");
const { veifyAccessToken, authorizeRoute } = require("../services/jwt.services");
const router = express.Router();
const paymentControllers = require("../controllers/paymentControllers");
const { uploadExcelFile } = require("../lib/fileUpload");


router.post("/add", [], [veifyAccessToken, authorizeRoute], (req, res) => {
    paymentControllers.newPayment(req, res);
  });
  
  router.post("/update/:pId", [], [veifyAccessToken, authorizeRoute], (req, res) => {
    paymentControllers.updatePayment(req, res);
  });
  
  router.post("/delete/:pId", [], [veifyAccessToken, authorizeRoute], (req, res) => {
    paymentControllers.deletePayment(req, res);
  });
  
  router.get("/all", [], [veifyAccessToken, authorizeRoute], (req, res) => {
    paymentControllers.allPaymentList(req, res);
  });

  router.post("/addByXLS",
  [veifyAccessToken, authorizeRoute],
  uploadExcelFile.single("file"),
  paymentControllers.updoadExcelFileController);


  module.exports = router;