'use strict';

module.exports = (router, models)=>{
const Arcade = models.Arcade;

const express = require('express');
const jsonParser = require('body-parser').json();
const dbErrorHandler = require(__dirname + '/../lib/db-error-handler');
const jwtAuth = require(__dirname + '/../lib/jwt-auth');




router.post('/arcades', jwtAuth, jsonParser, (req, res)=>{
  console.log('post was hit');
  var newArcade = new Arcade(req.body);
  newArcade.userId = req.user._id;
  newArcade.save((err, arcade)=>{
    if (err) return dbErrorHandler(err, res);

    res.status(200).json(arcade);
  });

});
router.get('/arcades', (req, res) =>{
  console.log('get was hit');
  Arcade.find({},(err, arcades)=>{
    if(err)  return dbErrorHandler(err, res);

    res.status(200).json(arcades);
      //  console.log('hit' + arcades);
  });
});

router.get('/user-arcades', jwtAuth, (req, res)=>{
  Arcade.find({userId: req.user._id}, (err, arcade)=>{
    if(err) return dbErrorHandler(err, res);

    res.status(200).json(arcade);
  });

});
// arcadeRouter.route('/arcades/:id')
  //  .get(jwtAuth, (req, res)=>{
  //    console.log(('GET /arcade/:id was hit'));
  //    Arcade.findById(req.params.id, (err, arcade)=>{
  //      if (err) return dbErrorHandler(err, res);
   //
  //      res.status(200).json(arcade);
   //
  //    });
  //  })
router.put('/arcades/:id',jwtAuth, jsonParser,(req, res)=>{
  console.log('PUT /arcade/:id was hit');
  Arcade.findByIdAndUpdate(req.params.id, req.body,(err)=>{
    if (err) return dbErrorHandler(err, res);

    res.status(200).json({msg: 'success'});
  });
});
router.delete('/arcades/:id',(req, res)=> {
  Arcade.remove({_id: req.params.id}, (err)=> {
    if(err) return dbErrorHandler(err, res);

    res.status(200).json({msg: 'sucessfully deleted arcade'});
  });
});


router.get('/arcade-names', (req, res)=>{
  var nameArray = [];
  Arcade.find({}, (err, arcades)=>{
    arcades.forEach((arcade)=> {
      nameArray.push(arcade.name);
    });
    if (err) res.send(err);
    res.json({nameArray});
  });
});

};
