const { getEpochTime, formatDate, formatTime } = require("../lib/utils");

/*
 * Modify zfi_bgm_1_Payload payload object to insert data
 * @param {Object} payload
 * @param {string} status
 * @returns Object
 */
const msegPayload = async (payload) => {
  if (!payload || !Array.isArray(payload) || !payload.length) {
    throw new Error("Please send valid payload");
  }
  const pl = payload.map((obj) => ({
    MBLNR: obj.MBLNR || null,
    MJAHR: obj.MJAHR || null,
    ZEILE: obj.ZEILE || null,
    LINE_ID: obj.LINE_ID || null,
    PARENT_ID: obj.PARENT_ID || null,
    LINE_DEPTH: obj.LINE_DEPTH || null,
    MAA_URZEI: obj.MAA_URZEI || null,
    BWART: obj.BWART || null,
    XAUTO: obj.XAUTO || null,
    MATNR: obj.MATNR || null,
    WERKS: obj.WERKS || null,
    LGORT: obj.LGORT || null,
    CHARG: obj.CHARG || null,
    INSMK: obj.INSMK || null,
    ZUSCH: obj.ZUSCH || null,
    ZUSTD: obj.ZUSTD || null,
    SOBKZ: obj.SOBKZ || null,
    LIFNR: obj.LIFNR || null,
    KUNNR: obj.KUNNR || null,
    KDAUF: obj.KDAUF || null,
    KDPOS: obj.KDPOS || null,
    KDEIN: obj.KDEIN || null,
    PLPLA: obj.PLPLA || null,
    SHKZG: obj.SHKZG || null,
    WAERS: obj.WAERS || null,
    DMBTR: obj.DMBTR || null,
    BNBTR: obj.BNBTR || null,
    BUALT: obj.BUALT || null,
    SHKUM: obj.SHKUM || null,
    DMBUM: obj.DMBUM || null,
    BWTAR: obj.BWTAR || null,
    MENGE: obj.MENGE || null,
    MEINS: obj.MEINS || null,
    ERFMG: obj.ERFMG || null,
    ERFME: obj.ERFME || null,
    BPMNG: obj.BPMNG || null,
    BPRME: obj.BPRME || null,
    EBELN: obj.EBELN || null,
    EBELP: obj.EBELP || null,
    LFBJA: obj.LFBJA || null,
    LFBNR: obj.LFBNR || null,
    LFPOS: obj.LFPOS || null,
    SJAHR: obj.SJAHR || null,
    SMBLN: obj.SMBLN || null,
    SMBLP: obj.SMBLP || null,
    ELIKZ: obj.ELIKZ || null,
    SGTXT: obj.SGTXT || null,
    EQUNR: obj.EQUNR || null,
    WEMPF: obj.WEMPF || null,
    ABLAD: obj.ABLAD || null,
    GSBER: obj.GSBER || null,
    KOKRS: obj.KOKRS || null,
    PARGB: obj.PARGB || null,
    PARBU: obj.PARBU || null,
    KOSTL: obj.KOSTL || null,
    PROJN: obj.PROJN || null,
    AUFNR: obj.AUFNR || null,
    ANLN1: obj.ANLN1 || null,
    ANLN2: obj.ANLN2 || null,
    XSKST: obj.XSKST || null,
    XSAUF: obj.XSAUF || null,
    XSPRO: obj.XSPRO || null,
    XSERG: obj.XSERG || null,
    GJAHR: obj.GJAHR || null,
    XRUEM: obj.XRUEM || null,
    XRUEJ: obj.XRUEJ || null,
    BUKRS: obj.BUKRS || null,
    BELNR: obj.BELNR || null,
    BUZEI: obj.BUZEI || null,
    BELUM: obj.BELUM || null,
    BUZUM: obj.BUZUM || null,
    RSNUM: obj.RSNUM || null,
    RSPOS: obj.RSPOS || null,
    KZEAR: obj.KZEAR || null,
    PBAMG: obj.PBAMG || null,
    KZSTR: obj.KZSTR || null,
    UMMAT: obj.UMMAT || null,
    UMWRK: obj.UMWRK || null,
    UMLGO: obj.UMLGO || null,
    UMCHA: obj.UMCHA || null,
    UMZST: obj.UMZST || null,
    UMZUS: obj.UMZUS || null,
    UMBAR: obj.UMBAR || null,
    UMSOK: obj.UMSOK || null,
    KZBEW: obj.KZBEW || null,
    KZVBR: obj.KZVBR || null,
    KZZUG: obj.KZZUG || null,
    WEUNB: obj.WEUNB || null,
    PALAN: obj.PALAN || null,
    LGNUM: obj.LGNUM || null,
    LGTYP: obj.LGTYP || null,
    LGPLA: obj.LGPLA || null,
    BESTQ: obj.BESTQ || null,
    BWLVS: obj.BWLVS || null,
    TBNUM: obj.TBNUM || null,
    TBPOS: obj.TBPOS || null,
    XBLVS: obj.XBLVS || null,
    VSCHN: obj.VSCHN || null,
    NSCHN: obj.NSCHN || null,
    DYPLA: obj.DYPLA || null,
    UBNUM: obj.UBNUM || null,
    TBPRI: obj.TBPRI || null,
    TANUM: obj.TANUM || null,
    WEANZ: obj.WEANZ || null,
    GRUND: obj.GRUND || null,
    EVERS: obj.EVERS || null,
    EVERE: obj.EVERE || null,
    IMKEY: obj.IMKEY || null,
    KSTRG: obj.KSTRG || null,
    PAOBJNR: obj.PAOBJNR || null,
    PRCTR: obj.PRCTR || null,
    PS_PSP_PNR: obj.PS_PSP_PNR || null,
    NPLNR: obj.NPLNR || null,
    AUFPL: obj.AUFPL || null,
    APLZL: obj.APLZL || null,
    AUFPS: obj.AUFPS || null,
    VPTNR: obj.VPTNR || null,
    FIPOS: obj.FIPOS || null,
    SAKTO: obj.SAKTO || null,
    BSTMG: obj.BSTMG || null,
    BSTME: obj.BSTME || null,
    XWSBR: obj.XWSBR || null,
    EMLIF: obj.EMLIF || null,
    EXBWR: obj.EXBWR || null,
    VKWRT: obj.VKWRT || null,
    AKTNR: obj.AKTNR || null,
    ZEKKN: obj.ZEKKN || null,
    VFDAT: formatDate(obj.VFDAT), // date 
    CUOBJ_CH: obj.CUOBJ_CH || null,
    EXVKW: obj.EXVKW || null,
    PPRCTR: obj.PPRCTR || null,
    RSART: obj.RSART || null,
    GEBER: obj.GEBER || null,
    FISTL: obj.FISTL || null,
    MATBF: obj.MATBF || null,
    UMMAB: obj.UMMAB || null,
    BUSTM: obj.BUSTM || null,
    BUSTW: obj.BUSTW || null,
    MENGU: obj.MENGU || null,
    WERTU: obj.WERTU || null,
    LBKUM: obj.LBKUM || null,
    SALK3: obj.SALK3 || null,
    VPRSV: obj.VPRSV || null,
    FKBER: obj.FKBER || null,
    DABRBZ: formatDate(obj.DABRBZ), // date
    VKWRA: formatDate(obj.VKWRA), // date
    DABRZ: formatDate(obj.DABRZ), // date
    XBEAU: obj.XBEAU || null,
    LSMNG: obj.LSMNG || null,
    LSMEH: obj.LSMEH || null,
    KZBWS: obj.KZBWS || null,
    QINSPST: obj.QINSPST || null,
    URZEI: obj.URZEI || null,
    J_1BEXBASE: obj.J_1BEXBASE || null,
    MWSKZ: obj.MWSKZ || null,
    TXJCD: obj.TXJCD || null,
    EMATN: obj.EMATN || null,
    J_1AGIRUPD: obj.J_1AGIRUPD || null,
    VKMWS: obj.VKMWS || null,
    HSDAT: formatDate(obj.HSDAT), // date
    BERKZ: obj.BERKZ || null,
    MAT_KDAUF: obj.MAT_KDAUF || null,
    MAT_KDPOS: obj.MAT_KDPOS || null,
    MAT_PSPNR: obj.MAT_PSPNR || null,
    XWOFF: obj.XWOFF || null,
    BEMOT: obj.BEMOT || null,
    PRZNR: obj.PRZNR || null,
    LLIEF: obj.LLIEF || null,
    LSTAR: obj.LSTAR || null,
    XOBEW: obj.XOBEW || null,
    GRANT_NBR: obj.GRANT_NBR || null,
    ZUSTD_T156M: obj.ZUSTD_T156M || null,
    SPE_GTS_STOCK_TY: obj.SPE_GTS_STOCK_TY || null,
    KBLNR: obj.KBLNR || null,
    KBLPOS: obj.KBLPOS || null,
    XMACC: obj.XMACC || null,
    VGART_MKPF: obj.VGART_MKPF || null,
    BUDAT_MKPF: formatDate(obj.BUDAT_MKPF), // date
    CPUDT_MKPF: formatDate(obj.CPUDT_MKPF), // date
    CPUTM_MKPF: formatTime(obj.CPUTM_MKPF), // time
    USNAM_MKPF: obj.USNAM_MKPF || null,
    XBLNR_MKPF: obj.XBLNR_MKPF || null,
    TCODE2_MKPF: obj.TCODE2_MKPF || null,
    VBELN_IM: obj.VBELN_IM || null,
    VBELP_IM: obj.VBELP_IM || null,
    SGT_SCAT: obj.SGT_SCAT || null,
    SGT_UMSCAT: obj.SGT_UMSCAT || null,
    SGT_RCAT: obj.SGT_RCAT || null,
    DISUB_OWNER: obj.DISUB_OWNER || null,
    FSH_SEASON_YEAR: obj.FSH_SEASON_YEAR || null,
    FSH_SEASON: obj.FSH_SEASON || null,
    FSH_COLLECTION: obj.FSH_COLLECTION || null,
    FSH_THEME: obj.FSH_THEME || null,
    FSH_UMSEA_YR: obj.FSH_UMSEA_YR || null,
    FSH_UMSEA: obj.FSH_UMSEA || null,
    FSH_UMCOLL: obj.FSH_UMCOLL || null,
    FSH_UMTHEME: obj.FSH_UMTHEME || null,
    SGT_CHINT: obj.SGT_CHINT || null,
    FSH_DEALLOC_QTY: obj.FSH_DEALLOC_QTY || null,
    OINAVNW: obj.OINAVNW || null,
    OICONDCOD: obj.OICONDCOD || null,
    CONDI: obj.CONDI || null,
    WRF_CHARSTC1: obj.WRF_CHARSTC1 || null,
    WRF_CHARSTC2: obj.WRF_CHARSTC2 || null,
    WRF_CHARSTC3: obj.WRF_CHARSTC3 || null,
  }));
  return pl;
};
const makfPayload = async (payload) => {
  if (!payload || !Array.isArray(payload) || !payload.length) {
    throw new Error("Please send valid payload");
  }
  const pl = payload.map((obj) => ({
    MBLNR: obj.MBLNR || null,
    MJAHR: obj.MJAHR || null,
    VGART: obj.VGART || null,
    BLART: obj.BLART || null,
    BLAUM: obj.BLAUM || null,
    BLDAT: formatDate(obj.BLDAT),
    BUDAT: formatDate(obj.BUDAT),
    CPUDT: formatDate(obj.CPUDT),
    CPUTM: formatTime(obj.CPUTM),
    AEDAT: formatDate(obj.AEDAT),
    USNAM: obj.USNAM || null,
    TCODE: obj.TCODE || null,
    XBLNR: obj.XBLNR || null,
    BKTXT: obj.BKTXT || null,
    FRATH: obj.FRATH || null,
    FRBNR: obj.FRBNR || null,
    WEVER: obj.WEVER || null,
    XABLN: obj.XABLN || null,
    AWSYS: obj.AWSYS || null,
    BLA2D: obj.BLA2D || null,
    TCODE2: obj.TCODE2 || null,
    BFWMS: obj.BFWMS || null,
    EXNUM: obj.EXNUM || null,
    SPE_BUDAT_UHR: obj.SPE_BUDAT_UHR || null,
    SPE_BUDAT_ZONE: obj.SPE_BUDAT_ZONE || null,
    LE_VBELN: obj.LE_VBELN || null,
    SPE_LOGSYS: obj.SPE_LOGSYS || null,
    SPE_MDNUM_EWM: obj.SPE_MDNUM_EWM || null,
    GTS_CUSREF_NO: obj.GTS_CUSREF_NO || null,
    FLS_RSTO: obj.FLS_RSTO || null,
    MSR_ACTIVE: obj.MSR_ACTIVE || null,
    KNUMV: obj.KNUMV || null,
  }));


  


  return pl;
};




module.exports = { msegPayload, makfPayload };
