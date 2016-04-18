var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports = {
  index: function(req, res) {
    Post.find().exec(function(err, posts){
      if(err) throw err;

      if(posts) {
        return res.json({posts});
      }
      else {
        return res.status(404).json({
          messages: "No posts found."
        });
      }
    });
  },

  show: function(req, res) {
    Post.find(req.post_id).exec(function(err, post){
      if(err) throw(err);

      if(post){
        return res.json({post});
      }
      else {
        return res.status(404).json({
          message: "No post found."
        });
      }
    });
  },

  create: function(req, res) {
    console.log(req.body);
    Post.create(req.body.post, function(err, post){
      if(err) throw(err);

      if(post) {
        return res.json({post});
      }
      else {
        return res.status(500).json({
          message: "Could not create post."
        });
      }
    });
  },

  update: function(req, res) {
    if(!req.user) {
      return res.status(401).json({
        message: "You are not logged in."
      });
    }

    Post.find(req.post_id).exec(function(err, post){
      if(req.user != post.user || !req.user.admin) {
        return res.status(401).json({
          message: "You are not authorized to modify this post!"
        });
      }
      else {
        post.update(req.body.post)
      }
    })
  }
}