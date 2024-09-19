const { resSend } = require("../../lib/resSend");
// const { query } = require("../../config/dbConfig");
const {
  generateQuery,
  getEpochTime,
  queryArrayTOString,
  getCreatedArr,
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
  USER_TYPE_GRSE_DRAWING
} = require("../../lib/constant");

const fileDetails = require("../../lib/filePath");
const path = require("path");
const { poDataModify, getActualAndCurrentDetails, getPoWithLineItems, poDataModify2, setMileStoneActivity, getCount } = require("../../services/po.services");
const { currentStageHandler, currentStageHandleForAllActivity } = require("../../services/currentStage");
const { STORE, RIC, QAP } = require("../../lib/depertmentMaster");
const { getQuery, poolQuery, poolClient } = require("../../config/pgDbConfig");
const Message = require("../../utils/messages");

/** APIS START ----->  */
const details = async (req, res) => {
  try {
    const queryParams = req.query;
    const tokenData = { ...req.tokenData };

    if (!queryParams.id || queryParams.id === "0") {
      return resSend(res, false, 200, "Please provided PO NO.", [], null);
    }

    let q = `
    SELECT 
    t1.ebeln as "EBELN",
    t1.aedat as "AEDAT",
    t1.lifnr as "LIFNR", 
    t1.ernam as "ERNAM", 
    t3.EMAIL AS "USRID_LONG", t4.NAME1 as "NAME1", t4.ORT01 as "ORT01"
      FROM 
      ekko AS t1 
        LEFT JOIN 
      pa0002 AS t3 
        ON 
      (t3.PERNR :: character varying = t1.ERNAM) 
  LEFT JOIN 
      lfa1 AS t4 
  ON 
      t1.LIFNR = t4.LIFNR 
        WHERE 
            t1.EBELN = $1`;

    const result = await getQuery({ query: q, values: [queryParams.id] });

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
                            AND act.milestoneid = '01' )
                INNER JOIN (SELECT Max(id) AS id,
                                   purchasing_doc_no,
                                   status
                            FROM   sdbg) AS b
                        ON ( b.purchasing_doc_no = a.ebeln )
         WHERE  a.mid = '01'
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
                ( a.EBELN = sub.purchasing_doc_no and sub.milestoneId = '01')
            WHERE a.EBELN = $1 AND a.MID = '01')
            
            UNION
            (SELECT a.*, sub.actualSubmissionDate, sub.milestoneText, sub.milestoneId FROM   zpo_milestone AS a 
            LEFT JOIN actualsubmissiondate AS sub ON 
                ( a.EBELN = sub.purchasing_doc_no and sub.milestoneId = '02')
            WHERE a.EBELN = $2 AND a.MID = '02')
            
            UNION
            
            (SELECT a.*, sub.actualSubmissionDate, sub.milestoneText, sub.milestoneId FROM   zpo_milestone AS a 
            LEFT JOIN actualsubmissiondate AS sub ON 
                ( a.EBELN = sub.purchasing_doc_no and sub.milestoneId = '03')
            WHERE a.EBELN = $3 AND a.MID= '03')
            
            UNION
            
            (SELECT a.*, sub.actualSubmissionDate, sub.milestoneText, sub.milestoneId FROM   zpo_milestone AS a 
            LEFT JOIN actualsubmissiondate AS sub ON 
                ( a.EBELN = sub.purchasing_doc_no and sub.milestoneId = '04')
            WHERE a.EBELN = $4 AND a.MID = '04')
        `;
    const timeline = await getQuery({
      query: timeLineQuery,
      values: [queryParams.id, queryParams.id, queryParams.id, queryParams.id],
    });

    const getLatest = `
        (SELECT purchasing_doc_no, status AS current_status, '01' as flag FROM sdbg WHERE purchasing_doc_no = $1 ORDER BY id DESC LIMIT 1)

        UNION

        (SELECT purchasing_doc_no, status  AS current_status, '02' as flag FROM drawing WHERE purchasing_doc_no = $2 ORDER BY id DESC LIMIT 1)

        UNION

        (SELECT purchasing_doc_no, status  AS current_status, '03' as flag FROM qap_submission WHERE purchasing_doc_no = $3 ORDER BY id DESC LIMIT 1)

        UNION

        (SELECT purchasing_doc_no, status  AS current_status, '04' as flag FROM ilms WHERE purchasing_doc_no = $4 ORDER BY id DESC LIMIT 1)`;

    const curret_data = await getQuery({
      query: getLatest,
      values: [queryParams.id, queryParams.id, queryParams.id, queryParams.id],
    });

    const getAcknowledgementntQry = `
        (SELECT purchasing_doc_no, status, '01' as flag, created_at as acknowledgementnt_date FROM sdbg WHERE purchasing_doc_no = $1 AND status = 'APPROVED' ORDER BY id DESC LIMIT 1)

        UNION

        (SELECT purchasing_doc_no, status, '02' as flag, created_at as acknowledgementnt_date FROM drawing WHERE purchasing_doc_no = $2 AND status = 'APPROVED' ORDER BY id DESC LIMIT 1)

        UNION

        (SELECT purchasing_doc_no, status, '03' as flag, created_at as acknowledgementnt_date FROM qap_submission WHERE purchasing_doc_no = $3 AND status = 'APPROVED' ORDER BY id DESC LIMIT 1)

        UNION

        (SELECT purchasing_doc_no, status, '04' as flag, created_at as acknowledgementnt_date FROM ilms WHERE purchasing_doc_no = $4 AND status = 'APPROVED' ORDER BY id DESC LIMIT 1);`;

    const acknowledgementnt_date = await getQuery({
      query: getAcknowledgementntQry,
      values: [queryParams.id, queryParams.id, queryParams.id, queryParams.id],
    });

    let timelineData = [];
    if (timeline.length) {
      let timeLineDatArr = mergeData(timeline, curret_data);
      timeLineDatArr = joinArrays(timeLineDatArr, acknowledgementnt_date);

      timelineData = timeLineDatArr.filter(
        (v, i, a) => a.findIndex((el) => el?.mid === v?.mid) === i
      );

      // Sort the array by milestoneid
      timelineData.sort((a, b) => parseInt(a.mid) - parseInt(b.mid));
    }

    if (timelineData.length) {
      timelineData = timelineData.map((el2) => {
        const DOObj = acknowledgementnt_date.find(
          (elms) => elms.flag == el2.mid
        );
        if (DOObj) {
          el2.acknowledgement_text = `ACKNOWLEDGEMENT DATE`;
          el2.acknowledgement_date = DOObj.acknowledgementnt_date;
        }

        return el2;
      });
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
            materialMaster.MATNR as "MATNR", 
            materialMaster.MTART as "MTART", 
            materialMaster.MTART AS "materialType",
            mat.TXZ01 as mat_description
            FROM ${EKPO} AS  mat 
                LEFT JOIN mara AS materialMaster 
                    ON (materialMaster.MATNR = mat.MATNR)
            WHERE 1 = 1 AND mat.EBELN = $1`;

    let materialResult = await getQuery({
      query: materialQuery,
      values: [queryParams.id],
    });

    if (materialResult && materialResult?.length) {
      materialResult = materialResult.filter((elem) => elem.isDeleted != "L");
    }

    const materialTypeQuery = "SELECT * FROM material_type";
    const materialType = await getQuery({
      query: materialTypeQuery,
      values: [],
    });

    const isMaterialTypePO = poTypeCheck(materialResult, materialType);

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
    console.error("error.toString()", error.toString());
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

  let isService = false;
  let isMaterial = false;

  for (const mat of materialData) {
    const type = mat.MATNR;

    if (!type) {
      isService = true;
    }
    if (type && typeof type === "string" && type.includes("SER")) {
      isService = true;
    }
    if (type && typeof type === "string" && !type.includes("SER")) {
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

  if (isService && !isMaterial) {
    return "service";
  } else if (isMaterial && !isService) {
    return "material";
  } else if (isService && isMaterial) {
    return "hybrid";
  } else {
    return "unknown";
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
      fileFoundQuery = `SELECT * FROM ${tableName} WHERE id = $1`;
      break;
    case "sdbg":
      fileFoundQuery = `SELECT * FROM ${tableName} WHERE id = $1`;
      break;
    case "qap":
      break;

    default:
      break;
  }

  const response = await getQuery({ query: fileFoundQuery, values: [id] });

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
      Query = `SELECT DISTINCT(EBELN) as "EBELN",aedat as created_at from ekko WHERE LIFNR = '${tokenData.vendor_code}'`;
    } else {
      switch (tokenData.department_id) {
        case USER_TYPE_GRSE_QAP:
          if (tokenData.internal_role_id === ASSIGNER) {
            //  Query = `SELECT DISTINCT(purchasing_doc_no) from qap_submission`;
            Query = poListByEcko();
          } else if (tokenData.internal_role_id === STAFF) {
            Query = `SELECT DISTINCT(purchasing_doc_no),created_at from qap_submission WHERE assigned_to = '${tokenData.vendor_code}' AND is_assign = 1`;
          }
          break;
        case USER_TYPE_GRSE_FINANCE:
          if (tokenData.internal_role_id === ASSIGNER) {
            Query = poListByEcko();
            // Query = `SELECT DISTINCT(purchasing_doc_no) from ${SDBG} WHERE status = '${FORWARD_TO_FINANCE}'`;
          } else if (tokenData.internal_role_id === STAFF) {
            Query = `SELECT DISTINCT(purchasing_doc_no),created_at from ${SDBG} WHERE assigned_to = '${tokenData.vendor_code}'`;
          }
          break;
        case USER_TYPE_GRSE_DRAWING:
          // Query = `SELECT DISTINCT(purchasing_doc_no) as purchasing_doc_no from ${DRAWING}`;
          Query = poListByEcko();
          break;
        case USER_TYPE_GRSE_PURCHASE:
          if (tokenData.internal_role_id === ASSIGNER) {
            Query = poListByEcko();
          } else if (tokenData.internal_role_id === STAFF) {
            Query = `SELECT DISTINCT(EBELN) as purchasing_doc_no,aedat as created_at from ekko WHERE ERNAM = '${tokenData.vendor_code}'`;
          }
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
        // console.log("DEFAULT ALL PO SHOWING . . . . ", Query);
      }
    }
    if (!Query) {
      return resSend(res, false, 400, "You don't have permission or no data found", null, null);
    }

    let strVal;
    let createdArr;
    // Query = `SELECT DISTINCT(EBELN) as "EBELN",aedat as created_at from ekko`;
    //new Date().getTime()
    try {
      /**
       * CHECK---
       * PO list check
       */
      createdArr = await getCreatedArr(Query, tokenData.user_type);

      /**
       * CHECK---
       * PO LIST ARRY FOR GETTING ['1121', '121121']
       */
      strVal = await queryArrayTOString(Query, tokenData.user_type);


    } catch (error) {
      return resSend(res, false, 400, "Error in db query.", error, null);
    }

    if (!strVal || strVal == "") {
      return resSend(res, true, 200, "No PO found.", [], null);
    }
    poQuery = `SELECT ekko.lifnr AS "vendor_code",
                        lfa1.name1 AS "vendor_name",
                        ekko.ebeln AS "poNb",
                        ekko.bsart AS "poType",
                        ekpo.matnr AS "m_number",
                        mara.mtart AS "MTART",
                        ekpo.MATNR AS "MATNR",
                        ekko.ernam AS "po_creator"
                 FROM   ekko
                        left join ekpo
                               ON ekko.ebeln = ekpo.ebeln
                        left join mara
                               ON ekpo.matnr = mara.matnr
                       
                        left join lfa1 as lfa1
                               ON ekko.lifnr = lfa1.lifnr
                 WHERE  ekko.ebeln IN (${strVal})`;

    //  REMOVE BECAUSE OF NO RELATION
    //  wbs.project_code AS project_code,
    //  wbs.wbs_id AS wbs_id,
    //  left join wbs
    //  ON  wbs.purchasing_doc_no = ekko.ebeln

    const poArr = await getQuery({ query: poQuery, values: [] });
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

    let doQry = `SELECT t1.PERNR as "PERNR", t1.CNAME  as "CNAME" ,t2.ERNAM as "ERNAM",t2.EBELN as "EBELN"
        FROM 
            pa0002 AS t1 
        LEFT JOIN 
            ekko AS t2 
        ON 
            (t1.PERNR::character varying= t2.ERNAM)  WHERE t2.EBELN IN(${str})`;

    let doArr = await getQuery({ query: doQry, values: [] });

    let SdbgLastStatus = `select purchasing_doc_no,status,created_at from ${SDBG} WHERE purchasing_doc_no IN(${str}) ORDER BY created_at DESC LIMIT 1`;
    let SdgbLastStatusArr = await getQuery({
      query: SdbgLastStatus,
      values: [],
    });

    let SdbgActualSubmissionDate = `SELECT
      purchasing_doc_no,
      milestoneId AS "milestoneId",
      milestoneText AS "milestoneText",
      actualSubmissionDate AS "actualSubmissionDate"
       from actualsubmissiondate 
       WHERE 
        (purchasing_doc_no IN(${str}) AND milestoneId = '01') group by purchasing_doc_no`;

    SdbgActualSubmissionDate = `SELECT DISTINCT ON (purchasing_doc_no)
          purchasing_doc_no,
          milestoneId AS "milestoneId",
          milestoneText AS "milestoneText",
          actualSubmissionDate AS "actualSubmissionDate"
      FROM actualsubmissiondate
      WHERE
          purchasing_doc_no IN (${str})
          AND milestoneId = '01'
      ORDER BY purchasing_doc_no, actualSubmissionDate`;

    let SdbgActualSubmissionDateArr = await getQuery({
      query: SdbgActualSubmissionDate,
      values: [],
    });

    // let SdbgContractualSubmissionDate = `select distinct(EBELN) AS purchasing_doc_no,MTEXT AS  contractual_submission_remarks,PLAN_DATE AS contractual_submission_date from zpo_milestone WHERE EBELN IN(${str}) AND MID = 1  group by EBELN`;
    let SdbgContractualSubmissionDate = `select distinct(EBELN) AS purchasing_doc_no, MTEXT AS  contractual_submission_remarks,PLAN_DATE AS contractual_submission_date from zpo_milestone WHERE EBELN IN(${str}) AND MID = '01'  group by EBELN, MTEXT, PLAN_DATE`;

    let SdbgContractualSubmissionDateArr = await getQuery({
      query: SdbgContractualSubmissionDate,
      values: [],
    });
    // SD

    // DRAWING
    let DrawingLastStatus = `select purchasing_doc_no,status,created_at from ${DRAWING} WHERE purchasing_doc_no IN(${str}) ORDER BY created_at DESC LIMIT 1`;
    let DrawingLastStatusArr = await getQuery({
      query: DrawingLastStatus,
      values: [],
    });

    let DrawingActualSubmissionDate = `select purchasing_doc_no,milestoneId,milestoneText,actualSubmissionDate from actualsubmissiondate WHERE purchasing_doc_no IN(${str}) AND milestoneId = '02' group by purchasing_doc_no`;
    DrawingActualSubmissionDate = `SELECT DISTINCT ON (purchasing_doc_no)
          purchasing_doc_no,
          milestoneId AS "milestoneId",
          milestoneText AS "milestoneText",
          actualSubmissionDate AS "actualSubmissionDate"
      FROM actualsubmissiondate
      WHERE
          purchasing_doc_no IN (${str})
          AND milestoneId = '02'
      ORDER BY purchasing_doc_no, actualSubmissionDate`;
    let DrawingActualSubmissionDateArr = await getQuery({
      query: DrawingActualSubmissionDate,
      values: [],
    });

    let DrawingContractualSubmissionDate = `select distinct(EBELN) AS purchasing_doc_no,MTEXT AS  contractual_submission_remarks,PLAN_DATE AS contractual_submission_date from zpo_milestone WHERE EBELN IN(${str}) AND MID = '02'  group by EBELN, MTEXT, PLAN_DATE`;
    let DrawingContractualSubmissionDateArr = await getQuery({
      query: DrawingContractualSubmissionDate,
      values: [],
    });

    // DRAWING

    // QAP
    let qapLastStatus = `select purchasing_doc_no,status,created_at from ${QAP_SUBMISSION} WHERE purchasing_doc_no IN(${str}) ORDER BY created_at DESC LIMIT 1`;
    let qapLastStatusArr = await getQuery({ query: qapLastStatus, values: [] });

    let qapActualSubmissionDate = `select purchasing_doc_no,milestoneId,milestoneText,actualSubmissionDate from actualsubmissiondate WHERE purchasing_doc_no IN(${str}) AND milestoneId = '03' group by purchasing_doc_no`;

    qapActualSubmissionDate = `SELECT DISTINCT ON (purchasing_doc_no)
          purchasing_doc_no,
          milestoneId AS "milestoneId",
          milestoneText AS "milestoneText",
          actualSubmissionDate  AS "actualSubmissionDate"
      FROM actualsubmissiondate
      WHERE
          purchasing_doc_no IN (${str})
          AND milestoneId = '03'
      ORDER BY purchasing_doc_no, actualSubmissionDate`;
    let qapActualSubmissionDateArr = await getQuery({
      query: qapActualSubmissionDate,
      values: [],
    });

    let qapContractualSubmissionDate = `select distinct(EBELN) AS purchasing_doc_no,MTEXT AS  contractual_submission_remarks,PLAN_DATE AS contractual_submission_date from zpo_milestone WHERE EBELN IN(${str}) AND MID = '03'  group by EBELN, MTEXT, PLAN_DATE`;
    let qapContractualSubmissionDateArr = await getQuery({
      query: qapContractualSubmissionDate,
      values: [],
    });
    // QAP

    // ILMS
    let ilmsLastStatus = `select purchasing_doc_no,status,created_at from ${ILMS} WHERE purchasing_doc_no IN(${str}) ORDER BY created_at DESC LIMIT 1`;
    let ilmsLastStatusArr = await getQuery({
      query: ilmsLastStatus,
      values: [],
    });

    let ilmsActualSubmissionDate = `select purchasing_doc_no,milestoneId,milestoneText,actualSubmissionDate from actualsubmissiondate WHERE purchasing_doc_no IN(${str}) AND milestoneId = '04' group by purchasing_doc_no`;

    ilmsActualSubmissionDate = `SELECT DISTINCT ON (purchasing_doc_no)
          purchasing_doc_no,
          milestoneId AS "milestoneId",
          milestoneText AS "milestoneText",
          actualSubmissionDate AS "actualSubmissionDate"
      FROM actualsubmissiondate
      WHERE
          purchasing_doc_no IN (${str})
          AND milestoneId = '01'
      ORDER BY purchasing_doc_no, actualSubmissionDate`;
    let ilmsActualSubmissionDateArr = await getQuery({
      query: ilmsActualSubmissionDate,
      values: [],
    });

    let ilmsContractualSubmissionDate = `select distinct(EBELN) AS purchasing_doc_no,MTEXT AS  contractual_submission_remarks,PLAN_DATE AS contractual_submission_date from zpo_milestone WHERE EBELN IN(${str}) AND MID = '04'  group by EBELN, MTEXT, PLAN_DATE`;
    let ilmsContractualSubmissionDateArr = await getQuery({
      query: ilmsContractualSubmissionDate,
      values: [],
    });
    // ILMS

    const modifiedPOData = await poDataModify(poArr);
    const materialTypeQuery = "SELECT * FROM material_type";
    const materialType = await getQuery({
      query: materialTypeQuery,
      values: [],
    });

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
        const created = createdArr.find(
          ({ purchasing_doc_no }) => purchasing_doc_no == item.poNo || item.poNb
        ); //created_at

        let currentStage = {
          current: await currentStageHandler(item.poNb),
        };
        obj.currentStage = currentStage;
        obj.poNumber = item.poNb;
        obj.createdAt = created?.created_at;
        obj.poType = item?.poType;
        obj.isDo = item.isDo;
        obj.vendor_code = item.vendor_code;
        obj.vendor_name = item.vendor_name;
        obj.project_code = item.project_code;
        obj.wbs_id = item.wbs_id;

        ////////////// SD /////////////////
        const SDVGObj = {};
        const SdbgActualSubmission = SdbgActualSubmissionDateArr.find(
          ({ purchasing_doc_no }) => purchasing_doc_no == item.poNb
        );

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
          ? parseInt(SdbgActualSubmission.actualSubmissionDate)
          : null;
        SDVGObj.SdLastStatus = SdgbLast ? SdgbLast.status : null;
        obj.SD = SDVGObj;
        ////////////// SD /////////////////

        ////////////// DRAWING /////////////////
        const DrawingObj = {};
        const DrawingActualSubmission = DrawingActualSubmissionDateArr.find(
          ({ purchasing_doc_no }) => purchasing_doc_no == item.poNb
        );
        const DrawingContractualSubmission =
          DrawingContractualSubmissionDateArr.find(
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
          ? parseInt(DrawingActualSubmission.actualSubmissionDate)
          : null;
        DrawingObj.DrawingLastStatus = DrawingLast ? DrawingLast.status : null;
        ////////////// DRAWING /////////////////
        obj.Drawing = DrawingObj;

        ////////////// QAP /////////////////
        const qapObj = {};
        const qapActualSubmission = qapActualSubmissionDateArr.find(
          ({ purchasing_doc_no }) => purchasing_doc_no == item.poNb
        );
        const qapContractualSubmission = qapContractualSubmissionDateArr.find(
          ({ purchasing_doc_no }) => purchasing_doc_no == item.poNb
        );
        const qapLast = qapLastStatusArr.find(
          ({ purchasing_doc_no }) => purchasing_doc_no == item.poNb
        );
        qapObj.qapContractualSubmissionDate = qapContractualSubmission
          ? qapContractualSubmission.contractual_submission_date
          : null;
        qapObj.qapActualSubmissionDate = qapActualSubmission
          ? parseInt(qapActualSubmission.actualSubmissionDate)
          : null;
        qapObj.qapLastStatus = qapLast ? qapLast.status : null;
        ////////////// QAP /////////////////
        obj.QAP = qapObj;

        ////////////// ILMS /////////////////
        const ilmsObj = {};
        const ilmsActualSubmission = ilmsActualSubmissionDateArr.find(
          ({ purchasing_doc_no }) => purchasing_doc_no == item.poNb
        );
        const ilmsContractualSubmission = ilmsContractualSubmissionDateArr.find(
          ({ purchasing_doc_no }) => purchasing_doc_no == item.poNb
        );
        const ilmsLast = ilmsLastStatusArr.find(
          ({ purchasing_doc_no }) => purchasing_doc_no == item.poNb
        );
        ilmsObj.ilmsContractualSubmissionDate = ilmsContractualSubmission
          ? ilmsContractualSubmission.contractual_submission_date
          : null;
        ilmsObj.ilmsActualSubmissionDate = ilmsActualSubmission
          ? parseInt(ilmsActualSubmission.actualSubmissionDate)
          : null;
        ilmsObj.ilmsLastStatus = ilmsLast ? ilmsLast.status : null;
        ////////////// ILMS /////////////////
        obj.ILMS = ilmsObj;

        //// DO
        // const DOObj = {};
        const DOObj = doArr.find(({ EBELN }) => EBELN == item.poNb);
        // DOObj.doData = doInfo ? doInfo : null;
        obj.DO = DOObj ? DOObj : null;
        resultArr.push(obj);
      })
    );
    const sortedRes = resultArr.sort((a, b) => {
      if (a.createdAt > b.createdAt) return -1;
      if (a.createdAt < b.createdAt) return -1;

      if (parseInt(a.poNumber) > parseInt(b.poNumber)) return -1;
      if (parseInt(a.poNumber) < parseInt(b.poNumber)) return 1;

      //a.createdAt < b.createdAt ? 1 : -1
    });

    resSend(res, true, 200, "data fetch scussfully.", sortedRes, null);
  } catch (error) {
    console.error("err", error, error.toString());

    return resSend(res, false, 500, error.toString(), [], null);
  }
};

