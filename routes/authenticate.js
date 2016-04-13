var express = require('express');
var router = express.Router();

var AuthenticationController = require('../app/controllers/authentication_controller');

router.post('/', AuthenticationController.authenticate);

module.exports = router;