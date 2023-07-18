const mongoose = require('mongoose') ;

const Schema = mongoose.Schema ;

const paymentSchema = new Schema({
    
    // form feilds
    
    paymentMethod : {
        type: String,
        required: true
    },
    cardNumber : {
        type: Number,
        required: true
    },
    cvv: {
        type: Number,
        required: true
    },  
    expDate: {
        type: Date,
        required: true
    }
    

},{timestamps: true});

const PayCustomer = mongoose.model("PayCustomer",paymentSchema) ;

module.exports = PayCustomer ;