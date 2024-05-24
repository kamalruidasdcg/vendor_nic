const path = require("path");
const {
  sdbgPayload,
  sdbgPayloadVendor,
  setActualSubmissionDate,
  setActualSubmissionDateSdbg,
  create_reference_no,
} = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const { resSend } = require("../../lib/resSend");
const { query } = require("../../config/dbConfig");
const { generateQuery, getEpochTime, getDateString } = require("../../lib/utils");
const {
  INSERT,
  UPDATE,
  USER_TYPE_VENDOR,
  ASSIGNER,
  STAFF,
  USER_TYPE_GRSE_FINANCE,
  ACTION_SDBG,
  ACTION_DD,
  ACTION_IB,
} = require("../../lib/constant");
const {
  EKKO,
  NEW_SDBG,
  SDBG_ENTRY,
  SDBG,
  VENDOR_MASTER_LFA1,
  ACTUAL_SUBMISSION_DB,
} = require("../../lib/tableName");
const { FINANCE, VENDOR } = require("../../lib/depertmentMaster");
const {
  PENDING,
  ACCEPTED,
  ASSIGNED,
  RE_SUBMITTED,
  REJECTED,
  FORWARD_TO_FINANCE,
  RETURN_TO_DO,
  APPROVED,
  SUBMITTED,
} = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const { getFilteredData } = require("../../controllers/genralControlles");
const SENDMAIL = require("../../lib/mailSend");
const { SDBG_SUBMIT_MAIL_TEMPLATE } = require("../../templates/mail-template");
const { mailInsert } = require("../../services/mai.services");
const { mailTrigger } = require("../sendMailController");
const {
  SDBG_SUBMIT_BY_VENDOR,
  SDBG_SUBMIT_BY_GRSE,
} = require("../../lib/event");
const { Console } = require("console");
const { makeHttpRequest } = require("../../config/sapServerConfig");
const { zfi_bgm_1_Payload } = require("../../services/sap.services");

// add new post
const submitSDBG = async (req, res) => {
  try {
    // Handle Image Upload
    let fileData = {};
    console.log(req.file);
    if (req.file) {
      fileData = {
        fileName: req.file.filename,
        filePath: req.file.path,
        // fileType: req.file.mimetype,
        //fileSize: req.file.size,
      };

      const tokenData = { ...req.tokenData };
      console.log(tokenData);
      // create_reference_no = async (type, vendor_code)
      let action_type = req.body.action_type;

      const firstTwoChars = action_type.slice(0, 2);
      action_type = firstTwoChars.toUpperCase();
      const reference_no = await create_reference_no(
        action_type,
        tokenData.vendor_code
      ); //`BG-${getEpochTime()}-${tokenData.vendor_code.slice(-4)}`;

      let payload = {
        reference_no: reference_no,
        ...req.body,
        ...fileData,
        created_at: getEpochTime(),
      };

      payload = sdbgPayload(payload);

      if (tokenData.user_type != USER_TYPE_VENDOR) {
        return resSend(
          res,
          false,
          200,
          "Please please login as vendor for SDBG subminission.",
          null,
          null
        );
      }

      payload.vendor_code = tokenData.vendor_code;
      payload.updated_by = "VENDOR";
      payload.created_by_id = tokenData.vendor_code;
      // console.log("#$%^&*())(*&^$");
      // console.log(payload);
      // return;
      const verifyStatus = [SUBMITTED, RE_SUBMITTED];

      if (!payload.purchasing_doc_no && verifyStatus.includes(payload.status)) {
        // const directory = path.join(__dirname, '..', 'uploads', 'drawing');
        // const isDel = handleFileDeletion(directory, req.file.filename);
        return resSend(
          res,
          false,
          400,
          "Please send valid payload",
          null,
          null
        );
      }
      console.log("HEllo World!");
      // const GET_LATEST_SDBG = await get_latest_sdbg(payload.purchasing_doc_no);

      // if (GET_LATEST_SDBG.length > 0) {
      //   if (GET_LATEST_SDBG[0].status == APPROVED) {
      //     return resSend(
      //       res,
      //       false,
      //       200,
      //       `The SDBG is already ${APPROVED}.`,
      //       null,
      //       null
      //     );
      //   }
      // }

      const { q, val } = generateQuery(INSERT, SDBG, payload);
      const response = await query({ query: q, values: val });

      if (response.affectedRows) {
        // mail setup

        // if (payload.status === PENDING) {

        //     if (payload.updated_by == "VENDOR") {

        //         const result = await poContactDetails(payload.purchasing_doc_no);
        //         payload.delingOfficerName = result[0]?.dealingOfficerName;
        //         payload.mailSendTo = result[0]?.dealingOfficerMail;
        //         payload.vendor_name = result[0]?.vendor_name;
        //         payload.vendor_code = result[0]?.vendor_code;
        //         payload.sendAt = new Date(payload.created_at);
        //         mailTrigger({ ...payload }, SDBG_SUBMIT_BY_VENDOR);

        //     } else if (payload.updated_by == "GRSE") {

        //         const result = await poContactDetails(payload.purchasing_doc_no);
        //         payload.vendor_name = result[0]?.vendor_name;
        //         payload.vendor_code = result[0]?.vendor_code;
        //         payload.mailSendTo = result[0]?.vendor_mail_id;
        //         payload.delingOfficerName = result[0]?.dealingOfficerName;
        //         payload.sendAt = new Date(payload.created_at);

        //         mailTrigger({ ...payload }, SDBG_SUBMIT_BY_GRSE);

        //     }
        // }
        // if (payload.status === ACKNOWLEDGED && payload.updated_by == "GRSE") {

        //     const result = await poContactDetails(payload.purchasing_doc_no);
        //     payload.vendor_name = result[0]?.vendor_name;
        //     payload.vendor_code = result[0]?.vendor_code;
        //     payload.mailSendTo = result[0]?.vendor_mail_id;
        //     payload.delingOfficerName = result[0]?.dealingOfficerName;
        //     payload.sendAt = new Date(payload.created_at);
        //     mailTrigger({ ...payload }, SDBG_SUBMIT_BY_GRSE);

        // }

        // await handelEmail(payload);

        resSend(res, true, 200, "file uploaded!", fileData, null);
      } else {
        resSend(res, false, 400, "No data inserted", response, null);
      }
    } else {
      resSend(res, false, 400, "Please upload a valid File", fileData, null);
    }
  } catch (error) {
    console.log("SDGB Submission api", error);

    return resSend(res, false, 500, "internal server error", [], null);
  }
};

