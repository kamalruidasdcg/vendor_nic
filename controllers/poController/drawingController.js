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
const { query, getQuery, poolClient, poolQuery } = require("../../config/pgDbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const {
  INSERT,
  ASSIGNER,
  UPDATE,
  USER_TYPE_VENDOR,
  USER_TYPE_GRSE_DRAWING,
  STAFF,
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
  ASSIGNED,
} = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const { getFilteredData } = require("../../controllers/genralControlles");
const {
  DRAWING_SUBMIT_MAIL_TEMPLATE,
} = require("../../templates/mail-template");
const SENDMAIL = require("../../lib/mailSend");
// const { mailTrigger } = require("../sendMailController");
const {
  DRAWING_SUBMIT_BY_VENDOR,
  DRAWING_SUBMIT_BY_GRSE,
  DRAWING_UPLOAD_TO_CDO,
  DRAWING_ACKNOWLEDGE_RECEIPT,
} = require("../../lib/event");
const { Console } = require("console");
const { getUserDetailsQuery } = require("../../utils/mailFunc");
const { sendMail } = require("../../services/mail.services");
const { getLastAssignee, getAssigneeList, checkIsAssigned, getFristRow, checkIsApprovedRejected, checkPoType } = require("../../services/lastassignee.servces");



const submitDrawing = async (req, res) => {

  try {

    const client = await poolClient();
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

      if (!payload.purchasing_doc_no || !payload.status) {
        return resSend(res, false, 400, "Please send valid payload", null, null);
      }

      if (
        tokenData.user_type != USER_TYPE_VENDOR &&
        tokenData.department_id != USER_TYPE_GRSE_DRAWING
      ) {
        return resSend(res, true, 200, "please login as Valid user!", null, null);
      }

      const poType = await checkPoType(payload.purchasing_doc_no);
      
      const star = `vendor_code,actiontype`;
      const action_type_with_vendor_code = await getFristRow(DRAWING, star, payload.purchasing_doc_no); // await get_action_type_with_vendor_code(payload.purchasing_doc_no);

      if(poType === "MATERIAL" && tokenData.user_type != USER_TYPE_VENDOR) {
       
        const check = await checkIsApprovedRejected(DRAWING, payload.purchasing_doc_no, payload.reference_no, APPROVED, REJECTED);
                if (check > 0) {
                    return resSend(res, false, 200, `You can't take any action against this reference_no.`, null, null);
                }
      }
      
      if (poType === "MATERIAL" && tokenData.user_type != USER_TYPE_VENDOR && tokenData.internal_role_id == ASSIGNER && payload.status == ASSIGNED) {
        if (!payload.assign_to || payload.assign_to == "") {
          return resSend(res, false, 200, "please send assign_to.", payload, null);
        }
        payload.vendor_code = action_type_with_vendor_code.vendor_code;
        payload.actiontype = action_type_with_vendor_code.actiontype;
        payload.updated_by = `GRSE`;
        payload.last_assigned = 1;
        payload.created_by_id = tokenData.vendor_code;
        payload.assign_from = tokenData.vendor_code;
        payload.reference_no = `DRAWING ${ASSIGNED}`;

        let insertObj;
        insertObj = drawingPayload(payload, payload.status);

        const { q, val } = generateQuery(INSERT, DRAWING, insertObj);
        const response = await poolQuery({ client, query: q, values: val });

        const update_assign_to = `UPDATE ${DRAWING} SET last_assigned = 0 WHERE purchasing_doc_no = $1 AND assign_to != $2`;
        let update_assign_touery = await poolQuery({
          client,
          query: update_assign_to,
          values: [payload.purchasing_doc_no, payload.assign_to],
        });
        console.log(update_assign_touery);
        return resSend(
          res,
          true,
          200,
          `The DRAWING is ASSIGNED successfully.`,
          null,
          null
        );

      }
      
      if (poType === "MATERIAL" && tokenData.user_type != USER_TYPE_VENDOR && tokenData.internal_role_id == STAFF) {
        console.log(payload.status);
        
        if(payload.status != APPROVED && payload.status != REJECTED) {
          return resSend(res,true,200,"Staff can only APPROVED or rejected.",null,null);
        }
        if (!payload.reference_no) {
          return resSend(res,true,200,"Please send valid reference_no.",null,null);
        }
        const assign = `assign_to`;
        let checkAssig = await checkIsAssigned(DRAWING, payload.purchasing_doc_no, tokenData.vendor_code, assign);

        if (checkAssig != 1) {
          return resSend( res,false,200,"This PO is not assigned to you!",null,null);
        }

        payload.vendor_code = action_type_with_vendor_code.vendor_code;
        payload.actiontype = action_type_with_vendor_code.actiontype;
        payload.updated_by = `GRSE`;
        payload.last_assigned = 0;
        payload.created_by_id = tokenData.vendor_code;
        
        if(payload.file) {
            delete payload.file;
        }
        if(payload.mailSendTo) {
          delete payload.mailSendTo;
        }
        
        let insertObj;
        insertObj = drawingPayload(payload, payload.status);

        const { q, val } = generateQuery(INSERT, DRAWING, insertObj);
        const response = await poolQuery({ client, query: q, values: val });
        console.log(response);
        if(response) {
          return resSend(res, true, 200, `Drawing is ${payload.status}`, response, null);
        }

      }

      if (poType === "SERVICE" && tokenData.user_type == USER_TYPE_VENDOR) {
        return resSend(
          res,
          false,
          200,
          "This is service PO.Vendor can`t do any activity.",
          null,
          null
        );
      }

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
        const Query = `SELECT COUNT(EBELN) AS po_count from ekko WHERE EBELN = $1 AND LIFNR = $2`;

        const poArr = await poolQuery({
          client,
          query: Query,
          values: [payload.purchasing_doc_no, tokenData.vendor_code],
        });
        console.log(poArr);
        if (poArr[0].po_count == 0) {
          return resSend(res, false, 200, "you are not authorised.", null, null);
        }
      }
      payload.vendor_code = tokenData.vendor_code;
      
      

      payload.updated_by =
        tokenData.user_type === USER_TYPE_VENDOR ? "VENDOR" : "GRSE";

      payload.created_by_id = tokenData.vendor_code;
      if (!payload.reference_no) {
        payload.reference_no = await create_reference_no(
          "DW",
          tokenData.vendor_code
        );
      }

    
      let insertObj;

     
      insertObj = drawingPayload(payload, payload.status);
     
      const { q, val } = generateQuery(INSERT, DRAWING, insertObj);
      const response = await poolQuery({ client, query: q, values: val });

      if (payload.status === APPROVED) {

        // CDO APPROVED DRAWING . . 

        sendMailToVendor(payload)

        const actual_subminission = await setActualSubmissionDate(
          payload,
          "02",
          tokenData,
          SUBMITTED
        );
        console.log("actual_subminission", actual_subminission);
      }

     
      if (response) {
        resSend(res, true, 200, `Drawing ${payload.status}`, response[0], null);
      } else {
        resSend(res, false, 400, "No data inserted", null, null);
      }

    } catch (error) {
      console.log("Drawing submission api", error);

      return resSend(res, false, 500, "internal server error", [], null);
    } finally {
      client.release();
    }
  } catch (error) {

    resSend(res, false, 500, "error in db conn!", error, "");
  }
};

