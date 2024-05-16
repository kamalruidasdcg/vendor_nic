const { query, connection } = require("../../config/dbConfig");
const { makeHttpRequest } = require("../../config/sapServerConfig");
const { INSERT } = require("../../lib/constant");
const { resSend } = require("../../lib/resSend");
const { APPROVED } = require("../../lib/status");
const { getEpochTime, getYyyyMmDd, generateQuery, generateQueryForMultipleData } = require("../../lib/utils");
const { filesData, advBillHybridbtnPayload, getSDBGApprovedFiles, getICGRNs, contractualSubmissionDate, actualSubmissionDate, dateToEpochTime } = require("../../services/btn.services");
const { create_btn_no } = require("../../services/po.services");
const Message = require("../../utils/messages");


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



module.exports = {
    submitAdvanceBillHybrid,
    getAdvBillHybridData
};
