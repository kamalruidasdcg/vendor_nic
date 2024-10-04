const { getQuery } = require("../config/pgDbConfig");
const { makeHttpRequest } = require("../config/sapServerConfig");
const { timeInHHMMSS } = require("../controllers/btnControllers");
const { REJECTED, F_STATUS_FORWARDED_TO_FINANCE } = require("../lib/status");
const { getEpochTime, getYyyyMmDd } = require("../lib/utils");

/**
 * BTN DATA SEND TO SAP SERVER WHEN BTN SUBMIT BY FINNANCE STAFF
 * @param {Object} btnPayload
 * @param {Object} tokenData
 */
async function btnSubmitToSAPF01(btnPayload, tokenData) {
    let status = false;
    console.log("send to sap payload -- >", btnPayload);
    try {
      const vendorQuery = `WITH ranked_assignments AS (
              SELECT
                  btn_assign.*,
                  ROW_NUMBER() OVER (PARTITION BY btn_assign.btn_num ORDER BY btn_assign.ctid DESC) AS rn
              FROM
                  btn_assign
          )
          SELECT 
              btn.btn_num, 
              btn.purchasing_doc_no,
              btn.cgst, 
              btn.sgst, 
              btn.igst, 
              btn.net_claim_amount, 
              btn.invoice_no,
              btn.vendor_code,
			  btn.invoice_date,
              vendor.stcd3,
              users.pernr as finance_auth_id,
              users.cname as finance_auth_name,
              vendor.name1 as vendor_name,
              assign_users.cname as assign_name,
              ranked_assignments.assign_by as assign_id
          FROM 
              btn_service_hybrid AS btn
          LEFT JOIN 
              ranked_assignments
              ON (btn.btn_num = ranked_assignments.btn_num
              AND ranked_assignments.rn = 1)
          LEFT JOIN zmm_gate_entry_d as ged
                  ON( btn.purchasing_doc_no = ged.ebeln AND btn.invoice_no = ged.invno)
          LEFT JOIN lfa1 as vendor
                  ON(btn.vendor_code = vendor.lifnr)
          LEFT JOIN pa0002 as users
                  ON(users.pernr::character varying = $1)
          LEFT JOIN pa0002 as assign_users
                  ON(assign_users.pernr::character varying = ranked_assignments.assign_by)
          WHERE 
              btn.btn_num = $2`;
  
      let btnDetails = await getQuery({
        query: vendorQuery,
        values: [btnPayload.assign_to, btnPayload.btn_num],
      });


      console.log("btnDetails", btnDetails);
      
  
      let btn_payload = {
        EBELN: btnPayload.purchasing_doc_no || btnDetails[0]?.purchasing_doc_no, // PO NUMBER
        LIFNR: btnDetails[0]?.vendor_code, // VENDOR CODE
        RERNAM: btnDetails[0]?.vendor_name, // REG CREATOR NAME --> VENDOR NUMBER
        STCD3: btnDetails[0]?.stcd3, // VENDOR GSTIN NUMBER
        ZVBNO: btnDetails[0]?.invoice_no, // GATE ENTRY INVOCE NUMBER
        VEN_BILL_DATE: getYyyyMmDd(
          new Date(btnDetails[0]?.invoice_date).getTime()
        ), // GATE ENTRY INVOICE DATE
        PERNR: tokenData.vendor_code, // DO ID
        ZBTNO: btnPayload.btn_num, //  BTN NUMBER
        ERDAT: getYyyyMmDd(getEpochTime()), // VENDOR BILL SUBMIT DATE
        ERZET: timeInHHMMSS(), // VENDOR BILL SUBMIT TIME
        RERDAT: getYyyyMmDd(getEpochTime()), //REGISTRATION NUMBER --- VENDOR BILL SUBMIT DATE
        RERZET: timeInHHMMSS(), //REGISTRATION NUMBER --- VENDOR BILL SUBMIT TIME
        DPERNR1: tokenData.vendor_code, // DO NUMBER
        DRERDAT1: getYyyyMmDd(getEpochTime()), // DEPARTMETN RECECE DATE --> WHEN SUBMIT DO
        DRERZET1: timeInHHMMSS(), // DEPARTMETN RECECE TIME --> WHEN SUBMIT DO
        DRERNAM1: tokenData.name, // DEPARTMETN RECECE DO ID --> WHEN SUBMIT DO
        DAERDAT: getYyyyMmDd(getEpochTime()), // DEPARTMENT APPROVAL DATE --> DO SUBMISSION DATE
        DAERZET: timeInHHMMSS(), // DEPARTMENT APPROVAL DATE --> DO SUBMISSION TIME
        DAERNAM: tokenData.name, // DEPARTMENT APPROVAL NAME --> DO NAME
  
        // DEERDAT: "", // REJECTION DATE
        // DEERZET: timeInHHMMSS(), // REJECTION TIME
        // DEERNAM: "", // DO ( WHO REJECTED)
        // ZRMK2: "", // "REJECTION REASON REMARKS / DO SUBMIT REMARKS"
  
        DFERDAT: getYyyyMmDd(getEpochTime()), // DO SUBMIT DATE
        DEFRZET: timeInHHMMSS(), // DO SUBMIT TIEM
        DEFRNAM: tokenData.name || "", // DO SUBMIT NAME ( DO NAME)
        DSTATUS: "4", // "4"
        DPERNR: tokenData.vendor_code, //  (DO)
  
        FPRNR1: btnPayload.assign_to || "", // FINACE AUTHIRITY ID ( )
        FPRNAM1: btnDetails[0]?.assign_name || "", // FINANCE
        FSTATUS: "", // BLANK STATUS
      };
  
      /**
       * IF BTN REJECTED BY DO
       */
      if (btnPayload.status === REJECTED) {
        btn_payload = {
          ...btn_payload,
          DEERDAT: getYyyyMmDd(getEpochTime()), // REJECTION DATE
          DEERZET: timeInHHMMSS(), // REJECTION TIME
          DEERNAM: tokenData.name, // DO ( WHO REJECTED)
          ZRMK2: btnPayload.rejectedMessage || "Rejeced by DO", // "REJECTION REASON REMARKS / DO SUBMIT REMARKS"
          DSTATUS: "2", // rejected status
        };
      }
  
      const sapBaseUrl = process.env.SAP_HOST_URL || "http://10.181.1.31:8010";
      const postUrl = `${sapBaseUrl}/sap/bc/zobps_do_out`;
      console.log("btnPayload--", postUrl, btn_payload);
      const postResponse = await makeHttpRequest(postUrl, "POST", btn_payload);
      if (
        postResponse.statusCode &&
        postResponse.statusCode >= 200 &&
        postResponse.statusCode <= 226
      ) {
        status = true;
      }
      console.log("POST Response from the server:", postResponse);
    } catch (error) {
      console.error("Error making the request:", error.message);
      throw error;
    } finally {
      return status;
    }
  }



  /**
 * BTN DATA SEND TO SAP SERVER WHEN BTN SUBMIT BY FINNANCE AUTHRITY
 * @param {Object} btnPayload
 * @param {Object} tokenData
 */

