
'use strict';

const express = require('express');
const jwtAuth = require(__dirname + '/../lib/jwt-auth');
const jsonParser = require('body-parser').json();
const User = require(__dirname + '/../models/User');
const dbErrorHandler = require(__dirname + '/../lib/db-error-handler');

var userRouter = module.exports = exports = express.Router();
userRouter.use(jsonParser);

userRouter.route('/users')
.get(jwtAuth, (req, res)=>{
  console.log(req.user);
  User.find({}, (err, user)=>{
    if(err) console.log(err);
    res.json({data: user});

  });
});
userRouter.route('/users:user')
.get(jwtAuth, (req, res)=>{
  User.findById(req.params.user, (err, user)=>{
    if(err) return console.log(err);
    res.json(user);
  });
})
.put(jwtAuth, (req,res)=>{
  User.findByIdAndUpdate(req.params.user, req.body, (err)=>{
    if (err) return console.log(err);
    res.json({msg: 'user was updated'});
  });
})
.delete(jwtAuth, (req, res)=>{
  User.findById(req.params.user, (err, user)=>{
    user.remove((err)=>{
      if (err) return console.log(err);
      res.json({msg: 'user removed'});
    });
  });
});
