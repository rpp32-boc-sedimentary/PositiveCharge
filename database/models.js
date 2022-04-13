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

// Details models
pool.lovePoi = async (poiId) => {
  const query = `INSERT INTO test (name) VALUES ('this is a test')`;
  const love = await pool.query(query)
  console.log(love.rows)
  return;
}

pool.grabview = async (poiId) => {
  const query = `SELECT * FROM test`;
  const love = await pool.query(query)
  console.log(love.rows)
  return
}

pool.lovePoi = async (poiId) => {

}

pool.flagPoi = async (poiId) => {

}

pool.loveExp = async (expId) => {

}

pool.flagExp = async (expId) => {

}

pool.addExperience = async (exp) => {

}

pool.deleteExperience = async (expId) => {

}

// ADD POI models

// Auth models

// details models

// filter models

// map models

// SEE POI models

module.exports = { pool };