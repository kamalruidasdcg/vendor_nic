
const router = require("express").Router();
const paymentController = require("../../controllers/sapController/paymentController");
const { dynamicallyUpload } = require("../../lib/fileUpload");


router.post("/voucher", [dynamicallyUpload.single("file")], (req, res) => {
    paymentController.addPaymentVoucher(req, res);
});

router.post("/advise", [dynamicallyUpload.single("file")], (req, res) => {
    paymentController.addPaymentAdvise(req, res);
});
router.post("/ztfi_bil_deface", [], (req, res) => {
    paymentController.ztfi_bil_deface(req, res);
});

module.exports = router;