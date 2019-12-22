var mongoose = require('mongoose');
var data_schema = mongoose.Schema({
    phone_number:   {type:String},
    email:          {type:String, index: true} 
});

var dataModel = mongoose.model('datas', data_schema);
module.exports = dataModel;
