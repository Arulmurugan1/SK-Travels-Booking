const connection = require('../connection');
const express = require('express');
const route = express.Router();

var checkSql = "select * from login_info where user_id=?";
var insertSql = " Insert into login_info values (?,?,?,' ',' ',' ','Guest',?,current_timestamp,current_timestamp,'N')";

route.post('/', (req, res) => {
    let body = req.body;
    if (Object.keys(body).length == 0) {
        return res.status(500).json({ message: "User Information Needed" });
    } else if (body.id == "" && body.password == "") {
        return res.status(507).json({ message: "User Credential missing " });
    } else {
        connection.query(checkSql, [body.id, body.password], (err, results) => {
            if (!err) {
                if (Object.keys(results).length == 0) {
                    return res.status(401).json({ message: " User not Found for " + body.id });
                } else if ((body.id).trim() != (results[0].user_id).trim()) {
                    return res.status(401).json({ message: " User id not correct " + results[0].username });
                } else if ((body.password).trim() != (results[0].password1).trim()) {
                    return res.status(401).json({ message: " Password not Correct " + results[0].username });
                } else {
                    return res.status(200).json({ message: " login Successful " + results[0].username });
                }
            } else {
                return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
            }
        });
    }
});

route.post('/register', (req, res) => {
    let body = req.body;
    if (body.length == 0) {
        return res.status(500).json({ message: "No Information received !" })
    } else {
        connection.query(checkSql, [body.id], (err, results) => {
            if (!err) {
                if (Object.keys(results).length == 0) {
                    connection.query(insertSql, [body.id, body.name, body.password, body.name], (err, results) => {
                        if (err) {
                            return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
                        } else {
                            return res.status(201).json({ message: "Congrats ! Registration Successful " + body.name });
                        }
                    });
                } else {
                    return res.status(302).json({ message: "Email already registered !" });
                }
            } else {
                return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
            }
        });
    }
});

module.exports = route;