const get_latest_sdbg = async (purchasing_doc_no) => {
  const GET_LATEST_SDBG = `SELECT created_at,status FROM sdbg  WHERE purchasing_doc_no = ? ORDER BY sdbg.created_at DESC LIMIT 1`;

  const result2 = await query({
    query: GET_LATEST_SDBG,
    values: [purchasing_doc_no],
  });

  // console.log("#$%^&*()(*&^%$#$%^&*");
  //console.log(result2);
  return result2;
};

const get_latest_sdbg_with_reference = async (
  purchasing_doc_no,
  reference_no
) => {
  const GET_LATEST_SDBG = `SELECT file_name,file_path,action_type,vendor_code,assigned_from,assigned_to,created_at,status FROM sdbg  WHERE reference_no = ? AND purchasing_doc_no = ? ORDER BY sdbg.created_at DESC LIMIT 1`;

  const result = await query({
    query: GET_LATEST_SDBG,
    values: [reference_no, purchasing_doc_no],
  });

  console.log("#$%^&*()(*&^%$#$%^&*");
  console.log(result);
  return result;
};

const getSDBGData = async (req, res) => {
  try {
    const tokenData = { ...req.tokenData };

    if (!req.query.poNo) {
      return resSend(res, true, 200, "Please send PO Number.", null, null);
    }

    const Q = `SELECT * FROM ${SDBG} WHERE purchasing_doc_no = ?`;
    const result = await query({
      query: Q,
      values: [req.query.poNo],
    });

    return resSend(res, true, 200, "data fetch successfully.", result, null);
  } catch (error) {
    return resSend(res, false, 400, "Data not fetch!!", error, null);
  }
};

