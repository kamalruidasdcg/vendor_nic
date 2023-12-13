const { getEpochTime } = require("../lib/utils");

/*
* Modify drawing payload object to insert data
* @param {Object} payload 
* @param {string} status 
* @returns Object
*/
const paymentPayload = (payload) => {

    const payloadObj = {
        // "id": 1, // auto incremant id
        "purchasing_doc_no": payload.purchasing_doc_no,
        "file_name": payload.fileName,
        "file_path": payload.filePath,
        "vendor_code": payload.vendor_code ? payload.vendor_code : null,
        "created_at": payload.created_at ? payload.created_at : getEpochTime(),
        "created_by_name": payload.action_by_name,
        "created_by_id": payload.action_by_id,
    }

    return payloadObj;
}

module.exports = { paymentPayload }
