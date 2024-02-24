

const https = require('https');

const externalBackendURL = 'http://grsebld1dev:8000/sap/bc/zobps_out_api'; // Replace with your actual external backend URL

const payload = {
    "ZBTNO": "varchar(11)",
    "ERDAT": "date 8",
    "ERZET": "time 6",
    "ERNAM": "archar(12",
    "LAEDA": "date 8",
    "AENAM": "	varchar(12)",
    "LIFNR": "varchar(10)",
    "ZVBNO": "varchar(40)",
    "EBELN": "varchar(10)",
    "DPERNR1": "int(8)",
    "ZRMK1": "varchar(140)",
}

const postData = JSON.stringify(dataToSend);

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // Add any additional headers if required by your external backend
  },
};

const req = https.request(externalBackendURL, options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log('Data successfully sent to external backend:', responseData);
    // Handle success or additional logic here
  });
});

req.on('error', (error) => {
  console.error('Error sending data to external backend:', error.message);
  // Handle error or additional error logic here
});

req.write(postData);
req.end();
