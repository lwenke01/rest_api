'use strict';
const bcrypt = require('bcrypt');
const config = require(__dirname + '/../lib/config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
  username: {
    type: String
    // unique: true,
    // required: true
  },
  authentication: {
    password: {
      type: String
      // required: true
    }
    // email: {
    //   type: String
    //   // unique: true
    // }
  }
});

// userSchema.pre('save', function(next){
//   this.authentication.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
//   next();
// });
userSchema.methods.hashPassword = function(password){
  var hash = this.authentication.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  return hash;
};

userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.authentication.password);
};
userSchema.methods.generateToken = function(){
  return jwt.sign({id: this._id}, config.secret);
};

module.exports = exports = mongoose.model('User', userSchema);
