const express = require("express");
const {
  fetchVenders,
  fetchpo,
  fetchOfficers,
  addBill,
  fetchBills,
  fetchBill,
  updateBill,
  certifyBill,
  forwardBillToDepartment,
} = require("../controllers/allControllers");

const { getFilteredData, updatTableData, insertTableData } = require("../controllers/genralControlles");
const { auth } = require("../controllers/auth");
const paymentControllers = require("../controllers/paymentControllers");
const poController = require("../controllers/poController");
const drawingController = require("../controllers/poController/drawingController");
const sdbgController = require("../controllers/poController/sdbgController");
const qapController = require("../controllers/poController/qapController");
const generalController = require("../controllers/poController/poGeneralController");
const inspectionCallLetterController = require("../controllers/poController/inspectionCallLetterController");
const WdcController = require("../controllers/poController/WdcController");
const shippingDocumentsController = require("../controllers/poController/shippingDocumentsController");
const icgrnController = require("../controllers/poController/icgrnController");
const paymentAdviseController = require("../controllers/poController/paymentAdviseController");
const { uploadExcelFile, uploadDrawingFile, uploadSDBGFile, dynamicallyUpload } = require("../lib/fileUpload");
const { veifyAccessToken, authorizeRoute } = require("../services/jwt.services");
const router = express.Router();


// FOR CHECHING SERVER IS RUNNING ...
router.get("/ping", async (req, res) => {
  res.status(200).json({ success: true, data: { queryData: req.query }, message: "SERVER IS RUNNING " })
});

router.get("/userping", veifyAccessToken, async (req, res) => {
  res.status(200).json({ success: true, data: { queryData: req.query, pingId: req.params.id }, message: "ping pong" })
});


// VENDOR BILL APIS

router.get("/po", [veifyAccessToken, authorizeRoute], fetchpo);
// router.get("/vendor/:po", fetchVenders);
router.get("/officers", [veifyAccessToken, authorizeRoute], fetchOfficers);
router.post("/addBill", [veifyAccessToken, authorizeRoute], addBill);
router.post("/fetchBills", [veifyAccessToken, authorizeRoute], fetchBills);
router.post("/login", auth);

// GENERAL GET AND UPDATE ROUTE

router.get("/getFilteredData", getFilteredData);
router.post("/updatTableData", updatTableData);
router.post("/insertTableData", insertTableData);


// VENDOR BILL RECEIVE, CERTIFIED REJECT FORWARD 

router.get("/fetchBill/:zbtno", [veifyAccessToken, authorizeRoute], fetchBill);
router.post("/updateBill/:zbtno", [veifyAccessToken, authorizeRoute], updateBill);
router.post("/certifyBill/:zbtno", [veifyAccessToken, authorizeRoute], certifyBill);
router.post("/forwardToDepartment/:zbtno", [veifyAccessToken, authorizeRoute], forwardBillToDepartment);



// PAYMENT APIS
const paymentPrefix = "/payment";

router.post(paymentPrefix + "/add", [], [veifyAccessToken, authorizeRoute], (req, res) => {
  paymentControllers.newPayment(req, res);
});

router.post(paymentPrefix + "/update/:pId", [], [veifyAccessToken, authorizeRoute], (req, res) => {
  paymentControllers.updatePayment(req, res);
});

router.post(paymentPrefix + "/delete/:pId", [], [veifyAccessToken, authorizeRoute], (req, res) => {
  paymentControllers.deletePayment(req, res);
});

router.get(paymentPrefix + "/allPayments", [], [veifyAccessToken, authorizeRoute], (req, res) => {
  paymentControllers.allPaymentList(req, res);
});


router.post(paymentPrefix + "/addByXLS",
  [veifyAccessToken, authorizeRoute],
  uploadExcelFile.single("file"),
  paymentControllers.updoadExcelFileController);


// PO details

const poPrefix = "/po";


router.get(poPrefix + "/poList", [], (req, res) => {
  generalController.poList(req, res);
});

router.get(poPrefix + "/details", [], (req, res) => {
  generalController.details(req, res);
});

// PO DRAWING CONTROLLER

// router.post(poPrefix + "/add", [dynamicallyUpload.single("file")], (req, res) => {
//   poController.addDrawing(req, res);
// });

router.post(poPrefix + "/drawing", [dynamicallyUpload.single("file")], (req, res) => {
  drawingController.submitDrawing(req, res);
});
router.get(poPrefix + "/drawingList", [], (req, res) => {
  drawingController.list(req, res);
});

// END OF DRAWING CONTROLLER


router.post(poPrefix + "/inspectionCallLetter", [dynamicallyUpload.single("file")], (req, res) => {
  inspectionCallLetterController.inspectionCallLetter(req, res);
});
// ListOfInspectionCallLetter
router.get(poPrefix + '/ListOfInspectionCallLetter', inspectionCallLetterController.List);

// Wdc
router.post(poPrefix + "/wdc", WdcController.wdc);
router.get(poPrefix + '/ListOfWdc', WdcController.List);

// ListOfShippingDocuments
router.post(poPrefix + "/shippingDocuments", shippingDocumentsController.shippingDocuments);
router.get(poPrefix + '/ListOfShippingDocuments', shippingDocumentsController.List);

// ICGRN
router.get(poPrefix + '/ListOfIcgrn', icgrnController.List);

// paymentAdviseController
router.get(poPrefix + '/ListOfPaymentAdvise', paymentAdviseController.List);



router.get(poPrefix + "/download", [], (req, res) => {
  poController.download(req, res);
});


// SDBG CONTROLLER

router.post(poPrefix + "/sdbg", [uploadSDBGFile.single("file")], (req, res) => {
  sdbgController.submitSDBG(req, res);
});
router.get(poPrefix + "/sdbgList", [], (req, res) => {
  sdbgController.list(req, res);
});


// router.post(poPrefix + "/addSDBG", [uploadSDBGFile.single("file")], (req, res) => {
//   poController.addSDBG(req, res);
// });

// router.post(poPrefix + "/sdbgResubmission", [uploadSDBGFile.single("file")], (req, res) => {
//   poController.sdbgResubmission(req, res);
// });
// router.post(poPrefix + "/drawingResubmission", [dynamicallyUpload.single("file")], (req, res) => {
//   poController.drawingResubmission(req, res);
// });

// router.post(poPrefix + "/sdbgAcknowledgement", [uploadSDBGFile.single("file")], (req, res) => {
//   poController.sdbgAcknowledgement(req, res);
// });


// router.get(poPrefix + "/downloadSDBG", [], (req, res) => {
//   poController.downloadSDBG(req, res);
// });

// router.get(poPrefix + "/getAllSDBG", [], (req, res) => {
//   poController.getAllSDBG(req, res);
// });




// QAP CONTROLLERS
router.post(poPrefix + "/qap", [dynamicallyUpload.single("file")], (req, res) => {
  qapController.submitQAP(req, res);
});
router.get(poPrefix + "/qapList", [], (req, res) => {
  qapController.list(req, res);
});

// QAP CONTROLLER END


// router.post(poPrefix + "/addQAP", [dynamicallyUpload.single("file")], (req, res) => {
//   poController.addQAP(req, res);
// });
// router.post(poPrefix + "/qapResubmission", [dynamicallyUpload.single("file")], (req, res) => {
//   poController.qapResubmission(req, res);
// });


module.exports = router;
