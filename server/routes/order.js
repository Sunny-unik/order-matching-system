const express = require("express");
const {
  addOrder,
  updateOrder,
  getOrders,
  getCompletedOrders,
} = require("../controller/order");

const router = express.Router();

router.get("/", getOrders);
router.get("/completed", getCompletedOrders);
router.post("/", addOrder);
router.post("/update", updateOrder);

module.exports = router;
