import axios from "axios";
import express from "express";
import {addCategory, getAllCategory} from "../controllers/categoryController.js";
import multer from "multer";

const categoryRouter = express.Router();

const storage = multer.diskStorage({
  destination:'uploads',
  filename:(req, file, cb)=>{
      return cb(null, `${Date.now()}${file.originalname}`)
  }
})

const upload = multer({storage:storage})


categoryRouter.post('/add', upload.single('image') ,addCategory)
categoryRouter.get('/all', getAllCategory)

export default categoryRouter;