'use strict';

const User = require(__dirname + '/../models/User');
const jwt = require('jsonwebtoken');
const config = require(__dirname + '/config');
// const Arcade = require(__dirname + '/../models/Arcade');

module.exports = exports = function(req, res, next) {
  console.log('HEADERS ' + req.headers);
  var decoded;
  try {
    decoded = jwt.verify(req.headers.token, process.env.SECRET || 'helloworld');
    console.log('HEADERS ' + req.headers.token);
  } catch(e) {

    return res.status(401).json({msg: 'authing failed'});
  }
  User.findOne({_id: decoded._id}, (err, user)=>{
    if(err) {
      console.log(err);
      return res.status(401).json({msg: 'error authenticating user'});
    }
    if(!user) return res.status(401).json({msg: 'user not found'});

    req.user = user;
    next();
  });
};
