"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import './Order.css'
function Order() {
  const [data, setData] = useState([]);
  const fetchData = async() => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/order/total`);
    const data = response.data.data;
    setData(data);
    console.log(data)
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className="orders-container">
      <h2>All Orders</h2>
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
                <div className="order-amount">
                  ${order.amount.toFixed(2)}
                </div>
                
              </div>

            </div>
            <div className='bottom-order-wrapper'>
              <div className='bottom-order-wrapper'>
              <div className="order-items-count">
                    Items: {order.items.length}
                  </div>
                  <div className="order-status">
                    <span className={`status-dot ${order.status === "Food Processing" ? "processing" : ""}`}></span>
                    {order.status}
                  </div>
              </div>
              <div className="track-order-button">
                <button>Change Status</button>
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