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

const ekpoTablePayload = async (payload, poNo) => {
  if (!payload || !Array.isArray(payload) || !payload.length) {
    throw new Error("Please send valid payload");
  }
  const pl = payload.map((obj) => ({
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
    EINDT: formatDate(obj.EINDT)
  }));
  return pl;
};
const archivePoLineItemsPayload = async (payload) => {
  if (!payload || !Array.isArray(payload) || !payload.length) {
    throw new Error("Please send valid payload");
  }
  const pl = payload.map((obj) => ({
    // C_PKEY: `${obj.OBJECTCLAS}-${obj.OBJECTID}-${obj.CHANGENR}-${obj.TABNAME}-${obj.TABKEY }`,
    objectclas: obj.objectclas || obj.OBJECTCLAS || "",
    objectid: obj.objectid || obj.OBJECTID || "",
    changenr: obj.changenr || obj.CHANGENR || "",
    tabname: obj.tabname || obj.TABNAME || "",
    tabkey: obj.tabkey || obj.TABKEY || "",
    fname: obj.fname || obj.FNAME || "",
    chngind: obj.chngind || obj.CHNGIND || "",
    text_case: obj.text_case || obj.TEXT_CASE || "",
    unit_old: obj.unit_old || obj.UNIT_OLD || "",
    unit_new: obj.unit_new || obj.UNIT_NEW || "",
    cuky_old: obj.cuky_old || obj.CUKY_OLD || "",
    cuky_new: obj.cuky_new || obj.CUKY_NEW || "",
    value_new: obj.value_new || obj.VALUE_NEW || "",
    value_old: obj.value_old || obj.VALUE_OLD || "",
    _dataaging: formatDate(obj._dataaging) || formatDate(obj._DATAAGING),
  }));
  return pl;
};

const archivePoHeaderPayload = async (payload) => {
  if (!payload || !Array.isArray(payload) || !payload.length) {
    throw new Error("Please send valid payload");
  }
  const pl = payload.map((obj) => ({
    // C_PKEY: `${obj.OBJECTCLAS}-${obj.OBJECTID}-${obj.CHANGENR}`,
    objectclas: obj.objectclas || obj.OBJECTCLAS ,
    objectid: obj.objectid || obj.OBJECTID || "",
    changenr: obj.changenr || obj.CHANGENR || "",
    username: obj.username || obj.USERNAME || "",
    udate: formatDate(obj.udate) || formatDate(obj.UDATE),
    utime: formatTime(obj.utime) || formatTime(obj.UTIME),
    tcode: obj.tcode || obj.TCODE || "",
    planchngnr: obj.planchngnr || obj.PLANCHNGNR || "",
    act_chngno: obj.act_chngno || obj.ACT_CHNGNO || "",
    was_plannd: obj.was_plannd || obj.WAS_PLANND || "",
    change_ind: obj.change_ind || obj.CHANGE_IND || "",
    langu: obj.langu || obj.LANGU || "",
    version: obj.version || obj.VERSION || "",
    _dataaging: formatDate(obj._dataaging) || formatDate(obj._DATAAGING),
  }));

  return pl;
};

module.exports = { zpo_milestonePayload, ekpoTablePayload, archivePoLineItemsPayload, archivePoHeaderPayload };
