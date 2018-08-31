const express = require('express');

var app = express();

app.get('/', (req,res) => {
  //res.send('Hello world');

  // res.status(404).send({
  //   error: 'Page not found'
  // });

  res.status(404).send({
    error: 'Page not found',
    name: 'Todo App v1.0'
  });
});

//GET /users
//give users a name and age properties
app.get('/users', (req,res) => {
  res.status(200).send([
    { name: 'Amy', age: 25 },
    { name: 'Rory', age: 26 },
    { name: 'Who?', age: 999 }
  ]);
});

app.listen(3000);
module.exports.app = app;
