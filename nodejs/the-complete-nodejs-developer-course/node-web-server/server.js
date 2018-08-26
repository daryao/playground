const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
  var now = new Date().toString();
  log = `${now} : ${request.method} ${request.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});
/*
app.use((request, response, next) => {
  response.render('maintenance.hbs');
});
*/
//middleware. Express will handle the stack every time an incoming HTTP request is caught on the server. With middleware you handle the stack manually.

//placed AFTER maintenance page
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
});

//app.METHOD(PATH, HANDLER)
app.get('/', (request, response) => {
  //response.send('<h1>Hello Express!</h1>')
  response.send({
    name: 'Dee',
    city: 'Calgary',
    likes: 'Rain'
  })
});

app.get('/home', (request, response) => {
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMsg: 'Welcome to the NodeJS Express site'
  });
});

app.get('/about', (request, response) => {
  //response.send('About page');
  response.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Error!'
  });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
