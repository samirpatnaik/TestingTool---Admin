var express = require('express');
var router = express.Router();
var RegisterUser = require('../models/register-user');
var PostedAnswers = require('../models/submitted_answer');
var MultiQuestion = require('../models/multiple-option-questions');
var CodeQuestion = require('../models/code-question');

var async = require("async");
var {ObjectID} = require('mongodb');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET Registered Users List */
router.get('/userslist',isValidUser, (req,res) =>{
  RegisterUser.find().then((resultArray)=>{
      res.send(resultArray);
  },(err)=>{
      res.status(400).send(err);
  });
});

/* GET Registered User List By ID along with test details */
router.get('/userdetails/:id',isValidUser, (req,res) =>{
  var id= req.params.id;
  if(!ObjectID.isValid(id)){
      return res.status(404).send();
  }
  

  var userData = {
    userDetails: {},
    questions: []
    }
    RegisterUser.find({ _id : id}).exec(function (err, user) {
    if(user){
        PostedAnswers.find({user_id: user[0]._id}).exec(function (err, answers) {
                      userData.userDetails = user[0];
            async.each(answers, function (ans, callback) {
             // console.log('ans', ans);
                  MultiQuestion.findById({_id: ans.question_id }).exec(function (err, mQuestion) {
                    CodeQuestion.findById({_id: ans.question_id}).exec(function (err, cQuestion) {
                  //   console.log("cQuestion",cQuestion);
                    // console.log("mQuestion",mQuestion);
                        var q = {};
                        if(mQuestion)q.question = mQuestion;
                        if(cQuestion)q.question = cQuestion;
                        q.postAnswer = ans;
                        userData.questions.push(q);
                        callback();
                    })
                  })
                 },
                 function (err) {
                  if (err) { return res.status(404).send('Not Found'); } else { return res.status(200).json(userData); }
                }
              );
        })
        }else { return res.status(200).json('No user Details Found'); }
  });
});

/* Delete question*/
router.delete('/deleteuser/:id',isValidUser, function(req, res, next) {
  RegisterUser.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Validate the user authentication */
function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized Request'});
}

module.exports = router;
