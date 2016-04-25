'use strict';

const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const models = require(__dirname + '/models');
const Game = models.Game;
const Arcade = models.Arcade;
const User = models.User;
const port = process.env.PORT || 6000;
const app = module.exports = exports = express();

const DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

const router = express.Router();
require(__dirname + './routes/arcade-routes')(router, models);
require(__dirname + './routes/game-routes')(router, models);
require(__dirname + './routes/user-routes')(router, models);

const authRouter = express.Router();
require(__dirname + './routes/auth-routes')(authRouter, models);

app.use(bodyParser.json());

app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', 'http://localhost:6000');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(morgan('dev'));
app.use('/', router);
app.use('/', authRouter);

app.listen(port, ()=>{
  console.log('Magic is happening on port ' + port);
});
