
'use strict';

module.exports = (router, models) => {
  const User = models.User;
  const express = require('express');
  const jsonParser = require('body-parser').json();
  const dbErrorHandler = require(__dirname + '/../lib/db-error-handler');
  const jwtAuth = require(__dirname + '/../lib/jwt-auth');

router.get('/currentuser', jsonParser, jwtAuth, (req, res)=>{
  console.log(req.user);
  User.findOne({_id: req.user._id}, (err, user)=>{
    if(err) dbErrorHandler(err, res);

    res.json({username: user.username});

  });
});
};
