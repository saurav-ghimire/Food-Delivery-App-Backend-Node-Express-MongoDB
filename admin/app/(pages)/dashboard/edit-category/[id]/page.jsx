"use client"
import { assets } from "@/app/assets/assets";
import Image from "next/image";
import { useEffect, useState } from "react";
import './editCategory.css';
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditCategory({ params }) {
  const router = useRouter();
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    getCategory();
  }, [params.id]);

  const getCategory = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/category/${params.id}`);
      
      if (!response.data.success) {
        toast.error(response.data.message);
        router.push('/dashboard/allcategories');
      } else {
        setData(response.data.category);
        setImage(response.data.category.image);
      }
    } catch (error) {
      console.error('Error fetching category:', error);
      
      router.push('/dashboard/allcategories');
    }
  };

  const handleTitleChange = (event) => {
    setData({ ...data, title: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Implement the submit logic here
  };

  return (
    <div className="edit-category-form">
      
      <h2>Edit Categories</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoriesname">Categories Name</label>
          <input
            type="text"
            id="categoriesname"
            name="categoriesname"
            placeholder="Enter category name"
            value={data.title || ''}
            onChange={handleTitleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoryimage">Upload Image</label>
          <label className="upload-area" htmlFor="categoryimage">
            <Image
              src={image ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/images/${image}` : assets.upload_area}
              alt="Upload Area"
              width={150}
              height={100}
            />
          </label>
          <input
            type="file"
            id="categoryimage"
            name="categoryimage"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
}

export default EditCategory;