const getSdbgEntry = async (req, res) => {
  try {
    const tokenData = { ...req.tokenData };

    if (!req.query.poNo) {
      return resSend(res, true, 200, "Please send PO Number.", null, null);
    }
    const { poNo, reference_no } = req.query;
    let Query = `SELECT t1.*,t2.reference_no FROM sdbg_entry AS t1
                            LEFT JOIN 
                                    sdbg AS t2 
                                ON 
                            t2.reference_no= t1.reference_no 
                        WHERE t1.purchasing_doc_no = '${poNo}' AND t2.reference_no = '${reference_no}'`;

    const dealingOfficer = await checkIsDealingOfficer(
      poNo,
      tokenData.vendor_code
    );

    let sufix;
    if (
      tokenData.department_id === USER_TYPE_GRSE_FINANCE &&
      tokenData.internal_role_id === ASSIGNER
    ) {
      sufix = ` AND t2.status = '${FORWARD_TO_FINANCE}'`;
      Query = Query + sufix;
    } else if (
      tokenData.department_id === USER_TYPE_GRSE_FINANCE &&
      tokenData.internal_role_id === STAFF
    ) {
      sufix = ` AND t2.assigned_to = '${tokenData.vendor_code}'`;
      Query = Query + sufix;
    } else if (dealingOfficer === 1) {
      Query = Query;
    } else {
      return resSend(res, false, 200, "You are not authorized.", null, null);
    }
    const result = await query({ query: Query, values: [] });

    return resSend(res, true, 200, "data fetch successfully.", result[0], null);
  } catch (error) {
    return resSend(res, false, 400, "Data not insert!!", error, null);
  }
};

const checkIsDealingOfficer = async (purchasing_doc_no, vendor_code) => {
  console.log([purchasing_doc_no, vendor_code]);
  console.log("#$%^&*");
  const getQuery = `SELECT COUNT(EBELN) AS man_no FROM ${EKKO} WHERE EBELN = ? AND ERNAM = ?`;
  const result = await query({
    query: getQuery,
    values: [purchasing_doc_no, vendor_code],
  });
  return result[0].man_no;
};

