
const { NEW_SDBG, MAKT, SDBG_PAYMENT_ADVICE, MSEG, MKPF, QALS, QAVE_TABLE } = require('../../lib/tableName');
const { connection } = require("../../config/dbConfig");
const { INSERT } = require("../../lib/constant");
const { responseSend, resSend } = require("../../lib/resSend");
const { generateQueryArray, generateQuery, generateInsertUpdateQuery, generateQueryForMultipleData } = require("../../lib/utils");
const { qalsPayload, qavePayloadFn } = require('../../services/sap.qa.services');
const { poolClient, poolQuery, getQuery } = require('../../config/pgDbConfig');
const Message = require("../../utils/messages");
const { ICGRN_DOC_FROM_SAP } = require('../../lib/event');
const { sendMail } = require('../../services/mail.services');

const qals = async (req, res) => {
    console.log("qalssss");
    try {
        const client = await poolClient();
        let tempPayload;
        if (req.body && Array.isArray(req.body)) {
            tempPayload = req.body.length > 0 ? req.body[0] : null;
        } else if (typeof req.body === 'object' && req.body) {
            tempPayload = req.body;
        }
        try {

            console.log("req.body", req.body);
            const { QAVE, ...payload } = tempPayload;

            if (!payload || !payload.PRUEFLOS) {
                return responseSend(res, "F", 400, Message.INVALID_PAYLOAD, null, null);
            }



            const payloadObj = await qalsPayload(payload);
            const qalsInsertQuery = await generateInsertUpdateQuery(payloadObj, QALS, ["PRUEFLOS"]);
            const response = await poolQuery({ client, query: qalsInsertQuery.q, values: qalsInsertQuery.val });
            let mailPayload = { ...payloadObj };
            if (QAVE && typeof QAVE === 'object' && Object.keys(QAVE)?.length) {
                const qavePayload = await qavePayloadFn(QAVE);
                mailPayload = { ...mailPayload, qavePayload };
                const qaveInsertQuery = await generateInsertUpdateQuery(qavePayload, QAVE_TABLE, ["PRUEFLOS", "KZART", "ZAEHLER"]);
                const resp = await poolQuery({ client, query: qaveInsertQuery.q, values: qaveInsertQuery.val });
            }

            handelMail(mailPayload);

            responseSend(res, "S", 200, Message.DATA_SEND_SUCCESSFULL, response, null);
        } catch (err) {
            console.log("data not inserted", err);
            responseSend(res, "F", 500, Message.SERVER_ERROR, err, null);
        } finally {
            client.release();
        }
    } catch (error) {
        responseSend(res, "F", 500, Message.DB_CONN_ERROR, error, null);
    }

};



async function handelMail(data) {

    try {
        let vendorAndDoDetails = getUserDetailsQuery('vendor_and_do', '$1');
        const mail_details = await getQuery({ query: vendorAndDoDetails, values: [data.EBELN] });
        const dataObj = { ...data, vendor_name: mail_details[0]?.u_name };
        console.log("dataObj", dataObj, mail_details);
        await sendMail(ICGRN_DOC_FROM_SAP, dataObj, { users: mail_details }, ICGRN_DOC_FROM_SAP);
    } catch (error) {
        console.log(error.toString(), error.stack);
    }
}



