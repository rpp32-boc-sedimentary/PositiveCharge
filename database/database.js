const { Pool } = require('pg');
const _ = require('underscore');

// imported model functions for details feature
const detailsModels = require('./models/detailsModels.js')


// need these parameters for the db to set up connection
const pool = new Pool({
  // host: process.env.DB_Host,
  // user: process.env.DB_User,
  // port: process.env.DB_Port,
  // password: process.env.DB_Password,
  // database: process.env.DB_Name,
  // max: 100,
  // connectionTimeoutMillis: 1000,
  // idleTimeoutMillis: 1000
});


// add your object with model methods on it too the pool here
// pool gets imported in server.js
_.extend(pool, detailsModels)

module.exports = { pool };
