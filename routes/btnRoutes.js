const express = require("express");
const router = express.Router();
const {
  fetchAllBTNs,
  submitBTN,
  fetchBTNByNum,
  getBTNData,
} = require("../controllers/btnControllers");
const { btnmw } = require("../services/btnmw");

router.get("/", [], (req, res) => {
  fetchAllBTNs(req, res);
});
router.get("/getBTNData", [], (req, res) => {
  getBTNData(req, res);
});

router.get("/btn_num", [], (req, res) => {
  fetchBTNByNum(req, res);
});

const upload = btnmw();
router.post("/BillsMaterialHybrid", upload, (req, res) => {
  submitBTN(req, res);
});

module.exports = router;
