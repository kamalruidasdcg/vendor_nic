const { query } = require("../../config/dbConfig");
const { resSend } = require("../../lib/resSend");
const Message = require('../../utils/messages');

const serviceEntryReport = async (req, res) => {

    try {

        let serviceEntryReportQ =
            `SELECT
                essr.lblni as serviceEntryNumber,
                essr.ebeln as purchising_doc_no,
                essr.ebelp as po_lineitem,
                essr.txz01 as sortText,
                essr.comp_date as completionDate,
                essr.lwert as unitPriceINR,
                essr.netwr as netValueINR,
                vendorDetails.NAME1 as vendorName,
                ekko.LIFNR as vendor_code,
                vendorDetails.ORT01 as vendorCity,
                vendorDetails.ORT02 as vendorDistrict,
                vendorDetails.PFACH as vendorPinCode
            FROM essr as essr
            	LEFT JOIN ekko as ekko
                	ON( ekko.EBELN = essr.ebeln)
                LEFT JOIN lfa1 as vendorDetails
                	ON( ekko.LIFNR = vendorDetails.LIFNR)`;

        const val = []
        let whereClause = " WHERE 1 = 1";

        if (req.body.serviceEntryNumber) {
            whereClause += " AND essr.lblni = ?";
            val.push(req.body.serviceEntryNumber);
        }

        const finalQuery = serviceEntryReportQ + whereClause;

        const result = await query({ query: finalQuery, values: val });

        if (!result.error) {
            resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, result);
        } else {
            resSend(res, false, 400, Message.DATA_FETCH_ERROR, result);
        }

    } catch (error) {
        resSend(res, false, 400, "Error in database conn!!", error, null);
    }
};


const grnReport = async (req, res) => {

    try {
        let grnQuery =
            `SELECT 
                mseg.MBLNR as matDocNo,
                mseg.MATNR as materialNumber,
                mseg.BWART as moment,
                mseg.EBELN as purchasing_doc_no,
                mseg.EBELP as poItemNumber,
                mseg.LIFNR as vendor_code,
                vendor_details.NAME1 as vendor_name,
                mkpf.XBLNR as refferecnce,
                mkpf.BKTXT as headerText,
                mkpf.FRBNR as billOfLoading,
                mkpf.BLDAT as documentDate,
                mkpf.BUDAT as postingDate,
                mkpf.CPUDT as entryDate,
                makt.MAKTX as materialDesc
            FROM mseg AS mseg
                LEFT JOIN mkpf AS mkpf
                    ON( mseg.MBLNR = mkpf.MBLNR)
                 LEFT JOIN makt AS makt
                    ON( mseg.MATNR = makt.MATNR)
                LEFT JOIN lfa1 as vendor_details
                    ON(vendor_details.LIFNR = mseg.LIFNR)
                    WHERE 1 = 1 AND  ( mseg.BWART IN ('101') )`;




        grnQuery =

            `SELECT 
                        mseg.MBLNR as matDocNo,
                        mseg.ZEILE as matDocNoLineItem,
                        mseg.MATNR as materialNumber,
                        mseg.BWART as momentType,
                        mseg.EBELN as purchasing_doc_no,
                        mseg.EBELP as poItemNumber,
                        mseg.LIFNR as vendor_code,
                        mseg.WERKS as plant,
                        mseg.ERFMG as quantity,
                        mseg.ERFME as unit,
                        mseg.MAT_PSPNR as accountingAssegnment,
                        vendor_details.NAME1 as vendor_name,
                        mkpf.XBLNR as refferecnce,
                        mkpf.BKTXT as headerText,
                        mkpf.FRBNR as billOfLoading,
                        mkpf.BLDAT as documentDate,
                        mkpf.BUDAT as postingDate,
                        mkpf.CPUDT as entryDate,    
                        ekpo.TXZ01 as materialDesc,
                        zmm_gate_entry_d.ENTRY_NO as gateEntryNo,
                        zmm_gate_entry_d.INVNO as invoiceNo,
                        zmm_gate_entry_h.CHALAN_NO as chalanNo
                    FROM mseg AS mseg
                        LEFT JOIN mkpf AS mkpf
                            ON( mseg.MBLNR = mkpf.MBLNR)
                         LEFT JOIN ekpo AS ekpo
                            ON( mseg.EBELN = ekpo.EBELN AND mseg.EBELP = ekpo.EBELP)
                        LEFT JOIN lfa1 as vendor_details
                            ON(vendor_details.LIFNR = mseg.LIFNR)
						LEFT JOIN zmm_gate_entry_d  AS zmm_gate_entry_d
                        	ON(zmm_gate_entry_d.EBELN = mseg.EBELN and zmm_gate_entry_d.EBELP = mseg.EBELP AND zmm_gate_entry_d.ZMBLNR = mseg.MBLNR)
                        LEFT JOIN zmm_gate_entry_h as zmm_gate_entry_h 
                        	ON(zmm_gate_entry_h.ENTRY_NO = zmm_gate_entry_d.ENTRY_NO)`;

        if (!req.body.matDocNo) {
            return resSend(res, false, 200, "plese send matDocNo No", [], null);
        }
        let val = [];


        let whereClause = " WHERE 1 = 1 AND  ( mseg.BWART IN ('101') )";


        if (req.body.matDocNo) {
            whereClause += " AND mseg.MBLNR = ? ";
            val.push(req.body.matDocNo);
        }

        const finalQuery = grnQuery + whereClause;

        const result = await query({ query: finalQuery, values: val });
        console.log("result", result);

        if (result.length) {

            const responseObj = {
                matDocNo : result[0].matDocNo,
                entryDate : result[0].entryDate,
                invoiceNo : result[0].invoiceNo,
                gateEntryNo : result[0].gateEntryNo,
                plant : result[0].plant,
                vendor_code : result[0].vendor_code,
                vendor_name : result[0].vendor_name,
                purchasing_doc_no : result[0].purchasing_doc_no,
                headerText : result[0].headerText,
                chalanNo : result[0].chalanNo,
                lineItem: result
            }

            resSend(res, true, 200, "Data fetched successfully", responseObj, null);
        } else {
            resSend(res, false, 200, "No Record Found", {}, null);
        }
    } catch (err) {
        resSend(res, false, 500, "Internal server errorR", err, null);
    }

}



