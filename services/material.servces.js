

/**
 * Modify SDBG Payload object to insert data
 * @param {Object} payload 
 * @param {string} status 
 * @returns Object
 */
const wmcPayload = (payload) => {

    const payloadObj = {
        "purchasing_doc_no": payload.purchasing_doc_no,
        "file_name": payload.fileName ? payload.fileName : null,
        "file_path": payload.filePath ? payload.filePath : null,
        "document_type": payload.document_type ? payload.document_type : null,
        "remarks": payload.remarks ? payload.remarks : null,
        "status": payload.status,
        "updated_by": payload.updated_by,
        "created_at":  payload.created_at,
        "created_by_id": payload.created_by_id,
    }

    return payloadObj;
}
const mrsPayload = (payload) => {

    const payloadObj = {
        "purchasing_doc_no": payload.purchasing_doc_no,
        "file_name": payload.fileName ? payload.fileName : null,
        "file_path": payload.filePath ? payload.filePath : null,
        "document_type": payload.document_type ? payload.document_type : null,
        "remarks": payload.remarks ? payload.remarks : null,
        "status": payload.status,
        "updated_by": payload.updated_by,
        "created_at":  payload.created_at,
        "created_by_id": payload.created_by_id,
    }

    return payloadObj;
}

module.exports = { wmcPayload, mrsPayload }