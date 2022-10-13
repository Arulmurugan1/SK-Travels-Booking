const connection = require('../connection');
const express = require('express');
const route = express.Router();
//Queries 
var routes = " select * from route ";
var insert = " Insert into route values(?,?,?,?)";
var update = " Update route set start=?,end=?,fare=? where vehicle_no = ?";
var deleteSql = " delete from route where vehicle_no =?";

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

route.post('/insert', (req, res) => {
    var body = req.body;
    connection.query(insert, [body.no, body.start, body.end, body.fare], (err, results) => {
        if (!err) {
            return res.status(200).json("Route Added !");
        } else {
            return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
        }
    });
});

route.patch('/update', (req, res) => {
    var body = req.body;
    connection.query(update, [body.start, body.end, body.fare, body.no], (err, results) => {
        if (!err) {
            if (results.affectedRows > 0)
                return res.status(200).json("Route Updated !");
            else
                return res.status(500).json(" Something Went Wrong");
        } else {
            return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
        }
    });
});

route.delete('/delete/:id', (req, res) => {
    var body = req.params.id;
    connection.query(deleteSql, id, (err, results) => {
        if (!err) {
            if (results.affectedRows > 0)
                return res.status(200).json("Route deleted !");
            else
                return res.status(500).json(" Something Went Wrong");
        } else {
            return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
        }
    });
});

module.exports = route;