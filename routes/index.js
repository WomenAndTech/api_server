var express = require('express');
var router = express.Router();

router.use('/', require('./root'));
router.use('/authenticate', require('./authenticate'));
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));

module.exports = router;