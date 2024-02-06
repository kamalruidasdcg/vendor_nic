const { getEpochTime } = require("../lib/utils");


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
        "status": status,
        "updated_by": payload.updated_by,
        "vendor_code": payload.vendor_code,
        "created_at":  payload.created_at ? payload.created_at : getEpochTime(),
        "created_by_name": payload.action_by_name,
        "created_by_id": payload.action_by_id,
        "isLocked": payload.isLocked,
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
        "file_name": payload.fileName ? payload.fileName : null,
        "file_path": payload.filePath ? payload.filePath : null,
        "remarks": payload.remarks,
        "status": status,
        "updated_by": payload.updated_by,
        "vendor_code": payload.vendor_code ? payload.vendor_code : null,
        "created_at":  payload.created_at ? payload.created_at : getEpochTime(),
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
        "file_path": payload.filePath ? payload.filePath: null,
        "remarks": payload.remarks ? payload.remarks : null,
        "assigned_to": payload.assigned_to ? payload.assigned_to : null,
        "assigned_from": payload.assigned_from ? payload.assigned_from : null,
        "status": status,
        "updated_by": payload.updated_by,
        "vendor_code": payload.vendor_code ? payload.vendor_code : null,
        "created_at":  payload.created_at ? payload.created_at : getEpochTime(),
        "created_by_name": payload.action_by_name ? payload.action_by_name : null,
        "created_by_id": payload.action_by_id,
    }

    return payloadObj;
}

const wdcPayload = (payload, status) => {

    const payloadObj = {
        "purchasing_doc_no": payload.purchasing_doc_no,
        "vendor_code": payload.vendor_code ? payload.vendor_code : null,
        "remarks": payload.remarks ? payload.remarks : null,
        "status": status,
        "updated_by": payload.updated_by,
        "created_at":  payload.created_at ? payload.created_at : getEpochTime(),
        "created_by_name": payload.action_by_name,
        "created_by_id": payload.action_by_id,
    }

    return payloadObj;
}

const shippingDocumentsPayload = (payload, status) => {

    const payloadObj = {
        "purchasing_doc_no": payload.purchasing_doc_no,
        "file_name": payload.fileName ? payload.fileName: null,
        "file_path": payload.filePath ? payload.filePath : null,
        "file_type_id": payload.file_type_id,
        "file_type_name": payload.file_type_name,
        "remarks": payload.remarks ? payload.remarks : null,
        "updated_by": payload.updated_by,
        "vendor_code": payload.vendor_code ? payload.vendor_code : null,
        "created_at":  payload.created_at,
        "created_by_id": payload.created_by_id,
    }

    return payloadObj;
}
const inspectionCallLetterPayload = (payload) => {

    const payloadObj = {
        "purchasing_doc_no": payload.purchasing_doc_no,
        "file_name": payload.fileName ? payload.fileName: null,
        "file_path": payload.filePath ? payload.filePath : null,
        "file_type_id": payload.file_type_id,
        "file_type_name": payload.file_type_name,
        "remarks": payload.remarks ? payload.remarks : null,
        "updated_by": payload.updated_by,
        "vendor_code": payload.vendor_code ? payload.vendor_code : null,
        "created_at":  payload.created_at,
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
                "MTART": element.MTART
            }

            obj[key] = [...val, newVal]

        } else {
            obj[key] = [{
                "poType": element.poType,
                "m_number": element.m_number,
                "MTART": element.MTART
            }]
        }

    });

    return obj;
}



module.exports = { sdbgPayload, drawingPayload, qapPayload, poModifyData, wdcPayload, shippingDocumentsPayload, poDataModify, inspectionCallLetterPayload }