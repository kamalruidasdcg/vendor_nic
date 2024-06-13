require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const cron = require("node-cron");
const PORT = process.env.PORT || 4001;
const HOST_NAME = process.env.HOST_NAME || "10.12.1.148";
// Settings

app.use(express.json());
app.use(cors("*"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/sapuploads", express.static(path.join(__dirname, "sapuploads")));
const poDirPath = path.join(__dirname, "..", "..", "..", "..", "ftpgrse");
app.use("/sapuploads", express.static(poDirPath));
// import routes
const allRoutes = require("./routes/allRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const errorHandler = require("./middleware/errorHandler");
const authRoute = require("./routes/auth");
const dataInsert = require("./routes/sap/dataInsert");
const sapRoutes = require("./routes/sap/sapRoutes");
const syncRoutes = require("./routes/syncRoutes");
const { mailSentCornJob } = require("./controllers/mailSentCron");
const { YES } = require("./lib/constant");
const { apiLog } = require("./services/api.services");
const { syncCron, syncFileCron } = require("./controllers/syncControllers");

const task = cron.schedule('*/1 * * * *', () => {
  console.log('running a task every two minutes');
  mailSentCornJob()
}, {
  scheduled: process.env.MAIL_TURN_ON === YES ? true : false
});

// const task2 = cron.schedule('*/1 * * * *', () => {
//   console.log('running a task every two minutes');
//   mailSentCornJob()
// }, {
//   scheduled: process.env.MAIL_TURN_ON === YES ? true : false
// });

app.use(apiLog);

// use routes
app.use("/api/v1", allRoutes);
app.use("/api/v1/auth2", authRoute);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/insert", dataInsert);
app.use("/api/v1/sap", sapRoutes);
app.use("/api/v1/sync", syncRoutes);

app.use(errorHandler);

app.use((req, res, next) => {
  res.status(200).json({
    status: 0,
    data: "Page not found",
  });
});

// Call Cron JOB
cron.schedule("05 00 * * *", async () => {
  console.log("Cron job started at 12:05 AM");
  try {
    await syncCron();
    console.log("Cron job completed successfully");
  } catch (error) {
    console.error("Error during cron job:", error);
    fs.appendFileSync(
      "error.log",
      `${new Date().toISOString()} - Error: ${error.message}\n`
    );
  }
});
syncFileCron();

app.listen(PORT, () => {
  console.log("Server is running on port" + ":" + PORT);
});
