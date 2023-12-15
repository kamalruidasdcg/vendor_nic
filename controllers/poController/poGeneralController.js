const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime, queryArrayTOString } = require("../../lib/utils");
const { INSERT, USER_TYPE_VENDOR, USER_TYPE_GRSE_QAP, QAP_ASSIGNER, QAP_STAFF } = require("../../lib/constant");
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
        let q = `
        SELECT t1.*,t2.*, t3.USRID_LONG, t4.NAME1, t4.ORT01
        FROM 
            ekko AS t1 
        LEFT JOIN 
            pa0001 AS t2 
        ON 
            (t1.ERNAM= t2.PERNR AND t2.SUBTY= '0030') 
        LEFT JOIN 
            pa0105 AS t3 
        ON 
            (t2.PERNR = t3.PERNR AND t2.SUBTY = t3.SUBTY) 
        LEFT JOIN 
            lfa1 AS t4 
        ON 
            t1.LIFNR = t4.LIFNR 
        WHERE 
            t1.EBELN = ?`;

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

        let materialQuery =
            `SELECT
            mat.EBELP AS material_item_number,
            mat.KTMNG AS material_quantity, 
            mat.MATNR AS material_code,
            mat.MEINS AS material_unit,

            materialLineItems.EINDT as contractual_delivery_date, 
            materialMaster.*, 
            mat_desc.MAKTX as mat_description
            FROM ${EKPO} 
                AS  mat 
            LEFT JOIN eket 
                AS materialLineItems
            ON 
                (materialLineItems.EBELN = mat.EBELN AND materialLineItems.EBELP = mat.EBELP )
            LEFT JOIN mara 
                AS materialMaster 
            ON 
                materialMaster.MATNR = mat.MATNR
            LEFT JOIN makt 
                AS mat_desc
            ON mat_desc.MATNR = mat.MATNR
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

    const regex = /DIEN/; // USE FOR IDENTIFY SERVICE PO as discuss with Preetham
    // const regex = /ZDIN/;   // NOT USE FOR IDENTIFY SERVICE PO 
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
    const tokenData = req.tokenData;
    // return;
    try {
        let poQuery = "";
        let Query = "";

        if (tokenData.user_type === USER_TYPE_VENDOR) {
            // console.log("vendor");
        } else {
            console.log("grse");

            switch (tokenData.department_id) {
                case USER_TYPE_GRSE_QAP:
                    console.log("qap");
                    if (tokenData.internal_role_id === QAP_ASSIGNER) {
                        console.log("QAP_ASSIGNER");
                        Query = `SELECT DISTINCT(purchasing_doc_no) from qap_submission`;

                    } else if (tokenData.internal_role_id === QAP_STAFF) {
                        console.log("QAP_STAFF");
                        Query = `SELECT DISTINCT(purchasing_doc_no) from qap_submission WHERE assigned_to = ${tokenData.vendor_code}`;

                    }
                    break;

                default:
                    console.log("other1");
                    break;

            }

        }

        // console.log(Query);
        if (Query == "") {
            return resSend(res, false, 400, "you dont have permission.", null, null);
        }
        const strVal = await queryArrayTOString(Query);
        console.log(strVal);
        poQuery = `SELECT ekko.EBELN AS poNb,ekko.BSART AS poType, ekpo.MATNR as m_number, mara.MTART FROM ekko left join ekpo on ekko.EBELN = ekpo.EBELN left join mara on ekpo.MATNR = mara.MATNR WHERE ekko.EBELN IN(${strVal});`

        if (poQuery == "") {
            return resSend(res, false, 400, "you dont have permission.", null, null);
        }
        const poArr = await query({ query: poQuery, values: [] });

        // resSend(res, true, 200, "data fetch scussfully.", poArr, null);



        // return;

        //////////////////////////////////////////
        const resultArr = [];


        let str = "";
        await Promise.all(
            poArr.map(async (item) => {
                str += "'" + item.poNb + "',";
            })
        );
        str = str.slice(0, -1);


        // SDVG
        let SDVGQuery = `select purchasing_doc_no,created_by_name,status,min(created_at) AS created_at from new_sdbg WHERE purchasing_doc_no IN(${str}) group by purchasing_doc_no,created_by_name,status`;
        let SDVGArr = await query({ query: SDVGQuery, values: [] });

        let SDVGAsdQuery = `select purchasing_doc_no,min(created_at) AS actual_submission_date from new_sdbg WHERE purchasing_doc_no IN(${str}) AND updated_by = 'GRSE' group by purchasing_doc_no`;
        let SDVGAsdArr = await query({ query: SDVGAsdQuery, values: [] });

        let SDVGCsdQuery = `select distinct(EBELN) AS purchasing_doc_no,MTEXT AS  contractual_submission_remarks,PLAN_DATE AS contractual_submission_date from zpo_milestone WHERE EBELN IN(${str}) AND MID = 1`;
        let SDVGCsdArr = await query({ query: SDVGCsdQuery, values: [] });

        await Promise.all(
            SDVGArr.map(async (item) => {

                if (SDVGCsdArr.length) {
                    let csdArr = await SDVGCsdArr.find(({ purchasing_doc_no }) => purchasing_doc_no == item.purchasing_doc_no);
                    (csdArr) ? item.contractual_submission_date = csdArr.contractual_submission_date : item.contractual_submission_date = "N/A";
                } else {
                    item.contractual_submission_date = undefined;
                }

                if (SDVGAsdArr.length) {
                    let asdArr = await SDVGAsdArr.find(({ purchasing_doc_no }) => purchasing_doc_no == item.purchasing_doc_no);
                    (asdArr) ? item.actual_submission_date = asdArr.actual_submission_date : item.actual_submission_date = undefined;
                } else {
                    item.actual_submission_date = undefined;
                }
            })
        );

        // DRAWING
        let drawingQuery = `select purchasing_doc_no,created_by_name,remarks,status,min(created_at) AS created_at from add_drawing WHERE purchasing_doc_no IN(${str}) group by purchasing_doc_no,created_by_name,status,remarks`;
        let drawingArr = await query({ query: drawingQuery, values: [] });

        let drawingAsdQuery = `select purchasing_doc_no,min(created_at) AS actual_submission_date from add_drawing WHERE purchasing_doc_no IN(${str}) AND updated_by = 'GRSE' group by purchasing_doc_no`;
        let drawingAsdArr = await query({ query: drawingAsdQuery, values: [] });

        let drawingCsdQuery = `select distinct(EBELN) AS purchasing_doc_no,MTEXT AS  contractual_submission_remarks,PLAN_DATE AS contractual_submission_date from zpo_milestone WHERE EBELN IN(${str}) AND MID = 2`;
        let drawingCsdArr = await query({ query: drawingCsdQuery, values: [] });

        await Promise.all(
            drawingArr.map(async (item) => {
                if (SDVGCsdArr.length) {
                    let csdArr = await SDVGCsdArr.find(({ purchasing_doc_no }) => purchasing_doc_no == item.purchasing_doc_no);
                    (csdArr) ? item.contractual_submission_date = csdArr.contractual_submission_date : item.contractual_submission_date = "N/A";
                } else {
                    item.contractual_submission_date = undefined;
                }

                if (drawingAsdArr.length) {
                    let asdArr = await drawingAsdArr.find(({ purchasing_doc_no }) => purchasing_doc_no == item.purchasing_doc_no);
                    (asdArr) ? item.actual_submission_date = asdArr.actual_submission_date : item.actual_submission_date = undefined;
                } else {
                    item.actual_submission_date = undefined;
                }
            })
        );

        // QAP
        let qapQuery = `select purchasing_doc_no,created_by_name,remarks,status,min(created_at) AS created_at from qap_submission WHERE purchasing_doc_no IN(${str}) group by purchasing_doc_no,created_by_name,status,remarks`;
        let qapArr = await query({ query: qapQuery, values: [] });


        let qapAsdQuery = `select purchasing_doc_no,min(created_at) AS actual_submission_date from qap_submission WHERE purchasing_doc_no IN(${str}) AND updated_by = 'GRSE' group by purchasing_doc_no`;
        let qapAsdArr = await query({ query: qapAsdQuery, values: [] });

        let qapCsdQuery = `select distinct(EBELN) AS purchasing_doc_no,MTEXT AS  contractual_submission_remarks,PLAN_DATE AS contractual_submission_date from zpo_milestone WHERE EBELN IN(${str}) AND MID = 3`;
        let qapCsdArr = await query({ query: qapCsdQuery, values: [] });

        await Promise.all(
            qapArr.map(async (item) => {
                if (SDVGCsdArr.length) {
                    let csdArr = await SDVGCsdArr.find(({ purchasing_doc_no }) => purchasing_doc_no == item.purchasing_doc_no);
                    (csdArr) ? item.contractual_submission_date = csdArr.contractual_submission_date : item.contractual_submission_date = "N/A";
                } else {
                    item.contractual_submission_date = undefined;
                }

                if (qapAsdArr.length) {
                    let asdArr = await qapAsdArr.find(({ purchasing_doc_no }) => purchasing_doc_no == item.purchasing_doc_no);
                    (asdArr) ? item.actual_submission_date = asdArr.actual_submission_date : item.actual_submission_date = undefined;
                } else {
                    item.actual_submission_date = undefined;
                }
            })
        );

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


const getLogList = async (req, res) => {

    try {
        const filterBy = req.body;

        if (filterBy.purchasing_doc_no || filterBy.user_id || filterBy.depertment || filterBy.action) {

            const values = [];
            let filterQuery = `
                SELECT
                    log.user_id AS id,
                    p1.CNAME AS name,
                    action AS status,
                    COUNT(*) AS status_count,
                    log.depertment AS depertment,
                    dept.name AS departmentName
                FROM
                    department_wise_log
                AS 
                    log 
                LEFT JOIN 
                    pa0002 
                AS 
                    p1
                ON
                    p1.PERNR = log.user_id
                LEFT JOIN
                    depertment_master
                AS 
                    dept
                ON 
                    dept.id = log.depertment`;

            // USE FOR DATE QUERIES
            const { startDate, endDate } = filterBy;
            delete filterBy.startDate;
            delete filterBy.endDate;

            // USE FOR OTHER THAN DATE QUERIES

            if (Object.keys(filterBy).length > 0) {
                filterQuery += " WHERE ";
                const conditions = Object.keys(filterBy).map((key, index) => {
                    values.push(filterBy[key]);

                    if (index > 0) {
                        return `AND log.${key} = ?`;
                    } else {
                        return `log.${key} = ?`;
                    }
                });

                filterQuery += conditions.join(" ");
            }

            if (startDate && !endDate) {
                filterQuery = filterQuery.concat(` AND log.created_at >= ?`)
                values.push(parseInt(startDate));
            }
            if (!startDate && endDate) {
                filterQuery = filterQuery.concat(` AND log.created_at <= ?`)
                values.push(parseInt(endDate));
            }
            if (startDate && endDate) {
                filterQuery = filterQuery.concat(` AND ( log.created_at BETWEEN ? AND ? )`)
                values.push(parseInt(startDate), parseInt(endDate));
            }



            filterQuery = filterQuery.concat(
                ` GROUP BY
                log.user_id, log.action;`);

            const result = await query({ query: filterQuery, values: values })
            resSend(res, true, 200, "data fetch scussfully.", result, null);
        } else {
            return resSend(res, false, 400, "Please send -> purchasing_doc_no | user_id | depertment | action for get result", null, null);
        }

    } catch (error) {
        return resSend(res, false, 500, error.toString(), [], null);
    }

};


module.exports = { details, download, poList, getLogList };