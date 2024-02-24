const { getEpochTime, formatDate, formatTime } = require("../lib/utils");

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
    LIFNR: obj.LIFNR || null,
    LAND1: obj.LAND1 || null,
    NAME1: obj.NAME1 || null,
    ORT01: obj.ORT01 || null,
    ORT02: obj.ORT02 || null,
    PFACH: obj.PFACH || null,
    REGIO: obj.REGIO || null,
    KTOKK: obj.KTOKK || null,
    LOEVM_X: obj.LOEVM_X || null,
    SPRAS: obj.SPRAS || null,
    STCD1: obj.STCD1 || null,
    TELFX: obj.TELFX || null,
    STCD3: obj.STCD3 || null,
    ZZVENVALDT: formatDate(obj.ZZVENVALDT),
  }));
  return pl;
};




module.exports = { lfa1Payload };