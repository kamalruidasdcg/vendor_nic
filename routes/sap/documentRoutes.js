
const router = require("express").Router();
const controller = require("../../controllers/sapController/docViewController");

router.post("/serviceEntryReport", [], (req, res) => {
    controller.serviceEntryReport(req, res);
});

router.post("/grnReport", [], (req, res) => {
    controller.grnReport(req, res);
});
router.post("/matIssueReport", [], (req, res) => {
    controller.materialIssue(req, res);
});
router.post("/icgrnReport", [], (req, res) => {
    controller.icgrnReport(req, res);
});


module.exports = router;