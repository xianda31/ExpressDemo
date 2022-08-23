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
       res.render('Catalog', {coinsTable: coins});
     }
   });
});

MyRouter.get('/about',function (req, res) {
  res.send('About this coins demo');
});



MyRouter.route('/create').get(function (req, res) {
  res.render('create');
});


//
// EDIT
//
 MyRouter.get('/edit/:id',function (req, res) {
  
  const id = req.params.id;
  console.log(".... editing id %s",id);

  Coin.findById(id, function (err, doc){
      res.render('edit', {coinDoc: doc});
 });
});


MyRouter.post('/save',function (req, res) {
  const coin = new Coin(req.body);
  console.log('saving ',req.body);

  coin.save()
    .then(coin => {
    res.redirect('/coins');
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});
//
// UPDATE
//
MyRouter.post('/update/:id',function (req, res) {
  const coin = new Coin(req.body);
  console.log("new coin d'Id %s => %s %s ",req.params.id,req.body.name,req.body.price) ;
 

   Coin.findByIdAndUpdate(req.params.id, req.body,function(err, docs) {
    if (err) {
      console.log("... update failed !!!");
      return next(new Error('Could not load Document')); }
    else {
         res.redirect('/coins');
      }
    });
});
module.exports = MyRouter;