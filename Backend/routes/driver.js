const connection = require('../connection');
const express = require('express');
const route = express.Router();

var drivers = " select * from driver ";

route.get('/', (req, res) => {
    connection.query(drivers, (err, results) => {
        if (!err) {
            if (Object.keys(results).length == 0) {
                return res.status(200).json("No Drivers found!");
            } else {
                return res.status(200).json(results);
            }
        } else {
            return res.status(500).json("Something Error Found ");
        }
    });
});

module.exports = route;