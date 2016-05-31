var mongoose = require('mongoose');
var express = require('express');
var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8080

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./models/user');

//routes
var router = require('./routes/index');
var main = require('./routes/main');

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

//set up express application
app.use(cookieParser());
app.use(bodyParser());

//routes
app.use('/', router);
app.use('/main', main);

//mongoose
mongoose.connect(config.database);
app.set('superSecret', config.secret);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to database');
});

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//socket
io.on('connection', function(socket){
    console.log('user connected');

//save user to database
    socket.on('user register', function(data){
        var registeredUser = new User({
            username: data.username,
            password: data.password,
            admin: true
        });

        registeredUser.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        });
    });

    socket.on('user login', function(data){
        console.log(data);
        User.findOne({
        username: data.username
        }, function(err, user){
            if (err) throw err;
            if(!user) {
               socket.emit('send user error message');
            }
            else if(user) {
                if (user.password != data.password){
                    socket.emit('send password error message');
                } else {
                   socket.emit('user authenticated', data);
                }
            }

        });
    });
});


http.listen(port, function(){
    console.log('listening on 8080');
});

module.exports = app;
