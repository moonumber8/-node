var mongoose = require('mongoose');
var data_schema = mongoose.Schema({
    password:   {type:String, required: true},
    email:      {type:String, required: true} 
});

var dataModel = mongoose.model('datas', data_schema);
module.exports = dataModel;