const get_action_type_with_vendor_code = async (
  purchasing_doc_no
) => {
  const GET_LATEST_SDBG = `SELECT actiontype,vendor_code FROM ${DRAWING} WHERE purchasing_doc_no = $1 ORDER BY ${DRAWING}.created_at ASC LIMIT 1`;
  console.log(GET_LATEST_SDBG);
  const result = await getQuery({
    query: GET_LATEST_SDBG,
    values: [purchasing_doc_no],
  });
  return result;
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




async function sendMailToCDOandDO(data) {

  try {

    let vendorDetails = getUserDetailsQuery('cdo_and_do', '$1');
    const mail_details = await getQuery({ query: vendorDetails, values: [data.purchasing_doc_no] });
    const dataObj = { ...data };
    await sendMail(DRAWING_UPLOAD_TO_CDO, dataObj, { users: mail_details }, DRAWING_UPLOAD_TO_CDO);
  } catch (error) {
    console.log(error.toString(), error.stack);
  }
}
async function sendMailToVendor(data) {

  try {

    let vendorDetailsQuery = getUserDetailsQuery('vendor', '$1');
    const vendorDetails = await getQuery({ query: vendorDetailsQuery, values: [data.vendor_code] });
    const dataObj = { ...data };
    await sendMail(DRAWING_ACKNOWLEDGE_RECEIPT, dataObj, { users: vendorDetails }, DRAWING_ACKNOWLEDGE_RECEIPT);
  } catch (error) {
    console.log(error.toString(), error.stack);
  }
}


const assigneeList = async (req, res) => {
  // console.log(req.tokenData);
  try {
    const tokenData = { ...req.tokenData };

    if (
      tokenData.department_id != USER_TYPE_GRSE_DRAWING ||
      tokenData.internal_role_id != ASSIGNER
    ) {
      return resSend(
        res,
        true,
        200,
        "Please Login as Drawing Assigner.",
        null,
        null
      );
    }
    const dept_id = USER_TYPE_GRSE_DRAWING;
    const internal_role_id = 2;
    let result = await getAssigneeList(dept_id, internal_role_id);
    console.table(result);
    return resSend(
      res,
      true,
      200,
      "DRAWING assigneeList fetch successfully!",
      result,
      null
    );
  } catch (error) {
    console.error("Error executing the query:", error.message);
    return resSend(res, false, 500, "Internal Server Error", error, null);
  }

};

const getCurrentAssignee = async (req, res) => {
  try {
    if (!req.query.poNo) {
      return resSend(res, true, 200, "Please send PO Number.", null, null);
    }
    const assign = `assign_to`;
    let result = await getLastAssignee(DRAWING, req.query.poNo, assign);

    if (result.length > 0) {
      resSend(res, true, 200, "assigne fetched successfully", result[0], null);
    } else {
      resSend(res, true, 200, "no record found", "not assigend.", null);
    }
  } catch (error) {
    console.error("Error executing the query:", error.message);
    return resSend(res, false, 500, "Internal Server Error", error, null);
  }
}

module.exports = { submitDrawing, list, assigneeList, getCurrentAssignee };
