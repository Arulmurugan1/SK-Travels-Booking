const connection = require('../connection');
const express = require('express');
const route = express.Router();

var vehicles = "select * from vehicle ";
var insert = " Insert into vehicle (?,?,?,?)";
var update = " Update vehicle set color=? where vehicle_no =?";
var deleteSql = " delete from vehicle where vehicle_no =?";

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

route.post('/insert', (req, res) => {
    var body = req.body;
    connection.query(insert, [body.no, body.brand, body.model, body.color], (err, results) => {
        if (!err) {
            return res.status(200).json("Vehicle Added !");
        } else {
            return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
        }
    });
});

route.patch('/update', (req, res) => {
    var body = req.body;
    connection.query(update, [body.color, body.no], (err, results) => {
        if (!err) {
            if (results.affectedRows > 0)
                return res.status(200).json("Vehicle Color Updated !");
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
                return res.status(200).json("Vehicle deleted !");
            else
                return res.status(500).json(" Something Went Wrong");
        } else {
            return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
        }
    });
});


module.exports = route;