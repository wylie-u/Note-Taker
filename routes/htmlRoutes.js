const path = require('path');
const express = require('express');

// code handles when a user 'visit' a page
// in each of the below cases the user is shown an HTML page of content

module.exports = (app) => {
    
    // `GET /notes` should return the `notes.html` file.
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'))});

    // `GET *` should return the `index.html` file.
    app.get('*', (req, res) => {res.sendFile(path.join(__dirname, '../public/index.html'))}); 

}