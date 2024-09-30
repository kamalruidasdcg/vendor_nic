const { poolClient, poolQuery } = require("../config/pgDbConfig");
const { INSERT, UPDATE } = require("../lib/constant");
const { resSend } = require("../lib/resSend");
const { APPROVED, SUBMITTED_BY_VENDOR, SUBMITTED_BY_CAUTHORITY, STATUS_RECEIVED, REJECTED, SUBMITTED, UPDATED } = require("../lib/status");
const { EKPO, BTN_JCC, BTN_ASSIGN, BTN_JCC_CERTIFY_AUTHORITY } = require("../lib/tableName");
const { generateQuery, generateInsertUpdateQuery, getEpochTime } = require("../lib/utils");
const { jccPayloadObj, jccBtnforwordToFinacePaylaod, jccBtnbtnAssignPayload } = require("../services/btnJcc.services");
const { vendorDetails, filesData, addToBTNList, getLatestBTN, serviceBtnMailSend } = require("../services/btnServiceHybrid.services");
const { create_btn_no } = require("../services/po.services");
const { btnSubmitToSAPF01, btnSubmitToSAPF02 } = require("../services/sap.btn.services");
const Message = require("../utils/messages");
const { btnCurrentDetailsCheck } = require("./btnControllers");


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
            serviceBtnMailSend(tokenData, { ...payload, status: SUBMITTED });
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


const jccBtnforwordToFinace = async (req, res) => {

    try {
        const client = await poolClient();
        try {
            await client.query("BEGIN");
            let payload = req.body;
            const tokenData = req.tokenData;

            console.log("payload", payload);


            // BTN VALIDATION
            if (!payload.btn_num) {
                return resSend(res, false, 400, Message.MANDATORY_PARAMETR_MISSING, "btn num  missing", null);
            }
            const btnCurrnetStatus = await btnCurrentDetailsCheck(client, { btn_num: payload.btn_num });
            if (btnCurrnetStatus.isInvalid) {
                return resSend(res, false, 200, `BTN ${payload.btn_num} ${btnCurrnetStatus.message}`, payload.btn_num, null
                );
            }

            if (payload.status === REJECTED) {
                const response1 = await btnReject(payload, tokenData, client);
                await client.query("COMMIT");
                return resSend(res, true, 200, "Rejected successfully !!", response1, null);
            }

            if (!payload.recomend_payment || !payload.net_payable_amount || !payload.assign_to || !payload.purchasing_doc_no) {
                return resSend(res, false, 400, Message.MANDATORY_PARAMETR_MISSING, "Entry_no or net_payable_amount assign_to_fi missing", null);
            }
            const btnChkQuery = `SELECT COUNT(*) from btn_service_hybrid WHERE btn_num = $1 AND bill_certifing_authority = $2`;
            const validAuthrityCheck = await poolQuery({ client, query: btnChkQuery, values: [payload.btn_num, tokenData.vendor_code] });
            if (!parseInt(validAuthrityCheck[0]?.count)) {
                return resSend(res, false, 200, "You are not authorised!", Message.YOU_ARE_UN_AUTHORIZED, null);
            }





            //  BTN FINANCE AUTHORITY DATA INSERT
            payload.created_by_id = tokenData.vendor_code;
            const financePaylad = jccBtnforwordToFinacePaylaod (payload);
            const { q, val } = generateQuery(INSERT, BTN_JCC_CERTIFY_AUTHORITY, financePaylad);
            const response = await poolQuery({ client, query: q, values: val });

            // BTN ASSIGN BY FINANCE AUTHORITY  
            const btnAssignPaylaod = jccBtnbtnAssignPayload({ ...payload, assign_by: tokenData.vendor_code });
            const assingPayload = await generateInsertUpdateQuery(btnAssignPaylaod, BTN_ASSIGN, ['btn_num', 'purchasing_doc_no']);
            await poolQuery({ client, query: assingPayload.q, values: assingPayload.val });

            // ADDING TO BTN LIST WITH CURRENT STATUS
            const latesBtnData = await getLatestBTN(client, payload);
            // await addToBTNList(client, { ...latesBtnData, ...payload, }, STATUS_RECEIVED);
            await addToBTNList(client, { ...latesBtnData, ...payload, }, SUBMITTED_BY_CAUTHORITY);
            // const sendSap = true; //await btnSubmitByDo({ btn_num, purchasing_doc_no, assign_to }, tokenData);
            const sendSap = await btnSubmitToSAPF01(payload, tokenData);

            if (sendSap == false) {
                console.log(sendSap);
                await client.query("ROLLBACK");
                return resSend(res, false, 200, `SAP not connected.`, null, null);
            } else if (sendSap == true) {
                await client.query("COMMIT");
                resSend(res, true, 200, Message.DATA_SEND_SUCCESSFULL, response, "")
                serviceBtnMailSend(tokenData, { ...payload, status: SUBMITTED_BY_CAUTHORITY });

            }

        } catch (error) {
            console.log("error", error.message);
            await client.query("ROLLBACK");
            resSend(res, false, 500, Message.SOMTHING_WENT_WRONG, error.message, null);
        } finally {
            client.release();
        }
    } catch (error) {
        resSend(res, false, 500, Message.DB_CONN_ERROR, error.message, null);
    }

}
/**
 * BTN DATA SEND TO SAP SERVER WHEN BTN SUBMIT BY FINNANCE STAFF
 * @param {Object} btnPayload
 * @param {Object} tokenData
 */

