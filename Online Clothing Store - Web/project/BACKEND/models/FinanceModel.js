const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
    
     amount:{
      type:String,
      required:true
     },
     category:{
      type:String,
      required:false
     },
     type:{
        type:String,
        required:false
     },
     date:{
        type:String,
        required:false
     },
     reference:{
        type:String,
        required:false
     },
     description:{
        type:String,
        required:false
     },
    });
    

module.exports = mongoose.model('Finance',financeSchema);