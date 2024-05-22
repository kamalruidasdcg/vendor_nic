const { query, connection } = require("../../config/dbConfig");
const { makeHttpRequest } = require("../../config/sapServerConfig");
const { INSERT } = require("../../lib/constant");
const { resSend } = require("../../lib/resSend");
const { APPROVED } = require("../../lib/status");
const { getEpochTime, getYyyyMmDd, generateQuery, generateQueryForMultipleData } = require("../../lib/utils");
const { filesData, advBillHybridbtnPayload, getSDBGApprovedFiles, getICGRNs, contractualSubmissionDate, actualSubmissionDate, dateToEpochTime, checkBTNRegistered, advBillHybridbtnDOPayload, getBTNInfo } = require("../../services/btn.services");
const { create_btn_no } = require("../../services/po.services");
const Message = require("../../utils/messages");
const { btnSaveToSap, timeInHHMMSS } = require("../btnControllers");


const submitAdvanceBillHybrid = async (req, res) => {

    console.log("submitAdvanceBillHybrid API");


    try {
        const client = await connection();

        try {
            let payload = req.body;
            const tokenData = req.tokenData;

            // Check required fields

            if (!payload) {
                return resSend(res, false, 400, "Invalid payload!", null, null);
            }
            // if (!JSON.parse(payload.hsn_gstn_icgrn)) {
            //     return resSend(res, false, 200, "Please check HSN code, GSTIN, Tax rate is as per PO!", null, null);
            // }
            if (!payload.invoice_value) {
                return resSend(res, false, 200, "Invoice Value is missing!", null, null);
            }
            if (!payload.purchasing_doc_no || !payload.invoice_no) {
                return resSend(res, false, 200, "Invoice Number is missing!", null, null);
            }

            let payloadFiles = req.files;
            const { associated_po } = payload;


            // BTN NUMBER GENERATE
            const btn_num = await create_btn_no("BTN");
            // UPLOAD FILES DATA
            const uploadedFiles = filesData(payloadFiles);

            // let credit_note;
            // let debit_note;

            // if (!debit_note || debit_note === "") {
            //     debit_note = 0;
            // }
            // if (!credit_note || credit_note === "") {
            //     credit_note = 0;
            // }

            // let net_claim_amount =
            //     parseFloat(invoice_value) +
            //     parseFloat(debit_note) +
            //     parseFloat(gst_rate) -
            //     parseFloat(credit_note);

            // CONTRACTUAL SUBMISSION DATA
            // const contDateSetup = await contractualSubmissionDate(payload.purchasing_doc_no, client);
            // console.log("contDateSetup", contDateSetup);
            // if (contDateSetup.status == false) {
            //     return resSend(res, false, 200, contDateSetup.msg, null, null);
            // }

            // ACTUAL SUMBISSION DATA
            // const actualDateSetup = await actualSubmissionDate(payload.purchasing_doc_no, client);
            // if (actualDateSetup.status == false) {
            //     return resSend(res, false, 200, contDateSetup.msg, null, null);
            // }

            // ADDING EXTRA DATA IN PAYLOAD
            payload = {
                ...payload,
                ...uploadedFiles,
                btn_num,
                vendor_code: tokenData.vendor_code,
                created_at: getEpochTime()
            };

            // PAYLOAD DATA
            const btnPayload = await advBillHybridbtnPayload(payload, 'advance-bill-hybrid');
            // GENERATE QUERY, DATA AND SAVE
            const btnQuery = generateQuery(INSERT, 'btn_advance_bill_hybrid', btnPayload);
            const result1 = await client.execute(btnQuery.q, btnQuery.val);
            let associated_po_arr = [];
            if (associated_po && Array.isArray(associated_po)) {
                associated_po_arr = associated_po.map((ele) => ({
                    ...btnPayload,
                    purchasing_doc_no: ele
                }));

                const multipledataInsert = await generateQueryForMultipleData(associated_po_arr, 'btn_advance_bill_hybrid', 'id');
                const result2 = await client.execute(multipledataInsert);
            }

            resSend(res, true, 200, Message.DATA_SEND_SUCCESSFULL, {}, null)


        } catch (error) {

            resSend(res, false, 500, Message.SERVER_ERROR, JSON.stringify(error), null)

        } finally {
            await client.end();
        }
    } catch (error) {
        resSend(res, false, 500, Message.DB_CONN_ERROR, null, null)
    }

}



