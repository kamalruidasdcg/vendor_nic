
const router = require("express").Router();
const controller = require("../../controllers/sapController/masterDataController");

// router.get("/list", (req, res) => {
//     controller.list(req, res);
// });

router.post("/lfa1", (req, res) => {
    controller.lfa1(req, res);
});

router.post("/addUser", (req, res) => {
    controller.addUser(req, res);
});


module.exports = router;