const qalsReport = async (req, res) => {
    console.log("qalssss");
    // try {
    // const client = await poolClient();
    // let payload;
    // if (req.body && Array.isArray(req.body)) {
    //     payload = req.body.length > 0 ? req.body[0] : null;
    // } else if (typeof req.body === 'object' && req.body) {
    //     payload = req.body;
    // }
    try {

        console.log("req.body", req.body);

        // if (!payload || !payload.PRUEFLOS) {
        //     responseSend(res, "0", 400, "Please send a valid payload.", null, null);
        // }

        if (!req.body.docNo) {
            return resSend(res, false, 200, Message.MANDATORY_PARAMETR, [], null);
        }



        let icgrnGetQuery = "";
        // `SELECT 
        // qals.PRUEFLOS as inspectionLotNumber,
        // qals.EBELN as purchasing_doc_no,
        // qals.EBELP as purchasing_doc_no_item,
        // ekko.AEDAT as purchasing_doc_date,
        // qals.MBLNR as docNo,
        // qals.BUDAT as docDate,
        // qals.LIFNR as suppplier,
        // vendor_table.LAND1 as vendorCountry,
        // vendor_table.NAME1 as vendorName,
        // vendor_table.ORT01 as vendorCity,
        // vendor_table.ORT02 as vendorDistrict,
        // vendor_table.PFACH as vendorPinCode,
        // qals.MATNR AS materialNumber,
        // makt.MAKTX as materialDesc,
        // qals.MATNR as material,
        // qals.PAENDTERM as endDate,
        // qals.PAENDZEIT as endTime,
        // qals.PS_PSP_PNR as wbsElement,
        // qals.BWART as momentType,
        // ekpo.MEINS as baseUnit,
        // qals.LMENGE01 as acceptedQty,
        // qals.LMENGE07 as rejectedQty,
        // qals.LMENGE01 as unrestrictedUseStock,
        // qals.LMENGEIST as supplyQuantity,
        // qals.LTEXTKZ as remarks,
        // qave.vcode as udCode,
        // qals.ENSTEHDAT as inspDate
        // FROM qals as qals 
        // LEFT JOIN lfa1 as vendor_table
        // 	ON( qals.LIFNR = vendor_table.LIFNR)
        // LEFT JOIN ekko as ekko
        // 	ON( qals.EBELN = ekko.EBELN)
        // LEFT JOIN qave as qave
        // 	ON( qals.PRUEFLOS = qave.prueflos)
        // LEFT JOIN makt as makt
        // 	ON ( makt.MATNR = qals.MATNR)
        // LEFT JOIN ekpo as ekpo
        // 	ON ( ekpo.EBELN = qals.EBELN AND ekpo.EBELP =  qals.EBELP AND ekpo.MATNR = qals.MATNR)
        // WHERE 1 = 1`;


        icgrnGetQuery = `
                SELECT 
                qals.PRUEFLOS as "inspectionLotNumber",
                qals.EBELN as "purchasing_doc_no",
                qals.EBELP as "purchasing_doc_no_item",
                ekko.AEDAT as "purchasing_doc_date",
                qals.MBLNR as "docNo",
                qals.BUDAT as "docdate",
                qals.LIFNR as "suppplier",
                vendor_table.LAND1 as "vendorCountry",
                vendor_table.NAME1 as "vendorName",
                vendor_table.ORT01 as "vendorCity",
                vendor_table.ORT02 as "vendorDistrict",
                vendor_table.PFACH as "vendorPinCode",
                qals.MATNR AS "materialNumber",
                makt.MAKTX as "materialDesc",
                qals.MATNR as "material",
                qals.PAENDTERM as "endDate",
                qals.PAENDZEIT as "endTime",
                qals.PS_PSP_PNR as "wbsElement",
                qals.BWART as "momentType",
                ekpo.MEINS as "baseUnit",
                qals.LMENGE01 as "acceptedQty",
                qals.LMENGE07 as "rejectedQty",
                qals.LMENGE01 as "unrestrictedUseStock",
                qals.LMENGEIST as "supplyQuantity",
                qals.LTEXTKZ as "remarks",
                qave.vcode as "udCode",
                qals.ENSTEHDAT as "inspDate",
                zmm_gate_entry_d.INVNO as "invoiceNo",
                zmm_gate_entry_d.INV_DATE as "invoiceDate",
                zmm_gate_entry_d.ENTRY_NO as "gateEntryNo",
                zmm_gate_entry_h.ENTRY_DATE as "gateEntryDate",
                zmm_gate_entry_h.ENTRY_TIME as "gateEntryTime"
                FROM qals as qals 
                LEFT JOIN lfa1 as vendor_table
                	ON( qals.LIFNR = vendor_table.LIFNR)
                LEFT JOIN ekko as ekko
                	ON( qals.EBELN = ekko.EBELN)
                LEFT JOIN qave as qave
                	ON( qals.PRUEFLOS = qave.prueflos)
                LEFT JOIN makt as makt
                	ON ( makt.MATNR = qals.MATNR)
                LEFT JOIN ekpo as ekpo
                	ON ( ekpo.EBELN = qals.EBELN AND ekpo.EBELP =  qals.EBELP AND ekpo.MATNR = qals.MATNR)
                LEFT JOIN  zmm_gate_entry_d as zmm_gate_entry_d
                	ON (zmm_gate_entry_d.ZMBLNR = qals.MBLNR)
                LEFT JOIN  zmm_gate_entry_h as zmm_gate_entry_h
                	ON (zmm_gate_entry_h.ENTRY_NO = zmm_gate_entry_d.ENTRY_NO) WHERE 1 = 1`;

        let count = 0;
        let val = []
        if (req.body.inspectionLotNumber) {
            icgrnGetQuery = icgrnGetQuery.concat(` AND qals.PRUEFLOS = $${++count}`);
            val.push(req.body.inspectionLotNumber);
        }
        if (req.body.docNo) {
            icgrnGetQuery = icgrnGetQuery.concat(` AND qals.MBLNR = $${++count}`);
            val.push(req.body.docNo)
        }
        if (req.body.purchasing_doc_no) {
            icgrnGetQuery = icgrnGetQuery.concat(` AND qals.EBELN = $${++count}`)
            val.push(req.body.purchasing_doc_no)
        }
        console.log("icgrnGetQuery", icgrnGetQuery);
        const response = await getQuery({ query: icgrnGetQuery, values: val });

        console.log("response", response);

        if (response && response.length) {

            const resp = response[0][0] || {};

            const obj = {
                purchasing_doc_no: resp.purchasing_doc_no,
                purchasing_doc_no_item: resp.purchasing_doc_no_item,
                purchasing_doc_date: resp.purchasing_doc_date,
                docNo: resp.docNo,
                docdate: resp.docdate,
                suppplier: resp.suppplier,
                vendorCountry: resp.vendorCountry,
                vendorName: resp.vendorName,
                vendorCity: resp.vendorCity,
                vendorDistrict: resp.vendorDistrict,
                vendorPinCode: resp.vendorPinCode,
                invoiceNo: resp.invoiceNo,
                invoiceDate: resp.invoiceDate,
                gateEntryNo: resp.gateEntryNo,
                gateEntryDate: resp.gateEntryDate,
                lineItems: response[0]

            }
            responseSend(res, "S", 200, Message.DATA_FETCH_SUCCESSFULL, obj, null);
        } else {
            responseSend(res, "S", 200, Message.NO_DATA_FOUND, {}, null);
        }

    } catch (err) {
        console.log("data not inserted", err);


        responseSend(res, "F", 500, Message.SERVER_ERROR, err, null);
    } finally {
        // await client.end();
    }
    // } catch (error) {
    //     responseSend(res, "F", 500, "DB CONN ERROR", error, null);
    // }

};



module.exports = { qals, qalsReport }