async function btnSubmitToSAPF02(btnPayload, tokenData) {
    let status = false;
    try {
      const vendorQuery = `WITH ranked_assignments AS (
            SELECT
                btn_assign.*,
                ROW_NUMBER() OVER (PARTITION BY btn_assign.btn_num ORDER BY btn_assign.ctid DESC) AS rn
            FROM
                btn_assign
        )
        SELECT 
          btn.btn_num, 
          btn.purchasing_doc_no,
          btn.cgst, 
          btn.sgst, 
          btn.igst, 
          wdc.yard_no AS yard, 
          btn.wdc_number, 
          btn.net_claim_amount, 
          btn.net_claim_amt_gst, 
          btn.invoice_no,
          btn.vendor_code,
          btn.net_with_gst,
          vendor.stcd3,
          users.pernr as finance_auth_id,
          users.cname as finance_auth_name,
          vendor.name1 as vendor_name,
          assign_users.cname as assign_name,
          ranked_assignments.assign_to as assign_to
  
        FROM 
            btn_service_hybrid AS btn
        LEFT JOIN 
            ranked_assignments
            ON (btn.btn_num = ranked_assignments.btn_num
            AND ranked_assignments.rn = 1)
        LEFT JOIN  lfa1 as vendor
            ON(btn.vendor_code = vendor.lifnr)
        LEFT JOIN  pa0002 as users
            ON(users.pernr::character varying = $1)
        LEFT JOIN  pa0002 as assign_users
            ON(assign_users.pernr::character varying = ranked_assignments.assign_to)
        LEFT JOIN  wdc as wdc
            ON(wdc.reference_no = btn.wdc_number)
        WHERE 
            btn.btn_num = $2`;
  
      let btnDetails = await getQuery({
        query: vendorQuery,
        values: [btnPayload.assign_to_fi, btnPayload.btn_num],
      });
  
      // CALCULATION
      let basic_ammount = parseFloat(btnDetails[0]?.net_claim_amount) || 0;
      const cgst = parseFloat(btnDetails[0]?.cgst) || 0;
      const igst = parseFloat(btnDetails[0]?.igst) || 0;
      const sgst = parseFloat(btnDetails[0]?.sgst) || 0;
  
      let cgst_ammount = "0";
      let igst_ammount = "0";
      let sgst_ammount = "0";
  
      if (cgst && basic_ammount) {
        cgst_ammount = parseFloat(basic_ammount * (cgst / 100)).toFixed(3);
      }
      if (igst && basic_ammount) {
        igst_ammount = parseFloat(basic_ammount * (igst / 100)).toFixed(3);
      }
      if (sgst && basic_ammount) {
        sgst_ammount = parseFloat(basic_ammount * (sgst / 100)).toFixed(3);
      }
  
      const btn_payload = {
        ZBTNO: btnPayload?.btn_num || "", // BTN Number
        // ERDAT: getYyyyMmDd(getEpochTime()), // BTN Create Date
        // ERZET: timeInHHMMSS(), // 134562,  // BTN Create Time
        // ERNAM: tokenData?.vendor_code || "", // Created Person Name
        // LAEDA: "", // Not Needed
        STCD3: btnDetails[0]?.stcd3 || "",
        AENAM: btnDetails[0]?.vendor_name || "", // Vendor Name
        LIFNR: btnDetails[0]?.vendor_code || "", // Vendor Codebtn_v2
        ZVBNO: btnDetails[0]?.invoice_no || "", // Invoice Number
        EBELN: btnDetails[0]?.purchasing_doc_no || "", // PO Number
        ACC: btnDetails[0]?.yard || "", // yard number
        FSTATUS: F_STATUS_FORWARDED_TO_FINANCE, // sap deparment forword status
        ZRMK1: "Forwared To Finance", // REMARKS
        CGST: cgst_ammount,
        IGST: igst_ammount,
        SGST: sgst_ammount,
        BASICAMT: basic_ammount?.toFixed(3),
        TOT_AMT: btnDetails[0]?.net_with_gst || "0",
        ACTIVITY: btnPayload.activity || "", // activity
        FRERDAT: getYyyyMmDd(getEpochTime()),
        FRERZET: timeInHHMMSS(),
        FRERNAM: btnDetails[0]?.assign_to || "", // SET BY DO FINACE AUTHIRITY  PERSON (DO SUBMIT)
        FPERNR1: btnPayload?.assign_to_fi || "", // assigned_to
        FPERNAM: btnDetails[0]?.finance_auth_name || "", // ASSINGEE NAME
      };
  
      const sapBaseUrl = process.env.SAP_HOST_URL || "http://10.181.1.31:8010";
      const postUrl = `${sapBaseUrl}/sap/bc/zobps_out_api`;
      console.log("btnPayload", postUrl, btn_payload);
      const postResponse = await makeHttpRequest(postUrl, "POST", btn_payload);
      if (
        postResponse.statusCode &&
        postResponse.statusCode >= 200 &&
        postResponse.statusCode <= 226
      ) {
        status = true;
      }
      console.log("POST Response from the server:", postResponse);
    } catch (error) {
      console.error("Error making the request:", error.message);
      throw error;
    } finally {
      return status;
    }
  }




  /**
 * BTN DATA SEND TO SAP SERVER WHEN BTN SUBMIT BY FINNANCE STAFF
 * @param {Object} btnPayload
 * @param {Object} tokenData
 */
