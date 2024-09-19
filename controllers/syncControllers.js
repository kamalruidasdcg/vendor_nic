const path = require("path");
const fs = require("fs");
const util = require("util");
const archiver = require("archiver");
const csv = require("csv-parser");
const cron = require("node-cron");
const AdmZip = require("adm-zip");

const access = util.promisify(fs.access);
const pool = require("../config/pgDBConfigSync");
const { generateUnique, isZipFile } = require("../utils/smallFun");
const { synced_tables } = require("../config/configTable");
const { convertToCSV } = require("../utils/converts");
const {
  formatDateSync,
  convertToEpoch,
  formatDashedDate,
  getDates,
  getDatesFromEpoch,
} = require("../utils/dateTime");
// const { resSend } = require("../utils/resSend");
const unzipper = require("unzipper");
const {
  CSV_DATA_PATH,
  ZIP_DATA_PATH,
  OTHER_SERVER_DATA_PATH,
  UNZIP_DATA_PATH,
  UNSYNCED_FILES,
  OTHER_SERVER_FILE_PATH,
  FOLDER_NAME_PO,
  FOLDER_NAME_PYMT_ADVICE,
  INSERT,
} = require("../lib/constant");
const {
  getColumnDataType,
  getColumnPrimaryKey,
  adjustSequences,
} = require("../utils/syncUtils");
const { resSend } = require("../lib/resSend");
const { generateQuery } = require("../lib/utils");
const { SYNC_UPDATE } = require("../lib/tableName");
const { query } = require("../config/pgDbConfig");
const todayDate = formatDateSync(new Date());

// SYNCRONISATION OF DATA
const syncDownloadMain = async () => {
  let resData = {};

  for (const item of synced_tables) {
    try {
      console.log("item", item);

      // Check and select all columns of unsynced data from the table
      const { rows } = await pool.query(
        `SELECT * FROM ${item} WHERE sync = false`
      );

      // Store in CSV file for each table
      if (rows && rows.length > 0) {
        let { file_path, resp } = await convertToCSV(rows, item);

        if (resp) {
          try {
            const { row } = await pool.query(
              `UPDATE ${item} SET sync = true, sync_updated_at= now() WHERE sync = false;`
            );
            console.log("row", row);
          } catch (err) {
            insertToErrLog(item, rows?.sync_id || null, err.message, err.stack);
          }
        } else {
          insertToErrLog(
            item,
            rows?.sync_id || null,
            `convertToCSV for ${file_path} is false`,
            JSON.stringify(rows)
          );
        }
      }

      let resRow = {
        rows: rows,
        // file_path: file_path,
      };

      resData = { ...resData, [item]: resRow };
    } catch (error) {
      console.error(`Error in ${item} data sync csv download`);
      console.error(error.message);
      insertToErrLog(item, null, error.message, error.stack);
    }
  }

  return resData;
};

const syncCompressMain = async (res) => {
  console.log("Data zipping started");
  const parentDir = path.resolve(__dirname, "..");
  const syncFolderPath = path.join(parentDir, CSV_DATA_PATH, todayDate);

  // Check if the today's date folder exists
  if (!fs.existsSync(syncFolderPath)) {
    return resSend(res, false, 200, "No folders found for today's date", null);
  }

  // Compress to single zip file
  const foldersToZip = fs.readdirSync(syncFolderPath).filter((file) => {
    return fs.statSync(path.join(syncFolderPath, file)).isDirectory();
  });

  if (foldersToZip.length === 0) {
    return resSend(res, false, 200, "No sub-folders found to compress", null);
  }

  const downloadDir = path.join(parentDir, ZIP_DATA_PATH, todayDate);
  const zipDataPath = path.join(downloadDir, "sync_data.zip");

  // Ensure download directory exists
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }

  // Create a file to stream archive data to
  const output = fs.createWriteStream(zipDataPath);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  return new Promise((resolve, reject) => {
    // Listen for all archive data to be written
    output.on("close", () => {
      console.log(`${archive.pointer()} total bytes`);
      console.log(
        "Archiver has been finalized and the output file descriptor has closed."
      );
      resolve(zipDataPath); // Resolve the promise when the archive is finished
    });

    archive.on("warning", (err) => {
      if (err.code !== "ENOENT") {
        reject(err);
      } else {
        console.warn(err);
      }
    });

    // Catch errors explicitly
    archive.on("error", (err) => {
      reject(err);
    });

    // Pipe archive data to the file
    archive.pipe(output);

    // Append folders to the archive
    foldersToZip.forEach((folder) => {
      const folderPath = path.join(syncFolderPath, folder);
      archive.directory(folderPath, folder);
    });

    // Finalize the archive (this is asynchronous and triggers the 'close' event)
    archive.finalize();
  });
};

