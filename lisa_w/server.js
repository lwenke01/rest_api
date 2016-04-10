'use strict';

const mongoose = require('mongoose');
const express = require('express');
const app = module.exports = exports = express();
// const morgan = require('morgan');
const arcadeRouter = require(__dirname + '/routes/arcade-routes');
const gameRouter = require(__dirname + '/routes/game-routes');
const userRouter = require(__dirname + '/routes/user-routes');
const authRouter = require(__dirname + '/routes/auth-routes');
// const queryRouter = require(__dirname + '/routes/query-routes');

const port = process.env.PORT || 9000;
const DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);


// middleware
// app.use((req, res, next)=>{
//   console.log('app.use hit');
//   res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
//   // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   next();
// });


// let router = express.Router();
app.use('/api', gameRouter);
app.use('/auth', userRouter);
app.use('/auth', authRouter);
// app.use('/api', queryRouter);
app.use('/api', arcadeRouter);

// app.use(morgan('dev'));

// console.log(app.path());
// app.setTimeout = 0;
// app.setTimeout = 0;
app.listen(port);
console.log('Magic is happening on port ' + port);
