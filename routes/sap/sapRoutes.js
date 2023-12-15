const router = require("express").Router();
const materialController = require("../../controllers/sapController/materialController");
const paymentController = require("../../controllers/sapController/paymentController");
const poDocsController = require("../../controllers/sapController/poDocsController");
const { dynamicallyUpload } = require("../../lib/fileUpload");



/**
 * SAP API START 
 * 
 */
// MATERIRLA ROUTE START -> 
const mPrefix = "/material";
router.get("/", (req, res) => {
    materialController.list(req, res);
});


// MATERIAL ROUTE END 

// <--- PAYMENT ROUTE START
const paymentPrefix = "/payment";

router.post(paymentPrefix + "/voucher", [dynamicallyUpload.single("file")], (req, res) => {
    paymentController.addPaymentVoucher(req, res);
});

router.post(paymentPrefix + "/advise", [dynamicallyUpload.single("file")], (req, res) => {
    paymentController.addPaymentAdvise(req, res);
});

// PAYMENT ROUTE END --->

// <--- GATE GRN ICGR API START
const prefix = "/po"
router.post(prefix+"/grn", [dynamicallyUpload.single("file")], (req, res) => {
    poDocsController.grn(req, res);
});
router.post(prefix+"/icgrn", [dynamicallyUpload.single("file")], (req, res) => {
    poDocsController.icgrn(req, res);
});
router.post(prefix+"/gateentry", [dynamicallyUpload.single("file")], (req, res) => {
    poDocsController.gateEntry(req, res);
});


// GATE GRN ICGRN API END --->

module.exports = router;