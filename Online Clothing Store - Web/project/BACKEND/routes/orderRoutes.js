const express = require('express');
const { newOrder, getSingleOder, myOrders, getAllOders, updateOrders, deleteOrders } = require('../controllers/orderController');

const router = express.Router();

router.route('/order/new').post(newOrder);
router.route('/order/:id').get(getSingleOder);
router.route('/order/:id').put(updateOrders);

//Admin 
router.route('/Allorder').get(getAllOders);
// router.route('/Updateorder/:id').put(updateOrders);
router.route('/orderDelete/:id').delete(deleteOrders);



module.exports = router;