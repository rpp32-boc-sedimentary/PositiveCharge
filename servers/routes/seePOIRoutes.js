const express = require('express');
const seePOIRouter = express.Router();
const axios = require('axios');
require ('dotenv').config()
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API_KEY);

seePOIRouter.get('/seePOI', async (req, res) => {
  try {
    res.redirect('/')
  } catch(err) {
    res.status(500).send(err)
  }
})

seePOIRouter.post('/getPOI', async (req, res) => {
  let lat = req.body.data.lat;
  let long = req.body.data.long;
  let dist = req.body.data.dist;

  client.search({
    latitude: lat,
      longitude: long,
      radius: dist,
      categories: 'Food, Cafes, Museums, Landmarks & Historical, Parks',
      limit: 5,
      sort_by: 'rating',
      open_now: true
  })
  .then(data => {
    res.send(data);
  })
  .catch((err) => {
    console.error(err);
  })

})
module.exports = seePOIRouter;