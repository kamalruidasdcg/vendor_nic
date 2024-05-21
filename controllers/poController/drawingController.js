const path = require("path");
const {
  sdbgPayload,
  drawingPayload,
  poModifyData,
  qapPayload,
  insertActualSubmission,
  setActualSubmissionDate,
  create_reference_no,
  get_latest_activity,
} = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const {
  INSERT,
  UPDATE,
  USER_TYPE_VENDOR,
  USER_TYPE_GRSE_DRAWING,
} = require("../../lib/constant");

const {
  DRAWING,
  EKKO,
  EKPO,
  SDBG,
  QAP_SUBMISSION,
  ILMS,
} = require("../../lib/tableName");
const {
  SUBMITTED,
  ACKNOWLEDGED,
  RE_SUBMITTED,
  APPROVED,
  REJECTED,
} = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const { getFilteredData } = require("../../controllers/genralControlles");
const {
  DRAWING_SUBMIT_MAIL_TEMPLATE,
} = require("../../templates/mail-template");
const SENDMAIL = require("../../lib/mailSend");
const { mailTrigger } = require("../sendMailController");
const {
  DRAWING_SUBMIT_BY_VENDOR,
  DRAWING_SUBMIT_BY_GRSE,
} = require("../../lib/event");
const { Console } = require("console");

// add new post
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

