var express = require('express');
const cors = require('cors');
var auth = require('./services/authentication');
var count = require('./routes/total');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/login', require('./routes/login'));
app.use('/booking', require('./routes/booking'));
app.use('/customer', require('./routes/customer'));
app.use('/vehicle', require('./routes/vehicle'));
app.use('/driver', require('./routes/driver'));
app.use('/route', require('./routes/route'));
app.use('/report', require('./routes/bookingPdf'));
app.use('/checkToken',auth.authenticateToken, (req, res) => {
  return res.status(200).json({ message: true });
});
app.use('/home',auth.authenticateToken, (req, res) => {
  return res.status(200).json(count.dataTotal);
});
module.exports = app;