exports.syncDownload = async (req, res) => {
  try {
    let resData = await syncDownloadMain();
    setTimeout(() => {
      resSend(res, true, 200, null, "Unsynced data downloaded!", null);
    }, [10000]);
  } catch (err) {
    console.error(err.message);
    resSend(res, false, 500, err, "Failed to download unsynced data", null);
  }
};

exports.syncCompress = async (req, res) => {
  try {
    let zipDataPath = await syncCompressMain();

    setTimeout(() => {
      resSend(res, true, 200, zipDataPath, "Compressed file downloaded!", null);
    }, [5000]);
  } catch (err) {
    console.error(err.message);
    resSend(res, false, 500, err, "Failed to download unsynced data", null);
  }
};

exports.syncUnzip = async (req, res) => {
  try {
    const { from_date } = req.body;
    if (!from_date || from_date === "") {
      return resSend(res, false, 200, null, "Date field is required.", null);
    }
    const startDate = new Date(from_date);
    console.log("startdate: ", startDate);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    let hasError = false;
    let errorMsg = "";

    for (
      let date = new Date(startDate);
      date <= yesterday;
      date.setDate(date.getDate() + 1)
    ) {
      let currentDate = formatDateSync(date);

      // Ensure the "unzipcsvfiles" directory exists
      const parentDir = path.resolve(__dirname, "..");
      const outputDir = path.join(parentDir, UNZIP_DATA_PATH, currentDate);

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Define the path for today's ZIP file
      const zipDataPath = path.join(
        parentDir,
        OTHER_SERVER_DATA_PATH,
        currentDate
      );

      // Check if today's date folder exists
      if (!fs.existsSync(zipDataPath)) {
        return resSend(
          res,
          false,
          200,
          zipDataPath,
          `No zip file found on ${currentDate}`,
          null
        );
      }

      // Check if the zip file exists inside the today's date folder
      const filePath = path.join(zipDataPath, "sync_data.zip");
      try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        // console.log(`sync_data.zip exists in ${filePath}.`);
      } catch (err) {
        console.log(`sync_data.zip does not exist in ${filePath}.`);

        // return resSend(
        //   res,
        //   200,
        //   false,
        //   zipDataPath,
        //   `sync_data.zip does not exist in  ${filePath}.`,
        //   null
        // );
      }

      // Unzip the file using adm-zip
      try {
        const zip = new AdmZip(filePath);
        zip.extractAllTo(outputDir, true);
        // resSend(res, 200, true, zipDataPath, "Compressed file unzipped!", null);
        // UPLOAD DATA
        try {
          let d = await syncDataUpload(currentDate);
          console.log("syncDataUpload", d);
          if (!d?.sta) {
            hasError = true;
            errorMsg += `Error uploading data for ${currentDate}: ${d?.msg}\n`;
          }
        } catch (error) {
          hasError = true;
          errorMsg += `Error during data upload for ${currentDate}: ${error.message}\n`;
        }
      } catch (err) {
        hasError = true;
        errorMsg += `Error during unzipping process for ${currentDate}: ${err.message}\n`;
      }
    }

    if (hasError) {
      return resSend(
        res,
        false,
        200,
        errorMsg,
        "One or more errors occurred during the process.",
        null
      );
    } else {
      return resSend(res, true, 200, null, "Data synced successfully!", null);
    }
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return resSend(
      res,
      false,
      500,
      err.message,
      "An unexpected error occurred while processing your request",
      null
    );
  }
};

