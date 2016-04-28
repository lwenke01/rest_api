'use strict';

const express = require('express');
const User = require(__dirname + '/../models/User.js');
const jsonParser = require('body-parser').json();
const dbErrorHandler = require(__dirname + '/../lib/db-error-handler');
const basicHTTP = require(__dirname + '/../lib/http-middleware');

const authRouter = module.exports = exports = express.Router();

authRouter.post('/signup', jsonParser, (req, res)=>{
  var newUser = new User();
  console.log('hit /signup');
  // if(!(req.body.email || '').length && (req.body.password || '').length > 7) {
  //   return res.status(400).json({msg: 'invalid email and password'});
  // }
  newUser.username = req.body.username || req.body.email;
  newUser.authentication.email = req.body.email;
  newUser.hashPassword(req.body.password);
  newUser.save((err, data)=>{
    if(err) return dbErrorHandler(err, res);
    res.status(200).json({token: data.generateToken()});
  });
});
authRouter.get('/signin', basicHTTP, (req, res)=>{
  User.findOne({'authentication.email': req.basicHTTP.email}, (err, user)=>{
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'invalid email'});
    }
    if(!user) return res.status(401).json({msg: 'no user'});

    if(!user.comparePassword(req.basicHTTP.password)) return res.status(401).json({msg: 'cannot authenticate password for account'});

    res.json({token: user.generateToken()});
  });
});
