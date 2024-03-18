const express = require("express");
const router = express.Router();
const { uploadBTNs } = require("../lib/fileUpload");
const { veifyAccessToken } = require("../services/jwt.services");
const { fetchAllBTNs, submitBTN } = require("../controllers/btnControllers");

router.get("/", [], (req, res) => {
  fetchAllBTNs(req, res);
});
router.post(
  "/BillsMaterialHybrid",
  uploadBTNs.fields([
    { name: "e_invoice_filename", maxCount: 1 },
    { name: "c_sdbg_filename", maxCount: 1 },
  ]),
  (req, res) => {
    submitBTN(req, res);
  }
);

module.exports = router;
