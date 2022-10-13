const connection = require('../connection');
const express = require('express');
const route = express.Router();

var customer_id, vehicle, driver, driver_name, fare;
var bookingSql = "select c.customer_name,b.* from booking b,customer c where b.customer_id = c.customer_id";
var insertCustomerSql = "Insert into customer values(null,?,?,?,?,?,?,?)";
var insertBookingSql = "Insert into booking values(null,?,?,?,?,?,?)";
var deleteCustomerSql = "delete from customer where customer_id =?";
var deleteBookingSql = "delete from booking where customer_id =?";
var detailSql = "select v.vehicle_no,d.driver_id,d.driver_name,r.fare from vehicle v , driver d , route r where r.start=? and r.end =? and " +
    "v.vehicle_no = d.vehicle_no " +
    "and v.vehicle_no = r.vehicle_no";

route.get('/', (req, res) => {
    connection.query(bookingSql, (err, results) => {
        if (!err) {
            if (Object.keys(results).length == 0) {
                return res.status(200).json("No bookings!");
            } else {
                return res.status(200).json({ Total_booking: Object.keys(results).length, results: results });
            }
        } else {
            return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
        }
    });
});

route.post('/insert', (req, res) => {
    var body = req.body; //name,start,end,age,gender,email,phone
    connection.query(detailSql, [body.start, body.end], (err, result) => {
        if (!err) {
            if (Object.keys(result).length == 0) {
                return res.status(500).json("Driver or Vehicle Unavailable ! Please Try Again After few minutes");
            } else {

                this.driver = result[0].driver_id;
                this.driver_name = result[0].driver_name;
                this.vehicle = result[0].vehicle_no;
                this.fare = result[0].fare;

                connection.query(insertCustomerSql, [body.name, body.start, body.end, body.age, body.gender, body.email, body.phone], (err, result) => {
                    if (!err) {
                        if (result.affectedRows > 0) {
                            this.customer_id = result.insertId;
                            if (this.customer_id > 0) {

                                var info = {
                                    BookingDetails: { Pickup: body.start, Drop: body.end, Vehicle_No: this.vehicle, Driver_Id: this.driver, Driver_Name: this.driver_name, Fare: this.fare, Customer_Id: this.customer_id, booking_no: 0 },
                                    details: [body.start, body.end, this.customer_id, this.vehicle, this.driver, this.fare]
                                };
                                connection.query(insertBookingSql, info.details, (err, result) => {
                                    if (!err) {
                                        if (result.affectedRows > 0) {
                                            info.BookingDetails.booking_no = result.insertId;
                                            return res.status(200).json({ message: "Booking Successful ! ", Info: info.BookingDetails });
                                        }
                                    } else {
                                        return res.status(201).json("Booking Error but Customer Added");
                                    }
                                });
                            }
                        } else {
                            return res.status(200).json(" Some Error occcured at Customer Adding ");
                        }
                    } else {
                        return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
                    }
                });
            }
        }
    });
});
route.delete('/delete/:id', (req, res) => {
    var id = req.params.id;
    connection.query(deleteBookingSql, id, (err, result) => {
        if (!err) {
            console.log(`Booking deleted records ::` + result.affectedRows);
            if (result.affectedRows > 0) {
                connection.query(deleteCustomerSql, id, (err, result) => {
                    if (!err) {
                        console.log(`Customer deleted records ::` + result.affectedRows);
                        if (result.affectedRows > 0)
                            return res.status(200).json("Customer Booking deleted for id" + id);
                        else
                            return res.status(500).json("Some Internal Error or Customer not found ");
                    } else {
                        return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
                    }
                });
            } else
                return res.status(500).json("Some Internal Error or Booking Customer not found ");
        } else {
            return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
        }
    });
});

module.exports = route;