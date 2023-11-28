const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { INSERT } = require("../../lib/constant");
const { ADD_DRAWING, NEW_SDBG, SDBG_ACKNOWLEDGEMENT, EKBE, EKKO, EKPO, ZPO_MILESTONE } = require("../../lib/tableName");
const { CREATED, ACKNOWLEDGE, RE_SUBMIT } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const path = require('path');
const { sdbgPayload, drawingPayload, poModifyData, poDataModify } = require("../../services/po.services");



/** APIS START ----->  */
const details = async (req, res) => {
    try {

        const queryParams = req.query;

        if (!queryParams.id || queryParams.id === '0') {
            return resSend(res, false, 400, "Please provided PO NO.", [], null);
        }
        // let qry = `SELECT t1.*,t2.*,t3.* FROM ekko as t1
        //                 LEFT JOIN ekbe  as t2 ON t1.EBELN = t2.EBELN
        //                 LEFT JOIN essr  as t3 ON t1.EBELN = t3.EBELN 
        //             WHERE t1.EBELN = '${poNo}'`;

        // let q = `SELECT t1.*,t2.* FROM ekko as t1 LEFT JOIN ekbe as t2 ON t1.EBELN = t2.EBELN WHERE t1.EBELN = '${poNo}'`;

        // let q = `SELECT t1.*,t2.*,t3.* FROM ekko AS t1 LEFT JOIN pa0001 AS t2 ON t1.ERNAM= t2.PERNR AND t2.SUBTY= '0030' LEFT JOIN pa0105 AS t3 ON t2.PERNR = t3.PERNR AND t2.SUBTY = t3.SUBTY WHERE t1.EBELN = '${queryParams.id}'`;
        let q = `SELECT t1.*,t2.*,t3.* FROM ekko AS t1 LEFT JOIN pa0001 AS t2 ON t1.ERNAM= t2.PERNR AND t2.SUBTY= '0030' LEFT JOIN pa0105 AS t3 ON t2.PERNR = t3.PERNR AND t2.SUBTY = t3.SUBTY WHERE t1.EBELN = ?`;

        const result = await query({ query: q, values: [queryParams.id] });

        if (!result?.length)
            return resSend(res, false, 404, "No PO number found !!", [], null);

        const timelingQ = `SELECT MTEXT, PLAN_DATE, MO FROM ${ZPO_MILESTONE} WHERE EBELN = ?`;
        const timeline = await query({ query: timelingQ, values: [queryParams.id] });


        //console.log(result);
        // let tableName = (result[0].BSART === 'ZDM') ? EKPO : (result[0].BSART === 'ZGSR') ? EKBE : null;

        // let resDate;

        // TO DO
        /**
         * Contractual delivery date will come from eket table, field name EINDT
         * we have to update this api accrodingly
         */

        let materialQuery = `SELECT mat.*, materialLineItems.* , materialMaster.*
            FROM ${EKPO} as mat 
        LEFT JOIN eket as materialLineItems
            ON (mat.EBELN = materialLineItems.EBELN  AND mat.EBELP = materialLineItems.EBELP)
        LEFT JOIN MARA as materialMaster 
            ON mat.MATNR= materialMaster.MATNR 
        WHERE mat.EBELN = ?`;


        let materialResult = await query({ query: materialQuery, values: [queryParams.id] });

        const isMaterialTypePO = poTypeCheck(materialResult);

        const poType = isMaterialTypePO === true ? "service" : "material";


        // let tableQuery = `SELECT * FROM ${EKPO} WHERE EBELN = ?`
        // let arrDate = await query({ query: tableQuery, values: [queryParams.id] });


        // result[0]["material"] = arrDate || [];
        result[0]["poType"] = poType
        result[0]["materialResult"] = materialResult || [];
        result[0]["timeline"] = timeline || [];

        resSend(res, true, 200, "data fetch scussfully.", result, null);


    } catch (error) {
        return resSend(res, false, 500, error.toString(), [], null);
    }
};


