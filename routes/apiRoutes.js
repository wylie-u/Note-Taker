const fs = require('fs');
const { v4: uuidv4 } = require('uuid');



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

  //setting req.body object to the uuid module to create a unique id for each note
  req.body.id = uuidv4();
  
  let note;
  // first read file, then push the saved note into note, which is a string of data
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    // JSON parse converts string into JSON object
    note = JSON.parse(data);
    
    // pushes the stored information from the req.body object (note) into the note variable
    note.push(req.body);
    // then writefile and return the response as json with the note (data)
    fs.writeFile("./db/db.json",JSON.stringify(note),err => {
      if (err) throw err;
      res.json(note);
  });
  });
  

})
// allowing the user to delete notes
app.delete('/api/notes/:id', (req, res) => {
  // Get the id of the note to delete
  const id = req.params.id;
  
  // Get notes from db.json and convert string to JSON object
  var notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  // use Filter to disregard any notes that dont match the ID
  const savedNotes = notes.filter(note => note.id !== id);
 
  // use jsonStringify on object so it can be read
  // Overwrite db.json file, but do not include the deleted note.
  fs.writeFileSync('./db/db.json', JSON.stringify(savedNotes));
  // Tell the user a note was deleted
  res.status(200).json({ message: "selection has been deleted." })
});


}