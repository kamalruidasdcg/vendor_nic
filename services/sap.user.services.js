const { formatDate } = require("../lib/utils");

/*
 * Modify RKPF payload object to insert data
 * @param {Object} payload
 * @param {string} status
 * @returns Object
 */

const reservationHeaderPayload = async (obj) => {
  console.log("obj-obj-obj-objobj", obj);
  if (!obj || typeof obj !== "object") {
    throw new Error("Please send valid payload");
  }
  const pl = {
    // C_PKEY: `${obj.EBELN}-${obj.EBELP}`,
    RSNUM: obj.RSNUM,
    RSDAT: formatDate(obj.RSDAT),
    USNAM: obj.USNAM || null,
    BWART: obj.BWART || null,
    WEMPF: obj.WEMPF || null,
    KOSTL: obj.KOSTL || null,
    EBELN: obj.EBELN || null,
    EBELP: obj.EBELP || null,
    UMWRK: obj.UMWRK || null,
    UMLGO: obj.UMLGO || null,
    PS_PSP_PNR: obj.PS_PSP_PNR || null,
  };
  return pl;
};

/*
 * Modify  payload object to insert data
 * @param {Object} payload
 * @param {string} status
 * @returns Object
 */

const reservationLineItemPayload = async (payload) => {
  console.log("payyyyyy", payload);
  if (!payload || !Array.isArray(payload) || !payload.length) {
    throw new Error("Please send valid payload");
  }
  const pl = payload.map((obj) => ({
    C_PKEY: `${obj.RSNUM}-${obj.RSPOS}-${obj.RSART}`,
    RSNUM: obj.RSNUM,
    RSPOS: obj.RSPOS,
    RSART: obj.RSART,
    BDART: obj.BDART || null,
    RSSTA: obj.RSSTA || null,
    KZEAR: obj.KZEAR || null,
    MATNR: obj.MATNR || null,
    WERKS: obj.WERKS || null,
    LGORT: obj.LGORT || null,
    CHARG: obj.CHARG || null,
    BDMNG: obj.BDMNG || null,
    MEINS: obj.MEINS || null,
    ENMNG: obj.ENMNG || null,
    BWART: obj.BWART || null,
    ERFMG: obj.ERFMG || null,
    XWAOK: obj.XWAOK || null,
    XLOEK: obj.XLOEK || null,
    PSPEL: obj.PSPEL || null,
    BDTER: obj.BDTER || null,
  }));
  return pl;
};
module.exports = { reservationHeaderPayload, reservationLineItemPayload };
