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

pool.testModelFunc = async (param) => {
  const query = `SELECT * FROM test`;
  const result = await pool.query(query);
  console.log(result.rows);
  return;
}

pool.addUser = async (params) => {
  try {
    var query = `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)`;
    var result = await pool.query(query, params);
    return 'Added new user';
  }
  catch (err) {
    console.error(err);
  }
}

pool.getUser = async (param) => {
  try {
    var query = `SELECT * FROM users WHERE email = $1`;
    var user = await pool.query(query, param);
    return user.rows;
  }
  catch (err) {
    console.error(err);
  }
}

module.exports = { pool };