const http = require('http');
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
    const Password = process.env.SAP_API_AUTH_PASSWORD || "data#100";
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


module.exports = { makeHttpRequest }


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