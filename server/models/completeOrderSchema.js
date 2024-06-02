const mongoose = require("mongoose");

const completedOrderSchema = new mongoose.Schema(
  {
    price: { type: Number, require: true },
    qty: { type: Number, require: true },
  },
  { timestamps: true }
);

const CompletedOrder = mongoose.model("CompletedOrder", completedOrderSchema);

module.exports = CompletedOrder;