exports.syncUnzipNowAPI = async (req, res) => {
  try {
    const { from_date } = req.body;
    if (!from_date || from_date === "") {
      return resSend(res, false, 200, null, "Date field is required.", null);
    }
    const startDate = new Date(from_date);
    console.log("startdate: ", startDate);
    const today = new Date();

    let hasError = false;
    let errorMsg = "";

    for (
      let date = new Date(startDate);
      date <= today;
      date.setDate(date.getDate() + 1)
    ) {
      let currentDate = formatDateSync(date);

      // Ensure the "unzipcsvfiles" directory exists
      const parentDir = path.resolve(__dirname, "..");
      const outputDir = path.join(parentDir, UNZIP_DATA_PATH, currentDate);

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Define the path for today's ZIP file
      const zipDataPath = path.join(
        parentDir,
        OTHER_SERVER_DATA_PATH,
        currentDate
      );

      // Check if today's date folder exists
      if (!fs.existsSync(zipDataPath)) {
        return resSend(
          res,
          false,
          200,
          zipDataPath,
          `No zip file found on ${currentDate}`,
          null
        );
      }

      // Check if the zip file exists inside the today's date folder
      const filePath = path.join(zipDataPath, "sync_data.zip");
      try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        // console.log(`sync_data.zip exists in ${filePath}.`);
      } catch (err) {
        console.log(`sync_data.zip does not exist in ${filePath}.`);

        // return resSend(
        //   res,
        //   200,
        //   false,
        //   zipDataPath,
        //   `sync_data.zip does not exist in  ${filePath}.`,
        //   null
        // );
      }

      // Unzip the file using adm-zip
      try {
        const zip = new AdmZip(filePath);
        zip.extractAllTo(outputDir, true);
        // resSend(res, 200, true, zipDataPath, "Compressed file unzipped!", null);
        // UPLOAD DATA
        console.log("heelo");
        try {
          let d = await syncDataUpload(currentDate);
          console.log("syncDataUpload", d);
          if (!d?.sta) {
            hasError = true;
            errorMsg += `Error uploading data for ${currentDate}: ${d?.msg}\n`;
          }
        } catch (error) {
          hasError = true;
          errorMsg += `Error during data upload for ${currentDate}: ${error.message}\n`;
        }
      } catch (err) {
        hasError = true;
        errorMsg += `Error during unzipping process for ${currentDate}: ${err.message}\n`;
      }
    }

    if (hasError) {
      return resSend(
        res,
        false,
        200,
        errorMsg,
        "One or more errors occurred during the process.",
        null
      );
    } else {
      return resSend(
        res,
        true,
        200,
        null,
        "All files processed successfully!",
        null
      );
    }
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return resSend(
      res,
      false,
      500,
      err.message,
      "An unexpected error occurred while processing your request",
      null
    );
  }
};

