import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title:{type:String, required:true},
  image:{type:String, required:true}
});

const categoryModel = mongoose.model.category || mongoose.model('category', categorySchema);

export default categoryModel;