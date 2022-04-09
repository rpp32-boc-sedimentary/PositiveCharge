const express = require('express');
const router = express.Router();
const {verifyToken} = require('./authRoutes.js')


router.route('/view')
  .get(async (req, res, next) => {
    try {
      // imported model func
      res.status(201).send('fetched poi details for modal')
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

router.put('/poi/love', verifyToken, async (req, res, next) => {
    try {
      // imported model func
      const result = await router.detailsModels.lovePoi()
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

router.put('/poi/flag', verifyToken, async (req, res, next) => {
    try {
      // imported model func
      res.status(201).send('flagged a poi')
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

router.put('/experience/love', verifyToken, async (req, res, next) => {
    try {
      // imported model func
      res.status(201).send('loved an experience')
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

router.put('/experience/flag', verifyToken, async (req, res, next) => {
    try {
      // imported model func
      res.status(201).send('flagged an experience')
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

router.post('/experiences', verifyToken, async (req, res, next) => {
    try {
      // imported model func
      res.status(201).send('added an experience')
    } catch (err) {
      res.status(500).send(err.message)
    }
  })
  .delete(async (req, res, next) => {
    try {
      // imported model func
      res.status(201).send('deleted an experience')
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

module.exports = router;
