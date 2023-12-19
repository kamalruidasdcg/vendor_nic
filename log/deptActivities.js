// // get the client
// const mysql = require("mysql2/promise");
const { query } = require("../config/dbConfig");
const { DEPERTMENT_LOG } = require("../lib/tableName");

// require("dotenv").config();

// const connObj = {
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "",
//   database: "grse_btn",
//   multipleStatements: true,
// };

// console.log("conn obj", connObj);

/**
 *
 * @param {Object} { query, values }
 * @returns result Object
 */

// async function query({ query, values = [] }) {
//   const db = await mysql.createConnection(connObj);

//   try {
//     const [results] = await db.execute(query, values);
//     await db.end();
//     return results;
//   } catch (error) {
//     return { error };
//   }
// }

const logPayload = [
  {
    user_id: 600230,
    depertment: 3,
    action: "ACCEPT",
    item_info_id: 50,
    remarks: "QAP ACCEPTED",
    purchasing_doc_no: "4700013227",
    created_at: 1702535829,
    created_by_id: 600231,
  },
  {
    user_id: 600231,
    depertment: 3,
    action: "ACCEPT",
    item_info_id: 50,
    remarks: "QP ACCEPTED",
    purchasing_doc_no: "4700013227",
    created_at: 1702535829,
    created_by_id: 600231,
  },
];


/**
 * log entry
 * @param {*} data 
 *  dat contains arry obj [{ user_id, depertment, action, item_info_id, remarks, purchasing_doc_no, created_at, created_by_id}]
 */
const deptLogEntry = async (data) => {
  //   const que = `INSERT INTO department_wise_log
  //     (id, user_id, depertment, action, item_info_id, remarks, purchasing_doc_no, created_at, created_by_id ) VALUES
  //     (NULL, 600230, 	vendor_code, 3, 'ACCEPT', 50, 'QP ACCEPTED', '4700013227', 1702535829, 600231),
  //     (NULL, 600231, 	vendor_code, 3, 'ACCEPT', 50, 'QP ACCEPTED', '4700013227', 1702535829, 600231);`;
  try {
    // CONSTRACT INSERT QUERY
    let que = `INSERT INTO ${DEPERTMENT_LOG} (user_id, vendor_code, depertment, action, dept_table_id, remarks, purchasing_doc_no, created_at, created_by_id ) VALUES`;
    const dString = constractDataString(data);
    que = que.concat(dString);
    const res = await query({ query: que, values: [] });

  } catch (error) {
    console.log("deptLogEntry log entry ", error);
  }
};

function constractDataString(logPayload) {
  let dataString = "";
  logPayload.forEach((el, idx) => {
    let stringWithData = `( ${el.user_id},${el.vendor_code}, ${el.depertment}, "${el.action}", ${el.item_info_id}, "${el.remarks}", "${el.purchasing_doc_no}",${el.created_at}, ${el.created_by_id})`;
    if (idx + 1 === logPayload.length) {
        stringWithData = stringWithData.concat(";");
    } else {
        stringWithData = stringWithData.concat(",");
    }
    dataString = dataString.concat(stringWithData);
  });

  return dataString;
}

module.exports = { deptLogEntry}



