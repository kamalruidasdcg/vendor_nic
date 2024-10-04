const { resSend } = require("../../lib/resSend");
const {
  query,
  getQuery,
  poolClient,
  poolQuery,
} = require("../../config/pgDbConfig");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const {
  INSERT,
  UPDATE,
  USER_TYPE_PPNC_DEPARTMENT,
} = require("../../lib/constant");
const { DEMAND_MANAGEMENT, EKPO, EKKO, WDC } = require("../../lib/tableName");
const {
  PENDING,
  REJECTED,
  ACKNOWLEDGED,
  APPROVED,
  RE_SUBMITTED,
  CREATED,
  SUBMITTED,
  STATUS_RECEIVED,
} = require("../../lib/status");
const fileDetails = require("../../lib/filePath");
const path = require("path");
const {
  create_reference_no,
  get_latest_activity,
} = require("../../services/po.services");
const { handleFileDeletion } = require("../../lib/deleteFile");
const {
  getFilteredData,
  updatTableData,
  insertTableData,
} = require("../genralControlles");
const { Console } = require("console");
const { DEMAND_UPLOAD_BY_BEARTH } = require("../../lib/event");
const { sendMail } = require("../../services/mail.services");
const { getUserDetailsQuery } = require("../../utils/mailFunc");
const { wdc } = require("./WdcController");

const insert = async (req, res) => {
  // return resSend(res, true, 200, "inserted!", req.body, null);

  try {
    const tokenData = { ...req.tokenData };
    const obj = { ...req.body };

    if (!obj.purchasing_doc_no || !obj.status) {
      //     // const directory = path.join(__dirname, '..', 'uploads', lastParam);
      //     // const isDel = handleFileDeletion(directory, req.file.filename);
      return resSend(res, false, 200, "Please send valid payload", null, null);
    }

    if (tokenData.user_type == 1) {
      return resSend(
        res,
        false,
        200,
        "Please login as GRSE users!",
        null,
        null
      );
    }

    const checkDo = await checkIsDealingOfficer(
      obj.purchasing_doc_no,
      tokenData.vendor_code
    );
    if (checkDo == 1) {
      return resSend(res, false, 200, "Do can not raise demand!", null, null);
    }

    if (obj.status != SUBMITTED && obj.status != STATUS_RECEIVED) {
      return resSend(
        res,
        false,
        200,
        "Please send a valid action type!",
        null,
        null
      );
    }

    let payload;

    if (obj.status == SUBMITTED) {
      if (!obj.action_type || obj.action_type == "") {
        return resSend(
          res,
          false,
          200,
          "please send a valid action_type!",
          null,
          null
        );
      }
      // if(!obj.request_amount || obj.request_amount < 0) {
      //     return resSend(res, false, 200, "please send a valid request_amount!", null, null);
      // }
      let reference_no = await create_reference_no("DM", tokenData.vendor_code);

      // obj.request_amount = 0;
      // obj.recived_quantity = 0;

      payload = {
        ...obj,
        reference_no: reference_no,
        demand: JSON.stringify(obj.demand),
        created_at: getEpochTime(),
        created_by_id: tokenData.vendor_code,
        remarks: obj.remarks,
      };
    } else if (obj.status == STATUS_RECEIVED) {
      if (!obj.reference_no || obj.reference_no == "") {
        return resSend(
          res,
          false,
          200,
          "please send reference_no!",
          null,
          null
        );
      }
      // if(!obj.recived_quantity || obj.recived_quantity < 0) {
      //     return resSend(res, false, 200, "please send a valid recived_quantity!", null, null);
      // }

      let last_data = await get_latest_activity(
        DEMAND_MANAGEMENT,
        obj.purchasing_doc_no,
        obj.reference_no
      );
      if (last_data) {
        delete last_data.id;
        last_data.demand = JSON.stringify(obj.demand);
        payload = {
          ...last_data,
          status: obj.status,
          remarks: obj.remarks,
          created_at: getEpochTime(),
          created_by_id: tokenData.vendor_code,
        };
      } else {
        return resSend(
          res,
          false,
          200,
          `No record found with this reference_no!`,
          null,
          null
        );
      }
    }

    // return;
    //   let { q, val } =
    //   obj.status == STATUS_RECEIVED
    //         ? generateQuery(UPDATE, DEMAND_MANAGEMENT, payload, whereCondition)
    //         : generateQuery(INSERT, DEMAND_MANAGEMENT, payload);

    //         const response = await query({ query: q, values: val });
    //     // console.log("payload_00________________");
    //     // console.log(q);
    //     // return;

    let { q, val } = generateQuery(INSERT, DEMAND_MANAGEMENT, payload);
    const response = await query({ query: q, values: val });
    if (response) {
      if (obj.status == SUBMITTED) {
        handleEmail(payload);
      }

      return resSend(
        res,
        true,
        200,
        `DEMAND MANAGEMENT ${obj.status} successfully !`,
        response,
        null
      );
    } else {
      return resSend(res, false, 400, "something went wrong!", response, null);
    }

    // }
    // else {
    //     resSend(res, false, 400, "Please upload a valid File", fileData, null);
    // }
  } catch (error) {
    console.error(error.message);

    return resSend(res, false, 500, "internal server error", [], null);
  }
};

