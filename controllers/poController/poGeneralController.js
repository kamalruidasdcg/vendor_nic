const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const {
  generateQuery,
  getEpochTime,
  queryArrayTOString,
} = require("../../lib/utils");
const {
  DRAWING,
  SDBG,
  EKBE,
  EKKO,
  EKPO,
  ZPO_MILESTONE,
  QAP_SUBMISSION,
  ILMS,
} = require("../../lib/tableName");
const {
  INSERT,
  USER_TYPE_VENDOR,
  USER_TYPE_GRSE_QAP,
  ASSIGNER,
  STAFF,
  USER_TYPE_GRSE_FINANCE,
  USER_TYPE_GRSE_PURCHASE,
  USER_TYPE_PPNC_DEPARTMENT,
  WBS_ELEMENT,
  PROJECT,
  USER_TYPE_GRSE_DRAWING,
  SERVICE_TYPE,
  MATERIAL_TYPE,
} = require("../../lib/constant");
const {
  PENDING,
  ASSIGNED,
  ACCEPTED,
  RE_SUBMITTED,
  REJECTED,
  FORWARD_TO_FINANCE,
  RETURN_TO_DEALING_OFFICER,
} = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const path = require("path");
const {
  sdbgPayload,
  drawingPayload,
  poModifyData,
  poDataModify,
} = require("../../services/po.services");
const { currentStageHandler } = require("../../services/currentStage");
const { STORE, RIC, QAP } = require("../../lib/depertmentMaster");

