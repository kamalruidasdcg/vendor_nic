// const mysql2 = require("mysql2");
// const { query } = require("../config/dbConfig");
// const { UPDATE, INSERT, TRUE, FALSE } = require("../lib/constant");
// const SENDMAIL = require("../lib/mailSend");
// const { resSend } = require("../lib/resSend");
// const { NEW_PAYMENTS } = require("../lib/tableName");
// const { generateQuery } = require("../lib/utils");
// const {
//     RECEIVED,
//     REJECTED,
//     CERTIFIED,
//     STATUS_ACTIVE,
// } = require("../lib/status");
// const xlsx = require("xlsx");

// require("dotenv").config();

// //  FOR ADD NEW PAYMENT
// const newPayment = async (req, res) => {
//     try {
//         // const obj = {
//         //     sl_no: "",
//         //     venor_code: "",
//         //     contactors_name: "",
//         //     po_no: "",
//         //     MAIN: "",
//         //     FOJ: "",
//         //     RBD: "",
//         //     COL_61P: "",
//         //     TU: "",
//         //     TTC: "",
//         //     G_HOUSE: "",
//         //     BELUR: "",
//         //     NSSY: "",
//         //     IHQ_DELHI: "",
//         //     WAGES_PAID_UPTO: "",
//         //     PF_DEPOSIT_UPTO: "",
//         //     ESI_DEPISIT_UPTO: "",
//         //     REMARKS: "",
//         //     created_at: "",
//         //     created_by_name: "",
//         //     created_by_id: "",
//         //     status: "",
//         //     updated_at: "",
//         //     updated_by_name: "",
//         //     updated_by_id: "",
//         //     }
//         const obj = req.body;

//         const insertPayload = {
//             venor_code: obj.venor_code,
//             contactors_name: obj.contactors_name,
//             po_no: obj.po_no,
//             MAIN: obj.MAIN,
//             FOJ: obj.FOJ,
//             RBD: obj.RBD,
//             COL_61P: obj.COL_61P,
//             TU: obj.TU,
//             TTC: obj.TTC,
//             G_HOUSE: obj.G_HOUSE,
//             BELUR: obj.BELUR,
//             NSSY: obj.NSSY,
//             IHQ_DELHI: obj.IHQ_DELHI,
//             WAGES_PAID_UPTO: obj.WAGES_PAID_UPTO,
//             PF_DEPOSIT_UPTO: obj.PF_DEPOSIT_UPTO,
//             ESI_DEPISIT_UPTO: obj.ESI_DEPISIT_UPTO,
//             REMARKS: obj.REMARKS,
//             created_by_name: obj.action_by_name,
//             created_by_id: obj.action_by_id,
//             status: obj.status,
//         };

//         const { q, val } = generateQuery(INSERT, NEW_PAYMENTS, insertPayload);

//         const result = await query({ query: q, values: val });

//         if (result.affectedRows) {
//             resSend(res, true, 200, "new Payment was success", result, null);
//         } else {
//             resSend(res, true, 200, "No Record Found", result, null);
//         }
//     } catch (error) {
   
//         return resSend(res, false, 500, "Internal server error", [], null);
//     }
// };

// // UPDATE PAMYENTS
// const updatePayment = async (req, res) => {
//     try {
//         const { pId } = req.params;

//         if (!pId) throw Error("please send pId");

//         const whereCondition = `sl_no = "${pId}"`;
//         const obj = req.body;

//         const updatedObject = {
//             venor_code: obj.venor_code,
//             contactors_name: obj.contactors_name,
//             po_no: obj.po_no,
//             MAIN: obj.MAIN,
//             FOJ: obj.FOJ,
//             RBD: obj.RBD,
//             COL_61P: obj.COL_61P,
//             TU: obj.TU,
//             TTC: obj.TTC,
//             G_HOUSE: obj.G_HOUSE,
//             BELUR: obj.BELUR,
//             NSSY: obj.NSSY,
//             IHQ_DELHI: obj.IHQ_DELHI,
//             WAGES_PAID_UPTO: obj.WAGES_PAID_UPTO,
//             PF_DEPOSIT_UPTO: obj.PF_DEPOSIT_UPTO,
//             ESI_DEPISIT_UPTO: obj.ESI_DEPISIT_UPTO,
//             REMARKS: obj.REMARKS,
//             updated_by_name: obj.action_by_name,
//             updated_by_id: obj.action_by_id,
//             status: obj.status,
//         };

