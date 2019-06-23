var express = require('express');
var router = express.Router();
var MultiQuestion = require('../models/multiple-option-questions');
var async = require("async");
var {ObjectID} = require('mongodb');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* ADD New Question */
router.post('/addnewmultiquestion', function (req, res, next) {
  addToDB(req, res);
});

/* Function to SAVE New user */
async function addToDB(req, res) {

  var newquestion = new MultiQuestion({
    question_title : req.body.question_title,
    answer1:req.body.ans1,
    answer2:req.body.ans2,
    answer3:req.body.ans3,
    answer4:req.body.ans4,
    answer5:req.body.ans5,
    correctanswer:req.body.correctanswer,
    allowtime:req.body.allowtime,
    creation_dt: Date.now()
  });

  try {
    doc = await newquestion.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}

/* GET Multiple Option Question List */
router.get('/dashboard',isValidUser, (req,res) =>{
  MultiQuestion.find().then((resultArray)=>{
      res.send(resultArray);
  },(err)=>{
      res.status(400).send(err);
  });
});

/* GET Multiple Option Question List By ID */
router.get('/editmultiquestion/:id',isValidUser, (req,res) =>{
  var id= req.params.id;
  if(!ObjectID.isValid(id)){
      return res.status(404).send();
  }

  MultiQuestion.findById(id).then((resultArray)=>{
      if(!resultArray){
        return res.status(404).send();
      }
      res.send(resultArray);
  },(err)=>{
      res.status(400).send(err);
  });
});

/* Update existing question */
router.post('/updatemultiquestion',isValidUser, function(req, res) {
    MultiQuestion.findOneAndUpdate({_id:req.body.rid}, req.body, function (err, place) {
        res.send(place);
    });
});

/* Delete question*/
router.delete('/deletemultiquestion/:id',isValidUser, function(req, res, next) {
  MultiQuestion.findByIdAndRemove(req.params.id, req.body, function (err, post) {
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
