const express = require('express');
let ejs = require('ejs');
const connection = require('../connection');
let pdf = require('html-pdf');
let path = require('path');
var fs = require('fs');
var newDate = new Date();
var auth = require('./authentication');
var pathName = function () { var date = newDate.toDateString().split(' '); return date[3] + "/" + date[1] + "/" + date[2] + '-' + date[0]; }
var fileName = newDate.getTime() + "_" + newDate.getMilliseconds() + "_" + newDate.getUTCMilliseconds() + '_booking.pdf';
let pdfPath = 'M:/Git/My Repository/Completed/SK-Travels-Booking/Pdf/' + pathName();
let getPdfPath = 'M:/Git/My Repository/Completed/SK-Travels-Booking/Pdf/';
var nodemailer = require('nodemailer');
var url = require('url');

module.exports = {
  express: express,
  ejs: ejs,
  connection: connection,
  pdf: pdf,
  path: path,
  fs: fs,
  auth: auth,
  fileName: fileName,
  pdfPath: pdfPath,
  nodemailer: nodemailer,
  getPdfPath: getPdfPath
}
