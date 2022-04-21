const express = require('express');
const router = express.Router();
const { verifyToken } = require('./authRoutes');
const cron = require('node-cron');
const moment = require('moment');

router.get('/sponsor', (req, res) => {
  res.redirect('/');
});

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
  var endDate = moment(startDate).add(Number(months) * 31, 'days').format('YYYY-MM-DD');
  var sponsor = [user, poi, startDate, endDate];

  try {
    var result = await router.addSponsor(sponsor);
    console.log('addsponsor result:', result);
    res.status(201).send('sponsored!');
  }
  catch (err) {
    console.error(err);
  }
})

async function activate() {
  try {
    var toBeActivated = await router.findSponsorsToActivate();
    console.log('findSponsorsToActivate result:', toBeActivated);

    toBeActivated.forEach( async (obj) => {
      var update = await router.activateSponsor(obj.poi_id);
      console.log(update.command, update.rowCount);
    })
    return toBeActivated;
  }
  catch (err) {
    return err;
  }
}

router.get('/activate', async (req, res) => {
  try {
    var activatedPois = await activate();
    res.status(201).send(activatedPois);
  }
  catch (err) {
    console.error(err);
  }
})

async function deactivate() {
  try {
    var toBeDeactivated = await router.findSponsorsToDeactivate();
    console.log('findSponsorsToDeactivate result:', toBeDeactivated);

    toBeDeactivated.forEach( async (obj) => {
      var update = await router.deactivateSponsor(obj.poi_id);
      console.log(update.command, update.rowCount);
    })
    return toBeDeactivated;
  }
  catch (err) {
    return err;
  }
}

router.get('/deactivate', async (req, res) => {
  try {
    var deactivatedPois = await deactivate();
    res.status(201).send(deactivatedPois);
  }
  catch (err) {
    console.error(err);
  }
})

// Run job at midnight every day to check if POI should be activated or deactivated
cron.schedule('0 0 * * *', async () => {
  console.log('running cron task...');
  await activate();
  await deactivate();
})

module.exports = router;