import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController";
import authMiddeware from "../middleware/auth.js";

const cartRouter = express.Router();


router.post('/add',authMiddeware, addToCart);
router.post('/remove', authMiddeware ,removeFromCart);
router.get('/get', authMiddeware ,getCart);

export default cartRouter