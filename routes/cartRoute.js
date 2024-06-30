import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController";

const cartRouter = express.Router();


router.post('/add', addToCart);
router.post('/remove', removeFromCart);
router.get('/get', getCart);

export default cartRouter