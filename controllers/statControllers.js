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
} = require("../lib/tableName");
const { checkPoType } = require("../services/lastassignee.servces");

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
        const QbtnNo = `SELECT MAX(created_at) as time, btn_num FROM ${BTN_LIST} GROUP BY btn_num,purchasing_doc_no`;
        let btn_no_list = await poolQuery({
          client,
          query: QbtnNo,
          values: [],
        });

        let str = "";

        if (btn_no_list.length) {
          btn_no_list.forEach((item) => {
            const no = item.time;
            str = str.concat("'").concat(`${no}`).concat("'").concat(",");
          });
        }
        str = str.slice(0, -1);
        console.log(str);

        // For grse_FINANCE_ASSIGNER
        if (
          tokenData.internal_role_id === 1 &&
          tokenData.department_id === 15
        ) {
          const Q = `SELECT * FROM ${BTN_LIST} WHERE created_at IN(${str}) ORDER BY created_at DESC`;

          const result = await poolQuery({
            client,
            query: Q,
            values: [],
          });

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

          const query = `SELECT * FROM ${BTN_LIST} bl 
                         JOIN ${BTN_MATERIAL_DO} bdo ON bl.btn_num = bdo.btn_num
                         JOIN ${BTN_ASSIGN} ba ON bdo.btn_num = ba.btn_num WHERE 
                         (ba.assign_to = $1 AND ba.last_assign = 'true') OR
                         (ba.assign_to_fi = $1 AND ba.last_assign_fi = 'false') 
                         AND bl.created_at IN(${str})
                         ORDER BY bl.created_at DESC`;

          const result = await poolQuery({
            client,
            query: query,
            values: [tokenData.vendor_code],
          });

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
