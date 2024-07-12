import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import axios from "axios";

const stripe = new Stripe(process.env.STRIPE_SECRET);

// Placing user Order from frontend

const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const lineItems = req.body.items.map((item) => ({
      price_data: {
        currency: "CAD",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity
    }));

    lineItems.push({
      price_data: {
        currency: "CAD",
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: 2 * 100,
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
    });

    
    if (!session.url) {
      throw new Error('Session URL is undefined');
    }

    res.json({ success: true, success_url: session.url });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

  const verfiyOrder = async (req,res) => {

    const {orderId, success} = req.body;
    
    try {
      if(success=="true") { 
        await orderModel.findByIdAndUpdate(orderId, {payment:true});
        res.json({success:true, message:"Paid"});
      }else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success:false, message:"Not Paid"});
      }
    } catch (error) {
      console.log(error)
      res.json({success:false, message:"Error"});
    }

  }

  const userOrder = async (req, res) => {
    try {
      const orders = await orderModel.find({userId:req.body.userId});
      res.json({success:true, data:orders})
    } catch (error) {
      console.log(error);
      res.json({success:false, message:'Error'})
    }
  }

  const allOrder = async (req,res) => {
    try {
   
      const data = await orderModel.find();
      if(data){
        res.json({success:true, data});
      }
    } catch (error) {
      console.log(error);
      res.json({success:false, message:"Error"});
    }
  }

  const updateStatus = async (req,res) => {
    try {
      const {selectedOrder,orderId} = req.body;
      console.log(req.body)
      console.log(selectedOrder)
      console.log(orderId)
      const orderExist = await orderModel.findById(orderId);
      if(orderExist){
        await orderModel.findByIdAndUpdate(orderId, {status:selectedOrder});
        res.json({success:true, message:'Successfully Updated'})
      }else{
        res.json({success:false, message:'Order Not Found'})
      }
    } catch (error) {
      console.log(error);
      res.json({success:false, message:'Error'});
    }
  }

export {
  placeOrder,
  verfiyOrder,
  userOrder,
  allOrder,
  updateStatus
  };