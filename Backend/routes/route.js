const connection = require('../connection');
const express = require('express');
const route = express.Router();
//Queries 
var routes = " select * from route ";

route.get('/', (req, res) => {
    connection.query(routes, (err, results) => {
        if (!err) {
            if (Object.keys(results).length == 0) {
                return res.status(200).json("No Routes found!");
            } else {
                return res.status(200).json(results);
            }
        } else {
            return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
        }
    });
});

module.exports = route;