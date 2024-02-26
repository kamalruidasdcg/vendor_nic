const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime, queryArrayTOString } = require("../../lib/utils");
const { DRAWING, SDBG, EKBE, EKKO, EKPO, ZPO_MILESTONE } = require("../../lib/tableName");
const { INSERT, USER_TYPE_VENDOR, USER_TYPE_GRSE_QAP, ASSIGNER, STAFF, USER_TYPE_GRSE_FINANCE, USER_TYPE_GRSE_PURCHASE, USER_TYPE_PPNC_DEPARTMENT, WBS_ELEMENT, PROJECT, USER_TYPE_GRSE_DRAWING } = require("../../lib/constant");
const { PENDING, ASSIGNED, ACCEPTED, RE_SUBMITTED, REJECTED, FORWARD_TO_FINANCE, RETURN_TO_DEALING_OFFICER } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const path = require('path');
const { sdbgPayload, drawingPayload, poModifyData, poDataModify } = require("../../services/po.services");



/** APIS START ----->  */
const details = async (req, res) => {
    try {

        const queryParams = req.query;
        const tokenData = { ...req.tokenData };

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

        // const timelingQ = `SELECT MTEXT, PLAN_DATE, MO FROM ${ZPO_MILESTONE} WHERE EBELN = ?`;

        // GROUP  BY purchasing_doc_no, status
        const timelingQ =
            `
        (SELECT a.*,
                b.status,
                b.purchasing_doc_no,
                act.actualSubmissionDate
         FROM   zpo_milestone AS a
                LEFT JOIN actualsubmissiondate AS act
                       ON ( act.purchasing_doc_no = a.ebeln
                            AND act.milestoneid = 1 )
                INNER JOIN (SELECT Max(id) AS id,
                                   purchasing_doc_no,
                                   status
                            FROM   sdbg) AS b
                        ON ( b.purchasing_doc_no = a.ebeln )
         WHERE  a.mid = 1
                AND a.ebeln = ?)
        UNION
        (SELECT a.*,
                b.status,
                b.purchasing_doc_no,
                act.actualSubmissionDate
         FROM   zpo_milestone AS a
                LEFT JOIN actualsubmissiondate AS act
                       ON ( act.purchasing_doc_no = a.ebeln
                            AND act.milestoneid = 2 )
                INNER JOIN (SELECT id,
                                   purchasing_doc_no,
                                   status
                            FROM   drawing AS x
                            WHERE  id = (SELECT Max(id) AS id
                                         FROM   drawing AS y
                                         WHERE  y.purchasing_doc_no =
                                                x.purchasing_doc_no)) AS b
                        ON ( b.purchasing_doc_no = a.ebeln )
         WHERE  a.mid = 2
                AND a.ebeln = ?)
        UNION
        (SELECT a.*,
                b.status,
                b.purchasing_doc_no,
                act.actualSubmissionDate
         FROM   zpo_milestone AS a
                LEFT JOIN actualsubmissiondate AS act
                       ON ( act.purchasing_doc_no = a.ebeln
                            AND act.milestoneid = 3 )
                INNER JOIN (SELECT id,
                                   purchasing_doc_no,
                                   status
                            FROM   qap_submission AS x
                            WHERE  id = (SELECT Max(id) AS id
                                         FROM   qap_submission AS y
                                         WHERE  y.purchasing_doc_no =
                                                x.purchasing_doc_no)) AS b
                        ON ( b.purchasing_doc_no = a.ebeln )
         WHERE  a.mid = 3
                AND a.ebeln = ?)
                
        UNION
        (SELECT a.*,
                b.status,
                b.purchasing_doc_no,
                act.actualSubmissionDate
         FROM   zpo_milestone AS a
                LEFT JOIN actualsubmissiondate AS act
                       ON ( act.purchasing_doc_no = a.ebeln
                            AND act.milestoneid = 4 )
                INNER JOIN (SELECT id,
                                   purchasing_doc_no,
                                   status
                            FROM   ilms AS x
                            WHERE  id = (SELECT Max(id) AS id
                                         FROM   ilms AS y
                                         WHERE  y.purchasing_doc_no =
                                                x.purchasing_doc_no)) AS b
                        ON ( b.purchasing_doc_no = a.ebeln )
         WHERE  a.mid = 4
                AND a.ebeln = ? );`;



        const timeLineQuery = `
        (SELECT a.*, sub.actualSubmissionDate, sub.milestoneText, sub.milestoneId FROM   zpo_milestone AS a 
            LEFT JOIN actualsubmissiondate AS sub ON 
                ( a.EBELN = sub.purchasing_doc_no and sub.milestoneId = 1)
            WHERE a.EBELN = ? AND a.MID = 1)
            
            UNION
            (SELECT a.*, sub.actualSubmissionDate, sub.milestoneText, sub.milestoneId FROM   zpo_milestone AS a 
            LEFT JOIN actualsubmissiondate AS sub ON 
                ( a.EBELN = sub.purchasing_doc_no and sub.milestoneId = 2)
            WHERE a.EBELN = ? AND a.MID = 2)
            
            UNION
            
            (SELECT a.*, sub.actualSubmissionDate, sub.milestoneText, sub.milestoneId FROM   zpo_milestone AS a 
            LEFT JOIN actualsubmissiondate AS sub ON 
                ( a.EBELN = sub.purchasing_doc_no and sub.milestoneId = 3)
            WHERE a.EBELN = ? AND a.MID= 3)
            
            UNION
            
            (SELECT a.*, sub.actualSubmissionDate, sub.milestoneText, sub.milestoneId FROM   zpo_milestone AS a 
            LEFT JOIN actualsubmissiondate AS sub ON 
                ( a.EBELN = sub.purchasing_doc_no and sub.milestoneId = 4)
            WHERE a.EBELN = ? AND a.MID = 4);
        `;
        const timeline = await query({ query: timeLineQuery, values: [queryParams.id, queryParams.id, queryParams.id, queryParams.id] });




        const getLatest = `
        (SELECT purchasing_doc_no, status, "1" as flag FROM sdbg WHERE purchasing_doc_no = ? ORDER BY id DESC LIMIT 1)

        UNION

        (SELECT purchasing_doc_no, status, "2" as flag FROM drawing WHERE purchasing_doc_no = ? ORDER BY id DESC LIMIT 1)

        UNION

        (SELECT purchasing_doc_no, status, "3" as flag FROM qap_submission WHERE purchasing_doc_no = ? ORDER BY id DESC LIMIT 1)

        UNION

        (SELECT purchasing_doc_no, status, "4" as flag FROM ilms WHERE purchasing_doc_no = ? ORDER BY id DESC LIMIT 1);`;


        const curret_data = await query({ query: getLatest, values: [queryParams.id, queryParams.id, queryParams.id, queryParams.id] });
                console.log("curret_data", curret_data, timeline);
        let timelineData;
        if (timeline.length) {
            timelineData = joinArrays(timeline, curret_data)
        }






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
            FROM ${EKPO} AS  mat 
                LEFT JOIN eket AS materialLineItems
                    ON (materialLineItems.EBELN = mat.EBELN AND materialLineItems.EBELP = mat.EBELP )
                LEFT JOIN mara AS materialMaster 
                    ON (materialMaster.MATNR = mat.MATNR)
                LEFT JOIN makt AS mat_desc
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
        result[0]["timeline"] = timelineData || [];
        result[0]["isDO"] = isDO(result[0], tokenData.vendor_code);

        resSend(res, true, 200, "data fetch scussfully.", result, null);


    } catch (error) {
        return resSend(res, false, 500, error.toString(), [], null);
    }
};


