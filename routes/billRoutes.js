
const express = require("express");
const router = express.Router();
const billController = require("../controllers/poController/billRegistrationController");
const { uploadInvoice } = require("../lib/fileUpload");
const { veifyAccessToken,  } = require("../services/jwt.services");

///

router.get("/poList", (req, res) => {
    billController.fetchpo(req, res);
})
router.get("/officers", (req, res) => {
    billController.fetchOfficers(req, res);
})

router.post("/registration", [veifyAccessToken, uploadInvoice.single("file")], (req, res) => {
    billController.addBill(req, res);
});

router.get("/all", [], (req, res) => {
    billController.fetchBills(req, res);
});
router.get("/vendorbills", [veifyAccessToken], (req, res) => {
    billController.fetchVendorBills(req, res);
});
router.get("/get/:zbtno", [], (req, res) => {
    billController.fetchBill(req, res);
});
router.post("/update/:zbtno", [veifyAccessToken], (req, res) => {
    billController.updateBill(req, res);
});
router.post("/certify/:zbtno", [], (req, res) => {
    billController.certifyBill(req, res);
})
router.post("/forwardToDepartment/:zbtno", [], (req, res) => {
    billController.forwardBillToDepartment(req, res);
});


module.exports = router;