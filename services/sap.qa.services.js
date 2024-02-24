const { getEpochTime, formatDate, formatTime } = require("../lib/utils");

/*
 * Modify zfi_bgm_1_Payload payload object to insert data
 * @param {Object} payload
 * @param {string} status
 * @returns Object
 */
const qalsPayload = async (payload) => {
  if (!payload || !Array.isArray(payload) || !payload.length) {
    throw new Error("Please send valid payload");
  }
  const pl = payload.map((obj) => ({
    PRUEFLOS: obj.PRUEFLOS || null,
    WERK: obj.WERK || null,
    ART: obj.ART || null,
    HERKUNFT: obj.HERKUNFT || null,
    OBJNR: obj.OBJNR || null,
    OBTYP: obj.OBTYP || null,
    STSMA: obj.STSMA || null,
    QMATAUTH: obj.QMATAUTH || null,
    STAT11: obj.STAT11 || null,
    INSMK: obj.INSMK || null,
    STAT01: obj.STAT01 || null,
    STAT02: obj.STAT02 || null,
    STAT04: obj.STAT04 || null,
    STAT06: obj.STAT06 || null,
    STAT07: obj.STAT07 || null,
    STAT08: obj.STAT08 || null,
    STAT09: obj.STAT09 || null,
    STAT10: obj.STAT10 || null,
    STAT14: obj.STAT14 || null,
    STAT16: obj.STAT16 || null,
    STAT18: obj.STAT18 || null,
    STAT19: obj.STAT19 || null,
    STAT20: obj.STAT20 || null,
    STAT21: obj.STAT21 || null,
    STAT22: obj.STAT22 || null,
    STAT23: obj.STAT23 || null,
    STAT24: obj.STAT24 || null,
    STAT25: obj.STAT25 || null,
    STAT29: obj.STAT29 || null,
    STAT26: obj.STAT26 || null,
    STAT27: obj.STAT27 || null,
    STAT28: obj.STAT28 || null,
    STAT31: obj.STAT31 || null,
    STAT34: obj.STAT34 || null,
    STAT35: obj.STAT35 || null,
    STAT45: obj.STAT45 || null,
    STAT46: obj.STAT46 || null,
    STAT47: obj.STAT47 || null,
    STAT48: obj.STAT48 || null,
    STAT49: obj.STAT49 || null,
    STAT50: obj.STAT50 || null,
    KZSKIPLOT: obj.KZSKIPLOT || null,
    DYN: obj.DYN || null,
    HPZ: obj.HPZ || null,
    EIN: obj.EIN || null,
    ANZSN: obj.ANZSN || null,
    KZDYNERF: obj.KZDYNERF || null,
    DYNHEAD: obj.DYNHEAD || null,
    STPRVER: obj.STPRVER || null,
    EXTNUM: obj.EXTNUM || null,
    STAFO: obj.STAFO || null,
    STAT30: obj.STAT30 || null,
    QINFSTATUS: obj.QINFSTATUS || null,
    ENSTEHDAT: formatDate(obj.ENSTEHDAT),
    ENTSTEZEIT: formatTime(obj.ENTSTEZEIT),
    ERSTELLER: obj.ERSTELLER || null,
    ERSTELDAT: formatDate(obj.ERSTELDAT),
    ERSTELZEIT: formatTime(obj.ERSTELZEIT),
    AENDERER: obj.AENDERER || null,
    AENDERDAT: formatDate(obj.AENDERDAT),
    AENDERZEIT: formatTime(obj.AENDERZEIT),
    PASTRTERM: formatDate(obj.PASTRTERM),
    PASTRZEIT: formatTime(obj.PASTRZEIT),
    PAENDTERM: formatDate(obj.PAENDTERM),
    PAENDZEIT: formatTime(obj.PAENDZEIT),
    PLNTY: obj.PLNTY || null,
    PLNNR: obj.PLNNR || null,
    PPLVERW: obj.PPLVERW || null,
    PLNAL: obj.PLNAL || null,
    ZAEHL: obj.ZAEHL || null,
    ZKRIZ: obj.ZKRIZ || null,
    STAT15: obj.STAT15 || null,
    SLWBEZ: obj.SLWBEZ || null,
    STAT13: obj.STAT13 || null,
    PPKZTLZU: obj.PPKZTLZU || null,
    ZAEHL1: obj.ZAEHL1 || null,
    PRBNAVERF: obj.PRBNAVERF || null,
    PRBNAVV: obj.PRBNAVV || null,
    STAT12: obj.STAT12 || null,
    SELMATNR: obj.SELMATNR || null,
    SELREVLV: obj.SELREVLV || null,
    SELWERK: obj.SELWERK || null,
    SELLIFNR: obj.SELLIFNR || null,
    STAT17: obj.STAT17 || null,
    SELHERST: obj.SELHERST || null,
    SELKUNNR: obj.SELKUNNR || null,
    SELPPLVERW: obj.SELPPLVERW || null,
    GUELTIGAB: formatDate(obj.GUELTIGAB),
    AUFNR: obj.AUFNR || null,
    AUFPL: obj.AUFPL || null,
    CUOBJ: obj.CUOBJ || null,
    CUOBJ_CH: obj.CUOBJ_CH || null,
    VERID: obj.VERID || null,
    SA_AUFNR: obj.SA_AUFNR || null,
    KUNNR: obj.KUNNR || null,
    LIFNR: obj.LIFNR || null,
    HERSTELLER: obj.HERSTELLER || null,
    EMATNR: obj.EMATNR || null,
    MATNR: obj.MATNR || null,
    REVLV: obj.REVLV || null,
    XCHPF: obj.XCHPF || null,
    CHARG: obj.CHARG || null,
    LAGORTCHRG: obj.LAGORTCHRG || null,
    ZEUGNISBIS: formatDate(obj.ZEUGNISBIS),
    VFDAT: formatDate(obj.VFDAT),
    LICHN: obj.LICHN || null,
    SOBKZ: obj.SOBKZ || null,
    PS_PSP_PNR: obj.PS_PSP_PNR || null,
    KDAUF: obj.KDAUF || null,
    KDPOS: obj.KDPOS || null,
    EKORG: obj.EKORG || null,
    EBELN: obj.EBELN || null,
    EBELP: obj.EBELP || null,
    ETENR: obj.ETENR || null,
    BLART: obj.BLART || null,
    MJAHR: obj.MJAHR || null,
    MBLNR: obj.MBLNR || null,
    ZEILE: obj.ZEILE || null,
    BUDAT: formatDate(obj.BUDAT),
    BWART: obj.BWART || null,
    WERKVORG: obj.WERKVORG || null,
    LAGORTVORG: obj.LAGORTVORG || null,
    LGNUM: obj.LGNUM || null,
    LGTYP: obj.LGTYP || null,
    LGPLA: obj.LGPLA || null,
    LS_KDAUF: obj.LS_KDAUF || null,
    LS_KDPOS: obj.LS_KDPOS || null,
    LS_VBELN: obj.LS_VBELN || null,
    LS_POSNR: obj.LS_POSNR || null,
    LS_ABRVW: obj.LS_ABRVW || null,
    LS_ROUTE: obj.LS_ROUTE || null,
    LS_LLAND: obj.LS_LLAND || null,
    LS_KUNAG: obj.LS_KUNAG || null,
    LS_VKORG: obj.LS_VKORG || null,
    LS_KDMAT: obj.LS_KDMAT || null,
    SPRACHE: obj.SPRACHE || null,
    KTEXTLOS: obj.KTEXTLOS || null,
    LTEXTKZ: obj.LTEXTKZ || null,
    KTEXTMAT: obj.KTEXTMAT || null,
    ZUSMKZAEHL: obj.ZUSMKZAEHL || null,
    OFFENNLZMK: obj.OFFENNLZMK || null,
    OFFEN_LZMK: obj.OFFEN_LZMK || null,
    LOSMENGE: obj.LOSMENGE || null,
    MENGENEINH: obj.MENGENEINH || null,
    ANZGEB: obj.ANZGEB || null,
    GEBEH: obj.GEBEH || null,
    LVS_STIKZ: obj.LVS_STIKZ || null,
    LVS_STIMG: obj.LVS_STIMG || null,
    GESSTICHPR: obj.GESSTICHPR || null,
    EINHPROBE: obj.EINHPROBE || null,
    DYNREGEL: obj.DYNREGEL || null,
    STAT44: obj.STAT44 || null,
    PRSTUFE: obj.PRSTUFE || null,
    PRSCHAERFE: obj.PRSCHAERFE || null,
    LMENGE01: obj.LMENGE01 || null,
    LMENGE02: obj.LMENGE02 || null,
    LMENGE03: obj.LMENGE03 || null,
    LMENGE04: obj.LMENGE04 || null,
    LMENGE05: obj.LMENGE05 || null,
    LMENGE06: obj.LMENGE06 || null,
    MATNRNEU: obj.MATNRNEU || null,
    CHARGNEU: obj.CHARGNEU || null,
    LMENGE07: obj.LMENGE07 || null,
    LMENGE08: obj.LMENGE08 || null,
    LMENGE09: obj.LMENGE09 || null,
    LMENGEZUB: obj.LMENGEZUB || null,
    LMENGELZ: obj.LMENGELZ || null,
    LMENGEPR: obj.LMENGEPR || null,
    LMENGEZER: obj.LMENGEZER || null,
    LMENGEIST: obj.LMENGEIST || null,
    LMENGESCH: obj.LMENGESCH || null,
    LTEXTKZBB: obj.LTEXTKZBB || null,
    ANTEIL: obj.ANTEIL || null,
    QKZVERF: obj.QKZVERF || null,
    STAT03: obj.STAT03 || null,
    QPMATLOS: obj.QPMATLOS || null,
    AUFNR_CO: obj.AUFNR_CO || null,
    KZVBR: obj.KZVBR || null,
    KNTTP: obj.KNTTP || null,
    PSTYP: obj.PSTYP || null,
    STAT05: obj.STAT05 || null,
    KOSTL: obj.KOSTL || null,
    AUFPS: obj.AUFPS || null,
    ANLN1: obj.ANLN1 || null,
    ANLN2: obj.ANLN2 || null,
    KONT_PSPNR: obj.KONT_PSPNR || null,
    NPLNR: obj.NPLNR || null,
    APLZL: obj.APLZL || null,
    KONT_KDAUF: obj.KONT_KDAUF || null,
    KONT_KDPOS: obj.KONT_KDPOS || null,
    IMKEY: obj.IMKEY || null,
    DABRZ: formatDate(obj.DABRZ),
    KSTRG: obj.KSTRG || null,
    PAOBJNR: obj.PAOBJNR || null,
    PRCTR: obj.PRCTR || null,
    GSBER: obj.GSBER || null,
    KONTO: obj.KONTO || null,
    KOKRS: obj.KOKRS || null,
    BUKRS: obj.BUKRS || null,
    SERNP: obj.SERNP || null,
    LOS_REF: obj.LOS_REF || null,
    PROJECT: obj.PROJECT || null,
    ZZ_PO: obj.ZZ_PO || null,
    ZZ_OTHERS: obj.ZZ_OTHERS || null,
    ZZ_WRKCNTR: obj.ZZ_WRKCNTR || null,
    BEARBSTATU: obj.BEARBSTATU || null,
    STAT32: obj.STAT32 || null,
    STAT33: obj.STAT33 || null,
    STAT36: obj.STAT36 || null,
    STAT37: obj.STAT37 || null,
    STAT38: obj.STAT38 || null,
    STAT39: obj.STAT39 || null,
    STAT40: obj.STAT40 || null,
    STAT41: obj.STAT41 || null,
    STAT42: obj.STAT42 || null,
    STAT43: obj.STAT43 || null,
    MENGU: obj.MENGU || null,
    KZPZADR: obj.KZPZADR || null,
    KZPRADR: obj.KZPRADR || null,
    ZUSCH: obj.ZUSCH || null,
    ZUSTD: obj.ZUSTD || null,
    KZERSTLIEF: obj.KZERSTLIEF || null,
    KZERSTMUST: obj.KZERSTMUST || null,
    ADDON_DUMMY: obj.ADDON_DUMMY || null,
    WARPL: obj.WARPL || null,
    WAPOS: obj.WAPOS || null,
    ABNUM: obj.ABNUM || null,
    STRAT: obj.STRAT || null,
    TRIALID: obj.TRIALID || null,
    RESPONSIBLE: obj.RESPONSIBLE || null,
    INSP_DOC_NUMBER: obj.INSP_DOC_NUMBER || null,
    LOG_SYSTEM: obj.LOG_SYSTEM || null,
    GESSTICHPR_EXT: obj.GESSTICHPR_EXT || null,
    EINHPROBE_EXT: obj.EINHPROBE_EXT || null,
    PRIO_PUNKTE: obj.PRIO_PUNKTE || null,
    SIGN_TYPE_RR: obj.SIGN_TYPE_RR || null,
    SIGN_TYPE_UD: obj.SIGN_TYPE_UD || null,
    SIGN_TYPE_SM: obj.SIGN_TYPE_SM || null,
    SIGNSTRAT_RR: obj.SIGNSTRAT_RR || null,
    SIGNSTRAT_UD: obj.SIGNSTRAT_UD || null,
    SIGNSTRAT_SM: obj.SIGNSTRAT_SM || null,
    GATE_ENTRY_NO: obj.GATE_ENTRY_NO || null,
  }));
  return pl;
};

module.exports = { qalsPayload };
