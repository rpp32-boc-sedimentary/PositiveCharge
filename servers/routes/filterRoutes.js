const express = require('express');
const router = express.Router();
require('dotenv').config();
const { gql, GraphQLClient } = require('graphql-request');
const axios = require('axios');


router.get('/graphql', (req, res) => {
  let lat = req.query.lat;
  let long = req.query.long;
  async function main() {

    const endpoint = 'https://api.yelp.com/v3/graphql';

    const gClient = new GraphQLClient(endpoint, {
      headers: { 'Authorization': `Bearer ${process.env.YELP_API_KEY}` }
    });
    const food = 'food';
    const cafes = 'cafes';
    const museums = 'museums';
    const lAndH = 'landmarks & historical';
    const parks = 'parks';

    const returnQuery = (term, lat, long) => {
      let query = gql`
        {
          search(latitude: ${lat}, longitude: ${long},  term: "${term}", radius: 1000, limit: 10) {
            total
            business {
              name
              id
              rating
              price
              distance
              hours {
                open {
                  start
                  end
                  day
                }
                is_open_now
              }
              location {
                formatted_address
              }
              coordinates {
                latitude
                longitude
              }
            }
          }
        }
      `
      return query;
    };

    const cafeData = await gClient.request(returnQuery(cafes, lat, long), req.body);
    const foodData = await gClient.request(returnQuery(food, lat, long), req.body);
    const museumData = await gClient.request(returnQuery(museums, lat, long), req.body);
    const landData = await gClient.request(returnQuery(lAndH, lat, long), req.body);
    const parkData = await gClient.request(returnQuery(parks, lat, long), req.body);
    //console.log('cafe', cafeData.search);
    // console.log('food', foodData.search.business);
    // console.log('museum', museumData.search.business);
    // console.log('landmarks', landData.search.business);
    // console.log('park', parkData.search.business);
  };

  main().catch((err) => {
    console.error(err);
  });
});


router.get('/selectedFilters', (req, res) => {
  let test = req.query;
  console.log('test', test);
})

//this api call will work for yelp locations
//will need to add a conditional for user added locations
//to account for coordinates formatted differently
router.post('/walkingTime', (req, res) => {
  let starting = req.body.data.starting;
  let startLat = starting.lat;
  let startLong = starting.long;
  //let places = req.body.data.slice(0, 25);
  let places = req.body.data.data;
  let allDurations = places.map(place => {
    let endLat = place.coordinates.latitude;
    let endLong = place.coordinates.longitude;
    return axios.get(`https://api.mapbox.com/optimized-trips/v1/mapbox/walking/${startLong},${startLat};${endLong},${endLat}?access_token=${process.env.MAPBOX_TOKEN}`)
  });
  Promise.allSettled(allDurations)
    .then(data => {
      let lessThanFive = false;
      let mapped = places.map((item, index) => {
        let roundTrip = data[index].value.data.trips[0].duration;
        let duration = Math.round(roundTrip/2/60);
        if (duration <= 5) {
          lessThanFive = true;
        }
        item.duration = duration;
        return item
      });
      let durationObject = {all: mapped, lessThanFive: lessThanFive}
      res.status(200).send(durationObject);
    })
    .catch(err => {
      console.error('error adding walking times to locations', err);
      res.status(500).send(err);
    })
})


router.get('/getAll', async (req, res) => {
  try {
    const result = await router.getAllPoi();
    console.log(result);
  } catch (err) {
    console.log('error getting all in routes', err)
  }
})




module.exports = router;