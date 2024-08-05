import express from 'express';
import { getAllUser, loginUser, registerUser, loginAdmin } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/login/admin', loginAdmin);  // Added admin login route
userRouter.get('/all', getAllUser);

export default userRouter;
