//APP.JS in ~/app.js
const express = require('express');
var mysql = require('mysql');
var connection  = require('./lib/db');
var otherConnection = require('./lib/db');
var async = require('async'), connection;
const multer = require('multer');
var nodemailer = require("nodemailer");
const router = express.Router();
var app = express();
const fs = require('fs');
const aws = require('aws-sdk');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
var createError = require('http-errors');
var randtoken = require('rand-token');
var path = require('path');
require('dotenv').config();

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser')
require("./config/passport")(passport)


//EJS
app.set('view engine','ejs');
//BodyParser
app.use(express.urlencoded({extended : false}));
//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
   }));
   app.use(passport.initialize());
app.use(passport.session());
   //use flash
   app.use(flash());
app.use(expressValidator());
   app.use((req,res,next)=> {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error  = req.flash('error');
   next();
   })
   
//Routes
app.use(bodyParser.json());
app.use('/',require('./routes/route'));
app.use(express.static(path.join(__dirname, "/views")));
app.use(express.static(__dirname + '/public'));

/*--------------------Routing Over----------------------------*/


const { PORT=3000, LOCAL_ADDRESS='0.0.0.0' } = process.env
app.listen(PORT, LOCAL_ADDRESS, () => {
  
});



module.exports = app;
