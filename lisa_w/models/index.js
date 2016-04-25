'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require(__dirname + '/../lib/config');
const jwt = require('jsonwebtoken');
// const DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
// mongoose.connect(DB_PORT);
const models = {};

require('./Arcade')(mongoose, models);
require('./Game')(mongoose, models);
require('./User')(mongoose, models);

module.exports = models;
