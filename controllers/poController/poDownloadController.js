
const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const fileDetails = require("../../lib/filePath");
const path = require('path');
const { QAP, RIC } = require("../../lib/depertmentMaster");
const { POfileFilter, POfileFilterOrderBy } = require("../../lib/fetchFileDirectory");



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
            fileFoundQuery = `SELECT * FROM ${tableName} WHERE id = ?`
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

const tncdownload = async (req, res) => {

    try {

        const tokenData = { ...req.tokenData };
        const { purchesing_doc_no } = req.query;

        if (!purchesing_doc_no) {
            return resSend(res, false, 200, "You dont have access", null, null);
        }

        if (tokenData.department_id == QAP || tokenData.department_id == RIC) {

            const fileName = `${purchesing_doc_no}.pdf`
            const downloadPath = path.join(__dirname, "..", "..", "uploads", "tncminutes", fileName);
            const q = `SELECT file_name, file_path, file_type, purchasing_doc_no FROM tnc_minutes WHERE purchasing_doc_no = ? LIMIT 1`;
            const result = await query({ query: q, values: [purchesing_doc_no] });
            if (result.length) {
                const response = [{ ...result[0], full_file_path: downloadPath }];
                resSend(res, true, 200, "File fetched successfully", response, null);
            } else {
                resSend(res, true, 200, "No file found", [], null);

            }

            // res.download((downloadPath), (err) => {
            //     if (err)
            //         resSend(res, false, 404, "file not found", err, null)
            // });

        } else {

            resSend(res, false, 401, "You dont have access", null, null);
        }
    } catch (error) {

        return resSend(res, false, 500, "INTERNL SERVER ERROR", {}, null);
    }


}


const downloadLatest = async (req, res) => {
    try {

        if (!req.query.poNo) {
            return resSend(res, false, 400, "Please send PO number", null, null);
        }
        let file = {}
        try {

            file = await POfileFilter(req.query.poNo);

            if (file.success && file?.data?.length) {
                const fileName = file.data[0]
                const directoryPath = path.join(__dirname, '..', '..', 'sapuploads', 'po', `${fileName}`);
                const file_path = path.join('sapuploads', 'po', `${fileName}`)
                const response = [{ full_file_path: directoryPath, file_name: fileName, file_path }];
                
                // res.download(directoryPath, (err) => {
                //     if (err)
                //     return resSend(res, false, 404, "file not found", err, null)
                // });

                if(!fileName) {
                    return resSend(res, false, 404, "file not found", err, null)
                }
                resSend(res, true, 200, "File fetched successfully", response, null);
            } else {
                resSend(res, true, 200, file.msg, file.data, null);
            }
        } catch (error) {
            return resSend(res, false, 500, "GET FILE ERROR", error, null);
        }

    } catch (error) {
        console.log("download po api error", error);
        return resSend(res, false, 500, "INTERNL SERVER ERROR", {}, null);
    }
}

const getPoFileList = async (req, res) => {
    try {

        if (!req.query.poNo) {
            return resSend(res, false, 400, "Please send PO number", null, null);
        }
        let files = {}
        try {

            files = await POfileFilterOrderBy(req.query.poNo);

            if (files.success && files?.data?.length) {

                const resustFiles = files.data.map(file => {
                   
                    const directoryPath = path.join(__dirname, '..', '..', 'sapuploads', 'po', `${file}`);
                    const file_path = path.join('sapuploads', 'po', `${file}`);
                    let fileInfo = {};
                    fileInfo.FullFilePath = directoryPath;
                    fileInfo.filePath = file_path;
                    fileInfo.fileName = file;

                    return fileInfo; //filteredFilesById;
                  });

                resSend(res, true, 200, "File fetched successfully", resustFiles, null);
            } else {
                resSend(res, true, 200, files.msg, files.data, null);
            }
        } catch (error) {
            return resSend(res, false, 500, "GET FILE ERROR", error, null);
        }

    } catch (error) {
        console.log("download po api error", error);
        return resSend(res, false, 500, "INTERNL SERVER ERROR", {}, null);
    }
}

module.exports = { download, tncdownload, downloadLatest, getPoFileList }