const express = require('express')
const router = express.Router()
const {verifyToken} = require('./authRoutes.js')

router.post('/addPOI', verifyToken, async (req, res, next) => {
  console.log('in the route')
  try {
    const result = await router.pool.addPOI()
    console.log('result in route', result)
    res.status(201).send(result)
  } catch(err) {
    console.log('error in route', err)
    res.status(500).send(err)
  }
})

// router.post('/addPOI', verifyToken, async (req, res, next) => {
//   console.log('in the route')
//   router.pool.addPOI().then(result => {
//     console.log('result in route', result)
//     res.send(result)
//   })
// })

module.exports = router;