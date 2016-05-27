var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var mongoose = require('mongoose');

var router = require('./routes/index');
var map = require('./routes/map');

//view engine setup
app.set('port', process.env.PORT || 8080);
var server = app.listen(app.get('port'), function() {
  console.log('server listening on port 8080');
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', router);
app.use('/map', map);

module.exports = app;