const getAdvBillHybridData = async (req, res) => {

    const client = await connection();
    try {
        const payload = req.body;

        if (!payload.poNo) {
            return resSend(res, false, 400, Message.MANDATORY_PARAMETR, null, null);
        }

        let baseQuery =
            `SELECT 
                ekko.ebeln AS purchasing_doc_no, 
                ekko.lifnr AS vendor_code,
                lfa1.name1 AS vendor_name,
                actualsubmissiondate.milestonetext AS milestonetext,
                actualsubmissiondate.actualsubmissiondate AS a_sdbg_sub_date,
                zpo_milestone.plan_date AS c_sdbg_sub_date
            FROM ekko	AS ekko
                LEFT JOIN lfa1 AS lfa1
                    ON( lfa1.LIFNR = ekko.LIFNR)
                LEFT JOIN zpo_milestone AS zpo_milestone
                    ON(zpo_milestone.EBELN = ekko.EBELN  AND zpo_milestone.MID = '1')
                LEFT JOIN actualsubmissiondate AS actualsubmissiondate
                    ON(actualsubmissiondate.purchasing_doc_no = ekko.EBELN  AND actualsubmissiondate.milestoneId = '1')`;

        let conditionQuery = " WHERE 1 = 1 ";
        const valueArr = [];

        if (payload.poNo) {
            conditionQuery += " AND ekko.EBELN = ?";
            valueArr.push(payload.poNo);
        }

        const advBillReqDataQuery = baseQuery + conditionQuery;
        // let results = await query({ query: advBillReqDataQuery, values: valueArr });
        let [results] = await client.execute(advBillReqDataQuery, valueArr);

        console.log("results", results);

        const data = await getSDBGApprovedFiles(payload.poNo, client);

        console.log("res", data);

        if (results && results.length) {
            results = results.map((el) => ({ ...el, c_sdbg_sub_date: dateToEpochTime(el.c_sdbg_sub_date) }));
        }

        if (results && results.length && data && data.length) {
            results = results.map((el) => ({ ...el, c_sdbg_filename: data[0].file_name, c_sdbg_file_path: data[0].file_path, }));
        }

        console.log("jhjklk", advBillReqDataQuery, valueArr);

        resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, results, null)

    } catch (error) {
        resSend(res, false, 500, Message.DB_CONN_ERROR, JSON.stringify(error), null)
    }
    finally {
        client.end();
    }

}



const submitAdvBillBTNByDO = async (req, res) => {

    try {
        const client = await connection();
        try {
            let payload = req.body;
            const tokenData = req.tokenData;
            // Check required fields
            if (!payload.btn_num) {
                return resSend(res, false, 200, "BTN number is missing!", null, null);
            }
            if (!payload.net_payable_amount) {
                return resSend(res, false, 200, "Net payable is missing!", null, null);
            }


            // Check BTN by BTN Number
            let checkBTNR = await checkBTNRegistered(payload.btn_num, 'btn_advance_bill_hybrid_do', client);
            if (checkBTNR) {
                return resSend(res, false, 200, "BTN is already submitted!", null, null);
            }

            payload = {
                ...payload,
                created_by: tokenData.vendor_code,
                created_at: getEpochTime(),
            }

            const btnPayload = await advBillHybridbtnDOPayload(payload);
            console.log("btnPayload", btnPayload);
            const btnQuery = generateQuery(INSERT, 'btn_advance_bill_hybrid_do', btnPayload);
            console.log("btnQuery", btnQuery);
            const [results] = await client.execute(btnQuery.q, btnQuery.val);
            console.log("resultsresultsresults", results);
            let btnInfo = await getBTNInfo(payload.btn_num, 'btn_advance_bill_hybrid', client);

            console.log("result: " + JSON.stringify(btnInfo));


            const btn_payload = {
                ZBTNO: payload.btn_num, // BTN Number
                ERDAT: getYyyyMmDd(getEpochTime()), // BTN Create Date
                ERZET: timeInHHMMSS(), // 134562,  // BTN Create Time
                ERNAM: tokenData.vendor_code, // Created Person Name
                LAEDA: "", // Not Needed
                AENAM: btnInfo[0].vendor_name, // Vendor Name
                LIFNR: btnInfo[0].vendor_code, // Vendor Codebtn_v2
                ZVBNO: btnInfo[0]?.invoice_no, // Invoice Number
                EBELN: btnInfo[0]?.purchasing_doc_no, // PO Number
                DPERNR1: payload.assigned_to, // assigned_to
                DSTATUS: "4", // sap deparment forword status
                ZRMK1: "Forwared To Finance", // REMARKS
            };
            console.log("result", results);
            console.log("btn_payload", btn_payload);
            if (results.affectedRows) {
                // btnSaveToSap(btn_payload);
                return resSend(res, true, 200, "BTN has been updated!", null, null);
            } else {
                return resSend(res, false, 200, JSON.stringify(results), null, null);
            }

        } catch (error) {
            resSend(res, false, 500, Message.SERVER_ERROR, JSON.stringify(error), null)
        } finally {
            await client.end();
        }

    } catch (error) {
        resSend(res, false, 500, Message.DB_CONN_ERROR, null, null)
    }
};


