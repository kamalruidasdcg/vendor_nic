const router = require("express").Router();
const { statsForBG, statsForBTN } = require("../controllers/statControllers");
const { veifyAccessToken } = require("../services/jwt.services");

router.get("/bg", [veifyAccessToken], (req, res) => statsForBG(req, res));
router.post("/btn", [veifyAccessToken], (req, res) => statsForBTN(req, res));
module.exports = router;
