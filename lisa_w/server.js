'use strict';

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const arcadeRouter = require(__dirname + '/routes/arcade-route');
const gameRouter = require(__dirname + '/routes/game-route');
const userRouter = require(__dirname + '/routes/user-routes');
// const authRouter = require(__dirname + '/routes/auth-routes');

var port = process.env.PORT || 6000;
let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/rest-auth';
mongoose.connect(DB_PORT);


// middleware
app.use((req, res, next)=>{
  console.log('app.use hit');
  res.header('Access-Control-Allow-Origin', 'http://localhost:6000');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});


// let router = express.Router();
app.use('/api', gameRouter);
app.use('/api', userRouter);
// app.use('/api', authRouter);
app.use('/api', arcadeRouter);

// console.log(app.path());
// app.setTimeout = 0;
// app.setTimeout = 0;
app.listen(6000);
console.log('Magic is happening on port ' + port);
