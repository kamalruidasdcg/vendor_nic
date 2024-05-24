const express = require("express");
const {
  fetchpo,
  fetchOfficers,
  addBill,
  fetchBills,
} = require("../controllers/allControllers");

const { getFilteredData, updatTableData, insertTableData } = require("../controllers/genralControlles");
// const { auth } = require("../controllers/authConroller/auth");
// const paymentControllers = require("../controllers/paymentControllers");
// const poController = require("../controllers/poController");
const drawingController = require("../controllers/poController/drawingController");
// const sdbgController = require("../controllers/poController/sdbgController");
const qapController = require("../controllers/poController/qapController");
const generalController = require("../controllers/poController/poGeneralController");
const logController = require("../controllers/poController/logController");
// const inspectionCallLetterController = require("../controllers/poController/inspectionCallLetterController");
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
const drawingRoutes = require("./drawingRoutes");
const wdcRoutes = require("./WdcRoutes");
const ilmsRoutes = require("./ilmsRoutes");
const demandeManagementRoutes = require("./demandeManagementRoutes");

const dashboardRoutes = require("./dashboardRoutes");
const downloadRoutes = require("./downloadRoutes");
const inspectionCallLetterRoutes = require("./inspectionCallLetterRoutes");
const inspectionReleaseNoteRoutes = require("./inspectionReleaseNoteRoutes");

const hrRoutes = require("./hrRoutes");
const vendorActivitiesRoutes = require("./vendorActivitiesRoutes");

const btnRoutes = require("./btnRoutes");

const MrsRoutes = require("./MrsRoutes");
const MirRoutes = require("./MirRoutes");

const shippingDocumentsRoutes = require("./shippingDocumentsRoutes");
const materialRoutes = require("./materialRouter");
const deptRoutes = require("./dept/deptRoutes");
const { sendReminderMail } = require("../controllers/sapController/remaiderMailSendController");
const { createTable } = require("../lib/createTableFromJson");


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
// router.post("/login", auth);

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

router.post("/createTable", async (req, res) => {


  try {

    const succ = await createTable(req.body);
    console.log(succ);
    res.status(200).json({ success: true, data: { queryData: req.query, api: succ }, message: "ping pong" })
  } catch (error) {
    res.status(500).json({ success: true, data: error, message: "error" })
   
  }
});


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
router.use(poPrefix + "/drawing", drawingRoutes);
router.use(poPrefix + "/wdc", wdcRoutes);
router.use(poPrefix + "/ilms", ilmsRoutes);

router.use(poPrefix + "/dashboard", dashboardRoutes);
router.use(poPrefix + "/download", downloadRoutes);
router.use(poPrefix + "/inspectionCallLetter", inspectionCallLetterRoutes);
router.use(poPrefix + "/inspectionReleaseNote", inspectionReleaseNoteRoutes);

//demandeManagement
router.use(poPrefix + "/demandeManagement", demandeManagementRoutes);
router.use(poPrefix + "/hr", hrRoutes);
router.use(poPrefix + "/vendor", vendorActivitiesRoutes);

router.use(poPrefix + "/Mrs", MrsRoutes);
router.use(poPrefix + "/Mir", MirRoutes);

router.use(poPrefix + "/shippingDocuments", shippingDocumentsRoutes);
router.use(poPrefix + "/material", materialRoutes);

// BTNs
router.use(poPrefix + "/btn", btnRoutes);

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




// END OF DRAWING CONTROLLER


// router.post(poPrefix + "/inspectionCallLetter", [dynamicallyUpload.single("file")], (req, res) => {
//   inspectionCallLetterController.inspectionCallLetter(req, res);
// });
// ListOfInspectionCallLetter
// router.get(poPrefix + '/ListOfInspectionCallLetter', inspectionCallLetterController.List);



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
const { qapMfw } = require("../services/qapMfw");
const upload = qapMfw();
router.post(poPrefix + "/qap", [veifyAccessToken, upload], (req, res) => {
  qapController.submitQAP(req, res);
});
router.get(poPrefix + "/qapList", [veifyAccessToken], (req, res) => {
  qapController.list(req, res);
});

// QAP SAVE getQapSave deleteQapSave
router.post(poPrefix + "/insertQapSave", [veifyAccessToken, dynamicallyUpload.single("file")], (req, res) => {
  qapController.insertQapSave(req, res);
});

router.get(poPrefix + "/deleteQapSave", [veifyAccessToken], (req, res) => {
  qapController.deleteQapSave(req, res);
});

router.get(poPrefix + "/getQapSave", [veifyAccessToken], (req, res) => {
  qapController.getQapSave(req, res);
})


//internalDepartmentList
router.get(poPrefix + "/internalDepartmentList", [], (req, res) => {
  qapController.internalDepartmentList(req, res);
});

router.get(poPrefix + "/internalDepartmentEmpList", [], (req, res) => {
  qapController.internalDepartmentEmpList(req, res);
});


module.exports = router;
