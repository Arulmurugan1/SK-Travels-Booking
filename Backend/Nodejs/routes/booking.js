const connection = require('../connection');
const express = require('express');
const route = express.Router();
const auth = require('../services/authentication');
var modules = require('../services/modules');

var bookingSql = "select c.customer_name,b.* from booking b,customer c where b.customer_id = c.customer_id";
var insertCustomerSql = "Insert into customer(customer_id, customer_name, start, end, age, gender, email, phone) " +
  " values(null,?,?,?,?,?,?,?)";
var insertBookingSql = "Insert into booking(booking_no, pickup_from, drop_at, customer_id, vehicle_no, driver_id, fare, booked_by, status, booking_time) " +
  "values(null,?,?,?,?,?,?,?,'WIP',sysdate())";
var deleteCustomerSql = "delete from customer where customer_id =?";
var deleteBookingSql = "delete from booking where customer_id =?";
var updateSql = "Update Booking set customer_name=?,age=?, gender=?, email=?, phone=? where customer_id=?";
var detailSql = "select v.vehicle_no,d.driver_id,d.driver_name,r.fare from vehicle v , driver d , route r where r.start=? and r.end =? and " +
  "v.vehicle_no = d.vehicle_no " +
  "and v.vehicle_no = r.vehicle_no";
route.get('/', auth.authenticateToken, (req, res) => {
  return getBooking(req, res);
});

route.post('/insert', auth.authenticateToken, (req, res) => {
    return insertBooking(req, res);
});
route.patch(`/update`, auth.authenticateToken, (req, res) => {
  return updateBooking(req, res);
});
route.delete('/delete/:id', auth.authenticateToken, (req, res) => {
  return deleteBooking(req, res);
});
route.post('/getPdf', auth.authenticateToken, (req, res) => {
  if (modules.fs.existsSync(req.headers['filename'])) {
    res.contentType("application/pdf");
    modules.fs.createReadStream(req.headers['filename']).pipe(res);
  } 
});

route.post('/MyBooking', auth.authenticateToken, (req, res) => {
  var myBooking = " SELECT b.BOOKING_NO \"Booking No\", PICKUP_FROM \"Boarding\",DROP_AT \"Destination\" , VEHICLE_NO \"TransportNo\" , Fare , Status , date_format(b.booking_time,'%W %M %e %Y %r ') \"BookingTime\",file_path \"File Path\" " +
    " FROM BOOKING b left outer join booking_history bh on b.booking_no = bh.booking_no "
    + " WHERE b.BOOKED_bY = ?";

  connection.query(myBooking, [req.headers.userid], (err, result) => {
    if (!err)
      return res.status(200).json({ message: result });
    else
      return res.status(500).json({ message: "Something Error Found :: "+ err.sqlMessage });
  });
});

route.post('/details', auth.authenticateToken, (req, res) => {
  connection.query(detailSql, [req.body.start, req.body.end], (err, result) => {
    if (!err) {
      return res.status(200).json({ result: result[0] });
    } else {
      return res.status(500).json({ message: "Something Error Found :: "+ err.sqlMessage });
    }
  });
});

route.get('/getBoarding', auth.authenticateToken, (req, res) => {
  connection.query('select distinct start from route order by start', (err, results) => {
    if (!err) {
      return res.status(200).json({ TotalBoarding: results.length, results: results });
    } else {
      return res.status(500).json({ message: "Something Error Found :: "+ err.sqlMessage });
    }
  });
});
route.get('/getDestination/:start', auth.authenticateToken, (req, res) => {
  connection.query("select distinct end from route where start ='" + req.params.start + "' order by end", (err, results) => {
    if (!err) {
      return res.status(200).json({ TotalDestination: results.length, results: results });
    } else {
      return res.status(500).json({ message: "Something Error Found :: "+ err.sqlMessage });
    }
  });
});

