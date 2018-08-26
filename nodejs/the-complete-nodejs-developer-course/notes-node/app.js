//console.log('starting app.js');

const fs = require('fs');
const _ = require('lodash');

const notes = require('./notes.js');

const yargs = require('yargs');
const argvTitleOptions =  {
                            describe: 'Title of note',
                            demand: true,
                            alias: 't'
                          };

const argvBodyOptions = {
                          describe: 'Body of the note',
                          demand: true,
                          alias: 'b'
                        };
const argv = yargs
  .command('add', 'Add a new note', {
    title: argvTitleOptions,
    body: argvBodyOptions
  })
  .command('list', 'List all of the notes')
  .command('read', 'Read a note', {
    title: argvTitleOptions,
  })
  .command('remove', 'Remove a note', {
    title: argvTitleOptions,
    body: argvBodyOptions
  })
  .help()
  .argv;

var command = process.argv[2].toLowerCase();
//console.log('Command :', command);
//console.log('Regular Node Process', process.argv);
console.log('Yargs', argv);

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  note ? notes.logNote(note) : console.log('Duplicate note');
} else if (command === 'list') {
  var allNotes = notes.getAll();
  var msg = allNotes ? `Found note(s) : ${allNotes.length}` : 'No notes found';
  console.log(msg);
  allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var msg = noteRemoved ? `Removed note" : ${noteRemoved}` : 'Note not found';
  console.log(msg);
} else if (command === 'read') {
  var foundNote = notes.readNote(argv.title);
  foundNote ? notes.logNote(foundNote) : console.log('Note not found');
} else {
  console.log('Command not recognized');
}



































/* Everything before Lecture 4 Section 13
console.log('starting app.js');

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');
const _ = require('lodash');

//var user = os.userInfo();
//console.log(user);
//fs.appendFileSync('greetings.txt', '1. Hello ' + user.username + '! ');
//use ticks
//fs.appendFileSync('greetings.txt', `2. Hello ${user.username}!`);

//fs.appendFileSync('greetings.txt', `3. Hello ${user.username}! You are ${notes.age}.`);

// var result = notes.addNote();
// console.log(result);

//var resultOfAdd = notes.add(3,5);
//console.log(resultOfAdd);

console.log(_.isString(true));
console.log(_.isString('Darya'));
var filteredArray = _.uniq(['dee', 'darya', 1, 2, 1, 1]);
console.log(filteredArray); //[ 'darya', 1, 2 ]
*/
