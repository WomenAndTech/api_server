var express = require('express');
var router = express.Router();

var UsersController = require('../app/controllers/users_controller');

router.post('/', UsersController.create);
router.get('/', UsersController.index);
router.get('/:user_id', UsersController.show);
router.delete('/:user_id', UsersController.destroy);

module.exports = router;