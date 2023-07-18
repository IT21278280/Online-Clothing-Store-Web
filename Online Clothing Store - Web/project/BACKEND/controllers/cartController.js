

const productschemaData = require("../models/cartModel");

// POST a new cart item
exports.addProductToCart = async (req, res) => {
  try {
    const { product } = req.body;

    // check if the product is already in the cart
    const existingProduct = await productschemaData.findOne({ "product._id": product._id });

    if (existingProduct) {
      return res.status(400).json({ msg: 'Product already in the cart' });
    }

    // create a new cart item
    const newCartItem = new productschemaData({
      product: product
    });

    // save the new cart item to the database
    await newCartItem.save();

    res.status(200).json({ msg: 'Product added to the cart' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};




// GET all cart items
exports.getAllCartItems = async (req, res) => {
  try {
  const cartItems = await productschemaData.find();
  res.status(200).json(cartItems);
  } catch (err) {
  console.error(err.message);
  res.status(500).send('Server Error');
  }
  };




// DELETE a cart item
exports.deleteCartItem = async (req, res) => {
  try {
  const { id } = req.params;
  const deletedCartItem = await productschemaData.findByIdAndDelete(id);

  if (!deletedCartItem) {
    return res.status(404).json({ msg: 'Cart item not found' });
  }
  
  res.status(200).json({ msg: 'Cart item deleted successfully' });
  } catch (err) {
console.error(err.message);
res.status(500).send('Server Error');
}
};



// UPDATE a cart item
exports.updateCartItem = async (req, res) => {
    try {
    const { id } = req.params;
    const { product } = req.body;

    const updatedCartItem = await productschemaData.findByIdAndUpdate(id, {
      product: product
    }, { new: true });
    
    if (!updatedCartItem) {
      return res.status(404).json({ msg: 'Cart item not found' });
    }
    
      res.status(200).json(updatedCartItem);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };  


























































// const cartProducts = require('../models/cartModel')


// exports.getProducts = async (req, res, next)=>{
//     const cartproduct = await cartProducts.find();
//     res.status(200).json({
//         success: true,
//         count:cartproduct.length,
//         cartproduct
//     })
// }

// exports.newProduct = async (req, res, next)=>{

//     const cartproduct = await cartProducts.create(req.body);
//     res.status(201).json({
//         success:true,
//         cartproduct
//     })

// }
// //get single product controller
// exports.getSingleProduct = async(req, res, next)=>{
//     const cartproduct = await cartProducts.findById(req.params.id)

//     if(!cartproduct){
//         return res.status(404).json({
//             success: false,
//             message: "Product not found"
//         });
//     }

//     res.status(200).json({
//         success:true,
//         cartproduct
//     })
// }

// exports.UpdateProduct = async(req, res, next)=>{
//     let cartproduct = await cartProducts.findById(req.params.id);

//     if(!cartproduct){
//         return res.status(404).json({
//             success: false,
//             message: "Product not found"
//         });
//     }

//     cartproduct = await cartProducts.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators:true
//     });

//     res.status(200).json({
//         success:true,
//         cartproduct
//     })

// }

// //delete a product
// exports.deleteProduct = async(req, res, next)=>{
//     const cartproduct = await cartProducts.findById(req.params.id);

//     if(!cartproduct){
//         res.status(404).json({
//             success:false,
//             message:"Product Not Found"
//         });
//     }

//     await cartproduct.deleteOne();

//     res.status(200).json({
//         success: true,
//         message: "product deleted"
//     })

// }