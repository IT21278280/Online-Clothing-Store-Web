
const mongoose = require('mongoose');
const validator = require('validator');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
     address: {
        type: String,
        required: true
      },
      product: {
        type: String,
        required: true
      },
      total: {
        type: Number,
        required:true
      },
      contact: {
        type: Number,
        required:true
      },
      status:{
        type:String,
        default:"processing"
        
      }

})



let model = mongoose.model('Order', orderSchema);

module.exports =  model;