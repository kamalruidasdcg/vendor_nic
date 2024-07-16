const pool = require("../config/pgDBConfigSync");

exports.getColumnDataType = async (schemaName, tableName, columnName) => {
  try {
    const query = `
      SELECT data_type
      FROM information_schema.columns
      WHERE table_schema = $1
      AND table_name = $2
      AND column_name = $3
    `;

    const res = await pool.query(query, [schemaName, tableName, columnName]);

    if (res.rows.length > 0) {
      return res.rows[0].data_type;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error executing query", err.stack);
  }
};
