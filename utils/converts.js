const fs = require("fs");
const path = require("path");
const fastcsv = require("fast-csv");
const { formatDateSync } = require("./dateTime");
const { CSV_DATA_PATH } = require("../lib/constant");

exports.convertToCSV = async (rows, item) => {
  // Create directory with today's date
  const todayDate = formatDateSync(new Date());
  const parentDir = path.resolve(__dirname, "..");
  const dirPath = path.join(parentDir, CSV_DATA_PATH, todayDate, item);
  fs.mkdirSync(dirPath, { recursive: true });
  const filePath = path.join(dirPath, `data.csv`);

  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(filePath);
    fastcsv
      .write(rows, { headers: true })
      .on("finish", () => {
        console.log(`Write to CSV for ${item}!`);
        resolve({ file_path: filePath, resp: true });
      })
      .on("error", (error) => {
        console.error(`Error writing CSV for ${item}: ${error}`);
        reject({ file_path: error, resp: false });
      })
      .pipe(ws);
  });
};
