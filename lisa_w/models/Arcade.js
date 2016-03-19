'use strict';

let mongoose = require('mongoose');
let arcadeSchema = new mongoose.Schema({
  name: String,
  address: String,
  updated: {type: Date, default: Date.now },
  games: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Games'
  }
  ]

});




module.exports = mongoose.model('Arcade', arcadeSchema);
