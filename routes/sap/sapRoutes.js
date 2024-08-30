const router = require("express").Router();
const sdbgRoutes =  require("./sdbgRoutes");
const paymentRoutes =  require("./paymentRoutes");
const poGeneralRoutes =  require("./poGeneralRoutes");
const sapTestRoutes =  require("./testRoutes");
const materialRoutes =  require("./materialRoutes");
const wbsRoutes =  require("./wbsElementRoutes");
const qaRoutes =  require("./qaRoutes");
const masterDataRoutes =  require("./masterDataRoutes");
const storeRoutes =  require("./storeRoutes");
const userRoutes =  require("./userRoutes");
const docRoutes =  require("./documentRoutes");

/**
 * SAP API START 
 * 
 */

router.use("/sdbg", sdbgRoutes);
router.use("/payment", paymentRoutes);
router.use("/po", poGeneralRoutes);
router.use("/wbs", wbsRoutes);
router.use("/test", sapTestRoutes);
router.use("/material", materialRoutes);
router.use("/mdata", masterDataRoutes);
router.use("/store",storeRoutes );
router.use("/qa", qaRoutes);
router.use("/user", userRoutes);
router.use("/document", docRoutes);


module.exports = router;