const doDetails = async (str) => {
  const doQry = `SELECT t1.PERNR as "PERNR",t1.CNAME as "CNAME", t2.ERNAM as "ERNAM", t2.EBELN as "EBELN"
        FROM 
        ekko AS t2 
        LEFT JOIN 
        pa0002 AS t1 
        ON 
            (t1.PERNR::character varying = t2.ERNAM)  WHERE t2.EBELN = $1`;

  const doArr = await getQuery({ query: doQry, values: [str] });

  return doArr;
};

const poListByEcko = (vendorCode = "") => {
  let sufx;
  let qry = `SELECT DISTINCT(EBELN) as "EBELN",aedat as created_at from ekko`;
  if (vendorCode) {
    sufx = ` WHERE LIFNR = '${vendorCode}'`;
    qry = qry + sufx;
  }
  return qry;
};

// const poListByPPNC = (queryData, tokenData) => {
//   let poListQuery = "";

//   if (queryData.type == PROJECT) {
//     poListQuery = `SELECT * FROM wbs WHERE 1 = 1`;
//     if (queryData.id) {
//       poListQuery += ` AND project_code = '${queryData.id}'`;
//     }
//   }
//   if (queryData.type == WBS_ELEMENT) {
//     poListQuery = `SELECT * FROM wbs WHERE 1 = 1`;
//     if (queryData.id) {
//       poListQuery += ` AND wbs_id = '${queryData.id}'`;
//     }
//   }

