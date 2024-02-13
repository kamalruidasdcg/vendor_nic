
const router = require("express").Router();
const controller = require("../../controllers/sapController/wbsController");


router.post("/", [], (req, res) => {
    controller.addWBSElement(req, res);
});

module.exports = router;