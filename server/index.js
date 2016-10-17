// *FOR NOW, THIS AUTHENTICATION VERSION IS NON-REACT

// Main starting point for application --------------------------------

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();




// App setup -----------------------------------------------------------

// morgan (debugging) - logging framework to log incoming requests
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));




// Server setup --------------------------------------------------------

// if environment variable for PORT use it, otherwise use 3000:
const port = process.env.PORT || 3000;
// 'http' is part of the native node library - create an http server to receive requests
// and forward it to express app (where our functionality will be):
const server = http.createServer(app);
server.listen(port);
console.log('Connected to server running on Port 3000');

