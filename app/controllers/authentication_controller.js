var mongoose = require('mongoose');
var User = mongoose.model('User');

var passport = require('passport');

var jwt = require('jsonwebtoken');

var config = require('../../config/config');
var secret = config.security_salt;
var maxAge = "20 days";

function generate(user){
  var payload = {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    admin: user.admin
  };

  var options = {
    expiresIn: maxAge,
    algorithm: 'HS256'
  };

  return jwt.sign(payload, secret, options);;
};

module.exports = {
  authenticate: function(req, res){
    req.body.email = req.body.email.toLowerCase();

    passport.authenticate('local', function(err, user, done){
      if(err) {
        return res.json({message: err.message});
      }

      if(!user) {
        return res.status(400).json({
          success: false,
          message: "Incorrect Email or Password."
        });
      }
      else {
        var token = generate(user);

        return res.json({
          token
        });
      }
    })(req,res);
  }
}