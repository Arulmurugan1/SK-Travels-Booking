require('dotenv').config();
const http = require('http');
var app = require('./index');
// var connection = require('./connection');
const server = http.createServer(app);
server.listen(process.env.SERVER_PORT);