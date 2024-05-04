const multer = require("multer");

const pdfFileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF file is allowed!"), false);
  }
};

const storageWDCs = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/wdcs");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploadWDCs = multer({
  storage: storageWDCs,
  dest: "uploads/wdc",
  pdfFileFilter,
  limits: { fileSize: 1000 * 1000 },
});

exports.wdcmw = () => {
  return uploadWDCs.fields([
    { name: "file_inspection_note_ref_no", maxCount: 1 },
    { name: "file_hinderence_report_cerified_by_berth", maxCount: 1 },
    { name: "file_attendance_report", maxCount: 1 },
  ]);
};


