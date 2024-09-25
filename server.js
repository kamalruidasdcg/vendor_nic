const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const cron = require("node-cron");
require("dotenv").config();
const PORT = process.env.PORT || 4001;

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// // app.use("/sapuploads", express.static(path.join(__dirname, "sapuploads")));
// // const poDirPath = path.join(__dirname, "..", "..", "..", "..", "ftpgrse");
// // /home/obps/archieve'
// const poDirPath = path.resolve();
// app.use("/sapuploads/po", express.static(poDirPath));
// import routes
const allRoutes = require("./routes/allRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const errorHandler = require("./middleware/errorHandler");
const authRoute = require("./routes/auth");
const dataInsert = require("./routes/sap/dataInsert");
const sapRoutes = require("./routes/sap/sapRoutes");
const syncRoutes = require("./routes/syncRoutes");
const { mailSentCornJob } = require("./controllers/mailSentCron");
const { YES, TRUE, LAN_SERVER_PO_PATH } = require("./lib/constant");
const { apiLog } = require("./services/api.services");
const { syncDataCorn, syncFileCron } = require("./controllers/syncControllers");
const statRoutes = require("./routes/statRoutes");
const getCorsOptions = require("./config/corsConfig");
const createRateLimiter = require("./config/rateLimit");
const { vendorReminderMail } = require("./controllers/sapController/remaiderMailSendController");

// Settings
app.use(express.json());

// CORS
const corsOptions = getCorsOptions();
app.use(cors(corsOptions));

// LIMITER
const limiter = createRateLimiter();
app.use(limiter);

// API LOGS
app.use(apiLog);

// STATIC PATH TO SHOW FILES
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const poDirPath = path.resolve(LAN_SERVER_PO_PATH);
app.use("/sapuploads/po", express.static(poDirPath));

// use routes

app.use("/api/v1", allRoutes);
app.use("/api/v1/auth2", authRoute);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/insert", dataInsert);
app.use("/api/v1/sap", sapRoutes);
app.use("/api/v1/sync", syncRoutes);
app.use("/api/v1/stat", statRoutes);

// app.use(errorHandler);

app.use((req, res, next) => {
  res.status(200).json({
    status: 0,
    data: "Page not found",
  });
});



// Call Cron JOB for DATA Syncronization
syncDataCorn();
// Call Cron JOB for FILE Syncronization
syncFileCron();

let isCompletedTask = false;

const task = cron.schedule(
  "* */1 * * *",
  async () => {
    if (isCompletedTask == TRUE) {
      // console.log("Job is already running. Skipping this execution.");
      return;
    }
    isCompletedTask = true;
    try {
      await mailSentCornJob();
      // console.log("running a task every two minutes");
    } catch (error) {
      console.error("Job failed:", error.message);
    } finally {
      isCompletedTask = false;
    }
  },
  {
    scheduled: process.env.MAIL_TURN_ON === YES ? true : false,
  }
);

// vendor reminder emails
// At 11 PM DAILY
vendorReminderMail();


app.listen(PORT, () => {
  console.log("Server is running on port" + ":" + PORT);
});
