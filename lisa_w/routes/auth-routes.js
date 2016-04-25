'use strict';


const express = require('express');
const User = require(__dirname + '/../models/User');
const jsonParser = require('body-parser').json();
const dbErrorHandler = require(__dirname + '/../lib/db-error-handler');
const basicHTTP = require(__dirname + '/../lib/http-middleware');

var authRouter = module.exports = exports = express.Router();

authRouter.post('/signup', jsonParser, (req, res)=>{
  console.log('hit /signup');
  var newUser = new User();
  if(!(req.body.email || '').length && (req.body.password || '').length > 7) {
    return res.status(400).json({msg: 'invalid email and password'});
  }
  newUser.username = req.body.username;
  newUser.authentication.email = req.body.email;
  newUser.authentication.password = req.body.password;
  debugger;
  newUser.save((err, data)=>{
    if(err) return dbErrorHandler(err, res);
    res.status(200).json({token: data.generateToken()});
  });
});

authRouter.get('/signin', basicHTTP, (req, res)=>{
  User.findOne({'email authentication': req.basicHTTP.email}, (err, user)=>{
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'invalid email'});
    }
    if(!user) return res.status(401).json({msg: 'no user'});

    if(!user.comparePassword(req.basicHTTP.password))
      return res.status(401).json({msg: 'cannot authenticate password for account'});

    res.json({token: user.generateToken});
  });
});