const syncDataUpload = async (currentDate) => {
  try {
    const parentDir = path.resolve(__dirname, "..");
    const folderPath = path.join(parentDir, UNZIP_DATA_PATH, currentDate);
    console.log("folderPath", folderPath);

    // Read all directories inside today's folder
    const tableFolders = fs
      .readdirSync(folderPath)
      .filter((file) =>
        fs.lstatSync(path.join(folderPath, file)).isDirectory()
      );

    for (const folder of tableFolders) {
      const tableName = folder;
      const csvDataPath = path.join(folderPath, folder, "data.csv");

      try {
        await pool.query(
          `ALTER TABLE ${tableName} DISABLE TRIGGER before_update_trigger;`
        );
        await adjustSequences(tableName);
      } catch (error) {
        return { sta: false, msg: `${error.message} in ${tableName}` };
      }

      // Check if the CSV file exists
      if (!fs.existsSync(csvDataPath)) {
        console.error(`CSV file not found for table ${tableName}`);
        continue;
      }

      // Read and parse the CSV file
      const rData = [];
      try {
        // console.log(csvDataPath);
        await new Promise((resolve, reject) => {
          fs.createReadStream(csvDataPath)
            .pipe(csv())
            .on("data", (row) => rData.push(row))
            .on("end", resolve)
            .on("error", reject);
        });
        // console.log(rData);
      } catch (error) {
        console.error("Error reading or parsing CSV file:", error);
        return { sta: false, msg: error.message };
      }

      // Insert Or Update rows into the respective table
      for (const item of rData) {
        try {
          // Check sync_id is present in DB (UPDATE Query) or Not (INSERT Query)
          const check_q = `SELECT sync_id FROM ${tableName} WHERE sync_id = '${item.sync_id}'`;
          const { rowCount } = await pool.query(check_q, []);
          const keys = Object.keys(item);
          const primaryKeys = await getColumnPrimaryKey("public", tableName);
          const nonPrimaryKeys = keys.filter(
            (key) => !primaryKeys.includes(key)
          );
          // console.log("keys", keys);
          // console.log("primaryKeys", primaryKeys);
          // console.log("nonPrimaryKeys", nonPrimaryKeys);
          let values = [];

          for (let i = 0; i < nonPrimaryKeys.length; i++) {
            const key = nonPrimaryKeys[i];
            const d_type = await getColumnDataType("public", tableName, key);
            if (key === "sync") {
              item[key] = true;
            } else if (key === "sync_updated_at") {
              item[key] = new Date();
            } else if (d_type === "numeric" && item[key] === "") {
              item[key] = 0;
            } else if (d_type === "integer" || d_type === "bigint") {
              item[key] = Number(item[key]);
            } else if (
              (d_type === "timestamp with time zone" ||
                d_type === "time without time zone" ||
                d_type === "timestamp without time zone" ||
                d_type === "double precision") &&
              item[key] === ""
            ) {
              item[key] = null;
            } else if (d_type === "date" && item[key] === "") {
              item[key] = null;
            } else if (
              d_type === "date" ||
              d_type === "timestamp without time zone"
            ) {
              item[key] = formatDashedDate(item[key]);
            }
            values.push(item[key]);
          }

          if (rowCount > 0) {
            const updateColumns = nonPrimaryKeys
              .map((key, i) => `${key} = $${i + 1}`)
              .join(", ");
            const query = `UPDATE ${tableName} SET ${updateColumns} WHERE sync_id = $${nonPrimaryKeys.length + 1
              }`;
            // console.log("query", query);
            // console.log("values", values, item.sync_id);
            await pool.query(query, [...values, item.sync_id]);
            // if (tableName == "auth") {
            //   console.log("updateColumns", updateColumns);
            //   console.log("values", values, item.sync_id);
            // }
          } else {
            const columns = nonPrimaryKeys.join(", ");
            const placeholders = nonPrimaryKeys
              .map((_, i) => `$${i + 1}`)
              .join(", ");
            const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
            // console.log("query", query);
            // console.log("q2", values);
            await pool.query(query, values);
          }
        } catch (queryError) {
          console.error(
            `Error processing row for table ${tableName}:`,
            queryError.message
          );

          // Log error details to a log table
          insertToErrLog(
            tableName,
            item.sync_id || null,
            queryError.message,
            queryError.stack
          );
          return { sta: false, msg: `${queryError.message} in ${tableName}` };
        }
      }
      // Re-enable the trigger after insert/update operations
      await pool.query(
        `ALTER TABLE ${tableName} ENABLE TRIGGER before_update_trigger;`
      );
    }
    return { sta: true, msg: "Correctly worked" };
  } catch (err) {
    console.error("Error unzipping file:", err);
    return { sta: false, msg: err.message };
  }
};

// exports.syncDataUpload = async (req, res) => {
//   try {
//     const parentDir = path.resolve(__dirname, "..");
//     const folderPath = path.join(parentDir, UNZIP_DATA_PATH, todayDate);

//     if (!fs.existsSync(folderPath)) {
//       return resSend(
//         res,
//         200,
//         false,
//         null,
//         "Today's folder does not exist!",
//         null
//       );
//     }

//     // Read all directories inside today's folder
//     const tableFolders = fs
//       .readdirSync(folderPath)
//       .filter((file) =>
//         fs.lstatSync(path.join(folderPath, file)).isDirectory()
//       );

