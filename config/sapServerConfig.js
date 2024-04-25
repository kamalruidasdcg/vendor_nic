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
        resolve(data);
      });
    });

    // Handle errors
    req.on('error', (error) => {
      reject(error);
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
    await failedDataSave(payload, '10.18.7.123', endpoint, error,)


  }

}



module.exports = { makeHttpRequest, sendDataToSapServer }


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
// {
//   ZBTNO: "20240425995",
//   ERDAT: "20240318",
//   ERZET: "164853",
//   ERNAM: "600233",
//   LAEDA: "20240318",
//   AENAM: "NAME",
//   LIFNR: "50000437",
//   ZVBNO: "",
//   EBELN: "4100000236",
//   DPERNR1: "600233",
//   ZRMK1: "REMARKS SEND FROM OBPS LAN SERVER",
// }


//     console.log("postUrl", postUrl);
//     console.log("btn_payload", btn_payload);

//     const postResponse = await makeHttpRequest(postUrl, 'POST', btn_payload);
//     console.log('POST Response from the server:', postResponse);
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

