var express = require('express');
var router = express.Router();

var PostsController = require('../app/controllers/posts_controller');

// create new post/article
router.post('/', PostsController.create);

// show/list all posts
router.get('/', PostsController.index);

// show a single/particular post with :id
router.get('/:id', PostsController.index);

// update a particular post
router.put('/:id', PostsController.update);

module.exports = router;