import express from "express"
import authMiddeware from "../middleware/auth.js";
import { placeOrder } from "../controllers/orderController.js";
const orderRouter = express.Router();


orderRouter.post('/place', authMiddeware, placeOrder);

export default orderRouter;