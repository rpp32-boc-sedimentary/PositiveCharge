require('dotenv').config()
const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../../database/models');

authRouter.use((req, res, next) => {
  console.log('Time: ', Date());
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

authRouter.get('/login', (req, res) => {
  res.redirect('/');
})

authRouter.get('/signup', (req, res) => {
  res.redirect('/');
})

authRouter.get('/verify', verifyToken, (req, res) => {
  res.send([req.user.name, req.user.email]);
})

authRouter.post('/login', async (req, res) => {
  var email = req.body.email.toLowerCase();
  var user = await pool.getUser([email]);
  console.log('user', user);
  if (user.length < 1) {
    console.log('Cannot find user');
    return res.send('Cannot find user');
  }
  try {
    if (await bcrypt.compare(req.body.password, user[0].password)) {
      const accessToken = jwt.sign(
        { id: user[0].id, name: user[0].name, email: req.body.email },
        process.env.ACCESS_KEY,
        // {
        //   expiresIn: "1h"
        // }
      );
      res.cookie('token', accessToken, { httpOnly: true });
      // res.status(201).json({ accessToken });
      res.status(201).send(user[0].name);
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
    // var oldUser = await users.find(user => user.email === email)
    var oldUser = await pool.getUser([email]); //test
    console.log('oldUser = ', oldUser);
    if (oldUser.length > 0) {
      return res.status(409).send('User already exists. Please login.')
    }
    var hashedPass = await bcrypt.hash(password, 10);
    var newUser = await pool.addUser([name, email, hashedPass]);
    res.status(201).send(newUser);
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