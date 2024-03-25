
const router = require("express").Router();
const paymentController = require("../../controllers/sapController/paymentController");
const { dynamicallyUpload } = require("../../lib/fileUpload");


router.post("/voucher", [dynamicallyUpload.single("file")], (req, res) => {
    paymentController.addPaymentVoucher(req, res);
});

router.post("/advise", async (req, res) => {
    paymentController.newPaymentAdvice(req, res);
});
router.post("/ztfi_bil_deface", [], (req, res) => {
    paymentController.ztfi_bil_deface(req, res);
});
router.post("/ztfi_bil_deface_report", [], (req, res) => {
    paymentController.ztfi_bil_deface_report(req, res);
});
router.post("/advise/report", [], (req, res) => {
    paymentController.adviceDownload(req, res);
});

module.exports = router;