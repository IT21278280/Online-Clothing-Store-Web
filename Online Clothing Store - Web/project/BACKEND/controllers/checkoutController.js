const checkoutDetail = require('../models/checkoutModel');

exports.checkoutInfo = async(req, res, next)=>{
    const {name, email, contact, city, town, homeNo, postalCode} = req.body;

    const info = await checkoutDetail.create({
        name,
        email, 
        contact,
        city,
        town,
        homeNo,
        postalCode

    })

    res.status(201).json({
        success: true,
        info
    })

}

