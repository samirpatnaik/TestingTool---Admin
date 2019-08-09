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
  
  RegisterUser.findById(id).exec()
    .then(function(user){
      var data = [];
      return PostedAnswers.find({user_id: user._id}).exec()
        .then(function(postedanswer){
          return [user, postedanswer];
        });
    })
    .then(function(data){
      var project = data[1];
      jsonArray = JSON.parse(JSON.stringify(project));
      jsonArray.forEach(function(element) {
        if(element.qtype == 'multi'){        
          return MultiQuestion.find({_id: element.question_id}).exec()
          .then(function(multiquestion) {
            data.push(multiquestion);
            return data;
          });
        }else if(element.qtype == 'code'){
          return CodeQuestion.find({_id: element.question_id}).exec()
          .then(function(codequestion) {
            data.push(codequestion);
            return data;
          });          
        }
      });
      console.log(data);
      //return data ;
    })
    .then(function(project){
      //console.log(multiquestion);
      /*var user = result[0];
      var project = result[1];
      var issues = result[2];

      res.render('./views/issues/index', {user: user, project: project, issues: issues});*/
     //console.log(project);
    })
    .then(undefined, function(err){
      //Handle error
    })

/* PostedAnswers.aggregate([
    // Join with user_info table
    {
        $lookup:{
            from: "registercandidates",       // other table name
            localField: "user_id",   // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "user_info"         // alias for userinfo table
        }
    },
    {   $unwind:"$user_info" },     // $unwind used for getting data in object or for one record only

    // Join with Multi option table
    {
        $lookup:{
            from: "multipleoptionquestions", 
            localField: "question_id", 
            foreignField: "_id",
            as: "multioption_answer"
        },
        pipeline: [
          { 
            $match:{
              $and:
                [ 
                  { "qtype": { "$eq": 'multi' } }
               ]
            } 
          }
        ]
    },
    {   $unwind:"$multioption_answer" },

    // Join with Java Code table
    {
        $lookup:{
            from: "codequestions", 
            localField: "question_id", 
            foreignField: "_id",
            as: "javacode_answer"
        },
        pipeline: [
          { 
            $match:{
              $and:[{ "qtype": { "$eq": 'code' } }]
            } 
          }
        ]
    },
    {   $unwind:"$javacode_answer" },

    // define some conditions here 
    {
        $match:{
            $and:[{"user_is" : id}]
        }
    },

    // define which fields are you want to fetch
   {   
        $project:{
            email : 1,
            userName : 1,
            userPhone : "$user_info.email",
            
        } 
    }
  ]).exec(function ( e, d ) {
    console.log( d )            
});*/

});

/*,function (error, data) {
  return res.json(data);
  //handle error case also
  }*/

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
