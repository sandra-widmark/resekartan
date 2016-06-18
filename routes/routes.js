var express = require('express');
var router = express.Router();
var User = require('../models/user');
var session = require('express-session');
var bodyParser = require('body-parser');

router.use(session({ secret: 'iloveyou', resave: true, }));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var sess;

//User.remove({}, function(err) {
 //  console.log('collection removed')
//});

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
        //get user countries
        router.post('/get_user_countries', function(req, res, next) {
            sess = req.session;
            console.log(sess.user);
            User.find({
            username: sess.user
            }, function(err, user) {
            if (err) throw err;
            var countriesArray = user[0].visited_countries;
            console.log('this is the login country finder',user[0].visited_countries);
            res.send(countriesArray);
            });
        });
    }
    else {
        console.log('user session does not exist');
        res.redirect('/');
    }
});


//user add country
router.post('/user_add_country', function(req,res){
    sess = req.session;
    console.log(sess.user);
    User.update({username: sess.user },{$addToSet:
        {visited_countries:[req.body.two_letter_code]}},
        {upsert:true},
        function(err){
            if(err){
                console.log(err);
            } else {
                console.log("Successfully added");

                User.find({
                    username: sess.user
                }, function(err, user) {
                if (err) throw err;
                var countriesArray = user[0].visited_countries;
                console.log(user[0].visited_countries);
                res.send(countriesArray);
                });

            }
    });
});

//user remove country
router.post('/user_remove_country', function(req,res){
    sess = req.session;
    console.log(sess.user);
    User.update({username: sess.user},{$pull:
        {visited_countries:[req.body.two_letter_code]}},
        {upsert:true},
        function(err){
            if(err){
                console.log(err);
            } else {
                console.log("Successfully removed");
                User.find({
                    username: sess.user
                }, function(err, user) {
                if (err) throw err;
                var countriesArray = user[0].visited_countries;
                console.log(user[0].visited_countries);
                res.send(countriesArray);
                });
            }
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
