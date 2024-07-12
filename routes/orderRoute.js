import express from "express"
import authMiddeware from "../middleware/auth.js";
import { allOrder, placeOrder, userOrder, verfiyOrder,updateStatus } from "../controllers/orderController.js";
const orderRouter = express.Router();


orderRouter.post('/place', authMiddeware, placeOrder);
orderRouter.post('/verify', authMiddeware, verfiyOrder);
orderRouter.post('/updatestatus', updateStatus);
orderRouter.get('/all', authMiddeware, userOrder);
orderRouter.get('/total', allOrder);

export default orderRouter;