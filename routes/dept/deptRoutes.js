
const express = require("express");
const router = express.Router();
const hrDeptRoutes = require("./hrDeptRoutes");

router.use("/hr", hrDeptRoutes);



module.exports = router;