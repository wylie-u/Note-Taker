const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
//populates a unique id
// console.log(shortid.generate());


module.exports = app => {
//  read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {

fs.readFile("./db/db.json", "utf8",( err, data) => {
    if (err) throw err;
    var note = JSON.parse(data);
    console.log(data);
    res.json(note);
  });
})
//receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
app.post('/api/notes', (req, res) => {
  let savedNote = req.body;
  let note;
  // first read file, then push the saved note into note, which is a string of data
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    note = JSON.parse(data);
    console.log("Note Post: "+ note);
    note.push(savedNote);
    // then writefile and return the response as json with the note (data)
    fs.writeFile("./db/db.json",JSON.stringify(note),err => {
      if (err) throw err;
      res.json(note);
  });
  });
  

})

// app.get('/api/notes/notes', (req, res) => {

// })
}