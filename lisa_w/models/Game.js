'use strict';
module.exports = (mongoose, models)=>{
// let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let GamesSchema = new Schema({
  title: String,
  genre: String,
  year: Number,
  updated: {type: Date, default: Date.now},
  players: Number

});

let Game = mongoose.model('Game', GamesSchema);
module.exports = Game;
};
