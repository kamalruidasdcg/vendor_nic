const { getEpochTime } = require("../lib/utils");


/**
 * Modify payload object to insert data
 * @param {Object} payload 
 * @param {string} status 
 * @returns Object
 */

const sdbgPayload = (payload, status) => {

    const payloadObj = {
    // "id": 1, // auto incremant id
    "purchasing_doc_no": payload.purchasing_doc_no,
    "file_name": payload.fileName,
    "file_path": payload.filePath,
    "remarks": payload.remarks ? payload.remarks : null,
    "status": status,
    "updated_by": payload.updated_by,
    "bank_name": payload.bank_name ? payload.bank_name : null,
    "transaction_id": payload.transaction_id ? payload.transaction_id : null,
    "vendor_code": payload.vendor_code ? payload.vendor_code : null,
    "created_at": getEpochTime(),
    "created_by_name": payload.action_by_name,
    "created_by_id": payload.action_by_id,
    }

    return payloadObj;
}



module.exports = { sdbgPayload}