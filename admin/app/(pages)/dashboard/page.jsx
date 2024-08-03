"use client"
import React, { useEffect, useMemo, useState } from 'react';
import { FaShoppingCart, FaUtensils, FaListAlt, FaUsers } from 'react-icons/fa';
import './Dashboard.css';
import axios from 'axios';
import { storeToken } from '@/app/store/tokenSlice';
import { useSelector } from 'react-redux';


const Dashboard = () => {
  const tokenState = useSelector((state) => state.token)
  const token = useMemo(() => tokenState, [tokenState])
  

  const [order, setOrder] = useState();
  const [foods, setFoods] = useState();
  const [category, setCategory] = useState();
  const [user, setUser] = useState();

  const url = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const getTotalOrder = async() => {
    try {
      const response = await axios.get(url+'/api/order/all',{
        headers:{
          token:token
        }
      });
      if(response){
        setOrder(response?.data?.data.length)
      }
      
    } catch (error) {
      console.log('Dashboar Main Page : ' + error)
    }
  }
  const getTotalFoods = async() => {
    try {
      const response = await axios.get(url+'/api/food/foods',{
        headers:{
          token:token
        }
      })
      if(response){
        setFoods(response?.data?.data.length);
      }
    } catch (error) {
      console.log('Dashboar Main Page : ' + error)
    }
  }

  const getAllCategory = async() => {
    try {
      const response = await axios.get(url+'/api/category/all')
      if(response){
        setCategory(response?.data?.allCategory.length)
      }
    } catch (error) {
      console.log('Dashboar Main Page : ' + error)
    }
  }
  const getAllUser = async () => {

    try {
      const response = await axios.get(url+'/api/user/all')
      setUser(response?.data?.users.length)

    } catch (error) {
      console.log('Dashboar Main Page : ' + error)
    }
  }
  useEffect(() => {
    getTotalOrder();
    getTotalFoods();
    getAllCategory();
    getAllUser();
  },[])
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Welcome to Dashboard,{url}</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <FaShoppingCart className="dashboard-icon" />
            <h2 className="dashboard-card-title">Total Orders</h2>
          </div>
          <p className="dashboard-card-value">{order}</p>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <FaUtensils className="dashboard-icon" />
            <h2 className="dashboard-card-title">Total Foods</h2>
          </div>
          <p className="dashboard-card-value">{foods}</p>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <FaListAlt className="dashboard-icon" />
            <h2 className="dashboard-card-title">Total Categories</h2>
          </div>
          <p className="dashboard-card-value">{category}</p>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <FaUsers className="dashboard-icon" />
            <h2 className="dashboard-card-title">Total Users</h2>
          </div>
          <p className="dashboard-card-value">{user}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
