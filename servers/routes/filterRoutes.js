const express = require('express');
const router = express.Router();
require('dotenv').config();
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API_KEY);
const client2 = yelp.client(process.env.YELP_KEY_2);
const axios = require('axios');
const { request, gql, GraphQLClient } = require('graphql-request');

router.get('/', (req, res) => {
  client.search({
    location: '10151 arrow rte, rancho cucamonga',
    term: 'bakery',
    categories: null,
    radius: 500,
    attributes: null
  })
    .then(data => {
      console.log('data', data.jsonBody.businesses)
      let parsed = JSON.parse(data.body).businesses;
      let busAndCar = [];
      data.jsonBody.businesses.forEach(item => {
        busAndCar.push(item.name, item.categories)
      })
      console.log('busAndCar', busAndCar)
      let allBusDetails = [];
      let allIds = [];
      parsed.forEach(item => {
        let { id, name, categories } = item;
        allIds.push(id);
        let parsedObj = { id, name, categories };
        allBusDetails.push(parsedObj);
      })
      return allIds;
    })
    .then(ids => {
      const moreBusDetails = ids.map(id => {
        return client.business(id);
      });
      // Not all ids got a success 200. many 429 too many requests. Will need to slow down request speeds.
      const completedDetails = Promise.allSettled(moreBusDetails);
      return completedDetails;
    })
    .then(details => {
      let businessDetails = [];
      details.forEach(item => {
        if (item.value) {
          let { name, is_closed, categories, price, hours } = item.value.jsonBody;
          let neededInfo = { name, is_closed, categories, price, hours };
          businessDetails.push(neededInfo);
        }
      })
    })
    .catch(err => {
      console.log('error from yelp api', err);
    })
})

router.get('/graphql', (req, res) => {

  async function main() {
    const endpoint = 'https://api.yelp.com/v3/graphql';

    const gClient = new GraphQLClient(endpoint, {
      headers: { 'Authorization': `Bearer ${process.env.YELP_API_KEY}` }
    });
    const query = gql`
      {
        search(location: "san francisco, ca", term: "burritos", radius: 200) {
          total
          business {
            id
            is_closed
            hours {
              open {
                start
                end
                day
              }
              is_open_now
            }
            name
            location {
              formatted_address
            }
            price
            distance
          }
        }
      }
    `
    const data = await gClient.request(query, req.body)
    res.status(200).send(data);
    console.log((data.search.business))
  }
  main().catch((err) => {
    console.error(err)
  })
})





module.exports = router