const router = require("express").Router();
const materialController = require("../../controllers/sapController/materialController");
const paymentController = require("../../controllers/sapController/paymentController");
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

// PAYMENT ROUTE START -> 
const paymentPrefix = "/payment";

router.post(paymentPrefix + "/voucher", [dynamicallyUpload.single("file")], (req, res) => {
    paymentController.addPaymentAdvice(req, res);
});

// PAYMENT ROUTE END

module.exports = router;