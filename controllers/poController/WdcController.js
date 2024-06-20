const { resSend } = require("../../lib/resSend");
const { query, getQuery, poolClient, poolQuery } = require("../../config/pgDbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const {
  INSERT,
  USER_TYPE_VENDOR,
  USER_TYPE_PPNC_DEPARTMENT,
} = require("../../lib/constant");
const { EKPO, WDC } = require("../../lib/tableName");
const { SUBMITTED, APPROVED, REJECTED } = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const path = require("path");

const {
  wdcPayload,
  create_reference_no,
  get_latest_activity,
} = require("../../services/po.services");

const { handleFileDeletion } = require("../../lib/deleteFile");
const {
  getFilteredData,
  updatTableData,
  insertTableData,
} = require("../genralControlles");
const { Verify } = require("crypto");
const { VENDOR } = require("../../lib/depertmentMaster");
const { makeHttpRequest } = require("../../config/sapServerConfig");
const { getUserDetailsQuery } = require("../../utils/mailFunc");
const { sendMail } = require("../../services/mail.services");
const { WDC_APPROVAL_REJECT, WDC_UPLOADING } = require("../../lib/event");
const { checkIsApprovedRejected } = require("../../services/lastassignee.servces");
require("dotenv").config();

exports.wdc = async (req, res) => {
  // return resSend(res, true, 200, "file wupleeoaded!", 'req.body', null);
  try {
    const tokenData = { ...req.tokenData };
    const { ...obj } = req.body;
    let payloadFiles = req.files;

    if (!obj.purchasing_doc_no || !obj.status) {
      // const directory = path.join(__dirname, '..', 'uploads', lastParam);
      // const isDel = handleFileDeletion(directory, req.file.filename);
      return resSend(res, false, 200, "Please send valid payload", null, null);
    }

    //  deper
    // if (
    //   tokenData.user_type != USER_TYPE_VENDOR &&
    //   tokenData.department_id != USER_TYPE_PPNC_DEPARTMENT
    // ) {
    //   return resSend(res, false, 200, "You are not authorised!", null, null);
    // }
    //console.log(obj);
    if (tokenData.user_type == USER_TYPE_VENDOR) {
      if (!obj.action_type || obj.action_type == "") {
        return resSend(res, false, 200, "action_type required!", null, null);
      }

      if (!obj.status || obj.status !== SUBMITTED) {
        return resSend(res, false, 200, "VENDOR ONLY CAN SUBMIT!", null, null);
      }
    }


    //return;

    let fileData = {};
    if (req.file) {
      fileData = {
        fileName: req.file.filename,
        filePath: req.file.path,
      };
    }
    //console.log(fileData);
    let payload = { created_by_id: tokenData.vendor_code };
    let last_data;
    if (tokenData.user_type != USER_TYPE_VENDOR) {
      console.log("@#$%^&*()");
      if (!obj || obj.reference_no == "") {
        return resSend(
          res,
          false,
          200,
          "Please send reference_no!",
          null,
          null
        );
      }

      const check = await checkIsApprovedRejected(WDC, obj.purchasing_doc_no, obj.reference_no, APPROVED, REJECTED);
      if (check > 0) {
          return resSend(res, false, 200, `You can't take any action against this reference no.`, null, null);
      }

      const line_item_array_q = `SELECT COUNT(assigned_to) AS assingn from ${WDC} WHERE purchasing_doc_no = $1 AND  assigned_to = $2`;
      let line_item_array = await getQuery({ query: line_item_array_q, values: [obj.purchasing_doc_no, tokenData.vendor_code] });
      //  console.log("#$%^&*(*&^%$#");
      //  console.log(line_item_array);
      //  console.log("$%^&*()(*&^&*");
      //  return;
      if (line_item_array[0].assingn == 0) {
        return resSend(res, false, 200, "You are not authorised person!", null, null);
      }
      last_data = await get_latest_activity(
        WDC,
        obj.purchasing_doc_no,
        obj.reference_no
      );

      if (last_data) {
        delete last_data.id;
        // console.log(last_data);
        // return;
        if (last_data.status == APPROVED || last_data.status == REJECTED) {
          return resSend(
            res,
            false,
            200,
            `this file is already ${last_data.status}!`,
            null,
            null
          );
        }

        // if (obj.status == APPROVED) {
        //   if (
        //     !obj.stage_datiels ||
        //     obj.stage_datiels == "" ||
        //     !obj.actual_payable_amount ||
        //     obj.actual_payable_amount == ""
        //   ) {
        //     return resSend(
        //       res,
        //       false,
        //       200,
        //       "Please send required fields to APPROVED this File!",
        //       null,
        //       null
        //     );
        //   }
        // }
        // console.log(obj);
        // console.log("4567876543");
        payload = wdcPayload(obj, last_data.line_item_array);
        // console.log("$%^&*(*&^%");
        // console.log(payload);
        //return;
        payload = {
          //...obj,
          ...last_data,
          ...payload,
          // ...fileData,
          updated_by: "GRSE",
          created_by_id: tokenData.vendor_code,
          created_by_name: tokenData.iss,
          created_at: getEpochTime(),
        };

      } else {
        return resSend(
          res,
          false,
          200,
          `No record found with this reference_no!`,
          fileData,
          null
        );
      }
    } else {
      //console.log(payload);
      // console.log(obj);
      // return;
      let reference_no = await create_reference_no(
        obj.action_type,
        tokenData.vendor_code
      );

      // Handle uploaded files
      obj.file_inspection_note_ref_no =
        payloadFiles["file_inspection_note_ref_no"]
          ? (invoice_filename = payloadFiles["file_inspection_note_ref_no"][0]?.filename)
          : null;

      obj.file_hinderence_report_cerified_by_berth =
        payloadFiles["file_hinderence_report_cerified_by_berth"]
          ? (invoice_filename = payloadFiles["file_hinderence_report_cerified_by_berth"][0]?.filename)
          : null;

      obj.file_attendance_report =
        payloadFiles["file_attendance_report"]
          ? (invoice_filename = payloadFiles["file_attendance_report"][0]?.filename)
          : null;

      // obj.line_item_array = '[{"claim_qty":"4","line_item_no":"15","actual_start_date":"2024-05-07T18:30:00.000Z","actual_completion_date":"2024-05-09T18:30:00.000Z","delay_in_work_execution":"1"},{"claim_qty":"6","line_item_no":"40","actual_start_date":"2024-05-20T18:30:00.000Z","actual_completion_date":"2024-05-22T18:30:00.000Z","delay_in_work_execution":"2"}]';
      let line_item_array = JSON.parse(obj.line_item_array);
      obj.total_amount = 0;

      if (obj.action_type == 'JCC' && obj.line_item_array != "") {

        const line_item_array_q = `SELECT EBELP AS line_item_no, NETPR AS po_rate from ${EKPO} WHERE EBELN = $1`;
        let get_data_result = await getQuery({ query: line_item_array_q, values: [obj.purchasing_doc_no] });

        obj.line_item_array = line_item_array.map((el2) => {
          const DOObj = get_data_result.find((elms) => elms.line_item_no == el2.line_item_no);
          let total = parseFloat(DOObj.po_rate) * parseFloat(el2.claim_qty);

          total = total.toFixed(2);
          obj.total_amount += parseFloat(total);
          return DOObj ? { ...el2, total: total } : el2;
        });

        obj.line_item_array = JSON.stringify(obj.line_item_array);

      }


      payload = {
        ...fileData,
        ...obj,
        reference_no: reference_no,
        vendor_code: tokenData.vendor_code,
        updated_by: "VENDOR",
        created_by_id: tokenData.vendor_code,
        created_by_name: tokenData.iss,
        created_at: getEpochTime(),
      };
    }


    const { q, val } = generateQuery(INSERT, WDC, payload);
    let response = await getQuery({ query: q, values: val });
    response = response[0];

    if (response) {

      handelMail(tokenData, payload)


      if (payload.status === SUBMITTED) {
        // handel email
      }
      if (payload.status === REJECTED) {
        // handel email
      }

      if (payload.status === APPROVED) {
        try {
          // handel email
          payload = { ...payload, slno: response.id };
          console.log(payload);
          console.log("payload$%^&*(");
          await submitToSapServer(payload);
        } catch (error) {
          console.warn(
            "WDC/JCC save in sap faild, please refer to wdcContorller submitToSapServer fn"
          );
        }
      }
      return resSend(
        res,
        true,
        200,
        `The file is ${payload.status}!`,
        response,
        null
      );
    } else {
      return resSend(res, false, 400, "No data inserted", response, null);
    }
  } catch (error) {
    console.log("WDC api", error);

    return resSend(res, false, 500, "internal server error", [], null);
  }
};




