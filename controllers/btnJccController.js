const { poolClient, poolQuery } = require("../config/pgDbConfig");
const { INSERT } = require("../lib/constant");
const { resSend } = require("../lib/resSend");
const { APPROVED, SUBMITTED_BY_VENDOR } = require("../lib/status");
const { EKPO, BTN_JCC } = require("../lib/tableName");
const { generateQuery } = require("../lib/utils");
const { jccPayloadObj } = require("../services/btnJcc.services");
const { vendorDetails, filesData, addToBTNList } = require("../services/btnServiceHybrid.services");
const { create_btn_no } = require("../services/po.services");
const Message = require("../utils/messages");


// api start //
const initJccData = async (req, res) => {

    try {
        const client = await poolClient();
        try {
            const { poNo } = req.query;
            if (!poNo) {
                return resSend(res, false, 200, "Please send PO No", Message.MANDATORY_INPUTS_REQUIRED, null);
            }
            const data = [poNo];
            const result = await vendorDetails(client, data);
            resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, result[0] || {}, "")

        } catch (error) {
            resSend(res, false, 500, Message.DATA_FETCH_ERROR, error.message, null);
        } finally {
            client.release();
        }
    } catch (error) {
        resSend(res, false, 500, Message.DB_CONN_ERROR, error.message, null);
    }
}

const submitJccBtn = async (req, res) => {

    try {
        const client = await poolClient();
        try {
            const filesPaylaod = req.files;
            const tempPayload = req.body;
            const tokenData = req.tokenData;

            // Check required fields
            // if (!JSON.parse(tempPayload.hsn_gstn_icgrn)) {
            //   return resSend(res, false, 200, "Please check HSN code, GSTIN, Tax rate is as per PO!", null, null);
            // }

            // Check required fields
            if (!tempPayload.invoice_value && !tempPayload.net_claim_amount) {
                return resSend(res, false, 200, Message.MANDATORY_PARAMETR_MISSING, "Invoice Value is missing!", null);
            }
            if (!tempPayload.purchasing_doc_no || !tempPayload.invoice_no || !tempPayload.jcc_number) {
                return resSend(res, false, 200, Message.MANDATORY_PARAMETR_MISSING, "JCC No/PO No/Invoice is missing!", null);
            }

            // check invoice number is already present in DB
            let check_invoice_q = `SELECT 
                                count(invoice_no) AS count 
                              FROM 
                                ${BTN_JCC} 
                              WHERE 
                                1 = 1 
                                AND vendor_code = $1 
                                AND ( invoice_no = $2  OR jcc_number = $3)`;

            let check_invoice = await poolQuery({ client, query: check_invoice_q, values: [tokenData.vendor_code, tempPayload.invoice_no, tempPayload.jcc_number] });


            if (check_invoice && check_invoice[0].count > 0) {
                return resSend(res, false, 200, "BTN is already created under the invoice number/wdc_number.", null, null);
            }
 

            /**
             * FILE PAYLOADS AND FILE VALIDATION
             */
            const uploadedFiles = filesData(filesPaylaod);
            console.log("uploadedFiles", uploadedFiles);

            // if (!uploadedFiles.pf_compliance_filename || !uploadedFiles.esi_compliance_filename) {
            //   return resSend(res, false, 200, Message.MANDATORY_INPUTS_REQUIRED, "Missing PF or ESI files", null);
            // }


            let payload = jccPayloadObj(tempPayload);
            // BTN NUMBER GENERATE
            const btn_num = await create_btn_no();

            // MATH Calculation
            const net_claim_amount = parseFloat(payload.net_claim_amount);


            // FINAL PAYLOAD FOR SERVICE BTN //

            payload = {
                ...payload, btn_num,
                ...uploadedFiles,
                net_claim_amount,
                created_by_id: tokenData.vendor_code,
                vendor_code: tokenData.vendor_code,
            }

            const net_payable_amount = net_claim_amount;

            const { q, val } = generateQuery(INSERT, BTN_JCC, payload);

            await poolQuery({ client, query: q, values: val });
            await addToBTNList(client, { ...payload, net_payable_amount, certifying_authority: payload.bill_certifing_authority }, SUBMITTED_BY_VENDOR);
            // serviceBtnMailSend(tokenData, { ...payload, status: SUBMITTED });
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


const getJccBtnData = async (req, res) => {
    try {
        const client = await poolClient();
        try {
            const { type } = req.query;
            if (!type) {
                return resSend(res, true, 200, Message.MANDATORY_INPUTS_REQUIRED, "Please send a valid type!", null)
            }
            let data;
            let message;
            let success = false;
            let statusCode;
            switch (type) {
                case 'jcc': {
                    const result = await getGrnIcgrnValue(client, req.query);
                    ({ data, message, success, statusCode } = result);
                }
                    break;
                case '': {
                    const result = await getServiceEntryValue(client, req.query);
                    console.log("result", result);
                    ({ data, message, success, statusCode } = result);
                }
                    break;
                case 'sbtn-details': {
                    const result = await getServiceBTNDetails(client, req.query);
                    console.log("result", result);
                    ({ data, message, success, statusCode } = result);
                }
                    break;

                default:
                    message = "Please send a valid type!"
                    return resSend(res, success, 200, "Please send a valid type!", Message.MANDATORY_INPUTS_REQUIRED, null);
            }
            resSend(res, success, statusCode, message, data);

        } catch (error) {
            resSend(res, false, 500, Message.SERVER_ERROR, error.message, null);
        } finally {
            client.release();
        }
    } catch (error) {
        resSend(res, false, 501, Message.DB_CONN_ERROR, error.message, null);
    }

}


const getJcc = async (req, res) => {
    try {
        const client = await poolClient();
        try {

            const { purchasing_doc_no, reference_no, type } = req.query;
            if (type === "list") {
                let wdcListQuery = `SELECT DISTINCT(reference_no) FROM wdc`;
                let condQuery = ' WHERE 1 = 1';
                // TO GET ONLY WDC .. NO JCC OR THERS
                const val = ['JCC'];
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
                SELECT jcc.*,
                    jcc.assigned_to AS certifying_by,
                    users.cname as certifying_by_name
                FROM
                    wdc AS jcc
                LEFT JOIN pa0002 AS users
                    ON(users.pernr :: character varying = jcc.assigned_to)
                WHERE (reference_no = $1 AND status = $2 AND action_type = $3) LIMIT 1`;

            let result = await poolQuery({ client, query: q, values: [reference_no, APPROVED, 'JCC'] });
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




module.exports = { submitJccBtn, initJccData, getJccBtnData, getJcc }
