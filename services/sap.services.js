const { poolQuery } = require("../config/pgDbConfig");
const { getEpochTime, getYyyyMmDd, formatDate, formatTime } = require("../lib/utils");


/**
 * Modify SDBG Payload object to insert data
 * @param {Object} payload 
 * @param {string} status 
 * @returns Object
 */

exports.zfi_bgm_1_Payload = async (obj) => {
    // if (!obj.data && !obj.length) {
    //     throw new Error("Please send valid payload");
    // }

    // return  { id :getEpochTime() ,purchasing_doc_no : obj.purchasing_doc_no  };
    const pl =
    {
        "FILE_NO": obj.bg_file_no || "",
        "REF_NO": obj.reference_no || "",
        "BANKERS_NAME": obj.bank_name || "",
        "BANKERS_BRANCH": obj.branch_name || "",
        "BANKERS_ADD1": obj.bank_addr1 || "",
        "BANKERS_ADD2": obj.bank_addr2 || "",
        "BANKERS_ADD3": obj.bank_addr3 || "",
        "BANKERS_CITY": obj.bank_city || "",
        "B_PIN_CODE": obj.bank_pin_code || "",
        "BANK_GU_NO": obj.bg_no || "",
        "BG_DATE": (obj.bg_date && obj.bg_date != "") ? getYyyyMmDd(obj.bg_date) : "",
        "BG_AMOUNT": obj.bg_ammount || "",
        "PO_NUMBER": obj.purchasing_doc_no || "",
        "DEPARTMENT": obj.department || "",
        "PO_DATE": obj.po_date ? obj.po_date : '00000000',
        "YARD_NO": obj.yard_no || 0,
        "VALIDITY_DATE": (obj.validity_date && obj.validity_date != "") ? getYyyyMmDd(obj.validity_date) : "",
        "CLAIM_PERIOD": (obj.claim_priod && obj.claim_priod != "") ? getYyyyMmDd(obj.claim_priod) : "",
        "CHECKLIST_REF": obj.reference_no || "",
        // "CHECKLIST_DATE": (obj.check_list_date && obj.check_list_date != "") ? getYyyyMmDd(obj.check_list_date) : "",
        "CHECKLIST_DATE": (obj.bg_recived_date && obj.bg_recived_date != "") ? getYyyyMmDd(obj.bg_recived_date) : "",
        "BG_TYPE": obj.bg_type || "",
        "VENDOR_NAME": obj.vendor_name || "",
        "VENDOR_ADD1": obj.vendor_address1 || "",
        "VENDOR_ADD2": obj.vendor_address2 || "",
        "VENDOR_ADD3": obj.vendor_address3 || "",
        "VENDOR_CITY": obj.vendor_city || "",
        "V_PIN_CODE": obj.vendor_pin_code || 0,
        "CONFIRMATION": obj.confirmation || "yes",
        "EXTENTION_DATE1": (obj.extension_date1 && obj.extension_date1 != "") ? obj.extension_date1 : "",
        "EXTENTION_DATE2": (obj.extension_date2 && obj.extension_date2 != "") ? obj.extension_date2 : "",
        "EXTENTION_DATE3": (obj.extension_date3 && obj.extension_date3 != "") ? obj.extension_date3 : "",
        "EXTENTION_DATE4": (obj.extension_date4 && obj.extension_date4 != "") ? obj.extension_date3 : "",
        "EXTENTION_DATE5": (obj.extension_date5 && obj.extension_date5 != "") ? obj.extension_date4 : "",
        "EXTENTION_DATE6": (obj.extension_date6 && obj.extension_date6 != "") ? obj.extension_date5 : "",
        "RELEASE_DATE": (obj.release_date && obj.release_date != "") ? obj.release_date : "",
        "DEM_NOTICE_DATE": (obj.demand_notice_date && obj.demand_notice_date != "") ? obj.demand_notice_date : "",
        "EXT_LETTER_DATE": (obj.entension_letter_date && obj.entension_letter_date != "") ? obj.entension_letter_date : "",
    };

    return pl;
}
exports.ztfi_bil_defacePayload = async (payload) => {
    if (!payload.data && !payload.data.length) {
        throw new Error("Please send valid payload");
    }
    const pl = payload.data.map((obj) => (
        {
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
        }
    ));
    return pl;
}
exports.ztfi_bil_defacePayload = async (payload) => {
    if (!payload.data && !payload.data.length) {
        throw new Error("Please send valid payload");
    }
    const pl = payload.data.map((obj) => (
        {
            ZREGNUM: obj.ZREGNUM || null,
            SEQNO: obj.SEQNO || null,
            ZBILLPER: obj.ZBILLPER || null,
            ZCREATE: obj.ZCREATE || null,
            ZDELETE: obj.ZDELETE || null,
            ZBILLTYPE: obj.ZBILLTYPE || null,
            ZRECORD: obj.ZRECORD || null,
            ZREGDATE: obj.ZREGDATE || null,
            ZPONO: obj.ZPONO || null,
            ZVENDOR: obj.ZVENDOR || null,
            ZCREATEDBY: obj.ZCREATEDBY || null,
            ZCREATEDON: obj.ZCREATEDON || null,
            ZCREATEDAT: obj.ZCREATEDAT || null,
            ZMODIFIEDBY: obj.ZMODIFIEDBY || null,
            ZMODIFIEDON: obj.ZMODIFIEDON || null,
            ZMODIFIEDAT: obj.ZMODIFIEDAT || null,
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
            ZCHLLNDATE_M: obj.ZCHLLNDATE_M || null,
            ZCONSIGNNO_M: obj.ZCONSIGNNO_M || null,
            ZCONSIGNDATE_M: obj.ZCONSIGNDATE_M || null,
            ZCARRIER_M: obj.ZCARRIER_M || null,
            ZACTLDELDATE1_M: obj.ZACTLDELDATE1_M || null,
            ZACTLDELDATE2_M: obj.ZACTLDELDATE2_M || null,
            ZACTLDELDATE3_M: obj.ZACTLDELDATE3_M || null,
            ZPAYMNTPROCESS_M: obj.ZPAYMNTPROCESS_M || null,
            REASON_DEDCTN: obj.REASON_DEDCTN || null,
            ZPBGFILENO_M: obj.ZPBGFILENO_M || null,
            ZSRVNO_M: obj.ZSRVNO_M || null,
            ZBILLNO: obj.ZBILLNO || null,
            ZBILLDATE: obj.ZBILLDATE || null,
            ZSCHDELDATE1_S: obj.ZSCHDELDATE1_S || null,
            ZSCHDELDATE2_S: obj.ZSCHDELDATE2_S || null,
            ZSCHDELDATE3_S: obj.ZSCHDELDATE3_S || null,
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
            MIRO_DATE: obj.MIRO_DATE || null,
            ZTEN_PROCESSED_PYMT: obj.ZTEN_PROCESSED_PYMT || null,
            ED_EC: obj.ED_EC || null,
        }
    ));
    return pl;
}


