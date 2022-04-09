const express = require('express')
const addPOIRouter = express.Router()
const jwt = require('jsonwebtoken');

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

addPOIRouter.post('/addPOI', verifyToken, async (req, res) => {
  try {
    res.status(201).send(req.body)
  } catch(err) {
    res.status(500).send(err)
  }
})

module.exports = addPOIRouter;