//     for (const folder of tableFolders) {
//       const tableName = folder;
//       const csvDataPath = path.join(folderPath, folder, "data.csv");

//       // Check if the CSV file exists
//       if (!fs.existsSync(csvDataPath)) {
//         console.error(`CSV file not found for table ${tableName}`);
//         continue;
//       }

//       // Read and parse the CSV file
//       const rData = [];
//       try {
//         // console.log(csvDataPath);
//         await new Promise((resolve, reject) => {
//           fs.createReadStream(csvDataPath)
//             .pipe(csv())
//             .on("data", (row) => rData.push(row))
//             .on("end", resolve)
//             .on("error", reject);
//         });
//         // console.log(rData);
//       } catch (error) {
//         console.error("Error reading or parsing CSV file:", error);
//       }

//       // Insert Or Update rows into the respective table
//       for (const item of rData) {
//         // console.log(item.sync_id, tableName);
//         // continue;
//         try {
//           // Check sync_id is present in DB (UPDATE Query) or Not (INSERT Query)
//           const check_q = `SELECT sync_id FROM ${tableName} WHERE sync_id = '${item.sync_id}'`;
//           const { rowCount } = await pool.query(check_q, []);
//           // console.log("res_check", rowCount);
//           const keys = Object.keys(item);
//           // console.log("item", item);
//           // console.log("keys:", keys);
//           let values = [];

//           for (let i = 0; i < keys.length; i++) {
//             const key = keys[i];
//             const d_type = await getColumnDataType("public", tableName, key);
//             if (key === "sync") {
//               item[key] = true;
//             } else if (key === "sync_updated_at") {
//               item[key] = new Date();
//             } else if (d_type === "numeric" && item[key] === "") {
//               item[key] = 0;
//             } else if (d_type === "integer" || d_type === "bigint") {
//               item[key] = Number(item[key]);
//             } else if (
//               (d_type === "timestamp with time zone" ||
//                 d_type === "time without time zone" ||
//                 d_type === "timestamp without time zone" ||
//                 d_type === "double precision") &&
//               item[key] === ""
//             ) {
//               item[key] = null;
//             } else if (d_type === "date" && item[key] === "") {
//               item[key] = null;
//             } else if (
//               d_type === "date" ||
//               d_type === "timestamp without time zone"
//             ) {
//               item[key] = formatDashedDate(item[key]);
//             }
//             values.push(item[key]);
//           }

//           if (rowCount > 0) {
//             const updateColumns = keys
//               .map((key, i) => `${key} = $${i + 1}`)
//               .join(", ");
//             // console.log("q", tableName, updateColumns, values);
//             const query = `UPDATE ${tableName} SET ${updateColumns} WHERE sync_id = $${
//               keys.length + 1
//             }`;
//             // console.log("q1", tableName, item.sync_id);
//             await pool.query(query, [...values, item.sync_id]);
//           } else {
//             const columns = keys.join(", ");
//             const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
//             // console.log("q2", tableName, columns, placeholders);
//             // console.log("q2", tableName, item.sync_id);
//             const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
//             await pool.query(query, values);
//           }
//         } catch (queryError) {
//           console.error(
//             `Error processing row for table ${tableName}:`,
//             queryError.message
//           );

//           // Log error details to a log table
//           insertToErrLog(
//             tableName,
//             item.sync_id || null,
//             queryError.message,
//             queryError.stack
//           );
//         }
//       }
//     }

//     setTimeout(() => {
//       resSend(res, 200, true, null, "Data uploaded successfully!", null);
//     }, [5000]);
//   } catch (err) {
//     console.error("Error unzipping file:", err);
//     resSend(
//       res,
//       500,
//       false,
//       err,
//       "An error occurred while unzipping the file",
//       null
//     );
//   }
// };

exports.syncCron = async () => {
  let downloadRes = await syncDownloadMain();
  let compresedRes;
  if (downloadRes) {
    compresedRes = await syncCompressMain();
  }
  // console.log(downloadRes, compresedRes);
};

// SYNCRONISATION OF FILES
const UPLOADS_DIR = path.join(__dirname, "../", "uploads");

