const router = require("express").Router();
const sdbgRoutes =  require("./sdbgRoutes");
const paymentRoutes =  require("./paymentRoutes");
const poGeneralRoutes =  require("./poGeneralRoutes");
const sapTestRoutes =  require("./testRoutes");
const materialRoutes =  require("./materialRoutes");
const wbsRoutes =  require("./wbsElementRoutes");
const qaRoutes =  require("./qaRoutes");
const masterDataRoutes =  require("./masterDataRoutes");
const storeRoutes =  require("./storeRoutes");
const userRoutes =  require("./userRoutes");
const docRoutes =  require("./documentRoutes");

/**
 * SAP API START 
 * 
 */

// SDBG ROUTES

router.use("/sdbg", sdbgRoutes);
router.use("/payment", paymentRoutes);
router.use("/po", poGeneralRoutes);
router.use("/wbs", wbsRoutes);
router.use("/test", sapTestRoutes);
router.use("/material", materialRoutes);
router.use("/mdata", masterDataRoutes);
router.use("/store",storeRoutes );
router.use("/qa", qaRoutes);
router.use("/user", userRoutes);
router.use("/document", docRoutes);

// router.post("/po", [], (req, res) => {
//     dataInsert.insertPOData(req, res);
//   });

// MATERIRLA ROUTE START -> 
// const mPrefix = "/material";
// router.get("/", (req, res) => {
//     materialController.list(req, res);
// });


// MATERIAL ROUTE END 

// <--- PAYMENT ROUTE START
// const paymentPrefix = "/payment";

// router.post(paymentPrefix + "/voucher", [dynamicallyUpload.single("file")], (req, res) => {
//     paymentController.addPaymentVoucher(req, res);
// });

// router.post(paymentPrefix + "/advise", [dynamicallyUpload.single("file")], (req, res) => {
//     paymentController.addPaymentAdvise(req, res);
// });

// PAYMENT ROUTE END --->

// <--- GATE GRN ICGR API START
// const prefix = "/po"
// router.post(prefix+"/grn", [dynamicallyUpload.single("file")], (req, res) => {
//     poDocsController.grn(req, res);
// });
// router.post(prefix+"/icgrn", [dynamicallyUpload.single("file")], (req, res) => {
//     poDocsController.icgrn(req, res);
// });
// router.post(prefix+"/gateentry", [dynamicallyUpload.single("file")], (req, res) => {
//     poDocsController.gateEntry(req, res);
// });


// GATE GRN ICGRN API END --->

////////////// STRAT SDBG PAYMENT ADVICE //////////////
// let suffix = "ZFI_BGM_1";
// router.post("/sdbgPaymentAdvice/"+suffix, [], (req, res) => {
//     sdbgController.sdbgPaymentAdvice(req, res);
// });

////////////// STRAT SDBG PAYMENT ADVICE //////////////
module.exports = router;