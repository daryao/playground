const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 14,
};

const salt = 'salt123';

var token = jwt.sign(data, salt);
console.log(`Token: ${token}`);

var decodedtoken = jwt.verify(token, salt);
console.log(`Decoded token: ${JSON.stringify(decodedtoken)}`);

// var message = 'I am user number three';
// var hash = SHA256(message).toString();
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 4,
// };
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'salt').toString()
// };
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'salt').toString();
//
// if (resultHash == token.hash) {
//   console.log('Data was not changed')
// } else {
//   console.log('Data was changed')
// }
