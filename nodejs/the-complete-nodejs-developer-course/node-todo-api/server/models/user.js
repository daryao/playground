const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const Schema = mongoose.Schema;
var UserSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    // validate: {
    //   validator: function(v) {
    //     var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    //     return emailRegex.test(v);
    //   },
    //   message: `Not a valid email!`
    // },
    validate: {
      // validator: (emailValue) => {
      //   return validator.isEmail(value);
      // },
      //same as above:
      validator: validator.isEmail,
      message: `{emailValue}: not a valid email`
    },
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'salt123').toString();
  // user.tokens.push({
  //   access,
  //   token
  // });
  user.tokens = user.tokens.concat([{access,token}]);
  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};
//first arg is the singular name of the collection your model is for
//Mongoose automatically looks for the plural version of name
var User = mongoose.model('User', UserSchema);

module.exports = {User};
