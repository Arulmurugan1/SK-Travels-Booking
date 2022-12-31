const connection = require('../connection');
const express = require('express');
const route = express.Router();
const auth = require('../services/authentication');
var modules = require('../services/modules');

var bookingSql = "select c.customer_name,b.* from booking b,customer c where b.customer_id = c.customer_id";
var insertCustomerSql = "Insert into customer values(null,?,?,?,?,?,?,?)";
var insertBookingSql = "Insert into booking values(null,?,?,?,?,?,?,?,'WIP',sysdate())";
var deleteCustomerSql = "delete from customer where customer_id =?";
var deleteBookingSql = "delete from booking where customer_id =?";
var updateSql = "Update Booking set customer_name=?,age=?, gender=?, email=?, phone=? where customer_id=?";
var detailSql = "select v.vehicle_no,d.driver_id,d.driver_name,r.fare from vehicle v , driver d , route r where r.start=? and r.end =? and " +
  "v.vehicle_no = d.vehicle_no " +
  "and v.vehicle_no = r.vehicle_no";
let i = 1;
let info = [];

route.get('/', auth.authenticateToken, (req, res) => {
  return getBooking(req, res);
});

route.post('/insert', auth.authenticateToken, (req, res) => {
    return insertBooking(req,res);
});
route.patch(`/update`, auth.authenticateToken, (req, res) => {
  return updateBooking(req, res);
});
route.delete('/delete/:id', auth.authenticateToken, (req, res) => {
  return deleteBooking(req, res);
});

route.post('/details', auth.authenticateToken, (req, res) => {
  connection.query(detailSql, [req.body.start, req.body.end], (err, result) => {
    if (!err) {
      return res.status(200).json({ result: result[0] });
    } else {
      return res.status(500).json({ result: "Something Error Found :: " + err.errno + ":: " + err.sqlMessage });
    }
  });
});

route.get('/getBoarding', auth.authenticateToken, (req, res) => {
  connection.query('select distinct start from route order by start', (err, results) => {
    if (!err) {
      return res.status(200).json({ TotalBoarding: results.length, results: results });
    } else {
      return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
    }
  });
});
route.get('/getDestination/:start', auth.authenticateToken, (req, res) => {
  connection.query("select distinct end from route where start ='"+req.params.start+"' order by end", (err, results) => {
    if (!err) {
      return res.status(200).json({ TotalDestination: results.length, results: results });
    } else {
      return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
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
      return res.status(500).json("Something Error Found :: " + err.errno + ":: " + err.sqlMessage);
    }
  });
}


function insertBooking(req, res) {
  for (var body of req.body) {
    connection.query(insertCustomerSql, [body.name, body.start, body.end, body.age, body.gender, body.email, body.phone], (err, result) => {
      var customer_id = result.insertId;
      var details = [
        body.start, body.end, customer_id, body.vehicle, body.driver, body.fare, body.id
      ];
      connection.query(insertBookingSql, details, (err, result) => {
        if (!result.insertId) {
          return res.status(500).json('Insert Id Generation Issue')
        }
           info[i-1]= {
              start: body.start,
              name: body.name,
              end: body.end,
              vehicle: body.vehicle,
              driver: body.driver,
              driverName: body.driverName,
              fare: body.fare,
              customerId: customer_id,
              bookingNo: result.insertId
            }
        if (i++ == req.body.length) {
          generatePdf(req, res, info);
        }
      });
    });
  }
}

function generatePdf(req, res,result) {
  if (req && result) {
    
    if (modules.fs.existsSync(modules.pdfPath)) {

      res.contentType("application/pdf");
      modules.fs.createReadStream(modules.pdfPath).pipe(res);

    } else {
      modules.ejs.renderFile(modules.path.join(__dirname, '', "report.ejs"), { bookings: result, Time: new Date().toString() }, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json("Render issue ");
        }
        else {
          modules.pdf.create(results).toFile(modules.pdfPath, (err, data) => {
            if (err) {
              return res.status(500).json("File Create Issue");
            }
            else {
              res.contentType("application/pdf").status(200);
              modules.fs.createReadStream(modules.pdfPath).pipe(res);
            }
          });
        }
      });
    }

  } else {
    return res.status(500).json('Pdf Generation Issue')
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
      return res.status(500).json("Some Error Found :: " + err.errno + ":: " + err.sqlMessage);
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
