require('dotenv').config()
const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

authRouter.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next()
})

function verifyToken(req, res, next) {
  var token = req.cookies.token;
  if (!token) {
    return res.status(403).send('Token required for authentication');
  }
  jwt.verify(token, process.env.ACCESS_KEY, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid token');
    }
    req.user = user;
    next();
  })
}

// temp - delete after DB is set up
const users = [];

// testing purposes only - delete after
authRouter.get('/users', verifyToken, (req, res) => {
  res.send(users);
})

authRouter.get('/login', (req, res) => {
  res.redirect('/');
})

authRouter.get('/signup', (req, res) => {
  res.redirect('/');
})

authRouter.get('/sponsor', (req, res) => {
  res.redirect('/');
})

authRouter.get('/verify', verifyToken, (req, res) => {
  res.send(req.user.name);
})

authRouter.post('/login', async (req, res) => {
  var user = users.find( user => user.email === req.body.email.toLowerCase())
  if (user === undefined) {
    console.log('Cannot find user');
    return res.send('Cannot find user');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(
        { name: user.name, email: req.body.email },
        process.env.ACCESS_KEY,
        // {
        //   expiresIn: "1h"
        // }
      );
      res.cookie('token', accessToken, { httpOnly: true });
      // res.status(201).json({ accessToken });
      res.status(201).send(user.name);
      console.log('Logged in');
    } else {
      res.send('Incorrect password');
      console.log('Incorrect password');
    }
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
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
    var hashedPass = await bcrypt.hash(password, 10);
    var newUser = { name: name, email: email, password: hashedPass };
    users.push(newUser);

    res.status(201).send('Added new user');
  } catch (err) {
    res.status(500).send(err);
  }
})

authRouter.post('/logout', (req, res) => {
  res.status(202).clearCookie('token').send('cookie cleared');
  // Future goal: store tokens with remaining time to live in redis as a blacklist
  //    Login should be compared against the blacklist to ensure someone with a ...
  //    ...copy of the cookie cannot login
})

module.exports = {
  authRouter,
  verifyToken
}