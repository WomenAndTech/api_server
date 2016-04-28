var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var SchemaMethods = require('./helpers/schema_methods');
var timestamps = require('mongoose-timestamp');

var MetaSchema = new Schema({
  name: {type: String},
  value: {type: Schema.Types.Mixed}
});

var PostSchema = new Schema({
  title: String,
  body: String,
  status: {type: String, default: "draft"},
  publishedAt: {type: Date},
  isDraft: {type: Boolean, default: true},
  type: {type: String, default: 'post'},
  meta: [MetaSchema]
});

PostSchema.methods.toJSON = SchemaMethods.toJSON;

PostSchema.plugin(timestamps);

module.exports = mongoose.model('Post', PostSchema);