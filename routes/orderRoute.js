import express from "express"
import authMiddeware from "../middleware/auth.js";
import { placeOrder, verfiyOrder } from "../controllers/orderController.js";
const orderRouter = express.Router();


orderRouter.post('/place', authMiddeware, placeOrder);
orderRouter.post('/verify', authMiddeware, verfiyOrder);

export default orderRouter;