
const router = require("express").Router();

const authController = require("../controllers/authController");

// auth route
router.post("/login", [], (req, res) => {
    authController.login(req, res);
  });


  module.exports = router;


