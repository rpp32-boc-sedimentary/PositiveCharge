const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_Host,
  user: process.env.DB_User,
  port: process.env.DB_Port,
  password: process.env.DB_Password,
  database: process.env.DB_Name,
  max: 50,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 1000
});

// Details models
const addNewPoi = async (paramList) => {
  let addPoiQuery = `INSERT INTO pois
  (yelp_id, loves, flag_status, sponsored)
  VALUES ($1, 0, false, false)`;
  let addPoi = await pool.query(addPoiQuery, paramList);
  return
}

pool.grabview = async (params) => {
  const query =
  `SELECT
     loves, flag_status, experience, exp_loves, exp_flag_status
   FROM
     pois, experiences
   WHERE
     pois.yelp_id = experiences.poi_id
   AND
     experiences.poi_id = $1`;
  const grabDetails = await pool.query(query, params)
  return grabDetails.rows;
}

pool.lovePoi = async (params) => {
  const lovePoiQuery = `UPDATE pois SET loves = loves + 1 WHERE yelp_id = $1`;
  const changeLove = `UPDATE users_details SET love_poi = NOT love_poi WHERE poi_id = $1 AND user_email = $2`;
  try {
    let checkPoi = await pool.query(`select exists(select 1 from pois where yelp_id = $1)`, [params[0]]);
    if (checkPoi.rows[0].exists) {
      const checkUserExists = await pool.query(`select exists(select 1 from users_details where poi_id = $1 AND user_email = $2)`, params)
      if (!checkUserExists.rows[0].exists) {
        const createUserInteractionRow = await pool.query(`INSERT INTO users_details (user_email, poi_id, experience, love_poi, love_exp, flag_poi, flag_exp) VALUES ($2, $1, null, false, false, false, false)`, params)
      }

      const check = await pool.query(`SELECT love_poi FROM users_details WHERE poi_id = $1 AND user_email = $2`, params);
      if (!check) {
        const setLoveToTrue = await pool.query(changeLove, params);
        const lovedPoi = await pool.query(lovePoiQuery, [params[0]]);
        return params;
      } else {
        const setLoveToFalse = await pool.query(changeLove, params);
        const unlovePoi = await pool.query(`UPDATE pois SET loves = loves - 1 WHERE yelp_id = $1`, [params[0]]);
        return params;
      }
    } else {
      let addingPoi = await addNewPoi([params[0]]);
      const createUserInteractionRow = await pool.query(`INSERT INTO users_details (user_email, poi_id, experience, love_poi, love_exp, flag_poi, flag_exp) VALUES ($2, $1, null, false, false, false, false)`, params)
      const setLoveToTrue = await pool.query(changeLove, params);
      const lovedPoi = await pool.query(lovePoiQuery, [params[0]]);
      return params;
    }
  } catch (err) {
    console.log(err.message)
  }
  return;
}

pool.flagPoi = async (params) => {
  const flagPoiQuery = `UPDATE pois SET flag_status = NOT flag_status WHERE yelp_id = $1`;
  const changeFlagUsers = `UPDATE users_details SET flag_poi = NOT flag_poi WHERE poi_id = $1 AND user_email = $2`;
  try {
    let checkPoi = await pool.query(`select exists(select 1 from pois where yelp_id = $1)`, [params[0]]);
    if (checkPoi.rows[0].exists) {
      const checkUserExists = await pool.query(`select exists(select 1 from users_details where poi_id = $1 AND user_email = $2)`, params)
      if (!checkUserExists.rows[0].exists) {
        const createUserInteractionRow = await pool.query(`INSERT INTO users_details (user_email, poi_id, experience, love_poi, love_exp, flag_poi, flag_exp) VALUES ($2, $1, null, false, false, false, false)`, params)
      }
      const check = await pool.query(`SELECT love_poi FROM users_details WHERE poi_id = $1 AND user_email = $2`, params);
      if (!check) {
        const changeFlag = await pool.query(changeFlagUsers, params);
        const changeFlagPoi = await pool.query(flagPoiQuery, [params[0]]);
        return params;
      } else {
        const changeFlag = await pool.query(changeFlagUsers, params);
        const changeFlagPoi = await pool.query(flagPoiQuery, [params[0]]);
        return params;
      }
    } else {
      let addingPoi = await addNewPoi([params[0]]);
      const createUserInteractionRow = await pool.query(`INSERT INTO users_details (user_email, poi_id, experience, love_poi, love_exp, flag_poi, flag_exp) VALUES ($2, $1, null, false, false, false, false)`, params)
      const changeFlag = await pool.query(changeFlagUsers, params);
      const changeFlagPoi = await pool.query(flagPoiQuery, [params[0]]);
      return params;
    }
  } catch (err) {
    console.log(err.message)
  }
  return;
}