/** APIS START ----->  */
const details = async (req, res) => {
  try {
    const queryParams = req.query;
    const tokenData = { ...req.tokenData };

    if (!queryParams.id || queryParams.id === "0") {
      return resSend(res, false, 200, "Please provided PO NO.", [], null);
    }

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
    const timelingQ = `
        (SELECT a.*,
                b.status,
                b.purchasing_doc_no,
                act.actualSubmissionDate
         FROM   zpo_milestone AS a
                LEFT JOIN actualsubmissiondate AS act
                       ON ( act.purchasing_doc_no = a.ebeln
                            AND act.milestoneid = "01" )
                INNER JOIN (SELECT Max(id) AS id,
                                   purchasing_doc_no,
                                   status
                            FROM   sdbg) AS b
                        ON ( b.purchasing_doc_no = a.ebeln )
         WHERE  a.mid = "01"
                AND a.ebeln = ?)
        UNION
        (SELECT a.*,
                b.status,
                b.purchasing_doc_no,
                act.actualSubmissionDate
         FROM   zpo_milestone AS a
                LEFT JOIN actualsubmissiondate AS act
                       ON ( act.purchasing_doc_no = a.ebeln
                            AND act.milestoneid = "02" )
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
                ( a.EBELN = sub.purchasing_doc_no and sub.milestoneId = "01")
            WHERE a.EBELN = ? AND a.MID = "01")
            
            UNION
            (SELECT a.*, sub.actualSubmissionDate, sub.milestoneText, sub.milestoneId FROM   zpo_milestone AS a 
            LEFT JOIN actualsubmissiondate AS sub ON 
                ( a.EBELN = sub.purchasing_doc_no and sub.milestoneId = "02")
            WHERE a.EBELN = ? AND a.MID = "02")
            
            UNION
            
            (SELECT a.*, sub.actualSubmissionDate, sub.milestoneText, sub.milestoneId FROM   zpo_milestone AS a 
            LEFT JOIN actualsubmissiondate AS sub ON 
                ( a.EBELN = sub.purchasing_doc_no and sub.milestoneId = "03")
            WHERE a.EBELN = ? AND a.MID= "03")
            
            UNION
            
            (SELECT a.*, sub.actualSubmissionDate, sub.milestoneText, sub.milestoneId FROM   zpo_milestone AS a 
            LEFT JOIN actualsubmissiondate AS sub ON 
                ( a.EBELN = sub.purchasing_doc_no and sub.milestoneId = "04")
            WHERE a.EBELN = ? AND a.MID = "04");
        `;
    const timeline = await query({
      query: timeLineQuery,
      values: [queryParams.id, queryParams.id, queryParams.id, queryParams.id],
    });

    const getLatest = `
        (SELECT purchasing_doc_no, status, "01" as flag FROM sdbg WHERE purchasing_doc_no = ? ORDER BY id DESC LIMIT 1)

        UNION

        (SELECT purchasing_doc_no, status, "02" as flag FROM drawing WHERE purchasing_doc_no = ? ORDER BY id DESC LIMIT 1)

        UNION

        (SELECT purchasing_doc_no, status, "03" as flag FROM qap_submission WHERE purchasing_doc_no = ? ORDER BY id DESC LIMIT 1)

        UNION

        (SELECT purchasing_doc_no, status, "04" as flag FROM ilms WHERE purchasing_doc_no = ? ORDER BY id DESC LIMIT 1);`;

    const curret_data = await query({
      query: getLatest,
      values: [queryParams.id, queryParams.id, queryParams.id, queryParams.id],
    });

    const getAcknowledgementntQry = `
        (SELECT purchasing_doc_no, status, "01" as flag, created_at as acknowledgementnt_date FROM sdbg WHERE purchasing_doc_no = ? AND status = 'APPROVED' ORDER BY id DESC LIMIT 1)

        UNION

        (SELECT purchasing_doc_no, status, "02" as flag, created_at as acknowledgementnt_date FROM drawing WHERE purchasing_doc_no = ? AND status = 'APPROVED' ORDER BY id DESC LIMIT 1)

        UNION

        (SELECT purchasing_doc_no, status, "03" as flag, created_at as acknowledgementnt_date FROM qap_submission WHERE purchasing_doc_no = ? AND status = 'APPROVED' ORDER BY id DESC LIMIT 1)

        UNION

        (SELECT purchasing_doc_no, status, "04" as flag, created_at as acknowledgementnt_date FROM ilms WHERE purchasing_doc_no = ? AND status = 'APPROVED' ORDER BY id DESC LIMIT 1);`;

    const acknowledgementnt_date = await query({
      query: getAcknowledgementntQry,
      values: [queryParams.id, queryParams.id, queryParams.id, queryParams.id],
    });

    let timelineData;
    if (timeline.length) {
      timelineData = joinArrays(timeline, curret_data);
      timelineData = joinArrays(timelineData, acknowledgementnt_date);
    }
    
    // let tableName = (result[0].BSART === 'ZDM') ? EKPO : (result[0].BSART === 'ZGSR') ? EKBE : null;

    // let resDate;

    // TO DO
    /**
     * Contractual delivery date will come from eket table, field name EINDT
     * we have to update this api accrodingly
     */

    let materialQuery = `SELECT
            mat.EBELP AS material_item_number,
            mat.MENGE AS material_quantity, 
            mat.MATNR AS material_code,
            mat.MEINS AS material_unit,
            mat.EINDT AS contractual_delivery_date,
            mat.LOEKZ AS isDeleted, 
            materialMaster.*, 
            materialMaster.MTART AS materialType,
            mat.TXZ01 as mat_description
            FROM ${EKPO} AS  mat 
                LEFT JOIN mara AS materialMaster 
                    ON (materialMaster.MATNR = mat.MATNR)
            WHERE 1 = 1 AND mat.EBELN = ?`;

    let materialResult = await query({
      query: materialQuery,
      values: [queryParams.id],
    });

    if (materialResult && materialResult?.length) {
      

      materialResult = materialResult.filter((elem) => elem.isDeleted != 'L');
    }

    const materialTypeQuery = "SELECT * FROM material_type";
    const materialType = await query({ query: materialTypeQuery, values: [] });

    const isMaterialTypePO = poTypeCheck(materialResult, materialType);
    console.log("isMaterialTypePO", isMaterialTypePO);

    const poType = isMaterialTypePO;

    // Get Current Stage
    let currentStage = {
      current: "",
    };

    currentStage.current = await currentStageHandler(queryParams.id);
    const DO = await doDetails(queryParams.id);

    result[0]["currentStage"] = currentStage;
    result[0]["poType"] = poType;
    result[0]["materialResult"] = materialResult || [];
    result[0]["timeline"] = timelineData || [];
    result[0]["isDO"] = isDO(result[0], tokenData.vendor_code);
    result[0]["doInfo"] = DO.length > 0 ? DO[0] : null;
    resSend(res, true, 200, "data fetch scussfully.", result, null);
  } catch (error) {
    return resSend(res, false, 500, error.toString(), [], null);
  }
};

function isDO(po, user_id) {
  return po.ERNAM == user_id;
}

// async function poTypeCheck(materialData) {
//   // const regex = /DIEN/; // USE FOR IDENTIFY SERVICE PO as discuss with Preetham
//   const regex = /ZDIN/;   // NOT USE FOR IDENTIFY SERVICE PO
//   // regex.test(materialType);
//   let isMatched = true;


