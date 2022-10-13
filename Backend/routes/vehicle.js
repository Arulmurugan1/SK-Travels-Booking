const connection = require('../connection');
const express = require('express');
const route = express.Router();

var vehicles = "select * from vehicle ";

route.get('/', (req, res) => {
    connection.query(vehicles, (err, results) => {
        if (!err) {
            if (Object.keys(results).length == 0) {
                return res.status(200).json("No Vehicles found!");
            } else {
                return res.status(200).json(results);
            }
        } else {
            return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
        }
    });
});

module.exports = route;