'use strict';

const express = require('express');
const Arcade = require(__dirname + '/../models/Arcade');
const jsonParser = require('body-parser').json();
const dbErrorHandler = require(__dirname + '/../lib/db-error-handler');
const jwtAuth = require(__dirname + '/../lib/jwt-auth');


var arcadeRouter = module.exports = exports = express.Router();
arcadeRouter.use(jsonParser);

arcadeRouter.route('/arcades')
.post(jwtAuth, jsonParser,(req, res)=>{
  console.log('post was hit');
  var newArcade = new Arcade(req.body);
  newArcade.userId = req.user._id;
  newArcade.save((err, arcade)=>{
    if (err) return dbErrorHandler(err, res);
    res.status(200).json(arcade);
  });
})
.get(jwtAuth, (req, res) =>{
  console.log('get was hit');
  Arcade.find({},(err, arcades)=>{
    if (err) return dbErrorHandler(err, res);
    res.json({data: arcades});
    // console.log('hit' + arcades);
  });
});

arcadeRouter.get('/user-arcades', jwtAuth, (req, res)=>{
  Arcade.find({userId: req.user._id}, (err, arcade)=>{
    if (err) return dbErrorHandler(err, res);
    res.json({data: arcade});
  });

});
arcadeRouter.route('/arcades/:id')
   .get(jwtAuth, (req, res)=>{
     console.log(('GET /arcade/:id was hit'));
     Arcade.findById(req.params.id, (err, arcade)=>{
       if (err) return dbErrorHandler(err, res);
       res.json(arcade);
     });
   })
.put(jwtAuth, (req, res)=>{
  console.log('PUT /arcade/:id was hit');
  Arcade.findByIdAndUpdate(req.params.id, req.body,(err)=>{
    if (err) return dbErrorHandler(err, res);
    res.json({msg: 'update success'});
  });
})
.delete(jwtAuth,(req, res)=> {
  Arcade.findById(req.params.id, (err, arcade)=>{
    arcade.remove((err)=>{
      if (err) return dbErrorHandler(err, res);
      res.json({msg: 'arcade removed'});
    });
  });
});


arcadeRouter.get('/arcade-names', (req, res)=>{
  var nameArray = [];
  Arcade.find({}, (err, arcades)=>{
    arcades.forEach((arcade)=> {
      nameArray.push(arcade.name);
    });
    if (err) return dbErrorHandler(err, res);
    res.json({nameArray});
  });
});
