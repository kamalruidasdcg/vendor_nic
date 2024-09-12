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

exports.getColumnPrimaryKey = async (schemaName, tableName) => {
  try {
    const query = `
      SELECT kcu.column_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
      WHERE tc.constraint_type = 'PRIMARY KEY'
      AND tc.table_name = $1
      AND tc.table_schema = $2 
	    AND kcu.column_name = 'id';
    `;

    const { rows } = await pool.query(query, [tableName, schemaName]);

    // Return the array of primary key column names
    return rows.map((row) => row.column_name);
  } catch (error) {
    console.error("Error fetching primary key columns:", error);
    throw error;
  }
};

exports.adjustSequences = async (tableName) => {
  try {
    // Get sequence names associated with the table
    const sequencesQuery = `
      SELECT c.relname AS sequence_name
      FROM pg_class c
      JOIN pg_depend d ON d.objid = c.oid
      JOIN pg_attribute a ON a.attnum = d.refobjsubid
      WHERE d.refobjid = (
        SELECT oid
        FROM pg_class
        WHERE relname = $1
      )
      AND c.relkind = 'S';
    `;

    const { rows: sequences } = await pool.query(sequencesQuery, [tableName]);

    for (const sequence of sequences) {
      // Get the maximum value from the table for the column associated with the sequence
      const maxIdQuery = `
        SELECT MAX(id) AS max_id
        FROM ${tableName};
      `;
      const { rows: maxIdResult } = await pool.query(maxIdQuery);
      const maxId = maxIdResult[0].max_id;

      if (maxId !== null) {
        // Adjust the sequence to be set after the maximum ID
        const setvalQuery = `
          SELECT setval($1, $2);
        `;
        await pool.query(setvalQuery, [sequence.sequence_name, maxId + 1]);

        // console.log(
        //   `Sequence ${sequence.sequence_name} adjusted successfully.`
        // );
      } else {
        console.log(`No rows found in the ${tableName} table.`);
      }
    }
  } catch (error) {
    console.error(
      `Error adjusting sequences for table ${tableName}:`,
      error.message
    );
    throw error;
  }
};
