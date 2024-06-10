const router = require("express").Router();
const { veifyAccessToken } = require("../services/jwt.services");

const statControllers = require("../controllers/poController/statControllers");

router.post("/statcontroller", [veifyAccessToken], (req, res) => {
  statControllers.statcontroller(req, res);
});
module.exports = router;
