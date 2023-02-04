const connection = require('../connection');
const express = require('express');
const route = express.Router();
var auth = require('../services/authentication');

const jwt = require('jsonwebtoken');
require('dotenv').config();

var checkSql = "select user_id, username, password1, gender, role, altered_user, date_format(create_time,'%W %e %M %Y %r') \"create_time\", date_format(last_login ,'%W %e %M %Y %r') \"last_login\", status, dob from login_info where user_id=?";
var insertSql = " Insert into login_info "
+" (user_id, username, password1, gender, role, altered_user, create_time, last_login, status, dob) "
+" values(?,?,?, ' ', 'Guest', ' ' , sysdate(), sysdate(), 'N',' ')";
var updateStatus = 'update login_info set status = ? where user_id = ? ';
var changePassword = 'update login_info set password1=? where user_id = ? '
var getUserData = "select user_id, username, password1, gender, role, altered_user, date_format(create_time,'%W %e %M %Y %r') \"create_time\", date_format(last_login ,'%W %e %M %Y %r') \"last_login\",dob, status from login_info";
route.post('/', (req, res) => {
  let body = req.body;
  if (Object.keys(body).length <= 0) {
    return res.status(500).json({ message: "User Information Needed" });
  } else if ((body.id).trim() == "" && (body.password).trim() == "") {
    return res.status(507).json({ message: "User Credential missing " });
  } else {
    connection.query(checkSql, [body.id, body.password], (err, results) => {
      if (!err) {
        if (results.length <= 0)
          return res.status(200).json({ message: " Create an Account to login " + body.id });
        else if ( (body.id).trim() != (results[0].user_id).trim())
          return res.status(200).json({ message: " User id not correct " + results[0].username });
        else if ( (body.password).trim() != results[0].password1.trim() )
          return res.status(200).json({ message: " Password not Correct " + results[0].username });
        else if (results[0].status == 'N')
        {
          return res.status(200).json(
            {
              message: " Wait for admin approval " + results[0].username
            });
        }
        else if ((body.password).trim() == results[0].password1)
        {
          const response = {
            username: results[0].username,
            role: results[0].role,
            id: results[0].user_id,
            userStatus: results[0].status,
            last_login: results[0].last_login,
          }
          
          const token = jwt.sign(response, process.env.ACCESS_TOKEN,{expiresIn : "7d"})

          res.status(200).json(
            {
              token: token,
              message: " Login Successful " + results[0].username,
            })
        }
      }
      else
        return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.stack);
    });
  }
});

route.post('/register', (req, res) => {
  console.log(req.body);
  let body = req.body;
  if (body.length == 0) {
    return res.status(500).json({ message: "No Information received !" })
  } else {
    connection.query(checkSql, [body.id], (err, results) => {
      if (!err) {
        if (Object.keys(results).length == 0) {
          connection.query(insertSql, [body.id, body.name, body.password, body.name], (err, results) => {
            if (err) {
              return res.status(500).json({ message: "Something Error Found :: " + err.errno + ":: " + err.sqlMessage });
            } else {
              return res.status(201).json({ message: "Congrats ! Registration Successful " + body.name });
            }
          });
        } else {
          return res.status(302).json({ message: "Account already registered !" });
        }
      } else {
        return res.status(500).json({ message: "Something Error Found :: " + err.errno + ":: " + err.sqlMessage });
      }
    });
  }
});

route.post('/status', auth.authenticateToken, (req, res) => {
  let body = req.body;
  connection.query(updateStatus, [body.status, body.id], (err, results) => {
    if (!err) {
      if (results.affectedRows > 0)
        return res.status(200).json({ message: 'Status Updated for ' + body.id })
      else
        return res.status(500).json({message:"Failed to Update Status for "+body.username});
    } else {
      return res.status(500).json({ message: "Something Error Found :: " + err.errno + ":: " + err.sqlMessage });
    }
  });
});

route.post('/changePassword', auth.authenticateToken, (req, res) => {
  let body = req.body;
  connection.query(changePassword, [body.password, body.id], (err, result) => {

    if (!err) {
      if (result.affectedRows > 0)
        return res.status(200).json({ message: 'Password Changed Successfully' });
      else
        return res.status(500).json({ message: ' Something error found .Please Contact your Admin' });
    } else
      return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
  })
});

route.get('/getDetails', auth.authenticateToken, (req, res) => {
  connection.query(getUserData, (err, result) => {
    if (!err) {
      if (result)
        return res.status(200).json({ message: result });
      else
        return res.status(500).json({ message: ' Something error found .Please Contact your Admin' });
    } else
      return res.status(500).json({ message: "Something Error Found :: " + err.errno + ":: " + err.sqlMessage });
  })
});

module.exports = route;
