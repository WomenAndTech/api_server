var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
  create: function(req, res, next) {
    if(true){
      var userData = req.body;

      User.register(
        new User(userData),
        req.body.password,
        function(err, user){
          if(err) {
            return res.status(500).json({
              success: false,
              message: err
            });
            next(err);
          }

          if(!user){
            return res.json({
              success: false, 
              message: "Could not create user"
            })
          }
          else {
            return res.json({
              success: true,
              response: {
                message: "User account created successfully.  An email has been sent to your account.",
                token: AuthenticationToken.generate(user)
              }
            })
          }
        }
      );
    }
    else {
      return res.status(401).json({
        message: "You are not authorized to create a new user."
      });
    }
  },

  index: function(req, res) {
    if(req.query.username) {
      return this.show(req, res);
    }

    if(req.user && req.user.admin) {
      User.find().exec(function(err, users){
        if(err) throw err;
        return res.json(users);
      });
    }
    else {
      User.find().select('firstname lastname username').exec().then(function(users){
        return res.json({
          users
        });

      }, function(){
        return res.status(404).json({
          success: false,
          response: {
            message: "No Users"
          }
        });
      })
    }
  },

  show: function(req, res) {
    if(req.query.username) {
      var Query = User.findOne().where({username: req.query.username});
    }
    else {
      var Query = User.findById(req.params.user_id);  
    }
    
    if(req.user && (req.user.admin || req.user.id === req.params.user_id)) {
      Query.exec().then(
        function(user) {
          return res.json({
            user
          });
        },
        function(err) {
          return res.status(500).json({
            success:false,
            message: err.message
          })
        }
      )
    }
    else {
      Query.select('firstname lastname username bio').exec().then(
        function(user) {
          if(user){
            return res.json({
              user
            });
          }
          else {
            return res.status(404).json({
              success: false,
              message: "No user found"
            })
          }
        },
        function(err) {
          return res.status(500).json({
            success: false,
            message: err.message
          });
        }
      )
    }
  },

  update: function(req, res){
    var body = req.body.user;

    console.log(body);
    

    if(!req.user.admin) {
      body.admin = false;
    }

    var Query = User.findByIdAndUpdate(req.params.id, body);

    if(req.user.admin || req.user.id == req.params.user_id) {
      Query.exec(function(err, user){
        if(err) throw err;

        if(!user) {
          return res.status(404).json({
            success: false,
            response: {
              message: "User does not exist."
            }
          })
        }
        else {
          Query.exec(function(err, user){
            return res.json({
              user: user
            });
          })
        }
      });
    }
    else {
      return res.status(401).json({
        status: false,
        response: {
          message: "Unauthorized."
        }
      })
    }
  }
}