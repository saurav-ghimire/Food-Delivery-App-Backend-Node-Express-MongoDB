"use client";
import { useEffect, useState } from "react";
import './edit.css';
import axios from "axios";
import { useRouter } from "next/navigation";
import { assets } from '@/app/assets/assets';
import Image from "next/image";
import { toast } from 'react-toastify';
import { storeToken } from "@/app/store/tokenSlice"; 
import { useSelector } from "react-redux";

function Edit({ params }) {
  const url = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const token = useSelector(storeToken);
  const { id } = params;
  const router = useRouter();
  const [rdata, setData] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchData = async () => {
    try {
      const responseData = await axios.get(`${url}/api/food/${id}`, {
        headers: {
          token: token?.payload?.token
        }
      });
      if (!responseData.data.success) {
        router.push("/dashboard/list");
      }
      setData(responseData.data.response);
      setImagePreview(`${url}/images/${responseData.data.response.image}`);
    } catch (error) {
      console.error('Error fetching data:', error);
      router.push("/dashboard/list");
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const onImageChangeHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Update imagePreview with the new image URL
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Create form data
    const formData = new FormData();
    formData.append('name', rdata.name);
    formData.append('description', rdata.description);
    formData.append('price', rdata.price);
    formData.append('category', rdata.category);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.put(`${url}/api/food/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: token?.payload?.token
        },
      });

      if (response.data.success) {
        toast.success('Food item updated successfully!');
        router.push("/dashboard/list");
      } else {
        response.data.errors.forEach(error => toast.error(error));
      }
    } catch (error) {
      console.error('There was an error!', error);
      if (error.response && error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach(err => toast.error(err));
      } else {
        toast.error('Failed to update food item. Please try again.');
      }
    }
  };

  return (
    <div className="add-food-form">
      <h2>Edit {rdata?.name}</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="foodname">Edit</label>
          <input
            onChange={onChangeHandler}
            value={rdata?.name || ''}
            type="text"
            id="foodname"
            name="name"
            placeholder="Enter food name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fooddescription">Description</label>
          <textarea
            onChange={onChangeHandler}
            value={rdata?.description || ''}
            id="fooddescription"
            name="description"
            placeholder="Enter food description"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="foodprice">Price</label>
          <input
            type="number"
            onChange={onChangeHandler}
            value={rdata?.price || ''}
            id="foodprice"
            name="price"
            placeholder="Enter food price"
          />
        </div>

        <div className="form-group">
          <label htmlFor="foodcategory">Category</label>
          <select
            id="foodcategory"
            name="category"
            onChange={onChangeHandler}
            value={rdata?.category || ''}
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
              src={imagePreview || assets.upload_area}
              alt="Upload Area"
              width={150}
              height={100}
            />
          </label>
          <input
            type="file"
            onChange={onImageChangeHandler}
            id="foodimage"
            name="foodimage"
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>

        <button type="submit" className="submit-button">Update Food Item</button>
      </form>
    </div>
  );
}

export default Edit;
