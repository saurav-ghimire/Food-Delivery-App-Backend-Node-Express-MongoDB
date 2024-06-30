import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";
import authMiddeware from "../middleware/auth.js";

const cartRouter = express.Router();


cartRouter.post('/add',authMiddeware, addToCart);
cartRouter.post('/remove', authMiddeware ,removeFromCart);
cartRouter.get('/get', authMiddeware ,getCart);

export default cartRouter