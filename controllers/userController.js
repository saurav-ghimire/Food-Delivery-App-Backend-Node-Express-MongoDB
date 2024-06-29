import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import validator from 'validator'


// CreateToken
const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET)
}

// login user
const loginUser = async (req, res) => {

}


const registerUser = async (req,res) => {
  const {name, email, password} = req.body;
  try {
    // check user if already exist
    const exist = await userModel.findOne({email})
    if(exist){
      return res.json({success:false, msg : 'User already exist'});
    }

    // validating email format and strong password
    if(!validator.isEmail(email)){
      return res.json({success:false, msg : 'Please enter valid email'});
    }

    if(password.length < 8){
      return res.json({success:false, msg : 'Minimun Password Length is 8'});
    }

    // hasing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt)

    const newUser = new userModel({
      name : name,
      email : email,
      password : hashedPass,
    })
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({success:true, token})

  } catch (error) { 
    console.log(error);
    res.json({success:false, message:"Error"})
  }
}

export {
  loginUser, registerUser
}