const { ADD_DRAWING, NEW_SDBG, QAP_SUBMISSION } = require("./tableName");

module.exports = {
    "drawing": { filePath: "/uploads/drawing/", tableName: ADD_DRAWING },
    "sdbg": { filePath: "/uploads/sdbg/", tableName: NEW_SDBG },
    "qap": { filePath: "/uploads/qap/", tableName: QAP_SUBMISSION }
}