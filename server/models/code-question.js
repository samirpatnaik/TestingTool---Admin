var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    question_title : {type:String, require:true},
    allowtime:{type:Number},
    qtype : {type : String, default : 'code'},
    inputItems :[{  param1:{type:String, default : ''},
                    param2:{type:String, default : ''},
                    param3:{type:String, default : ''},
                    param4:{type:String, default : ''},
                    param5:{type:String, default : ''},
                    result:{type:String, default : ''}
                }],
    creation_dt:{type:Date, require:true}
});



module.exports = mongoose.model('CodeQuestion',schema);