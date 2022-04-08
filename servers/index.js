const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { authRouter, verifyToken } = require('./routes/authRoutes.js');
const addPOIRouter = require('./routes/addPOIRoutes.js');
const detailsRouter = require('./routes/detailsRoutes.js');
const filterRouter = require('./routes/filterRoutes.js');

const _ = require('underscore');
// database is the pool object with your methods on it
module.exports = (database) => {
  const app = express();
  // added the methods to everyones routes here
  // reference the detailsRouter under the /poi/love route to see how to use the model methods there
  _.extend(authRouter, database);
  _.extend(addPOIRouter, database);
  _.extend(detailsRouter, database);
  _.extend(filterRouter, database);

  //Sends the computer to the folder where index.html is present
  app.use(express.static(path.join(__dirname, '../positive_charge/public')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use('/filter', filterRouter);
  app.use('/', authRouter);
  app.post('/addPOI', addPOIRouter);
  app.use('/details', detailsRouter);

  // Filter route for testing purposes. Will be removed later

  app.get('/', (req, res) => {
    res.send("Sarcastic hello");
  })
  return app;
}
