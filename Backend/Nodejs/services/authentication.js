const jwt = require('jsonwebtoken');
require('dotenv').config();

function authToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null)
    return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, response) => {
    if (err) {
      return res.sendStatus(403);
    }
    res.locals = response;

    if (checkStatus(req, res)) {
      next();
    }
  })
}

function checkStatus(req, res) {
  if (res.locals.role == 'Admin' || res.locals.role == 'Guest') {
    return true;
  } else {
    return res.sendStatus(401);
  }
}

module.exports = { authenticateToken: authToken }
