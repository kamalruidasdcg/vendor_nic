const fs = require("fs");
const path = require("path");
const fastcsv = require("fast-csv");
const { formatDateSync } = require("./dateTime");

exports.convertToCSV = async (rows, item) => {
  // Create directory with today's date
  const todayDate = formatDateSync(new Date());
  const parentDir = path.resolve(__dirname, "..");
  const dirPath = path.join(parentDir, "sync/csvFile", todayDate, item);
  fs.mkdirSync(dirPath, { recursive: true });
  const filePath = path.join(dirPath, `data.csv`);
  const ws = fs.createWriteStream(filePath);
  await fastcsv
    .write(rows, { headers: true })
    .on("finish", () => {
      console.log("Write to CSV successfully!");
    })
    .pipe(ws);
  return filePath;
};