exports.zfi_bgm_1_Payload_sap = async (obj) => {
    const pl =
    {
        "FILE_NO": obj.file_no || obj.FILE_NO,
        "REF_NO": obj.ref_no || obj.REF_NO,
        "BANKERS_NAME": obj.bank_name || obj.BANKERS_NAME,
        "BANKERS_BRANCH": obj.branch_name || obj.BANKERS_BRANCH || "",
        "BANKERS_ADD1": obj.bank_addr1 || obj.BANKERS_ADD1 || "",
        "BANKERS_ADD2": obj.bank_addr2 || obj.BANKERS_ADD2 || "",
        "BANKERS_ADD3": obj.bank_addr3 || obj.BANKERS_ADD3 || "",
        "BANKERS_CITY": obj.bank_city || obj.BANKERS_CITY || "",
        "B_PIN_CODE": obj.bank_pin_code || obj.B_PIN_CODE || null,
        "BANK_GU_NO": obj.bg_no || obj.BANK_GU_NO || "",
        "BG_DATE": formatDate(obj.bg_date) || formatDate(obj.BG_DATE),
        "BG_AMOUNT": obj.bg_ammount || obj.BG_AMOUNT || "",
        "PO_NUMBER": obj.purchasing_doc_no || obj.PO_NUMBER || "",
        "DEPARTMENT": obj.department || obj.DEPARTMENT || "",
        "PO_DATE": formatDate(obj.po_date) || formatDate(obj.PO_DATE),
        "YARD_NO": obj.yard_no || obj.YARD_NO || null,
        "VALIDITY_DATE": formatDate(obj.validity_date) || formatDate(obj.VALIDITY_DATE),
        "CLAIM_PERIOD": formatDate(obj.claim_priod) || formatDate(obj.CLAIM_PERIOD),
        "CHECKLIST_REF": obj.reference_no || "",
        "CHECKLIST_DATE": formatDate(obj.check_list_date) || formatDate(obj.CHECKLIST_DATE),
        "BG_TYPE": obj.bg_type || obj.BG_TYPE || "",
        "VENDOR_NAME": obj.vendor_name || obj.VENDOR_NAME || "",
        "VENDOR_ADD1": obj.vendor_address1 || obj.VENDOR_ADD1 || "",
        "VENDOR_ADD2": obj.vendor_address2 || obj.VENDOR_ADD2 || "",
        "VENDOR_ADD3": obj.vendor_address3 || obj.VENDOR_ADD3 || "",
        "VENDOR_CITY": obj.vendor_city || obj.VENDOR_CITY || "",
        "V_PIN_CODE": obj.vendor_pin_code || obj.V_PIN_CODE || null,
        "CONFIRMATION": obj.confirmation || "yes",
        "EXTENTION_DATE1": formatDate(obj.extension_date1) || formatDate(obj.EXTENTION_DATE1),
        "EXTENTION_DATE2": formatDate(obj.extension_date2) || formatDate(obj.EXTENTION_DATE2),
        "EXTENTION_DATE3": formatDate(obj.extension_date3) || formatDate(obj.EXTENTION_DATE3),
        "EXTENTION_DATE4": formatDate(obj.extension_date4) || formatDate(obj.EXTENTION_DATE4),
        "EXTENTION_DATE5": formatDate(obj.extension_date5) || formatDate(obj.EXTENTION_DATE5),
        "EXTENTION_DATE6": formatDate(obj.extension_date6) || formatDate(obj.EXTENTION_DATE6),
        "RELEASE_DATE": formatDate(obj.release_date) || formatDate(obj.RELEASE_DATE),
        "DEM_NOTICE_DATE": formatDate(obj.demand_notice_date) || formatDate(obj.DEM_NOTICE_DATE),
        "EXT_LETTER_DATE": formatDate(obj.entension_letter_date) || formatDate(obj.EXT_LETTER_DATE),
    };

    return pl;
}