async function handelMail(tokenData, payload, event) {


  try {

    let emailUserDetailsQuery;
    let emailUserDetails;
    let dataObj = payload;


    if ( payload.status == SUBMITTED) {
      // QA NODAL OFFICERS
      emailUserDetailsQuery = getUserDetailsQuery('wdc_certifing_authrity',' $1');
      emailUserDetails = await getQuery({ query: emailUserDetailsQuery, values: [parseInt(payload.assigned_to)] });
      await sendMail(WDC_UPLOADING, dataObj, { users: emailUserDetails }, WDC_UPLOADING);
    }

    if ( payload.status == REJECTED) {
      // QA NODAL OFFICERS
      emailUserDetailsQuery = getUserDetailsQuery('vendor_by_po', '$1');
      emailUserDetails = await getQuery({ query: emailUserDetailsQuery, values: [payload.purchasing_doc_no] });
      await sendMail(WDC_APPROVAL_REJECT, dataObj, { users: emailUserDetails }, WDC_APPROVAL_REJECT);
    }
    if (payload.status == APPROVED) {
      // QA NODAL OFFICERS
      emailUserDetailsQuery = getUserDetailsQuery('vendor_by_po', '$1');
      emailUserDetails = await getQuery({ query: emailUserDetailsQuery, values: [payload.purchasing_doc_no] });
      await sendMail(WDC_APPROVAL_REJECT, dataObj, { users: emailUserDetails }, WDC_APPROVAL_REJECT);
    }

  } catch (error) {
    console.log("handelMail qap", error.toString(), error.stack);
  }
}


