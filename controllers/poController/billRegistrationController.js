const { query } = require("../../config/dbConfig");
const { UPDATE, INSERT, TRUE, FALSE, USER_TYPE_VENDOR } = require("../../lib/constant");
const {
    HTML_TEMPLATE,
    VENDOR_MAIL_TEMPLATE,
} = require("../../templates/mail-template");
const SENDMAIL = require("../../lib/mailSend");
const { resSend } = require("../../lib/resSend");
const { ZBTS, ZBTSG, ZBTSM, new_bill_registration } = require("../../lib/tableName");
const { generateQuery, getEpochTime } = require("../../lib/utils");
const { RECEIVED, REJECTED, CERTIFIED } = require("../../lib/status");
const { addBillPayload, addToZBTSPayload } = require("../../services/po.billregistration.services");

/**
 * UNIQUE ID GENERATOR
 * @returns { number }
 */

async function generateId() {
    try {
        const currentDate = new Date();

        // Get the year, month, and day components
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1 and pad with '0'
        const day = String(currentDate.getDate()).padStart(2, "0");

        // Concatenate them to form the desired format
        const formattedDate = `${year}${month}${day}`;

        // FETCH NUMBER OF RECORDS IN A PARTICULAR DATE
        // WHICH IS DATE 20230927 YYYYMMDD FORMAT
        const result = await query({
            query: `SELECT COUNT(ZBTNO)  AS zbtn_count FROM zbts WHERE ZBTNO LIKE "${formattedDate}%"`,
            values: [],
        });

        // GENERATE NEXT SEQ ID
        const nextSeq = padNumberWithZeros(result[0]["zbtn_count"]);

        id = `${formattedDate}${nextSeq}`;
        return id;
    } catch (error) {
        console.log(error);
    }
}

/**
 * GENETATE NEXT SEQUENCE NUMBER IN 3 DIGIT
 * @param {number} num
 * @returns {number}
 */

function padNumberWithZeros(num) {
    const startsWithNumber = 500;
    num += 1 + startsWithNumber;
    return String(num).padStart(3, "0");
}

