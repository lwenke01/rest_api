'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const config = require(__dirname + '/../lib/config');
const jwt = require('jsonwebtoken');

let Schema = mongoose.Schema;
let UserSchema = new Schema({
  username:String,
  authentication: {
    email: String,
    password: String
  }
});


UserSchema.methods.hashPassword = function(password){
  var hash = this.authentication.password = bcrypt.hashSync(password, 8);
  return hash;
};

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.authentication.password);
};
UserSchema.methods.generateToken = function(){
  return jwt.sign({id: this._id}, process.env.APP_SECRET || 'BOOGERBREATH');
};

module.exports = exports = mongoose.model('User', UserSchema);
