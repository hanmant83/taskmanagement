const config = require(process.cwd() + '/configuration/config');
const { Pool } = require('pg')
const db = () => { }

// Executes the given parameterized query.
db.executeNonQuery = async (queryText, values, next) => {
const pool = new Pool(config.DBDetails);
const response = await pool.query(queryText, values);
await pool.end();
return response;
};

// Executes the no parameterized query.
db.executeNonQueryNoParameter = async (queryText, next) => {
const pool = new Pool(config.DBDetails);
const response = await pool.query(queryText);
await pool.end();
return response;
};

module.exports = db;
