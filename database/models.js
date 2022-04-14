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

pool.grabview = async (poiId) => {

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
pool.addPOI = async (newPoi) => {
  console.log('newPoi', newPoi)
  const query = `INSERT INTO pois
  (id, name, long, lat, price, category)
  VALUES (DEFAULT, $1, $2, $3, $4, $5)
  RETURNING *`;
  let values = [newPoi.name, newPoi.long, newPoi.lat, newPoi.price, newPoi.category]
  try {
    const result = await pool.query(query, values)
    console.log(result.rows)
    return result.rows
  } catch (err) {
    console.log(err.stack)
  }
}

// pool.addPOI = async () => {
//   try {
//     const result = await pool.query('SELECT * FROM pois WHERE false')
//     return result
//   } catch (err) {
//     console.log('err.stack', err.stack)
//   }
// }

// pool.addPOI = async () => {
//   try {
//     const query = 'SELECT * from pois WHERE true'
//     const result = await pool.query(query)
//     return result.rows
//   } catch (err) {
//     console.log(err.stack)
//   }
// }


// Auth models

// details models

// filter models

// map models

// SEE POI models

module.exports = { pool };