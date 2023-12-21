const { getEpochTime } = require("../lib/utils");


/**
 * Modify SDBG Payload object to insert data
 * @param {Object} payload 
 * @param {string} status 
 * @returns Object
 */

exports.zfi_bgm_1_Payload = async (payload) => {
    if(!payload.data && !payload.data.length) {
        throw new Error("Please send valid payload");
    }
    const pl = payload.data.map((obj) => (
        {
            "FILE_NO": (obj.FILE_NO) ? obj.FILE_NO : null,
            "BANKERS_NAME": (obj.BANKERS_NAME) ? obj.BANKERS_NAME : null,
            "BANKERS_BRANCH": (obj.BANKERS_BRANCH) ? obj.BANKERS_BRANCH : null,
            "BANKERS_ADD1": (obj.BANKERS_ADD1) ? obj.BANKERS_ADD1 : null,
            "BANKERS_ADD2": (obj.BANKERS_ADD2) ? obj.BANKERS_ADD2 : null,
            "BANKERS_ADD3": (obj.BANKERS_ADD3) ? obj.BANKERS_ADD3 : null,
            "BANKERS_CITY": (obj.BANKERS_CITY) ? obj.BANKERS_CITY : null,
            "B_PIN_CODE": (obj.B_PIN_CODE) ? obj.B_PIN_CODE : null,
            "BANK_GU_NO": (obj.BANK_GU_NO) ? obj.BANK_GU_NO : null,
            "BG_DATE": (obj.BG_DATE) ? obj.BG_DATE : null,
            "BG_AMOUNT": (obj.BG_AMOUNT) ? obj.BG_AMOUNT : null,
            "PO_NUMBER": (obj.PO_NUMBER) ? obj.PO_NUMBER : null,
            "DEPARTMENT": (obj.DEPARTMENT) ? obj.DEPARTMENT : null,
            "PO_DATE": (obj.PO_DATE) ? obj.PO_DATE : null,
            "YARD_NO": (obj.YARD_NO) ? obj.YARD_NO : null,
            "VALIDITY_DATE": (obj.VALIDITY_DATE) ? obj.VALIDITY_DATE : null,
            "CLAIM_PERIOD": (obj.CLAIM_PERIOD) ? obj.CLAIM_PERIOD : null,
            "CHECKLIST_REF": (obj.CHECKLIST_REF) ? obj.CHECKLIST_REF : null,
            "CHECKLIST_DATE": (obj.CHECKLIST_DATE) ? obj.CHECKLIST_DATE : null,
            "BG_TYPE": (obj.BG_TYPE) ? obj.BG_TYPE : null,
            "VENDOR_NAME": (obj.VENDOR_NAME) ? obj.VENDOR_NAME : null,
            "VENDOR_ADD1": (obj.VENDOR_ADD1) ? obj.VENDOR_ADD1 : null,
            "VENDOR_ADD2": (obj.VENDOR_ADD2) ? obj.VENDOR_ADD2 : null,
            "VENDOR_ADD3": (obj.VENDOR_ADD3) ? obj.VENDOR_ADD3 : null,
            "VENDOR_CITY": (obj.VENDOR_CITY) ? obj.VENDOR_CITY : null,
            "V_PIN_CODE": (obj.V_PIN_CODE) ? obj.V_PIN_CODE : null,
            "CONFIRMATION": (obj.CONFIRMATION) ? obj.CONFIRMATION : null,
            "EXTENTION_DATE1": (obj.EXTENTION_DATE1) ? obj.EXTENTION_DATE1 : null,
            "EXTENTION_DATE2": (obj.EXTENTION_DATE2) ? obj.EXTENTION_DATE2 : null,
            "EXTENTION_DATE3": (obj.EXTENTION_DATE3) ? obj.EXTENTION_DATE3 : null,
            "EXTENTION_DATE4": (obj.EXTENTION_DATE4) ? obj.EXTENTION_DATE4 : null,
            "EXTENTION_DATE5": (obj.EXTENTION_DATE5) ? obj.EXTENTION_DATE5 : null,
            "EXTENTION_DATE6": (obj.EXTENTION_DATE6) ? obj.EXTENTION_DATE6 : null,
            "RELEASE_DATE": (obj.RELEASE_DATE) ? obj.RELEASE_DATE : null,
            "DEM_NOTICE_DATE": (obj.DEM_NOTICE_DATE) ? obj.DEM_NOTICE_DATE : null,
            "EXT_LETTER_DATE": (obj.EXT_LETTER_DATE) ? obj.EXT_LETTER_DATE : null,
        }
    ));
    return pl;
}

