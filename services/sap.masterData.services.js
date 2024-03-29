// const { getEpochTime, formatDate, formatTime } = require("../lib/utils");

/*
 * Modify lifnrPayload payload object to insert data
 * @param {Object} payload
 * @param {string} status
 * @returns Object
 */
const lfa1Payload = async (payload) => {
  if (!payload || !Array.isArray(payload) || !payload.length) {
    throw new Error("Please send valid payload");
  }
  const pl = payload.map((obj) => ({
    LIFNR: obj.LIFNR,
    NAME1: obj.NAME1 || "",
    STCD1: obj.STCD1 || "",
    STCD3: obj.STCD3 || "",
    ORT01: obj.ORT01 || "",
    ORT02: obj.ORT02 || "",
    PFACH: obj.PFACH || "",
    EMAIL: obj.EMAIL || "",
    PHONE: obj.PHONE || "",
    TELF2: obj.TELF2 || "",
    LAND1: obj.LAND1 || "",
  }));
  return pl;
};


const addUserPayload = async (obj) => {
  if (!obj || !Array.isArray(obj) || !obj.length) {
    throw new Error("Please send valid payload");
  }
  const pl = obj.map((obj) => ({
    PERNR: obj.PERNR,
    CNAME: obj.CNAME || null,
    PHONE: obj.PHONE || null,
    EMAIL: obj.EMAIL || null,
    PERSG: obj.PERSG || null,
  }));
  return pl;
};



module.exports = { lfa1Payload, addUserPayload };