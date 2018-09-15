var mongoose = require('mongoose');

const Schema = mongoose.Schema;
var userSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    validate: {
      validator: function(v) {
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(v);
      },
      message: `Not a valid email!`
    },
  }
});

//first arg is the singular name of the collection your model is for
//Mongoose automatically looks for the plural version of name
var User = mongoose.model('User', userSchema);

module.exports = {User};
