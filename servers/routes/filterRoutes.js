const express = require('express');
const router = express.Router();
require('dotenv').config();
const { gql, GraphQLClient } = require('graphql-request');


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
    // console.log('cafe', cafeData.search.business);
    // console.log('food', foodData.search.business);
    // console.log('museum', museumData.search.business);
    // console.log('landmarks', landData.search.business);
    // console.log('park', parkData.search.business);
  };

  main().catch((err) => {
    console.error(err)
  })
})



module.exports = router;