exports.list = async (req, res) => {
  // req.query.$tableName = `wdc`;
  // req.query.$filter = `{ "purchasing_doc_no" :  ${req.query.poNo}}`;
  // try {
  //   getFilteredData(req, res);
  // } catch (err) {
  //   console.log("data not fetched", err);
  // }
  //resSend(res, true, 200, "oded!", req.query.dd, null);


  // console.log(get_data_result);
  // return;

  try {

    const client = await poolClient();
    try {
      const line_item_array_q = `SELECT EBELP AS line_item_no, TXZ01 AS description, MATNR AS matarial_code, MEINS AS unit, MENGE AS target_amount from ${EKPO} WHERE EBELN = $1`;
      let line_item_array = await poolQuery({ client, query: line_item_array_q, values: [req.query.poNo] });

      //return;
      let line_item_array2 = [];
      await Promise.all(
        line_item_array.map(async (els) => {
          //console.log(els);
          const total_amount_query = `SELECT SUM(MENGE) AS total_amount from mseg WHERE EBELN = $1 AND EBELP = $2`;
          let total_amount_result = await poolQuery({ client, query: total_amount_query, values: [req.query.poNo, els.line_item_no] });
          total_amount_result = (total_amount_result[0].total_amount == null) ? 0 : total_amount_result[0].total_amount;
          console.log(total_amount_result);
          let rest_amount = parseInt(els.target_amount) - parseInt(total_amount_result);
          (rest_amount < 0) ? 0 : rest_amount;
          line_item_array2.push({ ...els, rest_amount: rest_amount });

        })

      );


      //return;
      const get_data_query = `SELECT * FROM ${WDC} WHERE purchasing_doc_no = $1`;
      let get_data_result = await poolQuery({ client, query: get_data_query, values: [req.query.poNo] });

      let modfResult = get_data_result.map((el) => {
        let line_item = JSON.parse(el.line_item_array);
        let line_item2;
        if (line_item && Array.isArray(line_item)) {
          line_item2 = line_item.map((el2) => {
            const DOObj = line_item_array2.find((elms) => elms.line_item_no == el2.line_item_no);
            return DOObj ? { ...DOObj, ...el2 } : el2;
          });
        }
        el.line_item_array = line_item2;
        return el;
      })
      modfResult = JSON.stringify(modfResult);
      resSend(res, true, 200, "WDC data fetched!", modfResult, null);
    } catch (err) {

      resSend(res, false, 500, "internal server error", err, null);
    } finally {
      client.release();
    }

  } catch (error) {

    resSend(res, false, 500, "error in db conn!", error, "");
  }

};

const getLineItemArray = async (poNo) => {
  const line_item_array_q = `SELECT EBELP AS line_item_no, TXZ01 AS description, MATNR AS matarial_code, MEINS AS unit, KTMNG AS target_amount from ${EKPO} WHERE EBELN = ?`;
  let get_data_result = await query({ query: line_item_array_q, values: [poNo] });

  const total_amount_query = `SELECT SUM(MENGE) AS total_amount from mseg WHERE EBELN = ? AND EBELP = ?`;
  let total_amount_result = await query({ query: total_amount_query, values: [req.query.po_no, req.query.line_item_no] });
  total_amount_result = (total_amount_result[0].total_amount == null) ? 0 : total_amount_result[0].total_amount;
  console.log("total_amount_result :" + total_amount_result);

  let target_amount_result = (get_data_result[0].target_amount) ? get_data_result[0].target_amount : 0;

  const rest_amount = parseInt(target_amount_result) - parseInt(total_amount_result);

  // const resData = get_data_result[0];
  //           resData.rest_amount = rest_amount;

  return { ...get_data_result[0], rest_amount: rest_amount };

}

