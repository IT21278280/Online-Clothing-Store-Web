const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DriverSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = Driver = mongoose.model("drivers", DriverSchema);
