const { Pool } = require('pg');
const _ = require('underscore');
const detailsModels = require('./models/detailsModels.js')

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

_.extend(pool, detailsModels)


module.exports = {pool};
