const { getEpochTime, formatDate, formatTime } = require("../lib/utils");

/*
 * Modify lifnrPayload payload object to insert data
 * @param {Object} payload
 * @param {string} status
 * @returns Object
 */
const zpo_milestonePayload = async (payload) => {
  if (!payload || !Array.isArray(payload) || !payload.length) {
    throw new Error("Please send valid payload");
  }
  const pl = payload.map((obj) => ({

    C_PKEY: `${obj.EBELN}-${obj.MID}`,
    EBELN: obj.EBELN,
    MID: obj.MID,
    PLAN_DATE: formatDate(obj.PLAN_DATE),
    MTEXT: obj.MTEXT || null,
    MO: obj.MO || null,
  }));
  return pl;
};

const ekpoTablePayload = async (obj, poNo) => {
  if (!obj || !Array.isArray(obj) || !obj.length) {
    throw new Error("Please send valid payload");
  }
  const pl = obj.map((obj) => ({
    C_PKEY: `${poNo}-${obj.EBELP}`,
    EBELN: poNo,
    EBELP: obj.EBELP,
    LOEKZ: obj.LOEKZ || null,
    STATU: obj.STATU || null,
    AEDAT: formatDate(obj.AEDAT),
    TXZ01: obj.TXZ01 || null,
    MATNR: obj.MATNR || null,
    BUKRS: obj.BUKRS || null,
    WERKS: obj.WERKS || null,
    LGORT: obj.LGORT || null,
    MATKL: obj.MATKL || null,
    KTMNG: obj.KTMNG || null,
    MENGE: obj.MENGE || null,
    MEINS: obj.MEINS || null,
    NETPR: obj.NETPR || null,
    NETWR: obj.NETWR || null,
    MWSKZ: obj.MWSKZ || null,
  }));
  return pl;
};

module.exports = { zpo_milestonePayload, ekpoTablePayload };