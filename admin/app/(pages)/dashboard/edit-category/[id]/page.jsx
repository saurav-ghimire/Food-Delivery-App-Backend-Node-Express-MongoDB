"use client";
import { assets } from "@/app/assets/assets";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./editCategory.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storeToken } from "@/app/store/tokenSlice";
import { useSelector } from "react-redux";

function EditCategory({ params }) {
  const router = useRouter();
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const token = useSelector(storeToken)

  useEffect(() => {
    getCategory();
    
  }, [params.id]);

  const getCategory = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/category/${params.id}`, {
        headers:{
          token:token?.payload?.token
        }
      });
      
      if (!response.data.success) {
        toast.error(response.data.message);
        router.push("/dashboard/allcategories");
      } else {
        setData(response.data.category);
        setImage(response.data.category.image);
        setPreview(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/images/${response.data.category.image}`);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
      router.push("/dashboard/allcategories");
    }
  };

  const handleTitleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Create form data
    const formData = new FormData();
    formData.append("title", data.title);

    if (image && typeof image !== 'string') {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/category/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token:token?.payload?.token
        },
      });

      if (response.data.success) {
        toast.success("Category item updated successfully!");
        router.push("/dashboard/allcategories");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("There was an error!", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update Category item. Please try again.");
      }
    }
  };

  return (
    <div className="edit-category-form">
      <ToastContainer />
      <h2>Edit Categories</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="categoriesname">Categories Name</label>
          <input
            type="text"
            id="categoriesname"
            name="title"
            placeholder="Enter category name"
            value={data.title || ""}
            onChange={handleTitleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoryimage">Upload Image</label>
          <label className="upload-area" htmlFor="categoryimage">
            <Image
              src={preview || assets.upload_area}
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
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
}

export default EditCategory;
