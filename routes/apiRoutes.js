const fs = require('fs');
const shortid = require('shortid');
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
  note.push(savedNote);
  //taking the data from the note variable 
  fs.writeFile("./db/db.json",JSON.stringify(note),err => {
    if (err) throw err;
    return true;
});

})

// app.get('/api/notes/notes', (req, res) => {

// })
}