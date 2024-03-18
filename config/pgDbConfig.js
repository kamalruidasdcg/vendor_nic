const { Pool, Client } = require("pg");

const connObj = {
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "grse_btn",
  port: process.env.PGPORT || 5432,
  password: process.env.PGPASSWORD || "postgres",
};

const connectAndQuery = async (text, values) => {
  const client = new Client(connObj);
  // console.log(client);
  try {
    console.log("connObj", connObj);
    const connection = await client.connect();
    console.log("connect", connection);
    const result = await client.query(text, values);
    console.log("result", result);
  } catch (error) {
    console.warn("connectAndQuery function error -> ", error);
  } finally {
    console.log("<><><> finally block");
    client.end();
  }

  console.log("<><><> finally block", q, val);
};



const connectAndGetData = async (text, values) => {
  const client = new Client(connObj);
  // console.log(client);
  try {
    console.log("connObj", connObj);
    const connection = await client.connect();
    console.log("connect", connection);
    const result = await client.query(text, values);
    console.log("result", result);
  } catch (error) {
    console.warn("connectAndQuery function error -> ", error);
  } finally {
    console.log("<><><> finally block");
    client.end();
  }

  console.log("<><><> finally block", q, val);
};


// function fn() {

//     connectAndQuery('select * from adr6', []);
// }

// fn();

module.exports = { connectAndQuery };
