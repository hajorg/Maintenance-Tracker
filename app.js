var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var firebase = require("firebase");

var routes = require('./routes/index');
var users = require('./routes/users');
var signIn = require('./routes/signin');
var requests = require('./routes/requests');
var admin = require('./routes/admin');
var staff = require('./routes/staff');
var signUp = require('./routes/signup');

var app = express();
var config = {
  apiKey: "AIzaSyDuLky3FGPX784YfkxJe9CRm9Uvtl6Xjk0",
  authDomain: "maintenance-tracker-b8085.firebaseapp.com",
  databaseURL: "https://maintenance-tracker-b8085.firebaseio.com",
  storageBucket: "maintenance-tracker-b8085.appspot.com",
  messagingSenderId: "469397824210"
};
firebase.initializeApp(config);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use("/dashboard",function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.session;
  if (cookie === undefined)
  {
    console.log("no cookie");
    res.redirect("/signin");
    
  } 
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next(); // <-- important!
});

app.get("/signout", function (req, res, next) {
  res.clearCookie("session");
  res.redirect("/signin")
});

app.use('/dashboard', routes);
// app.use('/signout', routes);
app.use('/users', users);
app.use('/signin', signIn);
app.use('/requests', requests);
app.use('/admin', admin);
app.use('/staff', staff);
app.use('/signup', signUp);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
