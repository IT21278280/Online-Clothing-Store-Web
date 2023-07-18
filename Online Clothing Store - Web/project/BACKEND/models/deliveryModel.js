const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DeliverySchema = new Schema(
  {
    driverId: { type: String, default: "" },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
      required: false,
    },
    trackingId: {
      type: String,
      default: "",
    },
    processing: {
      type: Boolean,
      default: true,
    },
    shipped: {
      type: Boolean,
      default: false,
    },
    delivered: {
      type: Boolean,
      default: false,
    },
    deliveredDate: {
      type: Date,
    },
    shippedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = Delivery = mongoose.model("deliveries", DeliverySchema);
