const express = require('express')
const seePOIRouter = express.Router()

seePOIRouter.get('/seePOI', async (req, res) => {
  try {
    res.redirect('/')
  } catch(err) {
    res.status(500).send(err)
  }
})

module.exports = seePOIRouter;