function poTypeCheck(materialData) {

    // const regex = /DIEN/;
    const regex = /ZDIN/;
    // regex.test(materialType);
    let isMatched = true;

    for (let i = 0; i < materialData.length; i++) {

        isMatched = regex.test(materialData[i]?.MTART);
        if (isMatched === false) break;

    }

    return isMatched;

}


const download = async (req, res) => {

    console.log("filePath", fileDetails);

    // const queryParams = req.query;

    const typeArr = ["drawing", "sdbg", "qap"]

    const { id, type } = req.query;

    if (!typeArr.includes(type)) {
        return resSend(res, false, 400, "Please send valid type ! i.e. drawing, sdbg", null, null)
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

            break;

        default:
            break;
    }

    const response = await query({ query: fileFoundQuery, values: [id] });

    console.log("response", response);
    console.log("fileFoundQuery", fileFoundQuery);

    if (!response?.length || !response[0]?.file_name) {
        return resSend(res, true, 200, `file not uploaded with this id ${id}`, null, null)
    }

    const selectedPath = `${downaoadPath}${response[0].file_name}`;
    console.log("selectedPath", selectedPath);
    res.download(path.join(__dirname, "..", selectedPath), (err) => {
        if (err)
            resSend(res, false, 404, "file not found", err, null)

    });
}


const poList = async (req, res) => {
    try {
        const resultArr = [];

        let q = `SELECT ekko.EBELN AS poNb,ekko.BSART AS poType, ekpo.MATNR as m_number, mara.MTART FROM ekko left join ekpo on ekko.EBELN = ekpo.EBELN left join mara on ekpo.MATNR = mara.MATNR;`
        const poArr = await query({ query: q, values: [] });
        //console.log(poArr);
        let str = "";
        await Promise.all(
            poArr.map(async (item) => {
                str += "'" + item.poNb + "',";
            })
        );
        str = str.slice(0, -1);
        let SDVGQuery = `select purchasing_doc_no,created_by_name,remarks,max(created_at) AS created_at from new_sdbg WHERE purchasing_doc_no IN(${str}) group by purchasing_doc_no,created_by_name,remarks`;
        let SDVGArr = await query({ query: SDVGQuery, values: [] });
        //console.log(SDVGArr);

        let drawingQuery = `select purchasing_doc_no,created_by_name,remarks,max(created_at) AS created_at from add_drawing WHERE purchasing_doc_no IN(${str}) group by purchasing_doc_no,created_by_name,remarks`;
        let drawingArr = await query({ query: drawingQuery, values: [] });
        //console.log(drawingArr);

        let qapQuery = `select purchasing_doc_no,created_by_name,remarks,max(created_at) AS created_at from qap_submission WHERE purchasing_doc_no IN(${str}) group by purchasing_doc_no,created_by_name,remarks`;
        let qapArr = await query({ query: qapQuery, values: [] });
        //console.log(qapArr);


        const modifiedPOData = await poDataModify(poArr);

        const result = [];
        Object.keys(modifiedPOData).forEach((key) => {
            const isMaterialTypePO = poTypeCheck(modifiedPOData[key]);
            const poType = isMaterialTypePO === true ? "service" : "material";
            result.push({ poNb: key, poType })
        })



        await Promise.all(
            result.map(async (item) => {

                let obj = {};
                obj.poNumber = item.poNb;
                obj.poType = item.poType;
                const SDVGObj = await SDVGArr.find(({ purchasing_doc_no }) => purchasing_doc_no == item.poNb);

                obj.SDVG = (SDVGObj === undefined) ? 'N/A' : SDVGObj;

                const drawingObj = await drawingArr.find(({ purchasing_doc_no }) => purchasing_doc_no == item.poNb);

                obj.Drawing = (drawingObj === undefined) ? 'N/A' : drawingObj;

                const qapObj = await qapArr.find(({ purchasing_doc_no }) => purchasing_doc_no == item.poNb);

                obj.qapSubmission = (qapObj === undefined) ? 'N/A' : qapObj;

                resultArr.push(obj);
            })
        );

        resSend(res, true, 200, "data fetch scussfully.", resultArr, null);

    } catch (error) {
        return resSend(res, false, 500, error.toString(), [], null);
    }
}


module.exports = { details, download, poList };