//   // if (queryData.poNo) {
//   //     poListQuery += ` AND purchasing_doc_no = "${queryData.poNo}"`;
//   // }

//   return poListQuery;
// };

function joinArrays(arr1, arr2) {
  return arr1.map((item1) => {
    const matchingItem = arr2.find(
      (item2) =>
        item1.eblel == item2.purchasing_doc_no && item1.mid == item2.flag
    );

    if (matchingItem) {
      return { ...item1, ...matchingItem };
    }

    return item1;
  });
}

function mergeData(timelineData, currentData) {
  return timelineData.map((timelineItem) => {
    const currentItem = currentData.find(
      (currentItem) =>
        currentItem.purchasing_doc_no === timelineItem.ebeln &&
        currentItem.flag === timelineItem.mid
    );

    return currentItem
      ? { ...timelineItem, current_status: currentItem.current_status }
      : timelineItem;
  });
}

// EBELN(VARCAT10),EBELP(VARCAT5),SLNO(INT3),WDC(CAHAR25)


const poListCopy = async (req, res) => {

  try {
    const client = await poolClient();
    const tokenData = req.tokenData;
    try {
      let Query = "";

      if (tokenData.user_type === USER_TYPE_VENDOR) {
        Query = `SELECT DISTINCT(EBELN) as "EBELN",aedat as created_at from ekko WHERE LIFNR = '${tokenData.vendor_code}'`;
      } else {
        switch (tokenData.department_id) {
          case USER_TYPE_GRSE_QAP:
            if (tokenData.internal_role_id === ASSIGNER) {
              //  Query = `SELECT DISTINCT(purchasing_doc_no) from qap_submission`;
              Query = poListByEcko();
            } else if (tokenData.internal_role_id === STAFF) {
              Query = `SELECT DISTINCT(purchasing_doc_no),created_at from qap_submission WHERE assigned_to = '${tokenData.vendor_code}' AND is_assign = 1`;
            }
            break;
          case USER_TYPE_GRSE_FINANCE:
            if (tokenData.internal_role_id === ASSIGNER) {
              Query = poListByEcko();
              // Query = `SELECT DISTINCT(purchasing_doc_no) from ${SDBG} WHERE status = '${FORWARD_TO_FINANCE}'`;
            } else if (tokenData.internal_role_id === STAFF) {
              Query = `SELECT DISTINCT(purchasing_doc_no),created_at from ${SDBG} WHERE assigned_to = '${tokenData.vendor_code}'`;
            }
            break;
          case USER_TYPE_GRSE_DRAWING:
            // Query = `SELECT DISTINCT(purchasing_doc_no) as purchasing_doc_no from ${DRAWING}`;
            Query = poListByEcko();
            break;
          case USER_TYPE_GRSE_PURCHASE:
            if (tokenData.internal_role_id === ASSIGNER) {
              Query = poListByEcko();
            } else if (tokenData.internal_role_id === STAFF) {
              Query = `SELECT DISTINCT(EBELN) as purchasing_doc_no,aedat as created_at from ekko WHERE ERNAM = '${tokenData.vendor_code}'`;
            }
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
          // console.log("DEFAULT ALL PO SHOWING . . . . ", Query);
        }
      }
      if (!Query) {
        return resSend(res, false, 400, "You don't have permission or no data found", null, null);
      }


      let pageNo = parseInt(req.query.pageNo) || 1;
      let pageSize = parseInt(req.query.pageSize) || 500;
      let offset = (pageNo - 1) * pageSize;

      const { vCode, yardNo, empCode, poNo } = req.query;
      let conditionQuery = "1 = 1";
      if (vCode) {
        conditionQuery += ` AND lifnr LIKE '%${vCode}%'`;
      }
      if (empCode) {
        conditionQuery += ` AND ernam LIKE '%${empCode}%'`;
      }
      if (yardNo) {
        conditionQuery += ` AND yard LIKE '${yardNo}'`;
      }


      const allPo = await poolQuery({ client, query: Query, values: [] });

      if (!allPo.length) {
        return resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, allPo, null);
      }

      let poArr = allPo.map((el) => el?.EBELN || el?.ebeln || el?.purchasing_doc_no);

      if (poNo) {
        // if po number send from client, then po is filter from allPos
        // becaus of the user has all acces o
        // poArr = [poNo];
        poArr = poArr?.filter((poItems) => typeof poItems == 'string' && poItems.includes(poNo));
      }
      const poDetails = await getPoWithLineItems(client, poArr, pageSize, offset, conditionQuery);
      const poCount = await getCount(client, poArr, conditionQuery);
      const contractualDates = await getActualAndCurrentDetails(client, poArr);
      const currentActivity = await currentStageHandleForAllActivity(client, poArr);
      const materialTypeQuery = "SELECT * FROM material_type";
      const materialType = await poolQuery({ client, query: materialTypeQuery, values: [] });
      const modifiedPOData = poDataModify2(poDetails);

      const result = [];
      Object.keys(modifiedPOData).forEach((key) => {
        const mileStoneActivity = setMileStoneActivity(key, contractualDates)
        const isMatTypePO = poTypeCheck(modifiedPOData[key], materialType);
        const poType = isMatTypePO;

        result.push({
          poNumber: key,
          currentStage: {
            current: currentActivity[key]
          },
          vendor_code: modifiedPOData[key][0]?.vendor_code,
          vendor_name: modifiedPOData[key][0]?.vendor_name,
          createdAt: modifiedPOData[key][0]?.createdAt,
          poType,
          ...mileStoneActivity
        });
      });


      resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, result, "", poCount, pageNo);


    } catch (error) {
      resSend(res, false, 500, Message.DATA_FETCH_ERROR, error.message, null);
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, false, 501, Message.DB_CONN_ERROR, error.message, null);
  }
}


module.exports = { details, download, poList, poListCopy };
