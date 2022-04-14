const express = require('express');
const router = express.Router();

// temporary data storage
const sponsors = [];

router.get('/sponsor', (req, res) => {
  res.redirect('/');
});

// temp route for testing
router.get('/sponsors', (req, res) => {
  res.send(sponsors);
})

router.post('/sponsor', (req, res) => {
  var { startDate, months, user, poi } = req.body;
  var sponsor = {
    startDate: startDate,
    months: months,
    user: user,
    poi: poi
  };
  sponsors.push(sponsor);
  res.status(201).send('sponsored!');
})

router.get('/active', (req, res) => {

})

module.exports = router;