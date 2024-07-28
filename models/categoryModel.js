import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  }
});

const categoryModel = mongoose.models.food || mongoose.model('Category', categorySchema);

export default categoryModel;