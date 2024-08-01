"use client";
import { assets } from '@/app/assets/assets';
import './Add.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {toast } from 'react-toastify';
import { storeToken } from '@/app/store/tokenSlice';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
function Add() {
  const url = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const token = useSelector(storeToken);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState([]);
  const [data, setData] = useState({
    foodname: '',
    fooddescription: '',
    foodprice: '',
    foodcategory: '',
  });

  const fectchCategory = async() => {
    const response = await axios.get(`${url}/api/category/all`)
    console.log(response)
    setCategory(response?.data?.allCategory);
  }
  useEffect(() => {
    fectchCategory();
    
  },[])

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
      // Check if any required field is empty
      const requiredFields = ['foodname', 'fooddescription', 'foodprice', 'foodcategory'];
      const emptyFields = requiredFields.filter(field => !data[field]);
  
      if (emptyFields.length > 0) {
        emptyFields.forEach(field => toast.error(`${field.replace('food', '')} is required.`));
        return;
      }
      console.log(image)
       // Check if image is empty
    if (!image) {
      toast.error('Image is required.');
      return;
    }

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
          token:token?.payload?.token
        },
      });
      console.log('response:',  response)
      if (response.data.success) {
        setData({
          foodname: '',
          fooddescription: '',
          foodprice: '',
          foodcategory: '',
        });
        setImage(null);
        toast.success('Food item added successfully!');
        fectchCategory();
        
      } else {
        toast.error('Error adding food item');
      }
    } catch (error) {
      console.error('There was an error!', error);
      alert('Failed to add food item. Please try again.');
    }
  };
  console.log(category)
  console.log(typeof category)
  
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
            
          />
        </div>

        <div className="form-group">
          <label htmlFor="foodcategory">Category</label>
          <select
            id="foodcategory"
            name="foodcategory"
            
            onChange={onChangeHandler}
            value={data.foodcategory}
          >
            <option value="">Select category</option>
            { category.map((data)=>(
                <option value={data._id}>{data.title}</option>
            ))}
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
            
          />
        </div>

        <button type="submit" className="submit-button">Add Food Item</button>
      </form>
    </div>
  );
}

export default Add;
