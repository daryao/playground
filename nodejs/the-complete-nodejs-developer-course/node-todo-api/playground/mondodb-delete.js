const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

MongoClient.connect(url, function(err, client) {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log("Connected successfully to server");
  const db = client.db(dbName);

  //deleteMany
  //result: { n: 3, ok: 1 }
  db.collection('Todos').deleteMany({ text: 'Walk the dog'}).then((res) => {
    console.log(res);
  });

  //deleteOne
  //result: { n: 1, ok: 1 }
  db.collection('Todos').deleteOne({ text: 'Buy groceries'}).then((res) => {
    console.log(res);
  });

  //findOneAndDelete
  db.collection('Todos').findOneAndDelete({ completed: false }).then((res) => {
    console.log(res);
  });
  //res printed:
  // { lastErrorObject: { n: 1 },
  // value:
  //  { _id: 5b8a3e9261750cdf9449d54a,
  //    test: 'First todo note',
  //    completed: false },
  // ok: 1 }

  db.collection('Todos').deleteMany({ text: 'Do laundry'}).then((res1) => {
    console.log(`deleteMany result: ${res1}`);
    db.collection('Todos').deleteOne({ _id: new         ObjectID('5b99da1f280a027a50ad3a20')}).then((res2) => {
      console.log(`deleteOne result: ${res2}`);
    });
  });

  //client.close();
});