//   const materialTypeQuery = "SELECT * FROM material_type";
//   const result = await query({query:  materialTypeQuery, values: []});
//   console.log(result, "result");

//   for (let i = 0; i < materialData.length; i++) {
//     isMatched = regex.test(materialData[i]?.MTART);
//     if (isMatched === false) break;
//   }

//   return isMatched;
// }



function poTypeCheck(materialData, materialType) {
  // const types = materialData.map((mat) => mat.MTART);
  // const service = new Set(materialType.filter((el) => el.material_type === SERVICE_TYPE).map((e) => e.material_type_value));
  // const material = new Set(materialType.filter((el) => el.material_type === MATERIAL_TYPE).map((e) => e.material_type_value));

  console.log("materialData", materialData);

  let isService = false;
  let isMaterial = false;

  for (const mat of materialData) {
    const type = mat.MATNR;
    console.log("po type", type);

    if (!type) {
      isService = true;
    }
    if (type && typeof type === 'string' && type.includes("SER")) {
      isService = true;
    }
    if (type && typeof type === 'string' && !type.includes("SER")) {
      isMaterial = true;
    }
  }

  // const isService = types.every(type => service.has(type));
  // const isMaterial = types.every(type => material.has(type));
  // let isService = false;
  // let isMaterial = false;

  // for (const type of types) {
  //   if (service.has(type)) {
  //     isService = true;
  //     break;
  //   }
  // }

  // for (const type of types) {
  //   if (type && !service.has(type)) {
  //     isMaterial = true;
  //     break;
  //   }
  // }
  // // types.every(type => material.includes(type));

  // console.log("service", service, "material", material, "type", types);
  console.log("isService", isService, "isMaterial", isMaterial);

  if (isService && !isMaterial) {
    return 'service';
  } else if (isMaterial && !isService) {
    return 'material';
  } else if (isService && isMaterial) {
    return 'hybrid';
  } else {
    console.log("default po type");
    return 'unknown';
  }
}

