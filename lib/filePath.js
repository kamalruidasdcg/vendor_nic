const { ADD_DRAWING, NEW_SDBG } = require("./tableName");

module.exports = {
    "drawing": { filePath: "/uploads/drawing/", tableName: ADD_DRAWING },
    "sdbg": { filePath: "/uploads/sdbg/", tableName: NEW_SDBG }
}