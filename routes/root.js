var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    success: true,
    message: "Welcome to the Women&&Tech API server.  Please see our documentation at https://developers.womenandtech.com."
  });
});

module.exports = router;
