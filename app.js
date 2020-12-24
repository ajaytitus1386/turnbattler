const http = require('http');
const fs = require('fs');

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
require('dotenv/config');

const cors = require('cors');
app.use(cors()); //Allows one to bypass the CORS policy that stops cross domain access
app.use(bodyParser.json()); //Helps format the json so it can work between Mongo and JS

const server = http.Server(app);

var PORT = process.env.PORT || 5500;
console.log("Express __dir pre- attempt")
app.use(express.static('game'));
console.log("Express __dir attempt")

server.listen(PORT, () =>{
    console.log('Server running');
})