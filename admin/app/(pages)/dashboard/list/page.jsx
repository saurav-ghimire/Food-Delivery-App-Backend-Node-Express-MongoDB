
"use client"

import Image from 'next/image';
import './List.css'; // Ensure this path is correct for your CSS file
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';

const List = () => {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  const [popup, setPopUp] = useState(false)
  const [id, setId] = useState(null)
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

  const deleteFood = async (id)=> {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/food/${id}`)
      if(response.status === 200){
        toast.success(response.data.message)  
      }
      fetchFoodItems();
      setPopUp(!popup)

    } catch (error) {
      toast.error('Something Wrong')
    }
  }

  const togglePopUp = (id) => {
    setPopUp(!popup)
    setId(id)
  }
  
  return (
    <div className="list-page">
       <h2 className="list-heading">Food Items List</h2>
      <div className="food-grid">
        {foodItems.map((food) => (
          <div className="food-item" key={food._id}>
            <div className="food-image">
              <Image width={200} height={150} src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${food.image}`} alt="Food" />
            </div>
            <div className="food-details">
              <h3>{food.name}</h3>
              <p>{food.description.substring(0, 20)}</p>
              <p><strong>Price:</strong> ${food.price}</p>
              <p><strong>Category:</strong> {food.category}</p>
            </div>
            <div className="food-actions">
              <Link href={`edit/${food._id}`}><button className="edit-button">Edit</button></Link>
              <button className="delete-button" onClick={() => togglePopUp(food._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {
        popup && <div className="popup-wrapper">
        <div className='popUp'>
          Are you sure you want to delete this item ?
          <div className="button-wrapper">
            <button onClick={togglePopUp}>Cancle</button>
            <button onClick={() => deleteFood(id)}>Delete</button>
          </div>
        </div>
        </div>
      }
      
      
    </div>
  );
};

export default List;
