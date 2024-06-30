import userModel from "../models/userModel.js";

// add item to user cart
// req.body.userId = the id here comes from auth middlewere
const addToCart = async (req,res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if(!cartData[req.body.itemId]){
      cartData[req.body.itemId] = 1
    }else{
      cartData[req.body.itemId] += 1
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true, message:"Added to Cart"});
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"});
  }
}


// remove item from user cart

const removeFromCart = async (req,res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    
    if(!req.body.itemId){
      return res.json({success:false, message:"Item Not Found"})
    }
    if(cartData[req.body.itemId] > 0){
      cartData[req.body.itemId] -= 1
    }
    if (cartData[req.body.itemId] === 0) {
      delete cartData[req.body.itemId];
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData})
    res.json({success:true, message:"Removed From Cart"})
  } catch (error) {
    console.log(error)
    res.json({success:false, message:"Error"})
  }
}


// Get all the cart

const getCart = async (req,res) => {

}

export {
  addToCart,
  removeFromCart,
  getCart
}