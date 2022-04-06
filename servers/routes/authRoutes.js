const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');

authRouter.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next()
})

// temp - delete after DB is set up
const users = [];

authRouter.post('/login', async (req, res) => {
  try {
    var credentials = { email: req.body.email, password: req.body.password }
    res.status(201).send(credentials);
  } catch (err) {
    res.status(500).send(err);
  }
})

authRouter.post('/signup', async (req, res) => {
  try {
    // var salt = await bcrypt.genSalt();
    var hashedPass = await bcrypt.hash(req.body.password, 10);
    var user = { name: req.body.name, email: req.body.email, password: hashedPass };
    users.push(user);
    // res.redirect('/login');
    res.status(201).send('success');
    console.log(users);
  } catch (err) {
    res.status(500).send(err);
  }
})

module.exports = authRouter;