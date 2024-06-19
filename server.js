import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// API endpoint
app.use('/api/food', foodRouter)
app.use('/images', express.static('uploads'))

app.get('/', (req, res) => {
  res.send({msg : 'i am the route'})
})


app.listen(port, (req,res) => {
  console.log(`Server started on port number http://localhost:${port}`);
})