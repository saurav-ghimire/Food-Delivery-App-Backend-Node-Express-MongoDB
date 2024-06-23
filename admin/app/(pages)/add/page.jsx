"use client";
import { assets } from '@/app/assets/assets';
import './Add.css';
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import {toast } from 'react-toastify';

function Add() {


  const url = "http://localhost:4000";
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    foodname: '',
    fooddescription: '',
    foodprice: '',
    foodcategory: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', data.foodname);
    formData.append('description', data.fooddescription);
    formData.append('price', data.foodprice);
    formData.append('category', data.foodcategory);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        setData({
          foodname: '',
          fooddescription: '',
          foodprice: '',
          foodcategory: '',
        });
        setImage(null);
        toast.success('Food item added successfully!');

        
      } else {
        toast.error('Error adding food item');
      }
    } catch (error) {
      console.error('There was an error!', error);
      alert('Failed to add food item. Please try again.');
    }
  };

  return (
    <div className="add-food-form">
      <h2>Add Food Item</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="foodname">Food Name</label>
          <input
            onChange={onChangeHandler}
            value={data.foodname}
            type="text"
            id="foodname"
            name="foodname"
            placeholder="Enter food name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fooddescription">Description</label>
          <textarea
            onChange={onChangeHandler}
            value={data.fooddescription}
            id="fooddescription"
            name="fooddescription"
            placeholder="Enter food description"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="foodprice">Price</label>
          <input
            type="number"
            onChange={onChangeHandler}
            value={data.foodprice}
            id="foodprice"
            name="foodprice"
            placeholder="Enter food price"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="foodcategory">Category</label>
          <select
            id="foodcategory"
            name="foodcategory"
            required
            onChange={onChangeHandler}
            value={data.foodcategory}
          >
            <option value="">Select category</option>
            <option value="appetizer">Appetizer</option>
            <option value="main">Main Course</option>
            <option value="dessert">Dessert</option>
            <option value="drink">Drink</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="foodimage">Upload Image</label>
          <label className="upload-area" htmlFor="foodimage">
            <Image
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Area"
              width={150}
              height={100}
            />
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            id="foodimage"
            name="foodimage"
            accept="image/*"
            style={{ display: 'none' }}
            required
          />
        </div>

        <button type="submit" className="submit-button">Add Food Item</button>
      </form>
    </div>
  );
}

export default Add;
