const { resSend } = require("../lib/resSend");
const {
  query,
  getQuery,
  poolClient,
  poolQuery,
} = require("../config/pgDbConfig");

const { SDBG_ENTRY, SDBG } = require("../lib/tableName");
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

          const data =
            await Promise.all(result.map(async (el2) => {


              const po_type = await checkPoType(el2.purchasing_doc_no);
              if (po_type) {
                el2.po_type = po_type;
              }
              return el2;

            }));
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

          const data =
            await Promise.all(result.map(async (el2) => {


              const po_type = await checkPoType(el2.purchasing_doc_no);
              if (po_type) {
                el2.po_type = po_type;
              }
              return el2;

            }));

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
          403,
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
    console.error("Error in database connection:", error);
    resSend(res, false, 500, "Error in database connection!", null, error);
  }
};

exports.statsForBTN = async (req, res) => {
  try {
    const client = await poolClient();
    try {
      const tokenData = req.tokenData;
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
          const Q = `SELECT * FROM btn_list ORDER BY created_at DESC`;

          const result = await poolQuery({
            client,
            query: Q,
            values: [],
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
        // For grse_FINANCE_STAFF
        if (
          result[0].internal_role_id === 2 &&
          result[0].department_id === 15
        ) {
          const query = `SELECT * FROM btn_list JOIN btn_do ON btn_list.btn_num = btn_do.btn_num
                         JOIN btn_assign ON btn_do.btn_num = btn_assign.btn_num WHERE 
                         (btn_assign.assign_to = $1 AND btn_assign.last_assign = 'true') OR
                         (btn_assign.assign_to_fi = $1 AND btn_assign.last_assign_fi = 'false') 
                         ORDER BY btn_list.created_at DESC`;

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
          403,
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
