const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

MongoClient.connect(url, function(err, client) {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  db.collection('Todos').find({
    //completed: true
    _id: new ObjectID('5b99da1f280a027a50ad3a20')
  })
  .toArray()
  .then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('unable to fetch records', err)
  });

  db.collection('Todos').find({}).count().then((count) => {
    console.log(`Todos count: ${count}`);
  }, (err) => {
    console.log('unable to fetch count', err)
  });

  db.collection('Users').find({ age: {$gt: 30} }).toArray().then((users) => {
    console.log('Users');
    console.log(JSON.stringify(users, undefined, 2));
  }, (err) => {
    console.log('unable to fetch users', err)
  });


  //client.close();
});
