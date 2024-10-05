const { poolQuery } = require("../config/pgDbConfig");
const { APPROVED } = require("../lib/status");
const { getEpochTime } = require("../lib/utils");

/**
 * GET VENDOR DETAILS
 * @param {Object} client 
 * @param {Object} data 
 * @returns {Promise<Object>}
 * @throws {Error} If the query execution fails, an error is thrown.
 */
const vendorDetails = async (client, data) => {
    try {
        let q = `
              SELECT po.lifnr       AS vendor_code,
                     vendor_t.name1 AS vendor_name,
                     vendor_t.email AS vendor_email,
                     vendor_t.stcd3 AS vendor_gstno
              FROM   ekko AS po
                     left join lfa1 AS vendor_t
                            ON ( po.lifnr = vendor_t.lifnr )
              WHERE  po.ebeln = $1`;
        let result = await poolQuery({
            client,
            query: q,
            values: data,
        });
        return result;
    } catch (error) {
        throw error;
    }

}


const getWdcInfoServiceHybrid = async (req, res) => {
  try {
    const client = await poolClient();
    try {

      const { purchasing_doc_no, reference_no, type } = req.query;
      if (type === "list") {
        let wdcListQuery = `SELECT DISTINCT(reference_no) FROM wdc`;
        let condQuery = ' WHERE 1 = 1';
        // TO GET ONLY WDC .. NO JCC OR THERS
        const val = ['WDC'];
        condQuery += " AND action_type = $1";
        if (purchasing_doc_no) {
          val.push(purchasing_doc_no);
          condQuery += " AND purchasing_doc_no = $2";
        }

        wdcListQuery += condQuery;

        const wdcList = await poolQuery({ client, query: wdcListQuery, values: val });
        return resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, wdcList, null);
      }

      if (!reference_no) {
        return resSend(res, false, 400, Message.MANDATORY_PARAMETR_MISSING, "Reference_no missing", null);
      }

      const q = `
              SELECT wdc.*,
              	wdc.assigned_to AS certifying_by,
              	users.cname as certifying_by_name
              FROM
              	wdc AS wdc
              LEFT JOIN pa0002 AS users
              	ON(users.pernr :: character varying = wdc.assigned_to)
              WHERE (reference_no = $1 AND status = $2 AND action_type = $3) LIMIT 1`;

      let result = await poolQuery({ client, query: q, values: [reference_no, APPROVED, 'WDC'] });
      console.log("wdcList", result);

      if (!result.length) {
        return resSend(res, false, 200, "WDC not approved yet.", [], null);
      }
      let wdcLineItem = [];
      if (result[0]?.line_item_array) {
        try {
          wdcLineItem = JSON.parse(result[0]?.line_item_array);
        } catch (error) {
          wdcLineItem = [];
        }
      }

      const poNo = purchasing_doc_no || result[0]?.purchasing_doc_no;

      const line_item_ekpo_q = `SELECT EBELP AS line_item_no, MATNR AS service_code, TXZ01 AS description, NETPR AS po_rate, MEINS AS unit from ${EKPO} WHERE EBELN = $1`;
      let get_line_item_ekpo = await poolQuery({
        client,
        query: line_item_ekpo_q,
        values: [poNo],
      });

      // wdcLineItem = wdcLineItem.filter((el) => el?.status === APPROVED);

      const data = wdcLineItem.map((el2) => {
        const DOObj = get_line_item_ekpo.find(
          (elms) => elms.line_item_no == el2.line_item_no
        );
        console.log("DOObj", DOObj);

        return DOObj ? { ...DOObj, ...el2 } : el2;
      });

      let responseData = result[0];
      responseData.line_item_array = data;

      resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, responseData, null);
    } catch (error) {
      resSend(res, false, 500, Message.DATA_FETCH_ERROR, error.message, null);
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, false, 500, Message.DB_CONN_ERROR, error.message, null);
  }
};


