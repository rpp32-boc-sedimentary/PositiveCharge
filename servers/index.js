const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');



const app = express();
const port = 3000;
//Sends the computer to the folder where index.html is present
app.use(express.static(path.join(__dirname,'/../client/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("Sarcastic hello");
})

app.listen(port, () => {
    console.log(`Positive Charge listening at http://localhost:${port}`);
});