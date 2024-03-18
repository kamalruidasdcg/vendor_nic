
const router = require("express").Router();
const controller = require("../../controllers/sapController/storeControllers");

router.post("/gateentry", (req, res) => {
    controller.insertGateEntryData(req, res);
});



module.exports = router;