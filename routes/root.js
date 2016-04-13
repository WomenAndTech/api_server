var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    success: true,
    message: "Welcome to the Manaloop API.  Please see our documentation at https://developers.manaloop.com."
  });
});

module.exports = router;
