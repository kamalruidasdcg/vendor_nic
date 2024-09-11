/**
 * 
 * @param {res} res 
 * @param {boolean} status 
 * @param {number} statusCode 
 * @param {string} message 
 * @param {Object} data 
 * @param {string} token 
 */

const resSend = async (res, status, statusCode, message, data, token = "", count = 0, pageNo = 1) => {
  const response = {
    status,
    statusCode,
    message,
    data,
    count,
    pageNo,
    token,
  };
  res.status(statusCode).json(response);
};



/**
 * @param {res} res 
 * @param {string} status 
 * @param {number} statusCode 
 * @param {string} message 
 * @param {Object} data 
 * @param {string} token 
*/

const responseSend = async (res, status, statusCode, message, data, token = []) => {
  const response = {
    status,
    statusCode,
    message,
    data,
    token,
  };
  res.status(statusCode).json(response);
};


module.exports = {
  resSend, responseSend
};
