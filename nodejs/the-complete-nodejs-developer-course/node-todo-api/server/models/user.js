const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const salt = 'salt123';

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

UserSchema.pre('save', function (next) {
  var user = this;
  //avoid hashing hashed password
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
})

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, salt).toString();
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

//model method instead of instance method
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, salt);
  } catch(e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })

};
//first arg is the singular name of the collection your model is for
//Mongoose automatically looks for the plural version of name
var User = mongoose.model('User', UserSchema);

module.exports = {User};
