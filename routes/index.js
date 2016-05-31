var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/users', function(req,res){
    User.find({}, function(err, users) {
        res.json(users);
    });
});


/*
//route middleware to verify a token
router.use(function(req,res,next){

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token, app.get('superSecret'), function(err, decoded){
            if(err){
                return res.json({ success:false, message: 'Inloggning misslyckades'})
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({ //403 forbidden
            success: false,
            message: 'Ingen token finns'
        });
    }
});
*/


module.exports = router;
