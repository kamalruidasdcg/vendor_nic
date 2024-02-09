// // get the client
const mysql2 = require("mysql2");
const mysql = require("mysql2/promise");

require("dotenv").config();

const connObj = {
  host: process.env.DB_HOST_ADDRESS,
  port: process.env.DB_CONN_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
};

// create the connection to database

// const promiseConnection =  mysql.createConnection(connObj);

// module.exports = connection;

/**
 *
 * @param {Object} { query, values }
 * @returns result Object
 */

async function query({ query, values = [] }) {
  const db = await mysql.createConnection(connObj);

  try {
    const [results] = await db.execute(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}

/**
 * DB CONNECTION
 * **** MUST HAVE TO END CONNECTION *****
 * connection.end();
 * @returns
 */

async function connection() {
  let dbConn;
  try {
    dbConn = await mysql.createConnection(connObj);
    return dbConn;
  } catch (error) {
    return { error };
  }
}

module.exports = { query, connection };
