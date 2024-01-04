const {query} = require("../config/dbConfig");
const connection = require("../config/dbConfig");
const { UPDATE, INSERT, TRUE, FALSE } = require("../lib/constant");
const { HTML_TEMPLATE, VENDOR_BILL_CERTIFIED, VENDOR_MAIL_TEMPLATE } = require("../templates/mail-template");
const SENDMAIL = require("../lib/mailSend");
const { resSend } = require("../lib/resSend");
const { ZBTS, ZBTSG, ZBTSM } = require("../lib/tableName");
const { generateQuery } = require("../lib/utils");
const { RECEIVED, REJECTED, CERTIFIED } = require("../lib/status");




/**
 * UNIQUE ID GENERATOR
 * @returns { number }
 */

async function generateId() {

  try {

    const currentDate = new Date();

    // Get the year, month, and day components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1 and pad with '0'
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Concatenate them to form the desired format
    const formattedDate = `${year}${month}${day}`;


    // FETCH NUMBER OF RECORDS IN A PARTICULAR DATE
    // WHICH IS DATE 20230927 YYYYMMDD FORMAT 
    const result = await query({
      query: `SELECT COUNT(ZBTNO)  AS zbtn_count FROM zbts WHERE ZBTNO LIKE "${formattedDate}%"`,
      values: 0,
    })

    // GENERATE NEXT SEQ ID
    const nextSeq = padNumberWithZeros(result[0]["zbtn_count"]);

    id = `${formattedDate}${nextSeq}`;

  } catch (error) {

    console.log(error)

  }

  return id;

}


/**
 * GENETATE NEXT SEQUENCE NUMBER IN 3 DIGIT
 * @param {number} num 
 * @returns {number}
 */


function padNumberWithZeros(num) {
  num += 1;
  return String(num).padStart(3, '0');
}



