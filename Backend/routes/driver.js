const connection = require('../connection');
const express = require('express');
const route = express.Router();

var drivers = " select * from driver ";
var insert = " Insert into driver values (null,?,?,?,?,?,?) ";
var update = " Update driver set driver_name =?, age=?, gender=?, city=?, phone=?, vehicle_no=? where driver_id=?";
var deleteSql = " delete from driver where driver_id =?";

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

route.post('/insert', (req, res) => {
    var body = req.body;
    connection.query(insert, [body.name, body.age, body.gender, body.city, body.phone, body.vehicle_no], (err, results) => {
        if (!err) {
            return res.status(200).json("Driver Added !");
        } else {
            return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
        }
    });
});

route.patch('/update', (req, res) => {
    var body = req.body;
    connection.query(update, [body.name, body.age, body.gender, body.city, body.phone, body.vehicle_no, body.id], (err, results) => {
        if (!err) {
            if (results.affectedRows > 0)
                return res.status(200).json("Driver Updated !");
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
                return res.status(200).json("Driver deleted !");
            else
                return res.status(500).json(" Something Went Wrong");
        } else {
            return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
        }
    });
});

module.exports = route;