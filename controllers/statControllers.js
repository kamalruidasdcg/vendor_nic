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
} = require("../lib/tableName");
const { checkPoType } = require("../services/lastassignee.servces");
const { USER_TYPE_GRSE_QAP, ASSIGNER, STAFF } = require("../lib/constant");
const { ASSIGNED } = require("../lib/status");

exports.statsForBG = async (req, res) => {
  try {
    const client = await poolClient();
    try {
      const { tokenData } = req;

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
          result[0].internal_role_id === 1 &&
          result[0].department_id === 15
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
          result[0].internal_role_id === 2 &&
          result[0].department_id === 15
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
      const tokenData = req.tokenData;
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
          tokenData.internal_role_id === 1 &&
          tokenData.department_id === 15
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
          tokenData.internal_role_id === 2 &&
          tokenData.department_id === 15
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
      const tokenData = { ...req.tokenData };

      const { ...obj } = req.body;

      let q;
      // For grse_QA_ASSIGNER
      if (
        tokenData.internal_role_id === ASSIGNER &&
        tokenData.department_id === USER_TYPE_GRSE_QAP
      ) {
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
      }
      // For grse_QA_STAFF
      if (
        tokenData.internal_role_id === STAFF &&
        tokenData.department_id === USER_TYPE_GRSE_QAP
      ) {
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
      }
      if (q && q != "") {
        const result = await poolQuery({
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
        console.log(strArr);
        //return;
        let str = "";

        if (strArr.length) {
          strArr.forEach((item) => {
            const no = item.purchasing_doc_no;
            str = str.concat("'").concat(`${item}`).concat("'").concat(",");
          });
        }

        str = str.slice(0, -1);
        console.log("************");
        console.log(str);

        const getAsfromAstoQ = `SELECT DISTINCT ON (purchasing_doc_no) purchasing_doc_no,assigned_from,assigned_to 
              FROM qap_submission WHERE purchasing_doc_no IN(${str})
                AND is_assign = 1`;

        const getAsfromAstoData = await poolQuery({
          client,
          query: getAsfromAstoQ,
          values: [],
        });
        let results = [];
        if (result && Array.isArray(result)) {
          results = result.map((el2) => {
            let DOObj = getAsfromAstoData.find(
              (elms) => elms.purchasing_doc_no == el2.purchasing_doc_no
            );
            if (DOObj) {
              return { ...DOObj, ...el2, accepted_on: 12345678987 };
            } else {
              return {
                ...el2,
                assigned_from: "N/A",
                assigned_to: "N/A",
                accepted_on: 12345678987,
              };
            }
            //return DOObj ? { ...DOObj, ...el2 } : el2;
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
      } else {
        //For Others
        return resSend(
          res,
          false,
          200,
          "You are not authorized to view the information",
          null,
          null
        );
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
