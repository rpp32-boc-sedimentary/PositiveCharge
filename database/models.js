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

  let addParams = [params[0], params[1]];
  let addPoiParams = [params[0], params[2], params[3], params[4]];

  let addExperienceQuery = `INSERT INTO experiences
  (poi_id, experience, loves, flag_status, photos)
  VALUES ($1, $2, 0, false, null)`;

  let addPoiQuery = `INSERT INTO pois
  (name, address, price, category, yelp_id, loves, flag_status, long, lat, sponsored)
  VALUES
  ($2, null, null, null, $1, 0, false, $3, $4, false)`;

  try {
    let checkPoi = await pool.query(`select exists(select 1 from pois where yelp_id = $1)`, [params[0]]);
    if (checkPoi.rows[0].exists) {

      let addingExperience = await pool.query(addExperienceQuery, addParams);
      return 'Thanks for sharing with the community!!';
    } else {

      let addPoi = await pool.query(addPoiQuery, addPoiParams);
      let addingExperience = await pool.query(addExperienceQuery, addParams);
    }
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
pool.addPOI = async (newPoi) => {
  console.log('newPoi', newPoi)
  const query = `INSERT INTO pois
  (name, address, long, lat, price, category)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *`;
  let values = [newPoi.name, newPoi.address, newPoi.lng, newPoi.lat, newPoi.price, newPoi.category]
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