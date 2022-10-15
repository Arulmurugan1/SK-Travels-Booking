var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
    port: process.env.PORT,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


connection.connect((err) => {
    if (!err) {
        console.log('mysql connected');
    } else {
        console.log(err);
    }
});

module.exports = connection;