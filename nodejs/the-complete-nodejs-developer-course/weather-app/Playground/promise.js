var asyncAdd = (a,b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Args must be numbers');
      }
    }, 1500);
  });
};

asyncAdd(3,5).then((result) => {
  console.log(`Result is ${result}`);
  return asyncAdd(result, 33);
}).then((result2) => {
  console.log(`Result2 is ${result2}, should be 41`);
}).catch((errorMessage) => {
  console.log(errorMessage);
});

/*
asyncAdd(5, 'test').then((result) => {
  console.log(`Results is ${result}`);
}, (errorMessage) => {
  console.log(errorMessage);
});
*/

/*
//you can either resolve once
//or you can reject once, not both
//advantage: prevents you from calling the callback function more than one time
var somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    //resolve('It worked!');
    reject('Did not work.')
  }, 2500);
});

//gets the value from resolve
somePromise.then((message) => {
  console.log('Success: ', message);
}, (errorMessage) => {
  console.log('Error: ', errorMessage);
});
*/
