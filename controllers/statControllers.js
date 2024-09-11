const { resSend } = require("../lib/resSend");
const {
  query,
  getQuery,
  poolClient,
  poolQuery,
} = require("../config/pgDbConfig");

const {
  SDBG_ENTRY,
  SDBG,
  BTN_LIST,
  AUTH,
  BTN_ASSIGN,
  BTN_MATERIAL_DO,
  QAP_SUBMISSION,
  DRAWING,
} = require("../lib/tableName");
const { checkPoType } = require("../services/lastassignee.servces");
const {
  USER_TYPE_GRSE_QAP,
  ASSIGNER,
  STAFF,
  USER_TYPE_IT,
  USER_TYPE_GRSE_FINANCE,
  USER_TYPE_GRSE_DRAWING,
} = require("../lib/constant");
const { ASSIGNED, ACCEPTED, APPROVED } = require("../lib/status");

exports.statsForBG = async (req, res) => {
  try {
    const client = await poolClient();
    try {
      const tokenData = { ...req.tokenData };
      console.log(tokenData);
      if (tokenData) {
        const Q = `
        SELECT * 
        FROM auth 
        WHERE vendor_code = $1 
        
    `;

        const result = await poolQuery({
          client,
          query: Q,
          values: [tokenData.vendor_code],
        });
        // For grse_FINANCE_ASSIGNER
        if (
          (tokenData.internal_role_id === ASSIGNER &&
            tokenData.department_id === USER_TYPE_GRSE_FINANCE) ||
          tokenData.department_id === USER_TYPE_IT
        ) {
          const Q = `SELECT se.* FROM ${SDBG_ENTRY} se ORDER BY se.created_at DESC`;
          const result = await poolQuery({
            client,
            query: Q,
            values: [],
          });

          const data = await Promise.all(
            result.map(async (el2) => {
              const po_type = await checkPoType(el2.purchasing_doc_no);
              if (po_type) {
                el2.po_type = po_type;
              }
              return el2;
            })
          );
          return resSend(
            res,
            true,
            200,
            "Data fetched successfully.",
            data,
            null
          );
        }
        // For grse_FINANCE_STAFF
        if (
          result[0].internal_role_id === STAFF &&
          result[0].department_id === USER_TYPE_GRSE_FINANCE
        ) {
          const Q = ` 
          SELECT se.*
          FROM ${SDBG_ENTRY} se
          JOIN ${SDBG} s ON se.purchasing_doc_no = s.purchasing_doc_no
          WHERE s.assigned_to = $1
          ORDER BY se.created_at DESC
      `;

          const result = await poolQuery({
            client,
            query: Q,
            values: [tokenData.vendor_code],
          });

          const data = await Promise.all(
            result.map(async (el2) => {
              const po_type = await checkPoType(el2.purchasing_doc_no);
              if (po_type) {
                el2.po_type = po_type;
              }
              return el2;
            })
          );

          return resSend(
            res,
            true,
            200,
            "Data fetched successfully.",
            data,
            null
          );
        }
        //For Others
        return resSend(
          res,
          false,
          200,
          "You are not authorized to view the information",
          null,
          null
        );
      } else {
        return resSend(res, false, 400, "Missing token data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return resSend(res, false, 400, "Data not fetched!", null, error);
    }
  } catch (error) {
    console.error("Error in DB connection:", error);
    resSend(res, false, 500, "Error in DB connection!", null, error);
  }
};

exports.statsForBTN = async (req, res) => {
  try {
    const client = await poolClient();
    try {
      const tokenData = { ...req.tokenData };
      if (tokenData) {
        //const QbtnNo = `SELECT MAX(created_at) as time, btn_num FROM ${BTN_LIST} GROUP BY btn_num,purchasing_doc_no`;
        const QbtnNo = `SELECT DISTINCT ON (btn_num)
	created_at as time
  FROM btn_list
  ORDER BY btn_num, created_at DESC`;

        let btn_no_list = await poolQuery({
          client,
          query: QbtnNo,
          values: [],
        });
        //
        let str = "";

        if (btn_no_list.length) {
          btn_no_list.forEach((item) => {
            const no = item.time;
            str = str.concat("'").concat(`${no}`).concat("'").concat(",");
          });
        }
        str = str.slice(0, -1);

        // For grse_FINANCE_ASSIGNER
        if (
          (tokenData.internal_role_id === ASSIGNER &&
            tokenData.department_id === USER_TYPE_GRSE_FINANCE) ||
          tokenData.department_id === USER_TYPE_IT
        ) {
          // const Q = `SELECT * FROM ${BTN_LIST} WHERE created_at IN(${str}) ORDER BY created_at DESC`;

          const Q = `SELECT t1.btn_num,t1.purchasing_doc_no, t1.status, t1.btn_type, t2.yard, t2.invoice_no,t2.invoice_filename, t3.lifnr as vendor_code,t4.name1 as vendor_name FROM btn_list AS t1
                LEFT JOIN
                    btn AS t2
                ON
                    t1.btn_num = t2.btn_num

                              LEFT JOIN
                    ekko AS t3
                ON
                    t1.purchasing_doc_no = t3.ebeln

                               LEFT JOIN
                    lfa1 AS t4
                ON
                    t3.lifnr = t4.lifnr

          WHERE t1.created_at IN(${str}) ORDER BY t1.created_at DESC`;

          const result = await poolQuery({
            client,
            query: Q,
            values: [],
          });
          console.log(result);
          let requiredRes = {
            btn_num: "",
            purchasing_doc_no: "",
            net_claim_amount: "",
            net_payable_amount: "",
            vendor_code: "",
            created_at: "",
            status: "",
            btn_type: "",
          };
          return resSend(
            res,
            true,
            200,
            "Data fetched successfully.",
            result,
            null
          );
        }
        // For grse_FINANCE_STAFF
        if (
          tokenData.internal_role_id === STAFF &&
          tokenData.department_id === USER_TYPE_GRSE_FINANCE
        ) {
          // const query = `SELECT * FROM ${BTN_LIST} bl
          //                JOIN ${BTN_MATERIAL_DO} bdo ON bl.btn_num = bdo.btn_num
          //                JOIN ${BTN_ASSIGN} ba ON bdo.btn_num = ba.btn_num WHERE
          //                (ba.assign_to = $1 AND ba.last_assign = 'true') OR
          //                (ba.assign_to_fi = $1 AND ba.last_assign_fi = 'false')
          //                AND bl.created_at IN(${str})
          //                ORDER BY bl.created_at DESC`;

          const query = `SELECT t1.btn_num,t1.purchasing_doc_no, t1.status, t1.btn_type, t2.yard, t2.invoice_no,t2.invoice_filename, t3.lifnr as vendor_code,t4.name1 as vendor_name FROM btn_list AS t1
                LEFT JOIN
                    btn AS t2
                ON
                    t1.btn_num = t2.btn_num

                              LEFT JOIN
                    ekko AS t3
                ON
                    t1.purchasing_doc_no = t3.ebeln

                               LEFT JOIN
                    lfa1 AS t4
                ON
                    t3.lifnr = t4.lifnr

                                LEFT JOIN
                    btn_assign AS t5
                ON
                    t1.btn_num = t5.btn_num

          WHERE 
          (t5.assign_to = $1 AND t5.last_assign = 'true') OR
                         (t5.assign_to_fi = $1 AND t5.last_assign_fi = 'false') 
                         AND
          
          
          t1.created_at IN(${str}) ORDER BY t1.created_at DESC`;

          const result = await poolQuery({
            client,
            query: query,
            values: [tokenData.vendor_code],
          });
          //console.log(result);
          return resSend(
            res,
            true,
            200,
            "Data fetched successfully.",
            result,
            null
          );
        }
        //For Others
        return resSend(
          res,
          false,
          200,
          "You are not authorized to view the information",
          null,
          null
        );
      } else {
        return resSend(res, false, 400, "Missing token data.");
      }
    } catch (error) {
      console.error("Error in token data processing:", error);
      return resSend(
        res,
        false,
        500,
        "Error in server processing",
        null,
        error
      );
    }
  } catch (error) {
    resSend(res, false, 500, "error in db conn!", error, "");
  }
};

exports.statsForQA = async (req, res) => {
  try {
    const client = await poolClient();
    try {
      //req.query.reference_no
      const tokenData = { ...req.tokenData };

      // check user from QA
      if (
        tokenData.department_id != USER_TYPE_GRSE_QAP &&
        tokenData.department_id != USER_TYPE_IT
      ) {
        return resSend(
          res,
          false,
          200,
          "You are not authorized to view the information",
          null,
          null
        );
      }

      let str = "";
      let q;
      let result;
      // For grse_QA_ASSIGNER
      if (tokenData.internal_role_id === ASSIGNER) {
        q = `SELECT DISTINCT ON (t1.reference_no)
            t1.reference_no,
            t1.purchasing_doc_no,
            t1.vendor_code,
            t1.status,
            t1.created_at,
            t2.name1 as vendor_name
            FROM qap_submission AS t1
                          LEFT JOIN
                              lfa1 AS t2
                          ON
                              t1.vendor_code = t2.lifnr
                        
          WHERE t1.reference_no != 'QAP ASSIGNED'
            ORDER BY  t1.reference_no,t1.created_at DESC`;

        result = await poolQuery({
          client,
          query: q,
          values: [],
        });

        let strArr = [];
        if (result.length) {
          result.forEach((item) => {
            strArr.push(item.purchasing_doc_no);
          });
        }

        function removeDuplicates(strArr) {
          return [...new Set(strArr)];
        }
        strArr = removeDuplicates(strArr);
        console.log("************");

        if (strArr.length) {
          strArr.forEach((item) => {
            const no = item.purchasing_doc_no;
            str = str.concat("'").concat(`${item}`).concat("'").concat(",");
          });
        }

        str = str.slice(0, -1);
      }

      // For grse_QA_STAFF
      if (tokenData.internal_role_id === STAFF) {
        const getStrArrQ = `SELECT DISTINCT ON (purchasing_doc_no) purchasing_doc_no,assigned_to 
              FROM qap_submission WHERE assigned_to = $1`;

        const getStrArrData = await poolQuery({
          client,
          query: getStrArrQ,
          values: [tokenData.vendor_code],
        });
        console.log(getStrArrData);
        // return;
        if (getStrArrData.length) {
          getStrArrData.forEach((item) => {
            const no = item.purchasing_doc_no;
            str = str.concat("'").concat(`${no}`).concat("'").concat(",");
          });
        }

        str = str.slice(0, -1);

        let q = `SELECT DISTINCT ON (t1.reference_no)
            t1.reference_no,
            t1.purchasing_doc_no,
            t1.vendor_code,
            t1.status,
            t1.created_at,
            t2.name1 as vendor_name
            FROM qap_submission AS t1
                          LEFT JOIN
                              lfa1 AS t2
                          ON
                              t1.vendor_code = t2.lifnr
                        
          WHERE t1.purchasing_doc_no IN (${str}) AND t1.reference_no != 'QAP ASSIGNED'
            ORDER BY  t1.reference_no,t1.created_at DESC`;

        result = await poolQuery({
          client,
          query: q,
          values: [],
        });
      }
      // console.log(str);
      // console.log(result);
      // return;
      const getAsfromAstoQ = `SELECT DISTINCT ON (purchasing_doc_no) purchasing_doc_no,assigned_from,assigned_to 
              FROM qap_submission WHERE purchasing_doc_no IN(${str})
                AND ${ASSIGNED} = 1`;

      const getAsfromAstoData = await poolQuery({
        client,
        query: getAsfromAstoQ,
        values: [],
      });

      const getStatusAccepctedQ = `SELECT DISTINCT ON (status) purchasing_doc_no,created_at 
        FROM qap_submission WHERE purchasing_doc_no IN(${str})
          AND status = $1`;

      const getStatusAccepctedData = await poolQuery({
        client,
        query: getStatusAccepctedQ,
        values: [ACCEPTED],
      });

      let results = [];
      if (result && Array.isArray(result)) {
        results = result.map((el2) => {
          let staAcc = getStatusAccepctedData.find(
            (ele) => ele.purchasing_doc_no == el2.purchasing_doc_no
          );
          staAcc
            ? (el2.accepted_on = staAcc.created_at)
            : (el2.accepted_on = "N/A");

          let DOObj = getAsfromAstoData.find(
            (elms) => elms.purchasing_doc_no == el2.purchasing_doc_no
          );
          if (DOObj) {
            return { ...DOObj, ...el2 };
          } else {
            return {
              ...el2,
              assigned_from: "N/A",
              assigned_to: "N/A",
            };
          }
        });
      }

      return resSend(
        res,
        true,
        200,
        "Data fetched successfully.",
        results,
        null
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      return resSend(res, false, 400, "Data not fetched!", null, error);
    }
  } catch (error) {
    console.error("Error in DB connection:", error);
    resSend(res, false, 500, "Error in DB connection!", null, error);
  }
};

exports.stats = async (req, res) => {
  // console.log(req.query.type);
  // return;
  try {
    const client = await poolClient();
    try {
      const tokenData = { ...req.tokenData };

      // check type
      const type = req.query.type;

      if (!type || (type != QAP_SUBMISSION && type != DRAWING)) {
        return resSend(res, false, 200, "please send a type.", null, null);
      }

      const TABLE = type;
      const ENTITY = type === QAP_SUBMISSION ? "QAP" : "DRAWING";
      const STATUS = type === QAP_SUBMISSION ? ACCEPTED : APPROVED;
      const USER_DEPT_ID =
        type === QAP_SUBMISSION ? USER_TYPE_GRSE_QAP : USER_TYPE_GRSE_DRAWING;
      const ASSIGNED_FROM =
        type === QAP_SUBMISSION ? "assigned_from" : "assign_from";
      const ASSIGNED_TO = type === QAP_SUBMISSION ? "assigned_to" : "assign_to";
      const ASSIGNED = type === QAP_SUBMISSION ? "is_assign" : "last_assigned";

      if (
        tokenData.department_id != USER_DEPT_ID &&
        tokenData.department_id != USER_TYPE_IT
      ) {
        return resSend(
          res,
          false,
          200,
          "You are not authorized to view the information",
          null,
          null
        );
      }

      let str = "";
      let q;
      let result;
      let refNum = "";

      // For grse_ASSIGNER
      if (tokenData.internal_role_id === ASSIGNER) {
        q = `SELECT DISTINCT ON (t1.reference_no)
            t1.reference_no,
            t1.purchasing_doc_no,
            t1.vendor_code,
            t1.status,
            t1.created_at,
            t2.name1 as vendor_name
            FROM ${TABLE} AS t1
                          LEFT JOIN
                              lfa1 AS t2
                          ON
                              t1.vendor_code = t2.lifnr
                        
          WHERE t1.reference_no != '${ENTITY} ASSIGNED'
            ORDER BY  t1.reference_no,t1.created_at DESC`;

        result = await poolQuery({
          client,
          query: q,
          values: [],
        });

        let strArr = [];
        if (result.length) {
          result.forEach((item) => {
            strArr.push(item.purchasing_doc_no);
          });
        }
        let refNumArr = [];
        if (result.length) {
          result.forEach((item) => {
            refNumArr.push(item.reference_no);
          });
        }

        function removeDuplicates(strArr) {
          return [...new Set(strArr)];
        }
        strArr = removeDuplicates(strArr);
        refNumArr = removeDuplicates(refNumArr);
        console.log("************");

        if (strArr.length) {
          strArr.forEach((item) => {
            const no = item.purchasing_doc_no;
            str = str.concat("'").concat(`${item}`).concat("'").concat(",");
          });
        }
        str = str.slice(0, -1);
        console.log(refNumArr);
        if (refNumArr.length) {
          refNumArr.forEach((item) => {
            console.log(item);
            refNum = refNum
              .concat("'")
              .concat(`${item}`)
              .concat("'")
              .concat(",");
          });
        }
        refNum = refNum.slice(0, -1);
      }

      // For grse_QA_STAFF
      if (tokenData.internal_role_id === STAFF) {
        const getStrArrQ = `SELECT DISTINCT ON (purchasing_doc_no) purchasing_doc_no,assigned_to 
              FROM ${TABLE} WHERE assigned_to = $1`;

        const getStrArrData = await poolQuery({
          client,
          query: getStrArrQ,
          values: [tokenData.vendor_code],
        });
        console.log(getStrArrData);
        // return;
        if (getStrArrData.length) {
          getStrArrData.forEach((item) => {
            const no = item.purchasing_doc_no;
            str = str.concat("'").concat(`${no}`).concat("'").concat(",");
            const refNo = item.reference_no;
            refNum = refNum
              .concat("'")
              .concat(`${refNo}`)
              .concat("'")
              .concat(",");
          });
        }
        str = str.slice(0, -1);

        refNum = refNum.slice(0, -1);

        let q = `SELECT DISTINCT ON (t1.reference_no)
            t1.reference_no,
            t1.purchasing_doc_no,
            t1.vendor_code,
            t1.status,
            t1.created_at,
            t2.name1 as vendor_name
            FROM ${TABLE} AS t1
                          LEFT JOIN
                              lfa1 AS t2
                          ON
                              t1.vendor_code = t2.lifnr
                        
          WHERE t1.purchasing_doc_no IN (${str}) AND t1.reference_no != '${ENTITY} ASSIGNED'
            ORDER BY  t1.reference_no,t1.created_at DESC`;

        result = await poolQuery({
          client,
          query: q,
          values: [],
        });
      }

      const getAsfromAstoQ = `SELECT DISTINCT ON (purchasing_doc_no) purchasing_doc_no,${ASSIGNED_FROM},${ASSIGNED_TO} 
              FROM ${TABLE} WHERE purchasing_doc_no IN(${str})
          AND status = $1`;

      const getAsfromAstoData = await poolQuery({
        client,
        query: getAsfromAstoQ,
        values: [STATUS],
      });

      const getStatusAccepctedQ = `SELECT 
        MAX(created_at) AS created_at, reference_no 
        FROM ${TABLE} WHERE reference_no IN (${refNum})
          AND status = $1  GROUP BY reference_no`;

      const getStatusAccepctedData = await poolQuery({
        client,
        query: getStatusAccepctedQ,
        values: [STATUS],
      });
      // console.log(getStatusAccepctedData);
      // return;
      // get created_at difference

      const created_at_difference_query = `SELECT 
       MIN(created_at) AS created_at,
        (MAX(created_at) - MIN(created_at)) AS created_at_difference,
          reference_no
        FROM 
             ${TABLE}
        WHERE 
            reference_no IN (${refNum}) GROUP BY reference_no`;

      const created_at_difference_data = await poolQuery({
        client,
        query: created_at_difference_query,
        values: [],
      });
      // console.log("^^^^^^^^^^^");
      // console.log(created_at_difference_data);
      // console.log("^^$$^^^^^^^^^");
      // return;
      let results = [];
      if (result && Array.isArray(result)) {
        results = result.map((el2) => {
          let staAcc = getStatusAccepctedData.find(
            (ele) => ele.reference_no == el2.reference_no
          );
          staAcc
            ? (el2.accepted_on = staAcc.created_at)
            : (el2.accepted_on = "N/A");

          let DOObj = getAsfromAstoData.find(
            (elms) => elms.purchasing_doc_no == el2.purchasing_doc_no
          );
          if (DOObj) {
            DOObj = { ...DOObj, ...el2 };
          } else {
            DOObj = {
              ...el2,
              assigned_from: "N/A",
              assigned_to: "N/A",
            };
          }

          let timeTaken = created_at_difference_data.find(
            (elms) => elms.reference_no == el2.reference_no
          );
          console.log("^^^^^^^^^^^");
          console.log(timeTaken);
          if (timeTaken) {
            const millisecondsInOneDay = 1000 * 60 * 60 * 24;
            const time_taken = Math.floor(
              parseInt(timeTaken.created_at_difference) / millisecondsInOneDay
            );

            console.log(time_taken);
            return {
              ...DOObj,
              time_taken: time_taken,
              created_at: timeTaken.created_at,
            };
          } else {
            return {
              ...DOObj,
              time_taken: "N/A",
            };
          }
        });
      }

      return resSend(
        res,
        true,
        200,
        "Data fetched successfully.",
        results,
        null
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      return resSend(res, false, 400, "Data not fetched!", null, error);
    }
  } catch (error) {
    console.error("Error in DB connection:", error);
    resSend(res, false, 500, "Error in DB connection!", null, error);
  }
};
