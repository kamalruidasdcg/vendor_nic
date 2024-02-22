const { getEpochTime } = require("../lib/utils");


/**
 * Modify SDBG Payload object to insert data
 * @param {Object} payload 
 * @param {string} status 
 * @returns Object
 */

const sdbgPayloadVendor = (obj, status) => {

    const payloadObj = {
        purchasing_doc_no: obj.purchasing_doc_no ? obj.purchasing_doc_no : null,
        bank_name: obj.bank_name ? obj.bank_name : null,
        branch_name: obj.branch_name ? obj.branch_name : null,
        ifsc_code: obj.ifsc_code ? obj.ifsc_code : null,
        bank_addr1: obj.bank_addr1 ? obj.bank_addr1 : null,
        bank_addr2: obj.bank_addr2 ? obj.bank_addr2 : null,
        bank_addr3: obj.bank_addr3 ? obj.bank_addr3 : null,
        bank_city: obj.bank_city ? obj.bank_city : null,
        pincode: obj.pincode ? obj.pincode : null,
        bg_no: obj.user_type ? obj.user_type : null,
        bg_date: obj.bg_date ? obj.bg_date : null,
        bg_ammount: obj.bg_ammount ? obj.bg_ammount : null,
        department: obj.department ? obj.department : null,
        vendor_pincode: obj.vendor_pincode ? obj.vendor_pincode : null,
        yard_no: obj.yard_no ? obj.yard_no : null,
        extension_date1: obj.extension_date1 ? obj.extension_date1 : null,
        release_date: obj.release_date ? obj.release_date : null,
        demand_notice_date: obj.demand_notice_date ? obj.demand_notice_date : null,
        extension_date: obj.extension_date ? obj.extension_date : null,
        status: obj.status ? obj.status : null,
        created_at: obj.created_at ? obj.created_at : null,
        remarks: obj.remarks ? obj.remarks : null,
        file_name: obj.file_name ? obj.file_name : null,
        vendor_code: obj.vendor_code ? obj.vendor_code : null,
        file_path: obj.file_path ? obj.file_path : null,
        updated_by: obj.updated_by ? obj.updated_by : null,
        created_by_id: obj.created_by_id ? obj.created_by_id : null,
    }

    return payloadObj;
}
/**
 * Modify SDBG Payload object to insert data
 * @param {Object} payload 
 * @param {string} status 
 * @returns Object
 */

const sdbgPayload = (payload, status) => {

    const payloadObj = {
        // "id": 1, // auto incremant id
        "purchasing_doc_no": payload.purchasing_doc_no,
        "file_name": payload.fileName ? payload.fileName : null,
        "file_path": payload.filePath ? payload.filePath : null,
        "remarks": payload.remarks ? payload.remarks : null,
        "status": payload.status ? payload.status : null,
        "updated_by": payload.updated_by,
        "vendor_code": payload.vendor_code ? payload.vendor_code : null,
        "assigned_from": payload.assigned_from ? payload.assigned_from : null,
        "assigned_to": payload.assigned_to ? payload.assigned_to : null,
        "created_at": payload.created_at ? payload.created_at : getEpochTime(),
        "created_by_name": payload.action_by_name ? payload.action_by_name : null,
        "created_by_id": payload.created_by_id,
    }

    return payloadObj;
}

/**
 * Modify drawing payload object to insert data
 * @param {Object} payload 
 * @param {string} status 
 * @returns Object
 */
const drawingPayload = (payload, status) => {

    const payloadObj = {
        // "id": 1, // auto incremant id
        "purchasing_doc_no": payload.purchasing_doc_no,
        "file_name": payload.fileName || null,
        "file_path": payload.filePath || null,
        "remarks": payload.remarks || null,
        "status": status,
        "actionType": payload.actionType || null,
        "actionType_id": payload.actionType_id || null,
        "updated_by": payload.updated_by,
        "vendor_code": payload.vendor_code || null,
        "created_at": payload.created_at || getEpochTime(),
        "created_by_id": payload.created_by_id,
    }

    return payloadObj;
}
/**
 * Modify qap payload object to insert data
 * @param {Object} payload 
 * @param {string} status 
 * @returns Object
 */
