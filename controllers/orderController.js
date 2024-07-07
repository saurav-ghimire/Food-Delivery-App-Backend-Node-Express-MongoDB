import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

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

    console.log(lineItems);

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

  const verfiyOrder = async(req,res) => {

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

export {
  placeOrder,
  verfiyOrder
  };
