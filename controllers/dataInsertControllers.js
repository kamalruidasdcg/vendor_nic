const { query, connection } = require("../config/dbConfig");
const { INSERT } = require("../lib/constant");
const { responseSend } = require("../lib/resSend");
const { EKKO } = require("../lib/tableName");
const { generateQuery } = require("../lib/utils");


const insertPOData = async (req, res) => {
    try {

        const obj = req.body;

        const insertPayload = {
            EBELN: obj.EBELN,
            BUKRS: obj.BUKRS ? obj.BUKRS : null,
            BSTYP: obj.BSTYP ? obj.BSTYP : null,
            BSART: obj.BSART ? obj.BSART : null,
            LOEKZ: obj.LOEKZ ? obj.LOEKZ : null,
            AEDAT: obj.AEDAT ? obj.AEDAT : null,
            ERNAM: obj.ERNAM ? obj.ERNAM : null,
            LIFNR: obj.LIFNR ? obj.LIFNR : null,
            EKORG: obj.EKORG ? obj.EKORG : null,
            EKGRP: obj.EKGRP ? obj.EKGRP : null,
        };

        const { q, val } = generateQuery(INSERT, EKKO, insertPayload);

        const result = await query({ query: q, values: val });

        if (result.affectedRows) {
            responseSend(res, "1", 200, "Inset PO data succeed", result, null);
        } else {
            responseSend(res, "0", 400, "No Record Found", result, null);
        }
    } catch (error) {
        console.log("new payment added", error);
        return responseSend(res, "0", 500, error, [], null);
    }
};

module.exports = { insertPOData };