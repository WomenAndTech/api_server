var express = require('express');
var app = express();

var jwt = require('jsonwebtoken');

var config = require('../config/config');
var secret = config.security_salt;
var maxAge = "20 days";

app.use(function(req, res, next){
  var authentication_token = req.headers['X-Authentication-Token'] || req.headers['x-authentication-token'] || req.body['X-Authentication-Token'] || req.body['x-authentication-token'] || null;

  if(!authentication_token){
    next();
  }
  else{
    jwt.verify(authentication_token, secret, {expiresIn: maxAge}, function(err, payload) {      
      if(err) {
        return res.status(400).json({ 
          message: "Authorization failed."
        });    
      }

      req.user = payload;
      next();
    });
  }
});

module.exports = app;