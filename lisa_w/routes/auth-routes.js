'use strict';

const express = require('express');
// const User = require(__dirname + '/../models/User');
const jsonParser = require('body-parser').json();
const dbErrorHandler = require(__dirname + '/../lib/db-error-handler');
const basicHTTP = require(__dirname + '/../lib/http-middleware');

module.exports = (router, models) => {
  const User = models.User;

router.post('/signup', jsonParser, (req, res)=>{

  console.log('hit /signup');
  User.findOne({username: req.body.username}, (err, user)=>{
    if(err) return dbErrorHandler(err, res);
    if (user){
      return res.status(400).json({msg: 'Username already exists. Choose another one'});
    } else {
      var newUser = new User();
      if(!(req.body.email || '').length && (req.body.password || '').length > 7) {
        return res.status(400).json({msg: 'invalid email and password'});
      }
      newUser.username = req.body.username || req.body.email;
      newUser.authentication.email = req.body.email;
      newUser.hashPassword(req.body.password);
      newUser.save((err, data)=>{
        if(err) return dbErrorHandler(err, res);
        res.status(200).json(
          {
            token: data.generateToken()
          });

    });
  }
  });
});

router.get('/signin', basicHTTP, (req, res)=>{
  User.findOne({'authentication.email': req.basicHTTP.email}, (err, user)=>{
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'invalid email'});
    }
    if(!user) {
      return res.status(401).json({msg: 'no user'});
}
    if(!user.comparePassword(req.basicHTTP.password)) {
      return res.status(401).json({msg: 'cannot authenticate password for account'});

}
res.json({token: user.generateToken()});
  });
});
};
