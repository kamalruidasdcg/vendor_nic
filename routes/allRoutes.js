const express = require("express");
const {
  fetchpo,
  fetchOfficers,
  addBill,
  fetchBills,
} = require("../controllers/allControllers");

const { getFilteredData, updatTableData, insertTableData } = require("../controllers/genralControlles");
const { auth } = require("../controllers/auth");
// const paymentControllers = require("../controllers/paymentControllers");
// const poController = require("../controllers/poController");
const drawingController = require("../controllers/poController/drawingController");
// const sdbgController = require("../controllers/poController/sdbgController");
const qapController = require("../controllers/poController/qapController");
const generalController = require("../controllers/poController/poGeneralController");
const logController = require("../controllers/poController/logController");
// const inspectionCallLetterController = require("../controllers/poController/inspectionCallLetterController");
const WdcController = require("../controllers/poController/WdcController");
const shippingDocumentsController = require("../controllers/poController/shippingDocumentsController");
const icgrnController = require("../controllers/poController/icgrnController");
const paymentAdviseController = require("../controllers/poController/paymentAdviseController");
// const downloadController = require("../controllers/poController/poDownloadController");
const { uploadExcelFile, uploadDrawingFile, uploadSDBGFile, dynamicallyUpload } = require("../lib/fileUpload");
const { veifyAccessToken, authorizeRoute } = require("../services/jwt.services");
// const { unlockPrivilege } = require("../services/auth.services");
const router = express.Router();
const billRoutes = require("./billRoutes");
// const paymentRoutes = require("./paymentRouter");
const sdbgRoutes = require("./sdbgRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const downloadRoutes = require("./downloadRoutes");
const inspectionCallLetterRoutes = require("./inspectionCallLetterRoutes");
const shippingDocumentsRoutes = require("./shippingDocumentsRoutes");
const materialRoutes = require("./materialRouter");
const deptRoutes = require("./dept/deptRoutes");
const { sendReminderMail } = require("../controllers/sapController/remaiderMailSendController");
const { createTable } = require("../lib/createTableFromJson");
const { resSend } = require("../lib/resSend");


// FOR CHECHING SERVER IS RUNNING ...
router.get("/ping", async (req, res) => {
  res.status(200).json({ success: true, data: { queryData: req.query, re }, message: "SERVER IS RUNNING " })
});
router.get("/createTable", async (req, res) => {
  try {
    const re = await createTable();
    resSend(res, true, 200, "success fully create table", re, "");
    
  } catch (error) {
    resSend(res, false, 400, "table not created", {}, "");
  }
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

router.get("/reminder", sendReminderMail);

// VENDOR BILL RECEIVE, CERTIFIED REJECT FORWARD 

// router.get("/fetchBill/:zbtno", [veifyAccessToken, authorizeRoute], fetchBill);
// router.post("/updateBill/:zbtno", [veifyAccessToken, authorizeRoute], updateBill);
// router.post("/certifyBill/:zbtno", [veifyAccessToken, authorizeRoute], certifyBill);
// router.post("/forwardToDepartment/:zbtno", [veifyAccessToken, authorizeRoute], forwardBillToDepartment);



// PO BILL APIS
router.use("/bill", billRoutes);
router.use("/dept",deptRoutes);

// router.get("/fetchBill/:zbtno", [veifyAccessToken, authorizeRoute], fetchBill);
// router.post("/updateBill/:zbtno", [veifyAccessToken, authorizeRoute], updateBill);
// router.post("/certifyBill/:zbtno", [veifyAccessToken, authorizeRoute], certifyBill);
// router.post("/forwardToDepartment/:zbtno", [veifyAccessToken, authorizeRoute], forwardBillToDepartment);

// PAYMENT APIS
const paymentPrefix = "/payment";
router.use("/payment", billRoutes);
const poPrefix = "/po";
router.use(poPrefix + "/sdbg", sdbgRoutes);
router.use(poPrefix + "/dashboard", dashboardRoutes);
router.use(poPrefix + "/download", downloadRoutes);
router.use(poPrefix + "/inspectionCallLetter", inspectionCallLetterRoutes);
router.use(poPrefix + "/shippingDocuments", shippingDocumentsRoutes);
router.use(poPrefix + "/material", materialRoutes);

// router.post(paymentPrefix + "/add", [], [veifyAccessToken, authorizeRoute], (req, res) => {
//   paymentControllers.newPayment(req, res);
// });

// router.post(paymentPrefix + "/update/:pId", [], [veifyAccessToken, authorizeRoute], (req, res) => {
//   paymentControllers.updatePayment(req, res);
// });

// router.post(paymentPrefix + "/delete/:pId", [], [veifyAccessToken, authorizeRoute], (req, res) => {
//   paymentControllers.deletePayment(req, res);
// });

// router.get(paymentPrefix + "/allPayments", [], [veifyAccessToken, authorizeRoute], (req, res) => {
//   paymentControllers.allPaymentList(req, res);
// });


// router.post(paymentPrefix + "/addByXLS",
//   [veifyAccessToken, authorizeRoute],
//   uploadExcelFile.single("file"),
//   paymentControllers.updoadExcelFileController);


// PO details

router.get(poPrefix + "/poList", [veifyAccessToken], (req, res) => {
  generalController.poList(req, res);
});

router.get(poPrefix + "/details", [veifyAccessToken], (req, res) => {
  generalController.details(req, res);
});

router.post(poPrefix + "/deptwiselog", [], (req, res) => {
  logController.getLogList(req, res);
});


// PO DRAWING CONTROLLER

router.post(poPrefix + "/drawing", [dynamicallyUpload.single("file")], (req, res) => {
  drawingController.submitDrawing(req, res);
});
router.get(poPrefix + "/drawingList", [], (req, res) => {
  drawingController.list(req, res);
});

// END OF DRAWING CONTROLLER


// router.post(poPrefix + "/inspectionCallLetter", [dynamicallyUpload.single("file")], (req, res) => {
//   inspectionCallLetterController.inspectionCallLetter(req, res);
// });
// ListOfInspectionCallLetter
// router.get(poPrefix + '/ListOfInspectionCallLetter', inspectionCallLetterController.List);

// Wdc
router.post(poPrefix + "/wdc", WdcController.wdc);
router.get(poPrefix + '/ListOfWdc', WdcController.List);

// ListOfShippingDocuments
router.post(poPrefix + "/shippingDocuments", [dynamicallyUpload.single("file")], shippingDocumentsController.shippingDocuments);
router.get(poPrefix + '/ListOfShippingDocuments', shippingDocumentsController.List);

// ICGRN
router.get(poPrefix + '/ListOfIcgrn', icgrnController.List);

// paymentAdviseController
router.get(poPrefix + '/ListOfPaymentAdvise', paymentAdviseController.List);


// file download for sdbg, drawing, qap
// router.get(poPrefix + "/download", [], (req, res) => {
//   downloadController.download(req, res);
// });


// SDBG CONTROLLER

// router.post(poPrefix + "/sdbg", [veifyAccessToken, uploadSDBGFile.single("file")], (req, res) => {
//   sdbgController.submitSDBG(req, res);
// });
// router.use(poPrefix + "/sdbg", paymentRoutes);

// router.post(poPrefix + "/sdbgUnlock", [veifyAccessToken, unlockPrivilege], (req, res) => {
//   sdbgController.unlock(req, res);
// });

// router.get(poPrefix + "/sdbgList", [], (req, res) => {
//   sdbgController.list(req, res);
// });


// QAP CONTROLLERS
router.post(poPrefix + "/qap", [veifyAccessToken, dynamicallyUpload.single("file")], (req, res) => {
  qapController.submitQAP(req, res);
});
router.get(poPrefix + "/qapList", [veifyAccessToken], (req, res) => {
  qapController.list(req, res);
});

//internalDepartmentList
router.get(poPrefix + "/internalDepartmentList", [], (req, res) => {
  qapController.internalDepartmentList(req, res);
});

router.get(poPrefix + "/internalDepartmentEmpList", [], (req, res) => {
  qapController.internalDepartmentEmpList(req, res);
});


module.exports = router;
