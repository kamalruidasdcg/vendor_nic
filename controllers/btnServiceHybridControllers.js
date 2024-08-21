const { getEpochTime, getYyyyMmDd, generateQuery } = require("../lib/utils");
const { EKPO, BTN_SERVICE_HYBRID } = require("../lib/tableName");
const { resSend } = require("../lib/resSend");
const { APPROVED, SUBMITTED_BY_VENDOR } = require("../lib/status");
const { create_btn_no } = require("../services/po.services");
const { poolClient, poolQuery } = require("../config/pgDbConfig");
const Message = require("../utils/messages");
const { filesData, payloadObj, getHrDetails, getSDBGApprovedFiles, getPBGApprovedFiles, vendorDetails, getContractutalSubminissionDate, getActualSubminissionDate, checkHrCompliance, addToBTNList, getGrnIcgrnValue } = require("../services/btnServiceHybrid.services");
const { INSERT, ACTION_SDBG, ACTION_PBG, MID_SDBG } = require("../lib/constant");

const getWdcInfoServiceHybrid = async (req, res) => {
  try {
    const client = await poolClient();
    try {

      const { purchasing_doc_no, reference_no, type } = req.query;
      if (type === "list") {
        const val = [];
        if (purchasing_doc_no) {
          val.push(purchasing_doc_no);
        }
        const wdcList = await poolQuery({ client, query: "SELECT DISTINCT(reference_no) FROM wdc", values: val });
        return resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, wdcList, null);
      }

      if (!reference_no) {
        return resSend(res, false, 400, Message.MANDATORY_PARAMETR_MISSING, "Reference_no missing", null);
      }

      const q = `SELECT * FROM wdc WHERE (reference_no = $1 AND status = $2) LIMIT 1`;

      let result = await poolQuery({ client, query: q, values: [reference_no, APPROVED] });
      console.log("wdcList", result);

      if (!result.length) {
        return resSend(res, true, 200, Message.NO_RECORD_FOUND, "WDC not approved yet.", null);
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

      console.log("get_line_item_ekpo", get_line_item_ekpo);
      console.log("wdcLineItem", wdcLineItem);
      
      const data = wdcLineItem.map((el2) => {
        const DOObj = get_line_item_ekpo.find(
          (elms) => elms.line_item_no == el2.line_item_no
        );
        console.log("DOObj", DOObj);
        
        return DOObj ? { ...DOObj, ...el2 } : el2;
      });

      let responseData = result;
      responseData[0].line_item_array = data;

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

const submitBtnServiceHybrid = async (req, res) => {

  try {
    const client = await poolClient();
    try {
      const filesPaylaod = req.files;
      const tempPayload = req.body;
      const tokenData = req.tokenData;
      const net_payable_amount = tempPayload.net_payable_amount || "0";

      // Check required fields
      // if (!JSON.parse(tempPayload.hsn_gstn_icgrn)) {
      //   return resSend(res, false, 200, "Please check HSN code, GSTIN, Tax rate is as per PO!", null, null);
      // }

      // Check required fields
      if (!tempPayload.invoice_value) {
        return resSend(res, false, 200, Message.MANDATORY_PARAMETR_MISSING, "Invoice Value is missing!", null);
      }
      if (!tempPayload.purchasing_doc_no || !tempPayload.invoice_no) {
        return resSend(res, false, 200, Message.MANDATORY_PARAMETR_MISSING, "Invoice Number is missing!", null);
      }

      // check invoice number is already present in DB
      let check_invoice_q = `SELECT count(invoice_no) as count FROM ${BTN_SERVICE_HYBRID} WHERE invoice_no = $1 and vendor_code = $2`;
      let check_invoice = await poolQuery({ client, query: check_invoice_q, values: [tempPayload.invoice_no, tokenData.vendor_code] });


      if (check_invoice && check_invoice[0].count > 0) {
        return resSend(res, false, 200, "BTN is already created under the invoice number.", null, null);
      }
      if (!tempPayload.c_sdbg_filename || !tempPayload.a_sdbg_date || !tempPayload.c_sdbg_date) {
        return resSend(res, false, 200, Message.MANDATORY_PARAMETR_MISSING, "Send SDBG details", null);
      }



      /**
       * FILE PAYLOADS AND FILE VALIDATION
       */
      const uploadedFiles = filesData(filesPaylaod);
      console.log("uploadedFiles", uploadedFiles);

      if (!uploadedFiles.pf_compliance_filename || !uploadedFiles.esi_compliance_filename) {
        return resSend(res, false, 200, Message.MANDATORY_INPUTS_REQUIRED, "Missing PF or ESI files", null);
      }

      // checking no submitted hr compliance by vendor
      const checkMissingComplience = await checkHrCompliance(client, tempPayload);
      console.log("checkMissingComplience", checkMissingComplience);

      if (!checkMissingComplience.success) {
        return resSend(res, false, 200, checkMissingComplience.msg, "Missing data, Need to be upload by HR", null);
      }



      let payload = payloadObj(tempPayload)
      // BTN NUMBER GENERATE
      const btn_num = await create_btn_no();
      // UPLOAD FILES DATA



      // MATH Calculation
      net_claim_amount = (
        parseFloat(payload.invoice_value)
        + parseFloat(payload.debit_note)
        - parseFloat(payload.credit_note));

      payload = {
        ...payload, btn_num,
        ...uploadedFiles,
        net_claim_amount,
        created_by_id: tokenData.vendor_code
      }

      const { q, val } = generateQuery(INSERT, BTN_SERVICE_HYBRID, payload);

      // console.log(payload, q, val);
      await poolQuery({ client, query: q, values: val });
      await addToBTNList(client, { ...payload, net_payable_amount }, SUBMITTED_BY_VENDOR);
      resSend(res, true, 201, Message.BTN_CREATED, "BTN Created. No. " + btn_num, null);
    } catch (error) {
      resSend(res, false, 500, Message.SERVER_ERROR, error.message, null);
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, false, 501, Message.DB_CONN_ERROR, error.message, null);
  }
};

/**
 * BTN CREATE INITIAL DATA SEND
 * @param {Object} req 
 * @param {Object} res 
 */
const initServiceHybrid = async (req, res) => {

  try {
    const client = await poolClient();
    try {
      const { poNo } = req.query;

      // const data1 = await getHrDetails(client, [poNo]);
      // const data2 = await getSDBGApprovedFiles(client, [poNo, APPROVED, ACTION_SDBG]);
      // const data3 = await getPBGApprovedFiles(client, [poNo, APPROVED, ACTION_PBG]);
      // const data4 = await vendorDetails(client, [poNo]);

      const response = await Promise.all(
        [
          getHrDetails(client, [poNo]),
          getSDBGApprovedFiles(client, [poNo, APPROVED, ACTION_SDBG]),
          getPBGApprovedFiles(client, [poNo, APPROVED, ACTION_PBG]),
          vendorDetails(client, [poNo]),
          getContractutalSubminissionDate(client, [poNo]),
          getActualSubminissionDate(client, [poNo])
        ]);

      let result = {
        hrDetais: response[0], //  getHrDetails,
        // sdbgFileDetais: response[1], // getSDBGApprovedFiles,
        // pbgDetails: response[2], //getPBGApprovedFiles,
        // vendorDetails: response[3], //vendorDetails
        // contractutalSubminissionDate: response[4], // getContractutalSubminissionDate
        // actualSubminissionDate: response[5], // getActualSubminissionDate
      }

      if (response[3][0]) {
        result = { ...result, ...response[3][0] };
      } if (response[1][0]) {
        result = { ...result, ...response[1][0] };
      } if (response[2][0]) {
        result = { ...result, ...response[2][0] };
      }

      if (response[4] && response[4][0]) {
        const con = response[4].find((el) => el.MID == MID_SDBG);
        result.c_sdbg_date = con?.PLAN_DATE;
      }
      if (response[5] && response[5][0]) {
        const act = response[5].find((el) => el.MID == parseInt(MID_SDBG));
        result.a_sdbg_date = act?.PLAN_DATE;
      }

      resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, result, "")

    } catch (error) {
      resSend(res, false, 500, Message.DATA_FETCH_ERROR, error.message, null);
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, false, 500, Message.DB_CONN_ERROR, error.message, null);
  }
}



const getData = async (req, res) => {
  try {
    const client = await poolClient();
    try {

      const { icgrnNo, type } = req.query;
      if (!type) {
        return resSend(res, true, 200, Message.MANDATORY_INPUTS_REQUIRED, "Please send a valid type!", null)
      }
      let data;
      let message;
      switch (type) {
        case 'igrn-value':
          if (!icgrnNo) {
            return resSend(res, true, 200, Message.MANDATORY_INPUTS_REQUIRED, "Please send a valid payload!", null)
          }
          const result = await getGrnIcgrnValue(client, req.body);
          console.log("result", result);

          data = result.data;
          message = result.message;
          break;
        case 'sir-value':
          if (!icgrnNo) {
            return resSend(res, true, 200, Message.MANDATORY_INPUTS_REQUIRED, "Please send a valid payload!", null)
          }
          break;

        default:
          console.log("swithch default");
          resSend(res, true, 200, Message.MANDATORY_INPUTS_REQUIRED, "Please send a valid type!", null)
          break;
      }
      console.log("swithch no");

      resSend(res, true, 200, message, data);

    } catch (error) {
      resSend(res, false, 500, Message.SERVER_ERROR, error.message, null);
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, false, 501, Message.DB_CONN_ERROR, error.message, null);
  }

}



module.exports = {
  submitBtnServiceHybrid,
  getWdcInfoServiceHybrid,
  initServiceHybrid,
  getData
};
