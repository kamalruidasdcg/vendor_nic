const path = require("path");
const fs = require("fs");
const util = require("util");
const archiver = require("archiver");
const csv = require("csv-parser");
const cron = require("node-cron");

const access = util.promisify(fs.access);
const pool = require("../config/pgDBConfigSync");
const { generateUnique, isZipFile } = require("../utils/smallFun");
const { synced_tables } = require("../config/configTable");
const { convertToCSV } = require("../utils/converts");
const { formatDateSync, convertToEpoch } = require("../utils/dateTime");
const { resSend } = require("../utils/resSend");
const unzipper = require("unzipper");
const {
  CSV_DATA_PATH,
  ZIP_DATA_PATH,
  OTHER_SERVER_DATA_PATH,
  UNZIP_DATA_PATH,
  UNSYNCED_FILES,
  OTHER_SERVER_FILE_PATH,
} = require("../lib/constant");
const todayDate = formatDateSync(new Date());

// SYNCRONISATION OF DATA
const syncDownloadMain = async () => {
  let resData = {};
  await Promise.all(
    // GET ALL TABLES
    synced_tables.map(async (item, i) => {
      // Check and select all columns of unsynced data from the table
      const { rows } = await pool.query(
        `SELECT * FROM ${item} WHERE sync = ${false}`,
        []
      );
      // Store in CSV file for each tables
      let file_path = await convertToCSV(rows, item);
      let resRow = {
        rows: rows,
        file_path: file_path,
      };
      resData = { ...resData, [item]: resRow };
    })
  );
  return resData;
};

const syncCompressMain = async () => {
  // GET Folder Path
  const parentDir = path.resolve(__dirname, "..");
  const syncFolderPath = path.join(parentDir, CSV_DATA_PATH, todayDate);

  // Check if the today's date folder exists
  if (!fs.existsSync(syncFolderPath)) {
    return resSend(
      res,
      200,
      false,
      err,
      "No folders found for today's date",
      null
    );
  }
  // Compress to single zip file
  // Read the directories inside the today's date folder
  const foldersToZip = fs.readdirSync(syncFolderPath).filter((file) => {
    return fs.statSync(path.join(syncFolderPath, file)).isDirectory();
  });

  if (foldersToZip.length === 0) {
    return resSend(
      res,
      200,
      false,
      err,
      "No sub-folders found to compress",
      null
    );
  }

  const downloadDir = path.join(parentDir, ZIP_DATA_PATH, todayDate);
  const zipDataPath = path.join(downloadDir, "sync_data.zip");
  // Store in zip file inside a file

  // Ensure download directory exists
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }

  // Create a file to stream archive data to
  const output = fs.createWriteStream(zipDataPath);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  // Listen for all archive data to be written
  await output.on("close", () => {
    console.log(`${archive.pointer()} total bytes`);
    console.log(
      "Archiver has been finalized and the output file descriptor has closed."
    );
    // res.download(zipDataPath);
  });

  // Good practice to catch warnings (ie stat failures and other non-blocking errors)
  await archive.on("warning", (err) => {
    if (err.code !== "ENOENT") {
      throw err;
    }
    console.warn(err);
  });

  // Good practice to catch this error explicitly
  archive.on("error", (err) => {
    throw err;
  });

  // Pipe archive data to the file
  archive.pipe(output);

  // Append folders to the archive
  foldersToZip.forEach((folder) => {
    const folderPath = path.join(syncFolderPath, folder);
    archive.directory(folderPath, folder);
  });

  // Finalize the archive
  archive.finalize();
  return zipDataPath;
};

exports.syncDownload = async (req, res) => {
  try {
    let resData = await syncDownloadMain();
    resSend(res, 200, true, resData, "Unsynced data downloaded!", null);
  } catch (err) {
    console.error(err);
    resSend(res, 500, false, err, "Failed to download unsynced data", null);
  }
};

exports.syncCompress = async (req, res) => {
  try {
    let zipDataPath = await syncCompressMain();
    resSend(res, 200, true, zipDataPath, "Compressed file downloaded!", null);
  } catch (err) {
    console.error(err);
    resSend(res, 500, false, err, "Failed to download unsynced data", null);
  }
};

