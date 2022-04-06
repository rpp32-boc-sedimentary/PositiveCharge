const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const authRouter = require('./routes/authRoutes.js');
const addPOIRouter = require('./routes/addPOIRoutes.js')


const app = express();
const port = 3000;
//Sends the computer to the folder where index.html is present
app.use(express.static(path.join(__dirname,'../positive_charge/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', authRouter);
app.post('/addPOI', addPOIRouter);

app.get('/', (req, res) => {
    res.send("Sarcastic hello");
})


app.listen(port, () => {
    console.log(`Positive Charge listening at http://localhost:${port}`);
});