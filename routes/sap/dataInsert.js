const router = require("express").Router();
const dataInsert = require("../../controllers/dataInsertControllers");


router.post("/po", [], (req, res) => {
    dataInsert.insertPOData(req, res);
  });


module.exports = router;