const sdbgSubmitByDealingOfficer = async (req, res) => {
  try {
    const tokenData = { ...req.tokenData };

    const { ...obj } = req.body;

    if (
      !obj ||
      typeof obj !== "object" ||
      !Object.keys(obj).length ||
      !obj.purchasing_doc_no ||
      obj.purchasing_doc_no == "" ||
      !obj.reference_no ||
      obj.reference_no == "" ||
      !obj.status ||
      !obj.remarks ||
      obj.remarks == ""
    ) {
      return resSend(res, false, 200, "INVALID PAYLOAD", null, null);
    }
    if (obj.status != FORWARD_TO_FINANCE && obj.status != REJECTED) {
      return resSend(res, false, 200, "PLEASE SEND A VALID STATUS", null, null);
    }
    const isDO = await checkIsDealingOfficer(
      obj.purchasing_doc_no,
      tokenData.vendor_code
    );

    if (isDO === 0) {
      return resSend(
        res,
        false,
        200,
        "Please Login as dealing officer.",
        null,
        null
      );
    }

    const GET_LATEST_SDBG = await get_latest_sdbg_with_reference(
      obj.purchasing_doc_no,
      obj.reference_no
    ); // `SELECT created_at,status FROM sdbg  WHERE purchasing_doc_no = ? ORDER BY sdbg.created_at DESC LIMIT 1`;

    if (GET_LATEST_SDBG.length > 0) {
      if (GET_LATEST_SDBG[0].status == ACCEPTED) {
        return resSend(
          res,
          false,
          200,
          `The BG is already approved.`,
          null,
          null
        );
      }
      if (
        GET_LATEST_SDBG[0].status == REJECTED ||
        GET_LATEST_SDBG[0].status == FORWARD_TO_FINANCE
      ) {
        return resSend(
          res,
          false,
          200,
          `The BG is already ${GET_LATEST_SDBG[0].status}.`,
          null,
          null
        );
      }
    }

    // GET Vendor Info
    let vendor_code = GET_LATEST_SDBG[0]?.vendor_code;
    let v_query = `SELECT * FROM ${VENDOR_MASTER_LFA1} WHERE LIFNR = ?`;
    const dbResult = await query({
      query: v_query,
      values: [vendor_code],
    });

    let other_details = {};
    if (dbResult && dbResult.length > 0) {
      let obj = dbResult[0];
      other_details.vendor_name = obj.NAME1 ? obj.NAME1 : null;
      other_details.vendor_city = obj.ORT01 ? obj.ORT01 : null;
      other_details.vendor_pin_code = obj.PSTLZ ? obj.PSTLZ : null;
      other_details.vendor_address1 = obj.STRAS ? obj.STRAS : null;
    }

    // GET PO Date
    let po_date_query = `SELECT AEDAT FROM ${EKKO} WHERE EBELN = ?`;
    const poDateRes = await query({
      query: po_date_query,
      values: [obj?.purchasing_doc_no],
    });

    if (poDateRes && poDateRes.length > 0) {
      let obj = poDateRes[0];
      other_details.po_date = obj.AEDAT ? obj.AEDAT : null;
    }
    if (obj.status != REJECTED) {
      const insertPayload = {
        ...other_details,
        reference_no:obj.reference_no,
        purchasing_doc_no: obj.purchasing_doc_no,
        bank_name: obj.bank_name ? obj.bank_name : null,
        branch_name: obj.branch_name ? obj.branch_name : null,
        bank_addr1: obj.bank_addr1 ? obj.bank_addr1 : null,
        bank_addr2: obj.bank_addr2 ? obj.bank_addr2 : null,
        bank_addr3: obj.bank_addr3 ? obj.bank_addr3 : null,
        bank_city: obj.bank_city ? obj.bank_city : null,
        bank_pin_code: obj.bank_pin_code ? obj.bank_pin_code : null,

        bg_no: obj.bg_no ? obj.bg_no : null,
        bg_date: obj.bg_date ? obj.bg_date : null,
        bg_ammount: obj.bg_ammount ? obj.bg_ammount : null,
        yard_no: obj.yard_no ? obj.yard_no : null,

        validity_date: obj.validity_date ? obj.validity_date : null,
        claim_priod: obj.claim_priod ? obj.claim_priod : null,
        check_list_reference: obj.reference_no ? obj.reference_no : null,
        check_list_date: getEpochTime(),
        bg_type: obj.bg_type ? obj.bg_type : null,
        status: obj.status,
        created_at: getEpochTime(),
        created_by: tokenData.vendor_code,

        extension_date1: obj.extension_date1 ? obj.extension_date1 : 0,
        extension_date2: obj.extension_date2 ? obj.extension_date2 : 0,
        extension_date3: obj.extension_date3 ? obj.extension_date3 : 0,
        extension_date4: obj.extension_date4 ? obj.extension_date4 : 0,
        release_date: obj.release_date ? obj.release_date : 0,
        demand_notice_date: obj.demand_notice_date ? obj.demand_notice_date : 0,
        entension_letter_date: obj.entension_letter_date
          ? obj.entension_letter_date
          : 0,
      };

      //   console.log("insertPayload", insertPayload);
      //   let dbQuery = `SELECT COUNT(purchasing_doc_no) AS po_count FROM ${SDBG_ENTRY} WHERE purchasing_doc_no = ?`;
      //   const dbResult = await query({
      //     query: dbQuery,
      //     values: [obj.purchasing_doc_no],
      //   });

      //   const whereCondition = `purchasing_doc_no = "${obj.purchasing_doc_no}"`;

      //   let { q, val } =
      //     dbResult[0].po_count > 0
      //       ? generateQuery(UPDATE, SDBG_ENTRY, insertPayload, whereCondition)
      //       : generateQuery(INSERT, SDBG_ENTRY, insertPayload);
      // console.log(insertPayload);
      // return;
      let { q, val } = generateQuery(INSERT, SDBG_ENTRY, insertPayload);

      let sdbgEntryQuery = await query({ query: q, values: val });

      if (sdbgEntryQuery.error) {
        console.log(sdbgEntryQuery.error);
        return resSend(
          res,
          false,
          201,
          "Data not insert in sdbg_entry table!!",
          sdbgEntryQuery.error,
          null
        );
      }
    }

    const Q = `SELECT file_name,file_path,action_type,vendor_code FROM ${SDBG} WHERE purchasing_doc_no = ? AND reference_no = ?`;
    let sdbgResult = await query({
      query: Q,
      values: [obj.purchasing_doc_no, obj.reference_no],
    });
    let sdbgDataResult = sdbgResult[0];
    const insertPayloadForSdbg = {
      reference_no: obj.reference_no,
      purchasing_doc_no: obj.purchasing_doc_no,
      ...sdbgDataResult,
      remarks:
        obj.status === REJECTED
          ? `This BG is ${REJECTED}`
          : `BG entry forwarded to Finance.`,
      status: obj.status,
      assigned_from: obj.status === REJECTED ? null : tokenData.vendor_code,
      assigned_to: obj.assigned_to || null,
      created_at: getEpochTime(),
      created_by_name: "Dealing officer",
      created_by_id: tokenData.vendor_code,
      updated_by: "GRSE",
    };

    let insertsdbg_q = generateQuery(INSERT, SDBG, insertPayloadForSdbg);
    let sdbgQuery = await query({
      query: insertsdbg_q["q"],
      values: insertsdbg_q["val"],
    });

    // console.log("rt67898uygy");
    // console.log(sdbgQuery);
    let msg =
      obj.status === REJECTED
        ? `This BG is Rejected.`
        : `Forworded to finance successfully!`;
    return resSend(res, true, 200, msg, sdbgQuery, null);
  } catch (error) {
    console.log(error);
    return resSend(res, false, 201, "Data not insert!!", error, null);
  }
};

