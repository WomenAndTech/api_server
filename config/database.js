var mongoose = require('mongoose');
var connection = require('./config').db.connection;

mongoose.connect(connection);
