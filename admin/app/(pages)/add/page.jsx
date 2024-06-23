"use client"
import { assets } from '@/app/assets/assets';
import './Add.css';
import Image from 'next/image';
import { useState } from 'react';

function Add() {
  const [image, setImage] = useState(false);
  return (
    <div className="add-food-form">
      <h2>Add Food Item</h2>
      <form>
        <div className="form-group">
          <label htmlFor="food-name">Food Name</label>
          <input type="text" id="food-name" name="food-name" placeholder="Enter food name" required />
        </div>

        <div className="form-group">
          <label htmlFor="food-description">Description</label>
          <textarea id="food-description" name="food-description" placeholder="Enter food description" required></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="food-price">Price</label>
          <input type="number" id="food-price" name="food-price" placeholder="Enter food price" required />
        </div>

        <div className="form-group">
          <label htmlFor="food-category">Category</label>
          <select id="food-category" name="food-category" required>
            <option value="">Select category</option>
            <option value="appetizer">Appetizer</option>
            <option value="main">Main Course</option>
            <option value="dessert">Dessert</option>
            <option value="drink">Drink</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="food-image">Upload Image</label>
          <label className="upload-area" htmlFor="food-image">
            <Image src={ image?URL.createObjectURL(image) : assets.upload_area} alt="Upload Area" width={150} height={100} />
          </label>
          <input type="file" onChange={(e) => {
            setImage(e.target.files[0])
          }} id="food-image" name="food-image" accept="image/*" style={{ display: 'none' }} required />
        </div>

        <button type="submit" className="submit-button">Add Food Item</button>
      </form>
    </div>
  );
}

export default Add;