//         const { q, val } = generateQuery(
//             UPDATE,
//             NEW_PAYMENTS,
//             updatedObject,
//             whereCondition
//         );

//         const result = await query({ query: q, values: val });

//         if (result.affectedRows) {
//             resSend(res, true, 200, "Payments has updated", result, null);
//         } else {
//             resSend(res, false, 200, "No Record Found", result, null);
//         }
//     } catch (error) {
//         console.log("updatePayment", error);
//         resSend(res, false, 500, error.toString(), result, null);
//     }
// };

// // DELETE PAYMENTS
// const deletePayment = async (req, res) => {
//     try {
//         const { pId } = req.params;

//         if (!pId) throw Error("please send pId");

//         const whereCondition = `sl_no = "${pId}"`;
//         const obj = req.body;

//         const updatedObject = {
//             updated_by_id: obj.action_by_id,
//             updated_by_name: obj.action_by_name,
//             status: "0",
//         };

//         const { q, val } = generateQuery(
//             UPDATE,
//             NEW_PAYMENTS,
//             updatedObject,
//             whereCondition
//         );

//         const result = await query({ query: q, values: val });

//         if (result.affectedRows) {
//             resSend(res, true, 200, "Payment record has deleted", result, null);
//         } else {
//             resSend(res, false, 200, "No Record Found", result, null);
//         }
//     } catch (error) {
//         console.log("delete payment", error);
//         resSend(res, false, 500, error.toString(), result, null);
//     }
// };

// // GET ALL PAYMENTS
// const allPaymentList = async (req, res) => {
//     try {
//         const paymentListQuery = `SELECT * FROM ${NEW_PAYMENTS} WHERE status = ${STATUS_ACTIVE}`;
//         const result = await query({ query: paymentListQuery });

//         if (result.affectedRows) {
//             resSend(res, true, 200, "AllPayments", result, null);
//         } else {
//             resSend(res, true, 200, "No Record Found", result, null);
//         }
//     } catch (error) {
//         console.log("allPaymentList", error);
//         resSend(res, false, 500, error.toString(), result, null);
//     }
// };

// //  FOR ADD NEW PAYMENT
// const newPaymentEXCEL = async (req, res) => {
//     try {
//         // const obj = {
//         //     sl_no: "",
//         //     venor_code: "",
//         //     contactors_name: "",
//         //     po_no: "",
//         //     MAIN: "",
//         //     FOJ: "",
//         //     RBD: "",
//         //     COL_61P: "",
//         //     TU: "",
//         //     TTC: "",
//         //     G_HOUSE: "",
//         //     BELUR: "",
//         //     NSSY: "",
//         //     IHQ_DELHI: "",
//         //     WAGES_PAID_UPTO: "",
//         //     PF_DEPOSIT_UPTO: "",
//         //     ESI_DEPISIT_UPTO: "",
//         //     REMARKS: "",
//         //     created_at: "",
//         //     created_by_name: "",
//         //     created_by_id: "",
//         //     status: "",
//         //     updated_at: "",
//         //     updated_by_name: "",
//         //     updated_by_id: "",
//         //     }
//         const obj = req.body;

//         const insertPayload = {
//             venor_code: obj.venor_code,
//             contactors_name: obj.contactors_name,
//             po_no: obj.po_no,
//             MAIN: obj.MAIN,
//             FOJ: obj.FOJ,
//             RBD: obj.RBD,
//             COL_61P: obj.COL_61P,
//             TU: obj.TU,
//             TTC: obj.TTC,
//             G_HOUSE: obj.G_HOUSE,
//             BELUR: obj.BELUR,
//             NSSY: obj.NSSY,
//             IHQ_DELHI: obj.IHQ_DELHI,
//             WAGES_PAID_UPTO: obj.WAGES_PAID_UPTO,
//             PF_DEPOSIT_UPTO: obj.PF_DEPOSIT_UPTO,
//             ESI_DEPISIT_UPTO: obj.ESI_DEPISIT_UPTO,
//             REMARKS: obj.REMARKS,
//             created_by_name: obj.action_by_name,
//             created_by_id: obj.action_by_id,
//             status: obj.status,
//         };

