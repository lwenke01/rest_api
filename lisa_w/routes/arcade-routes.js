'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Arcade = require(__dirname + '/../models/Arcade.js');
const dbErrorHandler = require(__dirname + '/../lib/db-error-handler');
const jwtAuth = require(__dirname + '/../lib/jwt-auth');


const arcadeRouter = module.exports = exports = express.Router();

arcadeRouter.get('/arcades', jwtAuth, (req, res) =>{
  Arcade.find({},(err, arcades)=>{
    if(err)  return dbErrorHandler(err, res);
    res.status(200).json(arcades);
  });
});
arcadeRouter.post('/arcades',jsonParser, jwtAuth, (req, res)=>{
  var newArcade = new Arcade(req.body);
  newArcade.save((err, arcade)=>{
    if (err) return dbErrorHandler(err, res);
    res.status(200).json(arcade);
  });
});
arcadeRouter.put('/arcades/:id',jsonParser,jwtAuth, (req, res)=>{
  let ArcadeData = req.body;
  delete ArcadeData._id;
  // console.log('PUT /arcade/:id was hit');
  Arcade.findByIdAndUpdate(req.params.id, req.body,(err)=>{
    if (err) return dbErrorHandler(err, res);

    res.status(200).json({msg: 'success'});
  });
});
arcadeRouter.delete('/arcades/:id',jwtAuth, (req, res)=> {
  Arcade.remove({_id: req.params.id}, (err)=> {
    if(err) return dbErrorHandler(err, res);

    res.status(200).json({msg: 'sucessfully deleted arcade'});
  });
});