exports.syncUnzip = async (req, res) => {
  try {
    // Ensure the "unzipcsvfiles" directory exists
    const parentDir = path.resolve(__dirname, "..");
    const outputDir = path.join(parentDir, UNZIP_DATA_PATH, todayDate);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // GET THE ZIP FILE
    const zipDataPath = path.join(parentDir, OTHER_SERVER_DATA_PATH, todayDate);

    // Check if the today's date folder exists
    if (!fs.existsSync(zipDataPath)) {
      return resSend(
        res,
        200,
        false,
        zipDataPath,
        "No zip file found for today's date",
        null
      );
    }

    // Check if the file exists inside the today's date folder
    const filePath = path.join(zipDataPath, "sync_data.zip");
    try {
      await access(filePath, fs.constants.F_OK);
      console.log("sync_data.zip exists in the uploads folder.");
    } catch (err) {
      console.error("sync_data.zip does not exist in the uploads folder.");
      return resSend(
        res,
        200,
        false,
        zipDataPath,
        "sync_data.zip does not exist in the today's date folder.",
        null
      );
    }

    // Create a read stream from the zip file and pipe it to unzipper
    await fs
      .createReadStream(path.join(zipDataPath, "sync_data.zip"))
      .pipe(unzipper.Extract({ path: outputDir }))
      .promise();

    resSend(res, 200, true, zipDataPath, "Compressed file unziped!", null);
  } catch (err) {
    console.error("Error unzipping file:", err);
    resSend(
      res,
      500,
      false,
      err,
      "An error occurred while unzipping the file",
      null
    );
  }
};

exports.syncDataUpload = async (req, res) => {
  try {
    const parentDir = path.resolve(__dirname, "..");
    const folderPath = path.join(parentDir, UNZIP_DATA_PATH, todayDate);

    if (!fs.existsSync(folderPath)) {
      return resSend(
        res,
        200,
        false,
        null,
        "Today's folder does not exist!",
        null
      );
    }

    // Read all directories inside today's folder
    const tableFolders = fs
      .readdirSync(folderPath)
      .filter((file) =>
        fs.lstatSync(path.join(folderPath, file)).isDirectory()
      );

    for (const folder of tableFolders) {
      const tableName = folder;
      const csvDataPath = path.join(folderPath, folder, "data.csv");

      // Check if the CSV file exists
      if (!fs.existsSync(csvDataPath)) {
        console.error(`CSV file not found for table ${tableName}`);
        continue;
      }

      // Read and parse the CSV file
      const rData = [];
      await new Promise((resolve, reject) => {
        fs.createReadStream(csvDataPath)
          .pipe(csv())
          .on("data", (row) => rData.push(row))
          .on("end", resolve)
          .on("error", reject);
      });

      // Insert Or Update rows into the respective table
      rData.map(async (item) => {
        // Check sync_id is present in DB (UPDATE Query) or Not (INSERT Query)

        const check_q = `SELECT sync_id FROM ${tableName} WHERE sync_id = '${item.sync_id}'`;
        const { rowCount } = await pool.query(check_q, []);
        // console.log("res_check", rowCount);
        if (rowCount > 0) {
          const keys = Object.keys(item);
          let index = 0;
          const updateColumns = keys
            .map((key, i) => {
              index += 1;
              return `${key} = $${index}`;
            })
            .join(",");
          const values = keys.map((key, i) => {
            if (keys.length - 2 === i) {
              return true;
            } else if (keys.length - 1 === i) {
              return new Date();
            }
            return item[key];
          });
          const sync_id = item.sync_id;

          // console.log(updateColumns);
          // console.log("values", values);
          const query = `UPDATE ${tableName} SET ${updateColumns} 
                        WHERE sync_id = $${index + 1}`;
          // console.log(query);
          const data = await pool.query(query, [...values, sync_id]);
          // console.log("Data", data);
        } else {
          const keys = Object.keys(item);
          const columns = keys.join(",");
          const placeholders = `(${keys
            .map((it, i) => `$${i + 1}`)
            .join(",")})`;
          const values = keys.map((key, i) => {
            if (keys.length - 2 === i) {
              return true;
            } else if (keys.length - 1 === i) {
              return new Date();
            }
            return item[key];
          });

          const query = `INSERT INTO ${tableName} (${columns}) VALUES ${placeholders}`;
          console.log("query", query);

          console.log("query2", query);
          // console.log("values2", values);
          const data = await pool.query(query, values);
          console.log("data2", data);
        }
      });
    }

    resSend(res, 200, true, null, "Data uploaded successfully!", null);
  } catch (err) {
    console.error("Error unzipping file:", err);
    resSend(
      res,
      500,
      false,
      err,
      "An error occurred while unzipping the file",
      null
    );
  }
};

