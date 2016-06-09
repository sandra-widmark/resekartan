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
var userCountryInfo = require('./models/userCountryInfo');
var session = require('express-session')

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

//set up express application
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'iloveyou' }));

//mongoose
mongoose.connect(config.database);
app.set('superSecret', config.secret);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to database');
});

//remove data from database
//User.remove({}, function (err) {
//if (err) return handleError(err);
//});

//userCountryInfo.remove({}, function (err) {
//if (err) return handleError(err);
//});

//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//socket
io.on('connection', function(socket){
    console.log('user connected');
    socket.on('save selection data', function(data){
            var countrySelectData = new userCountryInfo({
            username: sess.user,
            country: data,
            showAsSelected: true
        });
            countrySelectData.save(function(err,data){
            console.log('country select saved successfully');
            socket.emit('country select saved', data);
            console.log('this is save select function', data);
            });

        });
});

//routes

var sess;

app.get('/', function(req, res, next) {
    sess = req.session;
    res.render('index');
});

app.post('/signup', function(req,res){
    sess = req.session;
    var registeredUser = new User({
            username: req.body.user.name,
            password: req.body.user.password,
            admin: true
    });
    User.findOne({
        username: req.body.user.name
        }, function(err, user){
            if (err) throw err;
            if(user) {
                io.sockets.emit('user exists');
            }
            else {
                registeredUser.save(function(err){
                    console.log('User saved successfully');
                    res.render('signup',{ user: req.body.user.name});
                });

            }

        });
});

app.post('/authenticate', function(req,res){
    console.log(req.body.user.name);
    User.findOne({
        username: req.body.user.name
        }, function(err, user){
            if (err) throw err;
            if(!user) {
               io.sockets.emit('send user error message');
               console.log('wrong user');
            }
            else if(user) {
                if (user.password != req.body.user.password){
                    io.sockets.emit('send password error message');
                    console.log('wrong password');
                } else {
                    sess = req.session;
                    var token = jwt.sign(user,app.get('superSecret'),{
                    expiresIn: 1440
                    });
                    sess.user = req.body.user.name;
                    res.redirect('/main');
                    console.log('enjoy the token for ' + sess.user + ' ' + token);
                }
            }

    });
});

app.get('/main', function(req, res, next) {
    sess = req.session;
    if(sess.user){
        //kör find-funktion här för att hitta länderna som är sparade i databasen.
        res.render('main',{ user: sess.user});
    }
    else {
        res.redirect('/');
    }
});

app.get('/userCountryData', function(req,res){
    sess = req.session;
    userCountryInfo.findOne({
        username: sess.user
        }, function(err, user){
            if (err) throw err;
            if(user) {
                userCountryInfo.find({}, function(err, userinfo) {
                res.json(userinfo);
                });
            }
            else {
                res.redirect('/');
            }
    });

})

app.get('/users', function(req,res){
    sess = req.session;
    User.findOne({
        username: sess.user
        }, function(err, user){
            if (err) throw err;
            if(user && user.admin == true) {
                User.find({}, function(err, users) {
                res.json(users);
                });
            }
            else {
                res.redirect('/');
            }
    });

});

app.get('/logout',function(req,res){
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
});

http.listen(port, function(){
    console.log('listening on 8080');
});

module.exports = app;
