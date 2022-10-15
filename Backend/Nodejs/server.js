require('dotenv').config();
const http = require('http');
var app = require('./index');
const server = http.createServer(app);
server.listen(process.env.SERVER_PORT);