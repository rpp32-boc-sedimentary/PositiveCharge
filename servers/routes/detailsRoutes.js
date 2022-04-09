const express = require('express');
const router = express.Router();

// add verifyToken when I get the access token
const {verifyToken} = require('./authRoutes.js')


router.route('/view')
  .get(async (req, res, next) => {
    const result = await router.detailsModels.grabview();
    try {
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

router.put('/poi/love', verifyToken, async (req, res, next) => {
    try {
      const result = await router.detailsModels.lovePoi()
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

router.put('/poi/flag', verifyToken, async (req, res, next) => {
    try {
      const result = await router.detailsModels.flagPoi();
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

router.put('/experience/love', verifyToken, async (req, res, next) => {
    try {
      const result = await router.detailsModels.loveExp('3');
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

router.put('/experience/flag', verifyToken, async (req, res, next) => {
    try {
      const result = await router.detailsModels.flagExp('1');
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

router.post('/experiences', verifyToken, async (req, res, next) => {
    try {
      const result = await router.detailsModels.addExperience('this is the test experience');
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  })
  .delete(verifyToken, async (req, res, next) => {
    const result = await router.detailsModels.deleteExperience();
    try {
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

module.exports = router;
