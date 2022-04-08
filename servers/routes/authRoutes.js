require('dotenv').config()
const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
  if (user === undefined) {
    return res.status(400).send('Cannot find user');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign({ user: req.body.email }, process.env.ACCESS_TOKEN);
      res.status(201).send('Successful login. ' + 'Access Token: ', accessToken);
    } else {
      res.send('Incorrect password');
    }
  } catch (err) {
    res.status(500).send(err);
  }
})

authRouter.post('/signup', async (req, res) => {
  var { name, email, password } = req.body;
  email = email.toLowerCase();

  try {
    var oldUser = await users.find(user => user.email === email)
    if (oldUser !== undefined) {
      return res.status(409).send('User already exists. Please login.')
    }
    // var salt = await bcrypt.genSalt();
    var hashedPass = await bcrypt.hash(password, 10);
    var newUser = { name: name, email: email, password: hashedPass };
    users.push(newUser);

    // res.redirect('/login');
    res.status(201).send('Added new user');
  } catch (err) {
    res.status(500).send(err);
  }
})

module.exports = authRouter;