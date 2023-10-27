require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 4001;
const HOST_NAME = process.env.HOST_NAME ||  "10.12.1.148";

// Settings
app.use(express.json());
app.use(cors("*"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// console.log(path.join(__dirname, "uploads/img"));

// import routes
const allRoutes = require("./routes/allRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const errorHandler = require("./middleware/errorHandler");
const authRoute = require("./routes/auth");

// use routes
app.use("/api/v1", allRoutes);
app.use("/api/v1/auth2", authRoute);
app.use("/api/v1/upload", uploadRoutes);

app.use(errorHandler);

app.use((req, res, next) => {
  res.status(200).json({
    status: 0,
    data: "Page not found",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port"+":"+ PORT);
});
