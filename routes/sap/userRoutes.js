
const router = require("express").Router();
const controller = require("../../controllers/sapController/userController");

router.post("/reservation", [], (req, res) => {
    controller.reservation(req, res);
});
router.get("/reservation", [], (req, res) => {
    controller.reservationList(req, res);
});


module.exports = router;