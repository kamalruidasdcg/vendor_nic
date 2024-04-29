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
            whereClause +=" AND essr.lblni = ?";
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
                        mseg.MATNR as materialNumber,
                        mseg.BWART as momentType,
                        mseg.EBELN as purchasing_doc_no,
                        mseg.EBELP as poItemNumber,
                        mseg.LIFNR as vendor_code,
                        mseg.WERKS as plant,
                        mseg.ERFMG as quantity,
                        mseg.ERFME as unit,
                        vendor_details.NAME1 as vendor_name,
                        mkpf.XBLNR as refferecnce,
                        mkpf.BKTXT as headerText,
                        mkpf.FRBNR as billOfLoading,
                        mkpf.BLDAT as documentDate,
                        mkpf.BUDAT as postingDate,
                        mkpf.CPUDT as entryDate,    
                        makt.MAKTX as materialDesc,
                        zmm_gate_entry_d.ENTRY_NO as gateEntryNo,
                        zmm_gate_entry_d.INVNO as invoiceNo,
                        zmm_gate_entry_h.CHALAN_NO as chalanNo
                    FROM mseg AS mseg
                        LEFT JOIN mkpf AS mkpf
                            ON( mseg.MBLNR = mkpf.MBLNR)
                         LEFT JOIN makt AS makt
                            ON( mseg.MATNR = makt.MATNR)
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

            const finalQuery =  grnQuery + whereClause;

            const result = await query({query: finalQuery, values: val});

            if (result.length) {
                resSend(res, true, 200, "Data fetched successfully", result, null);
            } else {
                resSend(res, false, 200, "No Record Found", result, null);
            }
        } catch (err) {
            resSend(res, false, 500, "Internal server errorR", err, null);
        } 

    } 




module.exports = { serviceEntryReport, grnReport }