async function abhBtnSubmitToSAPF01(btnPayload, tokenData) {
  let status = false;
  console.log("send to sap payload -- >", btnPayload);
  try {
    const vendorQuery = `WITH ranked_assignments AS (
            SELECT
                btn_assign.*,
                ROW_NUMBER() OVER (PARTITION BY btn_assign.btn_num ORDER BY btn_assign.ctid DESC) AS rn
            FROM
                btn_assign
        )
        SELECT 
            btn.btn_num, 
            btn.purchasing_doc_no,
            btn.cgst, 
            btn.sgst, 
            btn.igst, 
            btn.net_claim_amount, 
            btn.invoice_no,
            btn.vendor_code,
            ged.inv_date,
            vendor.stcd3,
            users.pernr as finance_auth_id,
            users.cname as finance_auth_name,
            vendor.name1 as vendor_name,
            assign_users.cname as assign_name,
            ranked_assignments.assign_by as assign_id
        FROM 
            btn_adv_bill_hybrid AS btn
        LEFT JOIN 
            ranked_assignments
            ON (btn.btn_num = ranked_assignments.btn_num
            AND ranked_assignments.rn = 1)
        LEFT JOIN zmm_gate_entry_d as ged
                  ON( btn.purchasing_doc_no = ged.ebeln AND btn.invoice_no = ged.invno)
        LEFT JOIN lfa1 as vendor
                ON(btn.vendor_code = vendor.lifnr)
        LEFT JOIN pa0002 as users
                ON(users.pernr::character varying = $1)
        LEFT JOIN pa0002 as assign_users
                ON(assign_users.pernr::character varying = ranked_assignments.assign_by)
        WHERE 
            btn.btn_num = $2`;

    let btnDetails = await getQuery({
      query: vendorQuery,
      values: [btnPayload.assign_to, btnPayload.btn_num],
    });


    console.log("btnDetails", btnDetails);
    

    let btn_payload = {
      EBELN: btnPayload.purchasing_doc_no || btnDetails[0]?.purchasing_doc_no, // PO NUMBER
      LIFNR: btnDetails[0]?.vendor_code, // VENDOR CODE
      RERNAM: btnDetails[0]?.vendor_name, // REG CREATOR NAME --> VENDOR NUMBER
      STCD3: btnDetails[0]?.stcd3, // VENDOR GSTIN NUMBER
      ZVBNO: btnDetails[0]?.invoice_no, // GATE ENTRY INVOCE NUMBER
      VEN_BILL_DATE: getYyyyMmDd(
        new Date(btnDetails[0]?.invoice_date).getTime()
      ), // GATE ENTRY INVOICE DATE
      PERNR: tokenData.vendor_code, // DO ID
      ZBTNO: btnPayload.btn_num, //  BTN NUMBER
      ERDAT: getYyyyMmDd(getEpochTime()), // VENDOR BILL SUBMIT DATE
      ERZET: timeInHHMMSS(), // VENDOR BILL SUBMIT TIME
      RERDAT: getYyyyMmDd(getEpochTime()), //REGISTRATION NUMBER --- VENDOR BILL SUBMIT DATE
      RERZET: timeInHHMMSS(), //REGISTRATION NUMBER --- VENDOR BILL SUBMIT TIME
      DPERNR1: tokenData.vendor_code, // DO NUMBER
      DRERDAT1: getYyyyMmDd(getEpochTime()), // DEPARTMETN RECECE DATE --> WHEN SUBMIT DO
      DRERZET1: timeInHHMMSS(), // DEPARTMETN RECECE TIME --> WHEN SUBMIT DO
      DRERNAM1: tokenData.name, // DEPARTMETN RECECE DO ID --> WHEN SUBMIT DO
      DAERDAT: getYyyyMmDd(getEpochTime()), // DEPARTMENT APPROVAL DATE --> DO SUBMISSION DATE
      DAERZET: timeInHHMMSS(), // DEPARTMENT APPROVAL DATE --> DO SUBMISSION TIME
      DAERNAM: tokenData.name, // DEPARTMENT APPROVAL NAME --> DO NAME

      // DEERDAT: "", // REJECTION DATE
      // DEERZET: timeInHHMMSS(), // REJECTION TIME
      // DEERNAM: "", // DO ( WHO REJECTED)
      // ZRMK2: "", // "REJECTION REASON REMARKS / DO SUBMIT REMARKS"

      DFERDAT: getYyyyMmDd(getEpochTime()), // DO SUBMIT DATE
      DEFRZET: timeInHHMMSS(), // DO SUBMIT TIEM
      DEFRNAM: tokenData.name || "", // DO SUBMIT NAME ( DO NAME)
      DSTATUS: "4", // "4"
      DPERNR: tokenData.vendor_code, //  (DO)

      FPRNR1: btnPayload.assign_to || "", // FINACE AUTHIRITY ID ( )
      FPRNAM1: btnDetails[0]?.assign_name || "", // FINANCE
      FSTATUS: "", // BLANK STATUS
    };

    /**
     * IF BTN REJECTED BY DO
     */
    if (btnPayload.status === REJECTED) {
      btn_payload = {
        ...btn_payload,
        DEERDAT: getYyyyMmDd(getEpochTime()), // REJECTION DATE
        DEERZET: timeInHHMMSS(), // REJECTION TIME
        DEERNAM: tokenData.name, // DO ( WHO REJECTED)
        ZRMK2: btnPayload.rejectedMessage || "Rejeced by DO", // "REJECTION REASON REMARKS / DO SUBMIT REMARKS"
        DSTATUS: "2", // rejected status
      };
    }

    const sapBaseUrl = process.env.SAP_HOST_URL || "http://10.181.1.31:8010";
    const postUrl = `${sapBaseUrl}/sap/bc/zobps_do_out`;
    console.log("btnPayload--", postUrl, btn_payload);
    const postResponse = await makeHttpRequest(postUrl, "POST", btn_payload);
    if (
      postResponse.statusCode &&
      postResponse.statusCode >= 200 &&
      postResponse.statusCode <= 226
    ) {
      status = true;
    }
    console.log("POST Response from the server:", postResponse);
  } catch (error) {
    console.error("Error making the request:", error.message);
    throw error;
  } finally {
    return status;
  }
}



