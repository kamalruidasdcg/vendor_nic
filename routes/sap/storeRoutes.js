
const router = require("express").Router();
const controller = require("../../controllers/sapController/storeControllers");

router.post("/gateentry", (req, res) => {
    controller.insertGateEntryData(req, res);
});
router.post("/gateentryReport", (req, res) => {
    controller.gateEntryReport(req, res);
});


router.get("/storeActionList", (req, res) => {
    controller.storeActionList(req, res);
});




module.exports = router;