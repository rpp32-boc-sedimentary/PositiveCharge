
require('dotenv').config()
const axios = require('axios');

const express = require('express');
const router = express.Router();




router.get('/', (req, res) => {
    //res.send("Testing route completed");
    //console.log('req params for finding route: ', req.query)
    var coords = req.query;
    axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${coords.startingLat}%2C${coords.startingLong}%3A${coords.endingLat}%2C${coords.endingLong}/json`, 
        {params: {instructionsType: 'text', travelMode: 'pedestrian', key: process.env.MAP_KEY}})
    .then(response => {
        var guidance = response.data.routes[0].guidance;
        //res.send(guidance);
        res.send(response.data.routes[0])
    })
    .catch(err => {
        console.log('Failed while trying to grab directions: ' + err);
        res.status(500).send('Errored out while tryign to grab directions');
    })

})

module.exports = router;