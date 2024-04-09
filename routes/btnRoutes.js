const express = require("express");
const router = express.Router();
const {
  fetchAllBTNs,
  submitBTN,
  fetchBTNByNum,
  getBTNData,
  submitBTNByDO,
  fetchBTNByNumForDO,
} = require("../controllers/btnControllers");
const {
  submitBtnServiceHybrid,
} = require("../controllers/btnServiceHybridControllers");

const { btnmw } = require("../services/btnmw");
const { veifyAccessToken } = require("../services/jwt.services");

router.get("/", [], (req, res) => {
  fetchAllBTNs(req, res);
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


//// Btn Service Hybrid ////
///////////////////////////
router.post("/submitBtnServiceHybrid", [veifyAccessToken, upload], (req, res) => {
  submitBtnServiceHybrid(req, res);
})
//// Btn Service Hybrid ////
///////////////////////////


module.exports = router;
