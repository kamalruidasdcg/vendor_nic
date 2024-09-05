const multer = require("multer");
const { existsSync, mkdirSync } = require("fs");
const path = require("path");
const { formatDateSync } = require("../utils/dateTime");
const {
  OTHER_SERVER_DATA_PATH,
  OTHER_SERVER_FILE_PATH,
} = require("./constant");

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
function pdfFileFilter(req, file, cb) {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF file is allowed!"), false);
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
};

const uploadExcelFile = multer({
  storage: storage,
  excelFilter: excelFilter,
  limits: { fileSize: 1000 * 1000 },
});

const storageDrawing = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/drawing");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const storageInvoice = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/invoice");
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
  dest: "uploads/drawing",
  fileFilter,
  limits: { fileSize: 1000 * 1000 },
});
const uploadInvoice = multer({
  storage: storageInvoice,
  dest: "uploads/invoice",
  fileFilter,
  limits: { fileSize: 1000 * 1000 },
});

const uploadSDBGFile = multer({
  storage: storageSDBG,
  dest: "uploads/sdbg",
  fileFilter,
  limits: { fileSize: 1000 * 1000 },
});

const filePathObj = {
  drawing: "/uploads/drawing",
  sdbg: "/uploads/sdbg",
  qap: "/uploads/qap",
};

const typeArr = ["drawing", "sdbg", "qap"];

// Create a function to dynamically set the destination path for Multer
const dynamicPath = (req, file, cb) => {
  const { type } = req.query;
  const destination = `/uploads/${type}`; // Customize this based on your needs
  cb(null, destination);
};

const storageDynamically = multer.diskStorage({
  destination: function (req, file, cb) {
    const lastParam = req.path.split("/").pop();
    let fPath = `uploads/` + lastParam;
    if (!existsSync(fPath)) {
      mkdirSync(fPath);
    }
    //   const fPath = `uploads/${req.query.type}`;
    cb(null, fPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Define the allowed file types

const allowedFileTypes = {
  sdbg: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/pdf",
    "application/pdf",
  ],
  drawing: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/pdf",
    "application/pdf",
  ],
  qap: ["image/jpeg", "image/jpg", "image/png", "image/pdf", "application/pdf"],
};
const dynamicFileFilter = (req, file, cb) => {
  // if (allowedFileTypes[req.query.type] && allowedFileTypes[req.query.type].includes(file.mimetype)) {
  cb(null, true); // Accept the file
  // } else {
  //   cb(new Error("File format not allowed || send proper type"), false); // Reject the file
  // }
};

const dynamicallyUpload = multer({
  storage: storageDynamically,
  fileFilter: dynamicFileFilter,
  limits: { fileSize: 100 * 1000 * 1000 },
});

const storageTNC = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for the uploads
    let fPath = `uploads/tncminutes`;
    if (!existsSync(fPath)) {
      mkdirSync(fPath);
    }
    cb(null, fPath);
  },
  filename: (req, file, cb) => {
    // Rename the file with the provided id from req.body
    const fileId = req.body.purchasing_doc_no;
    if (!fileId) {
      return cb(new Error("Missing purchasing_doc_no in the request body"));
    }
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const uniqueSuffix = Date.now();
    const newFileName = `${uniqueSuffix}-${fileId}${extension}`;

    cb(null, newFileName);
  },
});

const uploadTNCMinuts = multer({
  storage: storageTNC,
  fileFilter: pdfFileFilter,
  limits: { fileSize: 1000 * 1000 },
});

const storageInpCallLtr = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for the uploads
    let fPath = `uploads/inspectionCallLetter`;
    if (!existsSync(fPath)) {
      mkdirSync(fPath);
    }
    cb(null, fPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const storageMrs = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for the uploads
    let fPath = `uploads/Mrs`;
    if (!existsSync(fPath)) {
      mkdirSync(fPath);
    }
    cb(null, fPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const storageMir = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for the uploads
    let fPath = `uploads/Mir`;
    if (!existsSync(fPath)) {
      mkdirSync(fPath);
    }
    cb(null, fPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const inspectionCallLetterUpload = multer({
  storage: storageInpCallLtr,
  fileFilter: pdfFileFilter,
  limits: { fileSize: 1000 * 1000 },
});

const mrsUpload = multer({
  storage: storageMrs,
  fileFilter: pdfFileFilter,
  limits: { fileSize: 1000 * 1000 },
});

const mirUpload = multer({
  storage: storageMir,
  fileFilter: pdfFileFilter,
  limits: { fileSize: 1000 * 1000 },
});

const storageShippingDocs = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for the uploads
    let fPath = `uploads/shippingDocuments`;
    if (!existsSync(fPath)) {
      mkdirSync(fPath);
    }
    cb(null, fPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const shippingDocuemntsUpload = multer({
  storage: storageShippingDocs,
  fileFilter: pdfFileFilter,
  limits: { fileSize: 1000 * 1000 },
});

const todayDate = formatDateSync(new Date());
const storageUnsyncedData = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${OTHER_SERVER_DATA_PATH}/${todayDate}`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
function zipFileFilter(req, file, cb) {
  console.log("file.mimetype", file.mimetype);
  if (file.mimetype === "image/zip") {
    cb(null, true);
  } else {
    cb(new Error("Only zip file is allowed!"), false);
  }
}
const uploadUnsyncedData = multer({
  storage: storageUnsyncedData,
  dest: `${OTHER_SERVER_DATA_PATH}/${todayDate}`,
  zipFileFilter,
  limits: { fileSize: 1000 * 1000 },
});

module.exports = {
  upload,
  uploadExcelFile,
  uploadDrawingFile,
  uploadSDBGFile,
  dynamicallyUpload,
  uploadInvoice,
  uploadTNCMinuts,
  inspectionCallLetterUpload,
  mrsUpload,
  mirUpload,
  shippingDocuemntsUpload,
  uploadUnsyncedData,
};
