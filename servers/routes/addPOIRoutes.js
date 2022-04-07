const express = require('express')
const addPOIRouter = express.Router()

addPOIRouter.post('/addPOI', async (req, res) => {
  try {
    res.status(201).send(req.body)
  } catch(err) {
    res.status(500).send(err)
  }
})

module.exports = addPOIRouter;