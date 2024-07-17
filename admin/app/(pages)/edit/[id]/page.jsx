"use client"
import { useEffect, useState } from "react";
import './edit.css'
import axios from "axios";
import { useRouter } from "next/navigation";
import { assets } from '@/app/assets/assets';
import Image from "next/image";

function Edit({params}) {
  const url = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const {id} = params;
  const router = useRouter();
  const [rdata, setData] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  const fetchData = async () => {
    const responseData = await axios.get(process.env.NEXT_PUBLIC_BACKEND_API_URL + `/api/food/${id}`);
    console.log(responseData)
    if(!responseData.data.success){
      console.log(';err')
      router.push('/list')
    }
    setData(responseData.data.response);
    setImagePreview(responseData.data.response.image);


  }
  
  

  useEffect(() => {
    
    if (id) {
      fetchData();
    }
  }, [id]);

 
  
  
  

  const onSubmitHandler = async (event) => {}
  const onChangeHandler = async (event) => {}

  return ( 
    <div className="add-food-form">
      <h2>Edit {rdata?.name}</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="foodname">Edit</label>
          <input
            onChange={onChangeHandler}
            value={rdata?.name}
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
            value={rdata?.description}
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
            value={rdata?.price}
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
            value={rdata?.category}
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
            src={url/assets/imagePreview || `/${assets.upload_area}`}
            alt="Upload Area"
            width={150}
            height={100}
          />
          </label>
          {/* <input
            type="file"
            // onChange={(e) => setImage(e.target.files[0])}
            id="foodimage"
            name="foodimage"
            accept="image/*"
            style={{ display: 'none' }}
            
          /> */}
        </div>

        <button type="submit" className="submit-button">Add Food Item</button>
      </form>
    </div>
  );
}

export default Edit;