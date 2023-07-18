const Order = require('../models/orderAModel');
const { findById } = require('../models/orderAModel');

//create New Order - '/order/new'
exports.newOrder = async(req, res, next)=>{
    const{
        name,
        address,
        product,
        total,
        contact,
    } = req.body;

    const order = await Order.create({

        name,
        address,
        product,
        total,
        contact,
        date:Date.now()
        

    })

    res.status(200).json({
        success: true,
        order
    }) 
}

// get single order
exports.getSingleOder = async(req, res, next)=>{

    const order = await Order.findById(req.params.id).then((order)=>{
        res.json(order)
    })

    
}

// //get logged in user orders - this will coplet when user management is finished totally
// exports.myOrders = async(req, res, next)=>{

//     const order = await Order.find({user: req.user.id})

//     if(!order){
//         return res.status(404).json({
//             success: false,
//             message: "Product not found"
//         });
//     }

//     res.status(200).json({
//         success: true,
//         order
        
//     })
// }

//get all the orders - Admin role pemission
exports.getAllOders = async(req, res, next)=>{

    const orders = await Order.find();

    if(!orders){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    res.json(orders)

}

//Update orders - Admin role pemission
//this controller cannot be made until product implementaiotn is finished
/*exports.updateOrders = async(req, res, next)=> {

    const orders = await Order.findById(req.params.id)

    if(orders.orderStatus == 'Delivered'){
        return res.status(400).json({
            success:false,
            message: "order is already delivered"
        })
    }


    orders.orderItems.forEach( async orderItem =>{

        await updateStock(orderItems.product, orderItem.quantity);

    })

    orders.orderStatus = req.body.orderStatus;
    orders.deliveredAt = Date.now();
    await orders.save();


    res.status(200).json({
        success:true,
    })

}*/

//to reduce the product stock when order is delivered

/*async function updateStock( productId, quatity ){

    const product = await Product.findById(productId)

    product.stock = product.stock - quantity;
    prouduct.save({validaeBeforeSave: false});

}*/

exports.updateOrders = async(req, res, next)=> {

    let order = await Order.findById(req.params.id)

    if(!order){
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }

    order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators: true

    })

    res.status(200).json({
        success:true,
        order
    })

}

//delete orders for admin
exports.deleteOrders = async(req, res, next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return res.status(200).json({
            success:false,
            message:"product not found"
        })
    }

    await order.deleteOne();

    res.status(200).json({
        success:true,
        message:"order deleted"
    })
}