// GET /api/v1/po
const fetchpo = async (req, res) => {
  try {

    const q = `SELECT * FROM ekko as t1
    LEFT JOIN vendors as t2 ON t1.lifnr = t2.vendor_id`

    // const q =  `SELECT * FROM po as t1
    // LEFT JOIN vendors as t2 ON t1.vendor_id = t2.vendor_id`;

    const result = await query({
      query: q,
      values: [],
    });


    if (result.length > 0) {
      resSend(res, true, 200, "PO and Vendors Data", result, null);
    } else {
      resSend(res, false, 200, "No Record Found", result, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

const fetchOfficers = async (req, res) => {
  try {
    const result = await query({
      query: `SELECT * FROM billing_officers`,
      values: [],
    });
    if (result.length > 0) {
      resSend(res, true, 200, "All Billing Officers Data", result, null);
    } else {
      resSend(res, false, 200, "No Record Found", result, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

// POST /api/v1/addBill

const addBill = async (req, res) => {

  try {

    // const q1 = `INSERT INTO bill_registration SET 
    // po = '${po}',
    // vendor_id='${vendor_id}',
    // invoice = '${invoice}',
    // bill_date = '${bill_date}',
    // bill_submitted = '${bill_submitted}',
    // remarks = '${remarks}',
    // file_name = '${file_name}'`;



    const { purchasing_doc_no,
      invoice_no,
      bill_submit_date,
      bill_submit_to_name,
      bill_submit_to_email,
      bill_submit_time,
      remarks,
      file_name,
      vendor_code,
      vendor_name,
      vendor_email,
      action_by_id,
      action_by_name
    } = req.body;

    const created_epoch_time = new Date().getTime();
    const zbtn_number = await generateId();


    const addBillQuery =
      `INSERT INTO new_bill_registration SET
    zbtno = "${zbtn_number}",
    action_by_id = "${action_by_id}", 
    action_by_name = "${action_by_name}",
    bill_submit_date = "${bill_submit_date}",
    bill_submit_to_email = "${bill_submit_to_email}",
    bill_submit_to_name = "${bill_submit_to_name}",
    bill_submit_time = "${bill_submit_time}",
    created_date = current_timestamp(),
    created_epoch_time = ${created_epoch_time},
    created_time = "current_timestamp()",
    file_name = "${file_name}",
    invoice_no = "${invoice_no}",
    purchasing_doc_no = "${purchasing_doc_no}",
    remarks = "${remarks}",
    vendor_code = "${vendor_code}",
    vendor_email = "${vendor_email}",
    vendor_name = "${vendor_name}"`

    const addBillQueryInZBTS =
      `INSERT INTO zbts SET 
      ZBTNO = "${zbtn_number}",
      EBELN = "${purchasing_doc_no}",
      LIFNR = "${vendor_code}",
      ZVBNO = "${invoice_no}",
      VEN_BILL_DATE = "${bill_submit_date}",
      DPERNR1 = "${vendor_name}",
      ZRMK1 = "${remarks}",
      RERNAM = "${vendor_name}"`;

    //  BOTH ARE HANDEL BY DB WHICH IS 
    // RERDAT = "${}", INSERT CURRENT DATE
    // RERZET = "${}", INSERT CURRENT TIME


    const result = await Promise.all([
      query({ query: addBillQuery, values: [] }),
      query({ query: addBillQueryInZBTS, values: [] })
    ])


    if (result[1].affectedRows > 0) {
      console.log("saveIn_ZBTS table data inserted");
    }


    if (result[0].affectedRows > 0) {
      resSend(res, true, 200, "Bill Registration added", { zbtno: zbtn_number, ...result[0] }, null);
      // mail setup
      let mailDetails = {
        from: "mrinmoyghosh102@gmail.com",
        to: bill_submit_to_email,
        subject: "Vendor Bill Registration",
        html: HTML_TEMPLATE("A new Bill Registration is being added"),
      };

      // TO DO 
      // ENABLE THIS CODE WHEN NEED

      // SENDMAIL(mailDetails, function (err, data) {
      //   if (!err) {
      //     console.log("Error Occurs", err);
      //   } else {
      //     console.log("Email sent successfully", data);
      //   }
      // });
    } else {
      resSend(res, false, 200, "No Record Found", result[0], null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

const fetchBills = async (req, res) => {
  const { vendor_id } = req.body;
  try {
    const result = await query({
      query: `SELECT * FROM new_bill_registration`,
      values: [],
    });
    if (result.length > 0) {
      resSend(res, true, 200, "All Billing Registration Data", result, null);
    } else {
      resSend(res, false, 200, "No Record Found", result, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};


const fetchBill = async (req, res) => {

  try {

    const { zbtno } = req.params;

    const q = `SELECT * FROM zbts WHERE ZBTNO = "${zbtno}"`;

    const result = await query({
      query: q,
      values: [],
    });



    if (result.length) {
      resSend(res, true, 200, "All Billing Registration Data", result, null);
    } else {
      resSend(res, false, 200, "No Record Found", result, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};


const updateBill = async (req, res) => {
  const {
    po,
    vendor_id,
    invoice,
    bill_date,
    bill_submit_to_email,
    remarks,
    file_name,
  } = req.body;
  try {


    const { zbtno } = req.params;


    if (!zbtno) throw Error("please send zbtno");

    const whereCondition = `ZBTNO = "${zbtno}"`
    const updateObject = { ...req.body };
    const { vendor_email_id, send_mail } = updateObject;

    delete updateObject.vendor_email_id;
    delete updateObject.send_mail;

    console.log("updated obj", updateObject, send_mail, updateObject["DSTAUS"]);


    // GENERATE QUERIES WITH generateQuery function
    //  which is return query as q and value as val
    // by sending valid object
    const { q, val } = generateQuery(UPDATE, ZBTS, updateObject, whereCondition);

    const result = await query({ query: q, values: val });

    if (result.affectedRows) {

      /**
       * SEND MAIL TO VENDOR , IF BILLING OFFICERS RECEIVED HIS/HER BILL
       */
      if (updateObject["DSTATUS"] === RECEIVED && send_mail === TRUE) {

        const receivedMailDetails = {
          from: "mrinmoyghosh102@gmail.com",
          to: vendor_email_id,
          subject: "Bill Received",
          html: VENDOR_MAIL_TEMPLATE(`Your bill has received. ID : ${zbtno}`, "Vendor Bill Received"),
        };

        SENDMAIL(receivedMailDetails, function (err, data) {
          if (!err) {
            console.log("Error Occurs", err);
          } else {
            console.log("Email sent successfully");
          }
        });
      }


      /**
       * SEND MAIL TO VENDOR , IF BILLING OFFICERS REJECTED HIS/HER BILL
       */

      if (updateObject["DSTATUS"] === REJECTED && send_mail === TRUE) {

        const rejectedMailDetails = {
          from: "mrinmoyghosh102@gmail.com",
          to: vendor_email_id,
          subject: "Bill Rejected",
          html: VENDOR_MAIL_TEMPLATE(`Your bill has rejected. ID : ${zbtno}`, "Vendor Bill Rejected"),
        };
        SENDMAIL(rejectedMailDetails, function (err, data) {
          if (!err) {
            console.log("Error Occurs", err);
          } else {
            console.log("Email sent successfully");
          }
        });
      }



      resSend(res, true, 200, "Bill Registration added", result, null);
      // mail setup
      // let mailDetails = {
      //   from: "mrinmoyghosh102@gmail.com",
      //   to: bill_submit_to_email,
      //   subject: "Vendor Bill Registration",
      //   html: HTML_TEMPLATE("A new Bill Registration is being added"),
      // };
      // SENDMAIL(mailDetails, function (err, data) {
      //   if (!err) {
      //     console.log("Error Occurs", err);
      //   } else {
      //     console.log("Email sent successfully");
      //   }
      // });
    } else {
      resSend(res, false, 200, "No Record Found", result, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};



// const updateBill = async (req, res) => {
//   const {
//     po,
//     vendor_id,
//     invoice,
//     bill_date,
//     bill_submit_to_email,
//     remarks,
//     file_name,
//   } = req.body;
//   try {

//     const { btnId } = req.params;
//     const q1 = `UPDATE zbts SET DSTATUS = "1" WHERE ZBTNO = "${btnId}"`;
//     const result = await query({
//       query: q1,
//       values: [],
//     });

//     if (result.affectedRows > 0) {
//       resSend(res, true, 200, "Bill Registration added", result, null);
//       // mail setup
//       let mailDetails = {
//         from: "mrinmoyghosh102@gmail.com",
//         to: bill_submit_to_email,
//         subject: "Vendor Bill Registration",
//         html: HTML_TEMPLATE("A new Bill Registration is being added"),
//       };
//       // SENDMAIL(mailDetails, function (err, data) {
//       //   if (!err) {
//       //     console.log("Error Occurs", err);
//       //   } else {
//       //     console.log("Email sent successfully");
//       //   }
//       // });
//     } else {
//       resSend(res, false, 200, "No Record Found", result, null);
//     }
//   } catch (error) {
//     console.log(error);
//     resSend(res, false, 400, "Error", error, null);
//   }
// };


// certifyBull api 
const certifyBill = async (req, res) => {

  try {

    const { zbtno } = req.params;


    if (!zbtno) throw Error("please send zbtno");
    const insertObj = req.body;

    if (Object.keys(insertObj).length === 0) throw Error("please send body object");

    // const payloadObj = {"ZBTNO": "","ZGRNO": "", "VGABE": "","EBELN": "","EBELP": "","MBLNR": "","MJAHR": "","LBLNI": "","AUGBL": "","OTHER": "" }

    // const ob = {
    //   EBELN: "LBLNI", 
    //   EBELP: "EBELN",
    //   GJAHR: "EBELP",
    //   BELNR: ""
    // }

    const whereCondition = `ZBTNO = "${zbtno}"`
    const updateObject = { DSTATUS: CERTIFIED };

    const insertZBTSG = generateQuery(INSERT, ZBTSG, insertObj);
    const updateZBTS = generateQuery(UPDATE, ZBTS, updateObject, whereCondition);


    const result = await Promise.all([
      query({ query: insertZBTSG["q"], values: insertZBTSG["val"] }),
      query({ query: updateZBTS["q"], values: updateZBTS["val"] })
    ])

    if (result[0].affectedRows && result[1].affectedRows) {

      resSend(res, true, 200, "Certified Bill", { zbtno, ZBTSG: result[0], ZBTS: result[1] }, null);

    } else {
      resSend(res, false, 200, "No Record Found", { zbtno, ZBTSG: result[0], ZBTS: result[1] }, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }


};

// bill forward to department

const forwardBillToDepartment = async (req, res) => {


  // const { bill_submit_to_email } = req.body;
  try {


    const { zbtno } = req.params;


    if (!zbtno) throw Error("please send zbtno");

    const insertObj = req.body;
    const { MAILSENDTO } = insertObj;
    delete insertObj.MAILSENDTO


    // GENERATE QUERIES WITH generateQuery function
    //  which is return query as q and value as val
    // by sending valid object
    const { q, val } = generateQuery(INSERT, ZBTSM, insertObj);

    const result = await query({ query: q, values: val });

    if (result.affectedRows > 0) {

      // mail setup
      let mailDetails = {
        from: "mrinmoyghosh102@gmail.com",
        to: MAILSENDTO,
        subject: "Forward bill to another department",
        html: VENDOR_BILL_CERTIFIED("Forward bill is forward to"),
      };


      // SENDMAIL(mailDetails, function (err, data) {
      //   if (!err) {
      //     console.log("Error Occurs", err);
      //   } else {
      //     console.log("Email sent successfully");
      //   }
      // });

      resSend(res, true, 200, "Bill Registration added", result, null);

    } else {
      resSend(res, false, 200, "No Record Found", result, null);
    }
  } catch (error) {
    resSend(res, false, 400, "Error", error, null);
  }
};

// const forwardBillToDepartment = async (req, res) => {

//   console.log("forwardBillToDepartment");

//   // const { bill_submit_to_email } = req.body;
//   try {


//     const { zbtno } = req.params;


//     if (!zbtno) throw Error("please send zbtno");

//     const insertObj = req.body;
//     const { MAILSENDTO } = insertObj;
//     delete insertObj.MAILSENDTO


//     // GENERATE QUERIES WITH generateQuery function
//     //  which is return query as q and value as val
//     // by sending valid object
//     const { q, val } = generateQuery(INSERT, ZBTSM, insertObj);

//     console.log("q", q)
//     console.log("val", val)

//     const result = await query({ query: q, values: val });

//     if (result.affectedRows > 0) {

//       // mail setup
//       let mailDetails = {
//         from: "mrinmoyghosh102@gmail.com",
//         to: MAILSENDTO,
//         subject: "Forward bill to another department",
//         html: HTML_TEMPLATE("Forward bill is forward to"),
//       };


//       console.log("mailDetails", mailDetails);


//       SENDMAIL(mailDetails, function (err, data) {
//         if (!err) {
//           console.log("Error Occurs", err);
//         } else {
//           console.log("Email sent successfully");
//         }
//       });

//       resSend(res, true, 200, "Bill Registration added", result, null);

//     } else {
//       resSend(res, false, 200, "No Record Found", result, null);
//     }
//   } catch (error) {
//     console.log(error);
//     resSend(res, false, 400, "Error", error, null);
//   }
// };


module.exports = { fetchpo, fetchOfficers, addBill, fetchBills, fetchBill, updateBill, certifyBill, forwardBillToDepartment }
