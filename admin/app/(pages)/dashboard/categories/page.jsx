"use client"
import { assets } from "@/app/assets/assets";
import Image from "next/image";
import { useState } from "react";
import './Categories.css'

function Categories() {

  const [image, setImage] = useState();
  
  return ( 
    <div className="add-food-form">
      <h2>Add Categories</h2>
      <form>
        <div className="form-group">
          <label htmlFor="foodname">Categories Name</label>
          <input
            type="text"
            id="categoriesname"
            name="categoriesname"
            placeholder="Enter food name"
            
          />
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
            // onChange={(e) => setImage(e.target.files[0])}
            id="categoryimage"
            name="categoryimage"
            accept="image/*"
            style={{ display: 'none' }}
            
          />
        </div>

        <button type="submit" className="submit-button">Add Categories</button>
      </form>
    </div>
   );
}

export default Categories;