// Function to create zip file
const createZipForFiles = async (folderName, files) => {
  const DOWNLOAD_DIR = path.join(__dirname, "../", UNSYNCED_FILES);
  // Ensure download directory exists
  const syncFolderPath = path.join(DOWNLOAD_DIR, todayDate);
  if (!fs.existsSync(syncFolderPath)) {
    fs.mkdirSync(syncFolderPath, { recursive: true });
  }

  const zipFilePath = path.join(syncFolderPath, `${folderName}.zip`);
  console.log("zipFilePath", zipFilePath);

  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  output.on("close", () => {
    console.log(`${archive.pointer()} total bytes`);
    console.log(
      "Archiver Finalized and the output file descriptor has closed."
    );
  });

  archive.on("error", (err) => {
    throw err;
  });

  archive.pipe(output);

  files.forEach((file) => {
    const filePath = path.join(UPLOADS_DIR, folderName, file);
    archive.file(filePath, { name: file });
  });

  await archive.finalize();
};

// Function to get files added in the last 24 hours
const getRecentFiles = async (sync_date) => {
  const folders = fs
    .readdirSync(UPLOADS_DIR)
    .filter((file) => fs.lstatSync(path.join(UPLOADS_DIR, file)).isDirectory());
  const recentFiles = {};

  const now = Date.now();
  // const dayAgo = now - 24 * 60 * 60 * 1000;
  // console.log("dayAgo", dayAgo);
  const syncDateTimestamp = new Date(sync_date).getTime();
  console.log("syncDateTimestamp", sync_date, syncDateTimestamp);

  for (const folder of folders) {
    const folderPath = path.join(UPLOADS_DIR, folder);
    const stats = await fs.lstatSync(folderPath);
    if (stats.isDirectory()) {
      let files = await fs.readdirSync(folderPath);

      for (const file of files) {
        const filePath = path.join(folderPath, file);
        let fileStats = await fs.statSync(filePath);
        const uploadTime = Number(file.split("-")[0]);

        /**
         * SAP FILE FILTER
         * for only po and paymentadvice
         */

        if (folder == FOLDER_NAME_PO || folder == FOLDER_NAME_PYMT_ADVICE) {
          // 1725340829000
          const sapFtpUpladedFiles = sapDataFilterForSync(file, sync_date);
          if (sapFtpUpladedFiles && recentFiles[folder]) {
            recentFiles[folder].push(file);
          } else if (sapFtpUpladedFiles && !recentFiles[folder]) {
            recentFiles[folder] = [file];
          }
        } else if (
          fileStats.mtimeMs >= syncDateTimestamp ||
          uploadTime >= syncDateTimestamp
        ) {
          console.log(
            "uTime",
            FOLDER_NAME_PO,
            folder,
            uploadTime,
            fileStats.mtimeMs,
            syncDateTimestamp
          );
          if (!recentFiles[folder]) {
            recentFiles[folder] = [];
          }
          recentFiles[folder].push(file);
        }
      }
    }
  }
  return recentFiles;
};

/**
 * sap data filter
 * @param {*} filesData
 * @param {*} sync_date
 * @returns boolen
 */
const sapDataFilterForSync = (filesData, sync_date) => {
  if (typeof filesData === "string") {
    const todayDate = getDatesFromEpoch(sync_date);
    filesData.split("_")[1] == todayDate;
    return filesData.split("_")[1] == todayDate;
  }
  return false;

  // console.log("sapFtpUpladedFiles", filesData);
  // let files = [];
  // if (filesData.length) {
  //   const todayDate = getDatesFromEpoch(sync_date);
  //   // filesData.split('_')[1] == todayDate;
  //   console.log("todayDate", todayDate);
  //   files = filesData.filter((f) => f.split('_')[1] == todayDate)
  // }
  // return files;
};

// Function to get unsynced files and compressed to ZIP
const getAndZipFileHandler = async (sync_date) => {
  const recentFiles = await getRecentFiles(sync_date);
  console.log("recentFiles", recentFiles);

  for (const folderName in recentFiles) {
    if (recentFiles[folderName].length > 0) {
      await createZipForFiles(folderName, recentFiles[folderName]);
      console.log(`Created zip for folder: ${folderName}`);
    }
  }
};

