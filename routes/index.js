var express = require('express');
var router = express.Router();

router.use('/', require('./root'));
router.use('/authenticate', require('./authenticate'));
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/interviews', 
  function(req, res, next){ 
    req.query.type = "interview"; 
    next(); 
  },
  require('./posts'));

module.exports = router;