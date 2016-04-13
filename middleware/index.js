var express = require('express');
var app = express();
var cors = require('cors');
var logger = require('morgan');
var bodyParser = require('body-parser');
var token = require('./authentication_token');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

app.use(function (req, res, next) {
  res.removeHeader("x-powered-by");
  next();
});
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// All responses return as JSON
app.use(function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use(function(req, res, next){
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end(/* icon content here */);
  } else {
    next();
  }
});

app.use("/", token);

app.use(passport.initialize());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = app;