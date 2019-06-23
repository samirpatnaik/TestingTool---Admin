var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var async = require("async");
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* REGISTER New User */
router.post('/register', function (req, res, next) {
  addToDB(req, res);
});

/* Function to SAVE New user */
async function addToDB(req, res) {

  var user = new User({
    email: req.body.email,
    name: req.body.name,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  });

  try {
    doc = await user.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}

/* LOGIN User */
router.post('/login',function(req,res,next){
  
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    //if (!user) { return res.status(501).json(info); }
    if (!user) { return res.json('failed'); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json(user);
    });
  })(req, res, next);
});

/* GET Dashboard */
router.get('/dashboard',isValidUser,function(req,res,next){
  return res.status(200).json(req.user);
});

/* GET Changepassword */
router.get('/changepassword',isValidUser,function(req,res,next){
  return res.status(200).json(req.user);
});

/* LOGOUT User */
router.get('/logout',isValidUser, function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logout Success'});
})

/* RESET Password according to the NEW Password */
router.post('/updatepassword', function(req, res) {
  async.waterfall([
    function(done) {
      
      User.findOne({ username: req.body.uname}, function(err, user) {
        if (!user) {
          return res.json('userfailed');
       }
       if (!user.isValid(req.body.oldPassword)) {
          return res.json('passwordfailed');
        }
        
        user.password = User.hashPassword(req.body.newPassword);

        user.save(function(err) {
          req.logIn(user, function(err) {
            if(user) return res.json('passed');
            done(err, user);
          });
        });
      });
    }
  ], function(err) {
    return res.status(501).json(err);
  });
});

function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized Request'});
}

module.exports = router;
