var express = require('express');
var app = express();

require('./config/database');
require('./config/models');
app.use('/', require('./middleware'));
app.use('/', require('./routes/index'));

var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Waat api-server is running and listening at %s:%s', host, port);
});