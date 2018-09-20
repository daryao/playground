var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
//Equivalent to var mongoose = require('./db/mongoose').mongoose
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

//middleware
app.use(bodyParser.json());

app.get('/todos', (req, res) => {
  Todo.find().then((docs) => {
    res.send({
      docs
    });
  }, (e) => {
    res.status(400).send(e);
  })
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  } else {
    Todo.findById(id).then((todo) => {
      if (!todo) {
        res.status(400).send();
      }
      res.send(todo);
    }).catch((e) => {
        res.status(400).send(e);
    });
  }
});


app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    completedAt: req.body.completedAt
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});

app.listen(3000, () => {
  console.log('Started on port 3000')
});

module.exports = { app };
