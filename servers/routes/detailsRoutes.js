const express = require('express');
const router = express.Router();

const {verifyToken} = require('./authRoutes.js')

router.route('/view')
  .get(async (req, res, next) => {
    const result = await router.grabview();
    try {
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

router.put('/poi/love', verifyToken, async (req, res, next) => {
    try {
      const result = await router.lovePoi()
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

router.put('/poi/flag', verifyToken, async (req, res, next) => {
    try {
      const result = await router.flagPoi();
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

router.put('/experience/love', verifyToken, async (req, res, next) => {
    try {
      const result = await router.loveExp('3');
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

router.put('/experience/flag', verifyToken, async (req, res, next) => {
    try {
      const result = await router.flagExp('1');
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

router.post('/experiences', verifyToken, async (req, res, next) => {
  const [experience, id] = [req.body.experience, req.body.id];
    try {
      const result = await router.addExperience([experience, id]);
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  })
  .delete(verifyToken, async (req, res, next) => {
    const result = await router.deleteExperience();
    try {
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

module.exports = router;
