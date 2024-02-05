
const { NEW_SDBG, MAKT } = require('../../lib/tableName');
const { connection } = require("../../config/dbConfig");
const { INSERT } = require("../../lib/constant");
const { responseSend, resSend } = require("../../lib/resSend");
const { generateQuery } = require("../../lib/utils");
const { getFilteredData } = require('../genralControlles');


const makt = async (req, res) => {
    let insertPayload = {};
    
    try {
     
        const promiseConnection = await connection();
        let transactionSuccessful = false;

        try {

            const { ...obj } = req.body;

            if (!obj || typeof obj !== 'object' || !Object.keys(obj).length) {
                return responseSend(res, "0", 400, "INVALID PAYLOAD", null, null);
            }

            await promiseConnection.beginTransaction();

            insertPayload = {
                MATNR: obj.MATNR ? obj.MATNR : null,
                SPRAS: obj.SPRAS ? obj.SPRAS : null,
                MAKTX: obj.MAKTX ? obj.MAKTX : null,
                MAKTG: obj.MAKTG ? obj.MAKTG : null,
            };

            const ekkoTableInsert = generateQuery(INSERT, MAKT , insertPayload);

            try {
                const [results] = await promiseConnection.execute(ekkoTableInsert["q"], ekkoTableInsert["val"]);
            } catch (error) {
                return responseSend(res, "0", 502, "Data insert failed !!", error, null);
            }

            const comm = await promiseConnection.commit(); // Commit the transaction if everything was successful
            transactionSuccessful = true;

            return responseSend(res, "1", 200, "data insert succeed.", [], null);
            
        } catch (error) {
            responseSend(res, "0", 502, "Data insert failed !!", error, null);
        }
        finally {
            if (!transactionSuccessful) {
                await promiseConnection.rollback();
            }
            const connEnd = await promiseConnection.end();
            console.log("Connection End" + "--->" + "connection release");
        }
    } catch (error) {
        responseSend(res, "0", 400, "Error in database conn!!", error, null);
    }
};



const list = async (req, res) => {

    req.query.$tableName = NEW_SDBG;

    try {

        getFilteredData(req, res);
    } catch (err) {
        console.log("data not fetched", err);
        resSend(res, false, 500, "Internal server error", null, null);
    }

}


module.exports = { list, makt }