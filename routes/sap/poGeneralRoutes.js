
const router = require("express").Router();
const poDocsController = require("../../controllers/sapController/poDocsController");
const { dynamicallyUpload } = require("../../lib/fileUpload");
const dataInsert = require("../../controllers/dataInsertControllers");

//// SAP APIS 

router.post("/new", [], (req, res) => {
    dataInsert.insertPOData(req, res);
  });
router.post("/archive", [], (req, res) => {
    dataInsert.archivePo(req, res);
  });

// router.post("/grn", [dynamicallyUpload.single("file")], (req, res) => {
//     poDocsController.grn(req, res);
// });
// router.post("/icgrn", [dynamicallyUpload.single("file")], (req, res) => {
//     poDocsController.icgrn(req, res);
// });
// router.post("/gateentry", [dynamicallyUpload.single("file")], (req, res) => {
//     poDocsController.gateEntry(req, res);
// });
module.exports = router;