const download = async (req, res) => {
  // const queryParams = req.query;

  const typeArr = ["drawing", "sdbg", "qap"];

  const { id, type } = req.query;

  if (!typeArr.includes(type)) {
    return resSend(
      res,
      false,
      400,
      "Please send valid type ! i.e. drawing, sdbg",
      null,
      null
    );
  }
  let fileFoundQuery = "";

  const tableName = fileDetails[type]["tableName"];
  const downaoadPath = fileDetails[type]["filePath"];

  switch (type) {
    case "drawing":
      fileFoundQuery = `SELECT * FROM ${tableName} WHERE id = ?`;
      break;
    case "sdbg":
      fileFoundQuery = `SELECT * FROM ${tableName} WHERE id = ?`;
      break;
    case "qap":
      break;

    default:
      break;
  }

  const response = await query({ query: fileFoundQuery, values: [id] });

  if (!response?.length || !response[0]?.file_name) {
    return resSend(
      res,
      true,
      200,
      `file not uploaded with this id ${id}`,
      null,
      null
    );
  }

  const selectedPath = `${downaoadPath}${response[0].file_name}`;

  res.download(path.join(__dirname, "..", selectedPath), (err) => {
    if (err) resSend(res, false, 404, "file not found", err, null);
  });
};

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
          } else if (tokenData.internal_role_id === STAFF) {
            Query = `SELECT DISTINCT(purchasing_doc_no) from qap_submission WHERE assigned_to = ${tokenData.vendor_code} AND is_assign = 1`;
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
          Query = poListByEcko(); // poListByPPNC(req.query);
          break;
        case STORE:
          Query = poListByEcko();
          break;
        case RIC:
          Query = poListByEcko();
          break;
        default:
          Query = poListByEcko();
          console.log("DEFAULT ALL PO SHOWING . . . . ", Query);
      }
    }
    if (!Query) {
      return resSend(
        res,
        false,
        400,
        "You don't have permission or no data found",
        null,
        null
      );
    }
    let strVal;
    try {
      strVal = await queryArrayTOString(Query, tokenData.user_type);
    } catch (error) {
      return resSend(res, false, 400, "Error in db query.", error, null);
    }

    if (!strVal || strVal == "") {
      return resSend(res, true, 200, "No PO found.", [], null);
    }
    poQuery = `SELECT ekko.lifnr AS vendor_code,
                        lfa1.name1 AS vendor_name,
                        wbs.project_code AS project_code,
                        wbs.wbs_id AS wbs_id,
                        ekko.ebeln AS poNb,
                        ekko.bsart AS poType,
                        ekpo.matnr AS m_number,
                        mara.mtart AS MTART,
                        ekpo.MATNR AS MATNR,
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

    // do

    let doQry = `SELECT t1.PERNR,t1.CNAME,t2.ERNAM,t2.EBELN
        FROM 
            pa0002 AS t1 
        LEFT JOIN 
            ekko AS t2 
        ON 
            (t1.PERNR= t2.ERNAM)  WHERE t2.EBELN IN(${str})`;

    let doArr = await query({ query: doQry, values: [] });

    // console.log("&&&&&&&&&&&&^^^^^^^^^^");
    // console.log(doArr);
    // return;
    // SD

    let SdbgLastStatus = `select purchasing_doc_no,status,created_at from ${SDBG} WHERE purchasing_doc_no IN(${str}) ORDER BY created_at DESC LIMIT 1`;
    let SdgbLastStatusArr = await query({ query: SdbgLastStatus, values: [] });

    let SdbgActualSubmissionDate = `select purchasing_doc_no,milestoneId,milestoneText,actualSubmissionDate from actualsubmissiondate WHERE purchasing_doc_no IN(${str}) AND milestoneId = 1 group by purchasing_doc_no`;
    let SdbgActualSubmissionDateArr = await query({
      query: SdbgActualSubmissionDate,
      values: [],
    });

    let SdbgContractualSubmissionDate = `select distinct(EBELN) AS purchasing_doc_no,MTEXT AS  contractual_submission_remarks,PLAN_DATE AS contractual_submission_date from zpo_milestone WHERE EBELN IN(${str}) AND MID = 1  group by EBELN`;
    let SdbgContractualSubmissionDateArr = await query({
      query: SdbgContractualSubmissionDate,
      values: [],
    });
    // SD

    // DRAWING
    let DrawingLastStatus = `select purchasing_doc_no,status,created_at from ${DRAWING} WHERE purchasing_doc_no IN(${str}) ORDER BY created_at DESC LIMIT 1`;
    let DrawingLastStatusArr = await query({
      query: DrawingLastStatus,
      values: [],
    });

    let DrawingActualSubmissionDate = `select purchasing_doc_no,milestoneId,milestoneText,actualSubmissionDate from actualsubmissiondate WHERE purchasing_doc_no IN(${str}) AND milestoneId = 2 group by purchasing_doc_no`;
    let DrawingActualSubmissionDateArr = await query({
      query: DrawingActualSubmissionDate,
      values: [],
    });

    let DrawingContractualSubmissionDate = `select distinct(EBELN) AS purchasing_doc_no,MTEXT AS  contractual_submission_remarks,PLAN_DATE AS contractual_submission_date from zpo_milestone WHERE EBELN IN(${str}) AND MID = 2  group by EBELN`;
    let DrawingContractualSubmissionDateArr = await query({
      query: DrawingContractualSubmissionDate,
      values: [],
    });
    // DRAWING

    // QAP
    let qapLastStatus = `select purchasing_doc_no,status,created_at from ${QAP_SUBMISSION} WHERE purchasing_doc_no IN(${str}) ORDER BY created_at DESC LIMIT 1`;
    let qapLastStatusArr = await query({ query: qapLastStatus, values: [] });

    let qapActualSubmissionDate = `select purchasing_doc_no,milestoneId,milestoneText,actualSubmissionDate from actualsubmissiondate WHERE purchasing_doc_no IN(${str}) AND milestoneId = 3 group by purchasing_doc_no`;
    let qapActualSubmissionDateArr = await query({
      query: qapActualSubmissionDate,
      values: [],
    });

    let qapContractualSubmissionDate = `select distinct(EBELN) AS purchasing_doc_no,MTEXT AS  contractual_submission_remarks,PLAN_DATE AS contractual_submission_date from zpo_milestone WHERE EBELN IN(${str}) AND MID = 3  group by EBELN`;
    let qapContractualSubmissionDateArr = await query({
      query: qapContractualSubmissionDate,
      values: [],
    });
    // QAP

    // ILMS
    let ilmsLastStatus = `select purchasing_doc_no,status,created_at from ${ILMS} WHERE purchasing_doc_no IN(${str}) ORDER BY created_at DESC LIMIT 1`;
    let ilmsLastStatusArr = await query({ query: ilmsLastStatus, values: [] });

    let ilmsActualSubmissionDate = `select purchasing_doc_no,milestoneId,milestoneText,actualSubmissionDate from actualsubmissiondate WHERE purchasing_doc_no IN(${str}) AND milestoneId = 4 group by purchasing_doc_no`;
    let ilmsActualSubmissionDateArr = await query({
      query: ilmsActualSubmissionDate,
      values: [],
    });

    let ilmsContractualSubmissionDate = `select distinct(EBELN) AS purchasing_doc_no,MTEXT AS  contractual_submission_remarks,PLAN_DATE AS contractual_submission_date from zpo_milestone WHERE EBELN IN(${str}) AND MID = 4  group by EBELN`;
    let ilmsContractualSubmissionDateArr = await query({
      query: ilmsContractualSubmissionDate,
      values: [],
    });
    // ILMS

    const modifiedPOData = await poDataModify(poArr);
    const materialTypeQuery = "SELECT * FROM material_type";
    const materialType = await query({ query: materialTypeQuery, values: [] });

    const result = [];
    Object.keys(modifiedPOData).forEach((key) => {
      const isMaterialTypePO = poTypeCheck(modifiedPOData[key], materialType);
      const poType = isMaterialTypePO;

      result.push({
        poNb: key,
        vendor_code: modifiedPOData[key][0].vendor_code,
        vendor_name: modifiedPOData[key][0].vendor_name,
        wbs_id: modifiedPOData[key][0].wbs_id,
        project_code: modifiedPOData[key][0].project_code,
        poType,
      });
    });

    // ADDING IS isDO ( deling officers of the po);
    await Promise.all(
      result.map(async (item) => {
        let obj = {};
        let currentStage = {
          current: await currentStageHandler(item.poNb),
        };
        obj.currentStage = currentStage;
        obj.poNumber = item.poNb;
        obj.poType = item.poType;
        obj.isDo = item.isDo;
        obj.vendor_code = item.vendor_code;
        obj.vendor_name = item.vendor_name;
        obj.project_code = item.project_code;
        obj.wbs_id = item.wbs_id;

        ////////////// SD /////////////////
        const SDVGObj = {};
        const SdbgActualSubmission = await SdbgActualSubmissionDateArr.find(
          ({ purchasing_doc_no }) => purchasing_doc_no == item.poNb
        );
        // console.log('SdbgActualSubmission----------');
        // console.log(SdbgActualSubmission);
        const SdbgContractualSubmission =
          await SdbgContractualSubmissionDateArr.find(
            ({ purchasing_doc_no }) => purchasing_doc_no == item.poNb
          );
        const SdgbLast = SdgbLastStatusArr.find(
          ({ purchasing_doc_no }) => purchasing_doc_no == item.poNb
        );
        SDVGObj.SdContractualSubmissionDate = SdbgContractualSubmission
          ? SdbgContractualSubmission.contractual_submission_date
          : null;
        SDVGObj.SdActualSubmissionDate = SdbgActualSubmission
          ? SdbgActualSubmission.actualSubmissionDate
          : null;
        SDVGObj.SdLastStatus = SdgbLast ? SdgbLast.status : null;
        obj.SD = SDVGObj;
        ////////////// SD /////////////////

        ////////////// DRAWING /////////////////
        const DrawingObj = {};
        const DrawingActualSubmission =
          await DrawingActualSubmissionDateArr.find(
            ({ purchasing_doc_no }) => purchasing_doc_no == item.poNb
          );
        const DrawingContractualSubmission =
          await DrawingContractualSubmissionDateArr.find(
            ({ purchasing_doc_no }) => purchasing_doc_no == item.poNb
          );
        const DrawingLast = DrawingLastStatusArr.find(
          ({ purchasing_doc_no }) => purchasing_doc_no == item.poNb
        );
        DrawingObj.DrawingContractualSubmissionDate =
          DrawingContractualSubmission
            ? DrawingContractualSubmission.contractual_submission_date
            : null;
        DrawingObj.DrawingActualSubmissionDate = DrawingActualSubmission
          ? DrawingActualSubmission.actualSubmissionDate
          : null;
        DrawingObj.DrawingLastStatus = DrawingLast ? DrawingLast.status : null;
        ////////////// DRAWING /////////////////
        obj.Drawing = DrawingObj;

        ////////////// QAP /////////////////
        const qapObj = {};
        const qapActualSubmission = await qapActualSubmissionDateArr.find(
          ({ purchasing_doc_no }) => purchasing_doc_no == item.poNb
        );
        const qapContractualSubmission =
          await qapContractualSubmissionDateArr.find(
            ({ purchasing_doc_no }) => purchasing_doc_no == item.poNb
          );
        const qapLast = qapLastStatusArr.find(
          ({ purchasing_doc_no }) => purchasing_doc_no == item.poNb
        );
        qapObj.qapContractualSubmissionDate = qapContractualSubmission
          ? qapContractualSubmission.contractual_submission_date
          : null;
        qapObj.qapActualSubmissionDate = qapActualSubmission
          ? qapActualSubmission.actualSubmissionDate
          : null;
        qapObj.qapLastStatus = qapLast ? qapLast.status : null;
        ////////////// QAP /////////////////
        obj.QAP = qapObj;

        ////////////// ILMS /////////////////
        const ilmsObj = {};
        const ilmsActualSubmission = await ilmsActualSubmissionDateArr.find(
          ({ purchasing_doc_no }) => purchasing_doc_no == item.poNb
        );
        const ilmsContractualSubmission =
          await ilmsContractualSubmissionDateArr.find(
            ({ purchasing_doc_no }) => purchasing_doc_no == item.poNb
          );
        const ilmsLast = ilmsLastStatusArr.find(
          ({ purchasing_doc_no }) => purchasing_doc_no == item.poNb
        );
        ilmsObj.ilmsContractualSubmissionDate = ilmsContractualSubmission
          ? ilmsContractualSubmission.contractual_submission_date
          : null;
        ilmsObj.ilmsActualSubmissionDate = ilmsActualSubmission
          ? ilmsActualSubmission.actualSubmissionDate
          : null;
        ilmsObj.ilmsLastStatus = ilmsLast ? ilmsLast.status : null;
        ////////////// ILMS /////////////////
        obj.ILMS = ilmsObj;

        //// DO
        // const DOObj = {};
        const DOObj = await doArr.find(({ EBELN }) => EBELN == item.poNb);
        // DOObj.doData = doInfo ? doInfo : null;
        obj.DO = DOObj ? DOObj : null;
        resultArr.push(obj);
      })
    );

    resSend(res, true, 200, "data fetch scussfully.", resultArr, null);
  } catch (error) {
    return resSend(res, false, 500, error.toString(), [], null);
  }
};

const doDetails = async (str) => {
  const doQry = `SELECT t1.PERNR,t1.CNAME,t2.ERNAM,t2.EBELN
        FROM 
        ekko AS t2 
        LEFT JOIN 
        pa0002 AS t1 
        ON 
            (t1.PERNR= t2.ERNAM)  WHERE t2.EBELN = ?`;

  const doArr = await query({ query: doQry, values: [str] });

  return doArr;
};

const poListByEcko = (vendorCode = "") => {
  let sufx;
  let qry = `SELECT DISTINCT(EBELN) from ekko`;
  if (vendorCode != "") {
    sufx = ` WHERE LIFNR = "${vendorCode}"`;
    qry = qry + sufx;
  }
  return qry;
};

const poListByPPNC = (queryData, tokenData) => {
  let poListQuery = "";

  if (queryData.type == PROJECT) {
    poListQuery = `SELECT * FROM wbs WHERE 1 = 1`;
    if (queryData.id) {
      poListQuery += ` AND project_code = "${queryData.id}"`;
    }
  }
  if (queryData.type == WBS_ELEMENT) {
    poListQuery = `SELECT * FROM wbs WHERE 1 = 1`;
    if (queryData.id) {
      poListQuery += ` AND wbs_id = "${queryData.id}"`;
    }
  }

  // if (queryData.poNo) {
  //     poListQuery += ` AND purchasing_doc_no = "${queryData.poNo}"`;
  // }

  return poListQuery;
};

function joinArrays(arr1, arr2) {
  return arr1.map((item1) => {
    const matchingItem = arr2.find(
      (item2) =>
        item1.EBELN == item2.purchasing_doc_no && item1.MID == item2.flag
    );

    if (matchingItem) {
      return { ...item1, ...matchingItem };
    }

    return item1;
  });
}

// EBELN(VARCAT10),EBELP(VARCAT5),SLNO(INT3),WDC(CAHAR25)

module.exports = { details, download, poList };