const sdbgUpdateByFinance = async (req, res) => {
  const tokenData = { ...req.tokenData };
  const { ...obj } = req.body;

  try {
    if (
      !obj.purchasing_doc_no ||
      obj.purchasing_doc_no == "" ||
      !obj.remarks ||
      obj.remarks == "" ||
      !obj.status ||
      obj.status == ""
    ) {
      return resSend(
        res,
        false,
        200,
        "please send a valid payload!",
        null,
        null
      );
    }

    if (tokenData.department_id != FINANCE) {
      return resSend(res, false, 200, "please login as finance!", null, null);
    }

    if(tokenData.internal_role_id == STAFF) {
        const check_assign_to_str = `SELECT COUNT(id) AS assign_count FROM ${SDBG} WHERE reference_no = ? AND purchasing_doc_no = ? AND assigned_to = ? AND last_assigned = ?`;
        const check_assign_to_query = await query({
          query: check_assign_to_str,
          values: [obj.reference_no, obj.purchasing_doc_no, tokenData.vendor_code, 1],
        });
        let check_assign_to_result = check_assign_to_query[0].assign_count;

        console.log(check_assign_to_result);
        if(check_assign_to_result != 1) {
          return resSend(res, false, 200, "This PO is not assign to you!", null, null);
        }
    }
    const GET_LATEST_SDBG = await get_latest_sdbg_with_reference(
      obj.purchasing_doc_no,
      obj.reference_no
    );
   
    if (
      GET_LATEST_SDBG[0].status == APPROVED ||
      GET_LATEST_SDBG[0].status == REJECTED ||
      GET_LATEST_SDBG[0].status == RETURN_TO_DO
    ) {
      return resSend(
        res,
        false,
        200,
        `The BG is already ${GET_LATEST_SDBG[0].status}.`,
        null,
        null
      );
    }

    if (
      tokenData.internal_role_id == ASSIGNER &&
      GET_LATEST_SDBG[0].status == ASSIGNED &&
      obj.status == ASSIGNED &&
      GET_LATEST_SDBG[0].assigned_to == obj.assigned_to
    ) {
      return resSend(
        res,
        true,
        200,
        `This po is already ${ASSIGNED} this person.`,
        null,
        null
      );
    }

    const check_it_forward_to_finance = `SELECT COUNT(reference_no) AS ref_no FROM ${SDBG} WHERE reference_no = ? AND purchasing_doc_no = ? AND status = ? ORDER BY sdbg.created_at DESC LIMIT 1`;

    const result = await query({
      query: check_it_forward_to_finance,
      values: [obj.reference_no, obj.purchasing_doc_no, FORWARD_TO_FINANCE],
    });

    if (result[0].ref_no == 0) {
      return resSend(
        res,
        true,
        200,
        "This po is not forward to finance.Please contact with dealing officer.",
        null,
        null
      );
    }

    // const Q = `SELECT file_name,file_path,action_type,vendor_code FROM ${SDBG} WHERE reference_no = ? AND purchasing_doc_no = ? ORDER BY id DESC LIMIT 1`;
    // let sdbgResult = await query({ query: Q, values: [obj.reference_no, obj.purchasing_doc_no] });

    let sdbgDataResult = GET_LATEST_SDBG[0]; // sdbgResult[0];
    // console.log("sdbgDataResult");
    // console.log(sdbgDataResult);
    // return;
    let q = `SELECT count(actualSubmissionDate) as count FROM ${ACTUAL_SUBMISSION_DB} WHERE purchasing_doc_no = ? AND milestoneId = ?`;
    let count_res = await query({
      query: q,
      values: [obj.purchasing_doc_no, 1],
    });
    console.log(count_res);
    if (count_res[0].count > 0) {
      return resSend(
        res,
        false,
        201,
        "actualSubmissionDate already preasent in the table!!",
        null,
        null
      );
    }

    const insertPayloadForSdbg = {
      reference_no: obj.reference_no,
      purchasing_doc_no: obj.purchasing_doc_no,
      ...sdbgDataResult,
      remarks: obj.remarks,
      status: obj.status,
     // action_type: `SDBG ${obj.status}`,
      assigned_from:
        tokenData.internal_role_id == ASSIGNER ? tokenData.vendor_code : null,
      assigned_to:
        tokenData.internal_role_id == STAFF
          ? null
          : obj.assigned_to
          ? obj.assigned_to
          : null,
      last_assigned: obj.assigned_to ? 1 : 0,
      created_at: getEpochTime(),
      created_by_name: "finance dept",
      created_by_id: tokenData.vendor_code,
      updated_by: "GRSE",
    };
    // console.log(insertPayloadForSdbg);
    // return;
    let insertsdbg_q = generateQuery(INSERT, SDBG, insertPayloadForSdbg);
    console.log(insertsdbg_q);
    let sdbgQuery = await query({
      query: insertsdbg_q["q"],
      values: insertsdbg_q["val"],
    });
    console.log(sdbgQuery);

    //   UPDATE ${SDBG} SET last_assigned = 0 WHERE reference_no = ? AND AND purchasing_doc_no = ? AND assigned_to != ?;
    if (obj.assigned_to) {
      const update_assign_to = `UPDATE ${SDBG} SET last_assigned = 0 WHERE reference_no = ? AND purchasing_doc_no = ? AND assigned_to != ?`;
      let update_assign_touery = await query({
        query: update_assign_to,
        values: [obj.reference_no, obj.purchasing_doc_no, obj.assigned_to],
      });
      console.log(update_assign_touery);
    }

    console.log(sdbgDataResult);
    console.log("ACCEPTED1");
    console.log(insertPayloadForSdbg);
    //return;
    if (insertPayloadForSdbg.status == APPROVED
      && (sdbgDataResult.action_type == ACTION_SDBG
        || sdbgDataResult.action_type == ACTION_IB
        || sdbgDataResult.action_type == ACTION_DD)) {
      console.log("ACCEPTED2");
      // const actual_subminission = await setActualSubmissionDateSdbg(insertPayloadForSdbg, tokenData);
      const actual_subminission = await setActualSubmissionDate(insertPayloadForSdbg, "01", tokenData, SUBMITTED);
      try {

        const get_sdbg_entry_query = `SELECT * FROM ${SDBG_ENTRY} WHERE purchasing_doc_no = ? AND reference_no = ?`;
        let get_sdbg_entry_data = await query({
          query: get_sdbg_entry_query,
          values: [obj.purchasing_doc_no, obj.reference_no],
        });

        const get_po_date_query = `SELECT AEDAT FROM ${EKKO} WHERE EBELN = ?`;
        let get_po_date_data = await query({
          query: get_po_date_query,
          values: [obj.purchasing_doc_no],
        });
        // console.log('get_po_date_query_____________');
        // console.log(get_po_date_data);
        const utcTimeString = get_po_date_data[0].AEDAT.toString();
const date = new Date(utcTimeString);
//console.log(date);
const yyyyMMdd = date.toISOString().slice(0, 10);

let po_date = yyyyMMdd.split("-").join("");

        get_sdbg_entry_data[0].po_date = getDateString(get_po_date_data[0].AEDAT);

        await sendBgToSap(get_sdbg_entry_data[0]);
      } catch(error) {
        console.error(error);
      }
      
      if (actual_subminission === false) {
        return resSend(res, false, 200, `error into data insertion taable ${ACTUAL_SUBMISSION_DB} `, null, null);
      }

      if (actual_subminission === false) {
        return resSend(
          res,
          false,
          200,
          `error into data insertion taable ${ACTUAL_SUBMISSION_DB} `,
          null,
          null
        );
      }
    }
    console.log("ACCEPTED3");
    return resSend(
      res,
      true,
      200,
      `This po is ${obj.status}.`,
      sdbgQuery,
      null
    );
  } catch (error) {
    return resSend(res, false, 400, "somthing went wrong!", error, null);
  }
};

