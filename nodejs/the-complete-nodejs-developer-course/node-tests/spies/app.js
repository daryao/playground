let db = require('./db');

module.exports.handleSignup = (email, password) => {
  //check if email exists
  //save user to debug
  db.saveUser({ email, password });
  //send welcome email
}
