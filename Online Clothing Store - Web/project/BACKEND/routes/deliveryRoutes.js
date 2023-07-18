const express = require("express");
const {
  getDeliveries,
  createDelivery,
  addDriver,
  addOrder,
  assignDriver,
  changeStatus,
  getTracking,
  getDrivers,
  deleteDelivery,
  deleteDriver,
  editDriver,
} = require("../controllers/deliveryController");

const router = express.Router();

router.post("/assignDriver", assignDriver);
router.get("/getDeliveries", getDeliveries);
router.route("/addDelivery", createDelivery);
router.post("/addDriver", addDriver);
router.post("/addOrder", addOrder);
router.post("/changeStatus", changeStatus);
router.post("/tracking", getTracking);
router.post("/deleteDelivery", deleteDelivery);
router.get("/getDrivers", getDrivers);
router.post("/deleteDriver", deleteDriver);
router.post("/editDriver", editDriver);

module.exports = router;
