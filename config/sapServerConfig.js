const http = require('http');
const { failedDataSave } = require('../utils/sapApiHandel');
require("dotenv").config();

/**
 * makeHttpRequest function to call external api from node backend
 * @param {String} url 
 * @param {String} method 
 * @param {JSON} postData 
 * @returns Promise
 */

function makeHttpRequest(url, method = 'GET', postData = null) {
  return new Promise((resolve, reject) => {
    // Parse the URL
    const urlParts = new URL(url);

    // Define the options for the HTTP request
    const Username = process.env.SAP_API_AUTH_USERNAME || "dcg1";
    const Password = process.env.SAP_API_AUTH_PASSWORD || "test#100";
    const credential = Username + ":" + Password;
    const base64Credentials = Buffer.from(credential).toString('base64');
    console.log(base64Credentials, "base64Credentials");
    let statusCode = null;

    const options = {
      hostname: urlParts.hostname,
      port: urlParts.port,
      path: urlParts.pathname,
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64Credentials
      },
      'maxRedirects': 5
    };

    // Add postData to the request if provided
    if (method.toUpperCase() === 'POST' && postData !== null) {
      const postDataString = JSON.stringify(postData);
      options.headers['Content-Length'] = Buffer.byteLength(postDataString);
    }

    // Make the HTTP request
    const req = http.request(options, (res) => {
      let data = '';

      // A chunk of data has been received.
      res.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      res.on('end', () => {
        resolve({ statusCode, data });
      });
      statusCode = res.statusCode;
    });

    // Handle errors
    req.on('error', (error) => {
      reject({ statusCode, error });
    });

    // If it's a POST request, write the postData to the request
    if (method.toUpperCase() === 'POST' && postData !== null) {
      req.write(JSON.stringify(postData));
    }

    // End the request
    req.end();
  });
}


const sendDataToSapServer = async (endpoint, payload) => {

  if (!endpoint || !payload) throw new Error('Send valid paylaod || Send Valid endpoint');
  let postUrl = process.env.SAP_HOST_URL || `http://10.181.1.31:8010`;
  postUrl = postUrl.concat(endpoint)
  console.log("postUrl", postUrl);
  try {
    const postResponse = await makeHttpRequest(postUrl, 'POST', payload);
    console.log('POST Response from the server:', postResponse);
  } catch (error) {

    console.error('Error making the request:', error.message, payload);
    await failedDataSave(payload, '10.18.7.123', endpoint, error);
  }

}



module.exports = { makeHttpRequest, sendDataToSapServer }


// sendDataToSapServer('/get', {name: 'ruid'})


// Example usage with async/await
// async function fetchData() {
//   try {
//     const postUrl = "http://10.181.1.31:8010/sap/bc/zoBPS_WDC"

//     const wdc_payload =
//     {
//       "ebeln": "898991",
//       "ebelp": 20,
//       "slno": "1",
//       "wdc": "d/wdc"
//     }


//     console.log("postUrl", postUrl);
//     console.log("wdc_payload", wdc_payload);

//     const postResponse = await makeHttpRequest(postUrl, 'POST', wdc_payload);
//     console.log('POST Response from the server:', postResponse);
//   } catch (error) {
//     console.error('Error making the request:', error.message);
//   }
// }

// // Call the async function
// fetchData();



// sendDataToSapServer("/zobps_sdbg_ent", {
//   ZBTNO: "20240318501",
//   ERDAT: "20240318",
//   ERZET: "",
//   ERNAM: "600233",
//   LAEDA: "20240318",
//   AENAM: "NAME",
//   LIFNR: "50000437",
//   ZVBNO: "",
//   EBELN: "4000234569",
//   DPERNR1: "",
//   ZRMK1: "REMARKS",
// })


// Example BTN SAVE INTO SAP
// // CALL THIS FUNCTION IN BTN CONTROLLER AS PER CONDITION

// async function btnSaveToSap() {
//   try {
//     const postUrl = "http://10.181.1.31:8010/sap/bc/zobps_out_api";

//     const btn_payload =
//     {
//       ZBTNO: "20240620993",
//       ERDAT: "20240318",
//       ERZET: "164853",
//       ERNAM: "600233",
//       LAEDA: "20240318",
//       AENAM: "NAME fg",
//       LIFNR: "50000437",
//       ZVBNO: "",
//       DSTATUS: "4",
//       EBELN: "4100000236",
//       DPERNR1: "600233",
//       ZRMK1: "REMARKS SEND FROM OBPS LAN SERVER",
//       CGST: (parseFloat("7000") / parseFloat("5")).toFixed(2),
//       IGST: (parseFloat("7000") / parseFloat("10.50")).toFixed(2),
//       SGST: (parseFloat("7000") / parseFloat("5.50")).toFixed(2),
//       BASICAMT: "7000"
//     }


//     console.log("postUrl", postUrl);
//     console.log("btn_payload", btn_payload);

//     const postResponse = await makeHttpRequest(postUrl, 'POST', btn_payload);
//     console.log('POST Response from the server:', postResponse.data);
//   } catch (error) {
//     console.error('Error making the request:', error.message);
//   }
// }




// btnSaveToSap();

// Example SDBG SAVE INTO SAP
// CALL THIS FUNCTION IN SDBG CONTROLLER AS PER CONDITION