function getData(client, tableName) {
    return {
        count: async (condition = '1=1') => {
            try {
                const query = `SELECT COUNT(*) FROM ${tableName} WHERE ${condition};`;
                const result = await poolQuery({ client, query, values: [] });
                return result[0].count;
            } catch (err) {
                console.error('Error executing count query:', err);
                throw err;
            }
        },
        data: async (condition = '1=1') => {
            try {
                const query = `SELECT * FROM ${tableName} WHERE ${condition};`;
                const result = await poolQuery({ client, query, values: [] });
                return result;
            } catch (err) {
                console.error('Error executing data query:', err);
                throw err;
            }
        },
    };
}

function isPresentInObps(client, condition = '1=1', tableName = 'ekko') {
    // let tableName = 'ekko';
    return {
        count: async () => {
            try {
                const query = `SELECT COUNT(*) FROM ${tableName} WHERE ${condition};`;
                const result = await poolQuery({ client, query, values: [] });
                return parseInt(result[0].count);
            } catch (err) {
                console.error('Error executing count query:', err);
                throw err;
            }
        },
        data: async () => {
            try {
                const query = `SELECT * FROM ${tableName} WHERE ${condition};`;
                const result = await poolQuery({ client, query, values: [] });
                return result;
            } catch (err) {
                console.error('Error executing data query:', err);
                throw err;
            }
        },
    };
}


module.exports = { getData, isPresentInObps }