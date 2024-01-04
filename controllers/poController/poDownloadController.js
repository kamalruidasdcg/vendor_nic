
const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const fileDetails = require("../../lib/filePath");
const path = require('path');



const download = async (req, res) => {

    // const queryParams = req.query;

    const typeArr = ["drawing", "sdbg", "qap"]

    const { id, type } = req.query;

    if (!typeArr.includes(type)) {
        return resSend(res, false, 400, "Please send valid type ! i.e. drawing, sdbg, qap", null, null)
    }
    let fileFoundQuery = "";

    const tableName = fileDetails[type]["tableName"];
    const downaoadPath = fileDetails[type]["filePath"];

    switch (type) {
        case "drawing":
            fileFoundQuery = `SELECT * FROM ${tableName} WHERE drawing_id = ?`
            break;
        case "sdbg":
            fileFoundQuery = `SELECT * FROM ${tableName} WHERE id = ?`
            break;
        case "qap":
            fileFoundQuery = `SELECT * FROM ${tableName} WHERE id = ?`
            break;

        default:
            break;
    }

    if (!fileFoundQuery) {
        return resSend(res, false, 404, "file not found or invalid query", fileFoundQuery, null)
    }

    const response = await query({ query: fileFoundQuery, values: [id] });

    if (!response?.length || !response[0]?.file_name) {
        return resSend(res, true, 200, `file not uploaded with this id ${id}`, null, null)
    }

    const selectedPath = `${downaoadPath}${response[0].file_name}`;
    const downloadPath = path.join(__dirname, "..", "..", selectedPath);
    res.download((downloadPath), (err) => {
        if (err)
            resSend(res, false, 404, "file not found", err, null)

    });
}



module.exports = { download }