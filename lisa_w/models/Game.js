'use strict';

let mongoose = require('mongoose');
let gamesSchema = new mongoose.Schema({
  title: String,
  genre: String,
  year: Number,
  updated: {type: Date, default: Date.now},
  players: Number

});

module.exports = mongoose.model('Games', gamesSchema);
