const fs = require('fs');
const express = require('express');
const { v4: uuidv4 } = require('uuid');


// with API (data) in route, we will be getting back a JSON file
module.exports = app => {
//  read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
// Read the db.json file
fs.readFile("./db/db.json", "utf8",( err, data) => {
    if (err) throw err;
    // assign variable to the data and return the data as a json object
    var note = JSON.parse(data);
    console.log(data);
    // return as json
    res.json(note);
  });
})

// below code handles when a user submits data (form) to the server as a json object
  
//receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client (html)
app.post('/api/notes', (req, res) => {
  // req.body = form data
  //setting req.body object to the uuid module to create a unique id for each note
  req.body.id = uuidv4();
  
  let note;
  // first read file of data, then push the saved note into the note variable, which is a string of data
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    // JSON parse converts string into JSON object
    note = JSON.parse(data);
    
    // pushes the stored information (note) from the req.body (form) into the note variable
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
  let uniqueID = req.params.id;
  console.log("id is: ", uniqueID);
  
  // Get notes from db.json and convert string to JSON object
  var notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  // use Filter to disregard any notes that dont match the ID
  const savedNotes = notes.filter(note => note.id !== uniqueID);
 
  // use jsonStringify on object so it can be read
  // Overwrite db.json file, but do not include the deleted note.
  fs.writeFileSync('./db/db.json', JSON.stringify(savedNotes));
  // Tell the user a note was deleted
  res.json(savedNotes)
});


}