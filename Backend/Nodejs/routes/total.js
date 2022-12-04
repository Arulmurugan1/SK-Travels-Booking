var dataTotal = new Object();
var modules = require('../services/modules');

function getData() {
    modules.connection.query('select count(*) count from booking', (err, result) => {
        if (err) {
            dataTotal.booking = 0;
        }
        else {
            dataTotal.booking = result[0].count;
        }
    });
    modules.connection.query('select count(*) count from customer', (err, result) => {
        if (err) {
            dataTotal.customer = 0;
        }
        else {
            dataTotal.customer = result[0].count;
        }
    });
    modules.connection.query('select count(*) count from vehicle', (err, result) => {
        if (err) {
            dataTotal.transport = 0;
        }
        else {
            dataTotal.transport = result[0].count;
        }
    });
    modules.connection.query('select count(*) count from driver', (err, result) => {
        if (err) {
            dataTotal.driver = 0;
        }
        else {
            dataTotal.driver = result[0].count;
        }
    });
    modules.connection.query('select count(*) count from route', (err, result) => {
        if (err) {
            dataTotal.route = 0;
        }
        else {
            dataTotal.route = result[0].count;
        }
    });
    modules.connection.query('select count(*) count from login_info', (err, result) => {
        if (err) {
            dataTotal.users = 0;
        }
        else {
            dataTotal.users = result[0].count;
        }
    });
    return dataTotal;
}

module.exports = {dataTotal : getData() }