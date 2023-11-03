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
};

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

const filePathObj = {
  drawing: "/uploads/drawings",
  sdbg: "/uploads/sdbg",
  qap: "/uploads/qap",
};


const typeArr = ["drawing", "sdbg", "qap"];

// Create a function to dynamically set the destination path for Multer
const dynamicPath = (req, file, cb) => {
  // / You can get the userId from the request as an example
  const { type } = req.query;
  console.log("type", type);

  // if(!typeArr.includes(type)) {
  //   cb(new Error("File type is invalid -- [ PATH]"), false);
  //   return;
  // }

  // Define the destination path based on the userId or any other criteria
  const destination = `/uploads/${type}` // Customize this based on your needs
  // const destination = filePathObj[type] // Customize this based on your needs
  console.log("destination", destination);
  // return destination;
  cb(null, destination);
};

const storageDynamically = multer.diskStorage({
  // dest: "/uploads/sdbg",
  // destination: dynamicPath,
  // destination: "/uploads/sdbg",
  // filename: (req, file, cb) => {
  //   const timestamp = Date.now();
  //   const filename = `${timestamp}-${file.originalname}`;
  //   cb(null, filename);
  // },


  destination: function (req, file, cb) {
    //   const { type } = req.query;
    //   const destination = `/uploads/${type}`
    // console.log("destination", destination);

    cb(null, "/uploads/sdbg");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },


});

const allowedFileTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/pdf",
  "application/pdf",
]; // Define the allowed file types

const dynamicFileFilter = (req, file, cb) => {
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("File format not allowed"), false); // Reject the file
  }
};

const dynamicallyUpload = multer({
  storage: storageDynamically,
  fileFilter: dynamicFileFilter,
  limits: { fileSize: 1000 * 1000 },
});

module.exports = {
  upload,
  uploadExcelFile,
  uploadDrawingFile,
  uploadSDBGFile,
  dynamicallyUpload,
};
