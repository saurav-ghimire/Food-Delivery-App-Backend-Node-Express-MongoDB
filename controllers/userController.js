import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import validator from 'validator'


// login user

const loginUser = async (req, res) => {

}

const registerUser = async (req,res) => {
  const {name, email, password} = req.body;
  try {
    // const exist = await userModel.findOne({})
  } catch (error) {
    
  }
}

export {
  loginUser, registerUser
}