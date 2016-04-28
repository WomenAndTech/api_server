var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports = {
  latest: function(req, res) {
    var query = Post.findOne().where({status: "published"}).sort({createdAt: -1});

    if(req.query.type) {
      query.where({type: req.query.type});
    }

    query.exec().then(function(post){
      if(post) {
        return res.json({posts: [post]});  
      }
      else {
        return res.status(404).json({
          message: "No posts."
        });
      }
      
    }, function(err){
      return res.status(404).json({
        message: "No posts."
      });
    });
  },
  index: function(req, res) {
    var query = Post.find().sort({createdAt: -1})
    // If a user is not logged in - only display published posts
    if(!req.user) {
      query.where({status: "published"})
    }

    if(req.query.type) {
      query.where({type: req.query.type});
    }

    query.exec(function(err, posts){
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
    var query = Post.findById(req.params.id)
    // If a user is not logged in - only display published posts
    if(!req.user) {
      query.where({status: "published"})
    }

    query.exec()
    .then(function(post){
      if(post) {
        return res.json({post});
      }
      else {
        return res.status(404).json({
          message: "No post found."
        });
      }
    }, function(err) {
      return res.status(404).json({
        message: "No post found."
      });
    });
  },

  create: function(req, res) {
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
    if(req.user && req.user.admin) {
      Post.findByIdAndUpdate(req.params.id, {$set: req.body.post}, function(err, post){
        if(err){
          console.log(err);
          return res.status(500);
        };

        return res.status(200).json({post});
      });      
    }
    else {
      return res.status(401).json({
        message: "You are not logged in."
      });
    }

  },

  destroy: function(req, res) {
    Post.findByIdAndRemove(req.params.id).then(function(post){
      res.json({});
    }, function(err){
      res.status(500).json({
        message: "Failed"
      })
    })
  }
}