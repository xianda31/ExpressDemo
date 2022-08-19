const express = require('express');
const app = express();
const MyRouter = express.Router();
const Coin = require('../models/CoinModel');
const bodyParser = require('body-parser');


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

MyRouter.route('/about').get(function (req, res) {
  res.send('About this coins demo');
});

MyRouter.route('/create').get(function (req, res) {
  res.render('create');
});



MyRouter.route('/save').post(function (req, res) {
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

 MyRouter.route('/edit').get(function (req, res) {
  
  const id = req.params.id;
  console.log(".... editing id %d",id);

  Coin.findById(id, function (err, coin){
      res.render('edit', {coin: coin});
  });
});

module.exports = MyRouter;