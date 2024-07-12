"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import './Order.css'
function Order() {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [selectedOrder, setSelectedOrder]= useState();
  const [orderId, setOrderId]= useState();
  const fetchData = async() => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/order/total`);
    const data = response.data.data;
    setData(data);
    console.log(data)
  }

  useEffect(() => {
    fetchData();
  },[]);

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
  }

  const updateOrder = async() => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/order/total`);
  }

  return (
    <div className="orders-container">
      <h2>All Orders {`${toggle}`}</h2>
      {
        toggle && (
          <div className="confirmation-wrapper">
            <div className="confirmation-modal">
              <p>Are you sure you want to update?</p>
              <button onClick={updateOrder} >Yes</button>
              <button onClick={() => {setToggle(!toggle)}} >No</button>
            </div>
          </div>
        )
      }
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
                <select name="orderstatus" id="" onChange={(event) => showToggle(event,order._id)}>
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