const checkIsDealingOfficer = async (purchasing_doc_no, vendor_code) => {
  const getQuery = `SELECT COUNT(EBELN) AS man_no FROM ${EKKO} WHERE EBELN = $1 AND ERNAM = $2`;
  const result = await query({
    query: getQuery,
    values: [purchasing_doc_no, vendor_code],
  });
  return result.rows[0].man_no;
};

const list = async (req, res) => {
  try {
    if (!req.query.poNo) {
      return resSend(res, false, 400, "Please send poNo", null, "");
    }
    //req.query.poNo
    // const insp_call_query =`WITH available_amount AS (
    //     SELECT EBELN, EBELP, SUM(MENGE) AS total_amount
    //     FROM mseg
    //     GROUP BY EBELP
    // ),
    // request_amount AS (
    //     SELECT purchasing_doc_no, line_item_no, SUM(request_amount) AS total_request_amount
    //     FROM demande_management
    //     GROUP BY line_item_no
    // )
    // SELECT ua.purchasing_doc_no, ua.line_item_no, aa.total_amount, ua.total_request_amount,tq.KTMNG AS total_target_amount
    // FROM available_amount AS aa
    // LEFT JOIN ekpo AS tq ON (aa.EBELN = tq.EBELN and aa.EBELP = tq.EBELP)
    // JOIN request_amount AS ua ON (aa.EBELN = ua.purchasing_doc_no and aa.EBELP = ua.line_item_no) WHERE aa.EBELN = ?
    // GROUP BY aa.EBELP;`;

    const demande_query = `SELECT * FROM demande_management WHERE purchasing_doc_no = $1`;
    const result = await query({
      query: demande_query,
      values: [req.query.poNo],
    });

    if (result.rows) {
      return resSend(
        res,
        true,
        200,
        "Demande Management Data fetched succesfully!",
        result.rows,
        null
      );
    } else {
      return resSend(res, false, 200, "Data not fetched!", null, null);
    }
  } catch (err) {
    console.error(err.message);
    return resSend(res, false, 500, "Internal server error", null, "");
  }
  //  return resSend(res, true, 200, "oded!", `list`, null);
};

