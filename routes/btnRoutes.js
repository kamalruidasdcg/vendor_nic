const express = require("express");
const router = express.Router();
const {
  // fetchAllBTNs,
  submitBTN,
  fetchBTNByNum,
  getBTNData,
  submitBTNByDO,
  fetchBTNByNumForDO,
  getGrnIcgrnByInvoice,
  fetchBTNList,
  assignToFiStaffHandler,
  getFinanceEmpList,
} = require("../controllers/btnControllers");
const {
  submitBtnServiceHybrid,
  getWdcInfoServiceHybrid,
  initServiceHybrid,
  getBtnData,
  forwordToFinace,
  serviceBtnAssignToFiStaff,
} = require("../controllers/btnServiceHybridControllers");

const jccBtnController = require("../controllers/btnJccController");

const {
  btnmw,
  btnAdvanceBillHybridUploadFile,
  serviceBtnFilesUpload,
  btnJccUploadFile,
} = require("../services/btnmw");
const { veifyAccessToken } = require("../services/jwt.services");
const {
  submitAdvanceBillHybrid,
  getAdvBillHybridData,
  submitAdvBillBTNByDO,
  getAdvBillHybridDataForDO,
  getAdvBillHybridBTN,
} = require("../controllers/poController/advanceBillBTNController");
const {
  submitPbg,
  btnPbgSubmitByDO,
} = require("../controllers/btnPbgControllers");


// HYBRID MATERIAL BTN
router.get("/", [], (req, res) => {
  fetchBTNList(req, res);
});
router.get("/getBTNData", [veifyAccessToken], (req, res) => {
  getBTNData(req, res);
});
router.get("/btn_num", [veifyAccessToken], (req, res) => {
  fetchBTNByNum(req, res);
});

router.get("/btn_do", [veifyAccessToken], (req, res) => {
  fetchBTNByNumForDO(req, res);
});

const upload = btnmw();
// const invSupportDoc = isd();
router.post("/BillsMaterialHybrid", [veifyAccessToken, upload], (req, res) => {
  submitBTN(req, res);
});
router.post(
  "/BillsMaterialHybridByDO",
  [veifyAccessToken, upload],
  (req, res) => {
    submitBTNByDO(req, res);
  }
);

router.post("/getGrnIcgrnByInvoice", [veifyAccessToken], (req, res) => {
  getGrnIcgrnByInvoice(req, res);
});

router.post("/assignToFiStaff", [veifyAccessToken], (req, res) => {
  assignToFiStaffHandler(req, res);
});
// getFinanceEmpList
router.get("/getFinanceEmpList", [veifyAccessToken], (req, res) => {
  getFinanceEmpList(req, res);
});

/**
 * Btn Service Hybrid
 */
router.post(
  "/submitServiceHybrid",
  [veifyAccessToken, serviceBtnFilesUpload()],
  (req, res) => {
    submitBtnServiceHybrid(req, res);
  }
);
// router.get("/getBTNDataServiceHybrid", [], (req, res) => {
//   getBTNDataServiceHybrid(req, res);
// });

router.get("/initServiceHybrid", [veifyAccessToken], (req, res) => {
  initServiceHybrid(req, res);
});
router.post("/submitSBtnByCAuthorty", [veifyAccessToken], (req, res) => {
  forwordToFinace(req, res);
});
router.post("/submitSBtnByFAuthorty", [veifyAccessToken], (req, res) => {
  serviceBtnAssignToFiStaff(req, res);
});

// getWdcInfo
// router.get("/getWdcInfo", [veifyAccessToken], (req, res) => {
//   getWdcInfo(req, res);
// });

// getWdcInfoServiceHybrid
router.get("/getWdcInfoServiceHybrid", [], (req, res) => {
  getWdcInfoServiceHybrid(req, res);
});
router.get("/getServiceBtnData", [], (req, res) => {
  getBtnData(req, res);
});

//// Btn Service Hybrid //////
//////////// END /////////////

//// Btn pbg ////
///////////////////////////
router.post("/submitPbg", [veifyAccessToken, upload], (req, res) => {
  submitPbg(req, res);
});
router.post("/btnPbgSubmitByDO", [veifyAccessToken, upload], (req, res) => {
  btnPbgSubmitByDO(req, res);
});
//// Btn pbg ////
///////////////////////////

router.post(
  "/submitAdvBillHybrid",
  [veifyAccessToken, btnAdvanceBillHybridUploadFile()],
  (req, res) => {
    // submitAdvanceBillHybrid(req, res);
    submitAdvanceBillHybrid(req, res);
  }
);
router.post("/getAdvBillHybrid", [veifyAccessToken], (req, res) => {
  // submitAdvanceBillHybrid(req, res);
  getAdvBillHybridData(req, res);
});
router.post("/getAdvBillHybrid", [veifyAccessToken], (req, res) => {
  // submitAdvanceBillHybrid(req, res);
  getAdvBillHybridData(req, res);
});
router.post("/getAdvBillHybridForDO", [veifyAccessToken], (req, res) => {
  // submitAdvanceBillHybrid(req, res);
  getAdvBillHybridDataForDO(req, res);
});
router.post("/submitAdvBillBTNByDO", [veifyAccessToken], (req, res) => {
  // submitAdvanceBillHybrid(req, res);
  submitAdvBillBTNByDO(req, res);
});
router.post("/getAdvBillHybridBTN", [veifyAccessToken], (req, res) => {
  // submitAdvanceBillHybrid(req, res);
  getAdvBillHybridBTN(req, res);
});



// BTN JCC

router.get("/initJcc",[], (req, res) => {
  jccBtnController.initJccData(req, res);
} )
router.post("/submitJcc", [veifyAccessToken, btnJccUploadFile()], (req, res) => {
  jccBtnController.submitJccBtn(req, res);
});

router.get("/jcc", [], (req, res) => {
  jccBtnController.getJccBtnData(req, res);
});

router.get("/jccInfo", [], (req, res) => {
  jccBtnController.getJcc(req, res);
});

router.post("/submitJccBtnByCAuthorty", [veifyAccessToken], (req, res) => {
  jccBtnController.jccBtnforwordToFinace(req, res);
});
router.post("/submitJccBtnByFAuthorty", [veifyAccessToken], (req, res) => {
  jccBtnController.jccBtnAssignToFiStaff(req, res);
});


module.exports = router;
