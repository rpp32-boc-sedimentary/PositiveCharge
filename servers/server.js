const makeApp = require('./index.js');
const { pool } = require('../database/database.js');
const port = 3000;

const app = makeApp(pool);

app.listen(port, () => {
  console.log(`Positive Charge listening at http://localhost:${port}`);
});