// GET /api/v1/po
const fetchpo = async (req, res) => {
    try {
        const q = `SELECT * FROM ekko as t1
    LEFT JOIN vendors as t2 ON t1.lifnr = t2.vendor_id`;

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

        const officersQuery =
            `
                SELECT 
            	    t1.PERNR as user_id,
            	    t2.CNAME as name,
                    t3.USRID_LONG as email,
                    t4.USRID as phone_number
                FROM 
                pa0001 
            	AS 
                    t1
             	LEFT JOIN
                	pa0002
                AS 
                	t2
                ON
                	t2.PERNR = t1.PERNR
                LEFT JOIN
                	pa0105
                AS 
                	t3
                ON
                	(t3.PERNR = t1.PERNR  AND t3.SUBTY = "0030")
                 LEFT JOIN
                	pa0105
                AS 
                	t4
                ON
                	(t4.PERNR = t1.PERNR AND t4.SUBTY = "0030");
                    `
        const result = await query({
            query: officersQuery,
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

        const { user_type } = req.tokenData;

        // if(user_type !== USER_TYPE_VENDOR) {
        //     return resSend(res, false, 401, "You dont have permission ! login as a Vendor", null, null);
        // }

        let payload = { ...req.body };

        let fileData = {};
        if (req.file) {
            fileData = {
                fileName: req.file.filename,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
            };

        }
        const zbtn_number = await generateId();
        payload = { ...payload, ...fileData, zbtn_number };
        const insertObj = addBillPayload(payload);
        const billQ = generateQuery(INSERT, new_bill_registration, insertObj);
        const zbtsInsertObj = addToZBTSPayload(payload);
        const zbtsQ = generateQuery(INSERT, ZBTS, zbtsInsertObj);
        const result = await Promise.all([
            query({ query: billQ["q"], values: billQ["val"] }),
            query({ query: zbtsQ["q"], values: zbtsQ["val"] }),
        ]);

        if (result[1].affectedRows > 0) {
            console.log("saveIn_ZBTS table data inserted");
        }

        if (result[0].affectedRows > 0) {
            resSend(res, true, 200, "Bill Registration added", { zbtno: zbtn_number, ...result[0] }, null);
            // mail setup
            // let mailDetails = {
            //     from: "mrinmoyghosh102@gmail.com",
            //     to: bill_submit_to_email,
            //     subject: "Vendor Bill Registration",
            //     html: HTML_TEMPLATE("A new Bill Registration is being added"),
            // };

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
        resSend(res, false, 500, "Error", error, null);
    }
};

const fetchBills = async (req, res) => {
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
const fetchVendorBills = async (req, res) => {
    const { vendor_code } = req.tokenData;
    try {
        const result = await query({
            query: `SELECT * FROM new_bill_registration WHERE vendor_code = ?`,
            values: [vendor_code],
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
        const q =
            `SELECT bill.*, sap_bill_table.*  
            FROM
                new_bill_registration 
            AS 
                bill
            LEFT JOIN 
                zbts 
            AS 
                sap_bill_table
            ON
            sap_bill_table.ZBTNO = bill.zbtno
            
            WHERE
                bill.ZBTNO = "${zbtno}"`;

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

        const whereCondition = `ZBTNO = "${zbtno}"`;
        const updateObject = { ...req.body };
        const { vendor_email_id, send_mail } = updateObject;

        delete updateObject.vendor_email_id;
        delete updateObject.send_mail;

        // GENERATE QUERIES WITH generateQuery function
        //  which is return query as q and value as val
        // by sending valid object
        const { q, val } = generateQuery(
            UPDATE,
            ZBTS,
            updateObject,
            whereCondition
        );

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
                    html: VENDOR_MAIL_TEMPLATE(
                        `Your bill has received. ID : ${zbtno}`,
                        "Vendor Bill Received"
                    ),
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
                    html: VENDOR_MAIL_TEMPLATE(
                        `Your bill has rejected. ID : ${zbtno}`,
                        "Vendor Bill Rejected"
                    ),
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

// certifyBull api
const certifyBill = async (req, res) => {
    try {
        const { zbtno } = req.params;

        if (!zbtno) throw Error("please send zbtno");
        const insertObj = req.body;

        if (Object.keys(insertObj).length === 0)
            throw Error("please send body object");

        // const payloadObj = {"ZBTNO": "","ZGRNO": "", "VGABE": "","EBELN": "","EBELP": "","MBLNR": "","MJAHR": "","LBLNI": "","AUGBL": "","OTHER": "" }

        // const ob = {
        //   EBELN: "LBLNI",
        //   EBELP: "EBELN",
        //   GJAHR: "EBELP",
        //   BELNR: ""
        // }

        const whereCondition = `ZBTNO = "${zbtno}"`;
        const updateObject = { DSTATUS: CERTIFIED };

        const insertZBTSG = generateQuery(INSERT, ZBTSG, insertObj);
        const updateZBTS = generateQuery(
            UPDATE,
            ZBTS,
            updateObject,
            whereCondition
        );

        const result = await Promise.all([
            query({ query: insertZBTSG["q"], values: insertZBTSG["val"] }),
            query({ query: updateZBTS["q"], values: updateZBTS["val"] }),
        ]);

        if (result[0].affectedRows && result[1].affectedRows) {
            resSend(
                res,
                true,
                200,
                "Certified Bill",
                { zbtno, ZBTSG: result[0], ZBTS: result[1] },
                null
            );
        } else {
            resSend(
                res,
                false,
                200,
                "No Record Found",
                { zbtno, ZBTSG: result[0], ZBTS: result[1] },
                null
            );
        }
    } catch (error) {
        console.log(error);
        resSend(res, false, 400, "Error", error, null);
    }
};

// bill forward to department

const forwardBillToDepartment = async (req, res) => {
    try {
        const { zbtno } = req.params;

        if (!zbtno) throw Error("please send zbtno");

        const insertObj = req.body;
        const { MAILSENDTO } = insertObj;
        delete insertObj.MAILSENDTO;

        // GENERATE QUERIES WITH generateQuery function
        //  which is return query as q and value as val
        // by sending valid object
        const { q, val } = generateQuery(INSERT, ZBTSM, insertObj);

        const result = await query({ query: q, values: val });

        if (result.affectedRows > 0) {
            // mail setup
            // let mailDetails = {
            //     from: "mrinmoyghosh102@gmail.com",
            //     to: MAILSENDTO,
            //     subject: "Forward bill to another department",
            //     html: VENDOR_BILL_CERTIFIED("Forward bill is forward to"),
            // };

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
        console.log(error);
        resSend(res, false, 400, "Error", error, null);
    }
};



module.exports = { fetchpo, fetchOfficers, addBill, fetchBills, fetchBill, certifyBill, forwardBillToDepartment, updateBill, fetchVendorBills };
