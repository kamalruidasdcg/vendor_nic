const {query} = require("../config/dbConfig");
// const connection = require("../config/dbConfig");
const { UPDATE, INSERT } = require("../lib/constant");
const SENDMAIL = require("../lib/mailSend");
const { resSend } = require("../lib/resSend");
const { generateQuery } = require("../lib/utils");
const { validatePayload } = require("./validatePayload");

  const getFilteredData = async (req, res) => {
  
    console.warn(`Gen get api ${new Date().getTime()}`);
    try {
  
      const { $tableName } = req.query;
      
      if (!$tableName) {
        throw new Error("please send table name.");
      };
  
      let select = "*";

      // IF USER SEND SHOW SELECTED ITEMS
      if (req.query.$select) {
        select = req.query.$select
      }
      // EXAMPLE --- > 
      // localhost:4001/api/v1/getFilteredData?$tableName=qap_submission&$filter={"purchasing_doc_no":7800000040,  "id": 4}&$search={"vendor_code": "50007545", "status": "PENDING"}
      // START QUERIES
      let q = `SELECT ${select} FROM ${$tableName} WHERE 1 = 1 `

      // IF USER SEND SHOW FILTERED ITEMS 
      if (req.query.$filter) {
        const flt = JSON.parse(req.query.$filter);
        Object.keys(flt).forEach((key) => {
          q = q.concat(` AND ${key} = "${flt[key]}"`)
        })
      }

       // IF USER SEND SHOW FILTERED ITEMS 
      if (req.query.$search) {
        const search = JSON.parse(req.query.$search);
    
      Object.keys(search).forEach((key) => {
          q = q.concat(` AND ${key} LIKE "%${search[key]}%"`)
        })  
      }
  
      const result = await query({
        query: q,
        values: [],
      });
      if (result.length > 0) {
        resSend(res, true, 200, "Data fetched successfully", result, null);
      } else {
        resSend(res, false, 200, "No Record Found", result, null);
      }
    } catch (error) {
      console.log(error);
      resSend(res, false, 400, "Error", error, null);
    }
  };

  const updatTableData = async (req, res) => {
  
    console.warn("General update table data [API] . . . . . . . !");
    try {

      const { $tableName , $cond } = req.query;
      
      if (!$tableName || !$cond ) {
        throw new Error("Please send table name and condition.");
      }; 


     let whereCondition = "";

      if (req.query.$cond) {
        const flt = JSON.parse(req.query.$cond);
        const key1 = Object.keys(flt)[0];
        whereCondition = `${key1} = "${flt[key1]}"`
      }

      const updateObject = req.body;

  

      // START QUERIES
      const { q, val } = generateQuery(UPDATE,$tableName, updateObject, whereCondition);

  
      const result = await query({
        query: q,
        values: val,
      });

      if (result?.affectedRows) {
        resSend(res, true, 200, `value updated in ${ $tableName } cond ${$cond}`, result, null);
      } else {
        resSend(res, false, 200, "No Record Found", result, null);
      }
    } catch (error) {
      console.log(error);
      resSend(res, false, 400, "Error", error, null);
    }
  };


  const insertTableData = async (req, res) => {
  
    console.warn("General insert table data [API] . . . . . . . !");
    try {
      const tableList = ["ekko", "ekpo"]
      const { tableName } = req.query;
      
      if (!tableName ) {
        return resSend(res, false, 400, `Please sent table name`, null, null);
      }; 
      if (!tableList.includes(tableName)) {
        return resSend(res, false, 400, `Data insert not allow in this ${tableName} table`, null, null);
      }; 


      const insertObj = req.body;


      const verifyPayload = validatePayload(tableName, insertObj);

      if( !verifyPayload.status) {
        return resSend(res, false, 400, `${verifyPayload.msg}`, insertObj, null);
      }

      // START QUERIES
      const { q, val } = generateQuery(INSERT, tableName, insertObj);

  
      const result = await query({
        query: q,
        values: val,
      });

      if (result?.affectedRows) {
        resSend(res, true, 200, `Insert data in ${ tableName }`, result, null);
      } else {
        resSend(res, false, 400, "No data inserted", result, null);
      }
    } catch (error) {
      console.log(error);
      resSend(res, false, 500, "insertTableData api error", error, null);
    }
  };

  // const insertManyTableData = async (req, res) => {
  
  //   console.warn("Gneral insertManyTableData [API] . . . . . . . !");
  //   try {

  //     const { $tableName } = req.query;
      
  //     if (!$tableName ) {
  //       throw new Error("Please send table name");
  //     }; 

  //     const insertObj = req.body;

  

  //     // START QUERIES
  //     const { q, val } = generateQuery(INSERT, $tableName, insertObj);

  
  //     const result = await query({
  //       query: q,
  //       values: val,
  //     });

  //     if (result?.affectedRows) {
  //       resSend(res, true, 200, `insert data in ${ $tableName }`, result, null);
  //     } else {
  //       resSend(res, false, 200, "No Record Found", result, null);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     resSend(res, false, 400, "Error", error, null);
  //   }
  // };


  module.exports = { getFilteredData, updatTableData, insertTableData}