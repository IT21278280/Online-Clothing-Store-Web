const express = require('express');
const {addProductToCart, getAllCartItems, deleteCartItem } = require('../controllers/cartController');
const router = express.Router();

router.route('/order/cartNew').post(addProductToCart)
router.route('/Allcart').get(getAllCartItems);
router.route('/cartItemDelete/:id').delete(deleteCartItem);


// router.route('/order/:id').put(updateOrders);

//Admin 

// router.route('/Updateorder/:id').put(updateOrders);



module.exports = router;