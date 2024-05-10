const { getEpochTime, formatTime, formatDate } = require("../lib/utils");

/*
 * Modify drawing payload object to insert data
 * @param {Object} payload
 * @param {string} status
 * @returns Object
 */
const paymentPayload = (payload) => {
  const payloadObj = {
    // "id": 1, // auto incremant id
    purchasing_doc_no: payload.purchasing_doc_no,
    file_name: payload.fileName,
    file_path: payload.filePath,
    vendor_code: payload.vendor_code ? payload.vendor_code : null,
    created_at: payload.created_at ? payload.created_at : getEpochTime(),
    created_by_name: payload.action_by_name,
    created_by_id: payload.action_by_id,
  };

  return payloadObj;
};

const ztfi_bil_defacePayload = async (obj) => {
  if (!obj) {
    throw new Error("Please send valid payload");
  }
  const pl = {
    C_PKEY: `${obj.ZREGNUM}-${obj.SEQNO}-${obj.ZBILLPER}`,
    ZREGNUM: obj.ZREGNUM,
    SEQNO: obj.SEQNO,
    ZBILLPER: obj.ZBILLPER,
    ZCREATE: obj.ZCREATE || null,
    ZDELETE: obj.ZDELETE || null,
    ZBILLTYPE: obj.ZBILLTYPE || null,
    ZRECORD: obj.ZRECORD || null,
    ZREGDATE: formatDate(obj.ZREGDATE),
    ZPONO: obj.ZPONO || null,
    ZVENDOR: obj.ZVENDOR || null,
    ZCREATEDBY: obj.ZCREATEDBY || null,
    ZCREATEDON: formatDate(obj.ZCREATEDON),
    ZCREATEDAT: formatTime(obj.ZCREATEDAT),
    ZMODIFIEDBY: obj.ZMODIFIEDBY || null,
    ZMODIFIEDON: formatDate(obj.ZMODIFIEDON),
    ZMODIFIEDAT: formatTime(obj.ZMODIFIEDAT),
    ZCERWDC_S: obj.ZCERWDC_S || null,
    ZCERPAY_S: obj.ZCERPAY_S || null,
    ZCERATTNDR_S: obj.ZCERATTNDR_S || null,
    ZBGFILENO_S: obj.ZBGFILENO_S || null,
    ZDDNO_S: obj.ZDDNO_S || null,
    ZBSCVAL_M_S: obj.ZBSCVAL_M_S || null,
    ZNTSUPP_S: obj.ZNTSUPP_S || null,
    ZNETVALUE_S: obj.ZNETVALUE_S || null,
    ZCST_VAT_S: obj.ZCST_VAT_S || null,
    ZCST_VAT_TXT: obj.ZCST_VAT_TXT || null,
    ZTOTALB_S: obj.ZTOTALB_S || null,
    ZADD_OTHRCHRG_S: obj.ZADD_OTHRCHRG_S || null,
    ZADD_OTHRCHRG_TXT: obj.ZADD_OTHRCHRG_TXT || null,
    ZADD_OTHRCHRG_1_S: obj.ZADD_OTHRCHRG_1_S || null,
    ZADD_OTHRCHRG_1_TXT: obj.ZADD_OTHRCHRG_1_TXT || null,
    ZTOTALA_S: obj.ZTOTALA_S || null,
    ZBLNC_PAYMNT_S: obj.ZBLNC_PAYMNT_S || null,
    ZLES_INCTAX_S: obj.ZLES_INCTAX_S || null,
    ZLES_INCTAX_TXT: obj.ZLES_INCTAX_TXT || null,
    ZLES_RETNTN_S: obj.ZLES_RETNTN_S || null,
    ZLES_RETNTN_TXT: obj.ZLES_RETNTN_TXT || null,
    ZLES_WRKCONTAX_S: obj.ZLES_WRKCONTAX_S || null,
    ZLES_WRKCONTAX_TXT: obj.ZLES_WRKCONTAX_TXT || null,
    ZLES_LD_S: obj.ZLES_LD_S || null,
    ZLES_LD_TXT: obj.ZLES_LD_TXT || null,
    ZLES_PENALTY_S: obj.ZLES_PENALTY_S || null,
    ZLES_PENALTY_TXT: obj.ZLES_PENALTY_TXT || null,
    ZLES_SD_S: obj.ZLES_SD_S || null,
    ZLES_SD_TXT: obj.ZLES_SD_TXT || null,
    ZLES_OTHR_S: obj.ZLES_OTHR_S || null,
    ZLES_OTHR_TXT: obj.ZLES_OTHR_TXT || null,
    ZLES_GROSS_RET: obj.ZLES_GROSS_RET || null,
    ZLES_GROSS_DED: obj.ZLES_GROSS_DED || null,
    ZLES_INTSD_S: obj.ZLES_INTSD_S || null,
    ZLES_INTSD_TXT: obj.ZLES_INTSD_TXT || null,
    ZLES_CSTOFCON_PAINT_S: obj.ZLES_CSTOFCON_PAINT_S || null,
    ZLES_CSTOFCON_PAINT_TXT: obj.ZLES_CSTOFCON_PAINT_TXT || null,
    ZNET_PYMNT1_S: obj.ZNET_PYMNT1_S || null,
    ZNET_BLNCPAY_S: obj.ZNET_BLNCPAY_S || null,
    ZNET_RETNTN_S: obj.ZNET_RETNTN_S || null,
    ZNET_LESDEDC_S: obj.ZNET_LESDEDC_S || null,
    ZNET_PYMNT2_S: obj.ZNET_PYMNT2_S || null,
    ZLES_OTHRDED_S: obj.ZLES_OTHRDED_S || null,
    ZLES_OTHRDED_TXT: obj.ZLES_OTHRDED_TXT || null,
    ZBLNC_CERTBY_S: obj.ZBLNC_CERTBY_S || null,
    ZBLNC_PBGFILENO_S: obj.ZBLNC_PBGFILENO_S || null,
    ZBLNC_OTHRS_S: obj.ZBLNC_OTHRS_S || null,
    ZLD: obj.ZLD || null,
    ZOBDNO_M: obj.ZOBDNO_M || null,
    ZCERMARKT_M: obj.ZCERMARKT_M || null,
    ZCERINSPEC_M: obj.ZCERINSPEC_M || null,
    ZCERGUARNTEE_M: obj.ZCERGUARNTEE_M || null,
    ZCERCOMP_M: obj.ZCERCOMP_M || null,
    ZILMS: obj.ZILMS || null,
    ZCPBGFILENO_M: obj.ZCPBGFILENO_M || null,
    ZINDEM_BNDFILENO_M: obj.ZINDEM_BNDFILENO_M || null,
    ZCHLLNNO_M: obj.ZCHLLNNO_M || null,
    ZCHLLNDATE_M: formatDate(obj.ZCHLLNDATE_M),
    ZCONSIGNNO_M: obj.ZCONSIGNNO_M || null,
    ZCONSIGNDATE_M: formatDate(obj.ZCONSIGNDATE_M),
    ZCARRIER_M: obj.ZCARRIER_M || null,
    ZACTLDELDATE1_M: formatDate(obj.ZACTLDELDATE1_M),
    ZACTLDELDATE2_M: formatDate(obj.ZACTLDELDATE2_M),
    ZACTLDELDATE3_M: formatDate(obj.ZACTLDELDATE3_M),
    ZPAYMNTPROCESS_M: formatDate(obj.ZPAYMNTPROCESS_M),
    REASON_DEDCTN: obj.REASON_DEDCTN || null,
    ZPBGFILENO_M: obj.ZPBGFILENO_M || null,
    ZSRVNO_M: obj.ZSRVNO_M || null,
    ZBILLNO: obj.ZBILLNO || null,
    ZBILLDATE: formatDate(obj.ZBILLDATE),
    ZSCHDELDATE1_S: formatDate(obj.ZSCHDELDATE1_S),
    ZSCHDELDATE2_S: formatDate(obj.ZSCHDELDATE2_S),
    ZSCHDELDATE3_S: formatDate(obj.ZSCHDELDATE3_S),
    ZDELAY1: obj.ZDELAY1 || null,
    ZDELAY2: obj.ZDELAY2 || null,
    ZDELAY3: obj.ZDELAY3 || null,
    CODE_1: obj.CODE_1 || null,
    CODE: obj.CODE || null,
    REMARKS: obj.REMARKS || null,
    REFERENCE: obj.REFERENCE || null,
    REMARKS_1: obj.REMARKS_1 || null,
    TEN_PER_AMOUNT: obj.TEN_PER_AMOUNT || null,
    COMMENTS_1: obj.COMMENTS_1 || null,
    COMMENTS: obj.COMMENTS || null,
    ZTEN_RETNTN_S: obj.ZTEN_RETNTN_S || null,
    ZTEN_LESDEDC_S: obj.ZTEN_LESDEDC_S || null,
    MIRO: obj.MIRO || null,
    MIRO_DATE: formatDate(obj.MIRO_DATE),
    ZTEN_PROCESSED_PYMT: obj.ZTEN_PROCESSED_PYMT || null,
    ED_EC: obj.ED_EC || null,
  };
  return pl;
};
const paymentAviceHeaderPayload = async (obj) => {
  if (!obj) {
    throw new Error("Please send valid payload");
  }
  const pl = {
    zlsch: obj.zlsch || obj.ZLSCH || "",
    bldat: formatDate(obj.bldat) || formatDate(obj.BLDAT),
    chect: obj.chect || obj.CHECT || "",
    hbkid: obj.hbkid || obj.HBKID || "",
    pridt: formatDate(obj.pridt) || formatDate(obj.PRIDT),
    lifnr: obj.lifnr || obj.LIFNR || "",
    adrnr: obj.adrnr || obj.ADRNR || "",
    bank_desc: obj.bank_desc || obj.BANK_DESC || "",
    pay_type: obj.pay_type || obj.PAY_TYPE || "",
    vblnr: obj.vblnr || obj.VBLNR || "",
  };
  return pl;
};

