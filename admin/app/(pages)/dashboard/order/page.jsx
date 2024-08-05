"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import './Order.css';
import { toast } from "react-toastify";

function Order() {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [orderId, setOrderId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/order/total`);
      if (response.data.success) {
        setData(response.data.data);
      } else {
        toast.error('Failed to fetch orders.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching orders.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statusOptions = [
    "Food Processing",
    "Out for Delivery",
    "Delivered / Picked Up",
    "Cancelled",
  ];

  const showToggle = (event, id) => {
    setToggle(!toggle);
    setSelectedOrder(event.target.value);
    setOrderId(id);
  };

  const updateOrder = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/order/updateStatus`, { selectedOrder, orderId });
      if (response.data.success) {
        toast.success(response.data.message);
        setToggle(false);
        fetchData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Error updating order.');
    }
  };

  return (
    <div className="orders-container">
      <h2>All Orders {`${toggle}`}</h2>
      {toggle && (
        <div className="confirmation-wrapper">
          <div className="confirmation-modal">
            <p>Are you sure you want to update?</p>
            <button onClick={updateOrder}>Yes</button>
            <button onClick={() => setToggle(false)}>No</button>
          </div>
        </div>
      )}
      {data.length > 0 ? (
        data.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-summary">
              <div className="order-items-summary">
                {order.items.map((item, index) => (
                  <span key={item._id}>
                    {item.name} x {item.quantity}
                    {index < order.items.length - 1 && ', '}
                  </span>
                ))}
              </div>
              <div className="order-details-right">
                <div className="order-amount">${order.amount.toFixed(2)}</div>
              </div>
            </div>
            <div className='bottom-order-wrapper'>
              <div className="order-items-count">Items: {order.items.length}</div>
              <div className="order-status">
                <span className={`status-dot ${order.status === "Food Processing" ? "processing" : ""}`}></span>
                {order.status}
              </div>
              <div className="track-order-button">
                <select
                  name="orderstatus"
                  value={selectedOrder}
                  onChange={(event) => showToggle(event, order._id)}
                >
                  <option value={order.status}>{order.status}</option>
                  {statusOptions
                    .filter(status => status !== order.status)
                    .map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default Order;