const assigneeList = async (req, res) => {
  console.log(req.tokenData);
  const tokenData = { ...req.tokenData };

  if (
    tokenData.department_id != FINANCE ||
    tokenData.internal_role_id != ASSIGNER
  ) {
    return resSend(
      res,
      true,
      200,
      "Please Login as Finance Assigner.",
      null,
      null
    );
  }

  const sdbgQuery = `SELECT t1.*, t2.CNAME, t3.USRID_LONG FROM emp_department_list AS t1
        LEFT JOIN 
            pa0002 AS t2 
        ON 
            t1.emp_id= t2.PERNR 
        LEFT JOIN 
            pa0105 AS t3 
        ON 
            (t2.PERNR = t3.PERNR AND t3.SUBTY = '0030') WHERE t1.dept_id = ? AND t1.internal_role_id = ?`;

  const result = await query({ query: sdbgQuery, values: [FINANCE, 2] });

  return resSend(
    res,
    true,
    200,
    "SDBG assigneeList fetch successfully!",
    result,
    null
  );
  // req.query.$tableName = NEW_SDBG;

  // req.query.$filter = `{ "purchasing_doc_no" :  ${req.query.poNo}}`;
  // try {

  //     if (!req.query.poNo) {
  //         return resSend(res, false, 400, "Please send po number", null, null);
  //     }

  //     getFilteredData(req, res);
  // } catch (err) {
  //     console.log("data not fetched", err);
  //     resSend(res, false, 500, "Internal server error", null, null);
  // }
};