// API CONTROLLER TO COMPRESS ZIP FILE FOR FILES THAT ARE UPLOADED IN LAST 24 MINUTES
exports.unsyncFileCompressed = async (req, res, next) => {
  const { sync_date } = req.body;

  if (!sync_date || sync_date === "") {
    return resSend(res, false, 200, null, "Sync Date is mandadory!", null);
  }
  let s_date = Number(sync_date);
  console.log("sync_date", s_date);
  await getAndZipFileHandler(s_date);
  resSend(res, true, 200, null, "Unsyncd File Compressed successfully!", null);
};

// CRONJOB FOR LAST 24 HOURS UNSYNCED FILES ZIP
exports.syncFileCron = async () => {
  cron.schedule("30 23 * * *", async () => {
    console.log("Running the scheduled task 00:20");

    try {
      // to day first epoch time 00:00:00 , 12 am
      const todayDateTime = new Date().setHours(0, 0, 0, 0);
      await getAndZipFileHandler(todayDateTime);
      const paylod = { sync_type: "file", sync_datetime: new Date(todayDateTime), sync_status: "BACKUP_SUCCESSFULL", created_by: "" };
      const { q, val } = generateQuery(INSERT, SYNC_UPDATE, paylod);
      console.log(q, val);
      
      const result = await query({ query: q, values: val });
      console.log("File Dump Completed successfully.");
    } catch (error) {
      console.error("Error during file dump:", error);
    }
  });
};

