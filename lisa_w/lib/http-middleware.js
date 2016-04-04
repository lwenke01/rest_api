'use strict';

const zeroBuf = require(__dirname + '/buffer.js');


module.exports = function(req, res, next){
  try {
    var authString = req.headers.authorization;
    var base64String = authString.split(' ')[1];
    var authBuffer = new Buffer(base64String, 'base64');
    var utf8AuthString = authBuffer.toString();
    var authArr = utf8AuthString.split(':');
    zeroBuf(authBuffer);

    var username = authArr[0];
    var password = authArr[1];

    if (username.length && password.length){
      console.log('AUTH 1 ' + username);
      req.basicHttp = {
        username: username,
        password: password
      };
      return next();
    }

  } catch(e) {
    console.log(e);
  }
  res.status(401).json({msg: 'failed to auth Basic HTTP'});
};
