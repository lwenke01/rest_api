'use strict';

module.exports = function (err, res){
  if (err) return res.json(err);
  res.status(500).json({msg: 'db error'});
};
