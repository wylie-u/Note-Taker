const express = require('express');
const fs = require('fs');

// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

require("./routes/htmlRoutes")(app);

require("./routes/apiRoutes")(app);

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));