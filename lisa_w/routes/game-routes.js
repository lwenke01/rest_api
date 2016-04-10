'use strict';

const Game = require('../models/Game');
const express = require('express');
const jsonParser = require('body-parser').json();
const dbErrorHandler = require(__dirname + '/../lib/db-error-handler');
const jwtAuth = require(__dirname + '/../lib/jwt-auth');

var gameRouter = module.exports = exports = express.Router();
gameRouter.use(jsonParser);

gameRouter.route('/games')
.get(jwtAuth,(req, res) =>{
  console.log('get was hit');
  Game.find({},(err, games)=>{
    if (err) return dbErrorHandler(err, res);
    res.json({data: games});
  });
})
.post(jwtAuth, (req, res)=>{
  console.log('post /games was hit');
  var newGame = new Game(req.body);
  newGame.save((err, game)=>{
    if (err) return dbErrorHandler(err, res);
    res.json(game);
  });
});

gameRouter.route('/games/:id')
.get(jwtAuth,(req, res)=>{
  console.log(('GET /games/:id was hit'));
  Game.findById(req.params.id, (err, game)=>{
    if (err) return dbErrorHandler(err, res);
    res.json(game);
  });
})
.put(jwtAuth,(req, res)=>{
  console.log('PUT /game/:id was hit');
  Game.findByIdAndUpdate(req.params.id, req.body,(err)=>{
    if (err) return dbErrorHandler(err, res);
    res.json({msg: 'updated game sucessfully'});
  });
})
.delete(jwtAuth,(req, res)=>{
  console.log('deleted');
  Game.remove({
    id: req.params.id
  },function(err, game) {
    if (err) return dbErrorHandler(err, res);
    res.json({
      msg: 'sucessfully deleted game: ' + game});
  });
});
gameRouter.route('/game-genres')
  .get((req, res)=>{
    var genreArray = [];
    Game.find({}, (err, games)=>{
      games.forEach((games)=> {
        genreArray.push(games.genre);
      });
      if (err) return dbErrorHandler(err, res);
      res.json({genreArray});
    });
  });
