const express = require('express');
const router = express.Router();

router.route('/view')
  .get(async (req, res, next) => {
    try {
      // imported model func
      res.status(201).send('fetched poi details for modal')
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

router.route('/poi/love')
  .put(async (req, res, next) => {
    try {
      // imported model func
      res.status(201).send('loved a poi')
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

router.route('/poi/flag')
  .put(async (req, res, next) => {
    try {
      // imported model func
      res.status(201).send('flagged a poi')
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

router.route('/experience/love')
  .put(async (req, res, next) => {
    try {
      // imported model func
      res.status(201).send('loved an experience')
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

router.route('/experience/flag')
  .put(async (req, res, next) => {
    try {
      // imported model func
      res.status(201).send('flagged an experience')
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

router.route('/experiences')
  .post(async (req, res, next) => {
    try {
      // imported model func
      res.status(201).send('added an experience')
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

router.route('/experiences')
  .delete(async (req, res, next) => {
    try {
      // imported model func
      res.status(201).send('deleted an experience')
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

module.exports = router;
