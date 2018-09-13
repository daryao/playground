const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

MongoClient.connect(url, function(err, client) {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log("Connected successfully to server");
  const db = client.db(dbName);

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5b9a0fc7280a027a50ad4e66')
  }, { //updates you want to make
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((res) => {
    console.log(res);
  });
  //result:
    // { lastErrorObject: { n: 1, updatedExisting: true },
    // value:
    //  { _id: 5b9a0fc7280a027a50ad4e66,
    //    text: 'Wash dishes',
    //    completed: true },
    // ok: 1 }

    db.collection('Users').update({
      _id: new ObjectID('5b99d928f283891f2585ab17')
    }, {
      $set: {
        name: 'Carlos'
      },
      $inc: {
        age: 1
      }
    }, {
      returnOriginal: false
    }).then((res) => {
      console.log(res.result);
    });

  //client.close();
});
