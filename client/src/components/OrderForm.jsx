import { useState } from "react";
import axios from "axios";

const OrderForm = ({ fetchOrders }) => {
  const [buyerQty, setBuyerQty] = useState("");
  const [buyerPrice, setBuyerPrice] = useState("");
  const [sellerQty, setSellerQty] = useState("");
  const [sellerPrice, setSellerPrice] = useState("");

  const handleBuySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/order/update", {
        buyerQty,
        buyerPrice,
      });
      fetchOrders();
      setBuyerQty("");
      setBuyerPrice("");
    } catch (error) {
      console.error("Error adding buy order", error);
    }
  };

  const handleSellSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/order/sell", {
        sellerQty,
        sellerPrice,
      });
      fetchOrders();
      setSellerQty("");
      setSellerPrice("");
    } catch (error) {
      console.error("Error adding sell order", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleBuySubmit} className="mb-4">
        <h4>Buy Order</h4>
        <div className="mb-3">
          <label htmlFor="buyerQty" className="form-label">
            Buyer Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="buyerQty"
            value={buyerQty}
            onChange={(e) => setBuyerQty(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="buyerPrice" className="form-label">
            Buyer Price
          </label>
          <input
            type="number"
            className="form-control"
            id="buyerPrice"
            value={buyerPrice}
            onChange={(e) => setBuyerPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Buy Order
        </button>
      </form>

      <form onSubmit={handleSellSubmit}>
        <h4>Sell Order</h4>
        <div className="mb-3">
          <label htmlFor="sellerQty" className="form-label">
            Seller Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="sellerQty"
            value={sellerQty}
            onChange={(e) => setSellerQty(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sellerPrice" className="form-label">
            Seller Price
          </label>
          <input
            type="number"
            className="form-control"
            id="sellerPrice"
            value={sellerPrice}
            onChange={(e) => setSellerPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Sell Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