function getBooking(req, res) {
  connection.query(bookingSql, (err, results) => {
    if (!err) {
      if (results.length == 0) {
        return res.status(200).json("No bookings!");
      } else {
        return res.status(200).json({ Total_booking: results.length, results: results });
      }
    } else {
      return res.status(500).json({ message: "Something Error Found :: "+ err.sqlMessage });
    }
  });
}


function insertBooking(req, res) {
  let info = new Array();
  for (var body of req.body) {
    connection.query(insertCustomerSql, [body.name, body.start, body.end, body.age, body.gender, body.email, body.phone], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Something Error Found :: "+ err.sqlMessage });
      }
      var customer_id = result.insertId;
      var details = [
        body.start, body.end, customer_id, body.vehicle, body.driver, body.fare, req.headers?.userid
      ];

      connection.query(insertBookingSql, details, (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Something Error Found :: "+ err.sqlMessage });
        }
        if (result && !result.insertId) {
          return res.status(500).json({ message: 'Insert Id Generation Issue' });
        }
        info.push({
          start: body.start,
          name: body.name,
          end: body.end,
          vehicle: body.vehicle,
          driver: body.driver,
          driverName: body.driverName,
          fare: body.fare,
          customerId: customer_id,
          bookingNo: result.insertId
        });
        if (info.length == req.body.length) {
          insertBookingHistory(req, res, info);
        }
      });
    });
  }
}

function getFilePath(req) {
  if (req.headers['filename'])
    return modules.pdfPath + "/" + req.headers['filename'];
  else
    return modules.pdfPath + "/" + new Date().getTime() + '_booking.pdf';
}
function insertBookingHistory(req, res, info) {
  if (info) {

    const filePath = getFilePath(req);
    info.push({ fileName: filePath });

    for (var i in info) {

      if (info[i]['bookingNo']) {
        var InsertBookingHistorySql = " Insert into Booking_history(s_no, booking_no, booked_by, booking_time, file_path, payment_mode) " +
          " values (null,?,?,sysdate(),?, 'Angular App') ";

        var filters = [info[i]['bookingNo'], req.headers['userid'], filePath];

        connection.query(InsertBookingHistorySql, filters, (err, result) => {
          if (err) {
            return res.status(500).json({ message: "Something Error Found :: "+ err.sqlMessage });
          }
        });
      }
      else {
        generatePdf(req, res, info);
      }
    }
  }
  else {
    return res.status(500).json({ message: 'Booking Info Not Found' })
  }
}
function generatePdf(req, res, result) {

  const filePath = result[result.length - 1] && result[result.length - 1].fileName;

  result.pop();

  if (req && result) {

    if (modules.fs.existsSync(filePath)) {
      res.contentType("application/pdf");
      modules.fs.createReadStream(filePath).pipe(res);

    } else {
      modules.ejs.renderFile(modules.path.join(__dirname, '', "report.ejs"), { bookings: result, Time: new Date().toString() }, (err, results) => {
        if (err) {
          return res.status(500).json({ message: err });
        }
        else {
          modules.pdf.create(results).toFile(filePath, (err, data) => {
            if (err) {
              return res.status(500).json({ message: err });
            }
            else {
              res.contentType("application/pdf").status(200);
              modules.fs.createReadStream(filePath).pipe(res);
            }
          });
        }
      });
    }

  } else {
    return res.status(500).json({ message: 'Pdf Generation Issue' })
  }
}

function updateBooking(req, res) {
  var body = req.body;
  connection.query(updateSql, [body.name, body.age, body.gender, body.email, body.phone, body.id], (err, result) => {
    if (!err) {
      if (result.affectedRows > 0) {
        return res.status(200).json("Updated Customer Info Success!");
      } else {
        return res.status(500).json("Something Went wrong");
      }
    } else {
      return res.status(500).json({ message: err.sqlMessage });
    }
  });
}


function deleteBooking(req, res) {
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
}

module.exports = route;
