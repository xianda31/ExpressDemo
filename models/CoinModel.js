// CoinModel.js

const mongoose = require('mongoose');


const MySchema = new mongoose.Schema({
  name: String,
  price:Number
});

module.exports = mongoose.model('Coin', MySchema);