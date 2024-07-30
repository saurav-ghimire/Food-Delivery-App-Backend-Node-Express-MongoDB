import express from "express";
import { addFood, getFoods, deleteFood,getSingleFood ,updateFood} from "../controllers/foodController.js";
import multer from "multer";
import authMiddeware from "../middleware/auth.js";

const foodRouter = express.Router();


// Image Store Engine
const storage = multer.diskStorage({
  destination:'uploads',
  filename:(req, file, cb)=>{
      return cb(null, `${Date.now()}${file.originalname}`)
  }
})

const upload = multer({storage:storage})

foodRouter.post('/add',authMiddeware, upload.single("image") ,addFood)
foodRouter.put('/update/:id',authMiddeware, upload.single("image"), updateFood);
foodRouter.get('/foods', getFoods)
foodRouter.delete('/:id',authMiddeware, deleteFood)
foodRouter.get('/:id',authMiddeware, getSingleFood)


export default foodRouter;
