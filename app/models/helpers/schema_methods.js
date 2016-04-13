exports.toJSON = function(){
  var object = this.toObject({virtuals: true});

  var new_object = {};

  new_object.id = object._id;
  delete object._id;

  for(var key in object){
    new_object[key] = object[key]
  }

  return new_object;
}

exports.slugify = function(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
}