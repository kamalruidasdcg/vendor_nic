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
} = require("../utils/btnUtils");
const { checkTypeArr } = require("../utils/smallFun");

const submitBtnServiceHybrid = async (req, res) => {
  resSend(res,false,200,"dd!",req.body,null);
};



module.exports = {
  submitBtnServiceHybrid,
};