const getAdvBillHybridDataForDO = async (req, res) => {

    try {
        const client = await connection();


        try {
            const payload = req.body;

            if (!payload.btn_num && !payload.poNo) {
                return resSend(res, false, 400, Message.MANDATORY_PARAMETR, null, null);
            }

            let baseQuery = `SELECT * FROM btn_advance_bill_hybrid`;

            let conditionQuery = " WHERE 1 = 1 ";
            const valueArr = [];

            if (payload.btn_num) {
                conditionQuery += " AND btn_num = ?";
                valueArr.push(payload.btn_num);
            }
            if (payload.poNo) {
                conditionQuery += " AND purchasing_doc_no = ?";
                valueArr.push(payload.poNo);
            }

            const advBillReqDataQuery = baseQuery + conditionQuery;
            let contractualDates = `SELECT plan_date as c_milestone_date, mtext as c_milestone_text, mid as m_id FROM zpo_milestone WHERE EBELN = ?`;
            let actualDates = `SELECT actualsubmissiondate AS a_submisson_date, milestoneText AS a_submisson_text, milestoneid as m_id FROM actualsubmissiondate WHERE purchasing_doc_no = ?`;

            // let [results] = await client.execute(advBillReqDataQuery, valueArr);
            // let [results] = await client.execute(contractualDates, [payload.poNo]);
            // let [results] = await client.execute(actualDates, [payload.poNo]);

            let result = {};

            // await Promise.all(
            //     [client.execute(advBillReqDataQuery, valueArr),
            //     client.execute(contractualDates, [payload.poNo]),
            //     client.execute(actualDates, [payload.poNo])
            //     ])

            const [results] = await client.execute(advBillReqDataQuery, valueArr);

            console.log("results", results);


            // CONTRACTUAL SUBMISSION DATA
            const contDateSetup = await contractualSubmissionDate(payload.poNo, client);
            console.log("contDateSetup", contDateSetup);
            // if (contDateSetup.status == false) {
            //     return resSend(res, false, 200, contDateSetup.msg, null, null);
            // }

            // ACTUAL SUMBISSION DATA
            const actualDateSetup = await actualSubmissionDate(payload.poNo, client);
            // if (actualDateSetup.status == false) {
            //     return resSend(res, false, 200, contDateSetup.msg, null, null);
            // }


            result = {
                ...results[0],
                ...contDateSetup.data,
                ...actualDateSetup.data,

            }

            console.log("result", result);

            resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, result, null);

        } catch (error) {
            resSend(res, false, 500, Message.SERVER_ERROR, JSON.stringify(error), null);
        }
        finally {
            client.end();
        }
    }
    catch (error) {
        resSend(res, false, 500, Message.DB_CONN_ERROR, JSON.stringify(error), null);
    }
}


const getAdvBillHybridBTN = async (req, res) => {

    const client = await connection();
    try {
        const payload = req.body;

        if (!payload.btn_num) {
            return resSend(res, false, 400, Message.MANDATORY_PARAMETR, null, null);
        }

        let baseQuery =
            `SELECT * FROM btn_advance_bill_hybrid`;

        let conditionQuery = " WHERE 1 = 1 ";
        const valueArr = [];

        if (payload.btn_num) {
            conditionQuery += " AND btn_num  = ?";
            valueArr.push(payload.btn_num);
        }

        const advBillReqDataQuery = baseQuery + conditionQuery;
        // let results = await query({ query: advBillReqDataQuery, values: valueArr });
        let [results] = await client.execute(advBillReqDataQuery, valueArr);

        console.log("results", results);


        resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, results, null)

    } catch (error) {
        resSend(res, false, 500, Message.DB_CONN_ERROR, JSON.stringify(error), null)
    }
    finally {
        client.end();
    }

}







module.exports = {
    submitAdvanceBillHybrid,
    getAdvBillHybridData,
    submitAdvBillBTNByDO,
    getAdvBillHybridDataForDO,
    getAdvBillHybridBTN
};
