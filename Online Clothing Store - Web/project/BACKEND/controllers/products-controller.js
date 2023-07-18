const Product = require("../models/Product");

//Load Input validation
const validateProductsInputs = require("../validation/productValidation");

const getAllProducts = async (req, res, next) => {

  Product.find().then((product) => {
    res.json(product)
  }).catch((err) => {
    console.log(err);
  });
};

const getById = async (req, res, next) => {
  let productId = req.params.id;

  const user = await Product.findById(productId).then((product) => {
    res.status(200).send({ status: "Product fetched", product: product });
  }).catch((err) => {
    console.log(err.message);
    res.status(500).send({ status: "Error with get product", error: err.message });
  })
};

const getProductById = async (req, res, next) => {
  let productId = req.params.id;

  Product.findById(productId).then((product) => {

    res.json(product)

  }).catch((err) => {

    console.log("Cannot get user");

  });
};

const addProduct = async (req, res, next) => {
  const { name, description, price, category, image, image1, image2, image3, } = req.body;
  
//Form Validation
const {errors, isValid} = validateProductsInputs(req.body);

//Check Validation
if(!isValid){
  return res.status(400).send(errors);
}

  let product;
  try {
    product = new Product({
      name,
      description,
      price,
      category,
      image,
      image1,
      image2,
      image3,
    });
    await product.save();
  } catch (err) {
    console.log(err);
  }

  if (!product) {
   return res.status(400)
  }
  return res.status(201).json({ product, message: "Product added successfully" });
};

const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  const { name, description, price, category, image, image1, image2, image3 } = req.body;
  
  let product;
  try {
    product = await Product.findByIdAndUpdate(id, {
      name,
      description,
      price,
      category,
      image,
      image1,
      image2,
      image3,
    });
    product = await product.save();
  } catch (err) {
    console.log(err);
  }
  if (!product) {
    return res.status(404).json({ message: "Unable To Update By this ID" });

  }
  return res.status(200).json({ message: "Product updated successfully" });

};

const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  let product;
  try {
    product = await Product.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!product) {
    return res.status(404).json({ message: "Unable To Delete By this ID" });
  }
  return res.status(200).json({ message: "Product Successfully Deleted" });
};

exports.getAllProducts = getAllProducts;
exports.addProduct = addProduct;
exports.getById = getById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getProductById = getProductById;