pool.loveExp = async (params) => {
  const loveExpQuery = `UPDATE experiences
  SET exp_loves = exp_loves + 1
  WHERE poi_id = $1
  AND experience = $2`;
  const lovedExp = await pool.query(loveExpQuery, params);
  return params;
}

pool.flagExp = async (params) => {
  const flagExpQuery = `UPDATE experiences
  SET exp_flag_status = NOT exp_flag_status
  WHERE poi_id = $1
  AND experience = $2`;
  const changeFlagExp = await pool.query(flagExpQuery, params);
  return params;
}

pool.addExperience = async (params) => {
  let addPoiParams = [params[0]];

  let addExperienceQuery = `INSERT INTO experiences
  (poi_id, experience, exp_loves, exp_flag_status, photos)
  VALUES ($1, $2, 0, false, null)`;

  try {
    let checkPoi = await pool.query(`select exists(select 1 from pois where yelp_id = $1)`, addPoiParams);
    if (checkPoi.rows[0].exists) {

      let addingExperience = await pool.query(addExperienceQuery, params);
      return params;
    } else {
      let addPoi = await addNewPoi(addPoiParams);
      let addingExperience = await pool.query(addExperienceQuery, params);
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
  let params
  let query
  if (Array.isArray(newPoi) && newPoi.length === 1 && typeof newPoi[0] === 'string') {
    params = newPoi
  } if (params.length === 1) {
    query = `INSERT INTO pois (yelp_id)
    VALUES ($1)
    RETURNING *`
  } else {
    console.log('newPoi', newPoi)
    query = `INSERT INTO pois
    (name, address, long, lat, price, category)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`;
    params = [newPoi.name, newPoi.address, newPoi.lng, newPoi.lat, newPoi.price, newPoi.category]
  } try {
    const result = await pool.query(query, params)
    console.log(result.rows)
    return result.rows
  } catch (err) {
    console.log(err.stack)
    return err.stack
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

pool.getUser = async (email) => {
  try {
    var query = `SELECT * FROM users WHERE email = $1`;
    var user = await pool.query(query, email);
    return user.rows;
  }
  catch (err) {
    console.error(err);
  }
}

//sponsor models
pool.getPoi = async (name) => {
  try {
    var query = `SELECT * FROM pois WHERE name = $1`;
    var poi = await pool.query(query, name);
    console.log('poi', poi.rows);
    return poi.rows;
  }
  catch (err) {
    console.error(err);
  }
}

pool.addSponsor = async (details) => {
  try {
    var query = `INSERT INTO sponsors (user_id, poi_id, start_date, end_date)
    VALUES ($1, $2, $3, $4)`;
    var result = await pool.query(query, details);
    return details;
  }
  catch (err) {
    console.error(err);
  }
}

pool.findSponsorsToActivate = async () => {
  try {
    // find POIs which are within sponsored window but are not yet active
    var query = `
      SELECT sponsors.poi_id FROM sponsors
      JOIN pois ON sponsors.poi_id = pois.id
      WHERE ((SELECT CURRENT_DATE) >= sponsors.start_date
      AND (SELECT CURRENT_DATE) <= sponsors.end_date)
      AND pois.sponsored = $1
      GROUP BY sponsors.poi_id`;
    var result = await pool.query(query, [false]);
    return result.rows;
  }
  catch (err) {
    console.error(err);
  }
}

pool.findSponsorsToDeactivate = async () => {
  try {
    // find POIs which are outside of sponsored window but not yet deactivated
    var query = `
      SELECT sponsors.poi_id FROM sponsors
      JOIN pois ON sponsors.poi_id = pois.id
      WHERE ((SELECT CURRENT_DATE) < sponsors.start_date
      AND (SELECT CURRENT_DATE) > sponsors.end_date)
      AND pois.sponsored = $1
      GROUP BY sponsors.poi_id`;
    var result = await pool.query(query, [true]);
    return result.rows;
  }
  catch (err) {
    console.error(err);
  }
}

pool.activateSponsor = async (poi) => {
  try {
    var query = `UPDATE pois SET sponsored = $1 WHERE id = $2`;
    var result = await pool.query(query, [true, poi]);
    return result;
  }
  catch (err) {
    console.error(err);
  }
}

pool.deactivateSponsor = async (poi) => {
  try {
    var query = `UPDATE pois SET sponsored = $1 WHERE id = $2`;
    var result = await pool.query(query, [false, poi]);
    return result;
  }
  catch (err) {
    console.error(err);
  }
}

// Maybe keep record of all sponsors even if expired, no need to delete? TBD
pool.deleteSponsor = async (id) => {
  try {
    var query = `DELETE FROM sponsors WHERE id = $1`;
    var result = await pool.query(query, id);
    return result;
  }
  catch (err) {
    console.error(err);
  }
}

// details models

// filter models

// map models

// SEE POI models

module.exports = { pool };