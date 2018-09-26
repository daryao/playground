const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('../server/models/todo.js');
const {User} = require('../server/models/user.js');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

Todo.findOneAndRemove({
  _id: '5bab103bc4ea11818104d2c1'
}).then((doc) => {
  console.log(doc);
});

Todo.findByIdAndRemove('5bab103bc4ea11818104d2c1').then((doc) => {
  console.log(doc);
});
