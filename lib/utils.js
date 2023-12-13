const { UPDATE, INSERT } = require("./constant");
const { query } = require("../config/dbConfig");


/**
 * CREATE QUERY FOR 
 * @param {string} action 
 * @param {string} tableName 
 * @param {Object} updateObject 
 * @param {string} whereCondition 
 * @returns {Object} { q:string, val: [] }
 */

function generateQuery(action, tableName, updateObject, whereCondition = '') {
    const updateFields = Object.keys(updateObject).map(key => `${key} = ?`);
    const updateValues = Object.values(updateObject);
    let q = "";


    if (!action || !tableName || !updateObject) throw Error("please send valid parameters !!!");
    if (action === UPDATE && !whereCondition) throw Error("please send whereCondition !!!");

    if (action == UPDATE) {
        q = `UPDATE ${tableName} SET ${updateFields.join(', ')} WHERE ${whereCondition};`;
    } else if (action == INSERT) {

        q = `INSERT INTO ${tableName} SET ${updateFields.join(', ')}`;

    }
    return { q, val: [...updateValues] };
}

const queryArrayTOString = async (Query) => {

    const Arr = await query({ query: Query, values: [] });
    let str = "";
    await Promise.all(
        Arr.map(async (item) => {
            str += "'" + item.purchasing_doc_no + "',";
        })
    );
    str = str.slice(0, -1);
    return str;
}



/**
 * GET CURRENT EPOCH TIME
 * @returns new Date().getTime()
 */
const getEpochTime = () => new Date().getTime();


module.exports = { generateQuery, getEpochTime, queryArrayTOString }