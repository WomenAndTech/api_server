var express = require('express');
var router = express.Router();

var UsersController = require('../app/controllers/users_controller');

router.get('/', UsersController.index);

module.exports = router;