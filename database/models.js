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
pool.grabview = async (poiId) => {
  const query = `SELECT * FROM test`;
  const love = await pool.query(query)
  // console.log(love.rows)
  return
}

pool.lovePoi = async (poiId) => {
  const query = `INSERT INTO test (name) VALUES ('this is a test')`;
  const love = await pool.query(query)
  // console.log(love.rows)
  return;
}

pool.flagPoi = async (poiId) => {

}

pool.loveExp = async (expId) => {

}

pool.flagExp = async (expId) => {

}

pool.addExperience = async (params) => {
  try {
    // add the poi to pois table if not there
    // if the poi is already in the pois table
    const query = `INSERT INTO experiences
      (poi_id, experience, loves, flag_status, photos)
      VALUES ($1, $2, 0, false, null)`;
    const addingExperience = await pool.query(query, params);
    return 'Thanks for sharing with the community!!';
      // else add it to pois and add the experience
  } catch (err) {
    console.log(err.message);
  }
}

pool.deleteExperience = async (params) => {
  try {
    const query = `DELETE FROM experiences WHERE poi_id = $1 AND id = $2`;
    const deleteExp = await pool.query(query, params);
    console.log('experience deleted')
  } catch (err) {
    console.log(err.message);
  }
}

// ADD POI models

// Auth models

// details models

// filter models

// map models

// SEE POI models

module.exports = { pool };