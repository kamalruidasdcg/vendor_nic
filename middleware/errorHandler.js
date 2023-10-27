const { resSend } = require("../lib/resSend");

const errorHandler = async (error, request, response, next) => {
  if (error.code === "LIMIT_FILE_SIZE") {
    return resSend(
      response,
      false,
      200,
      "File size should be below 1MB!",
      null,
      null
    );
  }
  return resSend(response, false, 200, error.message, null, null);
};

module.exports = errorHandler;
