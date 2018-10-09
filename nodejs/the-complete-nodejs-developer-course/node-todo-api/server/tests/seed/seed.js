const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const salt = 'salt123';

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'user1@test.com',
  password: 'userOnePassword',
  tokens: [{
    access: 'auth',
    token:  jwt.sign({_id: userOneId, access: 'auth'}, salt).toString()
  }]
}, {
  _id: userTwoId,
  email: 'user2@test.com',
  password: 'userTwoPassword',
}];

const todos = [{
  _id: new ObjectID(),
  text: 'First todo test'
}, {
  _id: new ObjectID(),
  text: 'Second todo test',
  completed: true,
  completedAt: 123
}];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
