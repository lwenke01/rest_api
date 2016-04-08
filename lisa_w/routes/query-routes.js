'use strict';

const express = require('express');
const Arcade = require(__dirname + '/../models/Arcade');
const jsonParser = require('body-parser').json();
const dbErrorHandler = require(__dirname + '/../lib/db-error-handler');
const jwtAuth = require(__dirname + '/../lib/jwt-auth');

var gameRouter = module.exports = exports = express.Router();
gameRouter.use(jsonParser);