const submitDrawing = async (req, res) => {
  // console.log("%^&*&^%%^&*(*&^%$");
  // console.log("tokenData");
  // return;
  try {
    const tokenData = { ...req.tokenData };

    const { ...obj } = req.body;

    // Handle Image Upload
    let fileData = {};
    if (req.file) {
      fileData = {
        fileName: req.file.filename,
        filePath: req.file.path,
        // fileType: req.file.mimetype,
        // fileSize: req.file.size,
      };
    }

    const payload = { ...req.body, ...fileData, created_at: getEpochTime() };
    const verifyStatus = [SUBMITTED, RE_SUBMITTED, APPROVED];

    let materialQuery = `SELECT
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

    let materialResult = await query({
      query: materialQuery,
      values: [payload.purchasing_doc_no],
    });

    const isMaterialTypePO = poTypeCheck(materialResult);

    const poType = isMaterialTypePO === true ? "SERVICE" : "MATERIAL";

    if (
      poType === "MATERIAL" &&
      tokenData.department_id == USER_TYPE_GRSE_DRAWING &&
      (!payload.reference_no || payload.reference_no == "")
    ) {
      return resSend(
        res,
        false,
        200,
        "Please send valid reference_no.",
        null,
        null
      );
    }
    if (
      poType === "SERVICE" &&
      tokenData.user_type == USER_TYPE_VENDOR &&
      (!payload.reference_no || payload.reference_no == "")
    ) {
      return resSend(
        res,
        false,
        200,
        "Please send valid reference_no by vendor.",
        null,
        null
      );
    }

    if (!payload.purchasing_doc_no || !payload.status) {
      return resSend(res, false, 400, "Please send valid payload", null, null);
    }

    if (
      tokenData.user_type != USER_TYPE_VENDOR &&
      tokenData.department_id != USER_TYPE_GRSE_DRAWING
    ) {
      return resSend(res, true, 200, "please login as Valid user!", null, null);
    }

    if (tokenData.user_type === USER_TYPE_VENDOR) {
      if (payload.status == APPROVED || payload.status == REJECTED) {
        return resSend(
          res,
          true,
          200,
          `vendor can not ${payload.status}!`,
          null,
          null
        );
      }
      const Query = `SELECT COUNT(EBELN) AS po_count from ekko WHERE EBELN = ? AND LIFNR = ?`;

      const poArr = await query({
        query: Query,
        values: [obj.purchasing_doc_no, tokenData.vendor_code],
      });
      console.log(poArr);
      if (poArr[0].po_count == 0) {
        return resSend(res, false, 200, "you are not authorised.", null, null);
      }
    }
    payload.vendor_code = tokenData.vendor_code;
    const last_data = await get_latest_activity(
      DRAWING,
      payload.purchasing_doc_no,
      payload.reference_no
    );

    if (tokenData.user_type != USER_TYPE_VENDOR && poType === "MATERIAL") {
      payload.vendor_code = last_data.vendor_code;
    }
    if (
      last_data &&
      typeof last_data == "object" &&
      Object.keys(last_data).length &&
      (last_data.status == REJECTED || last_data.status == APPROVED)
    ) {
      return resSend(
        res,
        false,
        200,
        `This Drawing is already ${last_data.status}.`,
        null,
        null
      );
    }

    payload.updated_by =
      tokenData.user_type === USER_TYPE_VENDOR ? "VENDOR" : "GRSE";

    payload.created_by_id = tokenData.vendor_code;
    if (!payload.reference_no) {
      payload.reference_no = await create_reference_no(
        "DW",
        tokenData.vendor_code
      );
    }

    // console.log("-----payload.reference_no----");
    // console.log(payload);
    // return;
    // const result2 = await getDrawingData(payload.purchasing_doc_no, APPROVED);
    // console.log("result", result2);

    // if (result2 && result2?.length) {

    //     const data = [{
    //         purchasing_doc_no: result2[0]?.purchasing_doc_no,
    //         status: result2[0]?.status,
    //         approvedName: result2[0]?.created_by_name,
    //         approvedById: result2[0]?.created_by_id,
    //         message: "The Drawing is already approved. If you want to reopen, please contact with senior management."
    //     }];

    //     return resSend(res, true, 200, `This drawing aleready ${APPROVED} [ PO - ${payload.purchasing_doc_no} ]`, data, null);
    // }

    let insertObj;

    // if (payload.status === SUBMIT) {
    //     payload.vendor_code = tokenData.vendor_code;
    //     insertObj = drawingPayload(payload, SUBMIT);
    // } else if (payload.status === RE_SUBMITTED) {
    //     payload.vendor_code = tokenData.vendor_code;
    //     // insertObj = drawingPayload(payload, RE_SUBMITTED);
    // } else if (payload.status === APPROVED) {
    //     // payload.vendor_code = payload.vendor_code;

    //     const drawingData = await getDrawingData(payload.purchasing_doc_no, SUBMIT);

    //     console.log("drawingData", drawingData);
    //     if (drawingData && drawingData.length) {
    //         payload.vendor_code = drawingData[0].vendor_code;
    //     }
    //     console.log("payload", payload);
    //     insertObj = drawingPayload(payload, payload.status);
    // }
    insertObj = drawingPayload(payload, payload.status);
    // console.log("%******************");
    // console.log(payload);
    // console.log("%_&&_((((_$");
    // console.log(insertObj);
    // return;

    const { q, val } = generateQuery(INSERT, DRAWING, insertObj);
    const response = await query({ query: q, values: val });

    if (payload.status === APPROVED) {
      const actual_subminission = await setActualSubmissionDate(
        payload,
        "02",
        tokenData,
        SUBMITTED
      );
      console.log("actual_subminission", actual_subminission);
    }

    console.log("%_&&_((((_$");
    console.log(response);
    //return;
    if (response.affectedRows) {
      resSend(res, true, 200, `Drawing ${payload.status}`, fileData, null);
    } else {
      resSend(res, false, 400, "No data inserted", response, null);
    }

    // } else {
    //     resSend(res, false, 400, "Please upload a valid File", fileData, null);
    // }
  } catch (error) {
    console.log("Drawing submission api", error);

    return resSend(res, false, 500, "internal server error", [], null);
  }
};

const getDrawingData = async (purchasing_doc_no, drawingStatus) => {
  const isSDBGAcknowledge = `SELECT purchasing_doc_no, status, updated_by, vendor_code,  created_by_id FROM ${DRAWING} WHERE purchasing_doc_no = ? AND status = ?`;
  const acknowledgeResult = await query({
    query: isSDBGAcknowledge,
    values: [purchasing_doc_no, drawingStatus],
  });
  return acknowledgeResult;
};

const list = async (req, res) => {
  try {
    const tokenData = { ...req.tokenData };
    const { poNo } = req.query;

    // if (tokenData.user_type != USER_TYPE_VENDOR && tokenData.department_id != USER_TYPE_GRSE_DRAWING) {
    //     return resSend(res, true, 200, "you are not authorised.", null, null);
    // }

    // if(tokenData.user_type === USER_TYPE_VENDOR) {
    //     const getQuery = `SELECT COUNT(EBELN) AS ven_no FROM ${EKKO} WHERE EBELN = ? AND LIFNR = ?`;
    //     const result = await query({ query: getQuery, values: [poNo, tokenData.vendor_code] });
    //     if (result[0].ven_no == 0) {
    //         return resSend(res, true, 200, "you are not authorised for this PO.", null, null);
    //     }
    // }

    req.query.$tableName = DRAWING;

    req.query.$filter = `{ "purchasing_doc_no" :  ${req.query.poNo}}`;

    if (!req.query.poNo) {
      return resSend(res, false, 400, "Please send po number", null, null);
    }

    getFilteredData(req, res);
  } catch (err) {
    console.log("data not fetched", err);
    resSend(res, false, 500, "Internal server error", null, null);
  }
};

async function poContactDetails(purchasing_doc_no) {
  const po_contact_details_query = `SELECT 
        t1.EBELN, 
        t1.ERNAM AS dealingOfficerId, 
        t1.LIFNR AS vendor_code, 
        t2.CNAME AS dealingOfficerName, 
        t3.USRID_LONG AS dealingOfficerMail, 
        t4.NAME1 as vendor_name, 
        t4.ORT01 as vendor_address, 
        t5.SMTP_ADDR as vendor_mail_id
    FROM 
        ekko AS t1 
    LEFT JOIN 
        pa0002 AS t2 
    ON 
        t1.ERNAM= t2.PERNR 
    LEFT JOIN 
        pa0105 AS t3 
    ON 
        (t2.PERNR = t3.PERNR AND t3.SUBTY = '0030') 
    LEFT JOIN 
        lfa1 AS t4 
    ON 
        t1.LIFNR = t4.LIFNR 
    LEFT JOIN 
        adr6 AS t5
       ON
      t1.LIFNR = t5.PERSNUMBER
    WHERE 
        t1.EBELN = ?`;

  const result = await query({
    query: po_contact_details_query,
    values: [purchasing_doc_no],
  });

  return result;
}

module.exports = { submitDrawing, list };
