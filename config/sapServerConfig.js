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
    const Username = process.env.SAP_API_AUTH_USERNAME || "KAMAL";
    const Password = process.env.SAP_API_AUTH_PASSWORD || "RUIDAS";
    const credential = Username+":"+Password;
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

// Example usage with async/await
async function fetchData() {
  try {
    const getUrl = 'http://10.101.111.109:4001/api/v1/ping';
    console.log("getUrl", getUrl);
    const getResponse = await makeHttpRequest(getUrl);
    console.log('GET Response from the server:', getResponse);

    // const postUrl = 'http://10.13.1.165:4001/api/v1/sap/material/makt';
    const postUrl = 'http://10.101.111.109:4001/api/v1/sap/material/makt';
    const postData = {
      "MATNR": "MAINAK2",
      "SPRAS": "MAINAK2",
      "MAKTX": "S",
      "MAKTG": "MAINAK2",
      "MTART": "ZDIN"
    }; // Replace with your actual payload
    const postResponse = await makeHttpRequest(postUrl, 'POST', postData);
    console.log('POST Response from the server:', postResponse);
  } catch (error) {
    console.error('Error making the request:', error.message);
  }
}

// Call the async function
fetchData();
