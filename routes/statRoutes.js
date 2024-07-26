const router = require("express").Router();
const {
  statsForBG,
  statsForBTN,
  statsForQA,
} = require("../controllers/statControllers");
const { veifyAccessToken } = require("../services/jwt.services");

router.get("/bg", [veifyAccessToken], (req, res) => statsForBG(req, res));
router.post("/btn", [veifyAccessToken], (req, res) => statsForBTN(req, res));
router.get("/QA", [veifyAccessToken], (req, res) => statsForQA(req, res));
module.exports = router;
