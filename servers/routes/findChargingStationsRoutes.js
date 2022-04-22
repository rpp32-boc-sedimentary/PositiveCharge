const express = require('express');
const axios = require('axios');
const findRouter = express.Router();
require('dotenv').config();


findRouter.get('/findStations', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  axios.get('https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json',
  {
    params: {
      api_key: process.env.NREL_API_KEY,
      latitude: req.query.userLat,
      longitude: req.query.userLong,
      fuel_type: 'ELEC',
      radius: Number(req.query.radius),
      access: 'public',
      limit: 'all'
    }
  })
    .then((stationsInfo) => {
      res.status(200).send(stationsInfo.data.fuel_stations);
    })
    .catch((err) => {
      console.log('Error @ post in router: ', err);
      res.status(404).send('Error finding fuel_stations: ' + err);
    });
});

module.exports = findRouter;