const jccBtnAssignToFiStaff = async (req, res) => {
    try {
        const client = await poolClient();
        await client.query("BEGIN");
        try {
            const { btn_num, purchasing_doc_no, assign_to_fi } = req.body;
            const tokenData = { ...req.tokenData };

            if (!btn_num || !purchasing_doc_no || !assign_to_fi) {
                return resSend(res, false, 200, "Assign To is the mandatory!", Message.MANDATORY_PARAMETR_MISSING, null);
            }

            const btnCurrnetStatus = await btnCurrentDetailsCheck(client, {
                btn_num,
                status: STATUS_RECEIVED,
            });
            if (btnCurrnetStatus.isInvalid) {
                return resSend(res, false, 200, `BTN ${btn_num} ${btnCurrnetStatus.message}`, btn_num, null
                );
            }

            const assign_q = `SELECT * FROM ${BTN_ASSIGN} WHERE btn_num = $1 and last_assign = $2`;
            let assign_fi_staff_v = await poolQuery({ client, query: assign_q, values: [btn_num, true] });
            if (!checkTypeArr(assign_fi_staff_v)) {
                return resSend(res, false, 200, "You're not authorized to perform the action!", null, null);
            }

            const whereCon = { btn_num: btn_num };
            const payload = {
                assign_by_fi: tokenData?.vendor_code,
                assign_to_fi: assign_to_fi,
                last_assign_fi: true,
            };

            let { q, val } = generateQuery(UPDATE, BTN_ASSIGN, payload, whereCon);
            let resp = await poolQuery({ client, query: q, values: val });
            console.log("resp", resp);

            let btn_list_q = ` SELECT * FROM btn_list WHERE btn_num = $1 
                            AND purchasing_doc_no = $2
                            AND status = $3
                          ORDER BY created_at DESC`;
            let btn_list = await poolQuery({ client, query: btn_list_q, values: [btn_num, purchasing_doc_no, SUBMITTED_BY_VENDOR] });

            console.log("btn_list", btn_list);

            if (!btn_list.length) {
                return resSend(res, false, 200, "Vendor have to submit BTN first.", btn_list, null);
            }

            let data = {
                btn_num,
                purchasing_doc_no,
                net_claim_amount: btn_list[0]?.net_claim_amount,
                net_payable_amount: btn_list[0]?.net_payable_amount,
                vendor_code: tokenData.vendor_code,
                created_at: getEpochTime(),
                btn_type: btn_list[0]?.btn_type,
            };

            let result = await addToBTNList(client, data, STATUS_RECEIVED);

            // const sendSap = true; //btnSaveToSap({ ...req.body, ...payload }, tokenData);
            const sendSap = await btnSubmitToSAPF02({ ...req.body, ...payload }, tokenData);
            if (sendSap == false) {
                await client.query("ROLLBACK");
                return resSend(res, false, 200, `SAP not connected.`, null, null);
            } else if (sendSap == true) {
                await client.query("COMMIT");
                // TO DO EMAIL
                serviceBtnMailSend(tokenData, { ...req.body, ...payload, status: STATUS_RECEIVED });
                resSend(res, true, 200, "Finance Staff has been assigned!", null, null);
            }

        } catch (error) {
            console.log("data not inserted", error.message);
            resSend(res, false, 500, Message.SERVER_ERROR, error.message, null);
        } finally {
            client.release();
        }
    } catch (error) {
        resSend(res, true, 500, Message.DB_CONN_ERROR, error.message, null);
    }
};

async function btnReject(data, tokenData, client) {
    try {
        const obj = { btn_num: data.btn_num };

        await updateServiceBtnListTable(client, data);

        // const sendSap = true; // await btnSubmitToSAPF01({ ...data, assign_to: null }, tokenData);
        const sendSap = await btnSubmitToSAPF01({ ...data, assign_to: null }, tokenData);

        if (sendSap == false) {
            throw new Error("SAP not connected.");
        } else if (sendSap == true) {
            serviceBtnMailSend(tokenData, data, BTN_REJECT);
            // resSend(res, true, 200, "Finance Staff has been assigned!", null, null);
        }
        return { btn_num: data.btn_num };
    } catch (error) {
        throw error;
    }
}



module.exports = { submitJccBtn, initJccData, getJccBtnData, getJcc, jccBtnAssignToFiStaff, jccBtnforwordToFinace }