/**
* BTN DATA SEND TO SAP SERVER WHEN BTN SUBMIT BY FINNANCE AUTHRITY
* @param {Object} btnPayload
* @param {Object} tokenData
*/

async function abhBtnSubmitToSAPF02(btnPayload, tokenData) {
  let status = false;
  try {
    const vendorQuery = `WITH ranked_assignments AS (
          SELECT
              btn_assign.*,
              ROW_NUMBER() OVER (PARTITION BY btn_assign.btn_num ORDER BY btn_assign.ctid DESC) AS rn
          FROM
              btn_assign
      )
      SELECT 
        btn.btn_num, 
        btn.purchasing_doc_no,
        btn.cgst, 
        btn.sgst, 
        btn.igst, 
        btn.yard, 
        btn.wdc_number, 
        btn.net_claim_amount, 
        btn.net_claim_amt_gst, 
        btn.invoice_no,
        btn.vendor_code,
        btn.net_with_gst,
        vendor.stcd3,
        users.pernr as finance_auth_id,
        users.cname as finance_auth_name,
        vendor.name1 as vendor_name,
        assign_users.cname as assign_name,
        ranked_assignments.assign_to as assign_to

      FROM 
          btn_service_hybrid AS btn
      LEFT JOIN 
          ranked_assignments
          ON (btn.btn_num = ranked_assignments.btn_num
          AND ranked_assignments.rn = 1)
      LEFT JOIN  lfa1 as vendor
          ON(btn.vendor_code = vendor.lifnr)
      LEFT JOIN  pa0002 as users
          ON(users.pernr::character varying = $1)
      LEFT JOIN  pa0002 as assign_users
          ON(assign_users.pernr::character varying = ranked_assignments.assign_to)

      WHERE 
          btn.btn_num = $2`;

    let btnDetails = await getQuery({
      query: vendorQuery,
      values: [btnPayload.assign_to_fi, btnPayload.btn_num],
    });

    // CALCULATION
    let basic_ammount = parseFloat(btnDetails[0]?.net_claim_amount) || 0;
    const cgst = parseFloat(btnDetails[0]?.cgst) || 0;
    const igst = parseFloat(btnDetails[0]?.igst) || 0;
    const sgst = parseFloat(btnDetails[0]?.sgst) || 0;

    let cgst_ammount = "0";
    let igst_ammount = "0";
    let sgst_ammount = "0";

    if (cgst && basic_ammount) {
      cgst_ammount = parseFloat(basic_ammount * (cgst / 100)).toFixed(3);
    }
    if (igst && basic_ammount) {
      igst_ammount = parseFloat(basic_ammount * (igst / 100)).toFixed(3);
    }
    if (sgst && basic_ammount) {
      sgst_ammount = parseFloat(basic_ammount * (sgst / 100)).toFixed(3);
    }

    const btn_payload = {
      ZBTNO: btnPayload?.btn_num || "", // BTN Number
      // ERDAT: getYyyyMmDd(getEpochTime()), // BTN Create Date
      // ERZET: timeInHHMMSS(), // 134562,  // BTN Create Time
      // ERNAM: tokenData?.vendor_code || "", // Created Person Name
      // LAEDA: "", // Not Needed
      STCD3: btnDetails[0]?.stcd3 || "",
      AENAM: btnDetails[0]?.vendor_name || "", // Vendor Name
      LIFNR: btnDetails[0]?.vendor_code || "", // Vendor Codebtn_v2
      ZVBNO: btnDetails[0]?.invoice_no || "", // Invoice Number
      EBELN: btnDetails[0]?.purchasing_doc_no || "", // PO Number
      ACC: btnDetails[0]?.yard || "", // yard number
      FSTATUS: F_STATUS_FORWARDED_TO_FINANCE, // sap deparment forword status
      ZRMK1: "Forwared To Finance", // REMARKS
      CGST: cgst_ammount,
      IGST: igst_ammount,
      SGST: sgst_ammount,
      BASICAMT: basic_ammount?.toFixed(3),
      TOT_AMT: btnDetails[0]?.net_with_gst || "0",
      ACTIVITY: btnPayload.activity || "", // activity
      FRERDAT: getYyyyMmDd(getEpochTime()),
      FRERZET: timeInHHMMSS(),
      FRERNAM: btnDetails[0]?.assign_to || "", // SET BY DO FINACE AUTHIRITY  PERSON (DO SUBMIT)
      FPERNR1: btnPayload?.assign_to_fi || "", // assigned_to
      FPERNAM: btnDetails[0]?.finance_auth_name || "", // ASSINGEE NAME
    };

    const sapBaseUrl = process.env.SAP_HOST_URL || "http://10.181.1.31:8010";
    const postUrl = `${sapBaseUrl}/sap/bc/zobps_out_api`;
    console.log("btnPayload", postUrl, btn_payload);
    const postResponse = await makeHttpRequest(postUrl, "POST", btn_payload);
    if (
      postResponse.statusCode &&
      postResponse.statusCode >= 200 &&
      postResponse.statusCode <= 226
    ) {
      status = true;
    }
    console.log("POST Response from the server:", postResponse);
  } catch (error) {
    console.error("Error making the request:", error.message);
    throw error;
  } finally {
    return status;
  }
}


module.exports = { btnSubmitToSAPF01, btnSubmitToSAPF02, abhBtnSubmitToSAPF01, abhBtnSubmitToSAPF02}


  
  