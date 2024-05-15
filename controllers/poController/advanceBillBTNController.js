const { query, connection } = require("../../config/dbConfig");
const { makeHttpRequest } = require("../../config/sapServerConfig");
const {INSERT } = require("../../lib/constant");
const { resSend } = require("../../lib/resSend");
const { APPROVED } = require("../../lib/status");
const { getEpochTime, getYyyyMmDd, generateQuery, generateQueryForMultipleData } = require("../../lib/utils");
const { filesData, advBillHybridbtnPayload, getSDBGApprovedFiles, getICGRNs, contractualSubmissionDate, actualSubmissionDate } = require("../../services/btn.services");
const { create_btn_no } = require("../../services/po.services");
const Message = require("../../utils/messages");


const submitAdvanceBillHybrid = async (req, res) => {

    console.log("submitAdvanceBillHybrid API");


    try {
        const promiseConnection = await connection();

        try {
            let payload = req.body;
            const tokenData = req.tokenData;

            // Check required fields
            if (!payload) {
                return resSend(res, false, 400, "Invalid payload!", null, null);
            }
            if (!JSON.parse(payload.hsn_gstn_icgrn)) {
                return resSend(res, false, 200, "Please check HSN code, GSTIN, Tax rate is as per PO!", null, null);
            }
            if (!payload.invoice_value) {
                return resSend(res, false, 200, "Invoice Value is missing!", null, null);
            }
            if (!payload.purchasing_doc_no || !payload.invoice_no) {
                return resSend(res, false, 200, "Invoice Number is missing!", null, null);
            }

            let payloadFiles = req.files;
            const { associated_po } = payload;
            // GET Approved SDBG by PO Number
            // let sdbg_filename_result = await getSDBGApprovedFiles(purchasing_doc_no);

            // // GET GRN Number by PO Number
            // let grn_nos = await getGRNs(purchasing_doc_no);

            // GET ICGRN Value by PO Number
            // let icgrn_total = await getICGRNs({ purchasing_doc_no, invoice_no });

            // icgrn_total = icgrn_total.total_icgrn_value;




            const btn_num = await create_btn_no("BTN");

            console.log("btn_num", btn_num);

            const uploadedFiles = filesData(payloadFiles);

            console.log("uploadedFiles", uploadedFiles);

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


            const contDateSetup = await contractualSubmissionDate(payload.purchasing_doc_no);

            if (contDateSetup.status == false) {
                return resSend(res, false, 200, contDateSetup.msg, null, null);
            }
            const actualDateSetup = await actualSubmissionDate(payload.purchasing_doc_no);

            if (actualDateSetup.status == false) {
                return resSend(res, false, 200, contDateSetup.msg, null, null);
            }




            payload = {
                ...payload,
                ...uploadedFiles,
                ...contDateSetup.data,
                ...actualDateSetup.data,
                btn_num,
                vendor_code: tokenData.vendor_code,
                created_at: getEpochTime()
            };
            const btnPayload = await advBillHybridbtnPayload(payload, 'advance-bill-hybrid');
            const btnQuery = generateQuery(INSERT, 'btn', btnPayload);
            const result1 = await promiseConnection.execute(btnQuery.q, btnQuery.val);
            console.log("btnQuery", btnQuery, result1);
            let associated_po_arr = [];
            if (associated_po && Array.isArray(associated_po)) {
                associated_po_arr = associated_po.map((ele) => ({
                    ...btnPayload,
                    purchasing_doc_no: ele
                }));

                const multipledataInsert = await generateQueryForMultipleData(associated_po_arr, 'btn', 'id');
                const result2 = await promiseConnection.execute(multipledataInsert);
            }





            resSend(res, true, 200, Message.DATA_SEND_SUCCESSFULL, "", null)


        } catch (error) {

            resSend(res, false, 500, Message.SERVER_ERROR, JSON.stringify(error), null)

        } finally {
            const connEnd = await promiseConnection.end();
        }
    } catch (error) {
        resSend(res, false, 500, Message.DB_CONN_ERROR, null, null)
    }

}

module.exports = {
    submitAdvanceBillHybrid
};
