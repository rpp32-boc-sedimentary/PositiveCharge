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
    categories: 'restaurants, cafes, museums, landmarks, parks',
    limit: 20,
    sort_by: 'rating',
    open_now: true
    })
    .then(data => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      })
    });



seePOIRouter.post('/getFoodPOI', async (req, res) => {
  let lat = req.body.data.lat;
  let long = req.body.data.long;
  let dist = req.body.data.dist;

  client.search({
    latitude: lat,
      longitude: long,
      radius: dist,
      categories: 'restaurants',
      limit: 20,
      sort_by: 'rating',
      open_now: true
  })
  .then(data => {
    res.send(data);
  })
  .catch((err) => {
    console.error(err);
  })
});

seePOIRouter.post('/getCafesPOI', async (req, res) => {
  let lat = req.body.data.lat;
  let long = req.body.data.long;
  let dist = req.body.data.dist;

  client.search({
    latitude: lat,
      longitude: long,
      radius: dist,
      categories: 'cafes',
      limit: 20,
      sort_by: 'rating',
      open_now: true
  })
  .then(data => {
    res.send(data);
  })
  .catch((err) => {
    console.error(err);
  })
});

seePOIRouter.post('/getMuseumsPOI', async (req, res) => {
  let lat = req.body.data.lat;
  let long = req.body.data.long;
  let dist = req.body.data.dist;

  client.search({
    latitude: lat,
      longitude: long,
      radius: dist,
      categories: 'museums',
      limit: 20,
      sort_by: 'rating',
      open_now: true
  })
  .then(data => {
    res.send(data);
  })
  .catch((err) => {
    console.error(err);
  })
});

seePOIRouter.post('/getLAndHPOI', async (req, res) => {
  let lat = req.body.data.lat;
  let long = req.body.data.long;
  let dist = req.body.data.dist;

  client.search({
    latitude: lat,
      longitude: long,
      radius: dist,
      categories: 'landmarks',
      limit: 20,
      sort_by: 'rating',
      open_now: true
  })
  .then(data => {
    res.send(data);
  })
  .catch((err) => {
    console.error(err);
  })
});

seePOIRouter.post('/getParksPOI', async (req, res) => {
  let lat = req.body.data.lat;
  let long = req.body.data.long;
  let dist = req.body.data.dist;

  client.search({
    latitude: lat,
      longitude: long,
      radius: dist,
      categories: 'parks',
      limit: 20,
      sort_by: 'rating',
      open_now: true
  })
  .then(data => {
    res.send(data);
  })
  .catch((err) => {
    console.error(err);
  })
});

seePOIRouter.post('/seeDataPOI', async (req, res, next) => {

  const result = await seePOIRouter.seeDataPoi(req.body);
  try {
    console.log('result in see route', result)
    res.status(201).send(result);
  }
  catch {
    console.log('error in see route', err)
    res.status(500).send(err)
  }


});


module.exports = seePOIRouter;