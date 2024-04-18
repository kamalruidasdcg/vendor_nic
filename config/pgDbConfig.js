// const { Pool, Client } = require("pg");

// const connObj = {
//   user: process.env.PGUSER || "postgres",
//   host: process.env.PGHOST || "localhost",
//   database: process.env.PGDATABASE || "grse_btn",
//   port: process.env.PGPORT || 5432,
//   password: process.env.PGPASSWORD || "postgres",
// };

// const connectAndQuery = async (text, values) => {
//   const client = new Client(connObj);
//   // console.log(client);
//   try {
//     console.log("connObj", connObj);
//     const connection = await client.connect();
//     console.log("connect", connection);
//     const result = await client.query(text, values);
//     console.log("result", result);
//   } catch (error) {
//     console.warn("connectAndQuery function error -> ", error);
//   } finally {
//     console.log("<><><> finally block");
//     client.end();
//   }

//   console.log("<><><> finally block", q, val);
// };



// const connectAndGetData = async (text, values) => {
//   const client = new Client(connObj);
//   // console.log(client);
//   try {
//     console.log("connObj", connObj);
//     const connection = await client.connect();
//     console.log("connect", connection);
//     const result = await client.query({
//       rowMode: 'array',
//       text,
//     });
//     console.log("result", result.fields[0]);
//     console.log(result.fields[0].name) // one
// console.log(result.fields[1].name) // two
//     console.log("ooooooooooooo", result.rows)
//   } catch (error) {
//     console.warn("connectAndQuery function error -> ", error);
//   } finally {
//     console.log("<><><> finally block");
//     client.end();
//   }

//   console.log("<><><> finally block");
// };


// async function fn() {

//   await connectAndGetData('select * from adr6', []);
// }


// // module.exports = { connectAndQuery, connectAndGetData };
