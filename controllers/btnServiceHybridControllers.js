const { query } = require("../config/dbConfig");
const {
  C_SDBG_DATE,
  C_DRAWING_DATE,
  C_QAP_DATE,
  C_ILMS_DATE,
  A_SDBG_DATE,
  A_DRAWING_DATE,
  A_QAP_DATE,
  A_ILMS_DATE,
} = require("../lib/constant");
const { resSend } = require("../lib/resSend");
const { APPROVED } = require("../lib/status");
const { create_btn_no } = require("../services/po.services");
const {
  getSDBGApprovedFiles,
  getGRNs,
  getICGRNs,
  getGateEntry,
  getPBGApprovedFiles,
  checkBTNRegistered,
  getBTNInfo,
  getBTNInfoDO,
  getVendorCodeName,
} = require("../utils/btnUtils");

const { checkTypeArr } = require("../utils/smallFun");

const getBTNDataServiceHybrid = async (req, res) => {
  try {
    const { id } = req.query;
    // GET Contractual Dates from other Table
    let c_sdbg_date;
    let c_drawing_date;
    let c_qap_date;
    let c_ilms_date;
    let c_sdbg_date_q = `SELECT PLAN_DATE, MTEXT FROM zpo_milestone WHERE EBELN = ?`;
    let c_dates = await query({
      query: c_sdbg_date_q,
      values: [id],
    });
    checkTypeArr(c_dates) &&
      c_dates.forEach((item) => {
        if (item.MTEXT === C_SDBG_DATE) {
          c_sdbg_date = item.PLAN_DATE;
        } else if (item.MTEXT === C_DRAWING_DATE) {
          c_drawing_date = item.PLAN_DATE;
        } else if (item.MTEXT === C_QAP_DATE) {
          c_qap_date = item.PLAN_DATE;
        } else if (item.MTEXT === C_ILMS_DATE) {
          c_ilms_date = item.PLAN_DATE;
        }
      });

    // GET Actual Dates from other Table
    let a_sdbg_date;
    let a_drawing_date;
    let a_qap_date;
    let a_ilms_date;
    let a_sdbg_date_q = `SELECT actualSubmissionDate AS PLAN_DATE, milestoneText AS MTEXT FROM actualsubmissiondate WHERE purchasing_doc_no = ?`;
    let a_dates = await query({
      query: a_sdbg_date_q,
      values: [id],
    });
    checkTypeArr(a_dates) &&
      a_dates.forEach((item) => {
        if (item.MTEXT === A_SDBG_DATE) {
          a_sdbg_date = item.PLAN_DATE;
        } else if (item.MTEXT === A_DRAWING_DATE) {
          a_drawing_date = item.PLAN_DATE;
        } else if (item.MTEXT === A_QAP_DATE) {
          a_qap_date = item.PLAN_DATE;
        } else if (item.MTEXT === A_ILMS_DATE) {
          a_ilms_date = item.PLAN_DATE;
        }
      });

    let obj = {
      c_sdbg_date,
      c_drawing_date,
      c_qap_date,
      c_ilms_date,
      a_sdbg_date,
      a_drawing_date,
      a_qap_date,
      a_ilms_date,
    };

    // GET Approved SDBG by PO Number
    let sdbg_filename_result = await getSDBGApprovedFiles(id);

    if (checkTypeArr(sdbg_filename_result)) {
      obj = { ...obj, sdbg_filename: sdbg_filename_result };
    }

    // GET gate by PO Number
    let gate_entry = await getGateEntry(id);
    if (gate_entry) {
      obj = { ...obj, gate_entry };
    }
    console.log("gate_entry", gate_entry);

    // GET GRN Number by PO Number
    let grn_nos = await getGRNs(id);
    if (checkTypeArr(grn_nos)) {
      obj = { ...obj, grn_nos };
    }

    // GET GRN Number by PO Number
    let icgrn_nos = await getICGRNs(id);
    if (icgrn_nos) {
      obj = { ...obj, icgrn_nos };
    }

    // GET Approved SDBG by PO Number
    let pbg_filename_result = await getPBGApprovedFiles(id);
    console.log(pbg_filename_result);

    if (checkTypeArr(pbg_filename_result)) {
      obj = { ...obj, pbg_filename: pbg_filename_result };
    }
    
  // get vendor Info
  obj = { ...obj, vendor : await getVendorCodeName(id)};

    // get WDC Info
  //  obj = { ...obj, vendor : await getWdcInfo(id)};

    resSend(res, true, 200, "Succesfully fetched all data!", obj, null);
  } catch (error) {
    console.error(error);
    resSend(
      res,
      false,
      200,
      "Something went wrong when fetching the dates!",
      null,
      null
    );
  }
};
//
const getWdcInfoServiceHybrid = async (req, res) => {
  try {
      const { reference_no } = req.query;

      const q = `SELECT file_name,file_path,actual_start_date,actual_completion_date FROM wdc WHERE reference_no = ? LIMIT 1`;
      let result = await query({
          query: q,
          values: [reference_no],
        });
        if( result.length) {
          resSend(res, true, 200, "Succesfully fetched all data!", result[0], null);
        } else {
          resSend(res, false, 200, "No record found from the WDC no!", null, null);
        }
     
  } catch (error) {
    console.error(error);
    resSend(res, false, 200, "Something went wrong when fetching the WDC dates!", null, null);
  }


};

const submitBtnServiceHybrid = async (req, res) => {
  resSend(res,false,200,"dd!",req.body,null);
};



module.exports = {
  submitBtnServiceHybrid,
  getBTNDataServiceHybrid,
  getWdcInfoServiceHybrid
};