exports.grseEmpList = async (req, res) => {
  req.query.$tableName = `pa0002`;
  req.query.$select = `PERNR as code, CNAME as name`;
  try {
    getFilteredData(req, res);
  } catch (err) {
    console.log("data not fetched", err);
  }

};

async function submitToSapServer(data) {
  try {
    const sapBaseUrl = process.env.SAP_HOST_URL || "http://10.181.1.31:8010";
    const postUrl = `${sapBaseUrl}/sap/bc/zoBPS_WDC`;
    console.log("postUrl", postUrl);
    console.log("wdc_payload -->");
    let payload = { ...data };
    // const wdc_payload = {
    //   slno: payload.slno,
    //   ebeln: payload.purchasing_doc_no,
    //   ebelp: payload.po_line_iten_no,
    //   wdc: payload.reference_no,
    // };

    let new_line_item = JSON.parse(payload.line_item_array);
    let wdc_payload;
    if (new_line_item && Array.isArray(new_line_item)) {
      wdc_payload = new_line_item.map((el2) => {
        return { slno: payload.slno, ebeln: payload.purchasing_doc_no, ebelp: el2.line_item_no, wdc: payload.reference_no };
      });
    }


    console.log("wdc_payload-----------");
    console.log(wdc_payload);

    const postResponse = await makeHttpRequest(postUrl, "POST", wdc_payload);
    console.log("POST Response from the server:", postResponse);
  } catch (error) {
    console.error("Error making the request:", error.message);
  }
}

// {
//   "purchasing_doc_no": "",
//   "remarks": "",
//   "status": "",
//   "work_done_by": "",
//   "work_title": "",
//   "job_location": "",
//   "yard_no": "",
//   "inspection_note_ref_no": "",
//   "file_inspection_note_ref_no": "file",
//   "hinderence_report_cerified_by_berth": "",
//   "file_hinderence_report_cerified_by_berth": "file",
//   "attendance_report": "",
//   "file_attendance_report": "FILE",
//   "unit": "",
//   "stage_details":"",
//   "line_item_array": [
//     {
//       "line_item_no":"",
//     "claim_qty":"",
//     "contractual_start_date":"",
//     "Contractual_completion_date":"",
//     "actual_start_date":"",
//     "actual_completion_date":"",
//     "hinderance_in_days":""
//     },
//     {
//       "line_item_no":"",
//     "claim_qty":"",
//     "contractual_start_date":"",
//     "Contractual_completion_date":"",
//     "actual_start_date":"",
//     "actual_completion_date":"",
//     "hinderance_in_days":""
//     },
//   ],
//   "action_type":"WDC"
// }

// [
//       {
//         "line_item_no":"",
//       "claim_qty":"",
//       "contractual_start_date":"",
//       "Contractual_completion_date":"",
//       "actual_start_date":"",
//       "actual_completion_date":"",
//       "hinderance_in_days":""
//       },
//       {
//         "line_item_no":"",
//       "claim_qty":"",
//       "contractual_start_date":"",
//       "Contractual_completion_date":"",
//       "actual_start_date":"",
//       "actual_completion_date":"",
//       "hinderance_in_days":""
//       },
//     ]



// {
//   "purchasing_doc_no": "",
//   "reference_no": "",
//   "status": "",
//   "line_item_array": [
//     {
//     "contractual_start_date":"",
//     "Contractual_completion_date":"",
//     "delay":""
//     },
//     {
//     "contractual_start_date":"",
//     "Contractual_completion_date":"",
//     "delay":""
//     }
//   ]
// }

///////////// JCC //////////////////
//// VENODOR SUBMIT //////////
// {
//   "purchasing_doc_no": "",
//   "remarks": "",
//   "status": "",
//   "work_done_by": "",
//   "work_title": "",
//   "job_location": "",
//   "yard_no": "",
//   "line_item_array": [
//     {
//      "line_item_no":"",
//     "claim_qty":"",
//     "actual_start_date":"",
//     "actual_completion_date":"",
//     "delay_in_work_execution":""
//     },
//     {
//      "line_item_no":"",
//     "claim_qty":"",
//     "actual_start_date":"",
//     "actual_completion_date":"",
//     "delay_in_work_execution":""
//     },
//   ],
//   "guarantee_defect_liability_start_date": 1234567890
//   "guarantee_defect_liability_end_date": 1234567891
//   "action_type":"JCC"
// }



///////////// JCC //////////////////
//// GRSE SUBMIT //////////
// {
//   "purchasing_doc_no": "",
//   "remarks": "",
//   "status": "",
//   "reference_no": ""
//   "line_item_array": [
//     {
//      "line_item_no":"",
//      "status":""
//     },
//     {
//      "line_item_no":"",
//      "status":""
//     },
//   ],
//   "total_amount_status": "APPROVED",
//   "action_type":"JCC"
// }

