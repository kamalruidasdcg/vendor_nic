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
    RSNUM: obj.RSNUM | obj.rsnum,
    RSDAT: formatDate(obj.RSDAT) || formatDate(obj.rsdat),
    USNAM: obj.USNAM || obj.usnam || null,
    BWART: obj.BWART || obj.bwart || null,
    WEMPF: obj.WEMPF || obj.wempf || null,
    KOSTL: obj.KOSTL || obj.kostl || null,
    EBELN: obj.EBELN || obj.ebeln || null,
    EBELP: obj.EBELP || obj.ebelp || null,
    UMWRK: obj.UMWRK || obj.umwrk || null,
    UMLGO: obj.UMLGO || obj.umlgo || null,
    PS_PSP_PNR: obj.PS_PSP_PNR || obj.ps_psp_pnr || null,
    WBS_DESC: obj.WBS_DESC || obj.wsb_desc || null,
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
    BDTER: formatDate(obj.BDTER),
  }));
  return pl;
};
const serviceEntryPayload = async (payload) => {
  console.log("payyyyyy", payload);
  if (!payload || !Array.isArray(payload) || !payload.length) {
    throw new Error("Please send valid payload");
  }
  const pl = payload.map((obj) => ({
    lblni: obj.lblni || obj.LBLNI || "",
    lblne: obj.lblne || obj.LBLNE || "",
    ernam: obj.ernam || obj.ERNAM || "",
    erdat: formatDate(obj.erdat) || formatDate(obj.ERDAT),
    aedat: formatDate(obj.aedat) || formatDate(obj.AEDAT),
    aenam: obj.aenam || obj.AENAM || "",
    sbnamag: obj.sbnamag || obj.SBNAMAG || "",
    sbnaman: obj.sbnaman || obj.SBNAMAN || "",
    dlort: obj.dlort || obj.DLORT || "",
    lbldt: formatDate(obj.lbldt) || formatDate(obj.LBLDT),
    lzvon: formatDate(obj.lzvon) || formatDate(obj.LZVON),
    lzbis: formatDate(obj.lzbis) || formatDate(obj.LZBIS),
    lwert: obj.lwert || obj.LWERT || "",
    uwert: obj.uwert || obj.UWERT || "",
    unplv: obj.unplv || obj.UNPLV || "",
    waers: obj.waers || obj.WAERS || "",
    packno: obj.packno || obj.PACKNO || "",
    txz01: obj.txz01 || obj.TXZ01 || "",
    ebeln: obj.ebeln || obj.EBELN || "",
    ebelp: obj.ebelp || obj.EBELP || "",
    loekz: obj.loekz || obj.LOEKZ || "",
    kzabn: obj.kzabn || obj.KZABN || "",
    final: obj.final || obj.FINAL || "",
    frggr: obj.frggr || obj.FRGGR || "",
    frgsx: obj.frgsx || obj.FRGSX || "",
    frgkl: obj.frgkl || obj.FRGKL || "",
    frgzu: obj.frgzu || obj.FRGZU || "",
    frgrl: obj.frgrl || obj.FRGRL || "",
    f_lock: obj.f_lock || obj.F_LOCK || "",
    pwwe: obj.pwwe || obj.PWWE || null,
    pwfr: obj.pwfr || obj.PWFR || null,
    bldat: formatDate(obj.bldat) || formatDate(obj.BLDAT),
    budat: formatDate(obj.budat) || formatDate(obj.BUDAT),
    xblnr: obj.xblnr || obj.XBLNR || "",
    bktxt: obj.bktxt || obj.BKTXT || "",
    knttp: obj.knttp || obj.KNTTP || "",
    kzvbr: obj.kzvbr || obj.KZVBR || "",
    netwr: obj.netwr || obj.NETWR || "",
    banfn: obj.banfn || obj.BANFN || "",
    bnfpo: obj.bnfpo || obj.BNFPO || "",
    warpl: obj.warpl || obj.WARPL || "",
    wapos: obj.wapos || obj.WAPOS || "",
    abnum: obj.abnum || obj.ABNUM || "",
    fknum: obj.fknum || obj.FKNUM || "",
    fkpos: obj.fkpos || obj.FKPOS || "",
    user1: obj.user1 || obj.USER1 || "",
    user2: obj.user2 || obj.USER2 || "",
    navnw: obj.navnw || obj.NAVNW || "",
    spec_no: obj.spec_no || obj.SPEC_NO || "",
    cuobj: obj.cuobj || obj.CUOBJ || null,
    lemin: obj.lemin || obj.LEMIN || "",
    comp_date: formatDate(obj.comp_date) || formatDate(obj.COMP_DATE),
    manhrs: obj.manhrs || obj.MANHRS || null,
    rspt: obj.rspt || obj.RSPT || null,
    drsbm: obj.drsbm || obj.DRSBM || null,
    qaps: obj.qaps || obj.QAPS || null,
    ldel: obj.ldel || obj.LDEL || null,
    prpmd: obj.prpmd || obj.PRPMD || null,
    spcim: obj.spcim || obj.SPCIM || null,
    disbm: obj.disbm || obj.DISBM || null,
    sreng: obj.sreng || obj.SRENG || null,
    prmta: obj.prmta || obj.PRMTA || null,
    rejre: obj.rejre || obj.REJRE || null,
    wdc: obj.wdc || obj.WDC || "",
  }));
  return pl;
};
module.exports = {
  reservationHeaderPayload,
  reservationLineItemPayload,
  serviceEntryPayload,
};
