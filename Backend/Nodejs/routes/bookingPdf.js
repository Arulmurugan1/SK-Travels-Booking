var modules = require('../services/modules');
var route = modules.express.Router();

const bookingSql = 'select * from booking b,customer c where b.customer_id = c.customer_id ';

route.post('/generateBooking',modules.auth.authenticateToken, (req, res) => {
  modules.connection.query('Select * from booking b,customer c where b.customer_id = c.customer_id ', (err, results) => {
    if (!err) {
      modules.ejs.renderFile(modules.path.join(__dirname, '', "report.ejs"), { bookings: results ,Time:new Date().toString() }, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json("Render issue ");
        }
        else {
          modules.pdf.create(result).toFile(modules.pdfPath, (err, data)=> {
            if (err) {
              return res.status(500).json("File Create Issue");
            }
            else {
              console.log('data ::' +data.filename);
              return res.status(200).json({ message: "Pdf - Generated at :: " + new Date().toString() +" as "+modules.fileName});
            }
          });
        }
      });
    } else {
      return res.status(500).json("query issue " + err);
    }
  });

});

route.post('/getPdf',modules.auth.authenticateToken, (req, res) => {

  if (modules.fs.existsSync(modules.pdfPath)) {

    res.contentType("application/pdf");
    modules.fs.createReadStream(modules.pdfPath).pipe(res);

  } else {
    modules.connection.query(bookingSql, (err, results) => {
      if (!err) {
        modules.ejs.renderFile(modules.path.join(__dirname, '', "report.ejs"), { bookings: results, Time: new Date().toString() }, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json("Render issue ");
          }
          else {
            modules.pdf.create(result).toFile(modules.pdfPath, (err, data) => {
              if (err) {
                return res.status(500).json("File Create Issue");
              }
              else {
                res.contentType("application/pdf");
                modules.fs.createReadStream(modules.pdfPath).pipe(res);
              }
            });
          }
        });
      } else {
        return res.status(500).json("query issue " + err);
      }
    });
  }
});

module.exports = route;
