const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');

describe('App', () => {

  var db = {
    saveUser: expect.createSpy()
  };

  //replace const db (variable name is the first parameter) in app.js with the mock
  app.__set__('db', db);
  //app.__get__()

  it('should call the spy correctly', () => {
    var spy = expect.createSpy();
    spy('Spring', 123);
    expect(spy).toHaveBeenCalledWith('Spring', 123);
  })

  it('should call saveUser with user object', () => {
    var email = 'some@email.com';
    var password = '123qwerty';
    app.handleSignup(email, password);
    expect(db.saveUser).toHaveBeenCalledWith({ email, password });
  })

})
