const DeliveryModel = require("../models/deliveryModel");
const Driver = require("../models/driverModels");
//const Order = require("../models/orderModel");
const _ = require("lodash");
const crypto = require("crypto");
const util = require("util");

const randomBytes = util.promisify(crypto.randomBytes);

exports.getDeliveries = async (req, res, next) => {
  try {
    const deliveries = await DeliveryModel.find()
      .populate({
        path: "orderId",
        select: "name _id price",
      })
      .sort({ updatedAt: -1 });
    let deliveryList = [];
    deliveries.map((delivery) => {
      let data = {
        deliveryId: delivery._id,
        driverId: delivery.driverId,
        trackingId: delivery.trackingId,
        status: delivery.shipped
          ? "Shipped"
          : delivery.delivered
          ? "Delivered"
          : "Proccessing",
        orderName: delivery.orderId.name,
      };
      deliveryList.push(data);
    });
    res.status(200).json({
      success: true,
      message: "list fetched successfully",
      data: deliveryList,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: true,
    //   message: error,
    // });
    console.log(error);
  }
};

// exports.createDelivery = async (req, res, next) => {
//   const data = req.body;

//   const newDelivery = new DeliveryModel({
//     name: data.name,
//     price: data.price,
//   });

//   const savedOrder = await newOrder.save();

//   res.status(201).json({
//     success: true,
//     data: savedOrder,
//   });
//   res.status(201).json({
//     success: true,
//   });
// };

exports.addDriver = async (req, res, next) => {
  try {
    const data = req.body;

    const newDriver = new Driver({
      name: data.name,
      email: data.email,
      phoneNumber: data.phone,
    });

    const savedDriver = await newDriver.save();

    res.status(201).json({
      success: true,
    });
  } catch (error) {}
};

exports.addOrder = async (req, res, next) => {
  try {
    const data = req.body;

    const newOrder = new Order({
      name: data.name,
      price: data.price,
    });

    const savedOrder = await newOrder.save();

    const rawBytes = await randomBytes(12);
    const trackingId = rawBytes.toString("hex");

    const newDelivery = new DeliveryModel({
      orderId: savedOrder._id,
      trackingId: trackingId,
    });

    const savedDelivery = await newDelivery.save();

    res.status(201).json({
      success: true,
      data: { order: savedOrder, delivery: savedDelivery },
    });
  } catch (error) {}
};

exports.assignDriver = async (req, res, next) => {
  try {
    const data = req.body;
    const delivery = await DeliveryModel.find({ _id: data.deliveryId });

    if (_.isEmpty(delivery)) {
      return res.status(202).json({
        success: false,
        message: "Delivery does not exists",
      });
    }

    const driver = await Driver.find({ _id: data.driverId });

    if (_.isEmpty(driver)) {
      return res.status(202).json({
        success: false,
        message: "Driver does not exists",
      });
    }

    const updatedDelivery = await DeliveryModel.findByIdAndUpdate(
      data.deliveryId,
      { driverId: data.driverName }
    );

    if (!_.isEmpty(updatedDelivery)) {
      return res.status(200).json({
        success: true,
        data: updatedDelivery,
      });
    }

    res.status(202).json({
      success: false,
      message: "Driver did not assigned",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.changeStatus = async (req, res, next) => {
  try {
    const data = req.body;
    const delivery = await DeliveryModel.find({ _id: data.deliveryId });

    if (_.isEmpty(delivery)) {
      return res.status(202).json({
        success: false,
        message: "Delivery does not exists",
      });
    }

    let updateData = {
      processing: data.status.processing ? true : false,
      shipped: data.status.shipped ? true : false,
      delivered: data.status.delivered ? true : false,
      shippedDate: data.status.shipped ? new Date() : null,
      deliveredDate: data.status.delivered ? new Date() : null,
    };

    const updatedDelivery = await DeliveryModel.findByIdAndUpdate(
      data.deliveryId,
      updateData
    );

    if (!_.isEmpty(updatedDelivery)) {
      return res.status(200).json({
        success: true,
        data: updatedDelivery,
      });
    }

    res.status(202).json({
      success: false,
      message: "status not updated",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getTracking = async (req, res, next) => {
  try {
    const data = req.body;
    const delivery = await DeliveryModel.find({
      trackingId: data.trackingId,
    })
      .populate({
        path: "orderId",
        select: "name _id price",
      })
      .select({
        __v: 0,
      });

    if (_.isEmpty(delivery)) {
      return res.status(202).json({
        success: false,
        message: "Tracking Id does not exists",
      });
    }

    res.status(201).json({
      success: true,
      data: delivery[0],
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteDelivery = async (req, res, next) => {
  try {
    const data = req.body;
    const delivery = await DeliveryModel.find({ _id: data.deliveryId });

    if (_.isEmpty(delivery)) {
      return res.status(202).json({
        success: false,
        message: "Delivery does not exists",
      });
    }

    let updateData = {
      isDeleted: true,
    };

    const updatedDelivery = await DeliveryModel.deleteOne({
      _id: data.deliveryId,
    });

    if (!_.isEmpty(updatedDelivery)) {
      return res.status(200).json({
        success: true,
        data: updatedDelivery,
      });
    }

    res.status(202).json({
      success: false,
      message: "delivery is not deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteDriver = async (req, res, next) => {
  try {
    const data = req.body;
    const delivery = await Driver.find({ _id: data.driverId });

    if (_.isEmpty(delivery)) {
      return res.status(202).json({
        success: false,
        message: "Driver does not exists",
      });
    }

    const updatedDriver = await Driver.deleteOne({
      _id: data.driverId,
    });

    if (!_.isEmpty(updatedDriver)) {
      return res.status(200).json({
        success: true,
        data: updatedDriver,
      });
    }

    res.status(202).json({
      success: false,
      message: "Driver is not deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getDrivers = async (req, res, next) => {
  try {
    const drivers = await Driver.find().sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      message: "list fetched successfully",
      data: drivers,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editDriver = async (req, res, next) => {
  try {
    const data = req.body;

    const driver = await Driver.find({ _id: data.driverId });

    if (_.isEmpty(driver)) {
      return res.status(202).json({
        success: false,
        message: "Driver does not exists",
      });
    }

    const updatedDriver = await Driver.findByIdAndUpdate(data.driverId, {
      name: data.name,
      email: data.email,
      phoneNumber: data.phone,
    });

    if (!_.isEmpty(updatedDriver)) {
      return res.status(200).json({
        success: true,
        data: updatedDriver,
      });
    }

    res.status(202).json({
      success: false,
      message: "Driver did not updated",
    });
  } catch (error) {
    console.log(error);
  }
};
