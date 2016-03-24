'use strict';

let mongoose = require('mongoose');
let express = require('express');
let app = express();

var port = process.env.PORT || 3000;
let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);
let router = express.Router();

require('./routes/arcade-route')(router);
require('./routes/game-route')(router);

app.use('/api', router);


app.listen(port);
console.log('Magic is happening on port ' + port);
