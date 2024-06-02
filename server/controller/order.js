const orderSchema = require("../models/orderSchema");
const completeOrderSchema = require("../models/completeOrderSchema");

const addOrder = async (req, res) => {
  const { buyerQty, buyerPrice, sellerPrice, sellerQty } = req.body;
  try {
    const newOrder = new orderSchema({
      buyerQty,
      buyerPrice,
      sellerPrice,
      sellerQty,
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateOrder = async (req, res) => {
  const { buyerQty, buyerPrice } = req.body;

  try {
    const matchingOrder = await orderSchema.findOne({
      sellerPrice: buyerPrice,
    });

    if (matchingOrder) {
      const completedOrder = new completeOrderSchema({
        price: buyerPrice,
        qty: Math.min(buyerQty, matchingOrder.sellerQty),
      });

      await completedOrder.save();

      if (buyerQty > matchingOrder.sellerQty) {
        matchingOrder.buyerQty = buyerQty - matchingOrder.sellerQty;
        matchingOrder.sellerQty = 0;
      } else {
        matchingOrder.sellerQty -= buyerQty;
      }

      if (matchingOrder.sellerQty === 0) {
        await matchingOrder.remove();
      } else {
        await matchingOrder.save();
      }

      res.status(200).json(completedOrder);
    } else {
      const newOrder = new orderSchema({
        buyerQty,
        buyerPrice,
        sellerPrice: buyerPrice + 1,
        sellerQty: 0,
      });

      await newOrder.save();
      res.status(201).json(newOrder);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderSchema.find({});
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getCompletedOrders = async (req, res) => {
  try {
    const orders = await completeOrderSchema.find({});
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  addOrder,
  updateOrder,
  getOrders,
  getCompletedOrders,
};
