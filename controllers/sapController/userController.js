
const { RESERVATION_RKPF_TABLE, RESERVATION_RESB_TABLE, SERVICE_ENTRY_TABLE_SAP } = require('../../lib/tableName');
const { connection, query } = require("../../config/dbConfig");
const { responseSend, resSend } = require("../../lib/resSend");
const { generateInsertUpdateQuery, generateQueryForMultipleData } = require("../../lib/utils");
const { reservationLineItemPayload, reservationHeaderPayload, serviceEntryPayload } = require('../../services/sap.user.services');
const { TRUE, FALSE } = require('../../lib/constant');

// PAYLOAD //

const reservation = async (req, res) => {
    let payload = {};

    try {
        const promiseConnection = await connection();
        let transactionSuccessful = false;
        if (Array.isArray(req.body)) {
            payload = req.body.length > 0 ? req.body[0] : null;
        } else if (typeof req.body === 'object' && req.body !== null) {
            payload = req.body;
        }
        const { TAB_RESB, ...obj } = payload;

        console.log("TAB_RESB", TAB_RESB);
        console.log("obj", obj);

        try {

            if (!obj || typeof obj !== 'object' || !Object.keys(obj).length || !obj.RSNUM) {
                return responseSend(res, "F", 400, "INVALID PAYLOAD", null, null);
            }
            await promiseConnection.beginTransaction();

            try {
                const rkpfPayload = await reservationHeaderPayload(obj);
                const rkpfTableInsert = await generateInsertUpdateQuery(rkpfPayload, RESERVATION_RKPF_TABLE, "RSNUM");
                console.log("rkpfTableInsert", rkpfTableInsert);
                const [results] = await promiseConnection.execute(rkpfTableInsert);
                console.log("results", results);
            } catch (error) {
                return responseSend(res, "F", 502, "Data insert failed !!", error, null);
            }

            if (TAB_RESB?.length) {
                try {
                    const resbPayload = await reservationLineItemPayload(TAB_RESB);
                    console.log('ekpopayload', resbPayload);
                    const insert_resb_table = await generateQueryForMultipleData(resbPayload, RESERVATION_RESB_TABLE, "C_PKEY");
                    const [results] = await promiseConnection.execute(insert_resb_table);
                    console.log("results", results);

                } catch (error) {
                    console.log("error, resb milestone", error);
                }
            }

            const comm = await promiseConnection.commit(); // Commit the transaction if everything was successful
            transactionSuccessful = true;

        } catch (error) {
            responseSend(res, "F", 502, "Data insert failed !!", error, null);
        }
        finally {
            if (transactionSuccessful === FALSE) {
                console.log("transactionSuccessful End" + "--->", transactionSuccessful);
                await promiseConnection.rollback();
            }
            const connEnd = await promiseConnection.end();

            if (transactionSuccessful === TRUE) {
                responseSend(res, "S", 200, "data insert succeed", null, null);
            }

            console.log("Connection End" + "--->" + "connection relaease reservation");
        }
    } catch (error) {
        responseSend(res, "F", 400, "Error in database conn!!", error, null);
    }
};
const serviceEntry = async (req, res) => {
    let payload = [];

    try {
        const promiseConnection = await connection();
        let transactionSuccessful = false;
        // console.log("payload", req.body);
        if (Array.isArray(req.body)) {
            payload = req.body;
        } else if (typeof req.body === 'object' && req.body !== null) {
            payload.push(req.body);
        }

        console.log("payload...", payload);

        try {
            await promiseConnection.beginTransaction();
            const essrPayload = await serviceEntryPayload(payload);
            const essrTableInsert = await generateQueryForMultipleData(essrPayload, SERVICE_ENTRY_TABLE_SAP, "lblni");
            console.log("essrTableInsert", essrTableInsert);
            const [results] = await promiseConnection.execute(essrTableInsert);
            console.log("results", results);
            const comm = await promiseConnection.commit(); // Commit the transaction if everything was successful
            transactionSuccessful = true;

        } catch (error) {
            responseSend(res, "F", 502, "Data insert failed !!", error, null);
        }
        finally {
            if (transactionSuccessful === FALSE) {
                console.log("transactionSuccessful End" + "--->", transactionSuccessful);
                await promiseConnection.rollback();
            }
            const connEnd = await promiseConnection.end();

            if (transactionSuccessful === TRUE) {
                responseSend(res, "S", 200, "data insert succeed", null, null);
            }

            console.log("Connection End" + "--->" + "connection release service entry sheet");
        }
    } catch (error) {
        responseSend(res, "F", 400, "Error in database conn!!", error, null);
    }
};