const paymentAviceLineItemsPayload = async (payload) => {
  if (!payload || !Array.isArray(payload) || !payload.length) {
    throw new Error("Please send valid payload");
  }
  const pl = payload.map((obj) => ({
    sgtxt: obj.sgtxt || obj.SGTXT || "",
    belnr: obj.belnr || obj.BELNR || "",
    gross: obj.gross || obj.GROSS || "",
    retention: obj.retention || obj.RETENTION || "",
    tds: obj.tds || obj.TDS || "",
    net: obj.net || obj.NET || "",
    augbl: obj.augbl || obj.AUGBL || "",
    line_amt: obj.line_amt || obj.LINE_AMT || "",
    row2: obj.row2 || obj.ROW2 || "",
    vblnr: obj.vblnr || obj.VBLNR || "",
  }));

  return pl;
};
const zbtsHeaderPayload = async (obj) => {
  console.log("oooo", obj);
  if (!obj) {
    throw new Error("Please send valid payload");
  }
  const pl = {
    zbtno: obj.zbtno || obj.ZBTNO,
    rerdat: formatDate(obj.rerdat) || formatDate(obj.RERDAT),
    rerzet: formatTime(obj.rerzet) || formatTime(obj.RERZET),
    rernam: obj.rernam || obj.RERNAM || "",
    rlaeda: formatDate(obj.rlaeda) || formatDate(obj.RLAEDA),
    rctime: formatTime(obj.rctime) || formatTime(obj.RCTIME),
    raenam: obj.raenam || obj.RAENAM || "",
    lifnr: obj.lifnr || obj.LIFNR || "",
    zvbno: obj.zvbno || obj.ZVBNO || "",
    ven_bill_date: formatDate(obj.ven_bill_date) || formatDate(obj.VEN_BILL_DATE),
    ebeln: obj.ebeln || obj.EBELN || "",
    dpernr1: obj.dpernr1 || obj.DPERNR1 || null,
    drerdat1: formatDate(obj.drerdat1) || formatDate(obj.DRERDAT1),
    drerzet1: formatTime(obj.drerzet1) || formatTime(obj.DRERZET1),
    drernam1: obj.drernam1 || obj.DRERNAM1 || "",
    dpernr2: obj.dpernr2 || obj.DPERNR2 || null,
    drerdat2: formatDate(obj.drerdat2) || formatDate(obj.DRERDAT2),
    drerzet2: formatTime(obj.drerzet2) || formatTime(obj.DRERZET2),
    drernam2: obj.drernam2 || obj.DRERNAM2 || "",
    daerdat: formatDate(obj.daerdat) || formatDate(obj.DAERDAT),
    daerzet: formatTime(obj.daerzet) || formatTime(obj.DAERZET),
    daernam: obj.daernam || obj.DAERNAM || "",
    dalaeda: formatDate(obj.dalaeda) || formatDate(obj.DALAEDA),
    daaenam: obj.daaenam || obj.DAAENAM || "",
    deerdat: formatDate(obj.deerdat) || formatDate(obj.DEERDAT),
    deerzet: formatTime(obj.deerzet) || formatTime(obj.DEERZET),
    deernam: obj.deernam || obj.DEERNAM || "",
    delaeda: formatDate(obj.delaeda) || formatDate(obj.DELAEDA),
    deaenam: obj.deaenam || obj.DEAENAM || "",
    dferdat: formatDate(obj.dferdat) || formatDate(obj.DFERDAT),
    dferzet: formatTime(obj.dferzet) || formatTime(obj.DFERZET),
    dfernam: obj.dfernam || obj.DFERNAM || "",
    dflaeda: formatDate(obj.dflaeda) || formatDate(obj.DFLAEDA),
    dfaenam: obj.dfaenam || obj.DFAENAM || "",
    zrmk1: obj.zrmk1 || obj.ZRMK1 || "",
    dstatus: obj.dstatus || obj.DSTATUS || "",
    fpernr1: obj.fpernr1 || obj.FPERNR1 || null,
    zrmk2: obj.zrmk2 || obj.ZRMK2 || "",
    fpernr2: obj.fpernr2 || obj.FPERNR2 || null,
    zdcomment: obj.zdcomment || obj.ZDCOMMENT || "",
    zrmk3: obj.zrmk3 || obj.ZRMK3 || "",
    zrmk4: obj.zrmk4 || obj.ZRMK4 || "",
    zfcomment: obj.zfcomment || obj.ZFCOMMENT || "",
    fstatus: obj.fstatus || obj.FSTATUS || "",
    bstatus: obj.bstatus || obj.BSTATUS || "",
    unitno: obj.unitno || obj.UNITNO || "",
    comno: obj.comno || obj.COMNO || "",
    frerdat: formatDate(obj.frerdat) || formatDate(obj.FRERDAT),
    frerzet: formatTime(obj.frerzet) || formatTime(obj.FRERZET),
    frernam: obj.frernam || obj.FRERNAM || "",
    frlaeda: formatDate(obj.frlaeda) || formatDate(obj.FRLAEDA),
    fraenam: obj.fraenam || obj.FRAENAM || "",
    faerdat: formatDate(obj.faerdat) || formatDate(obj.FAERDAT),
    faerzet: formatTime(obj.faerzet) || formatTime(obj.FAERZET),
    faernam: obj.faernam || obj.FAERNAM || "",
    falaeda: formatDate(obj.falaeda) || formatDate(obj.FALAEDA),
    faaenam: obj.faaenam || obj.FAAENAM || "",
    feerdat: formatDate(obj.feerdat) || formatDate(obj.FEERDAT),
    feerzet: formatTime(obj.feerzet) || formatTime(obj.FEERZET),
    feernam: obj.feernam || obj.FEERNAM || "",
    felaeda: formatDate(obj.felaeda) || formatDate(obj.FELAEDA),
    feaenam: obj.feaenam || obj.FEAENAM || "",
    fperdat: formatDate(obj.fperdat) || formatDate(obj.FPERDAT),
    fperzet: formatTime(obj.fperzet) || formatTime(obj.FPERZET),
    fpernam: obj.fpernam || obj.FPERNAM || "",
    fplaeda: formatDate(obj.fplaeda) || formatDate(obj.FPLAEDA),
    fpaenam: obj.fpaenam || obj.FPAENAM || "",
    bperdat: formatDate(obj.bperdat) || formatDate(obj.BPERDAT),
    bperzet: formatTime(obj.bperzet) || formatTime(obj.BPERZET),
    bpernam: obj.bpernam || obj.BPERNAM || "",
    bplaeda: formatDate(obj.bplaeda) || formatDate(obj.BPLAEDA),
    bpaenam: obj.bpaenam || obj.BPAENAM || "",
    hold: obj.hold || obj.HOLD || "",
    alert_gm: obj.alert_gm || obj.ALERT_GM || "",
    alert_dir: obj.alert_dir || obj.ALERT_DIR || "",
    alert_agm_dgm: obj.alert_agm_dgm || obj.ALERT_AGM_DGM || "",
  };
  return pl;
};
const zbtsLineItemsPayload = async (payload, zbtsHeaderPayload) => {
  if (!payload) {
    throw new Error("Please send valid payload");
  }
  const pl = payload.map((obj) => ({
    zbtno: obj.zbtno || obj.ZBTNO || zbtsHeaderPayload.zbtno || zbtsHeaderPayload.ZBTNO || "",
    srno: obj.srno || obj.SRNO || "",
    manno: obj.manno || obj.MANNO || null,
    zsection: obj.zsection || obj.ZSECTION || "",
    rmk: obj.rmk || obj.RMK || "",
    erdat: formatDate(obj.erdat) || formatDate(obj.ERDAT),
    erzet: formatTime(obj.erzet) || formatTime(obj.ERZET),
    ernam: obj.ernam || obj.ERNAM || "",
    dretseq: obj.dretseq || obj.DRETSEQ || "",
    alert_status: obj.alert_status || obj.ALERT_STATUS || ""
  }))
  // const pl = {
  //   zbtno: obj.zbtno || obj.ZBTNO || "",
  //   srno: obj.srno || obj.SRNO || "",
  //   manno: obj.manno || obj.MANNO || null,
  //   zsection: obj.zsection || obj.ZSECTION || "",
  //   rmk: obj.rmk || obj.RMK || "",
  //   erdat: formatDate(obj.erdat) || formatDate(obj.ERDAT),
  //   erzet: formatTime(obj.erzet) || formatTime(obj.ERZET),
  //   ernam: obj.ernam || obj.ERNAM || "",
  //   dretseq: obj.dretseq || obj.DRETSEQ || "",
  //   alert_status: obj.alert_status || obj.ALERT_STATUS || ""
  // }

  return pl;
};

module.exports = {
  paymentPayload,
  ztfi_bil_defacePayload,
  paymentAviceHeaderPayload,
  paymentAviceLineItemsPayload,
  zbtsHeaderPayload,
  zbtsLineItemsPayload
};
