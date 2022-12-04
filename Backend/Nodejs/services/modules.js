const express     = require('express');
let   ejs         = require('ejs');
const connection  = require('../connection');
let   pdf         = require('html-pdf');
let   path        = require('path');
var   fs          = require('fs');
var   auth        = require('./authentication');
var date          = new Date();
var pathName      = date.getMonth()+1 +'/'+date.getDate()+'/';
var fileName      =  date.getTime()+ '_booking.pdf';
const pdfPath     = './Pdf/' + pathName+fileName;
var nodemailer    = require('nodemailer');

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
  nodemailer:nodemailer
}
