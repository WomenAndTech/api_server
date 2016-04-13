var express = require('express');
var app = express();

var jwt = require('jsonwebtoken');

var config = require('../config/config');
var secret = config.security_salt;
var maxAge = "20 days";

app.use(function(req, res, next){
  var authentication_token = req.headers['x-authentication-token'];
  
  if(!authentication_token){
    req.user = null;
    next();
  }

  else{
    jwt.verify(authentication_token, secret, {expiresIn: maxAge}, function(err, payload) {      
      if(err) {
        return res.status(400).json({ 
          message: err.message
        });    
      }

      req.user = payload;
      next();
    });
  }
});

module.exports = app;