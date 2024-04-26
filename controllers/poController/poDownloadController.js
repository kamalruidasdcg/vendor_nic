
const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const fileDetails = require("../../lib/filePath");
const path = require('path');
const { QAP, RIC } = require("../../lib/depertmentMaster");
const { POfileFilter, POfileFilterOrderBy, paymentAdviceFiles } = require("../../lib/fetchFileDirectory");
const Message = require('../../utils/messages');



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
        	// 	if (err)
        	//     	resSend(res, false, 404, "file not found", err, null)
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
            	// const directoryPath = path.join(__dirname, '..', '..', 'sapuploads', 'po', `${fileName}`);
            	const directoryPath = path.join(__dirname, '..', '..', '..', '..', '..', 'ftpgrse', 'po', `${fileName}`);
            	const file_path = path.join('home', 'ftpgrse', 'po', `${fileName}`)
            	const response = [{ full_file_path: directoryPath, file_name: fileName, file_path }];

            	// res.download(directoryPath, (err) => {
            	// 	if (err)
            	// 	return resSend(res, false, 404, "file not found", err, null)
            	// });

            	if (!fileName) {
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
    	let files;
    	try {

        	files = await POfileFilterOrderBy(req.query.poNo);
			console.log("reso file", files);

        	if (files.success && files?.data?.length) {

            	const resustFiles = files.data.map(file => {

                	// const directoryPath = path.join(__dirname, '..', '..', 'sapuploads', 'po', `${file}`);
                	// const file_path = path.join('sapuploads', 'po', `${file}`);
                	const directoryPath = path.join(__dirname, '..', '..', '..', '..', '..', 'ftpgrse', 'po', `${file}`);
                	const file_path = path.join('home', 'ftpgrse', 'po', `${file}`)
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


const getPaymentAdvliceList = async (req, res) => {
	try {

    	// if (!req.query.poNo) {
        // 	return resSend(res, false, 400, "Please send PO number", null, null);
    	// }

		const payload = req.body;

    	let files;
    	try {

        	files = await paymentAdviceFiles(req.query.poNo);
			console.log("reso file", files);

        	if (files.success && files?.data?.length) {

				const queryValues = files?.data?.map((el) => el.split("_")[0]);
				const placeholders = queryValues.map(() => '?').join(',');
				
				console.log(placeholders);

				// const paymentAdviceQuery = `SELECT * FROM zfi_pymt_advce_data_final WHERE vblnr in ( ${placeholders} )`;
				let paymentAdviceQuery = `SELECT  
													bldat AS docuentDate, 
													lifnr AS vendor_code,
													vblnr AS documentNo
														FROM zfi_pymt_advce_data_final 
															WHERE 1 = 1 AND vblnr in ( ${placeholders} )`;

				
				if(payload.poNo) {
					console.log("payload.poNo",payload.poNo);
					const result = await query({query: `SELECT lifnr AS vendor_code FROM ekko WHERE ebeln = ?`, values: [payload.poNo]});
					console.log(result, "resultresult");
					paymentAdviceQuery = paymentAdviceQuery.concat(" AND lifnr = ?");
					queryValues.push(result[0].vendor_code);
				}
				const result = await query({query: paymentAdviceQuery, values: queryValues});
			

				console.log("queryValues", queryValues, paymentAdviceQuery, result);
				
				const resustFiles = result.map((ele) => {
					const realFileName = files?.data?.find((el) => el.includes(ele.documentNo))
					const directoryPath = path.join(__dirname, '..', '..', '..', '..', '..', 'ftpgrse', 'pymtadvice', `${realFileName}`);
					const file_path = path.join('home', 'ftpgrse', 'pymtadvice', `${realFileName}`)
					return {...ele, fullFilePath:directoryPath,
						filePath: file_path,
						fileName: realFileName}
				})

            	// const resustFiles = files.data.map(file => {
                // 	let fileInfo = {};
                // 	fileInfo.fullFilePath = directoryPath;
                // 	fileInfo.filePath = file_path;
                // 	fileInfo.fileName = file;

                // 	return fileInfo;
            	// });

            	resSend(res, true, 200, Message.FILE_FETCH_SUCCESSFULLY, { resustFiles }, null);
        	} else {
            	resSend(res, true, 200, files.msg, files.data, null);
        	}
    	} catch (error) {
        	return resSend(res, false, 500, Message.FILE_FETCH_ERROR, error, null);
    	}

	} catch (error) {
    	return resSend(res, false, 500, Message.SERVER_ERROR, {}, null);
	}
}




module.exports = { download, tncdownload, downloadLatest, getPoFileList, getPaymentAdvliceList }
