// database.js
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PG_DB_USER,
  host: process.env.PG_DB_HOST,
  database: process.env.PG_DB_DATABASE_NAME,
  password: process.env.PG_DB_PASSWORD,
  port: process.env.PG_DB_PORT,
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

module.exports = pool;