const unzipAndMove = async (zipFilePath, uploadsFolderPath, file) => {
  try {
    // Open the zip file as a directory
    const directory = await unzipper.Open.file(zipFilePath);
    console.log("zipFilePath", zipFilePath);
    console.log("uploadsFolderPath", uploadsFolderPath);

    // Process each file entry
    for (const file of directory.files) {
      let relativeFileName = file.path;
      console.log("relativeFileName", relativeFileName);
      let relativeFolderName = path.basename(
        zipFilePath,
        path.extname(zipFilePath)
      );
      console.log("relativeFolderName", relativeFolderName);

      let destinationPath = path.join(
        uploadsFolderPath,
        relativeFolderName,
        relativeFileName
      );
      console.log("destinationPath", destinationPath);

      // Ensure the destination directory exists
      let dir = path.dirname(destinationPath);
      console.log(dir, destinationPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Extract the file to the destination path
      file
        .stream()
        .pipe(fs.createWriteStream(destinationPath))
        .on("finish", () => {
          console.log(`Extracted ${file.path} to ${destinationPath}`);
        });
    }

    console.log("Files have been successfully unzipped and moved.");
  } catch (err) {
    console.error("An error occurred:", err.message);
    throw err;
  }
};

exports.uploadRecentFilesController = async (req, res, next) => {
  try {
    const parentDir = path.resolve(__dirname, "..");

    // GET THE ZIP FILE
    const zipFilePath = path.join(parentDir, OTHER_SERVER_FILE_PATH, todayDate);

    console.log("zipFilePath", zipFilePath, todayDate);

    // Check if the today's date folder exists
    if (!fs.existsSync(zipFilePath)) {
      return resSend(
        res,
        false,
        200,
        zipFilePath,
        "No zip file found for today's date",
        null
      );
    }

    // UPLOAD FILE PATH
    const uploadsFolderPath = path.join(parentDir, "uploads");

    // Ensure the uploads folder exists
    if (!fs.existsSync(uploadsFolderPath)) {
      fs.mkdirSync(uploadsFolderPath, { recursive: true });
    }

    // GET ALL FILES FROM A FOLDER
    let files = fs
      .readdirSync(zipFilePath)
      .filter((item, i) => isZipFile(item));

    // console.log("files", files);

    // let stats = fs.statSync(zipFilePath);
    // if (!stats.isFile()) {
    //   return resSend(
    //     res,
    //     200,
    //     false,
    //     zipFilePath,
    //     `Provided path is not a file: ${zipFilePath}`,
    //     null
    //   );
    // }
    files.forEach(async (file) => {
      let zipFilePath = path.join(
        parentDir,
        OTHER_SERVER_FILE_PATH,
        todayDate,
        file
      );
      // console.log(zipFilePath);
      await unzipAndMove(zipFilePath, uploadsFolderPath, file);
    });

    resSend(res, true, 200, "File transferred successfully.", null, null);
  } catch (error) {
    console.log("An error occurred in uploadRecentFilesController:", error);
  }
};

exports.syncDownloadTEST = async (req, res) => {
  let resData = {};

  try {
    // Check and select all columns of unsynced data from the table
    const { rows } = await pool.query(`SELECT * FROM ekpo WHERE sync = false`);

    // Store in CSV file for each table
    let file_path = await convertToCSV(rows, "ekpo");

    let resRow = {
      rows: rows,
      file_path: file_path,
    };

    resData = { ...resData, ekpo: resRow };
    resSend(res, true, 200, "File transferred successfully.", rows, null);
  } catch (error) {
    console.error(`Error in ekpo data sync csv download`);
    console.error(error.message);
  }
};

const insertToErrLog = async (tableName, sync_id, msg, stack) => {
  // Log error details to a log table
  const logErrorQuery = `
  INSERT INTO sync_error_logs (table_name, sync_id, error_message, error_stack, created_at)
  VALUES ($1, $2, $3, $4, $5)
`;
  const errorValues = [tableName, sync_id, msg, stack, new Date()];

  try {
    await pool.query(logErrorQuery, errorValues);
  } catch (logError) {
    console.error(
      `Failed to log error for table ${tableName}:`,
      logError.message
    );
  }
};

exports.uploadRecentFilesControllerByDate = async (req, res, next) => {
  try {
    const { from_date } = req.body;
    if (!from_date || from_date === "") {
      return resSend(res, false, 200, null, "Date field is required.", null);
    }
    const syncDate = formatDateSync(new Date(from_date));
    // const yesterday = new Date();
    // yesterday.setDate(yesterday.getDate() - 1);

    // const dateArr = getDates(startDate, yesterday);
    // for (const syncDate of dateArr) {
    const parentDir = path.resolve(__dirname, "..");

    console.log("parentDir", parentDir, from_date, syncDate);


    // GET THE ZIP FILE
    const zipFilePath = path.join(
      parentDir,
      OTHER_SERVER_FILE_PATH,
      syncDate
    );

    console.log("zipFilePath", zipFilePath, syncDate);

    // Check if the today's date folder exists
    if (!fs.existsSync(zipFilePath)) {
      return resSend(res, false, 200, `No backup on this date ${syncDate}`, zipFilePath, null);
    }

    // if (!fs.existsSync(zipFilePath)) {
    //   return resSend(res, false, 200,  `No zip file found for ${syncDate} date`, zipFilePath, null);
    // }

    // UPLOAD FILE PATH
    const uploadsFolderPath = path.join(parentDir, "uploads");

    // Ensure the uploads folder exists
    if (!fs.existsSync(uploadsFolderPath)) {
      fs.mkdirSync(uploadsFolderPath, { recursive: true });
    }

    // GET ALL FILES FROM A FOLDER
    let files = fs
      .readdirSync(zipFilePath)
      .filter((item, i) => isZipFile(item));

    console.log("files", files);

    for (const file of files) {
      let zipFilePath = path.join(
        parentDir,
        OTHER_SERVER_FILE_PATH,
        syncDate,
        file
      );
      console.log(zipFilePath);
      await unzipAndMove(zipFilePath, uploadsFolderPath, file);
    }
    // }

    const paylod = { sync_type: "file", sync_datetime: new Date(), sync_status: "SUCCESSFULL", created_by: "99999" };
    const { q, val } = generateQuery(INSERT, SYNC_UPDATE, paylod);
    console.log(q, val);
    
    const result = await query({ query: q, values: val });

    resSend(res, true, 201, "File transferred successfully.", result, null);
  } catch (error) {

    console.log(
      "An error occurred in uploadRecentFilesController:",
      error.message, error.stack
    );
    resSend(res, false, 200, "An error occurred in uploadRecentFilesController", error.message, null);

  }
};