//         const { q, val } = generateQuery(INSERT, NEW_PAYMENTS, insertPayload);

//         const result = await query({ query: q, values: val });

//         if (result.affectedRows) {
//             resSend(res, true, 200, "new Payment was success", result, null);
//         } else {
//             resSend(res, true, 200, "No Record Found", result, null);
//         }
//     } catch (error) {
//         console.log("new payment added", error);
//         return resSend(res, false, 500, "Internal server error", [], null);
//     }
// };

// const updoadExcelFileController = async (req, res) => {


//     try {

//         const connObj = {
//             host: process.env.DB_HOST_ADDRESS,
//             port: process.env.DB_CONN_PORT,
//             user: process.env.DB_USER,
//             password: "",
//             database: process.env.DB_NAME,
//             multipleStatements: true,
//         }
//         const connection = mysql2.createConnection(connObj);

//         try {
//             let fileData = {};
//             const { created_by_name, created_by_id } = req.body;

//             if (req.file) {
//                 fileData = {
//                     fileName: req.file.filename,
//                     filePath: req.file.path,
//                     fileType: req.file.mimetype,
//                     fileSize: req.file.size,
//                 };

//                 if (req.file == undefined) {
//                     resSend(res, false, 400, "Please upload an excel file!", fileData, null);
//                 }

//                 const workbook = xlsx.readFile(req.file.path);

//                 const data = [];
//                 const sheets = workbook.SheetNames;

//                 for (let i = 0; i < sheets.length; i++) {
//                     const temp = xlsx.utils.sheet_to_json(
//                         workbook.Sheets[workbook.SheetNames[i]]
//                     );
//                     temp.forEach((res) => {
//                         data.push({ ...res, created_by_name, created_by_id });
//                     });
//                 }

//                 const query = `INSERT INTO ${NEW_PAYMENTS} ( venor_code, contactors_name, po_no, MAIN, FOJ, RBD, COL_61P, TU, TTC, G_HOUSE, BELUR, NSSY, IHQ_DELHI,  WAGES_PAID_UPTO,  PF_DEPOSIT_UPTO, ESI_DEPISIT_UPTO, REMARKS, created_by_name, created_by_id, status) VALUES ?`;


//                 const values = data.map((obj) => [
//                     obj.venor_code,
//                     obj.contactors_name,
//                     obj.po_no,
//                     obj.MAIN,
//                     obj.FOJ,
//                     obj.RBD,
//                     obj.COL_61P,
//                     obj.TU,
//                     obj.TTC,
//                     obj.G_HOUSE,
//                     obj.BELUR,
//                     obj.NSSY,
//                     obj.IHQ_DELHI,
//                     obj.WAGES_PAID_UPTO,
//                     obj.PF_DEPOSIT_UPTO,
//                     obj.ESI_DEPISIT_UPTO,
//                     obj.REMARKS,
//                     obj.created_by_name,
//                     obj.created_by_id,
//                     "1",
//                 ]);


//                 // const value = [ [1, "name"], [2, "name2"]]

//                 connection.query(query, [values], (err, results) => {
//                     if (err) {
//                         console.error('Error inserting data: ' + err);
//                         resSend(res, false, 500, "'Failed to insert data'", data, null);
//                     } else {
//                         resSend(res, true, 200, "Data insert succussfully", data, null);

//                     }
//                 });

//                 // connection.end();

//             } else {
//                 resSend(res, false, 400, "Please upload a valid Excel File", fileData, null);
//             }

//         } catch (error) {
//             console.error('Error inserting data: ' + error);
//             resSend(res, false, 500, "Failed to insert data", [], null);
//         } finally {
//             connection.end();
//         }
//     } catch (error) {
//         console.log("err", error);
//         resSend(res, false, 500, "Failed to insert data", [], null);
//     }

// };





// module.exports = { newPayment, updatePayment, deletePayment, allPaymentList, newPaymentEXCEL, updoadExcelFileController };
