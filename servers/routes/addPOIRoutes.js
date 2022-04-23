const express = require('express')
const router = express.Router()
const {verifyToken} = require('./authRoutes.js')

router.post('/addPOI', verifyToken, async (req, res, next) => {
  console.log('in the route')
  console.log('req.body', req.body)
  try {
    const result = await router.addPOI(req.body)
    res.status(201).send(result)
  } catch(err) {
    console.log('error in route', err)
    res.status(500).send(err)
  }
})


module.exports = router;