exports.syncCron = async () => {
  let downloadRes = await syncDownloadMain();
  let compresedRes;
  if (downloadRes) {
    compresedRes = await syncCompressMain();
  }
  console.log(downloadRes, compresedRes);
};

// SYNCRONISATION OF FILES
const UPLOADS_DIR = path.join(__dirname, "../", "uploads");

// Function to create zip file
const createZipForFiles = async (folderName, files) => {
  const DOWNLOAD_DIR = path.join(__dirname, "../", UNSYNCED_FILES);
  console.log(DOWNLOAD_DIR);
  // Ensure download directory exists
  const syncFolderPath = path.join(DOWNLOAD_DIR, todayDate);
  if (!fs.existsSync(syncFolderPath)) {
    fs.mkdirSync(syncFolderPath, { recursive: true });
  }

  const zipFilePath = path.join(syncFolderPath, `${folderName}.zip`);
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
const getRecentFiles = async () => {
  const folders = fs
    .readdirSync(UPLOADS_DIR)
    .filter((file) => fs.lstatSync(path.join(UPLOADS_DIR, file)).isDirectory());
  const recentFiles = {};

  const now = Date.now();
  const dayAgo = now - 24 * 60 * 60 * 1000;

  for (const folder of folders) {
    const folderPath = path.join(UPLOADS_DIR, folder);
    const stats = await fs.lstatSync(folderPath);

    if (stats.isDirectory()) {
      const files = await fs.readdirSync(folderPath);

      for (const file of files) {
        const filePath = path.join(folderPath, file);
        const fileStats = await fs.statSync(filePath);

        if (fileStats.mtimeMs >= dayAgo) {
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

// Function to get unsynced files and compressed to ZIP
const getAndZipFileHandler = async () => {
  const recentFiles = await getRecentFiles();
  for (const folderName in recentFiles) {
    if (recentFiles[folderName].length > 0) {
      await createZipForFiles(folderName, recentFiles[folderName]);
      console.log(`Created zip for folder: ${folderName}`);
    }
  }
};

// API CONTROLLER TO COMPRESS ZIP FILE FOR FILES THAT ARE UPLOADED IN LAST 24 MINUTES
exports.unsyncFileCompressed = async (req, res, next) => {
  await getAndZipFileHandler();
  resSend(res, 200, true, null, "Unsyncd File Compressed successfully!", null);
};

// CRONJOB FOR LAST 24 HOURS UNSYNCED FILES ZIP
exports.syncFileCron = async () => {
  cron.schedule("20 00 * * *", async () => {
    console.log("Running the scheduled task 00:20");

    try {
      await getAndZipFileHandler();
    } catch (error) {
      console.error("Error during the scheduled task:", error);
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
    console.error("An error occurred:", err);
  }
};

exports.uploadRecentFilesController = async (req, res, next) => {
  try {
    const parentDir = path.resolve(__dirname, "..");

    // GET THE ZIP FILE
    const zipFilePath = path.join(parentDir, OTHER_SERVER_FILE_PATH, todayDate);

    // Check if the today's date folder exists
    if (!fs.existsSync(zipFilePath)) {
      return resSend(
        res,
        200,
        false,
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

    console.log(files);

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
      console.log(zipFilePath);
      await unzipAndMove(zipFilePath, uploadsFolderPath, file);
    });

    resSend(res, 200, true, null, "File transferred successfully.", null);
  } catch (error) {
    console.log("An error occurred in uploadRecentFilesController:", error);
  }
};
