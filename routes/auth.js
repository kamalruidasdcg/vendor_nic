const router = require("express").Router();

const authController = require("../controllers/authConroller/authController");
const { veifyAccessToken } = require("../services/jwt.services");

// auth route
router.post("/login", [], (req, res) => {
  authController.login(req, res);
});
router.post("/sendOtp", [], (req, res) => {
  authController.sendOtp(req, res);
});
router.post("/forgotPasswordOtp", [], (req, res) => {
  authController.forgotPasswordOtp(req, res);
});

router.post("/otpVefify", [], (req, res) => {
  authController.otpVefify(req, res);
});

router.post("/setPassword", [], (req, res) => {
  authController.setPassword(req, res);
});

router.post("/updatePassword", [], (req, res) => {
  authController.updatePassword(req, res);
});

router.get("/getListPendingEmp", [veifyAccessToken], (req, res) => {
  authController.getListPendingEmp(req, res);
});

router.post("/acceptedPendingEmp", [veifyAccessToken], (req, res) => {
  authController.acceptedPendingEmp(req, res);
});

module.exports = router;
