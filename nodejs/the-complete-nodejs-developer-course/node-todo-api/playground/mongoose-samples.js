//sample code

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection opened')
});

var newTodo = new Todo({
  text: 'Cook dinner',
  completed: false
});

newTodo.save().then((doc) => {
  console.log('Saved todo', doc);
}, (e) => {
  console.log('Unable to save todo');
})

var newTodo2 = new Todo({
  text: 'Change water filter',
  completed: true,
  completedAt: 1536826962546
});

newTodo2.save().then((doc) => {
  console.log('Saved todo2', JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Unable to save todo2', e);
})

var newTodo3 = new Todo({
  text: '  Clean up code comments '
});

newTodo3.save().then((doc) => {
  console.log('Saved todo3', JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Unable to save todo3', e);
})

var newUser = new User({ email: 'user@domain.com' })
newUser.save().then((doc) => {
  console.log('Saved newUser', JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Unable to save newUser', e);
});
