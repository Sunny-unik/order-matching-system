import { useEffect, useState } from "react";
import axios from "axios";
import OrderForm from "./components/OrderForm";
import OrderTable from "./components/OrderTable";

const App = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const pendingRes = await axios.get("http://localhost:5000/order/");
      const completedRes = await axios.get(
        "http://localhost:5000/order/completed"
      );
      setPendingOrders(pendingRes.data);
      setCompletedOrders(completedRes.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mt-5 mx-auto">
      <h1>Order Matching System</h1>
      <OrderForm fetchOrders={fetchOrders} />
      <OrderTable
        title="Pending Orders"
        orders={pendingOrders}
        columns={["buyerQty", "buyerPrice", "sellerPrice", "sellerQty"]}
      />
      <OrderTable
        title="Completed Orders"
        orders={completedOrders}
        columns={["price", "qty"]}
      />
    </div>
  );
};

export default App;
