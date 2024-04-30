const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime, queryArrayTOString } = require("../../lib/utils");
const { INSERT, USER_TYPE_VENDOR, USER_TYPE_GRSE_QAP, ASSIGNER, STAFF, USER_TYPE_GRSE_FINANCE, USER_TYPE_GRSE_PURCHASE } = require("../../lib/constant");
const { WMC, MRS } = require("../../lib/tableName");
const { PENDING, ASSIGNED, ACCEPTED, RE_SUBMITTED, REJECTED, FORWARD_TO_FINANCE, RETURN_TO_DEALING_OFFICER } = require("../../lib/status");
const { wmcPayload, mrsPayload } = require("../../services/material.servces");


/** APIS START ----->  */
const wmcInsert = async (req, res) => {

    try {

        const tokenData = { ...req.tokenData };

        let fileData = {};
        if (req.file) {
            fileData = {
                fileName: req.file.filename,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
            };
        }
        let payload = { ...req.body, ...fileData, created_at: getEpochTime() };
        if (!payload.purchasing_doc_no) {
            // const directory = path.join(__dirname, '..', 'uploads', 'drawing');
            // const isDel = handleFileDeletion(directory, req.file.filename);
            return resSend(res, false, 400, "Please send valid payload", null, null);
        }

        payload = {
            ...payload,
            updated_by: tokenData.user_type == 1 ? "VENDOR" : "GRSE",
            created_by_id: tokenData.vendor_code
        }

        let insertObj = wmcPayload(payload);

        const { q, val } = generateQuery(INSERT, WMC, insertObj);
        const response = await query({ query: q, values: val });

        console.log("response", response);

        if (response.affectedRows) {
            resSend(res, true, 200, "wmc uploaded!", fileData, null);
        } else {
            resSend(res, false, 400, "No data inserted", response, null);
        }


        // } else {
        //     resSend(res, false, 400, "Please upload a valid File", fileData, null);
        // }

    } catch (error) {
        console.log("WMC  submission api", error);

        return resSend(res, false, 500, "internal server error", [], null);
    }

}
const wmcList = async (req, res) => {

    try {

        if (!req.query.poNo) {
            return resSend(res, false, 400, "Please send poNo", null, "");
        }

        const wmcListQuery = `SELECT * FROM ${WMC} WHERE purchasing_doc_no = ?`

        const result = await query({ query: wmcListQuery, values: [req.query.poNo] });
        if (result.length > 0) {
            resSend(res, true, 200, "Data fetched successfully", result, null);
        } else {
            resSend(res, false, 200, "No Record Found", result, null);
        }


    } catch (error) {
        return resSend(res, false, 500, "internal server error", error, null);
    }


}
const mrsInsert = async (req, res) => {

    try {

        const tokenData = { ...req.tokenData };

        let fileData = {};
        if (req.file) {
            fileData = {
                fileName: req.file.filename,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
            };
        }
        let payload = { ...req.body, ...fileData, created_at: getEpochTime() };
        if (!payload.purchasing_doc_no) {
            // const directory = path.join(__dirname, '..', 'uploads', 'drawing');
            // const isDel = handleFileDeletion(directory, req.file.filename);
            return resSend(res, false, 400, "Please send valid payload", null, null);
        }

        payload = {
            ...payload,
            updated_by: tokenData.user_type == 1 ? "VENDOR" : "GRSE",
            created_by_id: tokenData.vendor_code
        }

        let insertObj = mrsPayload(payload);

        const { q, val } = generateQuery(INSERT, MRS, insertObj);
        const response = await query({ query: q, values: val });

        console.log("response", response);

        if (response.affectedRows) {
            resSend(res, true, 200, "wmc uploaded!", fileData, null);
        } else {
            resSend(res, false, 400, "No data inserted", response, null);
        }


        // } else {
        //     resSend(res, false, 400, "Please upload a valid File", fileData, null);
        // }

    } catch (error) {
        console.log("WMC  submission api", error);

        return resSend(res, false, 500, "internal server error", [], null);
    }

}
const mrsList = async (req, res) => {

    try {

        if (!req.query.poNo) {
            return resSend(res, false, 400, "Please send poNo", null, "");
        }

        const wmcListQuery = `SELECT * FROM ${MRS} WHERE purchasing_doc_no = ?`

        const result = await query({ query: wmcListQuery, values: [req.query.poNo] });
        if (result.length > 0) {
            resSend(res, true, 200, "Data fetched successfully", result, null);
        } else {
            resSend(res, false, 200, "No Record Found", result, null);
        }


    } catch (error) {
        return resSend(res, false, 500, "internal server error", error, null);
    }


}

const materialIssue = async (req, res) => {

    try {

        // if (!req.body) {
        //     return resSend(res, false, 400, "Please send body", null, "");
        // }

        console.log(req.body);


        let q =
            `SELECT 
                    mseg.MBLNR as issueNo,
                    mseg.WERKS as plantName,
                    mseg.MJAHR as issueYear,
                    mseg.MATNR as materialNumber,
                    makt.MAKTX as materialDescription,
                    mseg.MEINS as unit,
                    mseg.CHARG as batchNo,
                    mseg.ERFMG as issueQty,
                    mseg.BPMNG as BPMNG,
                    mkpf.BUDAT as issuDate,
                    mseg.EBELN as purchasing_doc_no,
                    mseg.EBELP as poItemNumber,
                    mseg.RSNUM as reservationNo,
                    mseg.LIFNR as vendor_code,
                    mseg.MENGE as requiredQty,
                    mseg.KOSTL as costCenter
                FROM mseg AS mseg
                	LEFT JOIN mkpf AS mkpf
                    	ON( mseg.MBLNR = mkpf.MBLNR)
                     LEFT JOIN makt AS makt
                    	ON( mseg.MATNR = makt.MATNR) 
                        WHERE 1 = 1 AND  ( mseg.BWART IN ('221', '281', '201', '101', '321', '222', '202', '102', '122') )`



        if(!req.body.issueNo) {
            return resSend(res, false, 200, "plese send Issue No", [], null);
        }
        let val = [];

        if (req.body.issueNo) {
            q = q.concat(" AND mseg.MBLNR = ? ");
            val.push(req.body.issueNo);
        }
        if (req.body.issueYear) {
            q = q.concat(" AND mseg.MJAHR = ? ");
            val.push(req.body.issueYear);
        }

        console.log("q", q, val);



        const result = await query({ query: q, values: val });

        let response = {
            issueNo: null,
            issuDate: null,
            plantName: null,
            reservationNo: null,
            lineItem: result
        }

        // console.log("result", result);
        // {
        //     issueNo: '1000001014',
        //     materialNumber: null,
        //     materialDescription: null,
        //     unit: null,
        //     batchNo: null,
        //     issueQty: null,
        //     BPMNG: null,
        //     issuDate: null,
        //     purchasing_doc_no: null,
        //     poItemNumber: null,
        //     reserationNo: null,
        //     vendor_code: '50000437',
        //     requiredQty: null
        //   }

        if (result.length > 0) {
            response.issueNo = result[0].issueNo;
            response.issuDate = result[0].issuDate || null;
            response.plantName = result[0].plantName;
            response.reservationNo = result[0].reservationNo || null;

            resSend(res, true, 200, "Data fetched successfully", response, null);
        } else {
            resSend(res, false, 200, "No Record Found", response, null);
        }


    } catch (error) {
        return resSend(res, false, 500, "internal server error", error, null);
    }


}




module.exports = { wmcInsert, wmcList, mrsInsert, mrsList, materialIssue };