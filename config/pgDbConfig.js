
const { Pool, Client } = require('pg');

const connObj = {
    user: 'postgres',
    host: 'localhost',
    database: 'grse_btn',
    port: 3211,
    password: 'postgres',
   
  };

async function connectAndQuery(q, val) {
    const client = new Client(connObj);
    try {
        const result = client.query(q);
        console.log("result", result);
    } catch (error) {
        console.warn("connectAndQuery function error -> ", error);
    } finally {
        client.end();
    }

}
