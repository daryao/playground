//console.log('Starting notes.js');

const fs = require('fs');
const fileName = 'notes-data.json';

var fetchNotes = () => {
  if (fs.existsSync(fileName)) {
    try {
      var notesString = fs.readFileSync(fileName);
      return JSON.parse(notesString);
    } catch(e){
      return [];
    }
  } else {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync(fileName, JSON.stringify(notes));
}

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
  var duplicateNotes = notes.filter((note) => note.title === title);
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  return fetchNotes();
};

var removeNote = (title) => {
  var originalNotes = fetchNotes();
  var newNotes = originalNotes.filter((note) => note.title != title);
  saveNotes(newNotes);
  if ((originalNotes.length - newNotes.length) == 1) return title;
};

var readNote = (title) => {
  var notes = fetchNotes();
  var foundNote = notes.filter((foundNote) => foundNote.title === title);
  return foundNote[0];
};

var logNote = (note) => {
  console.log('--');
  console.log(`Note title: ${note.title}`);
  console.log(`Note body: ${note.body}`);
}

module.exports = {
  //shortcut below, same as addNote : addNote
  addNote,
  getAll,
  removeNote,
  readNote,
  logNote
};

/*
//console.log(module);
module.exports.age = 29;

//es6 function
module.exports.addNote = () => {
  console.log('addNote');
  return 'New note';
};
*/

/* before Lecture 4 Section 13
module.exports.add = (a, b) => {
  return a+b;
};
*/
