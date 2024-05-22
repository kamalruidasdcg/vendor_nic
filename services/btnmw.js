const multer = require("multer");

const pdfFileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF file is allowed!"), false);
  }
};

const storageBTNs = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/btns");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploadBTNs = multer({
  storage: storageBTNs,
  dest: "uploads/btns",
  pdfFileFilter,
  limits: { fileSize: 1000 * 1000 },
});

exports.btnmw = () => {
  return uploadBTNs.fields([
    { name: "invoice_filename", maxCount: 1 },
    { name: "e_invoice_filename", maxCount: 1 },
    { name: "debit_credit_filename", maxCount: 1 },
    { name: "get_entry_filename", maxCount: 1 },
    { name: "demand_raise_filename", maxCount: 1 },
    { name: "pbg_filename", maxCount: 1 },
  ]);
};

exports.btnAdvanceBillHybridUploadFile = () => {
  return uploadBTNs.fields([
    { name: "invoice_filename", maxCount: 1 },
    { name: "e_invoice_filename", maxCount: 1 },
    { name: "c_level1_doc_name", maxCount: 1 },
    { name: "c_level2_doc_name", maxCount: 1 },
    { name: "c_level3_doc_name", maxCount: 1 },
    { name: "a_level1_doc_name", maxCount: 1 },
    { name: "a_level2_doc_name", maxCount: 1 },
    { name: "a_level3_doc_name", maxCount: 1 },
    { name: "debit_credit_filename", maxCount: 1 },
  ]);
};


