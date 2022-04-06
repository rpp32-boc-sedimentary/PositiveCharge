const express = require('express');
const router = express.Router();
require('dotenv').config();
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API_KEY);
const client2 = yelp.client(process.env.YELP_KEY_2);

router.get('/', (req, res) => {
  console.log('hello')
  client.search({
    location: '52 w 9th st. upland, ca',
    radius: 400
  })
    .then(data => {
      let parsed = JSON.parse(data.body).businesses;
      let allBusDetails = [];
      let allIds = [];
      parsed.forEach(item => {
        let { id, name, categories } = item;
        allIds.push(id);
        let parsedObj = { id, name, categories };
        allBusDetails.push(parsedObj);
      })
      console.log(allIds)
      return allIds;
    })
    .then(ids => {
      const moreBusDetails = ids.map(id => {
        return client2.business(id);
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


module.exports = router;