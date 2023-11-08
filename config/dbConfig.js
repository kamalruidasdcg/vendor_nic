// // get the client
const mysql2 = require("mysql2");
const mysql = require("mysql2/promise");

require("dotenv").config();



const connObj = {
  host: process.env.DB_HOST_ADDRESS,
  port: process.env.DB_CONN_PORT,
  user: process.env.DB_USER,
  password: "",
  database: process.env.DB_NAME,
  multipleStatements: true,
}

console.log("connObj", connObj);

// create the connection to database
const connection =   mysql2.createConnection(connObj);



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


const promiseConnection = async () => {

  return  await mysql.createConnection(connObj);
  

}



module.exports = { query, connection, promiseConnection };
