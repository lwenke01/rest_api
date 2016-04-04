'use strict';

const User = require(__dirname + '/../models/User');
const jwt = require('jsonwebtoken');
const config = require(__dirname + '/config');
const Arcade = require(__dirname + '/../models/Arcade');

module.exports = exports = function(req, res, next) {
    console.log('HEADERS ' + req.headers);
  var decoded;
  try {
    decoded = jwt.verify(req.headers.token, config.secret);
    console.log('HEADERS ' + req.headers);
  } catch(e) {
    // debugger;

    return res.status(401).json({msg: 'authing it out'});
  }
  User.findOne({_id: decoded._id}, (err, user)=>{
    if(err) {
      console.log(err);
      return res.status(401).json({msg: 'error authenticating'});
    }
    if(!user) return res.status(401).json({msg: 'user not found'});

    req.user = user;
    next();
  });
};