const materialIssue = async (req, res) => {

    try {
        let q =
            `SELECT 
                        mseg.MBLNR as issueNo,
                        mseg.WERKS as plantName,
                        mseg.MJAHR as issueYear,
                        mseg.MATNR as materialNumber,
                        makt.MAKTX as materialDescription,
                        mseg.MEINS as unit,
                        mseg.CHARG as batchNo,
                        mseg.ERFMG as issueQty,
                        mseg.BPMNG as BPMNG,
                        mkpf.BUDAT as issuDate,
                        mseg.EBELN as purchasing_doc_no,
                        mseg.EBELP as poItemNumber,
                        mseg.RSNUM as reservationNo,
                        mseg.LIFNR as vendor_code,
                        mseg.MENGE as requiredQty,
                        mseg.KOSTL as costCenter
                    FROM mseg AS mseg
                        LEFT JOIN mkpf AS mkpf
                            ON( mseg.MBLNR = mkpf.MBLNR)
                         LEFT JOIN makt AS makt
                            ON( mseg.MATNR = makt.MATNR) 
                            WHERE 1 = 1 AND  ( mseg.BWART IN ('221', '281', '201', '101', '321', '222', '202', '102', '122') )`



        if (!req.body.issueNo) {
            return resSend(res, false, 200, "plese send Issue No", [], null);
        }
        let val = [];

        if (req.body.issueNo) {
            q = q.concat(" AND mseg.MBLNR = ? ");
            val.push(req.body.issueNo);
        }
        if (req.body.issueYear) {
            q = q.concat(" AND mseg.MJAHR = ? ");
            val.push(req.body.issueYear);
        }

        const result = await query({ query: q, values: val });

        let response = {
            issueNo: null,
            issuDate: null,
            plantName: null,
            reservationNo: null,
            lineItem: result
        }

        if (result.length > 0) {
            response.issueNo = result[0].issueNo;
            response.issuDate = result[0].issuDate || null;
            response.plantName = result[0].plantName;
            response.reservationNo = result[0].reservationNo || null;

            resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, response, null);
        } else {
            resSend(res, false, 200, Message.NO_RECORD_FOUND, response, null);
        }


    } catch (error) {
        return resSend(res, false, 500, Message.SERVER_ERROR, error, null);
    }


}

