module.exports.add = (a,b) => a + b;
module.exports.square = (x) => x * x;
module.exports.setName = (user, fullName) => {
  var names = fullName.split(' ');
  user.firstName = names[0];
  user.lastName = names[1];
  return user;
};

module.exports.asyncAdd = (a,b,callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 1000);
  //if a test takes longer than 2 sec, Mocha will assume it failed
};

module.exports.asyncSquare = (c, callback) => {
  setTimeout(() => {
    callback(c*c);
  }, 1000);
};
