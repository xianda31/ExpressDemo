// server.js

const express = require('express');
const app = express();
const port = 3000;
// const path = require('path');
const MyRouter = require('./routes/CoinRouter');
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
app.set("views", "./public");  // locate the views directory


// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// define GET handler for root URL

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'public', 'index.html'));
});

// define  the router module handling  routes starting from /coins

app.use('/coins', MyRouter); 

app.listen(port, function(){
  console.log('server is listening on port %d' , port);
});




