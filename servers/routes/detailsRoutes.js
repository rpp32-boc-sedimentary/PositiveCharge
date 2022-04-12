const express = require('express');
const router = express.Router();

const {verifyToken} = require('./authRoutes.js')

router.route('/view')
  .get(async (req, res, next) => {
    const result = await router.pool.grabview();
    try {
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

router.put('/poi/love', verifyToken, async (req, res, next) => {
    try {
      const result = await router.pool.lovePoi()
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

router.put('/poi/flag', verifyToken, async (req, res, next) => {
    try {
      const result = await router.pool.flagPoi();
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

router.put('/experience/love', verifyToken, async (req, res, next) => {
    try {
      const result = await router.pool.loveExp('3');
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

router.put('/experience/flag', verifyToken, async (req, res, next) => {
    try {
      const result = await router.pool.flagExp('1');
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

router.post('/experiences', verifyToken, async (req, res, next) => {
    try {
      const result = await router.pool.addExperience('this is the test experience');
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  })
  .delete(verifyToken, async (req, res, next) => {
    const result = await router.pool.deleteExperience();
    try {
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

module.exports = router;


// [Function: router] {
//   params: {},
//   _params: [],
//   caseSensitive: undefined,
//   mergeParams: undefined,
//   strict: undefined,
//   _events: [Object: null prototype] {},
//   _eventsCount: 0,
//   _maxListeners: undefined,
//   options: {
//     host: 'positivecharge.cgturxqllr1u.us-east-1.rds.amazonaws.com',
//     user: 'positive_charge',
//     port: '5432',
//     database: 'positive_charge',
//     max: 50,
//     connectionTimeoutMillis: 1000,
//     idleTimeoutMillis: 1000,
//     maxUses: Infinity,
//     allowExitOnIdle: false,
//     maxLifetimeSeconds: 0
//   },
//   log: [Function (anonymous)],
//   Client: [class Client extends EventEmitter] {
//     Query: [class Query extends EventEmitter]
//   },
//   Promise: [Function: Promise],
//   _clients: [],
//   _idle: [],
//   _expired: WeakSet { <items unknown> },
//   _pendingQueue: [],
//   _endCallback: undefined,
//   ending: false,
//   ended: false,
//   lovePoi: [AsyncFunction (anonymous)],
//   grabview: [AsyncFunction (anonymous)],
//   setMaxListeners: [Function: setMaxListeners],
//   getMaxListeners: [Function: getMaxListeners],
//   emit: [Function: emit],
//   addListener: [Function: addListener],
//   on: [Function: addListener],
//   prependListener: [Function: prependListener],
//   once: [Function: once],
//   prependOnceListener: [Function: prependOnceListener],
//   removeListener: [Function: removeListener],
//   off: [Function: removeListener],
//   removeAllListeners: [Function: removeAllListeners],
//   listeners: [Function: listeners],
//   rawListeners: [Function: rawListeners],
//   listenerCount: [Function: listenerCount],
//   eventNames: [Function: eventNames]
// }

