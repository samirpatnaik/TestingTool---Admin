var express = require('express');
var router = express.Router();
var CodeQuestion = require('../models/code-question');
var async = require("async");
var {ObjectID} = require('mongodb');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* ADD New Question */
router.post('/addnewcodequestion', function (req, res, next) {
  addToDB(req, res);
});

/* Function to SAVE New user */
async function addToDB(req, res) {

  var newquestion = new CodeQuestion({
    question_title : req.body.question_title,
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
  CodeQuestion.find().then((resultArray)=>{
      res.send(resultArray);
  },(err)=>{
      res.status(400).send(err);
  });
});

/* GET Multiple Option Question List By ID */
router.get('/editcodequestion/:id',isValidUser, (req,res) =>{
  var id= req.params.id;
  if(!ObjectID.isValid(id)){
      return res.status(404).send();
  }

  CodeQuestion.findById(id).then((resultArray)=>{
      if(!resultArray){
        return res.status(404).send();
      }
      res.send(resultArray);
  },(err)=>{
      res.status(400).send(err);
  });
});

/* Update existing question */
router.post('/updatecodequestion',isValidUser, function(req, res) {
  CodeQuestion.findOneAndUpdate({_id:req.body.rid}, req.body, function (err, place) {
        res.send(place);
    });
});

/* Delete question*/
router.delete('/deletecodequestion/:id',isValidUser, function(req, res, next) {
  CodeQuestion.findByIdAndRemove(req.params.id, req.body, function (err, post) {
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
