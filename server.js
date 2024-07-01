import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoutes.js';
import { config } from 'dotenv';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


// app config
const app = express();
const port = 4005;

// middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// API endpoint
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.get('/', (req, res) => {
  res.send({msg : 'i am the route'})
})


app.listen(port, (req,res) => {
  console.log(`Server started on port number http://localhost:${port}`);
})