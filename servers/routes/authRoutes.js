const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');

authRouter.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next()
})

// temp - delete after DB is set up
const users = [];

// testing purposes only - delete after
authRouter.get('/users', (req, res) => {
  res.send(users);
})

authRouter.get('/login', (req, res) => {
  res.redirect('/');
})

authRouter.get('/signup', (req, res) => {
  res.redirect('/');
})

authRouter.post('/login', async (req, res) => {
  var user = users.find( user => user.email === req.body.email)
  if (user === null) {
    return res.status(400).send('Cannot find user');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(201).send('Successful login');
    } else {
      res.send('Incorrect password');
    }
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