// async function sendBgToSap(payload) {
//   try {
//       const host = `${process.env.SAP_HOST_URL}` || "http://10.181.1.31:8010";
//       const postUrl = `${host}/sap/bc/zobps_sdbg_ent`;
//       console.log("postUrl", postUrl);
//       console.log("wdc_payload -->", );
//       let payload = { ...payload };
//       let modified = await zfi_bgm_1_Payload(payload);
//       const postResponse = await makeHttpRequest(postUrl, 'POST', modified);
//       console.log('POST Response from the server:', postResponse);
//   } catch (error) {
//       console.error('Error making the request:', error.message);
//   }
// }



// async function btnSaveToSap(btnPayload, tokenData) {
//   try {

//     const btn_payload = {
//       ZBTNO: "202407011999", // BTN Number
//       // ERDAT: getYyyyMmDd(getEpochTime()), // BTN Create Date
//       // ERZET: timeInHHMMSS(), // 134562,  // BTN Create Time
//       ERNAM: "0050007545", // Created Person Name
//       LAEDA: "", // Not Needed
//       AENAM: "DCG", // Vendor Name
//       LIFNR:  "0050007545", // Vendor Codebtn_v2
//       ZVBNO: "789", // Invoice Number
//       EBELN: "", // PO Number
//       ACC: btnDetails[0]?.yard,// yard number
//       FSTATUS: D_STATUS_FORWARDED_TO_FINANCE, // sap deparment forword status
//       ZRMK1: "Forwared To Finance", // REMARKS
//       CGST: (parseFloat("7000") / parseFloat("5")).toFixed(2),
//       IGST: (parseFloat("7000") / parseFloat("10.50")).toFixed(2),
//       SGST: (parseFloat("7000") / parseFloat("5.50")).toFixed(2),
//       BASICAMT: "7000",
//       ACTIVITY:  "90%", // activity
//       FRERDAT: "20240711",
//       FRERZET: "221045",
//       FRERNAM: "600200", // SET BY DO FINACE AUTHIRITY  PERSON (DO SUBMIT)
//       FPERNR1:  "600400", // assigned_to
//       FPERNAM: "demo name" // ASSINGEE NAME
//     };

//     const sapBaseUrl = process.env.SAP_HOST_URL || "http://10.181.1.31:8010";
//     const postUrl = `${sapBaseUrl}/sap/bc/zobps_out_api`;
//     console.log("btnPayload", postUrl, btn_payload);
//     const postResponse = await makeHttpRequest(postUrl, "POST", btn_payload);
//     console.log("POST Response from the server:", postResponse);
//   } catch (error) {
//     console.error("Error making the request:", error.message);
//   }
// }


// btnSaveToSap({}, {})


// async function btnSubmitByDo(btnPayload, tokenData) {
//   try {

//     const btn_payload = {
//       EBELN: "4700026717", // PO NUMBER
//       LIFNR: "0050007545", // VENDOR CODE
//       RERNAM: "DCG", // REG CREATOR NAME --> VENDOR NUMBER
//       STCD3: "GSTIN12112",// VENDOR GSTIN NUMBER
//       ZVBNO: "789", // GATE ENTRY INVOCE NUMBER
//       VEN_BILL_DATE: "20240711", // GATE ENTRY INVOICE DATE
//       PERNR: tokenData.vendor_code, // DO ID
//       ZBTNO: btnPayload.btn_num, //  BTN NUMBER
//       ERDAT: "20240711",  // VENDOR BILL SUBMIT DATE
//       ERZET: "104556", // VENDOR BILL SUBMIT TIME
//       RERDAT: "20240711", //REGISTRATION NUMBER --- VENDOR BILL SUBMIT DATE
//       RERZET: "104556", //REGISTRATION NUMBER --- VENDOR BILL SUBMIT TIME
//       DPERNR1: tokenData.vendor_code, // DO NUMBER
//       DRERDAT1: "20240711", // DEPARTMETN RECECE DATE --> WHEN SUBMIT DO
//       DRERZET1: "104556", // DEPARTMETN RECECE TIME --> WHEN SUBMIT DO
//       DRERNAM1: tokenData.name, // DEPARTMETN RECECE DO ID --> WHEN SUBMIT DO
//       DAERDAT: "20240711", // DEPARTMENT APPROVAL DATE --> DO SUBMISSION DATE
//       DAERZET: "104556", // DEPARTMENT APPROVAL DATE --> DO SUBMISSION TIME
//       DAERNAM: tokenData.name, // DEPARTMENT APPROVAL NAME --> DO NAME

//       // DEERDAT: "", // REJECTION DATE
//       // DEERZET: "104556", // REJECTION TIME
//       // DEERNAM: "", // DO ( WHO REJECTED)
//       // ZRMK2: "", // "REJECTION REASON REMARKS / DO SUBMIT REMARKS"

//       DFERDAT: "20240711", // DO SUBMIT DATE
//       DEFRZET: "104556", // DO SUBMIT TIEM
//       DEFRNAM: "UN KNOWN", // DO SUBMIT NAME ( DO NAME)
//       DSTATUS: "4", // "4"
//       DPERNR: "600200", //  (DO)

//       FPRNR1: "600400", // FINACE AUTHIRITY ID ( )
//       FPRNAM1: "DEMO NAME", // FINANCE
//     };

//     const sapBaseUrl = process.env.SAP_HOST_URL || "http://10.181.1.31:8010";
//     const postUrl = `${sapBaseUrl}/sap/bc/zobps_do_out`;
//     console.log("btnPayload", postUrl, btn_payload);
//     const postResponse = await makeHttpRequest(postUrl, "POST", btn_payload);
//     console.log("POST Response from the server:", postResponse);
//   } catch (error) {
//     console.error("Error making the request:", error.message);
//   }
// }


// btnSubmitByDo({},{});
