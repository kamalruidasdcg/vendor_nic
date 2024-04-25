const { getEpochTime, formatDate, formatTime } = require("../lib/utils");

/*
 * Modify GATE ENTRY payload object to insert data
 * @param {Object} payload
 * @param {string} status
 * @returns Object
 */
const gateEntryHeaderPayload = async (obj) => {
  if (!obj) {
    throw new Error("Please send valid payload");
  }
  const pl = {
    C_PKEY: `${obj.ENTRY_NO}-${obj.W_YEAR}`,
    ENTRY_NO: obj.ENTRY_NO,
    W_YEAR: obj.W_YEAR,
    ENTRY_DATE: formatDate(obj.ENTRY_DATE),
    ENTRY_TIME: formatTime(obj.ENTRY_TIME),
    CHALAN_NO: obj.CHALAN_NO || null,
    CHALAN_DATE: formatDate(obj.CHALAN_DATE),
    DELIV_NO: obj.DELIV_NO || null,
    DELIV_DATE: formatDate(obj.DELIV_DATE),
    TRANS_NO: obj.TRANS_NO || null,
    TRAN_NAME: obj.TRAN_NAME || null,
    LR_NO: obj.LR_NO || null,
    LR_DATE: formatDate(obj.LR_DATE),
    EXNUM: obj.EXNUM || null,
    EXDAT: formatDate(obj.EXDAT) || null,
    VEH_REG_NO: obj.VEH_REG_NO || null,
  };
  return pl;
};

const gateEntryDataPayload = async (payload) => {
  if (!payload || !Array.isArray(payload) || !payload.length) {
    throw new Error("Please send valid payload");
  }
  const pl = payload.map((obj) => ({
    C_PKEY: `${obj.ENTRY_NO}-${obj.EBELN}-${obj.EBELP}-${obj.W_YEAR}`,
    ENTRY_NO: obj.ENTRY_NO,
    EBELN: obj.EBELN,
    EBELP: obj.EBELP,
    W_YEAR: obj.W_YEAR,
    CH_QTY: obj.CH_QTY || null,
    MATNR: obj.MATNR || null,
    TXZ01: obj.TXZ01 || null,
    GROSS_WT: obj.GROSS_WT || null,
    TIER_WT: obj.TIER_WT || null,
    NET_WT: obj.NET_WT || null,
    CH_NETWT: obj.CH_NETWT || null,
    ZQLTYSAMP: obj.ZQLTYSAMP || null,
    ZUNLOADNO: obj.ZUNLOADNO || null,
    ZSTRLOCTN: obj.ZSTRLOCTN || null,
    GRWTDT: formatDate(obj.GRWTDT),
    GRWTTM: formatTime(obj.GRWTTM),
    TAWTDT: formatDate(obj.TAWTDT),
    TAWTTM: formatTime(obj.TAWTTM),
    ZUNLDDT: formatDate(obj.ZUNLDDT),
    ZUNLDTM: formatTime(obj.ZUNLDTM),
    ZUNLD_IN: obj.ZUNLD_IN || null,
    ZUNLD_OUT: obj.ZUNLD_OUT || null,
    ZUNLDDT_OUT: formatDate(obj.ZUNLDDT_OUT),
    ZUNLDTM_OUT: formatTime(obj.ZUNLDTM_OUT),
    GRWTTERM: obj.GRWTTERM || null,
    TAWTTERM: obj.TAWTTERM || null,
    UNLDTERM: obj.UNLDTERM || null,
    ZLASTDATE: obj.ZLASTDATE || null,
    ZLASTTERM: obj.ZLASTTERM || null,
    ZUSNAME: obj.ZUSNAME || null,
    ZREASON: obj.ZREASON || null,
    MIGOSTATUS: obj.MIGOSTATUS || null,
    STATUS: obj.STATUS || null,
    TUNAME: obj.TUNAME || null,
    GUNAME: obj.GUNAME || null,
    MBLNR: obj.MBLNR || null,
    VBELN_D: obj.VBELN_D || null,
    FLG: obj.FLG || null,
    BATCH: obj.BATCH || null,
    MENGE_OPEN: obj.MENGE_OPEN || null,
    RECV_FLG: obj.RECV_FLG || null,
    LAST_RECV: obj.LAST_RECV || null,
    WERKS: obj.WERKS || null,
    UNUSER: obj.UNUSER || null,
    ZTCODE: obj.ZTCODE || null,
    UTYPE: obj.UTYPE || null,
    MIGOSTAT: obj.MIGOSTAT || null,
    GUTYPE: obj.GUTYPE || null,
    HOLDID: obj.HOLDID || null,
    PRCH_QTY: obj.PRCH_QTY || null,
    ZRMK1: obj.ZRMK1SER || null,
    GUTYPE: obj.GUTYPE || null,
    HOLDID: obj.HOLDID || null,
    PRCH_QTY: obj.PRCH_QTY || null,
    ZRMK1: obj.ZRMK1 || null,
    MJAHR: obj.MJAHR || null,
    RSTNO: obj.RSTNO || null,
    UNCLEARED_QTY: obj.UNCLEARED_QTY || null,
    ZMBLNR: obj.ZMBLNR || null,
    VBELN: obj.VBELN || null,
    POSNR: obj.POSNR || null,
    ZMJAHR: obj.ZMJAHR || null,
    ZEILE: obj.ZEILE || null,
    INVNO: obj.INVNO || null,
    INV_DATE: formatDate(obj.INV_DATE),
  }));
  return pl;
};

module.exports = { gateEntryDataPayload, gateEntryHeaderPayload };
