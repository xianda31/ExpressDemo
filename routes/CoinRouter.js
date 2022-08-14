const express = require('express');
const app = express();
const CoinRouter = express.Router();
const Coin = require('../models/CoinModel');
const bodyParser = require('body-parser');


CoinRouter.route('/').get(function (req, res) {
  Coin.find(function (err, coins){
     if(err){
       console.log(err);
     }
     else {
       res.render('index', {coins: coins});
     }
   });
});


CoinRouter.route('/create').get(function (req, res) {
  res.render('create');
});



CoinRouter.route('/post').post(function (req, res) {
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

 CoinRouter.route('/edit').get(function (req, res) {
  
  const id = req.params.id;
  console.log(".... editing id %d",id);

  Coin.findById(id, function (err, coin){
      res.render('edit', {coin: coin});
  });
});

module.exports = CoinRouter;