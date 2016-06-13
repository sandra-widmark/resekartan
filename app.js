var mongoose = require('mongoose');
var express = require('express');
var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var port = process.env.PORT || 8080
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');

//mongoose models
var User = require('./models/user');
var Country = require('./models/country');

//routes
var routes = require('./routes/routes');

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

//set up express application
app.use(cookieParser());
app.use(bodyParser());

//use routes
app.use('/', routes);

//mongoose connection
mongoose.connect(config.database);
app.set('superSecret', config.secret);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to database');
});

//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

http.listen(port, function(){
    console.log('listening on 8080');
});

module.exports = app;
