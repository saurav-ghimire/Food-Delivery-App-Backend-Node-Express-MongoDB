import fs from 'fs';
import foodModel from '../models/foodModel.js';

// Add Food Item

const addFood = async (req,res) => {

  const imageFileName = `${req.file.filename}`;
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

export {
  addFood,
}