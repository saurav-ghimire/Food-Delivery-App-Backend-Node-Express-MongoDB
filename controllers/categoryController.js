import mongoose from 'mongoose';
import categoryModel from '../models/categoryModel.js';
import fs from 'fs';

const addCategory = async (req, res) => {
  try {
    const { title } = req.body; 
    const image = req?.file?.filename; 
    
    const category = new categoryModel({
      title,
      image
    });

    const response = await category.save();
    console.log(response);
    res.json({ success: true, message: 'Successfully added the category' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message); 
      res.status(400).json({ success: false, message: errors.join(', ') });
    } else {
      console.log('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

const getAllCategory = async(req, res) => {
  try {
    const allCategory = await categoryModel.find({});
    res.json({success:true, allCategory})
  } catch (error) {
    console.log('Error')
    res.json({success:false, message:'Internal Server Error'})
  }
}
const deleteCategory = async (req,res) => {
  try {
    const id = req.params.id;
    const isExist = await categoryModel.findById(id);
    if(!isExist){
      res.json({sucess:false, message: 'Category Not found'});  
    }
    fs.unlink(`uploads/${isExist.image}`, ()=>{})
    await categoryModel.findByIdAndDelete(id)
    res.json({sucess:true, message: 'Category Successfully Deleted'});
    
  } catch (error) {
    console.log(error)
    res.json({success:false, message:'Internal Server Error'})
    
  }
}

const getSingleCategory = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid ObjectId' });
  }

  try {
    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(404).json({ success: false, message: 'Id Not Found' });
    }

    res.status(200).json({ success: true, category });
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const updatedData = {
    title: req.body.title,
  };

  if (req.file) {
    const imageFileName = req.file.filename;
    updatedData.image = imageFileName;
    // Delete the old image
    const categoryExist = await categoryModel.findById(id);
    if (categoryExist && categoryExist.image) {
      fs.unlink(`uploads/${categoryExist.image}`, () => {});
    }
  }

  // Validate required fields
  const requiredFields = ['title'];
  const errors = requiredFields
    .filter(field => !updatedData[field])
    .map(field => `${field} is required`);

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  console.log(updatedData);

  try {
    const response = await categoryModel.findByIdAndUpdate(id, updatedData, { new: true });
    if (!response) {
      return res.json({ success: false, message: 'Category Not Found' });
    }
    res.json({ success: true, message: 'Category Updated', response });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error While Updating' });
  }
};

export {
  addCategory,
  getAllCategory,
  deleteCategory,
  getSingleCategory,
  updateCategory
};