const jccBtnforwordToFinacePaylaod = (payload) => {

    const obj = {
        btn_num: payload.btn_num,
        recomend_payment: payload.recomend_payment,
        net_payable_amount: payload.net_payable_amount,
        created_at: getEpochTime(),
        created_by_id: payload.created_by_id
    }
    return obj;
}

const jccBtnbtnAssignPayload = (payload) => {

    return {
        btn_num: payload.btn_num,
        purchasing_doc_no: payload.purchasing_doc_no,
        assign_by: payload.assign_by,
        assign_to: payload.assign_to,
        last_assign: true,
        assign_by_fi: "",
        assign_to_fi: "",
        last_assign_fi: false,
    }
}

const jccPayloadObj = (payload) => {

    const obj = {
        btn_num: payload.btn_num,
        purchasing_doc_no: payload.purchasing_doc_no,
        vendor_code: payload.vendor_code,
        invoice_no: payload.invoice_no,
        invoice_value: payload.invoice_value,
        yard: payload.yard,
        jcc_filename: payload.jcc_filename || "",
        invoice_filename: payload.invoice_filename || "",
        invoice_type: payload.invoice_type,
        invoice_date: payload.invoice_date || null,
        suppoting_invoice_filename: payload.suppoting_invoice_filename || "",
        bill_certifing_authority: payload.bill_certifing_authority,
        net_claim_amount: payload.net_claim_amount || "0",
        jcc_ref_number: payload.jcc_ref_number,
        jcc_job_start_date: payload.jcc_job_start_date,
        jcc_job_end_date: payload.jcc_job_end_date,
        hsn_gstn_icgrn: 1,
        remarks:payload.remarks || "",
        created_by_id: payload.created_by_id,
        created_at: getEpochTime (),
        btn_type: "claim-against-jcc"
    }

    return obj;
}


async function getJccBTNDetails(client, data) {
    try {

        if (!data.btn_num) {
            return { success: false, statusCode: 200, message: "Please send btn number", data: Message.MANDATORY_INPUTS_REQUIRED };
        }
        const val = [];
        val.push(data.btn_num);

        const getBtnQuery =
            `SELECT
                s_btn.*,
                btn_assign.assign_by,
                btn_assign.assign_to,
                users_btn_assign_to.cname AS assign_to_name,
                users_assign_to_fi.cname AS assign_by_fi_name,
                btn_assign.assign_by_fi,
                btn_assign.assign_to_fi,
                btn_assign.last_assign,
                btn_assign.last_assign_fi,
                btn_authority.recomend_payment,
                users.cname AS bill_certifing_authority_name
            FROM 
              btn_jcc AS s_btn 
            LEFT JOIN btn_assign AS btn_assign
                ON(s_btn.btn_num = btn_assign.btn_num)
            LEFT JOIN pa0002 as users 
                ON(users.pernr :: character varying = s_btn.bill_certifing_authority)
            LEFT JOIN pa0002 as users_btn_assign_to
                ON(users_btn_assign_to.pernr :: character varying = btn_assign.assign_to) 
            LEFT JOIN pa0002 as users_assign_to_fi
                ON(users_assign_to_fi.pernr :: character varying = btn_assign.assign_to_fi) 
            LEFT JOIN btn_jcc_certify_authority as btn_authority 
                ON(s_btn.btn_num = btn_authority.btn_num)
            WHERE s_btn.btn_num = $1`;
        // AND s_btn.bill_certifing_authority = '600700'
        // btn_assign.*,
        // LEFT JOIN btn_assign AS btn_assign
        // ON(s_btn.btn_num = btn_assign.btn_num)
        const result = await poolQuery({ client, query: getBtnQuery, values: val });
        let response = result[0] || {};
    
        response = { ...response };

        return { success: true, statusCode: 200, message: "Value fetch success", data: response };
    } catch (error) {
        console.log("dddddd", error.message);

        throw error;
    }
}



module.exports = { vendorDetails, jccPayloadObj, jccBtnforwordToFinacePaylaod, jccBtnbtnAssignPayload, getJccBTNDetails }