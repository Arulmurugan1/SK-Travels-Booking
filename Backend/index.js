var express = require('express');
var cors = require('cors');
var login = require('./routes/login');
var booking = require('./routes/booking');
var customer = require('./routes/customer');
var vehicle = require('./routes/vehicle');
var driver = require('./routes/driver');
var route = require('./routes/route');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/login', login);
app.use('/booking', booking);
app.use('/customer', customer);
app.use('/vehicle', vehicle);
app.use('/driver', driver);
app.use('/route', route);
app.use('/', (req, res) => {
    return res.status(200).json(" Travel Pvt.ltd Welcomes you")
});
module.exports = app;