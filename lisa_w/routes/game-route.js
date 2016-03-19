'use strict';
var Game = require('../models/Game');
var bodyParser = require('body-parser');

module.exports = (router) => {
  router.use(bodyParser.json());

  router.route('/games')
       .post((req, res)=>{
         console.log('post /games was hit');
         var newGame = new Game(req.body);
         newGame.save((err, game)=>{
           if (err) res.send(err);
           res.json(game);
         });
       })
       .get((req, res) =>{
         console.log('get was hit');
         Game.find({},(err, games)=>{
           if(err) res.send(err);
           res.json({data: games});
         });
       });

  router.route('/games/:id')
       .get((req, res)=>{
         console.log(('GET /games/:id was hit'));
         Game.findById(req.params.id, (err, game)=>{
           if (err) res.send(err);
           res.json(game);
         });
       })
       .put((req, res)=>{
         console.log('PUT /game/:id was hit');
         Game.findByIdAndUpdate(req.params.id, req.body,(err, game)=>{
           if (err) res.send(err);
           res.json(game);
         });
       })
         .delete((req, res)=>{
           console.log('deleted');
           Game.remove({
             id: req.params.id
           },function(err, game) {
             if(err) res.send(err);
             res.json({
               message: 'sucessfully deleted game: ' + game});
           });
         });
  router.route('/game-genres')
           .get((req, res)=>{
             var genreArray = [];
             Game.find({}, (err, games)=>{
               games.forEach((games)=> {
                 genreArray.push(games.genre);
               });
               if (err) res.send(err);
               res.json({genreArray});
             });
           });

};