const icgrnReport = async (req, res) => {

    try {
        if (!req.body.docNo) {
            return resSend(res, false, 200, "plese send docNo", [], null);
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
                qals.PRUEFLOS as inspectionLotNumber,
                qals.EBELN as purchasing_doc_no,
                qals.EBELP as purchasing_doc_no_item,
                ekko.AEDAT as purchasing_doc_date,
                qals.MBLNR as docNo,
                qals.BUDAT as docdate,
                qals.LIFNR as suppplier,
                vendor_table.LAND1 as vendorCountry,
                vendor_table.NAME1 as vendorName,
                vendor_table.ORT01 as vendorCity,
                vendor_table.ORT02 as vendorDistrict,
                vendor_table.PFACH as vendorPinCode,
                qals.MATNR AS materialNumber,
                makt.MAKTX as materialDesc,
                qals.MATNR as material,
                qals.PAENDTERM as endDate,
                qals.PAENDZEIT as endTime,
                qals.PS_PSP_PNR as wbsElement,
                qals.BWART as momentType,
                ekpo.MEINS as baseUnit,
                qals.LMENGE01 as acceptedQty,
                qals.LMENGE07 as rejectedQty,
                qals.LMENGE01 as unrestrictedUseStock,
                qals.LMENGEIST as supplyQuantity,
                qals.LTEXTKZ as remarks,
                qave.vcode as udCode,
                qals.ENSTEHDAT as inspDate,
                zmm_gate_entry_d.INVNO as invoiceNo,
                zmm_gate_entry_d.INV_DATE as invoiceDate,
                zmm_gate_entry_d.ENTRY_NO as gateEntryNo,
                zmm_gate_entry_h.ENTRY_DATE as gateEntryDate,
                zmm_gate_entry_h.ENTRY_TIME as gateEntryTime
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
                	ON (zmm_gate_entry_h.ENTRY_NO = zmm_gate_entry_d.ENTRY_NO)`;

        let whereClause = " WHERE 1 = 1";

        const val = [];
        if (req.body.inspectionLotNumber) {
            whereClause += " AND qals.PRUEFLOS = ?";
            val.push(req.body.inspectionLotNumber);
        }
        if (req.body.docNo) {
            whereClause += " AND qals.MBLNR = ?";
            val.push(req.body.docNo);
        }
        if (req.body.purchasing_doc_no) {
            whereClause += " AND qals.EBELN = ?";
            val.push(req.body.purchasing_doc_no);
        }
        // const response = await promiseConnection.execute(icgrnGetQuery);
        const finalQuery = icgrnGetQuery + whereClause;
        const response = await query({ query: finalQuery, values: val });

        if (response && response.length) {
            const resp = response[0];
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
            resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, obj, null);
        } else {
            resSend(res, false, 200, Message.NO_RECORD_FOUND, response, null);
        }

    } catch (error) {
        resSend(res, false, 500, Message.SERVER_ERROR, error, null);
    }

};




const gateEntryReport = async (req, res) => {

    try {
        let ge_query = `
            SELECT 
                zmm_gate_entry_h.ENTRY_NO as gate_entry_no,
                zmm_gate_entry_h.ENTRY_DATE as entry_date,
                zmm_gate_entry_h.VEH_REG_NO as vehicle_no,
                zmm_gate_entry_d.INVNO as invoice_number,
                zmm_gate_entry_d.INV_DATE as invoice_date,
                zmm_gate_entry_d.EBELN as purchising_doc_no,
                zmm_gate_entry_d.EBELP as po_line_item_no,
                zmm_gate_entry_d.CH_QTY as chalan_quantity,
                zmm_gate_entry_d.CH_NETWT as net_quantity,
                zmm_gate_entry_d.MATNR as material_code,
                material.MAKTX as material_desc,
                ekko.LIFNR as vendor_code,
                lfa1.NAME1 as vendor_name,
                ekpo.MENGE as quantity
                FROM zmm_gate_entry_h AS zmm_gate_entry_h 
            LEFT JOIN zmm_gate_entry_d as zmm_gate_entry_d
                ON( zmm_gate_entry_h.ENTRY_NO = zmm_gate_entry_d.ENTRY_NO)
                LEFT JOIN ekko as ekko
                	ON (zmm_gate_entry_d.EBELN = ekko.EBELN)
                    LEFT JOIN ekpo as ekpo
                	ON (zmm_gate_entry_d.EBELN = ekpo.EBELN AND zmm_gate_entry_d.EBELP = ekpo.EBELP)
                    LEFT JOIN lfa1 as lfa1
                    	ON(lfa1.LIFNR = ekko.LIFNR)
                    LEFT JOIN makt as material
                        ON(material.MATNR = zmm_gate_entry_d.MATNR)`;

        console.log("ge_query", ge_query);
        const val = [];

        let whereClause = " WHERE 1 = 1";
        if (req.body.gate_entry_no) {
            whereClause += " AND zmm_gate_entry_h.ENTRY_NO = ?";
            val.push(req.body.gate_entry_no)
        }
        const finalQuery = ge_query + whereClause;
        const result = await query({ query: finalQuery, values: val });

        if (result && result.length) {
            let obj = {};
            obj.gate_entry_no = result[0].gate_entry_no;
            obj.entry_date = result[0].entry_date;
            obj.vendor = result[0].vendor;
            obj.invoice_number = result[0].invoice_number;
            obj.vehicle_no = result[0].vehicle_no;
            obj.vendor_name = result[0].vendor_name;
            obj.vendor_code = result[0].vendor_code;
            obj.line_items = result;

            resSend(res, true, 200, Message.DATA_FETCH_SUCCESSFULL, obj, null);
        } else {
            resSend(res, false, 200, Message.NO_RECORD_FOUND, result, null);
        }

    } catch (error) {
        resSend(res, false, 500, Message.SERVER_ERROR, error, null);
    }

};



module.exports = { serviceEntryReport, grnReport, materialIssue, icgrnReport,  gateEntryReport}