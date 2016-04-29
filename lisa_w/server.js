'use strict';

const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/rest_api';
mongoose.connect(DB_PORT);

app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

const arcadeRouter = require(__dirname + '/routes/arcade-routes');
const gameRouter = require(__dirname + '/routes/game-routes');
const userRouter = require(__dirname + '/routes/user-routes');
const authRouter = require(__dirname + '/routes/auth-routes')

app.use(arcadeRouter);
app.use(gameRouter);
app.use(userRouter);
app.use(authRouter);

app.listen(PORT, ()=>{
  console.log('Magic is happening on port ' + PORT);
});
