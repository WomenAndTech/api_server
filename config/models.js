require('fs').readdirSync(__dirname + '/../app/models/').forEach(function(file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    exports[name] = require('../app/models/' + file);
  }
});