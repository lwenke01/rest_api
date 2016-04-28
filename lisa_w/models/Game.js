'use strict';

const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let GamesSchema = new Schema({
  title: String,
  genre: String,
  year: Number,
  updated: {type: Date, default: Date.now},
  players: Number

});

module.exports = exports = mongoose.model('Game', GamesSchema);
