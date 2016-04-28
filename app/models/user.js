var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var SchemaMethods = require('./helpers/schema_methods');
var timestamps = require('mongoose-timestamp');

var UserSchema = new Schema({
  email: {type: String, required: true, unique: true, lowercase: true, trim: true},
  firstname: {type: String},
  lastname: {type: String},
  username: {type: String, required: true, unique: true, trim: true},
  // usernameLowercase: {type: String, unique: true, trim: true},
  bio: {type: String},
  location: {type: String},
  role: {type: String},
  admin: {type: Boolean, default: false}
});

UserSchema.methods.toJSON = SchemaMethods.toJSON;

UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  hashField: 'password_hash',
  saltField: 'password_salt',
  errorMessages: {
    MissingUsernameError: "No email address was given",
    IncorrectPasswordError: "Password or username are incorrect",
    IncorrectUsernameError: "Password or username are incorrect"
  }
});

UserSchema.plugin(timestamps);

module.exports = mongoose.model('User', UserSchema);