const reservationList = async (req, res) => {

    try {

        console.log(req.body);

        let q =
        `SELECT 
        rkpf.RSNUM as reservationNumber,
		rkpf.RSDAT as reservationDate,
        rkpf.USNAM as userName,
        rkpf.BWART as moventType,
        rkpf.WEMPF as goodsRecipient,
        rkpf.KOSTL as costCenter,
        rkpf.EBELN as purchasing_doc_no,
        rkpf.EBELP as itemNumber,
        rkpf.UMWRK as receivingPlant,
        rkpf.UMLGO as receivingLocation,
        rkpf.PS_PSP_PNR as wbs,
        rkpf.WBS_DESC as wbsDescription,
        resb.RSPOS as reservationItemNumber,
        resb.RSART as recordType,
        resb.BDART as requirmentType,
        resb.RSSTA as reservationStatus,
        resb.KZEAR as reservationFinalIssue,
        resb.MATNR as materialNubmer,
        makt.MAKTX as materialDescription,
        resb.WERKS as plant,
        resb.LGORT as storageLocation,
        resb.CHARG as batchNumber,
        resb.BDMNG as requirementQty,
        resb.MEINS as unit,
        resb.BWART as itemMomentType,
        resb.ERFMG AS quantityDropdown,
        resb.XWAOK as moment,
        resb.XLOEK as itemDeleted,
        resb.PSPEL as wbsElement,
        resb.BDTER AS itemReservationDate,
        resb.ENMNG as quantWithdrawal
	FROM rkpf as rkpf 
	LEFT JOIN resb AS resb
    	ON(rkpf.RSNUM = resb.RSNUM)
    LEFT JOIN makt as makt
        ON(makt.MATNR = resb.MATNR)
    WHERE 1 = 1 `;

        let val = []

        // if (req.body.RSNUM) {
        //     q = q.concat(" AND rkpf.RSNUM = ?");
        //     val.push(req.body.RSNUM);
        // }

        if (!req.body.reservationNumber) {
            return resSend(res, false, 200, "plese send reservationNumber", [], null);
        }

        if (req.body.reservationNumber) {
            q = q.concat(" AND rkpf.RSNUM = ?");
            val.push(req.body.reservationNumber);
        }
        if (req.body.reservationDate) {
            q = q.concat(" AND rkpf.RSDAT = ?");
            val.push(req.body.reservationDate);
        }



        console.log("q", q, val);
        const result = await query({ query: q, values: val });

        let response = {
            reservationNumber: null,
            reservationDate: null,
            userName: null,
            moventType: null,
            goodsRecipient: null,
            costCenter: null,
            purchising_doc_no: null,
            itemNumber: null,
            receivingPlant: null,
            receivingLocation: null,
            wbs: null,
            lineItem: result
        }

        console.log("result", result);

        if (result.length > 0) {
            response.reservationNumber = result[0].reservationNumber,
                response.reservationDate = result[0].reservationDate,
                response.userName = result[0].userName,
                response.moventType = result[0].moventType,
                response.goodsRecipient = result[0].goodsRecipient,
                response.costCenter = result[0].costCenter,
                response.purchising_doc_no = result[0].purchising_doc_no,
                response.itemNumber = result[0].itemNumber,
                response.receivingPlant = result[0].receivingPlant,
                response.receivingLocation = result[0].receivingLocation,
                response.wbs = result[0].wbs,

                resSend(res, true, 200, "Data fetched successfully", response, null);
        } else {
            resSend(res, false, 200, "No Record Found", response, null);
        }


    } catch (error) {
        return resSend(res, false, 500, "internal server error", error, null);
    }


}



module.exports = { reservation, reservationList, serviceEntry }