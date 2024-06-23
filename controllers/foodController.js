import fs from 'fs';
import foodModel from '../models/foodModel.js';

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
    const allData = await foodModel.find();
    res.json({success:true, data:allData})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:'Error'})

  }
}

const deleteFood = async(req,res) => {
  try {
    const id = req.params.id;
    const foodExist = await foodModel.findById(id)
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

export {
  addFood,
  getFoods,
  deleteFood
}