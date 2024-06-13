const { resSend } = require("../lib/resSend");
const {
  query,
  getQuery,
  poolClient,
  poolQuery,
} = require("../config/pgDbConfig");

const { SDBG_ENTRY, SDBG } = require("../lib/tableName");

exports.statsForBG = async (req, res) => {
  try {
    const client = await poolClient();
    try {
      const { tokenData } = req;

      if (!tokenData) {
        throw new Error("Missing token data ");
      }

      //   console.log("tokenData.vendor_code", tokenData.vendor_code);
      if (
        tokenData.internal_role_id === 1 &&
        tokenData.username === "grse_FINANCE_ASSIGNER"
      ) {
        const Q = `SELECT * FROM ${SDBG_ENTRY}`;
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

      if (
        tokenData.internal_role_id === 2 &&
        tokenData.username === "grse_FINANCE_STAFF"
      ) {
        console.log("hey i am staff......");
        //   const Q = `SELECT purchasing_doc_no FROM ${SDBG} WHERE assigned_to = $1`;
        const Q = `SELECT se.*
                         FROM ${SDBG_ENTRY} se
                         JOIN ${SDBG} s ON se.purchasing_doc_no = s.purchasing_doc_no
                         WHERE s.assigned_to = $1`;

        const result = await poolQuery({
          client,
          query: Q,
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
    } catch (error) {
      console.error("Error fetching data:", error);
      return resSend(res, false, 400, "Data not fetched!!", null, error);
    }
  } catch (error) {
    resSend(res, false, 500, "error in db conn!", error, "");
  }
};

exports.statsForBTN = async (req, res) => {
  try {
    const client = await poolClient();
    try {
      const tokenData = req.tokenData;

      if (!tokenData) {
        throw new Error("Missing token data");
      }
      console.log("token....", tokenData);

      // const query = `
      //   SELECT *
      //   FROM btn
      //   JOIN btn_do ON btn.btn_num = btn_do.btn_num
      //   JOIN btn_assign ON btn_do.btn_num = btn_assign.btn_num
      //   WHERE btn_assign.assign_by = $1
      // `;

      const query = `
    SELECT * 
    FROM btn
    JOIN btn_do ON btn.btn_num = btn_do.btn_num
    JOIN btn_assign ON btn_do.btn_num = btn_assign.btn_num
    WHERE btn_assign.assign_by = $1
  `;

      try {
        const result = await poolQuery({
          client,
          query: query,
          values: [tokenData.vendor_code],
        });

        console.log("Query result:", result);
        return resSend(res, true, 200, "Data fetched successfully", result);
      } catch (dbError) {
        console.error("Error fetching data:", dbError);
        return resSend(res, false, 400, "Data not fetched!", null, dbError);
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