const getRestAmount = async (req, res) => {
  try {
    const client = await poolClient();
    try {
      const get_data_query = `SELECT TXZ01 AS description, MATNR AS matarial_code, MEINS AS unit, MENGE AS target_amount, NETPR AS po_rate from ${EKPO} WHERE EBELN = $1 AND EBELP = $2`;
      let get_data_result = await poolQuery({
        client,
        query: get_data_query,
        values: [req.query.po_no, req.query.line_item_no],
      });

      const total_amount_query = `SELECT SUM(MENGE) AS total_amount from mseg WHERE EBELN = $1 AND EBELP = $2`;
      let total_amount_result = await poolQuery({
        client,
        query: total_amount_query,
        values: [req.query.po_no, req.query.line_item_no],
      });
      total_amount_result =
        total_amount_result[0].total_amount == null
          ? 0
          : total_amount_result[0].total_amount;

      // const target_amount_query = `SELECT KTMNG AS target_amount from ekpo WHERE EBELN = ? AND EBELP = ?`;
      // let target_amount_result = await query({ query: target_amount_query, values: [req.query.po_no, req.query.line_item_no] });
      // target_amount_result = (target_amount_result[0].target_amount == null) ? 0 : target_amount_result[0].target_amount;
      // console.log("target_amount :" + target_amount_result);

      let target_amount_result = get_data_result[0].target_amount
        ? get_data_result[0].target_amount
        : 0;
      console.log("target_amount_result", target_amount_result);
      // const total_requested_amount_query = `SELECT SUM(request_amount) AS total_requested_amount from demande_management WHERE purchasing_doc_no = '${req.query.po_no}' AND line_item_no = ${req.query.line_item_no} AND status = '${SUBMITTED}'`;
      // let total_requested_amount_result = await query({ query: total_requested_amount_query, values: [] });
      // total_requested_amount_result = (total_requested_amount_result[0].total_requested_amount == null) ? 0 : total_requested_amount_result[0].total_requested_amount;
      // console.log("total_requested_amount_result :" + total_requested_amount_result);

      // const total_recived_amount_from_dm_table_query = `SELECT SUM(recived_quantity) AS total_recived_amount_from_dm_table from demande_management WHERE purchasing_doc_no = ? AND line_item_no = ? AND status = ?  `;
      // let total_recived_amount_from_dm_table_result = await query({ query: total_recived_amount_from_dm_table_query, values: [req.query.po_no, req.query.line_item_no, STATUS_RECEIVED] });
      // total_recived_amount_from_dm_table_result = (total_recived_amount_from_dm_table_result[0].total_recived_amount_from_dm_table == null) ? 0 : total_recived_amount_from_dm_table_result[0].total_recived_amount_from_dm_table;
      // console.log("total_recived_amount_from_dm_table_result :" + total_recived_amount_from_dm_table_result);

      // const total_recived_amount_from_dm_table_query = `SELECT demand from demande_management WHERE purchasing_doc_no = ? AND status = ?  `;
      // let total_recived_amount_from_dm_table_result = await query({ query: total_recived_amount_from_dm_table_query, values: [req.query.po_no, STATUS_RECEIVED] });
      // console.log(total_recived_amount_from_dm_table_result);
      // let recived_amount_from_dm_table = 0;
      // total_recived_amount_from_dm_table_result.map( (item) => {
      //     let datas = JSON.parse(item.demand);
      //     const find_line_item_no = datas.find(({ line_item_no }) => line_item_no == req.query.line_item_no);
      //     if(find_line_item_no) {
      //         console.log(find_line_item_no.recived_quantity);
      //         recived_amount_from_dm_table += parseInt(find_line_item_no.recived_quantity);
      //     }
      // });

      target_amount_result = parseFloat(target_amount_result).toFixed(3);
      total_amount_result = parseFloat(total_amount_result).toFixed(3);

      //const rest_amount = parseInt(target_amount_result) - (parseInt(total_amount_result) + parseInt(recived_amount_from_dm_table));
      let rest_amount = target_amount_result - total_amount_result;
      rest_amount = rest_amount.toFixed(3);

      // if (rest_amount) {
      const resData = get_data_result[0];
      resData.rest_amount = rest_amount;

      let rest_amount_wdc = parseFloat(0).toFixed(3);

      const wdc_claim_amount_query = `SELECT line_item_array from ${WDC} WHERE purchasing_doc_no = $1 AND status = $2`;
      let wdc_claim_amount_result = await poolQuery({
        client,
        query: wdc_claim_amount_query,
        values: [req.query.po_no, APPROVED],
      });

      if (
        wdc_claim_amount_result.length &&
        wdc_claim_amount_result.length === 0
      ) {
        rest_amount_wdc = target_amount_result;
      } else {
        // console.log(1111);
        // console.log(wdc_claim_amount_result);
        // console.log("find_line_item_no", find_line_item_no);
        let strArr = [];
        wdc_claim_amount_result.map((item) => {
          let datas = JSON.parse(item.line_item_array);
          if (datas) {
            let find_line_item_no = datas.find(
              ({ line_item_no }) => line_item_no == req.query.line_item_no
            );
            if (find_line_item_no.claim_qty) {
              strArr.push(find_line_item_no.claim_qty);
            }
          }
        });
        console.log(strArr);
        let sum = strArr.reduce(
          (accumulator, currentValue) => accumulator + parseFloat(currentValue),
          0
        );
        // console.log("target_amount_result--" + target_amount_result);
        console.log("sum--" + sum);
        rest_amount_wdc = target_amount_result - sum;
        //console.log(rest_amount_wdc);
      }
      if (rest_amount_wdc < 0) {
        rest_amount_wdc = 0;
      }
      resData.rest_amount_wdc = parseFloat(rest_amount_wdc).toFixed(3);

      resSend(
        res,
        true,
        200,
        "Rest Amount fetched succesfully!",
        resData,
        null
      );
      // } else {
      //     return resSend(res, false, 200, "something went wrong!", null, null);
      // }
    } catch (err) {
      console.error(err.message);
      resSend(res, false, 500, "Internal server error", null, "");
    } finally {
      client.release();
    }
  } catch (error) {
    console.error(err.message);
    //return resSend(res, false, 500, "error in db conn!", error, "");
  }
};

// async function handleEmail() {
//     // Maill trigger to QA, user dept and dealing officer upon uploading of each inspection call letters.
// }

async function handleEmail(data) {
  // Maill trigger to VENDOR.

  try {
    console.log("data", data);

    const vendorDetalisQ = getUserDetailsQuery("vendor_by_po", "$1");
    const vendorDetails = await getQuery({
      query: vendorDetalisQ,
      values: [data.purchasing_doc_no],
    });
    const dataObj = { ...data, vendor_name: vendorDetails[0]?.u_name };
    await sendMail(
      DEMAND_UPLOAD_BY_BEARTH,
      dataObj,
      { users: vendorDetails },
      DEMAND_UPLOAD_BY_BEARTH
    );
  } catch (error) {
    console.log("handleEmail", error.toString(), error.stack);
  }
}

module.exports = { insert, list, getRestAmount };
