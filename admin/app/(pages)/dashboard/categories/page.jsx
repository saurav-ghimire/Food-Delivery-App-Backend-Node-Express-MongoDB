"use client"
import { assets } from "@/app/assets/assets";
import Image from "next/image";
import { useState } from "react";
import './Categories.css';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storeToken } from "@/app/store/tokenSlice";
import { useSelector } from "react-redux";

function Categories() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const token = useSelector(storeToken);
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      // Only need FormData if you are including files
      const formData = {
        title: ''
      };
      formData.title = title;
      if (!title) {
        toast.error('Title is required.');
        return;
      }
      if (!image) {
        toast.error('Image is required.');
        return;
      }
      
      if (image) {
        formData.image = image;
      }
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/category/add`, formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          token:token?.payload?.token
        },
      });
      console.log(response)
      if(response.data.success){
      toast.success('Category added successfully!');
      setTitle('');
      setImage(null);
    }
    } catch (error) {
      console.log(error)
      if (error.response) {
        const finalError = error.response.data.message.split(',');
        finalError.forEach((data) => {
          toast.error(data);
        });
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  return (
    <div className="add-food-form">
      <ToastContainer />
      <h2>Add Categories</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="categoriesname">Categories Name</label>
          <input
            type="text"
            id="categoriesname"
            name="categoriesname"
            placeholder="Enter category name"
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoryimage">Upload Image</label>
          <label className="upload-area" htmlFor="categoryimage">
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
