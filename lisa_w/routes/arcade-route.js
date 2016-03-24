'use strict';
let Arcade = require('../models/Arcade');
let express =require('express');
let bodyParser = require('body-parser');
let router = express.Router();
require('./game-route.js');
let Game = require('../models/Game');

router.use(bodyParser.json());

router.route('/arcades')
   .post((req, res)=>{
     console.log('post was hit');
     var newArcade = new Arcade(req.body);
     newArcade.save((err, arcade)=>{
       if (err) res.send(err);
       res.json(arcade);
     });

   })
   .get((req, res) =>{
     console.log('get was hit');
     Arcade.find({}).populate('games').exec((err, arcades)=>{
       if(err)  res.send(err);
       res.json({data: arcades});
       console.log('hit' + arcades);
     });
   });
router.route('/arcades/:id')
   .get((req, res)=>{
     console.log(('GET /arcade/:id was hit'));
     Arcade.findById(req.params.id, (err, arcade)=>{
       if (err) res.send(err);
       res.json(arcade);
       console.log(arcade);
     });
   })
   .put((req, res)=>{
     console.log('PUT /arcade/:id was hit');
     Arcade.findByIdAndUpdate(req.params.id, req.body,(err, arcade)=>{
       if (err) res.send(err);
       res.json(arcade);
     });
   })
    .delete((req, res)=> {
      Arcade.remove({_id: req.params.id}, (err, arcade)=> {
        if(err) return res.send(err);
        res.json({
          data: arcade,
          msg: 'sucessfully deleted arcade'});
      });
    });

router.route('arcades/:id/games')
.post((req, res)=>{
  console.log('post to arcade games');
  var newGame = new Game();
  newGame.save((err, game)=>{
    if(err) res.send(err);
    Arcade.findByIdAndUpdate(req.params.id, {$push: {games: game._id}}, (err, game)=>{
      
    })
  })
})


router.route('/arcade-names')
    .get((req, res)=>{
      var nameArray = [];
      Arcade.find({}, (err, arcades)=>{
        arcades.forEach((arcade)=> {
          nameArray.push(arcade.name);
        });
        if (err) res.send(err);
        res.json({nameArray});
      });
    });

module.exports = router;
