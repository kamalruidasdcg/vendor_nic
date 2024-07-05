
const router = require("express").Router();

const authController = require("../controllers/authConroller/authController");

// auth route
router.post("/login", [], (req, res) => {
    authController.login(req, res);
  });
router.post("/sendOtp", [], (req, res) => {
    authController.sendOtp(req, res);
  });
  
  router.post("/otpVefify", [], (req, res) => {
    authController.otpVefify(req, res);
  });
  
  module.exports = router;


