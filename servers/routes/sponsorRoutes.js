const express = require('express');
const router = express.Router();
const { pool } = require('../../database/models');
const { verifyToken } = require('./authRoutes');

// temporary data storage
const sponsors = [];

router.get('/sponsor', (req, res) => {
  res.redirect('/');
});

// temp route for testing
router.get('/sponsors', (req, res) => {
  res.send(sponsors);
})

router.get('/get-poi-user', verifyToken, async (req, res) => {
  try {
    var poi = await pool.getPoi([req.query.name]);
    if (poi.length > 0) {
      poi = poi[0].id;
    } else {
      poi = null;
    }
    res.send({ poi: poi, user: req.user.id });
  }
  catch (err) {
    console.error(err);
  }
})

router.post('/sponsor', (req, res) => {
  // console.log('sponsor req', req.body);
  var { startDate, months, user, poi } = req.body;
  // get user_id & poi_id
  var sponsor = {
    startDate: startDate,
    months: months,
    user: user,
    poi: poi
  };
  sponsors.push(sponsor);
  console.log('sponsors: ', sponsors);
  res.status(201).send('sponsored!');
})

router.get('/active', (req, res) => {

})

module.exports = router;