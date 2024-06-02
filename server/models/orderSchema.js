const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    buyerQty: { type: Number, require: true },
    buyerPrice: { type: Number, require: true },
    sellerPrice: { type: Number, required: true },
    sellerQty: { type: Number, require: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
