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
const abhController = require("../controllers/poController/advanceBillBTNController");
const {
  submitPbg,
  btnPbgSubmitByDO,
} = require("../controllers/btnPbgControllers");

const {
  submitIncorrectDuct,
  getGstnByPo,
} = require("../controllers/btnIncorrectDuctControllers");

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

/**
 * ADVANCE BILL HYBRID BTN 
 */
router.get("/abh", [veifyAccessToken], (req, res) => {
  abhController.getAdvBillHybridData(req, res);
});

router.post(
  "/submit-abh",
  [veifyAccessToken, btnAdvanceBillHybridUploadFile()],
  (req, res) => {
    abhController.submitAdvanceBillHybrid(req, res);
  }
);

router.post("/submit-abh-do", [veifyAccessToken], (req, res) => {
  // submitAdvanceBillHybrid(req, res);
  abhController.sbhSubmitBTNByDO(req, res);
});
router.post("/submit-abh-fi", [veifyAccessToken], (req, res) => {
  // submitAdvanceBillHybrid(req, res);
  abhController.sbhAssignToFiStaff(req, res);
})
//// Btn submitIncorrectDuct ////
///////////////////////////
router.post("/submitIncorrectDuct", [veifyAccessToken, upload], (req, res) => {
  submitIncorrectDuct(req, res);
});
router.get("/getGstnByPo", [veifyAccessToken], (req, res) => {
  getGstnByPo(req, res);
});
//// Btn submitIncorrectDuct ////
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

router.get("/init-jcc",[], (req, res) => {
  jccBtnController.initJccData(req, res);
} )
router.post("/submit-jcc", [veifyAccessToken, btnJccUploadFile()], (req, res) => {
  jccBtnController.submitJccBtn(req, res);
});

router.get("/jcc", [], (req, res) => {
  jccBtnController.getJccBtnData(req, res);
});

router.post("/submit-jcc-ca", [veifyAccessToken], (req, res) => {
  jccBtnController.jccBtnforwordToFinace(req, res);
});
router.post("/submit-jcc-fi", [veifyAccessToken], (req, res) => {
  jccBtnController.jccBtnAssignToFiStaff(req, res);
});


module.exports = router;
