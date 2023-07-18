const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productschema = new Schema({
  product: {
    type: Object,
    required: true,
  }
});

let productschemaData = mongoose.model('cartProducts', productschema);
module.exports = productschemaData;