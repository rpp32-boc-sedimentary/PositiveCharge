const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_Host,
  user: process.env.DB_User,
  port: process.env.DB_Port,
  password: process.env.DB_Password,
  database: process.env.DB_Name,
  max: 50,
  connectionTimeoutMillis: 1000,
  idleTimeoutMillis: 1000
});

pool.addPOI = async (data) => {
  const query = `SELECT * FROM test`;
  const result = await pool.query(query);
  console.log('result in models', result.rows);
  return;
}

module.exports = { pool };