const unlock = async (req, res) => {
  try {
    let payload = { ...req.body };

    if (
      !payload.purchasing_doc_no ||
      !payload.action_by_name ||
      !payload.action_by_id
    ) {
      return resSend(res, false, 400, "Please send valid payload", null, null);
    }

    const isLocked_check_q = `SELECT * FROM ${NEW_SDBG} WHERE  (purchasing_doc_no = "${payload.purchasing_doc_no}" AND status = "${ACKNOWLEDGED}") ORDER BY id DESC LIMIT 1`;
    const lockeCheck = await query({ query: isLocked_check_q, values: [] });

    if (lockeCheck && lockeCheck?.length && lockeCheck[0]["isLocked"] === 0) {
      return resSend(
        res,
        true,
        200,
        "Already unlocked or not Acknowledge yet",
        null,
        null
      );
    }

    const q = `UPDATE ${NEW_SDBG} SET 
                updated_by_name = "${payload.action_by_name}",
                updated_by_id = "${payload.action_by_id}",
                updated_at = ${getEpochTime()},
                isLocked =  0 WHERE  (purchasing_doc_no = "${payload.purchasing_doc_no
      }" AND status = "${ACKNOWLEDGED}" AND isLocked = 1)`;
    const response = await query({ query: q, values: [] });

    if (response.affectedRows) {
      resSend(res, true, 200, "Ulocked successfully", null, null);
    } else {
      resSend(res, false, 400, "No data inserted", response, null);
    }
  } catch (error) {
    console.log("sdbg unlock api");
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

async function handelEmail(payload) {
  if (payload.status === PENDING) {
    const result = await poContactDetails(payload.purchasing_doc_no);
    payload.delingOfficerName = result[0]?.dealingOfficerName;
    payload.mailSendTo = result[0]?.dealingOfficerMail;
    payload.vendor_name = result[0]?.vendor_name;
    payload.vendor_code = result[0]?.vendor_code;
    payload.sendAt = new Date(payload.created_at);
    await mailInsert(payload, SDBG_SUBMIT_BY_VENDOR, "New SDBG submitted");
  }
}

async function sendBgToSap(payload) {
  try {
    const host = `${process.env.SAP_HOST_URL}` || "http://10.181.1.31:8010";
    const postUrl = `${host}/sap/bc/zobps_sdbg_ent`;
    console.log("postUrl", postUrl);
    console.log("wdc_payload -->",);
    
    let modified = await zfi_bgm_1_Payload(payload);
    console.log('___________modified');
    console.log(modified);
    console.log('modified_________');
    const postResponse = await makeHttpRequest(postUrl, "POST", modified);
    console.log("POST Response from the server:", postResponse);
  } catch (error) {
    console.error("Error making the request:", error.message);
  }
}

module.exports = {
  submitSDBG,
  getSdbgEntry,
  unlock,
  assigneeList,
  sdbgSubmitByDealingOfficer,
  sdbgUpdateByFinance,
  checkIsDealingOfficer,
  getSDBGData,
};
