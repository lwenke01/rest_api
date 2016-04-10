'use strict';
const bcrypt = require('bcrypt');
const config = require(__dirname + '/../lib/config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
  username: {
    type: String,
    // unique: true
    required: true
  },
  authentication: {
    password: String,
    email: String
  }
});


userSchema.methods.hashPassword = function(password){
  var hash = this.authentication.password = bcrypt.hashSync(password, 8);
  return hash;
};

userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.authentication.password);
};
userSchema.methods.generateToken = function(){
  return jwt.sign({id: this._id}, process.env.SECRET || 'helloworld');
};

module.exports =  mongoose.model('User', userSchema);
