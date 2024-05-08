const { Pool } = require("pg");

const pgDbConfig = {
    user: process.env.PG_DB_USER || "postgres",
    host: process.env.PG_DB_HOST || "localhost",
    database: process.env.PG_DB_DATABASE_NAME || "grse_btn",
    password: process.env.PG_DB_PASSWORD || "postgres",
    port: process.env.PG_DB_PORT || 5432,
    max: process.env.PG_DB_MAX_CONNECTIONS || 20,
    idleTimeoutMillis: process.env.PG_DB_IDLE_TIMEOUT || 30000,
    connectionTimeoutMillis: process.env.PG_DB_CONNECTION_TIMEOUT || 2000,
};

const asyncPool = async () => {
    try {
        const pool = new Pool(pgDbConfig);
        return pool;
    } catch (error) {
        throw new Error(`Error creating connection pool: ${error.message}`);
    }
};

const query = async ({ queryText, values }) => {
    const pool = await asyncPool();
    try {
        const result = await pool.query(queryText, values);
        return result;
    } catch (error) {
        throw new Error(`Error executing query: ${error.message}`);
    } finally {
        // Consider using pool.end() for graceful shutdown on application exit
        // but not necessary for each query execution
        pool.end();
    }
};

const getQuery = async ({ query, values }) => {
    const pool = await asyncPool();
    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        throw new Error(`Error fetching rows: ${error.message}`);
    } finally {
        // Consider using pool.end() for graceful shutdown on application exit
        // but not necessary for each query execution
        pool.end();
    }
};

const poolClient = async () => {
    const pool = await asyncPool();
    try {
        const client = await pool.connect();
        // client.release() Must need to Release
        return client;
    } catch (error) {
        throw new Error(`Error connecting to database: ${error.message}`);
    }
};

module.exports = { query, poolClient, getQuery };
