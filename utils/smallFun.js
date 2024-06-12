exports.checkTypeArr = (data) => {
  return data && Array.isArray(data) && data.length > 0;
};

exports.generateUnique = () => {
  return new Date().getTime();
};

const path = require("path");

exports.isZipFile = (filePath) => {
  const ext = path.extname(filePath);
  return ext === ".zip";
};
