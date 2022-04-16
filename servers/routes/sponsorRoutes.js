const express = require('express');
const router = express.Router();
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
    var poi = await router.getPoi([req.query.name]);
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

router.post('/sponsor', async (req, res) => {
  var { startDate, months, user, poi } = req.body;
  // get user_id & poi_id
  var sponsor = [user, poi, startDate, months];
  // sponsors.push(sponsor);
  // console.log('sponsors: ', sponsors);
  try {
    var result = await router.addSponsor(sponsor);
    console.log('addsponsor result:', result);
    res.status(201).send('sponsored!');
  }
  catch (err) {
    console.error(err);
  }
})

router.get('/activate', async (req, res) => {
  try {
    var toBeActivated = await router.checkSponsors();
    console.log('checksponsor result:', toBeActivated);

    toBeActivated.forEach( async (obj) => {
      var update = await router.activateSponsor(obj.poi_id);
      console.log(update);
    })
    res.status(201).send();
  }
  catch (err) {
    console.error(err);
  }
})

// Run job at midnight every day to check if POI should be activated
// setInterval(())

module.exports = router;