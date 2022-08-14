// server.js

const express = require('express');
const app = express();
const port = 3000;
// const path = require('path');
const CoinRouter = require('./routes/CoinRouter');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// set mongoDB package
// mongoose.Promise = global.Promise;
 mongoose.connect('mongodb://localhost/expressdemo').catch(error=> console.log('connection failed with error ',error));


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {    console.log("Mongoose connected")});

/*END MONGOOSE SETUP*/

app.use(express.static('public'));
app.set('view engine','ejs') ; // set view engine
app.set("views", "./public");


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// define GET handler for root URL

app.use('/coins', CoinRouter); 

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'public', 'index.html'));
});

app.listen(port, function(){
  console.log('server is listening on port %d' , port);
});




