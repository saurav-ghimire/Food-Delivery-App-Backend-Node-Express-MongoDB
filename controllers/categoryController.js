import categoryModel from '../models/categoryModel.js';

const addCategory = async (req, res) => {
  try {
    const { title } = req.body; 
    const image = req.file.filename; 
    
    const category = new categoryModel({
      title,
      image
    });

    const response = await category.save();
    console.log(response);
    res.json({ success: true, message: 'Successfully added the category' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message); 
      res.status(400).json({ success: false, message: errors.join(', ') });
    } else {
      console.log('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

export {
  addCategory
};
