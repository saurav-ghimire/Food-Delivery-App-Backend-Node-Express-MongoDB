import fs from 'fs';
import foodModel from '../models/foodModel.js';
import categoryModel from '../models/categoryModel.js';

// Add Food Item

const addFood = async (req,res) => {

  const imageFileName = req?.file?.filename;
  const food = new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:imageFileName
  });

  try {
    await food.save();
    res.json({success:true, message:'Food Added'});
  } catch (error) {
    console.log(error);
    res.json({sucess:false, message:'Error'})
  }
}

const getFoods =  async(req,res) => {
  try {
    const allData = await foodModel.find().populate('category');
    
    res.json({success:true, data:allData})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:'Error'})

  }
}

const deleteFood = async(req,res) => {
  try {
    const id = req.params.id;
    const foodExist = await foodModel.findById(id);
    

    if(!foodExist){
      res.json({sucess:false, message: 'Food Not found'});  
    }
    fs.unlink(`uploads/${foodExist.image}`, ()=>{})
    await foodModel.findByIdAndDelete(id)
    res.json({sucess:true, message: 'Food Successfully Deleted'});
    
  } catch (error) {
    console.log(error);
    res.json({success:false, message:'Error While Deleting'});
  }
}

const getSingleFood =async(req,res) => {
  try {
    const {id} = req.params
    const response = await foodModel.findById(id)
    if(!response){
      return res.json({success:false, messaage:'Food Not Found'});
    }
    res.json({success:true, response})
  } catch (error) {
    console.log(error);
    res.json({success:false, messaage:'Error'})
  }
}

const getSingleFoodWeb =async(req,res) => {
  try {
    const {id} = req.params
    const response = await foodModel.findById(id).populate('category')
    if(!response){
      return res.json({success:false, messaage:'Food Not Found'});
    }
    res.json({success:true, response})
  } catch (error) {
    console.log(error);
    res.json({success:false, messaage:'Error'})
  }
}


const updateFood = async (req, res) => {
  
    const {id} = req.params;
    const updatedData = {
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category
  }
 
  if (req.file){
    const imageFileName = req.file.filename;
    updatedData.image = imageFileName;
    // Delete the old image
    const foodExist = await foodModel.findById(id);
    if (foodExist && foodExist.image) {
      fs.unlink(`uploads/${foodExist.image}`, () => {});
    }
  }


   // Validate required fields
   const requiredFields = ['name', 'description', 'price', 'category'];
   const errors = requiredFields
     .filter(field => !updatedData[field])
     .map(field => `${field} is required`);
 
   if (errors.length > 0) {
     return res.status(400).json({ success: false, errors });
   }

  

  try {
    
    const response = await foodModel.findByIdAndUpdate(id, updatedData, { new: true });
    if (!response) {
      return res.json({ success: false, message: 'Food Not Found' });
    }
    res.json({ success: true, message: 'Food Updated', response });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error While Updating' });
  }
}
const getFilteredFood = async (req, res) => {
  const { minPrice, maxPrice, categories } = req.query;
  try {
    const query = {};

    // Handle categories filtering
    if (categories) {
      const categoryNames = categories.split(',');
      const categoryDocs = await categoryModel.find({ title: { $in: categoryNames } });
      const categoryIds = categoryDocs.map(category => category._id);

      if (categoryIds.length > 0) {
        query.category = { $in: categoryIds };
      }
    }

    // Handle price filtering
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Query the food items
    const filteredFoods = await foodModel.find(query).populate('category');
    res.json({ success: true, data: filteredFoods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error while filtering foods' });
  }
};
export {
  addFood,
  getFoods,
  deleteFood,
  getSingleFood,
  updateFood,
  getSingleFoodWeb,
  getFilteredFood
}