const qapPayload = (payload, status) => {

    const payloadObj = {
        // "id": 1, // auto incremant id
        "purchasing_doc_no": payload.purchasing_doc_no,
        "file_name": payload.fileName ? payload.fileName : null,
        "file_path": payload.filePath ? payload.filePath : null,
        "remarks": payload.remarks ? payload.remarks : null,
        "assigned_to": payload.assigned_to ? payload.assigned_to : null,
        "assigned_from": payload.assigned_from ? payload.assigned_from : null,
        "status": status,
        "updated_by": payload.updated_by,
        "vendor_code": payload.vendor_code ? payload.vendor_code : null,
        "created_at": payload.created_at ? payload.created_at : getEpochTime(),
        "created_by_name": payload.action_by_name ? payload.action_by_name : null,
        "created_by_id": payload.action_by_id,
    }

    return payloadObj;
}

const wdcPayload = (payload) => {

    const payloadObj = {
        "purchasing_doc_no": payload.purchasing_doc_no,
        "vendor_code": payload.vendor_code,
        "file_name": payload.fileName ? payload.fileName : null,
        "file_path": payload.filePath ? payload.filePath : null,
        "remarks": payload.remarks,
        "status": payload.status,
        "updated_by": payload.updated_by,
        "created_at": payload.created_at ? payload.created_at : getEpochTime(),
        "created_by_id": payload.created_by_id,
    }

    return payloadObj;
}

const shippingDocumentsPayload = (payload, status) => {

    const payloadObj = {
        "purchasing_doc_no": payload.purchasing_doc_no,
        "file_name": payload.fileName ? payload.fileName : null,
        "file_path": payload.filePath ? payload.filePath : null,
        "file_type_id": payload.file_type_id,
        "file_type_name": payload.file_type_name,
        "remarks": payload.remarks ? payload.remarks : null,
        "updated_by": payload.updated_by,
        "vendor_code": payload.vendor_code ? payload.vendor_code : null,
        "created_at": payload.created_at,
        "created_by_id": payload.created_by_id,
    }

    return payloadObj;
}
const inspectionCallLetterPayload = (payload) => {

    const payloadObj = {
        "purchasing_doc_no": payload.purchasing_doc_no,
        "file_name": payload.fileName ? payload.fileName : null,
        "file_path": payload.filePath ? payload.filePath : null,
        "file_type_id": payload.file_type_id,
        "file_type_name": payload.file_type_name,
        "remarks": payload.remarks ? payload.remarks : null,
        "updated_by": payload.updated_by,
        "vendor_code": payload.vendor_code ? payload.vendor_code : null,
        "created_at": payload.created_at,
        "created_by_id": payload.created_by_id,
    }

    return payloadObj;
}

const poModifyData = (queryResult) => {

    const resArr = []
    if (!Array.isArray(queryResult) && !queryResult.result) return [];
    const result = queryResult.map((row) => {
        let po = {};
        let sdbg = {};
        let drawing = {};

        for (const key in row) {
            const [table, column] = key.split('.');

            switch (table) {
                case 'ekko':
                    po[column] = row[key];
                    break;
                case 'new_sdbg':
                    sdbg[column] = row[key];
                    break;
                case 'add_drawing':
                    drawing[column] = row[key];
                    break;
            }

            resArr.push({ po, sdbg, drawing });
            // po = sdbg = drawing = {};
        }


        return { po, sdbg, drawing };
    });

    return result;
}



async function poDataModify(data) {
    if (!data || !Array.isArray(data) || !data.length) return [];
    let obj = {};
    data.forEach(element => {
        let key = element.poNb;

        if (key in obj) {
            let val = obj[key];
            let newVal = {
                "poType": element.poType,
                "m_number": element.m_number,
                "MTART": element.MTART,
                "vendor_code": element.vendor_code,
                "vendor_name": element.vendor_name,
                "wbs_id": element.wbs_id,
                "project_code": element.project_code,
            }

            obj[key] = [...val, newVal]

        } else {
            obj[key] = [{
                "poType": element.poType,
                "m_number": element.m_number,
                "MTART": element.MTART,
                "vendor_code": element.vendor_code,
                "vendor_name": element.vendor_name,
                "wbs_id": element.wbs_id,
                "project_code": element.project_code,
            }]
        }

    });

    return obj;
}



module.exports = { sdbgPayload, sdbgPayloadVendor, drawingPayload, qapPayload, poModifyData, wdcPayload, shippingDocumentsPayload, poDataModify, inspectionCallLetterPayload }