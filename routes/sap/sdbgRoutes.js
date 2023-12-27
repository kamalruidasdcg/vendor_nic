
const router = require("express").Router();
const sdbgController = require("../../controllers/sapController/sdbgController");
const { dynamicallyUpload } = require("../../lib/fileUpload");



////////////// STRAT SDBG PAYMENT ADVICE //////////////
let suffix = "ZFI_BGM_1";
router.post("/paymentAdvice/"+suffix, [], (req, res) => {
    sdbgController.sdbgPaymentAdvice(req, res);
});


////////////// STRAT SDBG PAYMENT ADVICE //////////////
module.exports = router;