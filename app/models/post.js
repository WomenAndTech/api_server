var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var SchemaMethods = require('./helpers/schema_methods');
var timestamps = require('mongoose-timestamp');

var PostSchema = new Schema({
  title: String,
  body: String,
  isDraft: {type: Boolean, default: true},
  type: String,
  meta: [{name: String, value: Schema.Types.Mixed}]
});

PostSchema.methods.toJSON = SchemaMethods.toJSON;

// PostSchema.pre('save', function(next) {
//   var body = this.body;
//   next();
// });

PostSchema.plugin(timestamps);

module.exports = mongoose.model('Post', PostSchema);