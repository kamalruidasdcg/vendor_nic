
const router = require("express").Router();
const controller = require("../../controllers/sapController/materialController");

router.get("/list", (req, res) => {
    controller.list(req, res);
});

router.post("/makt", (req, res) => {
    controller.makt(req, res);
});
router.post("/mseg", (req, res) => {
    controller.mseg(req, res);
});
router.post("/mkpf", (req, res) => {
    controller.mkpf(req, res);
});

module.exports = router;