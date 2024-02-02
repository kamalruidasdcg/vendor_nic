

/**
 * Modify SDBG Payload object to insert data
 * @param {Object} payload 
 * @param {string} status 
 * @returns Object
 */
const pfPayload = (payload) => {

    const payloadObj = {
        "purchasing_doc_no": payload.purchasing_doc_no ? payload.purchasing_doc_no : null,
        "file_name": payload.fileName ? payload.fileName : null,
        "file_path": payload.filePath ? payload.filePath : null,
        "vendor_code": payload.vendor_code ? payload.vendor_code : null,
        "remarks": payload.remarks ? payload.remarks : null,
        "status": payload.status,
        "updated_by": payload.updated_by,
        "created_at": payload.created_at,
        "created_by_id": payload.created_by_id,
    }

    return payloadObj;
}


module.exports = { pfPayload }