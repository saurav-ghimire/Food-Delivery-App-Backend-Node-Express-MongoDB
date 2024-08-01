import React from 'react';
import { FaShoppingCart, FaUtensils, FaListAlt, FaUsers } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Welcome to Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <FaShoppingCart className="dashboard-icon" />
            <h2 className="dashboard-card-title">Total Orders</h2>
          </div>
          <p className="dashboard-card-value">150</p>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <FaUtensils className="dashboard-icon" />
            <h2 className="dashboard-card-title">Total Foods</h2>
          </div>
          <p className="dashboard-card-value">50</p>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <FaListAlt className="dashboard-icon" />
            <h2 className="dashboard-card-title">Total Categories</h2>
          </div>
          <p className="dashboard-card-value">10</p>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <FaUsers className="dashboard-icon" />
            <h2 className="dashboard-card-title">Total Users</h2>
          </div>
          <p className="dashboard-card-value">300</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
