const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Specify file format that can be saved
function fileFilter(req, file, cb) {

  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/pdf" ||
    file.mimetype === "application/pdf"
    
  ) {
    cb(null, true);
  } else {

    cb(new Error("Only jpeg, jpg, pdf and png files are allowed!"), false);
  }
}

// file limits
// let maxSize = 1 * 1024 * 1024;
// function limits(req, file, cb) {
//   // cb({
//   //   fieldNameSize: 255,
//   //   fileSize: maxSize,
//   //   files: 1,
//   //   fields: 1,
//   // });
//   { fileSize: 5 * 1000 * 1000 }
//   cb(new Error("File should be below 250kb"), false);
// }

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1000 * 1000 },
});



const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
}

const uploadExcelFile = multer({
  storage: storage,
  excelFilter: excelFilter,
  limits: { fileSize: 1000 * 1000 },
});



const storageDrawing = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/drawings");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const storageSDBG = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/sdbg");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploadDrawingFile = multer({
  storage: storageDrawing,
  dest: "uploads/drawings",
  fileFilter,
  limits: { fileSize: 1000 * 1000 },
});

const uploadSDBGFile = multer({
  storage: storageSDBG,
  dest: "uploads/sdbg",
  fileFilter,
  limits: { fileSize: 1000 * 1000 },
});



module.exports = { upload, uploadExcelFile, uploadDrawingFile, uploadSDBGFile };
