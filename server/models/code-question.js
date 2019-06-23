var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    question_title : {type:String, require:true},
    allowtime:{type:Number},
    creation_dt:{type:Date, require:true}
});



module.exports = mongoose.model('CodeQuestion',schema);