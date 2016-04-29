
'use strict';
const express = require('express');
const jsonParser = require('body-parser').json();
const Game = require(__dirname + '/../models/Game.js');
const dbErrorHandler = require(__dirname + '/../lib/db-error-handler');
const jwtAuth = require(__dirname + '/../lib/jwt-auth');

const gameRouter = module.exports = exports = express.Router();

gameRouter.get('/games', jwtAuth, (req, res) =>{
  Game.find({}, (err, games) =>{
    if(err) return dbErrorHandler(err, res);
      res.status(200).json(games);
      });
  });
gameRouter.post('/games', jsonParser, jwtAuth, (req, res)=>{
  var newGame = new Game(req.body);
  newGame.save((err, game)=>{
    if(err) return dbErrorHandler(err, res);
      res.status(200).json(game);
  });
});
gameRouter.put('/games/:id', jsonParser, jwtAuth, (req, res)=>{
  console.log('PUT /game/:id was hit');
  Game.findByIdAndUpdate(req.params.id, req.body,(err, game)=>{
    if(err) return dbErrorHandler(err, res);
      res.status(200).json(game);
  });
});
gameRouter.delete('/games/:id', jwtAuth, (req, res) => {
  Game.remove({_id: req.params.id}, (err) => {
    if(err) return dbErrorHandler(err, res);
      res.status(200).json({msg: 'deleted arcade'});
  });
});
