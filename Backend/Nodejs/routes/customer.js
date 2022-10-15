const connection = require('../connection');
const express = require('express');
const route = express.Router();

var customers = " select * from customer ";

route.get('/', (req, res) => {
    connection.query(customers, (err, results) => {
        if (!err) {
            if (Object.keys(results).length == 0) {
                return res.status(200).json("No Customers found!");
            } else {
                return res.status(200).json(results);
            }
        } else {
            return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
        }
    });
});

module.exports = route;