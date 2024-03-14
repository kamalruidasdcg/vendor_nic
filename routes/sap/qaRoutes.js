
const router = require("express").Router();
const controller = require("../../controllers/sapController/qaController");

router.post("/qals", [], (req, res) => {
    controller.qals(req, res);
});

router.post("/icgrn/report", [], (req, res) => {
    controller.qalsReport(req, res);
});


module.exports = router;