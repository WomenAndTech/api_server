var express = require('express');
var router = express.Router();

var PostsController = require('../app/controllers/posts_controller');
var cheerio = require('cheerio');

function removeContentEditableAttribute(content) {
  var $ = cheerio.load('<body/>');
  
  content = $('body').append(content);
  content.find('*').removeAttr('contenteditable');
  return content.html();
}

function removeStyleAttribute(content) {
  var $ = cheerio.load('<body/>');

  content = $('body').append(content);
  content.find('*').removeAttr('style');
  return content.html();
}

function removeScriptTags(content){
  return content.replace(/<script>[\S\s]+<\/script>/i, "");
}

function sanatizePostBody (req, res, next) {
  if(req.method === 'POST' || req.method === 'PUT') {
    var body = req.body.post.body;

    body = removeContentEditableAttribute(body);
    body = removeStyleAttribute(body);
    body = removeScriptTags(body);

    req.body.post.body = body;
  }

  next();
}

router.use('/', sanatizePostBody);

// create new post/article
router.post('/', PostsController.create);

// show/list all posts
router.get('/', PostsController.index);

// Get lastest post
router.get('/latest', PostsController.latest);

// show a single/particular post with :id
router.get('/:id', PostsController.show);

// update a particular post
router.put('/:id', PostsController.update);

router.delete('/:id', PostsController.destroy);

module.exports = router;