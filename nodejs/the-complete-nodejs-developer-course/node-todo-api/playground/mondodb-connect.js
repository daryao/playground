//MongoClient is the default connection class for MongoDB
//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'TodoApp';

// connect to the server
MongoClient.connect(url, function(err, client) {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const collectionTodos = db.collection('Todos');
  //if collection doesn't exist yet, it will be created
  collectionTodos.insertOne({
    test: 'First todo note',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert todo', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  })

  const collectionUsers = db.collection('Users');
  collectionUsers.insertOne({
    name: 'Cecil',
    age: 31,
    location: 'Night Vale'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert user', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
    //ObjectId has a getTimestamp() method
    console.log(result.ops[0]._id.getTimestamp());
  })

  client.close();
});
