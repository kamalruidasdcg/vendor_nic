const multer = require("multer");

const pdfFileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF file is allowed!"), false);
  }
};

const storageQap = multer.diskStorage({
  destination: function (req, file, cb) {
    let fPath = (file.fieldname == "file") ? "uploads/qap" : "uploads/qap/supporting_doc";
    cb(null, fPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploadqapMfw = multer({
  storage: storageQap,
  dest: "uploads/qap",
  pdfFileFilter,
  limits: { fileSize: 1000 * 1000 },
});

exports.qapMfw = () => {
  return uploadqapMfw.fields([
    { name: "file", maxCount: 1 },
    { name: "supporting_doc", maxCount: 10 }
  ]);
};



