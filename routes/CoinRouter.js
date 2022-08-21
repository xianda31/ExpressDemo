const express = require('express');
const app = express();
const MyRouter = express.Router();
const Coin = require('../models/CoinModel');
const bodyParser = require('body-parser');


// a middleware function with no mount path. This code is executed for every request to the router
MyRouter.use(function (req, res, next) {
    console.log('Time:', Date.now());
  next();
});

// Home page route
MyRouter.route('/').get(function (req, res) {
  Coin.find(function (err, coins){
     if(err){
       console.log(err);
     }
     else {
       res.render('Catalog', {coins: coins});
     }
   });
});

MyRouter.get('/about',function (req, res) {
  res.send('About this coins demo');
});

MyRouter.route('/create').get(function (req, res) {
  res.render('create');
});


MyRouter.post('/save',function (req, res) {
   const coin = new Coin(req.body);
   console.log(req.body);

   coin.save()
     .then(coin => {
     res.redirect('/coins');
     })
     .catch(err => {
     res.status(400).send("unable to save to database");
     });
 });

 MyRouter.get('/edit/:id',function (req, res) {
  console.log ("editing  %s",req.params);
  const id = req.params.id;
  console.log(".... editing id %s",id);

  Coin.findById(id, function (err, coin){
      res.render('edit', {coin: coin});
 });
});

module.exports = MyRouter;