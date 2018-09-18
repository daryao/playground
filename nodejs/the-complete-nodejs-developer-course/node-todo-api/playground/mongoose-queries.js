const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('../server/models/todo.js');
const {User} = require('../server/models/user.js');

const id = '5ba0860baf073244455dcf10';

if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
}

Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('One todo', todo);
});

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo found by id', todo);
}).catch((e) => console.log(e));

const userId = '5b9c3ecd042b7448b4550bbd';

if (!ObjectID.isValid(userId)) {
  console.log('userId not valid');
}

User.find({
  _id: userId
}).then((users) => {
  console.log('Users', users);
});

User.findOne({
  _id: userId
}).then((user) => {
  console.log('One user', user);
});

User.findById(userId).then((user) => {
  if (!user) {
    return console.log('User Id not found');
  }
  console.log('User found by id', user);
  console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));
