
"use client"

import Image from 'next/image';
import { assets } from '@/app/assets/assets'; // Adjust this import based on your project structure
import './List.css'; // Ensure this path is correct for your CSS file
import axios from 'axios';
import { useEffect, useState } from 'react';

const List = () => {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    fetchFoodItems();
    
  }, []);

  // Function to fetch food items from the backend API
  const fetchFoodItems = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/food/foods`);
      
      setFoodItems(response.data.data);
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };
  
  return (
    <div className="list-page">
       <h2 className="list-heading">Food Items List</h2>
      <div className="food-grid">
        {foodItems.map((food) => (
          <div className="food-item" key={food._id}>
            <div className="food-image">
              <img src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${food.image}`} alt="Food" />
            </div>
            <div className="food-details">
              <h3>{food.name}</h3>
              <p>{food.description.substring(0, 20)}</p>
              <p><strong>Price:</strong> ${food.price}</p>
              <p><strong>Category:</strong> {food.category}</p>
            </div>
            <div className="food-actions">
              <button className="edit-button">Edit</button>
              <button className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
      
      
    </div>
  );
};

export default List;
