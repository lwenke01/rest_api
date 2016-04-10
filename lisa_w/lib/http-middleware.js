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
    if(authArr[0].length && authArr[1].length){
      req.basicHTTP = {
        password: authArr[0],
        email: authArr[1]
      };
  
      return next();
    }

  } catch(e) {
    console.log(e);
  }
  res.status(401).json({msg: 'failed to auth Basic HTTP'});
};