function isDO(po, user_id) {
    return po.ERNAM == user_id;
}


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
            fileFoundQuery = `SELECT * FROM ${tableName} WHERE id = ?`
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

    if (!response?.length || !response[0]?.file_name) {
        return resSend(res, true, 200, `file not uploaded with this id ${id}`, null, null)
    }

    const selectedPath = `${downaoadPath}${response[0].file_name}`;

    res.download(path.join(__dirname, "..", selectedPath), (err) => {
        if (err)
            resSend(res, false, 404, "file not found", err, null)

    });
}


const poList = async (req, res) => {
    const tokenData = req.tokenData;
    try {
        let poQuery = "";
        let Query = "";

        if (tokenData.user_type === USER_TYPE_VENDOR) {
            Query = `SELECT DISTINCT(EBELN) from ekko WHERE LIFNR = "${tokenData.vendor_code}"`;
        } else {


            switch (tokenData.department_id) {
                case USER_TYPE_GRSE_QAP:
                    if (tokenData.internal_role_id === ASSIGNER) {
                        //  Query = `SELECT DISTINCT(purchasing_doc_no) from qap_submission`;
                        Query = poListByEcko();
                        console.log("****************$%^&*()(*&^%$");
                        console.log(Query);
                    } else if (tokenData.internal_role_id === STAFF) {
                        Query = `SELECT DISTINCT(purchasing_doc_no) from qap_submission WHERE assigned_to = ${tokenData.vendor_code}`;

                    }
                    break;
                case USER_TYPE_GRSE_FINANCE:
                    if (tokenData.internal_role_id === ASSIGNER) {
                        Query = poListByEcko();
                        // Query = `SELECT DISTINCT(purchasing_doc_no) from ${SDBG} WHERE status = '${FORWARD_TO_FINANCE}'`;

                    } else if (tokenData.internal_role_id === STAFF) {
                        Query = `SELECT DISTINCT(purchasing_doc_no) from ${SDBG} WHERE assigned_to = ${tokenData.vendor_code}`;

                    }
                    break;
                case USER_TYPE_GRSE_DRAWING:
                    // Query = `SELECT DISTINCT(purchasing_doc_no) as purchasing_doc_no from ${DRAWING}`;
                    Query = poListByEcko();
                    break;
                case USER_TYPE_GRSE_PURCHASE:
                    Query = `SELECT DISTINCT(EBELN) as purchasing_doc_no from ekko WHERE ERNAM = "${tokenData.vendor_code}"`;
                    break;
                case USER_TYPE_PPNC_DEPARTMENT:
                    Query = poListByPPNC(req.query);

                    break;
                default:
                    console.log("other1", Query);

            }

        }
        if (!Query) {
            return resSend(res, false, 400, "you dont have permission or no data found", null, null);
        }
        let strVal;
        console.log("$%^&*()(*&^%$");
        try {
            strVal = await queryArrayTOString(Query, tokenData.user_type);
        } catch (error) {
            return resSend(res, false, 400, "Error in db query.", error, null);
        }

        if (!strVal || strVal == "") {
            return resSend(res, true, 200, "No PO found.", [], null);
        }
        console.log("$%^&*()(*&^%$");
        console.log(strVal);
        poQuery =
            `SELECT ekko.lifnr AS vendor_code,
                        lfa1.name1 AS vendor_name,
                        wbs.project_code AS project_code,
                        wbs.wbs_id AS wbs_id,
                        ekko.ebeln AS poNb,
                        ekko.bsart AS poType,
                        ekpo.matnr AS m_number,
                        mara.mtart AS MTART,
                        ekko.ernam AS po_creator
                 FROM   ekko
                        left join ekpo
                               ON ekko.ebeln = ekpo.ebeln
                        left join mara
                               ON ekpo.matnr = mara.matnr
                        left join wbs
                               ON  wbs.purchasing_doc_no = ekko.ebeln
                        left join lfa1
                               ON ekko.lifnr = lfa1.lifnr
                 WHERE  ekko.ebeln IN (${strVal})`;

        // if (poQuery == "") {
        //     return resSend(res, false, 400, "you dont have permission.", null, null);
        // }
        const poArr = await query({ query: poQuery, values: [] });
        if (!poArr) {
            return resSend(res, false, 400, "No po found", poArr, null);
        }

        // resSend(res, true, 200, "data fetch scussfully.", poArr, null);
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
        let SDVGQuery = `select purchasing_doc_no,created_by_name,status,min(created_at) AS created_at from sdbg WHERE purchasing_doc_no IN(${str}) group by purchasing_doc_no,created_by_name,status`;
        let SDVGArr = await query({ query: SDVGQuery, values: [] });

        let SDVGAsdQuery = `select purchasing_doc_no,min(created_at) AS actual_submission_date from sdbg WHERE purchasing_doc_no IN(${str}) AND updated_by = 'GRSE' group by purchasing_doc_no`;
        let SDVGAsdArr = await query({ query: SDVGAsdQuery, values: [] });

        let SDVGCsdQuery = `select distinct(EBELN) AS purchasing_doc_no,MTEXT AS  contractual_submission_remarks,PLAN_DATE AS contractual_submission_date from zpo_milestone WHERE EBELN IN(${str}) AND MID = 1`;
        let SDVGCsdArr = await query({ query: SDVGCsdQuery, values: [] });

        if (SDVGCsdArr.length) {

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
        }

        // DRAWING
        let drawingQuery = `select purchasing_doc_no,created_by_id,remarks,status,min(created_at) AS created_at from ${DRAWING} WHERE purchasing_doc_no IN(${str}) group by purchasing_doc_no,created_by_id,status,remarks`;
        let drawingArr = await query({ query: drawingQuery, values: [] });
        console.log(drawingArr);
        let drawingAsdQuery = `select purchasing_doc_no,min(created_at) AS actual_submission_date from ${DRAWING} WHERE purchasing_doc_no IN(${str}) AND updated_by = 'GRSE' group by purchasing_doc_no`;
        let drawingAsdArr = await query({ query: drawingAsdQuery, values: [] });

        let drawingCsdQuery = `select distinct(EBELN) AS purchasing_doc_no,MTEXT AS  contractual_submission_remarks,PLAN_DATE AS contractual_submission_date from zpo_milestone WHERE EBELN IN(${str}) AND MID = 2`;
        let drawingCsdArr = await query({ query: drawingCsdQuery, values: [] });

        if (drawingArr.length) {

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
        }

        // QAP
        let qapQuery = `select purchasing_doc_no,created_by_name,remarks,status,min(created_at) AS created_at from qap_submission WHERE purchasing_doc_no IN(${str}) group by purchasing_doc_no,created_by_name,status,remarks`;
        let qapArr = await query({ query: qapQuery, values: [] });


        let qapAsdQuery = `select purchasing_doc_no,min(created_at) AS actual_submission_date from qap_submission WHERE purchasing_doc_no IN(${str}) AND updated_by = 'GRSE' group by purchasing_doc_no`;
        let qapAsdArr = await query({ query: qapAsdQuery, values: [] });

        // let qapCsdQuery = `select distinct(EBELN) AS purchasing_doc_no,MTEXT AS  contractual_submission_remarks,PLAN_DATE AS contractual_submission_date from zpo_milestone WHERE EBELN IN(${str}) AND MID = 3`;
        // let qapCsdArr = await query({ query: qapCsdQuery, values: [] });


        if (qapArr.length) {

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
        }


        const modifiedPOData = await poDataModify(poArr);

        console.log("modifiedPOData", modifiedPOData);

        const result = [];
        Object.keys(modifiedPOData).forEach((key) => {

            const isMaterialTypePO = poTypeCheck(modifiedPOData[key]);
            const poType = isMaterialTypePO === true ? "service" : "material";

            // const i = poArr.findIndex((el) => el.poNb == key);
            // let isDo = false;
            // if (i >= 0) {
            //     isDo = poArr[i].po_creator == tokenData.vendor_code;
            // }

            result.push({
                poNb: key,
                vendor_code: modifiedPOData[key][0].vendor_code,
                vendor_name: modifiedPOData[key][0].vendor_name,
                wbs_id: modifiedPOData[key][0].wbs_id,
                project_code: modifiedPOData[key][0].project_code,
                poType
            });
        })


        // ADDING IS isDO ( deling officers of the po);

        await Promise.all(
            result.map(async (item) => {

                let obj = {};
                obj.poNumber = item.poNb;
                obj.poType = item.poType;
                obj.isDo = item.isDo;
                obj.vendor_code = item.vendor_code;
                obj.vendor_name = item.vendor_name;
                obj.project_code = item.project_code;
                obj.wbs_id = item.wbs_id;
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

const poListByEcko = (vendorCode = "") => {
    let sufx;
    let qry = `SELECT DISTINCT(EBELN) from ekko`;
    if (vendorCode != "") {
        sufx = ` WHERE LIFNR = "${vendorCode}"`;
        qry = qry + sufx;
    }
    return qry;
}


const poListByPPNC = (queryData, tokenData) => {

    let poListQuery = "";

    if (queryData.type == PROJECT) {
        poListQuery = `SELECT * FROM wbs WHERE 1 = 1`
        if (queryData.id) {
            poListQuery += ` AND project_code = "${queryData.id}"`;
        }
    }
    if (queryData.type == WBS_ELEMENT) {
        poListQuery = `SELECT * FROM wbs WHERE 1 = 1`
        if (queryData.id) {
            poListQuery += ` AND wbs_id = "${queryData.id}"`;
        }
    }

    // if (queryData.poNo) {
    //     poListQuery += ` AND purchasing_doc_no = "${queryData.poNo}"`;
    // }

    return poListQuery;
}



function joinArrays(arr1, arr2) {
    return arr1.map(item1 => {
        const matchingItem = arr2.find(item2 => item1.EBELN == item2.purchasing_doc_no && item1.MID == item2.flag);

        if (matchingItem) {
            return { ...item1, ...matchingItem };
        }

        return item1;
    });
}


// EBELN(VARCAT10),EBELP(VARCAT5),SLNO(INT3),WDC(CAHAR25)

module.exports = { details, download, poList };