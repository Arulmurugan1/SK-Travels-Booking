var express = require('express');
const cors = require('cors');

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
app.use('/', (req, res) => {
    return res.status(200).json(" Welcome To SK Travels")
});
module.exports = app;