var express = require('express');
var router = express.Router();
var User = require('../models/user');
var session = require('express-session');

router.use(session({ secret: 'iloveyou' }));
var sess;


//start page
router.get('/', function(req, res, next) {
    sess = req.session;
    res.render('index');
});

//user signup
router.get('/user-failure', function(req, res, next) {
    sess = req.session;
    res.render('user-failure', {errormessage: 'Användarnamnet finns redan, försök igen.'});
});

router.post('/signup', function(req,res){
    var callback = function(err,user){
        if(err) throw err;
        if (user){
            console.log('user exists');
            res.redirect('/user-failure');
        } else {
            var user = new User({
                username: req.body.username,
                password: req.body.password,
                admin: true
            });
            user.save(function(err){
                if(err) throw err;
                sess = req.session;
                sess.user = req.body.username;
                res.redirect('/main');
            });
        }
    };
    User.findOne({
        username: req.body.username
    }, callback);
});

//user authentication
router.get('/auth-failure', function(req, res, next) {
    sess = req.session;
    res.render('auth-failure', {errormessage: 'Kombinationen av användarnamn och lösenord finns inte.'});
});

router.post('/authenticate', function(req,res){
    var callback = function(err, user) {
        if(err) throw err;
        if(!user || user.password != req.body.password) {
            console.log('auth failure');
            res.redirect('/auth-failure');
        }
        else {
            sess = req.session;
            sess.user = req.body.username;
            res.redirect('/main');
        }
    };
    var params = {
        username: req.body.username
    }
    User.findOne(params, callback);
});

//main page
router.get('/main', function(req, res, next) {
    sess = req.session;
    if(sess.user){
        res.render('main',{ user: sess.user});
    }
    else {
        //res.redirect('/');
        console.log('user session does not exist');
        res.redirect('/main');
    }
});

//user add country
router.post('/user_add_country', function(req,res){
    sess = req.session;
    User.findOneAndUpdate({ username: 'sandra12' }, { $set: { visited_countries: req.body.two_letter_code } }, { new: true }, function(err, doc) {
        console.log(doc.visited_countries);
        console.log(req.body.two_letter_code);
        res.send(req.body);
    });
});

//logout function
router.get('/logout',function(req,res){
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
});

//show registered users
router.get('/users', function(req,res){
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


module.exports = router;
