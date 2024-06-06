const path = require("path");
const fs = require("fs");
const archiver = require("archiver");
const csv = require("csv-parser");

const pool = require("../config/pgDBConfigSync");
const { generateUnique } = require("../utils/smallFun");
const { synced_tables } = require("../config/configTable");
const { convertToCSV } = require("../utils/converts");
const { formatDateSync, convertToEpoch } = require("../utils/dateTime");
const { resSend } = require("../utils/resSend");
const unzipper = require("unzipper");

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
  const todayDate = formatDateSync(new Date());
  const parentDir = path.resolve(__dirname, "..");
  const syncFolderPath = path.join(parentDir, "sync/csvFile", todayDate);

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

  const downloadDir = path.join(parentDir, `sync/zipFile`, todayDate);
  const zipFilePath = path.join(downloadDir, "sync_data.zip");
  // Store in zip file inside a file

  // Ensure download directory exists
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }

  // Create a file to stream archive data to
  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  // Listen for all archive data to be written
  await output.on("close", () => {
    console.log(`${archive.pointer()} total bytes`);
    console.log(
      "Archiver has been finalized and the output file descriptor has closed."
    );
    // res.download(zipFilePath);
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
  return zipFilePath;
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
    let zipFilePath = await syncCompressMain();
    resSend(res, 200, true, zipFilePath, "Compressed file downloaded!", null);
  } catch (err) {
    console.error(err);
    resSend(res, 500, false, err, "Failed to download unsynced data", null);
  }
};

exports.syncUnzip = async (req, res) => {
  try {
    // Ensure the "unzipcspfiles" directory exists
    const todayDate = formatDateSync(new Date());
    const parentDir = path.resolve(__dirname, "..");
    const outputDir = path.join(parentDir, "sync/unzipFiles", todayDate);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // GET THE ZIP FILE
    const zipFilePath = path.join(parentDir, "sync/zipFile", todayDate);

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

    // Create a read stream from the zip file and pipe it to unzipper
    await fs
      .createReadStream(path.join(zipFilePath, "sync_data.zip"))
      .pipe(unzipper.Extract({ path: outputDir }))
      .promise();

    resSend(res, 200, true, zipFilePath, "Compressed file unziped!", null);
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
    const todayDate = formatDateSync(new Date());
    const parentDir = path.resolve(__dirname, "..");
    const folderPath = path.join(parentDir, "sync/unzipFiles", todayDate);

    if (!fs.existsSync(folderPath)) {
      resSend(res, 200, false, null, "Today's folder does not exist!", null);
    }

    // Read all directories inside today's folder
    const tableFolders = fs
      .readdirSync(folderPath)
      .filter((file) =>
        fs.lstatSync(path.join(folderPath, file)).isDirectory()
      );

    for (const folder of tableFolders) {
      const tableName = folder;
      const csvFilePath = path.join(folderPath, folder, "data.csv");

      // Check if the CSV file exists
      if (!fs.existsSync(csvFilePath)) {
        console.error(`CSV file not found for table ${tableName}`);
        continue;
      }

      // Read and parse the CSV file
      const rData = [];
      await new Promise((resolve, reject) => {
        fs.createReadStream(csvFilePath)
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
        console.log("res_check", rowCount);
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

          // console.log("query2", query);
          // console.log("values2", values);
          const data = await pool.query(query, values);
          // console.log("data2", data);
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
