
const router = require("express").Router();
const controller = require("../../controllers/sapController/userController");
const { basicAuthVerification } = require("../../services/jwt.services");

router.post("/reservation", [], (req, res) => {
    controller.reservation(req, res);
});
// router.get("/reservation", [basicAuthVerification], (req, res) => {
//     controller.reservationList(req, res);
// });

router.post("/reservationReport", [], (req, res) => {
    controller.reservationList(req, res);
});
router.post("/serviceEntry", [], (req, res) => {
    controller.serviceEntry(req, res);
});


module.exports = router;