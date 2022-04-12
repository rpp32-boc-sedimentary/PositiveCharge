const detailsModels = require('./models/detailsModels.js');
const addPOImodels = require('./models/addPOImodels');
const authModels = require('./models/authModels');
const filterModels = require('./models/filterModels');
const mapModels = require('./models/mapModels');
const seePOIModels = require('./models/seePOIModels');
const _ = require('underscore');

const pool = {};

_.extend(pool, detailsModels);
_.extend(pool, addPOImodels);
_.extend(pool, authModels);
_.extend(pool, filterModels);
_.extend(pool, mapModels);
_.extend(pool, seePOIModels);

module.exports = { pool };
